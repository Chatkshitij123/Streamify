// UPDATED
import { Router } from "express";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  
} from "../controllers/notification.controllers.js"
import {savePushSubscription,
  removePushSubscription,
sendTestPushNotification} from "../controllers/pushSubscription.controllers.js"
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.use(verifyJWT);
  // NEW
router.post("/", savePushSubscription);
router.delete("/", removePushSubscription);
router.post("/test", sendTestPushNotification);

export default router;