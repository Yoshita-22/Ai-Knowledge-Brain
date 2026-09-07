const rrf = (keyword = [], semantic = []) => {
  const scores = new Map();
  const documents = new Map();

  // Keyword results
  keyword.forEach((ele, i) => {
    const id = ele.id;

    const score = 1 / (60 + (i + 1));

    scores.set(
      id,
      (scores.get(id) || 0) + score
    );

    // Normalize keyword result to Qdrant-like structure
    if (!documents.has(id)) {
      documents.set(id, {
        ...ele,
        payload: ele.payload || {
          text: ele.text,
          type: ele.type,
          section: ele.section,
          originalTable: ele.originalTable,
          fileId: ele.fileId,
          fileName: ele.fileName,
          sessionId: ele.sessionId,
          userId: ele.userId,
          chunkIndex: ele.chunkIndex,
          timestamp: ele.timestamp
        }
      });
    }
  });

  // Semantic results
  semantic.forEach((ele, i) => {
    const id = ele.id;

    const score = 1 / (60 + (i + 1));

    scores.set(
      id,
      (scores.get(id) || 0) + score
    );

    // Semantic already has payload
    if (!documents.has(id)) {
      documents.set(id, ele);
    }
  });

  // Build final results
  const res = [...scores.entries()]
    .map(([id, hybridScore]) => ({
      ...documents.get(id),
      hybridScore
    }))
    .sort((a, b) => b.hybridScore - a.hybridScore);

  console.log("RRF RESULT:", res);

  return res;
};

export default rrf;