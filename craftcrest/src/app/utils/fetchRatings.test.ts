import { getRatings } from './fetchRatings';

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('getRatings', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns empty array when response is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;

    const data = await getRatings();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('api/ratings');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, rating: 5 }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await getRatings();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 404))) as jest.Mock;

    await expect(getRatings()).rejects.toThrow('Failed to fetch ratings: 404');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(getRatings()).rejects.toThrow("Couldn't fetch RatingsNetwork failure");
  });
});
