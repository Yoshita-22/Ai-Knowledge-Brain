import { Router } from "express";
import multer from "multer";
import dotenv from "dotenv";
import { processor } from "../services/processor.js";
dotenv.config();
const UploadRouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
UploadRouter.post('/upload', upload.single('file'),async(req, res) => {
    try{
    let text = await processor(req);
    return res.status(200).json({text:text||""})
   }catch(e){
        console.error(e);
        return res.status(500).json({ error: "Processing failed" });
   }
});
export default UploadRouter;