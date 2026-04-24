import UploadRouter from "./router/UploadRouter.js";
import QueryRouter from "./router/queryRouter.js";
import { initQdrant } from "./services/qdrant.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import { connectDB } from "./config/db.js";
import AuthRouter from "./router/AuthRouter.js";
import { authMiddleware } from "./middleware/AuthMiddleware.js";
import ChatRouter from "./router/ChatRouter.js";
import SessionsRouter from "./router/SessionsRouter.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}));
connectDB();

app.get('/', authMiddleware,(req, res) => {
    console.log("GET request received");
    res.send("Server is running");
});

app.listen(3000, async() => {
    console.log("Server running on http://127.0.0.1:3000");
    await initQdrant();
});
app.use("/api/upload",UploadRouter);
app.use("/api/auth/",AuthRouter)
app.use("/api/query",QueryRouter);
app.use("/api/chat",ChatRouter);
app.use("/api/sessions",SessionsRouter)