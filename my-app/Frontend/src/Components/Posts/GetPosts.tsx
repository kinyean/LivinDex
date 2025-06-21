import BaseAPI from "../../API/BaseAPI";

export interface Post {
  createdAt: string;
  header: string;
  media: {
    mediaType: string;
    mediaURL: string;
  }[];
  tags: string[];
  text: string;
  userId: string;            
}

// API functions for managing comments in the backend
export const getPosts = async (uid: string) => {
  const res = await BaseAPI.get("/posts", {
    params: { uid },
  });
  return res.data;
};




