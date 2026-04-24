import { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: String,
  token: String,
  expiresAt: Date
})
export const RefreshToken = new model("RefreshToken",refreshTokenSchema);