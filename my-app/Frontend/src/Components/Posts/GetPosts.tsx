import BaseAPI from "../../API/BaseAPI";
import { auth } from "../../index";

export interface Post {
  createdAt: string;
  title: string;                   // ID that is tag at the comment
  img: string;
  text: string;
  userId: string;               
}

// API functions for managing comments in the backend
export const getPosts = async () => {
  const res = await BaseAPI.get("/comments");
  return res.data;
};




