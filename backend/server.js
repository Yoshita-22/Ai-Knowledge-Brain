import UploadRouter from "./router/UploadRouter.js";
import express from "express";
import { initQdrant } from "./services/qdrant.js";
const app = express();


app.get('/', (req, res) => {
    console.log("GET request received");
    res.send("Server is running");
});

app.listen(3000, async() => {
    console.log("Server running on http://127.0.0.1:3000");
    await initQdrant();
});
app.use("/api",UploadRouter)