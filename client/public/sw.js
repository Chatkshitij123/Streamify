
// self.addEventListener("push", (event) => {
//   // NEW: Handle incoming push notifications
//   let payload = {
//     title: "Streamify",
//     body: "You have a new notification.",
//     url: "/",
//   };

//   if (event.data) {
//     try {
//       payload = { ...payload, ...event.data.json() };
//     } catch {
//       payload.body = event.data.text();
//     }
//   }

//   event.waitUntil(
//     self.registration.showNotification(payload.title, {
//       body: payload.body,
//       icon: "/favicon.ico",
//       data: { url: payload.url || "/" },
//     })
//   );
// });

// self.addEventListener("notificationclick", (event) => {
//   // NEW: Open Streamify when the notification is clicked
//   event.notification.close();

//   const targetUrl = new URL(
//     event.notification.data?.url || "/",
//     self.location.origin
//   ).href;

//   event.waitUntil(
//     clients.matchAll({ type: "window", includeUncontrolled: true }).then(
//       (windowClients) => {
//         for (const client of windowClients) {
//           if (client.url.startsWith(self.location.origin) && "focus" in client) {
//             client.navigate(targetUrl);
//             return client.focus();
//           }
//         }

//         return clients.openWindow(targetUrl);
//       }
//     )
//   );
// });


self.addEventListener("push", (event) => {
  let payload = {
    title: "Streamify",
    body: "You have a new notification.",
    url: "/",
  };

  if (event.data) {
    try {
      payload = { ...payload, ...event.data.json() };
    } catch {
      payload.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(payload.title, {
      body: payload.body,
      icon: "/favicon.ico",
      data: {
        url: payload.url || "/",
      },
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = new URL(
    event.notification.data?.url || "/",
    self.location.origin
  ).href;

  event.waitUntil(
    (async () => {
      const windowClients = await clients.matchAll({
        type: "window",
        includeUncontrolled: true,
      });

      for (const client of windowClients) {
        if (client.url.startsWith(self.location.origin)) {
          try {
            await client.navigate(targetUrl);
            await client.focus();
            return;
          } catch (error) {
            console.error(
              "Could not navigate existing tab:",
              error
            );
          }
        }
      }

      await clients.openWindow(targetUrl);
    })()
  );
});
