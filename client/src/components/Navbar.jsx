// import React from 'react'
// import useAuthUser from '../hooks/useAuthUser'
// import { Link, useLocation } from 'react-router-dom';

// import { BellIcon, CameraIcon, LogOutIcon, ShipWheelIcon } from 'lucide-react';
// import ThemeSelector from "./ThemeSelector"
// import useLogout from '../hooks/useLogout';


// const Navbar = () => {
//   const {authUser} = useAuthUser();
//   const location = useLocation();
//   const isChatPage = location.pathname?.startsWith("/chat");
//   const {logoutMutation} = useLogout();

//   return (
//     <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
//       <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
//         <div className='flex items-center justify-end w-full'>
//           {/* LOGO only in the chat page */}
//           {isChatPage && (
//             <div className='pl-5'>
//               <Link to="/" className="flex items-center gap-2.5">
//               <ShipWheelIcon className='size-9 text-primary' />
//               <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
//                 Streamify
//               </span>
//               </Link>
//             </div>
//           )}

//           <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
//             <Link to={"/notifications"}>
//             <button className='btn btn-ghost btn-circle'>
//               <BellIcon className='h-6 w-6 text-base-content opacity-70' />
//               </button>
//               </Link>
//           </div>

//           <ThemeSelector />

//           <div className='avatar'>
//             <div className='w-9 rounded-full'>
//               {/* <img src={authUser?.avatar} alt="User Avatar" rel="noreferrer" /> */}
//                {authUser?.avatar ? (
//                   <img
//                     src={authUser.avatar}
//                     alt="User Avatar"
//                     rel="noreferrer"
//                     onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
//                   />
//                 ) : (
//                   <span><CameraIcon /></span>
//                 )}
//             </div>
//           </div>

//           {/* Logout button */}
//           <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
//             <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
//           </button>
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navbar

import React from 'react';
import useAuthUser from '../hooks/useAuthUser';
import { Link, useLocation } from 'react-router-dom';

import { BellIcon, CameraIcon, LogOutIcon, MenuIcon, ShipWheelIcon } from 'lucide-react'; // ✅ MenuIcon added
import ThemeSelector from "./ThemeSelector";
import useLogout from '../hooks/useLogout';

const Navbar = ({ onMenuClick }) => { // ✅ CHANGED: accept onMenuClick
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");
  const { logoutMutation } = useLogout();

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between w-full'>

          {/* ✅ Hamburger for mobile */}
          {onMenuClick && (
            <button className="btn btn-ghost lg:hidden" onClick={onMenuClick}>
              <MenuIcon className="h-6 w-6 text-base-content" />
            </button>
          )}

          {/* ✅ Logo if on chat page */}
          {isChatPage && (
            <div className='pl-5'>
              <Link to="/" className="flex items-center gap-2.5">
                <ShipWheelIcon className='size-9 text-primary' />
                <span className='text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider'>
                  Streamify
                </span>
              </Link>
            </div>
          )}

          <div className='flex items-center gap-3 sm:gap-4 ml-auto'>
            <Link to={"/notifications"}>
              <button className='btn btn-ghost btn-circle'>
                <BellIcon className='h-6 w-6 text-base-content opacity-70' />
              </button>
            </Link>
          </div>

          <ThemeSelector />

          <div className='avatar'>
            <div className='w-9 rounded-full'>
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

          <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
            <LogOutIcon className='h-6 w-6 text-base-content opacity-70' />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

