// import Sidebar from "./Sidebar"
// import Navbar from "./Navbar"


// const Layout = ({children,showSidebar=false}) => {
//   return (
//     <div className='min-h-screen'>
//       <div className='flex'>
//         {showSidebar && <Sidebar />}
//         <div className="flex-1 flex flex-col">
//             <Navbar />

//             <main className="flex-1 overflow-y-auto">
//                 {children}
//             </main>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Layout

import React, { useState } from "react"; // ✅ ADDED
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ ADDED

  const toggleSidebar = () => setIsSidebarOpen(true); // ✅ ADDED
  const closeSidebar = () => setIsSidebarOpen(false); // ✅ ADDED

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* ✅ Sidebar for large screens */}
        {showSidebar && (
          <div className="hidden lg:block">
            <Sidebar />
          </div>
        )}

        {/* ✅ Sidebar Drawer for mobile screens */}
        {showSidebar && isSidebarOpen && (
          <>
            <div className="fixed inset-0 z-40 bg-black bg-opacity-40" onClick={closeSidebar} /> {/* ✅ BACKDROP */}
            <div className="fixed z-50 h-full w-64 bg-base-200 border-r border-base-300 p-4">
              <Sidebar />
            </div>
          </>
        )}

        <div className="flex-1 flex flex-col">
          {/* ✅ Pass toggleSidebar to Navbar */}
          <Navbar onMenuClick={showSidebar ? toggleSidebar : null} /> {/* ✅ CHANGED */}

          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;

