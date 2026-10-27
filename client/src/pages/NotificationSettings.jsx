
// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   ArrowLeftIcon,
//   BellRingIcon,
//   MessageSquareIcon,
//   UsersIcon,
//   RadioIcon,
//   PhoneIcon,
//   EyeIcon,
//   Volume2Icon,
//   SmartphoneIcon,
//   ChevronRightIcon,
// } from "lucide-react";

// // NEW: Notification settings page
// const NotificationSettings = () => {
//   // NEW: Frontend-only state; backend persistence will be added later
//   const [deviceEnabled, setDeviceEnabled] = useState(false);

//   // NEW: Individual notification preferences
//   const [preferences, setPreferences] = useState({
//     messages: true,
//     groups: true,
//     status: false,
//     calls: true,
//     showPreviews: true,
//     sound: true,
//   });

//   // NEW: Reusable handler for preference switches
//   const handlePreferenceChange = (key) => {
//     setPreferences((previous) => ({
//       ...previous,
//       [key]: !previous[key],
//     }));
//   };

//   // NEW: Notification categories
//   const notificationCategories = [
//     {
//       key: "messages",
//       title: "Messages",
//       description: "Direct message notifications",
//       icon: MessageSquareIcon,
//     },
//     {
//       key: "groups",
//       title: "Groups",
//       description: "Group conversation notifications",
//       icon: UsersIcon,
//     },
//     {
//       key: "status",
//       title: "Status",
//       description: "Status and activity updates",
//       icon: RadioIcon,
//     },
//     {
//       key: "calls",
//       title: "Calls",
//       description: "Incoming call notifications",
//       icon: PhoneIcon,
//     },
//   ];

//   // NEW: Shared switch component for preference controls
//   const PreferenceSwitch = ({ checked, onChange, label, disabled = false }) => (
//     <input
//       type="checkbox"
//       className="toggle toggle-primary"
//       checked={checked}
//       onChange={onChange}
//       disabled={disabled}
//       aria-label={label}
//     />
//   );

//   return (
//     <div className="p-4 sm:p-6 lg:p-8">
//       <div className="container mx-auto max-w-3xl space-y-6">

//         {/* NEW: Back navigation to Settings */}
//         <Link
//           to="/settings"
//           className="btn btn-ghost btn-sm gap-2 normal-case w-fit"
//         >
//           <ArrowLeftIcon className="size-4" />
//           Back to Settings
//         </Link>

//         {/* NEW: Page heading */}
//         <div className="flex items-center gap-3">
//           <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10">
//             <BellRingIcon className="size-6 text-primary" />
//           </div>

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
//               Notifications
//             </h1>
//             <p className="text-sm opacity-70 mt-1">
//               Manage your Streamify notification preferences.
//             </p>
//           </div>
//         </div>

//         {/* NEW: Global device notification control */}
//         <section className="card bg-base-200 border border-base-300 shadow-sm">
//           <div className="card-body p-4 sm:p-5">
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center size-11 rounded-xl bg-base-300">
//                 <SmartphoneIcon className="size-5" />
//               </div>

//               <div className="flex-1">
//                 <h2 className="font-semibold">Device notifications</h2>
//                 <p className="text-sm opacity-70 mt-1">
//                   {deviceEnabled
//                     ? "Notifications are enabled in this preview."
//                     : "Turn on notifications for this device."}
//                 </p>
//               </div>

//               <PreferenceSwitch
//                 label="Enable device notifications"
//                 checked={deviceEnabled}
//                 onChange={() => setDeviceEnabled((previous) => !previous)}
//               />
//             </div>

//             {/* NEW: Clarify the current prototype behaviour */}
//             <p className="text-xs opacity-60 mt-2">
//               This switch is a frontend preview. Browser permission and push
//               delivery will be connected in a later step.
//             </p>
//           </div>
//         </section>

//         {/* NEW: Individual notification categories */}
//         <section className="space-y-3">
//           <div>
//             <h2 className="text-lg font-semibold">Notify me about</h2>
//             <p className="text-sm opacity-70 mt-1">
//               Choose which types of activity you want to be notified about.
//             </p>
//           </div>

