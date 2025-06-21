import BaseAPI from "../../API/BaseAPI";
import { auth } from "../../index";

export interface Post {
  id: string;                   // ID that is tag at the comment
  body: string;
  username: string;
  userId: string;               
  parentId: string | null;      // It is used so that the child can tag under the parentID
  createdAt: string; 
}

// API functions for managing comments in the backend
export const getPosts = async () => {
  const res = await BaseAPI.get("/comments");
  return res.data;
};




