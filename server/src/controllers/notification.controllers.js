
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { NotificationPreference } from "../models/notificationPreference.model.js";

// NEW: Fields users are allowed to update.
const allowedPreferenceFields = [
  "notificationsEnabled",
  "messages",
  "groups",
  "status",
  "calls",
  "showPreviews",
  "sound",
];

// NEW: Get the authenticated user's notification preferences.
export const getNotificationPreferences = asyncHandler(
  async (req, res) => {
    let preferences = await NotificationPreference.findOne({
      user: req.user._id,
    });

    // NEW: Create default preferences for first-time users.
    if (!preferences) {
      preferences = await NotificationPreference.create({
        user: req.user._id,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification preferences fetched successfully",
      data: preferences,
    });
  }
);

// NEW: Update the authenticated user's notification preferences.
export const updateNotificationPreferences = asyncHandler(
  async (req, res) => {
    const updates = {};

    // NEW: Accept only known fields with boolean values.
    for (const field of allowedPreferenceFields) {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        if (typeof req.body[field] !== "boolean") {
          throw new ApiError(
            400,
            `${field} must be a boolean value`
          );
        }

        updates[field] = req.body[field];
      }
    }

    if (Object.keys(updates).length === 0) {
      throw new ApiError(
        400,
        "Provide at least one valid notification preference"
      );
    }

    // NEW: Update only the logged-in user's document.
    const preferences = await NotificationPreference.findOneAndUpdate(
      { user: req.user._id },
      {
        $set: updates,
        $setOnInsert: { user: req.user._id },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Notification preferences updated successfully",
      data: preferences,
    });
  }
);
