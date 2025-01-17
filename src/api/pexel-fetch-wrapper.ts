import { PEXELS_API_KEY, PEXEL_BASE_URL } from './constants';
import { QueryParams } from './request-types';

export async function pexelFetchWrapper<T>(
	endpoint: string,
	params: QueryParams = {},
	options: RequestInit = {}
): Promise<T> {
	if (typeof PEXELS_API_KEY !== 'string' || !PEXELS_API_KEY) {
		throw new Error(
			'Pexel API key is missing. Please set it in your environment variables.'
		);
	}

	const defaultHeaders = {
		Accept: 'application/json',
		Authorization: PEXELS_API_KEY,
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
		const url = new URL(`${PEXEL_BASE_URL}/${endpoint}`);
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
