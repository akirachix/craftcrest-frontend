import { fetchPayments } from './fetchPayments';

describe('fetchPayments', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, amount: 100 }];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        status: 200,
        json: async () => mockData,
      }),
    ) as jest.Mock;

    const data = await fetchPayments();
    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/payments/');
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Server Error',
        json: async () => null,
      }),
    ) as jest.Mock;

    await expect(fetchPayments()).rejects.toThrow('Failed to fetch payments: Server Error');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(fetchPayments()).rejects.toThrow("Couldn't fetch payments:Network failure");
  });
});