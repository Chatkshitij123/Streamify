
import axiosInstance from "./axiosInstance";

// NEW: Convert the Base64URL VAPID key into bytes
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
};

// NEW: Register service worker and subscribe this browser
export const enablePushNotifications = async () => {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Push notifications are not supported by this browser.");
  }

  const publicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

  if (!publicKey) {
    throw new Error("VITE_VAPID_PUBLIC_KEY is missing from frontend .env.");
  }

  if (Notification.permission === "denied") {
    throw new Error(
      "Notifications are blocked. Allow them in your browser site settings."
    );
  }

  const permission =
    Notification.permission === "granted"
      ? "granted"
      : await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const registration = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicKey),
    });
  }

  // NEW: Store this browser subscription in the backend
  await axiosInstance.post(
    "/api/v1/notifications/subscriptions",
    subscription.toJSON()
  );

  return subscription;
};

// NEW: Remove this browser subscription from the backend
export const disablePushNotifications = async () => {
  const registration = await navigator.serviceWorker.getRegistration("/");

  if (!registration) return;

  const subscription = await registration.pushManager.getSubscription();

  if (!subscription) return;

  await axiosInstance.delete("/api/v1/notifications/subscriptions", {
    data: { endpoint: subscription.endpoint },
  });

  await subscription.unsubscribe();
};
