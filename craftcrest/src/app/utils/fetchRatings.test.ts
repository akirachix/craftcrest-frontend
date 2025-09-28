import { fetchRatings } from "./fetchRatings";

const mockFetchResponse = (data: unknown, ok = true, status = 200) => ({
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

    const data = await fetchRatings();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('api/ratings');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, rating: 5 }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await fetchRatings();

    expect(data).toEqual(mockData);
  });

  it('rejects with error message when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 404))) as jest.Mock;

    try {
      await fetchRatings();
      throw new Error('fetchRatings did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Couldn't fetch ratingsUnable to fetch ratings. Please try again later.: 404");
      } else {
        throw e;
      }
    }
  });

  it('rejects with error message when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    try {
      await fetchRatings();
      throw new Error('fetchRatings did not reject');
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Couldn't fetch ratingsNetwork failure");
      } else {
        throw e;
      }
    }
  });
});