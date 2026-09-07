import { qdrant } from "../services/qdrant.js";
import { Ollama } from 'ollama';

// 1. Initialize with your custom server configuration
const ollama = new Ollama({
  host: 'http://127.0.0.1:11434' 
});

export const storeInQdrant = async (chunks) => {
  const batchSize = 10;
  console.log(chunks[0]);
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);

    // Generate embeddings for current batch
    const embeddings = await Promise.all(
      batch.map((chunk) =>
        ollama.embeddings({
          model: "nomic-embed-text",
          prompt: chunk.text,
        })
      )
    );

    // Create Qdrant points
    const points = batch.map((chunk, idx) => ({
      id: chunk.id,
      vector: embeddings[idx].embedding,
      payload: {
        text: chunk.text,
        type: chunk.type,
        section: chunk.section,
        originalTable: chunk.originalTable,

        fileId: chunk.fileId,
        fileName: chunk.fileName,

        sessionId: chunk.sessionId,
        userId: chunk.userId,

        chunkIndex: chunk.chunkIndex,
        timestamp: chunk.timestamp,
      },
    }));

    // Immediately insert current batch
    await qdrant.upsert("ai_brain", {
      points,
    });

    console.log(
      `Embedded & Stored batch ${Math.floor(i / batchSize) + 1}`
    );
  }

  console.log("All chunks stored successfully");
};