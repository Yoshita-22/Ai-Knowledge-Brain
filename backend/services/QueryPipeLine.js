 import ollama from "ollama";
import { qdrant } from "../services/qdrant.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.RETRIVAL_GEMINI_KEY });

/**
 * Detect if query needs table priority
 */
const isTableQuery = (query) => {
  const keywords = [
    "how many", "count", "number", "credits",
    "marks", "score", "list", "compare", "total"
  ];

  return keywords.some(k => query.toLowerCase().includes(k));
};

/**
 * MAIN QUERY PIPELINE
 */
export const queryPipeline = async ({ userQuery, history,fileId,sessionId,}) => {
  try {
    // ===============================
    // STEP 1 — EMBEDDING
    // ===============================
    const embeddingRes = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: userQuery,
    });

    const queryVector = embeddingRes.embedding;

    // ===============================
    // STEP 2 — SEARCH QDRANT
    // ===============================
    const searchParams = {
      vector: queryVector,
      limit: 10,
    };

    // file filtering
    if (fileId) {
  searchParams.filter = {
    must: [{ key: "fileId", match: { value: fileId } }]
  };
}//session based query filter
    else if (sessionId) {
    searchParams.filter = {
        must: [{ key: "sessionId", match: { value: sessionId } }]
    };
    }


    const results = await qdrant.search("ai_brain", searchParams);

    if (!results.length) {
      return "No relevant information found.";
    }

    // ===============================
    // STEP 3 — HYBRID RANKING
    // ===============================
    const tablePriority = isTableQuery(userQuery);
    const queryWords = userQuery.toLowerCase().split(" ");

    const scored = results.map(r => {
      const text = r.payload.text.toLowerCase();

      // 🔹 keyword score
      let keywordScore = 0;
      queryWords.forEach(word => {
        if (text.includes(word)) keywordScore += 0.1;
      });

      // 🔹 type boost
      let typeBoost = 0;
      if (tablePriority && r.payload.type === "table") {
        typeBoost += 0.3;
      }
      if (!tablePriority && r.payload.type === "text") {
        typeBoost += 0.2;
      }

      return {
        ...r,
        hybridScore: r.score + keywordScore + typeBoost
      };
    });

    // ===============================
    // STEP 4 — SORT + TOP-K
    // ===============================
    const topK = scored
      .sort((a, b) => b.hybridScore - a.hybridScore)
      .slice(0, 5);

    // ===============================
    // STEP 5 — BUILD CONTEXT
    // ===============================
    let context = "";

    topK.forEach(r => {
      const p = r.payload;

      if (p.type === "text") {
        context += `\n[TEXT]\n${p.text}\n`;
      }

      if (p.type === "table" && p.originalTable) {
        context += `\n[TABLE]\n${p.originalTable}\n`;
      }
    });

    if (!context) {
      return "No useful context found.";
    }
    //also add HISTORY CONTEXT
    const historyText = history?.length
    ? history.map(h => `${h.role.toUpperCase()}: ${h.content}`).join("\n")
    : "";
    // ===============================
    // STEP 6 — LLM PROMPT
    // ===============================
    const prompt = `
You are a highly accurate AI assistant.

STRICT RULES:
1. Answer ONLY using the provided context
2. If answer is not present → say "Not found in document"
3. DO NOT guess or hallucinate
4. If TABLE is present:
   - Prefer table for numerical answers
   - Read rows and columns carefully
5. Be concise and factual

Context:
${context}

Question:
${userQuery}
`;

    // ===============================
    // STEP 7 — LLM RESPONSE
    // ===============================
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error("Query pipeline error:", error);
    throw error;
  }
};