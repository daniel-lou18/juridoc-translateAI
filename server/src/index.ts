import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Hello" });
});

app.listen(PORT, () => console.log(`Server is listening from port ${PORT}`));
