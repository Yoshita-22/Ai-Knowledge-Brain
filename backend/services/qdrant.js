import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant = new QdrantClient({
  url: "http://127.0.0.1:6333",
});
export const initQdrant = async () => {
  const collections = await qdrant.getCollections();
  
  const exists = collections.collections.some(
    c => c.name === "ai_brain"
  );

  if (!exists) {
    await qdrant.createCollection("ai_brain", {
      vectors: {
        size: 768,
        distance: "Cosine",
      },
    });
   
    console.log("Collection created");
  } else {
    console.log("Collection already exists");
  }
};