import { Router } from "express";
import * as birthCertificateController from "../controllers/birthCertificateController";

const router = Router();

router.route("/").post(birthCertificateController.createBirthCertificate);

export default router;
