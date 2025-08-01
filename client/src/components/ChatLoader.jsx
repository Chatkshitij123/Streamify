import React from 'react'
import { LoaderIcon } from 'react-hot-toast'

const ChatLoader = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center
    p-4'>
      <LoaderIcon className='animate-spin size-10 text-primary' />
      <p className='mt-4 text-center text-lg font-mono'>Connecting 
        chat...
      </p>
    </div>
  )
}

export default ChatLoader;
