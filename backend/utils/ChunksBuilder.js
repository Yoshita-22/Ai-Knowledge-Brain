import crypto from "crypto";

export const createChunks = (
  docs,
  fileInfo,
  sessionId,
  userId
) => {
 
  return docs.map((doc, index) => ({
    id: crypto.randomUUID(),

    text: doc.pageContent,

    type: doc.metadata?.type || "text",
    section: doc.metadata?.section || "unknown",
    originalTable: doc.metadata?.originalTable || null,

    fileId: fileInfo.id,
    fileName: fileInfo.name,

    sessionId,
    userId,

    chunkIndex: index,
    timestamp: Date.now(),
  }));
};