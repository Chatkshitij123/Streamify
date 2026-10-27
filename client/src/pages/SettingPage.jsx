
import React from "react";
import { Link } from "react-router-dom";
import {
  UserRoundIcon,
  KeyRoundIcon,
  LockKeyholeIcon,
  MessageSquareIcon,
  BellIcon,
  PaletteIcon,
  CircleHelpIcon,
  ChevronRightIcon,
  SearchIcon,
} from "lucide-react";

// NEW: Settings overview page
const SettingsPage = () => {
  const settingsItems = [
    // {
    //   title: "Profile",
    //   description: "Name, profile picture and personal information",
    //   icon: UserRoundIcon,
    //   path: "/settings/profile",
    // },
    // {
    //   title: "Account",
    //   description: "Security and account information",
    //   icon: KeyRoundIcon,
    //   path: "/settings/account",
    // },
    // {
    //   title: "Privacy",
    //   description: "Blocked users and privacy controls",
    //   icon: LockKeyholeIcon,
    //   path: "/settings/privacy",
    // },
    // {
    //   title: "Chats",
    //   description: "Chat preferences and messaging",
    //   icon: MessageSquareIcon,
    //   path: "/settings/chats",
    // },
    {
      title: "Notifications",
      description: "Messages, groups, calls and sounds",
      icon: BellIcon,
      path: "/settings/notifications",
    },
    // {
    //   title: "Appearance",
    //   description: "Theme and display preferences",
    //   icon: PaletteIcon,
    //   path: "/settings/appearance",
    // },
    // {
    //   title: "Help and feedback",
    //   description: "Get help with Streamify",
    //   icon: CircleHelpIcon,
    //   path: "/settings/help",
    // },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-3xl space-y-6">
        {/* NEW: Settings page heading */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          Settings
        </h1>

        {/* NEW: Search bar UI (search functionality can be added later) */}
        <div className="input input-bordered flex items-center gap-2 w-full">
          <SearchIcon className="size-5 opacity-60" />
          <input
            type="text"
            placeholder="Search settings"
            className="grow bg-transparent outline-none"
            aria-label="Search settings"
          />
        </div>

        {/* NEW: Settings categories */}
        <div className="space-y-2">
          {settingsItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                to={item.path}
                className="flex items-center gap-4 p-4 rounded-xl border border-base-300 bg-base-100 hover:bg-base-200 transition-colors"
              >
                <div className="flex items-center justify-center size-11 rounded-xl bg-base-200">
                  <Icon className="size-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm opacity-70">
                    {item.description}
                  </p>
                </div>

                <ChevronRightIcon className="size-5 opacity-50 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
