import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { convertTableToText } from "./convertTableToText.js";

export const processUnstructured = async (elements) => {

  const TEXT_TYPES = ["Title", "NarrativeText", "ListItem"];

  let currentSection = "General";
  let currentTextBlock = "";

  const finalDocs = [];

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  for (const el of elements) {

    //TITLE → new section
    if (el.type === "Title") {

      // flush previous text
      if (currentTextBlock.trim()) {
        const splits = await splitter.createDocuments([currentTextBlock]);

        splits.forEach(s => {
          finalDocs.push(new Document({
            pageContent: s.pageContent,
            metadata: {
              type: "text",
              section: currentSection
            }
          }));
        });
      }

      currentSection = el.text;
      currentTextBlock = el.text + "\n";
    }

    // TEXT CONTENT
    else if (["NarrativeText", "ListItem"].includes(el.type)) {
      currentTextBlock += el.text + "\n";
    }

    // TABLE
    else if (el.type === "Table") {

      // flush text before table
      if (currentTextBlock.trim()) {
        const splits = await splitter.createDocuments([currentTextBlock]);

        splits.forEach(s => {
          finalDocs.push(new Document({
            pageContent: s.pageContent,
            metadata: {
              type: "text",
              section: currentSection
            }
          }));
        });

        currentTextBlock = "";
      }

      const table_html = el.metadata?.text_as_html;
      if (table_html) {
        
        const tableText = await convertTableToText(table_html);

        finalDocs.push(new Document({
          pageContent: tableText,
          metadata: {
            type: "table",
            section: currentSection,
            originalTable: table_html
          }
        }));
      }
    }

    //  IMAGE
    else if (el.type === "Image") {
        // image logic goes here
    }}

  //  flush remaining text
  if (currentTextBlock.trim()) {
    const splits = await splitter.createDocuments([currentTextBlock]);

    splits.forEach(s => {
      finalDocs.push(new Document({
        pageContent: s.pageContent,
        metadata: {
          type: "text",
          section: currentSection
        }
      }));
    });
  }
 
  return finalDocs;
}