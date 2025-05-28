import axios from "axios";

const BaseAPI = axios.create({
	baseURL:  "http://localhost:3001",
});

export const getAuthToken = () => {
	return localStorage.getItem("jwtToken"); // or sessionStorage
};

export default BaseAPI;