// NEW
import { PushSubscription } from "../models/pushSubscription.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendPushNotification } from "../utils/sendPushNotification.js";


 // NEW: Save or update the current user's browser subscription
export const savePushSubscription = asyncHandler(async (req, res) => {
  const { endpoint, keys, expirationTime } = req.body;

  if (!endpoint || !keys?.p256dh || !keys?.auth) {
    throw new ApiError(400, "A valid push subscription is required");
  }

  const subscription = await PushSubscription.findOneAndUpdate(
    { endpoint },
    {
      $set: {
        user: req.user._id,
        endpoint,
        keys: {
          p256dh: keys.p256dh,
          auth: keys.auth,
        },
        expirationTime: expirationTime ?? null,
      },
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    }
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      { id: subscription._id },
      "Push subscription saved successfully"
    )
  );
});

// NEW: Remove a browser subscription
export const removePushSubscription = asyncHandler(async (req, res) => {
  const { endpoint } = req.body;

  if (!endpoint) {
    throw new ApiError(400, "Subscription endpoint is required");
  }

  await PushSubscription.deleteOne({
    user: req.user._id,
    endpoint,
  });

  return res.status(200).json(
    new ApiResponse(200, {}, "Push subscription removed successfully")
  );
});

export const sendTestPushNotification = asyncHandler(async (req, res) => {
  const subscription = await PushSubscription.findOne({
    user: req.user._id,
  });

  if (!subscription) {
    throw new ApiError(404, "No push subscription found for your account");
  }

  await sendPushNotification(subscription, {
    title: "Streamify",
    body: "Push notifications are working successfully!",
    url: "/",
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      {},
      "Test push notification sent successfully"
    )
  );
});
