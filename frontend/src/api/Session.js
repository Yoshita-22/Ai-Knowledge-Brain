// api/session.js
import api from "./interceptor";

export const getSessions = async () => {
  const res = await api.get("/sessions");
  console.log(res.data);
  return res.data.sessions;
};