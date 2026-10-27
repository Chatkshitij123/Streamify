
import { StreamChat } from "stream-chat";
import { PushSubscription } from "../models/pushSubscription.models.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";

const streamClient = StreamChat.getInstance(
  process.env.STREAM_API_KEY,
  process.env.STREAM_API_SECRET
);

export const handleStreamWebhook = async (req, res) => {
  try {
    // Step 1: Get the Stream signature
    const signature = req.headers["x-signature"];

    if (!req.rawBody || !signature) {
      return res.status(400).json({
        success: false,
        message: "Missing raw body or webhook signature",
      });
    }

    // Step 2: Verify the webhook signature
    const rawBody = req.rawBody.toString("utf8");

    const isValid = streamClient.verifyWebhook(
      rawBody,
      signature
    );

    if (!isValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid Stream webhook signature",
      });
    }

    // Step 3: Parse the verified event
    const event = JSON.parse(rawBody);

    // Process only new messages
    if (event.type !== "message.new") {
      return res.status(200).json({
        success: true,
        received: true,
        message: "Event ignored",
      });
    }

    // Step 4: Identify the sender
    const senderId = event.message?.user?.id;

    // Step 5: Get channel participants
    const members =
      event.members ?? event.channel?.members ?? [];

    // Exclude the sender from the recipient list
    const recipientIds = [
      ...new Set(
        members
          .map((member) => member.user_id)
          .filter(
            (userId) => userId && userId !== senderId
          )
      ),
    ];

    if (recipientIds.length === 0) {
      console.log("No recipients found for this message.");

      return res.status(200).json({
        success: true,
        received: true,
        notificationsSent: 0,
      });
    }

    // Step 6: Find recipients' push subscriptions
    const subscriptions = await PushSubscription.find({
      user: { $in: recipientIds },
    });

    // Step 7: Prepare notification content
    // const senderName =
    //   event.message?.user?.name || "New message";

    // const messageText =
    //   event.message?.text || "You received a new message.";
    // UPDATED: Use generic notification text for privacy
const notificationTitle = "Streamify";
const notificationBody = "You have a notification.";

    // Step 8: Send push notifications
    const results = await Promise.allSettled(
      subscriptions.map((subscription) =>
       // UPDATED: Open the specific chat when the notification is clicked
// sendPushNotification(subscription, {
//   title: senderName,
//   body: messageText,
//   url: `/chat/${encodeURIComponent(event.channel_id)}`,
// })
// UPDATED: Hide the sender's name and message content
sendPushNotification(subscription, {
  title: notificationTitle,
  body: notificationBody,
  url: `/chat/${encodeURIComponent(event.channel_id)}`,
})
      )
    );

    // UPDATED: Count successful deliveries
const successfulDeliveries = results.filter(
  (result) => result.status === "fulfilled"
).length;

const failedDeliveries =
  results.length - successfulDeliveries;

// NEW: Log the actual push delivery errors
results.forEach((result, index) => {
  if (result.status === "rejected") {
    console.error("Push delivery failed:", {
      subscriptionId: subscriptions[index]._id,
      statusCode: result.reason?.statusCode,
      message: result.reason?.message,
      body: result.reason?.body,
    });
  }
});

    // Step 9: Log the results
    console.log("Verified Stream message.new event:", {
      messageId: event.message?.id,
      senderId,
      channelId: event.channel_id,
      recipientIds,
      subscriptionsFound: subscriptions.length,
      successfulDeliveries,
      failedDeliveries,
    });

    return res.status(200).json({
      success: true,
      received: true,
      recipients: recipientIds.length,
      subscriptionsFound: subscriptions.length,
      successfulDeliveries,
      failedDeliveries,
    });
  } catch (error) {
    console.error(
      "Stream webhook verification/handling failed:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Webhook processing failed",
    });
  }
};
