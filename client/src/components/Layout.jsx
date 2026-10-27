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

// import React, { useState } from "react"; // ✅ ADDED
// import Sidebar from "./Sidebar";
// import Navbar from "./Navbar";

// const Layout = ({ children, showSidebar = false }) => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ ADDED

//   const toggleSidebar = () => setIsSidebarOpen(true); // ✅ ADDED
//   const closeSidebar = () => setIsSidebarOpen(false); // ✅ ADDED

//   return (
//     <div className="h-screen overflow-hidden bg-base-100">
//       <div className="flex h-full min-h-0">
//         {/* ✅ Sidebar for large screens */}
//         {showSidebar && (
//           <div className="hidden lg:block h-full shrink-0">
//             <Sidebar />
//           </div>
//         )}

//         {/* ✅ Sidebar Drawer for mobile screens */}
//         {showSidebar && isSidebarOpen && (
//           <>
//             <div className="fixed inset-0 z-40 bg-black bg-opacity-40" onClick={closeSidebar} /> {/* ✅ BACKDROP */}
//             <div className="fixed z-50 h-full w-64 bg-base-200 border-r border-base-300 p-4">
//               <Sidebar />
//             </div>
//           </>
//         )}

//         <div className="flex-1 flex flex-col">
//           {/* ✅ Pass toggleSidebar to Navbar */}
//           <Navbar onMenuClick={showSidebar ? toggleSidebar : null} /> {/* ✅ CHANGED */}

//           <main className="flex-1 overflow-y-auto">
//             {children}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;



import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children, showSidebar = false }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    // UPDATED: Constrain the app to the viewport and prevent
    // the outer document from creating a second vertical scrollbar.
    <div className="h-screen overflow-hidden bg-base-100">
      {/* UPDATED: Give the flex layout the full available height */}
      <div className="flex h-full min-h-0">
        {/* Sidebar for large screens */}
        {showSidebar && (
          // UPDATED: Keep the desktop sidebar at viewport height
          <div className="hidden lg:block h-full shrink-0">
            <Sidebar />
          </div>
        )}

        {/* Sidebar drawer for mobile screens */}
        {showSidebar && isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            />

            {/* UPDATED: Constrain drawer to the viewport */}
            <div className="fixed inset-y-0 left-0 z-50 h-dvh w-64 overflow-y-auto bg-base-200 border-r border-base-300">
              <Sidebar />
            </div>
          </>
        )}

        {/* UPDATED: min-h-0 allows the main column to fit its parent */}
        <div className="flex-1 min-w-0 min-h-0 flex flex-col">
          <Navbar
            onMenuClick={showSidebar ? toggleSidebar : null}
          />

          {/* UPDATED: This becomes the primary scrolling container */}
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-base-100">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;


