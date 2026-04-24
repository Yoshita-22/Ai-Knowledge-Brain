import api from "./interceptor";
import { setAccessToken } from "../utils/token";

export async function signupUser(data) {
  try {
    const response = await api.post(
      "/auth/create-account",
      data 
    );

    return response.data;

  } catch (error) {
    throw error.response?.data || error;
  }
}

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);

  //  Save ONLY access token
  setAccessToken(res.data.accessToken);
  console.log(res.data);
  return res.data;
};


export const logoutUser = async () => {
  try {
    await api.post("/auth/logout");

  } catch (err) {
    console.log("Logout API failed (still clearing locally)");
  } finally {
    //  Always clear access token
    setAccessToken(null);

    // Redirect
    window.location.href = "/login";
  }
};