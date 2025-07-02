import BaseAPI from "../../API/BaseAPI";

export const createUserApi = async (uid: string, userData: {
  firstName: string;
  lastName: string | null; //last name optional
  phone: string | null;
  bio: string;
  SGD: number,
  LCoin: number,
  like: number;
  dislike: number;
  subscriber: number;
}) => {
    const res = await BaseAPI.post(`/users`, {
        uid,
        ...userData,
    });
    return res.data;
};  

// API functions for managing comments in the backend
export const getUserProfile = async (uid: string) => {
    const res = await BaseAPI.get(`/users/${uid}`);
    return res.data;
  };

export const updateUserProfile = async (uid: string, profileData: any) => {
    const res = await BaseAPI.put(`/users/${uid}`, profileData);
    return res.data;
  };