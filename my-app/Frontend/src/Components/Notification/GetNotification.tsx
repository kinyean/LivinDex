import BaseAPI from "../../API/BaseAPI";
import { auth } from "../../index";

export interface Notification {
  id: string;
  fromUserId: string;
  toUserId: string;
  postId: string;
  title: string;
  time: string; 
  read: boolean;
  avatar?: string; //? means optional
}

// API functions for managing comments in the backend
export const getNotifications = async (userId: string): Promise<Notification[]> => {
  const res = await BaseAPI.get(`/notifications?userId=${userId}`);
  return res.data;
};

export const createNotification = async (
  toUserId: string,
  postId: string,
  title: string,
  avatar?: string
): Promise<void> => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated");
  }

  await BaseAPI.post("/notifications", {
    fromUserId: user.uid,
    toUserId,
    postId,
    title,
    avatar,
    time: new Date().toISOString(),
    read: false,
  });
};
