import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
	baseURL: 'https://api.pexels.com/v1',
	headers: {
		Authorization:
			'Bearer RSmRYrbl1JYbkRHJripqbLbE26ZzqKD08Mm0FjjjjSniU6cEoZAu2d3Q', // hardcoding for now will move to env
	},
});

export default axiosInstance;
