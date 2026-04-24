import ollama from "ollama";
import { qdrant } from "../services/qdrant.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.RETRIVAL_GEMINI_KEY });

/**
 *  STEP 0 — QUERY REWRITE (MOST IMPORTANT)
 */
const rewriteQuery = (query, history) => {
  if (!history?.length) return query;

  const lastUserMessage = history
    .filter(h => h.role === "user")
    .slice(-1)[0]?.content;

  // If query is short → expand using history
  if (query.length < 20 && lastUserMessage) {
    return `${lastUserMessage} → ${query}`;
  }

  return query;
};

/**
 * Detect table queries
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
export const queryPipeline = async ({
  userQuery,
  history,
  fileId,
  sessionId,
  userId
}) => {
  try {
    console.log(" Query pipeline begins for sessionID",sessionId);

    // ===============================
    // STEP 0 — REWRITE QUERY 
    // ===============================
    const finalQuery = rewriteQuery(userQuery, history);
    console.log("Final Query:", finalQuery);

    // ===============================
    // STEP 1 — EMBEDDING
    // ===============================
    const embeddingRes = await ollama.embeddings({
      model: "nomic-embed-text",
      prompt: finalQuery,
    });

    const queryVector = embeddingRes.embedding;

    // ===============================
    // STEP 2 — SEARCH QDRANT
    // ===============================
    const searchParams = {
      vector: queryVector,
      limit: 20, //  increased
    };

   const mustFilters = [];

// ALWAYS filter by user
mustFilters.push({
  key: "userId",
  match: { value: userId }
});

// optional filters
if (fileId) {
  mustFilters.push({
    key: "fileId",
    match: { value: fileId }
  });
}

if (sessionId) {
  mustFilters.push({
    key: "sessionId",
    match: { value: sessionId }
  });
}

searchParams.filter = {
  must: mustFilters
};
    const results = await qdrant.search("ai_brain", searchParams);
    console.log(results);
    if (!results.length) {
      return "No relevant information found.";
    }

    // ===============================
    // STEP 3 — SMART RANKING
    // ===============================
    const tablePriority = isTableQuery(finalQuery);

    const scored = results.map(r => {
      let score = r.score * 1.5; //  prioritize semantic

      if (tablePriority && r.payload.type === "table") {
        score += 0.3;
      }

      return { ...r, hybridScore: score };
    });

    const topK = scored
      .sort((a, b) => b.hybridScore - a.hybridScore)
      .slice(0, 8); //  increased

    // ===============================
    // STEP 4 — BUILD CONTEXT
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

    // ===============================
    // STEP 5 — HISTORY
    // ===============================
    const historyText = history?.length
      ? history.map(h => `${h.role.toUpperCase()}: ${h.content}`).join("\n")
      : "";

    // ===============================
    // STEP 6 — PROMPT (FIXED)
    // ===============================
    const prompt = `
You are a highly accurate AI assistant.

RULES:
1. Answer using provided context
2. You may combine multiple pieces of context
3. You may infer relationships (e.g., comparisons)
4. If partially available → give best possible answer
5. Only say "Not found in document" if nothing relevant exists

Conversation History:
${historyText}

Context:
${context}

User Question:
${finalQuery}
`;

    // ===============================
    // STEP 7 — LLM
    // ===============================
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-lite",
      contents: prompt,
    });

    return response.text;

  } catch (error) {
    console.error(" Query pipeline error:", error);
    throw error;
  }
};