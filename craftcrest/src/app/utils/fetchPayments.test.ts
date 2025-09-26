import { getPayments } from './fetchPayments';

const mockFetchResponse = (data: any, ok = true, status = 200) => ({
  ok,
  status,
  json: async () => data,
});

describe('getPayments', () => {
  afterEach(() => {
    jest.resetAllMocks(); 
  });

  it('returns empty array when response is empty', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse([], true))) as jest.Mock;

    const data = await getPayments();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/payments');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, amount: '100' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await getPayments();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 500))) as jest.Mock;

    await expect(getPayments()).rejects.toThrow('Failed to fetch payments: 500');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(getPayments()).rejects.toThrow("Couldn't fetch paymentsNetwork failure");
  });
});
