

import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";
import { Session } from "../models/Sessions.js";

const SessionsRouter = Router();

// ===============================
// GET ALL SESSIONS FOR USER
// ===============================
SessionsRouter.get("/", authMiddleware, async (req, res) => {
    console.log("session api called")
  try {
    const userId = req.user.userId; // ⚠️ ensure this matches your JWT

    if (!userId) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    // 🔥 Fetch sessions
    const sessions = await Session.find({ userId })
      .sort({ updatedAt: -1 }) // latest first
      .select("sessionId title updatedAt fileId");
    console.log("from sessions api")
    return res.status(200).json({
      sessions,
    });

  } catch (err) {
    console.error("Sessions error:", err);

    return res.status(500).json({
      error: "Failed to fetch sessions",
    });
  }
});

export default SessionsRouter;