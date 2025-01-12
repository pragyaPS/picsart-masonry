import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL as string,
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_PEXELS_API_KEY}`,
	},
});

export default axiosInstance;
