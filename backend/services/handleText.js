import { UnstructuredClient } from "unstructured-client";
import fs from "fs";
import dotenv from "dotenv";
import { Strategy } from "unstructured-client/sdk/models/shared";
dotenv.config();

const client = new UnstructuredClient({
  security: {
    apiKeyAuth: process.env.UNSTRUCTURED_API_KEY,
  },
});

// Retry Wrapper
const retryRequest = async (fn, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`Retry ${i + 1}...`);

      if (i === retries - 1) throw err;

      // exponential backoff
      await new Promise(res => setTimeout(res, 2000 * (i + 1)));
    }
  }
};

export const handleText = async (filename) => {
  try {
    const data = fs.readFileSync(filename);

    const response = await retryRequest(() =>
      client.general.partition({
        partitionParameters: {
          files: {
            content: data,
            fileName: filename,
          },

          //  BEST SETTINGS
          strategy: Strategy.Auto,   // more accurate than "fast"
          splitPdfPage:false
          
          
        },
      })
    );

    console.log("Unstructured done");

    // ============================
    // EXTRACT CLEAN TEXT
    // ============================
    let elements = response.filter((el)=>{
      return el.type!=="Image"
    })
    console.log(elements)
    return elements;
    

  } catch (e) {
    console.error(" Unstructured error:", e);
    throw e;
  }
};