
import { Router } from "express";
import { handleStreamWebhook } from "../controllers/streamWebhook.controllers.js";

const router = Router();

// NEW: Stream authenticates requests through webhook signatures,
// so do not apply your user-cookie verifyJWT middleware here.
router.post("/", handleStreamWebhook);

export default router;
