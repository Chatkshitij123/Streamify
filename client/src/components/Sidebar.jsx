import React from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router-dom'
import { BellIcon, CameraIcon, HomeIcon, ShipWheelIcon, UsersIcon } from 'lucide-react'

const Sidebar = () => {
  const { authUser } = useAuthUser()
  const location = useLocation();
  const currentPath = location.pathname;

  
  return (
    <aside className='w-64 bg-base-200 border-r border-base-300 flex flex-col h-screen sticky top-0'>
      <div className='p-5 border-b border-base-300'>
        <Link to="/" className='flex items-center gap-2.5'>
          <ShipWheelIcon className='size-9 text-primary' />
          <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>Streamify</span>
        </Link>
      </div>
      <nav className='flex-1 p-4 space-y-1'>
      <Link
      to="/"
      className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
        currentPath === "/" ? "bg-primary text-primary-content shadow-md hover:bg-primary" : ""
      }`}
      >
        <HomeIcon className='size-5 text-base-content opacity-70' />
        <span>Home</span>
      </Link>

      <Link
      to="/friends"
      className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
        currentPath === "/friends" ? "bg-primary text-primary-content shadow-md hover:bg-primary" : ""
      }`}
      >
        <UsersIcon className='size-5 text-base-content opacity-70' />
        <span>Friends</span>
      </Link>

      <Link
      to="/notifications"
      className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${
        currentPath === "/notifications" ? "bg-primary text-primary-content shadow-md hover:bg-primary" : ""
      }`}
      >
        <BellIcon className='size-5 text-base-content opacity-70' />
        <span>Notifications</span>
      </Link>

      </nav>

      {/* User Profile Section */}
      <div className='p-4 border-t border-base-300 mt-auto'>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='w-10 rounded-full'>
              {/* <img src={authUser?.avatar} alt="User Avatar" /> */}
              {authUser?.avatar ? (
                  <img
                    src={authUser.avatar}
                    alt="User Avatar"
                    rel="noreferrer"
                    onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
                  />
                ) : (
                  <span><CameraIcon /></span>
                )}
            </div>
          </div>
          <div className='flex-1'>
             <p className='font-semibold text-sm'>{authUser?.fullName}</p>
        <p className='text-xs text-success flex items-center gap-1'>
          <span className='size-2 rounded-full bg-success inline-block' />
          Online
        </p>
          </div>
        </div>
       </div>
    </aside>
  )
}

export default Sidebar
