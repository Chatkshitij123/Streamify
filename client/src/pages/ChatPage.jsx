// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom'
// import useAuthUser from "../hooks/useAuthUser.js"
// import { useQuery } from '@tanstack/react-query';
// import { getStreamToken } from '../utils/apiPaths.js';
// import {
//   Channel,
//   ChannelHeader,
//   Chat,
//   MessageInput,
//   MessageList,
//   Thread,
//   Window
// } from "stream-chat-react";
// import toast from "react-hot-toast";
// import { StreamChat } from 'stream-chat';
// import ChatLoader from '../components/ChatLoader.jsx';
// import CallButton from './CallButton.jsx';

// const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;


// const ChatPage = () => {
//   const { id:targetUserId } = useParams();

//   const [chatClient, setChatClient] = useState(null);
//   const [channel, setChannel] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const {authUser} = useAuthUser();

//   const {data:tokenData} = useQuery({
//     queryKey: ["streamToken"],
//     queryFn: getStreamToken,
//     enabled: !!authUser //this will run only when authUser is available
//   });

//   useEffect(() => {
//     const initChat = async () => {
//       if(!tokenData?.token || !authUser) return;

//       try {
//         console.log("Initializing stream chat client...");

//         const client = StreamChat.getInstance(STREAM_API_KEY);

//         await client.connectUser({
//           id: authUser._id,
//           name: authUser.fullName,
//           image: authUser.avatar,
//         }, tokenData.token)

//         //create a channel
//         const channelId = [authUser._id, targetUserId].sort().join("-");

//         const currChannel = client.channel("messaging", channelId, {
//           members: [authUser._id, targetUserId],
//         });

//         await currChannel.watch();

//         setChatClient(client);
//         setChannel(currChannel);

//       } catch (error) {
//         console.error("Error initializing chat:", error);
//         toast.error("Could not connect to chat. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//     initChat();
//   }, [tokenData, authUser, targetUserId]);

//   if (loading || !chatClient || !channel) return <ChatLoader />;

//   const handleVideoCall = () => {
//     if (channel) {
//       const callUrl = `${window.location.origin}/call/${channel.id}`;

//       channel.sendMessage({
//         text: `I've started a video call. Join me here: ${callUrl}`
//       });

//       toast.success("Video call link sent successfully");
//     }
//   };
  
//   return (
//     <div className='h-[93vh]'>
//       <Chat client={chatClient}>
//         <Channel channel={channel}>
//           <div className='w-full relative'>
//             <CallButton handleVideoCall={handleVideoCall} />
//             <Window>
//               <ChannelHeader />
//               <MessageList />
//               <MessageInput focus />
//             </Window>
//           </div>
//           <Thread />
//         </Channel>
//       </Chat>
//     </div>
//   )
// }

// export default ChatPage


import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser.js";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../utils/apiPaths.js";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import ChatLoader from "../components/ChatLoader.jsx";
import CallButton from "./CallButton.jsx";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  // UPDATED: This route parameter may be a user ID or channel ID
  const { id: targetId } = useParams();

  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);

  const { authUser } = useAuthUser();

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    let isMounted = true;

    const initChat = async () => {
      if (!tokenData?.token || !authUser || !targetId) return;

      setLoading(true);

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        // Avoid reconnecting if this client is already connected as this user
        if (client.userID && client.userID !== authUser._id) {
          await client.disconnectUser();
        }

        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.avatar,
            },
            tokenData.token
          );
        }

        // UPDATED: A channel ID from the notification contains both user IDs
        const isChannelId = targetId.includes("-");

        let currChannel;

        if (isChannelId) {
          // NEW: Retrieve the existing channel using its full ID
          currChannel = client.channel("messaging", targetId);
        } else {
          // Existing behaviour: open or create a chat with a user
          const channelId = [authUser._id, targetId]
            .sort()
            .join("-");

          currChannel = client.channel("messaging", channelId, {
            members: [authUser._id, targetId],
          });
        }

        await currChannel.watch();

        if (isMounted) {
          setChatClient(client);
          setChannel(currChannel);
        }
      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    initChat();

    return () => {
      isMounted = false;
    };
  }, [tokenData, authUser, targetId]);

  if (loading || !chatClient || !channel) {
    return <ChatLoader />;
  }

  const handleVideoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `I've started a video call. Join me here: ${callUrl}`,
      });

      toast.success("Video call link sent successfully");
    }
  };

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default ChatPage;
