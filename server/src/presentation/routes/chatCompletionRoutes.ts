import { Router } from "express";
import * as chatCompletionController from "../controllers/chatCompletionController";

const router = Router();

router.route("/").post(chatCompletionController.generateChatCompletion);

export default router;
