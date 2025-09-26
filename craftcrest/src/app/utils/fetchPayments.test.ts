import { fetchPayments } from "./fetchPayments";;


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

    const data = await fetchPayments();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/payments');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, amount: '100' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await fetchPayments();

    expect(data).toEqual(mockData);
  });

  it('throws an error when response is not ok', async () => {
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(null, false, 500))) as jest.Mock;

    await expect(fetchPayments()).rejects.toThrow('Failed to fetch payments: 500');
  });

  it('throws an error when fetch itself fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

    await expect(fetchPayments()).rejects.toThrow("Couldn't fetch paymentsNetwork failure");
  });
});



const mockJson = jest.fn();
global.fetch = jest.fn();

describe("fetchPayments", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
    mockJson.mockReset();
  });

  it("returns data on success", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue([{ id: 1, amount: 100 }]),
    });
    const data = await fetchPayments();
    expect(data).toEqual([{ id: 1, amount: 100 }]);
    expect(fetch).toHaveBeenCalledWith("/api/payments");
  });

  it("throws error on failed response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 404,
      json: mockJson,
    });
    await expect(fetchPayments()).rejects.toThrow("Unable to fetch payments");
  });

  it("throws error on fetch exception", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchPayments()).rejects.toThrow("Couldn't fetch payments");
  });
});

