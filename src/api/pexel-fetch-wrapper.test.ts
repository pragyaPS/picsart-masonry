import { pexelFetchWrapper } from './pexel-fetch-wrapper';

// Mock the constants module
jest.mock('./constants', () => ({
	PEXELS_API_KEY: 'mock-api-key',
	PEXEL_BASE_URL: 'https://mock-api.pexels.com/v1',
}));

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
let mockFetch = global.fetch as jest.Mock;

describe('pexelFetchWrapper', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		mockFetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({}),
			})
		) as jest.Mock;
	});

	it('should make successful API call', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockData),
		});

		const result = await pexelFetchWrapper('photos');

		expect(result).toEqual(mockData);
		expect(mockFetch).toHaveBeenCalledWith(
			'https://mock-api.pexels.com/v1/photos',
			expect.objectContaining({
				headers: {
					Accept: 'application/json',
					Authorization: 'mock-api-key',
					'Content-Type': 'application/json',
				},
				method: 'GET',
			})
		);
	});

	it.only('should handle query parameters correctly', async () => {
		const mockData = { data: 'test' };
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockData),
		});

		await pexelFetchWrapper('photos', { page: 1, per_page: 10 });

		expect(mockFetch).toHaveBeenCalledWith(
			'https://mock-api.pexels.com/v1/photos?page=1&per_page=10',
			expect.any(Object)
		);
	});

	it('should handle API error responses', async () => {
		const errorMessage = 'Not found';
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: false,
			status: 404,
			json: () => Promise.resolve({ message: errorMessage }),
		});

		await expect(pexelFetchWrapper('invalid')).rejects.toThrow(
			`Error: 404 - ${errorMessage}`
		);
	});

	it('should merge custom headers with defaults', async () => {
		const mockData = { data: 'test' };
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			ok: true,
			json: () => Promise.resolve(mockData),
		});

		await pexelFetchWrapper(
			'photos',
			{},
			{
				headers: {
					'Custom-Header': 'value',
				},
			}
		);

		expect(global.fetch).toHaveBeenCalledWith(
			expect.any(String),
			expect.objectContaining({
				headers: expect.objectContaining({
					'Custom-Header': 'value',
					Authorization: 'mock-api-key',
				}),
			})
		);
	});
});
