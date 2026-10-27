
import webpush from "web-push";

// NEW: Configure Web Push using backend-only VAPID keys
const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;
const subject = process.env.VAPID_SUBJECT;

if (!publicKey || !privateKey || !subject) {
  throw new Error("Missing VAPID configuration in backend .env");
}

webpush.setVapidDetails(subject, publicKey, privateKey);

export default webpush;
