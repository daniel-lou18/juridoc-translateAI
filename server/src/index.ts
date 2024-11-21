import dotenv from "dotenv";
dotenv.config();

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import birthCertificateRoutes from "./presentation/routes/birthCertificateRoutes";

const PORT = process.env.PORT || 4000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "success", message: "Hello" });
});

app.use("/api/certificates", birthCertificateRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    status: "fail",
    message: "La route que vous demandez n'existe pas",
  });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    status: "fail",
    message: error instanceof Error ? error.message : "Internal server error",
  });
});

app.listen(PORT, () => console.log(`Server is listening from port ${PORT}`));
