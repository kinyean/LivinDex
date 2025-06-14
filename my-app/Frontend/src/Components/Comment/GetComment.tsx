import BaseAPI from "../../API/BaseAPI";
import { auth } from "../../index";

export interface Comment {
  id: string;                   // ID that is tag at the comment
  body: string;
  username: string;
  userId: string;               
  parentId: string | null;      // It is used so that the child can tag under the parentID
  createdAt: string; 
}

// API functions for managing comments in the backend
export const getComments = async () => {
  const res = await BaseAPI.get("/comments");
  return res.data;
};

export const createComment = async (body: string, parentId: string | null, userData: { firstName: string; lastName: string } ) => {
  
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated"); //Check to see User is not null 
  }
  
  const res = await BaseAPI.post("/comments", {
    body,
    parentId,
    userId: user.uid,
    username: userData.firstName + " " + userData.lastName,
  });
  return res.data;
};

export const updateComment = async (newBody: string, commentId: string) => {
  await BaseAPI.put(`/comments/${commentId}`, { body: newBody });
};

export const deleteComment = async (commentId: string) => {
  await BaseAPI.delete(`/comments/${commentId}`);
};


