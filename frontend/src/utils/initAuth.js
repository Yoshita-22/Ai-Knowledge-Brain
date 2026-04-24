import api from "../api/interceptor";
import { setAccessToken } from "./token";

export const initAuth = async () => {
    console.log("init method is called")
  try {
    const res = await api.post("/auth/refresh");
    console.log("init ",res);
    setAccessToken(res.data.accessToken);
    
    return true; // logged in
  } catch (err) {
    console.log(err)
    setAccessToken(null);
    return false; // not logged in
  }
};