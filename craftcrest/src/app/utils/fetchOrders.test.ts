import { getOrders } from './fetchOrders';

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('getOrders', () => {
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  it('returns empty array when response is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;

    const data = await getOrders();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/orders');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, total_amount: '100' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await getOrders();

    expect(data).toEqual(mockData);
  });
it('throws an error when response is not ok', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: false,
    status: 500,
    json: async () => null,
  })) as jest.Mock;

  await expect(getOrders()).rejects.toThrow('Failed to fetch orders: 500');
});
it('throws an error when fetch itself fails', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

  await expect(getOrders()).rejects.toThrow("Couldn't fetch ordersNetwork failure");
});

});
