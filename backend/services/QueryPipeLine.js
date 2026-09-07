import ollama from "ollama";
import { qdrant } from "../services/qdrant.js";
import { GoogleGenAI } from "@google/genai";
import keywordSearch from "./KeywordSearch.js";
import rrf from "./rrf.js";
import { retry } from "../utils/retry.js";
const ai = new GoogleGenAI({ apiKey: process.env.RETRIVAL_GEMINI_KEY });




/**
 * Detect table queries
 */
// const isTableQuery = (query) => {
//   const keywords = [
//     "how many", "count", "number", "credits",
//     "marks", "score", "list", "compare", "total"
//   ];
//   return keywords.some(k => query.toLowerCase().includes(k));
// };

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

    //keyword search
    const keywordSearchRes =await keywordSearch(userId,sessionId,fileId,userQuery);
    
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
      limit: 8, //  increased
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
    const semanticRes = await qdrant.search("ai_brain", searchParams);
    
    const results = rrf(keywordSearchRes,semanticRes);
   
    // console.log("final results :",)results);
    if (!results.length) {
      return "No relevant information found.";
    }
    
    
    //KeywordSearch
    // const kwsearchResults = keywordSearch(userQuery);
    // console.log(kwsearchResults)
    // ===============================
    // STEP 3 — SMART RANKING
    // ===============================
    // const tablePriority = isTableQuery(userQuery);
    // const topK = scored
    //   .sort((a, b) => b.hybridScore - a.hybridScore)
    //   .slice(0, 8); //  increased
    // ===============================
    // STEP 4 — BUILD CONTEXT
    // ===============================
    let context = "";

    results.forEach(r => {
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
    console.log(context);
    const prompt = `
You are a highly accurate AI assistant.

RULES:
1. Answer using provided context
2. You may combine multiple pieces of context
3. You may infer relationships (e.g., comparisons)
4. If partially available → give best possible answer

Response guidelines:
1. Answer directly and concisely.
2. Use Markdown formatting.
3. Use ## headings for major sections.
4. Use bullet points for lists.
5. Use bold only for important terms.
6. Avoid nested bullet lists where possible.
7. Use short paragraphs.
8. Do not mention the retrieval process, embeddings, RRF, or context.
9. Do not repeat the same information.
10. If the answer is not present in the context, clearly say that it was not found.


Conversation History:
${historyText}

Context:
${context}

User Question:
${userQuery}
`;

    // ===============================
    // STEP 7 — LLM
    // ===============================
    const response = await retry(async()=>await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      stream:true
    }))

    return response.text;

  } catch (error) {
    console.error(" Query pipeline error:", error);
    throw error;
  }
};