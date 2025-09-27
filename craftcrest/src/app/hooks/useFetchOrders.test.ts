import { fetchOrders } from '../utils/fetchOrders';

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('fetchOrders', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should handle empty state', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;
    const data = await fetchOrders();
    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/orders');
  });

  it('should handle success state', async () => {
    const mockData = [{ id: 1, item: 'Item1' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;
    const data = await fetchOrders();
    expect(data).toEqual(mockData);
  });

  it('should handle error state', async () => {
    const errorData = { error: 'Something went wrong' };
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(errorData, false, 404))) as jest.Mock;
    await expect(fetchOrders()).rejects.toThrow('Failed to fetch orders: Something went wrong');
  });

  it('should handle error on response', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;
    await expect(fetchOrders()).rejects.toThrow('Failed to fetch orders: Network failure');
  });
});
