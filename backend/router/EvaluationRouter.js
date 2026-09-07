import { Router} from "express";
import { samples } from "../samples/samples";

const EvaluationRouter = Router();
EvaluationRouter.post("/api/evaluate",async(req,res)=>{
    const response = await fetch("http://localhost:8000/evaluate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(samples)
  });
  return response;
})