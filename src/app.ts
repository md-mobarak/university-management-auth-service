import express, { Application, Request, Response } from "express";
import cors from "cors";

export const app: Application = express();
export const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Working successfully");
});
