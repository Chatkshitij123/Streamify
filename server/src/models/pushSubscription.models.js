
import mongoose from "mongoose";

const pushSubscriptionSchema = new mongoose.Schema(
  {
    // NEW: Associate each browser subscription with its user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // NEW: Browser-specific push endpoint
    endpoint: {
      type: String,
      required: true,
      unique: true,
    },

    // NEW: Encryption keys supplied by the browser
    keys: {
      p256dh: {
        type: String,
        required: true,
      },
      auth: {
        type: String,
        required: true,
      },
    },

    // NEW: Optional subscription expiry timestamp
    expirationTime: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export const PushSubscription = mongoose.model(
  "PushSubscription",
  pushSubscriptionSchema
);
