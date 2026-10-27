
// NEW: src/lib/notificationApi.js

import axiosInstance from "../utils/axiosInstance.js";

// Fetch saved notification preferences.
export const getNotificationPreferences = async () => {
  const response = await axiosInstance.get("/api/v1/notifications");
  return response.data.data;
};

// Save notification preference changes.
export const updateNotificationPreferences = async (preferences) => {
  const response = await axiosInstance.patch(
    "/api/v1/notifications",
    preferences
  );

  return response.data.data;
};