//           <div className="rounded-xl border border-base-300 divide-y divide-base-300 overflow-hidden">
//             {notificationCategories.map((category) => {
//               const Icon = category.icon;

//               return (
//                 <div
//                   key={category.key}
//                   className="flex items-center gap-3 p-4 bg-base-100"
//                 >
//                   <div className="flex items-center justify-center size-10 rounded-lg bg-base-200">
//                     <Icon className="size-5 opacity-80" />
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-medium">{category.title}</h3>
//                     <p className="text-sm opacity-70">
//                       {category.description}
//                     </p>
//                   </div>

//                   <PreferenceSwitch
//                     label={`${category.title} notifications`}
//                     checked={preferences[category.key]}
//                     disabled={!deviceEnabled}
//                     onChange={() => handlePreferenceChange(category.key)}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </section>

//         {/* NEW: Preview and sound preferences */}
//         <section className="space-y-3">
//           <h2 className="text-lg font-semibold">Notification behaviour</h2>

//           <div className="rounded-xl border border-base-300 divide-y divide-base-300 overflow-hidden">
//             <div className="flex items-center gap-3 p-4 bg-base-100">
//               <div className="flex items-center justify-center size-10 rounded-lg bg-base-200">
//                 <EyeIcon className="size-5 opacity-80" />
//               </div>

//               <div className="flex-1">
//                 <h3 className="font-medium">Show previews</h3>
//                 <p className="text-sm opacity-70">
//                   Display message text in notifications.
//                 </p>
//               </div>

//               <PreferenceSwitch
//                 label="Show message previews"
//                 checked={preferences.showPreviews}
//                 disabled={!deviceEnabled}
//                 onChange={() => handlePreferenceChange("showPreviews")}
//               />
//             </div>

//             <div className="flex items-center gap-3 p-4 bg-base-100">
//               <div className="flex items-center justify-center size-10 rounded-lg bg-base-200">
//                 <Volume2Icon className="size-5 opacity-80" />
//               </div>

//               <div className="flex-1">
//                 <h3 className="font-medium">Notification sound</h3>
//                 <p className="text-sm opacity-70">
//                   Allow sounds for notifications where supported.
//                 </p>
//               </div>

//               <PreferenceSwitch
//                 label="Notification sound"
//                 checked={preferences.sound}
//                 disabled={!deviceEnabled}
//                 onChange={() => handlePreferenceChange("sound")}
//               />
//             </div>
//           </div>
//         </section>

//         {/* NEW: Future settings information */}
//         <div className="flex items-start gap-2 text-sm opacity-70">
//           <ChevronRightIcon className="size-4 mt-0.5 shrink-0" />
//           <p>
//             Your browser or device settings may also control whether
//             notifications can be displayed.
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default NotificationSettings;





// import React, { useState } from "react";
// // NEW
// import {
//   getNotificationPreferences,
//   updateNotificationPreferences,
// } from "../lib/notificationApi.js";
// import { Link } from "react-router-dom";
// import {
//   ArrowLeftIcon,
//   BellRingIcon,
//   MessageSquareIcon,
//   UsersIcon,
//   RadioIcon,
//   PhoneIcon,
//   EyeIcon,
//   Volume2Icon,
//   SmartphoneIcon,
//   ChevronRightIcon,
// } from "lucide-react";

// // NEW: Check browser notification support safely.
// const isNotificationSupported =
//   typeof window !== "undefined" && "Notification" in window;

// // NEW: Reusable switch component.
// const PreferenceSwitch = ({ enabled, onChange, disabled = false }) => {
//   return (
//     <button
//       type="button"
//       role="switch"
//       aria-checked={enabled}
//       disabled={disabled}
//       onClick={() => onChange(!enabled)}
//       className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors
//         ${
//           enabled
//             ? "border-primary bg-primary"
//             : "border-base-content/30 bg-base-300"
//         }
//         ${
//           disabled
//             ? "cursor-not-allowed opacity-40"
//             : "cursor-pointer"
//         }`}
//     >
//       <span
//         className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
//           ${enabled ? "translate-x-5" : "translate-x-1"}`}
//       />
//     </button>
//   );
// };

