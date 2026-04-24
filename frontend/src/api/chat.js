import api from "./api";

// ============================
// UPLOAD FILE
// ============================
export const uploadFile = async (files,sessionID) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("sessionId", sessionID);
  const res = await api.post("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // { fileId }
};

// ============================
// QUERY
// ============================
export const sendQuery = async ({ query, sessionId, fileId }) => {
  const res = await api.post("/query", {
    query,
    sessionId,
    fileId,
  });

  return res.data; // { answer }
};