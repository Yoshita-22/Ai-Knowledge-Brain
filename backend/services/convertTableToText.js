import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();
const ai = new GoogleGenAI({ apiKey: process.env.TABLE_TO_TEXT_GEMINI });
export const convertTableToText = async(table_html) => {
    const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `YOUR TASK:
                Generate a comprehensive, searchable description that covers:
                1. Key facts, numbers, and data points
                2. Main topics and concepts discussed
                3. Questions this content could answer
                4. Visual content analysis (charts, diagrams, patterns in images)
                5. Alternative search terms users might use
                Make it detailed and searchable — prioritize findability over brevity.
                SEARCHABLE DESCRIPTION:${table_html}`,
    
  });
  console.log(response.text);
  return response.text;
};