// const NotificationSettings = () => {
//   // NEW: Read the browser's actual permission status.
//   const [permission, setPermission] = useState(() => {
//     return isNotificationSupported
//       ? Notification.permission
//       : "unsupported";
//   });

//   // UPDATED: Store Streamify's app-level preference separately.
//   // It no longer automatically turns on just because browser permission is granted.
//   const [deviceEnabled, setDeviceEnabled] = useState(() => {
//     return (
//       typeof window !== "undefined" &&
//       isNotificationSupported &&
//       Notification.permission === "granted" &&
//       localStorage.getItem("streamify-device-notifications") === "true"
//     );
//   });

//   // NEW: Feedback shown to the user.
//   const [permissionMessage, setPermissionMessage] = useState("");

//   // Existing notification preferences.
//   const [preferences, setPreferences] = useState({
//     messages: true,
//     groups: true,
//     status: false,
//     calls: true,
//     showPreviews: true,
//     sound: true,
//   });

//   // NEW: Persist Streamify's own on/off setting.
//   const updateDeviceEnabled = (enabled) => {
//     setDeviceEnabled(enabled);

//     localStorage.setItem(
//       "streamify-device-notifications",
//       String(enabled)
//     );
//   };

//   // UPDATED: Handle browser permission and app-level enable/disable.
//   const handleDeviceNotificationToggle = async () => {
//     setPermissionMessage("");

//     // Browser does not support notifications.
//     if (!isNotificationSupported) {
//       setPermission("unsupported");
//       setPermissionMessage(
//         "Your browser does not support notifications."
//       );
//       return;
//     }

//     // Turn OFF Streamify notifications without revoking browser permission.
//     if (deviceEnabled) {
//       updateDeviceEnabled(false);

//       setPermissionMessage(
//         "Notifications are turned off in Streamify on this device. Browser permission has not been revoked."
//       );

//       return;
//     }

//     // Browser permission was previously denied.
//     if (Notification.permission === "denied") {
//       setPermission("denied");

//       setPermissionMessage(
//         "Notifications are blocked by your browser. Open your browser's site settings and allow notifications for Streamify."
//       );

//       return;
//     }

//     try {
//       // Request permission only after the user clicks the switch.
//       let result = Notification.permission;

//       if (result !== "granted") {
//         result = await Notification.requestPermission();
//       }

//       // UPDATED: Keep browser permission status in sync.
//       setPermission(result);

//       if (result === "granted") {
//         updateDeviceEnabled(true);

//         setPermissionMessage(
//           "Browser permission granted. Streamify notifications are enabled on this device."
//         );
//       } else if (result === "denied") {
//         updateDeviceEnabled(false);

//         setPermissionMessage(
//           "Permission was denied. Allow notifications in your browser's site settings to enable them."
//         );
//       } else {
//         updateDeviceEnabled(false);

//         setPermissionMessage(
//           "Notification permission was not granted. Try enabling it again."
//         );
//       }
//     } catch (error) {
//       console.error("Notification permission error:", error);

//       setPermissionMessage(
//         "Could not request notification permission. Please try again."
//       );
//     }
//   };

//   // UPDATED: Handle category preference changes.
//   const handlePreferenceChange = (key, value) => {
//     setPreferences((previous) => ({
//       ...previous,
//       [key]: value,
//     }));
//   };

//   // Existing notification categories.
//   const categories = [
//     {
//       key: "messages",
//       title: "Messages",
//       description: "Direct message notifications",
//       icon: MessageSquareIcon,
//     },
//     {
//       key: "groups",
//       title: "Groups",
//       description: "Group conversation notifications",
//       icon: UsersIcon,
//     },
//     {
//       key: "status",
//       title: "Status",
//       description: "Status and activity updates",
//       icon: RadioIcon,
//     },
//     {
//       key: "calls",
//       title: "Calls",
//       description: "Incoming call notifications",
//       icon: PhoneIcon,
//     },
//   ];

