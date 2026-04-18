import { handleDoc } from "./handleDoc.js";
import { handleImage } from "./handleImage.js";
import { handlePdf } from "./handlePdf.js";
import { handleUrl } from "./handleUrl.js";
import crypto from "crypto";
import { storeDocuments } from "../vector_database/storeDB.js";

export const processor = async (req)=>{
    let text = "";
    let docs = "";
    try{
         if(req.body.url){
            text =  await handleUrl(req.body.url);
         }else if(req.file){
            const fileType = req.file.mimetype;
            if(fileType=="application/pdf"){
                docs = await handlePdf(req.file.path);
            }else if(fileType.startsWith("image/")){
                text = await handleImage(req.file.path);
            }
            else {
                text = await handleDoc(req.file.path);
            }
         }else if(req.body.text){
            text = req.body.text;
         }
            const fileInfo = {
            id: crypto.randomUUID(),
            name: req.file?.originalname || "text_input"
            };
            console.log(req.file?.originalname)
            // STORE IN QDRANT (HERE )
            await storeDocuments(docs, fileInfo);

            return "Stored successfully ";

    }catch(e){
        return e;
    }

   
}  