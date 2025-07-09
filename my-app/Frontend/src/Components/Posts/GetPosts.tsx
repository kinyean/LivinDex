import BaseAPI from "../../API/BaseAPI";

export interface Post {
  id: string; 
  createdAt: string;
  header: string;
  media: {
    mediaType: string;
    mediaURL: string;
  }[];
  thumbnailURL: string;
  tags: string[];
  text: string;
  userId: string;
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