//   // NEW: Additional notification preferences.
//   const additionalPreferences = [
//     {
//       key: "showPreviews",
//       title: "Show previews",
//       description: "Display message content in notifications",
//       icon: EyeIcon,
//     },
//     {
//       key: "sound",
//       title: "Notification sound",
//       description: "Play a sound when notifications arrive",
//       icon: Volume2Icon,
//     },
//   ];

//   return (
//     <div className="mx-auto w-full max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <div className="space-y-6">
//         <Link
//           to="/settings"
//           className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 transition hover:text-primary"
//         >
//           <ArrowLeftIcon size={16} />
//           Back to Settings
//         </Link>

//         <div className="flex items-center gap-3">
//           <div className="rounded-xl bg-primary/10 p-3 text-primary">
//             <BellRingIcon size={26} />
//           </div>

//           <div>
//             <h1 className="text-2xl font-bold sm:text-3xl">
//               Notifications
//             </h1>

//             <p className="text-sm text-base-content/70 sm:text-base">
//               Manage your Streamify notification preferences.
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Device notifications */}
//       <section className="rounded-xl border border-base-300 bg-base-200/50 p-5">
//         <div className="flex items-center justify-between gap-4">
//           <div className="flex items-center gap-3">
//             <div className="rounded-xl bg-base-300/50 p-3">
//               <SmartphoneIcon size={22} />
//             </div>

//             <div>
//               <h2 className="font-semibold">
//                 Device notifications
//               </h2>

//               <p className="text-sm text-base-content/70">
//                 Enable notifications for this device.
//               </p>
//             </div>
//           </div>

//           {/* UPDATED: Uses browser permission handler. */}
//           <PreferenceSwitch
//             enabled={deviceEnabled}
//             onChange={handleDeviceNotificationToggle}
//             disabled={!isNotificationSupported}
//           />
//         </div>

//         {/* NEW: Display the actual browser permission separately. */}
//         <p className="mt-4 text-xs text-base-content/70">
//           Browser permission:{" "}
//           <span className="font-semibold">
//             {permission === "unsupported"
//               ? "Unsupported"
//               : permission === "granted"
//                 ? "Granted"
//                 : permission === "denied"
//                   ? "Denied"
//                   : "Not granted"}
//           </span>
//         </p>

//         {/* NEW: Feedback for permission and toggle changes. */}
//         {permissionMessage && (
//           <div
//             role="status"
//             className="mt-4 rounded-lg border border-base-300 bg-base-100 p-3 text-sm"
//           >
//             {permissionMessage}
//           </div>
//         )}
//       </section>

//       {/* Notification categories */}
//       <section className="space-y-3">
//         <div>
//           <h2 className="text-lg font-semibold">
//             Notify me about
//           </h2>

//           <p className="text-sm text-base-content/70">
//             Choose which types of activity you want to be notified about.
//           </p>
//         </div>

//         <div className="overflow-hidden rounded-xl border border-base-300">
//           {categories.map((category) => {
//             const Icon = category.icon;

//             return (
//               <div
//                 key={category.key}
//                 className="flex items-center justify-between gap-4 border-b border-base-300 p-4 last:border-b-0"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="rounded-lg bg-base-200 p-3">
//                     <Icon size={20} />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold">
//                       {category.title}
//                     </h3>

//                     <p className="text-sm text-base-content/70">
//                       {category.description}
//                     </p>
//                   </div>
//                 </div>

//                 {/* UPDATED: Disabled when device notifications are off. */}
//                 <PreferenceSwitch
//                   enabled={preferences[category.key]}
//                   onChange={(value) =>
//                     handlePreferenceChange(category.key, value)
//                   }
//                   disabled={!deviceEnabled}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* Additional preferences */}
//       <section className="space-y-3">
//         <h2 className="text-lg font-semibold">
//           Notification options
//         </h2>

//         <div className="overflow-hidden rounded-xl border border-base-300">
//           {additionalPreferences.map((preference) => {
//             const Icon = preference.icon;

//             return (
//               <div
//                 key={preference.key}
//                 className="flex items-center justify-between gap-4 border-b border-base-300 p-4 last:border-b-0"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="rounded-lg bg-base-200 p-3">
//                     <Icon size={20} />
//                   </div>

