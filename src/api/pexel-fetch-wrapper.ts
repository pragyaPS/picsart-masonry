import { pexelBaseUrl } from './constants';
import { QueryParams } from './request-types';

export async function pexelFetchWrapper<T>(
	endpoint: string,
	params: QueryParams = {},
	options: RequestInit = {}
): Promise<T> {
	const API_KEY: string = import.meta.env.VITE_PEXELS_API_KEY as string;
	if (typeof API_KEY !== 'string' || !API_KEY) {
		throw new Error(
			'Pexel API key is missing. Please set it in your environment variables.'
		);
	}

	const defaultHeaders = {
		Accept: 'application/json',
		Authorization: API_KEY,
		'Content-Type': 'application/json',
	};

	const finalOptions = {
		method: 'GET',
		...options,
		headers: {
			...defaultHeaders,
			...(options.headers || {}),
		},
	};

	try {
		const url = new URL(`${pexelBaseUrl}/${endpoint}`);
		// Add query parameters to the URL
		Object.keys(params).forEach((key) => {
			if (params[key] !== undefined) {
				url.searchParams.append(key, String(params[key]));
			}
		});
		const response = await fetch(url, finalOptions);
		if (!response.ok) {
			const errorData = (await response.json()) as { message: string };

			throw new Error(`Error: ${response.status} - ${errorData.message}`);
		}
		return (await response.json()) as T;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
}
