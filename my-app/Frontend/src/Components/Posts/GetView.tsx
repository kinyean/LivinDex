import BaseAPI from "../../API/BaseAPI";

export const recordPostView = async (postId: string) => {
    const res = await BaseAPI.post(`/api/analytics/post/view/${postId}`);
    return res.data;
  };
  
