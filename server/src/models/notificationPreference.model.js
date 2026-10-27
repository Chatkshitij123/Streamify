
import mongoose from "mongoose";

// NEW: Schema for Streamify notification preferences.
const notificationPreferenceSchema = new mongoose.Schema(
  {
    // NEW: One preference document per user.
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    // NEW: Master switch for Streamify notifications.
    notificationsEnabled: {
      type: Boolean,
      default: false,
    },

    // NEW: Notification categories.
    messages: {
      type: Boolean,
      default: true,
    },
    groups: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    calls: {
      type: Boolean,
      default: true,
    },

    // NEW: Additional notification preferences.
    showPreviews: {
      type: Boolean,
      default: true,
    },
    sound: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// NEW: Export the model.
export const NotificationPreference = mongoose.model(
  "NotificationPreference",
  notificationPreferenceSchema
);
