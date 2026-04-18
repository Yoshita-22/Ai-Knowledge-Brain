import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.TABLE_TO_TEXT_GEMINI });
export const convertTableToText = async(table_html) => {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: `Convert this table into simple sentences:\n${table_html}`,
    
  });
  console.log("table to text created")
  return response.text;
};