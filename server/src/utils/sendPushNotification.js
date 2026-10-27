
import webpush from "../config/push.config.js";

// NEW: Send a push notification to one saved subscription
export const sendPushNotification = async (subscription, payload) => {
  try {
    await webpush.sendNotification(
      {
        endpoint: subscription.endpoint,
        expirationTime: subscription.expirationTime ?? null,
        keys: subscription.keys,
      },
      JSON.stringify(payload)
    );

    return true;
  } catch (error) {
    // UPDATED: Remove expired or invalid subscriptions
    if (error.statusCode === 404 || error.statusCode === 410) {
      await subscription.deleteOne();
    }

    throw error;
  }
};
