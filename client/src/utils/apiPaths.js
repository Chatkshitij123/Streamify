import axiosInstance from "./axiosInstance";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    SIGNUP: "/api/v1/auth/signup",
    LOGOUT: "/api/v1/auth/logout",
    ONBOARDING: "/api/v1/auth/onboarding",
    GET_USER_INFO: "/api/v1/auth/me",
    REFRESH_TOKEN: "/api/v1/auth/refresh-token",
  },
  USER: {
    RECOMMENDED_USERS: "/api/v1/users",
    FRIENDS: "/api/v1/users/friends",
    SENDFRIENDREQUEST: (frndreqId) =>
      `/api/v1/users/friend-request/${frndreqId}`,
    ACCEPTFRIENDREQUEST: (acceptreqId) =>
      `/api/v1/users/friend-request/${acceptreqId}/accept`,
    OUTFRIENDREQUEST: "/api/v1/users/outgoing-friend-requests",
    FRIENDREQUESTS: "/api/v1/users/friend-requests",
  },
  CHAT: {
    TOKEN: "/api/v1/chats/token",
  },
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
  return res.data.data;
  } catch (error) {
    console.error("Error in getAuthUser", error);
    return null;
  }
};

export const completeOnboarding = async (formData) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.ONBOARDING, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, loginData, {
    withCredentials: true,
  });
  return res.data.data;
};

export const logout = async () => {
  const res = await axiosInstance.post(API_PATHS.AUTH.LOGOUT);
  return res.data.data;
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post(API_PATHS.AUTH.SIGNUP, signupData);
  return response.data.data;
};

export const getUserFriends = async () => {
  const res = await axiosInstance.get(API_PATHS.USER.FRIENDS);
  return res.data.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get(API_PATHS.USER.RECOMMENDED_USERS);
  return res.data.data;
};

export const getoutgoingFriendReqs = async () => {
  const res = await axiosInstance.get(API_PATHS.USER.OUTFRIENDREQUEST);
  return res.data.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(API_PATHS.USER.SENDFRIENDREQUEST(userId));
  return res.data.data;
};

export const getFriendRequests = async () => {
  const res = await axiosInstance.get(API_PATHS.USER.FRIENDREQUESTS);
  return res.data.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(API_PATHS.USER.ACCEPTFRIENDREQUEST(requestId));
  return res.data.data;
};

export const getStreamToken = async () => {
  const res = await axiosInstance.get(API_PATHS.CHAT.TOKEN);
  return res.data.data;
};