import { qdrant} from "../services/qdrant.js"
import ollama from "ollama";
import crypto from "crypto";

/**
 * MAIN FUNCTION
 */
export const storeDocuments = async (docs, fileInfo,sessionId) => {
  const batchSize = 10; // embedding batch
  const insertBatchSize = 50; // db batch
  let allPoints = [];

  for (let i = 0; i < docs.length; i += batchSize) {
    const batchDocs = docs.slice(i, i + batchSize);

    //  STEP 1: Extract texts
    const texts = batchDocs.map(doc => doc.pageContent);

    // STEP 2: Generate embeddings (parallel)
    const embeddings = await Promise.all(
      texts.map(text =>
        ollama.embeddings({
          model: "nomic-embed-text",
          prompt: text,
        })
      )
    );
    console.log(embeddings[0].embedding.length);

    //  STEP 3: Create Qdrant points
    const points = batchDocs.map((doc, idx) => ({
      id: crypto.randomUUID(),

      vector: embeddings[idx].embedding,

      payload: {
        text: doc.pageContent,

        //  metadata enrichment
        type: doc.metadata?.type || "text",
        section: doc.metadata?.section || "unknown",
        originalTable:doc.metadata?.table || null,
        fileId: fileInfo.id,
        fileName: fileInfo.name,
        sessionId: sessionId,
        
        chunkIndex: i + idx,
        timestamp: Date.now(),
      },
    }));

    allPoints.push(...points);

    console.log(`Embedded batch ${i / batchSize + 1}`);
  }

  // STEP 4: Batch insert into Qdrant
  for (let i = 0; i < allPoints.length; i += insertBatchSize) {
    const batch = allPoints.slice(i, i + insertBatchSize);

    await qdrant.upsert("ai_brain", {
      points: batch,
    });

    console.log(` Stored batch ${i / insertBatchSize + 1}`);
  }

  console.log(" All documents stored successfully");
};