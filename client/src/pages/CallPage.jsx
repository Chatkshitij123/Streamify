import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import useAuthUser from "../hooks/useAuthUser.js"
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../utils/apiPaths.js';
import { 
  CallingState,
   StreamCall,
    StreamVideo,
     StreamVideoClient,
      CallControls,
       useCallStateHooks,
        StreamTheme,
        SpeakerLayout
       } from '@stream-io/video-react-sdk';

       import '@stream-io/video-react-sdk/dist/css/styles.css';
import toast from 'react-hot-toast';

       const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { id: callId} = useParams();
  const [client, setClient] = useState(null);
  const [call, setCall] = useState(null);
  const [isConnecting, setIsConnecting] = useState(null);

  const {authUser, isLoading} = useAuthUser();

  const {data: tokenData} = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  useEffect(() => {
    const initCall = async () => {
      if (!tokenData.token || !authUser || !callId) return;

      try {
        console.log("Initializing stream video client...");
        const user = {
          id: authUser._id,
          name: authUser.fullName,
          image: authUser.avatar
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user,
          token: tokenData.token
        });

        const callInstance =  videoClient.call("default", callId);

        await callInstance.join({create:true})

        console.log("Joined call successfully");

        setClient(videoClient);
        setCall(callInstance)
      } catch (error) {
        console.error("Error joining call:", error);
        toast.error("Could not join the call. Please try again.");
      } finally {
        setIsConnecting(false);
      }
    }
    initCall()
  },[tokenData, authUser, callId])

  return (
    <div className='h-screen flex flex-col items-center justify-center'>
      <div className='relative'>
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallContent />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again letter.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CallPage

const CallContent = () => {
  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState()

  const navigate = useNavigate();

  if(callingState === CallingState.LEFT) return navigate("/")

  return (
    <StreamTheme>
      <SpeakerLayout />
      <CallControls />
    </StreamTheme>
  )
}
