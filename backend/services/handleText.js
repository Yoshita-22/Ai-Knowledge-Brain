import { UnstructuredClient } from "unstructured-client";
import { Strategy } from "unstructured-client/sdk/models/shared";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export const handleText = async (filename) => {
    try {
        const client = new UnstructuredClient({
            security: {
                apiKeyAuth: process.env.UNSTRUCTURED_API_KEY
            },
        });

        const data = fs.readFileSync(filename);

        const response = await client.general.partition({
            partitionParameters: {
                files: {
                    content: data,
                    fileName: filename,
                },
                strategy:  "fast"
            }
        });

        console.log(" Unstructured done");

        // Extract text properly
       const text = response
       
        return text;
    } catch (e) {
        console.error(e);
        throw e;
    }
};