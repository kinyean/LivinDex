import BaseAPI from "../../API/BaseAPI";

// API functions for managing comments in the backend
export const subscribe = async (userId: string, targetUserId: string) => {
  const res = await BaseAPI.post(`/subscription`, { userId, targetUserId });
  return res.data;
};
  
export const unsubscribe = async (userId: string, targetUserId: string) => {
  const res = await BaseAPI.delete(`/subscription`, { data: { userId, targetUserId } });
  return res.data;
};
  
export const getSubs = async (uid: string): Promise<string[]> => {
  const res = await BaseAPI.get(`/subscription/subscriptions/${uid}`);
  return res.data.subscriptions;
};

export const getFollowers = async (uid: string): Promise<string[]> => {
  const res = await BaseAPI.get(`/subscription/followers/${uid}`);
  return res.data.followers;
};

export const getLikedPosts = async (uid: string): Promise<string[]> => {
  const res = await BaseAPI.get(`/subscription/liked/${uid}`);
  return res.data.likedPosts; 
};

export const likePost = async (postId: string, userId: string) => {
  const res = await BaseAPI.post('/subscription/like', { postId, userId });
  return res.data;
};

export const dislikePost = async (postId: string, userId: string) => {
  const res = await BaseAPI.post('/subscription/dislike', { postId, userId });
  return res.data;
};
