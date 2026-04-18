import { Router } from "express";
import { queryPipeline } from "../services/QueryPipeLine.js";
import { Chat } from "../models/Chat.js";

const QueryRouter = Router();

QueryRouter.post("/", async (req, res) => {
  try {
    const { query, sessionId, userId, fileId } = req.body;

    // ===========================
    // VALIDATION
    // ===========================
    if (!query || !sessionId || !userId) {
      return res.status(400).json({
        error: "query, sessionId, userId required",
      });
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