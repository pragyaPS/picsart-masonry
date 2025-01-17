const PEXEL_BASE_URL = 'https://api.pexels.com/v1';

const { VITE_PEXELS_API_KEY: PEXELS_API_KEY } = import.meta.env;

export { PEXELS_API_KEY, PEXEL_BASE_URL };
//export const pexelBaseUrl = 'http://localhost:5000'; // Mock server URL to avoid rate limit issue with Pexels API
