
import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../controllers/notification.controllers.js";

// NEW: Notification preferences router.
const router = Router();

// NEW: Both endpoints require authentication.
router.use(verifyJWT);

router.get("/", getNotificationPreferences);
router.patch("/", updateNotificationPreferences);

export default router;