//                   <div>
//                     <h3 className="font-semibold">
//                       {preference.title}
//                     </h3>

//                     <p className="text-sm text-base-content/70">
//                       {preference.description}
//                     </p>
//                   </div>
//                 </div>

//                 <PreferenceSwitch
//                   enabled={preferences[preference.key]}
//                   onChange={(value) =>
//                     handlePreferenceChange(preference.key, value)
//                   }
//                   disabled={!deviceEnabled}
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </section>

//       {/* NEW: Clear distinction between UI preferences and actual push delivery. */}
//       <p className="text-sm text-base-content/60">
//         These settings currently apply to this page's interface. Saving
//         category preferences across sessions and delivering background
//         push notifications will require additional integration.
//       </p>

//       {/* Optional navigation */}
//       <Link
//         to="/settings"
//         className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
//       >
//         More settings
//         <ChevronRightIcon size={16} />
//       </Link>
//     </div>
//   );
// };

// export default NotificationSettings;


import React, { useEffect, useState } from "react";
import {
  enablePushNotifications,
  disablePushNotifications,
} from "../utils/pushNotifications.js";

import axiosInstance from "../utils/axiosInstance.js";
import { Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  BellRingIcon,
  MessageSquareIcon,
  UsersIcon,
  RadioIcon,
  PhoneIcon,
  EyeIcon,
  Volume2Icon,
  SmartphoneIcon,
  ChevronRightIcon,
} from "lucide-react";

// UPDATED: Correct path — notificationApi.js is in src/utils/.
import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from "../lib/notificationApi.js";

// NEW: Check browser notification support safely.
const isNotificationSupported =
  typeof window !== "undefined" && "Notification" in window;

