import {Navigate, Route, Routes,useLocation} from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import NotificationsPage from "./pages/NotificationsPage"
import MyFriendsPage from "./pages/MyFriendsPage"
import ChatPage from "./pages/ChatPage"
import CallPage from "./pages/CallPage"
import OnboardingPage from "./pages/OnboardingPage"
import toast, { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader"
import useAuthUser from "./hooks/useAuthUser"
import Layout from "./components/Layout"
import { useThemeStore } from "./store/useThemeStore"



function App() {
  const { theme } = useThemeStore()
  const location = useLocation();
  const isPublicRoute = ["/login", "/signup"].includes(location.pathname);

  const {
    isLoading,
    authUser,
    isError,
    error,
  } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) {
    return <PageLoader />;
  }

  // Handle session expiration
  if (!isPublicRoute && isError && error?.response?.status === 401) {
    toast.error("Session expired. Please login again.");
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route path="/" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <HomePage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={isOnboarded ? "/" : "/onboarding"} />} />
        <Route path="/notifications" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
          <NotificationsPage />
          </Layout>
          ) : (
             <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} /> 
             )
             }
              />
        <Route path="/call/:id" element={isAuthenticated && isOnboarded ? (
          <CallPage />
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        
        <Route path="/chat/:id" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <ChatPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
        <Route path="/onboarding" element={isAuthenticated ? (
          !isOnboarded ? (
            <OnboardingPage />
          ) : (<Navigate to="/" />)
        ) : (
          <Navigate to="/login" />
        )} />
        <Route path="/friends" element={isAuthenticated && isOnboarded ? (
          <Layout showSidebar={true}>
            <MyFriendsPage />
          </Layout>
        ) : (
          <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
        )} />
      </Routes>
     <Toaster
  position="top-right"
  toastOptions={{
    duration: 3000,
    style: {
      background: '#333',
      color: '#fff',
    },
  }}
/>
    </div>
  );
}

export default App;
