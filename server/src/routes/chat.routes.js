import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { getStreamToken } from "../controllers/chat.controllers.js";


const router = Router();

//generate screen token route
router.route("/token").get(verifyJWT, getStreamToken)

export default router