
import { handleText } from "./handleText.js";
import { processUnstructured } from "./processUnstructured.js";

export const handlePdf = async (filePath) => {
    const text = await handleText(filePath)
    console.log("processUnstructured")
    const data = await processUnstructured(text)
    console.log(data)
    return data;
};