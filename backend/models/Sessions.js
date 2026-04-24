// models/Session.js

import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    title: {
      type: String,
      default: "New Chat",
    },
    fileId: {
      type: String,
      default: null,
    }
  },
  {
    timestamps: true, // createdAt, updatedAt
  }
);

export const Session = mongoose.model("Session", sessionSchema);