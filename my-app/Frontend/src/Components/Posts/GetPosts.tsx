import BaseAPI from "../../API/BaseAPI";

export interface Post {
  id: string; 
  createdAt: string;
  header: string;
  media: {
    mediaType: string;
    mediaURL: string;
  }[];
  tags: string[];
  text: string;
  userId: string;
  like: number;
  dislike: number;
  likedUsers?: string[];    
  dislikedUsers?: string[];  
}

// API functions for managing comments in the backend
export const getPosts = async (uid: string) => {
  const res = await BaseAPI.get("/posts/user", {
    params: { uid },
  });
  return res.data;
};

export const getPostById = async (id: string) => {
  const res = await BaseAPI.get(`/posts/${id}`);
  return res.data;
};

export const getAllPosts = async () => {
  const res = await BaseAPI.get("/posts");
  return res.data;
};

