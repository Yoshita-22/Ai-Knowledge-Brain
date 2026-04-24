import { Router } from "express";
import { queryPipeline } from "../services/QueryPipeLine.js";
import { Chat } from "../models/Chat.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { Session } from "../models/Sessions.js";
const QueryRouter = Router();

QueryRouter.post("/",authMiddleware, async (req, res) => {

  try {
    const { query, sessionId, fileId } = req.body;
    const userId = req.user.userId;
    console.log(userId)
    // ===========================
    // VALIDATION
    // ===========================
    if (!query || !sessionId || !userId) {
      return res.status(400).json({
        error: "query, sessionId, userId required",
      });
    }
    // ===========================
    //  STEP 0 — SESSION HANDLING
    // ===========================
    let session = await Session.findOne({ sessionId });

    if (!session) {
      //create new session
      session = await Session.create({
        sessionId,
        userId,
        title: query.slice(0, 40), // first message = title
        fileId: fileId || null,
      });
    } else {
      // update last active
      session.updatedAt = new Date();

      //  optional: update title if still default
      if (session.title === "New Chat") {
        session.title = query.slice(0, 40);
      }

      await session.save();
    }
    // ===========================
    // STEP 1 — SAVE USER MESSAGE
    // ===========================
    await Chat.create({
      userId,
      sessionId,
      fileId: fileId || null,
      role: "user",
      content: query,
    });

    // ===========================
    // STEP 2 — FETCH HISTORY
    // ===========================
    let filter = { userId, sessionId };

    //  If fileId present → isolate memory per file
    if (fileId) {
      filter.fileId = fileId;
    }
    
    let history = await Chat.find(filter)
      .sort({ createdAt: -1 })
      .limit(8); // last 4 turns

    history = history.reverse();

    // ===========================
    // STEP 3 — CALL PIPELINE
    // ===========================
    const answer = await queryPipeline({
      userQuery: query,
      history,
      fileId,
      sessionId, //  IMPORTANT
      userId
    });

    // ===========================
    // STEP 4 — SAVE AI RESPONSE
    // ===========================
    await Chat.create({
      userId,
      sessionId,
      fileId: fileId || null,
      role: "assistant",
      content: answer,
    });

    // ===========================
    // RESPONSE
    // ===========================
    return res.status(200).json({
      answer,
      sessionId,
    });

  } catch (error) {
    console.error("Query error:", error);

    return res.status(500).json({
      error: "Query failed",
    });
  }
});

export default QueryRouter;