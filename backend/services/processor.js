import { handleDoc } from "./handleDoc.js";
import { handleImage } from "./handleImage.js";
import { handlePdf } from "./handlePdf.js";
import { handleUrl } from "./handleUrl.js";


export const processor = async (req)=>{
    let text = "";
    try{
         if(req.body.url){
            text =  await handleUrl(req.body.url);
         }else if(req.file){
            const fileType = req.file.mimetype;
            if(fileType=="application/pdf"){
                text = await handlePdf(req.file.path);
            }else if(fileType.startsWith("image/")){
                text = await handleImage(req.file.path);
            }
            else {
                text = await handleDoc(req.file.path);
            }
         }else if(req.body.text){
            text = req.body.text;
         }
    }catch(e){
        return e;
    }
    return text;
   
}  