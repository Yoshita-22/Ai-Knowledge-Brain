import UploadRouter from "./router/UploadRouter.js";
import express from "express";
const app = express();


app.get('/', (req, res) => {
    console.log("GET request received");
    res.send("Server is running");
});

app.listen(3000, () => {
    console.log("Server running on http://127.0.0.1:3000");
});
app.use("/api",UploadRouter)