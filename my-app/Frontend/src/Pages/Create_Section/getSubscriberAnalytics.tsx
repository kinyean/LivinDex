import BaseAPI from "../../API/BaseAPI";

export const getSubscriberAnalytics = async (creatorId: string) => {
    console.log("🎯 Creator ID used for fetch:", creatorId); 
  
    const res = await fetch(`http://localhost:3001/api/analytics/subscribers/${creatorId}`);
    if (!res.ok) throw new Error("Failed to fetch subscriber data");
    return res.json();
  };
  
export const getViewsAnalytics = async (userId: string) => {
  const res = await BaseAPI.get(`/api/analytics/views/${userId}`);
  return res.data; 
};