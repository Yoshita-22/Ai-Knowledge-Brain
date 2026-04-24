import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { Chat } from "../models/Chat.js";
const ChatRouter = Router();


// GET CHAT HISTORY
ChatRouter.post("/history",authMiddleware, async (req, res) => {
  try{
    const { sessionId} = req.body;
    console.log(req.user)
  const userId = req.user.userId;


  const messages = await Chat.find({
    sessionId,
    userId
  }).sort({ createdAt: 1 });

  return res.json({ messages });
  }catch(e){
    console.log(e);
    return res.json({message:e});
  }
});


export default ChatRouter