// Existing reusable switch component.
const PreferenceSwitch = ({
  enabled,
  onChange,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors
        ${
          enabled
            ? "border-primary bg-primary"
            : "border-base-content/30 bg-base-300"
        }
        ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "cursor-pointer"
        }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform
          ${enabled ? "translate-x-5" : "translate-x-1"}`}
      />
    </button>
  );
};

const NotificationSettings = () => {
  // Existing browser permission state.
  const [permission, setPermission] = useState(() =>
    isNotificationSupported ? Notification.permission : "unsupported"
  );

  // UPDATED: Initial value comes from the backend, not localStorage.
  const [deviceEnabled, setDeviceEnabled] = useState(false);

  // Existing category preferences.
  const [preferences, setPreferences] = useState({
    messages: true,
    groups: true,
    status: false,
    calls: true,
    showPreviews: true,
    sound: true,
  });

  // NEW: Loading and saving states.
  const [isLoadingPreferences, setIsLoadingPreferences] = useState(true);
  const [savingKey, setSavingKey] = useState("");
  const [saveError, setSaveError] = useState("");

  // Existing permission feedback.
  const [permissionMessage, setPermissionMessage] = useState("");

  // NEW: Load saved preferences from MongoDB on page mount.
  useEffect(() => {
    let isMounted = true;

    const loadPreferences = async () => {
      try {
        const data = await getNotificationPreferences();

        if (!isMounted) return;

        setDeviceEnabled(Boolean(data.notificationsEnabled));

        setPreferences({
          messages: data.messages,
          groups: data.groups,
          status: data.status,
          calls: data.calls,
          showPreviews: data.showPreviews,
          sound: data.sound,
        });

        // UPDATED: Keep localStorage as a temporary compatibility cache.
        localStorage.setItem(
          "streamify-device-notifications",
          String(data.notificationsEnabled)
        );
      } catch (error) {
        if (!isMounted) return;

        console.error("Failed to load notification preferences:", error);

        setSaveError(
          error.response?.data?.message ||
            "Unable to load notification preferences. Please refresh the page."
        );
      } finally {
        if (isMounted) {
          setIsLoadingPreferences(false);
        }
      }
    };

    loadPreferences();

    return () => {
      isMounted = false;
    };
  }, []);

  // UPDATED: Persist the master toggle through the backend.
  const updateDeviceEnabled = async (enabled) => {
    setSavingKey("device");
    setSaveError("");

    try {
      const data = await updateNotificationPreferences({
        notificationsEnabled: enabled,
      });

      setDeviceEnabled(data.notificationsEnabled);

      localStorage.setItem(
        "streamify-device-notifications",
        String(data.notificationsEnabled)
      );

      return true;
    } catch (error) {
      console.error("Failed to update device notifications:", error);

      setSaveError(
        error.response?.data?.message ||
          "Unable to save device notification settings."
      );

      return false;
    } finally {
      setSavingKey("");
    }
  };

  // UPDATED: Browser permission + backend preference.
  const handleDeviceNotificationToggle = async () => {
    if (isLoadingPreferences || savingKey) return;

    setPermissionMessage("");
    setSaveError("");

    if (!isNotificationSupported) {
      setPermission("unsupported");
      setPermissionMessage(
        "Your browser does not support notifications."
      );
      return;
    }

    // Turn off Streamify notifications without revoking browser permission.
    if (deviceEnabled) {
      const saved = await updateDeviceEnabled(false);

      if (saved) {
        setPermissionMessage(
          "Streamify notifications are off on this device. Browser permission remains unchanged."
        );
      }

      return;
    }

    // Browser permission was previously denied.
    if (Notification.permission === "denied") {
      setPermission("denied");

      setPermissionMessage(
        "Notifications are blocked by your browser. Allow them in your browser's site settings."
      );

      return;
    }

    try {
      // Ask only after the user clicks, if permission is not already granted.
      let result = Notification.permission;

      if (result !== "granted") {
        result = await Notification.requestPermission();
      }

      setPermission(result);

      if (result === "granted") {
        // NEW: Register this browser/device's push subscription.
  await enablePushNotifications();
        const saved = await updateDeviceEnabled(true);

        if (saved) {
          setPermissionMessage(
            "Browser permission is granted and Streamify notification preferences are enabled."
          );
        }
      } else if (result === "denied") {
        setPermissionMessage(
          "Permission was denied. Change the notification permission in your browser settings."
        );
      } else {
        setPermissionMessage(
          "Permission was not granted. You can try enabling notifications again."
        );
      }
    } catch (error) {
      console.error("Notification permission error:", error);

      setPermissionMessage(
  error.response?.data?.message ||
  error.message ||
  "Could not enable push notifications."
);
    }
  };

  // UPDATED: Save individual categories through the backend.
  const handlePreferenceChange = async (key, value) => {
    if (isLoadingPreferences || savingKey || !deviceEnabled) return;

    setSavingKey(key);
    setSaveError("");

    try {
      const data = await updateNotificationPreferences({
        [key]: value,
      });

      // Update the UI only after the backend confirms the change.
      setPreferences((previous) => ({
        ...previous,
        [key]: data[key],
      }));
    } catch (error) {
      console.error("Failed to update notification preference:", error);

      setSaveError(
        error.response?.data?.message ||
          "Unable to save this notification preference."
      );
    } finally {
      setSavingKey("");
    }
  };

  // Existing notification categories.
  const categories = [
    {
      key: "messages",
      title: "Messages",
      description: "Direct message notifications",
      icon: MessageSquareIcon,
    },
    {
      key: "groups",
      title: "Groups",
      description: "Group conversation notifications",
      icon: UsersIcon,
    },
    {
      key: "status",
      title: "Status",
      description: "Status and activity updates",
      icon: RadioIcon,
    },
    {
      key: "calls",
      title: "Calls",
      description: "Incoming call notifications",
      icon: PhoneIcon,
    },
  ];

  // Existing additional preferences.
  const additionalPreferences = [
    {
      key: "showPreviews",
      title: "Show previews",
      description: "Display message content in notifications",
      icon: EyeIcon,
    },
    {
      key: "sound",
      title: "Notification sound",
      description: "Play a sound when notifications arrive",
      icon: Volume2Icon,
    },
  ];

  // NEW: Disable controls during initial loading or saving.
  const controlsDisabled =
    isLoadingPreferences || Boolean(savingKey);

  return (
    <div className="mx-auto w-full max-w-4xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Existing header */}
      <div className="space-y-6">
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 text-sm font-medium text-base-content/80 transition hover:text-primary"
        >
          <ArrowLeftIcon size={16} />
          Back to Settings
        </Link>

        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-3 text-primary">
            <BellRingIcon size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Notifications
            </h1>

            <p className="text-sm text-base-content/70 sm:text-base">
              Manage your Streamify notification preferences.
            </p>
          </div>
        </div>
      </div>

      {/* NEW: Loading indicator */}
      {isLoadingPreferences && (
        <p role="status" className="text-sm text-base-content/70">
          Loading notification preferences...
        </p>
      )}

      {/* NEW: Backend errors */}
      {saveError && (
        <div
          role="alert"
          className="rounded-lg border border-error/30 bg-error/10 p-3 text-sm"
        >
          {saveError}
        </div>
      )}

      {/* Device notifications */}
      <section className="rounded-xl border border-base-300 bg-base-200/50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-base-300/50 p-3">
              <SmartphoneIcon size={22} />
            </div>

            <div>
              <h2 className="font-semibold">
                Device notifications
              </h2>

              <p className="text-sm text-base-content/70">
                Enable notifications for this device.
              </p>
            </div>
          </div>

          {/* UPDATED: Save the master switch through the API. */}
          <PreferenceSwitch
            enabled={deviceEnabled}
            onChange={handleDeviceNotificationToggle}
            disabled={
              !isNotificationSupported || controlsDisabled
            }
          />
        </div>

        {/* Existing browser permission status */}
        <p className="mt-4 text-xs text-base-content/70">
          Browser permission:{" "}
          <span className="font-semibold">
            {permission === "unsupported"
              ? "Unsupported"
              : permission === "granted"
                ? "Granted"
                : permission === "denied"
                  ? "Denied"
                  : "Not granted"}
          </span>
        </p>

        {/* Existing permission feedback */}
        {permissionMessage && (
          <div
            role="status"
            className="mt-4 rounded-lg border border-base-300 bg-base-100 p-3 text-sm"
          >
            {permissionMessage}
          </div>
        )}
      </section>

      {/* Notification categories */}
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">
            Notify me about
          </h2>

          <p className="text-sm text-base-content/70">
            Choose which types of activity you want to be notified about.
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-base-300">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.key}
                className="flex items-center justify-between gap-4 border-b border-base-300 p-4 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-base-200 p-3">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {category.title}
                    </h3>

                    <p className="text-sm text-base-content/70">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* UPDATED: Save each category to MongoDB. */}
                <PreferenceSwitch
                  enabled={preferences[category.key]}
                  onChange={(value) =>
                    handlePreferenceChange(category.key, value)
                  }
                  disabled={!deviceEnabled || controlsDisabled}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* Additional notification preferences */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          Notification options
        </h2>

        <div className="overflow-hidden rounded-xl border border-base-300">
          {additionalPreferences.map((preference) => {
            const Icon = preference.icon;

            return (
              <div
                key={preference.key}
                className="flex items-center justify-between gap-4 border-b border-base-300 p-4 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-base-200 p-3">
                    <Icon size={20} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {preference.title}
                    </h3>

                    <p className="text-sm text-base-content/70">
                      {preference.description}
                    </p>
                  </div>
                </div>

                {/* UPDATED: Persist previews and sound preferences. */}
                <PreferenceSwitch
                  enabled={preferences[preference.key]}
                  onChange={(value) =>
                    handlePreferenceChange(preference.key, value)
                  }
                  disabled={!deviceEnabled || controlsDisabled}
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* UPDATED: Explain current implementation limits. */}
      <p className="text-sm text-base-content/60">
        Your notification preferences are saved to your account.
        Background push delivery still requires a service worker,
        a push subscription, and backend delivery integration.
      </p>

      <Link
        to="/settings"
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
      >
        More settings
        <ChevronRightIcon size={16} />
      </Link>
    </div>
  );
};

export default NotificationSettings;



