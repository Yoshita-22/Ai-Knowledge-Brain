
import { handleText } from "./handleText.js";
import { processUnstructured } from "./processUnstructured.js";

export const handlePdf = async (filePath) => {
    const text = await handleText(filePath)
    const data = await processUnstructured(text)
    return text;
};