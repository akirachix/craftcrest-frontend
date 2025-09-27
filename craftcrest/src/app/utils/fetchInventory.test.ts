import { getInventory } from './fetchInventory';

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('getInventory', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns empty array when response is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;

    const data = await getInventory();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/inventory');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, name: 'Product 1' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await getInventory();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 500))) as jest.Mock;

    await expect(getInventory()).rejects.toThrow('Failed to fetch inventory: 500');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(getInventory()).rejects.toThrow("Couldn't fetch inventoryNetwork failure");
  });
});
