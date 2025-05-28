import axios from "axios";

const BaseAPI = axios.create({
	baseURL: process.env.REACT_APP_API_URL
});

export const getAuthToken = () => {
	return localStorage.getItem("jwtToken"); // or sessionStorage
};

export default BaseAPI;