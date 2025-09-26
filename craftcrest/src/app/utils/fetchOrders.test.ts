
import { fetchOrders } from './fetchOrders';


const mockJson = jest.fn();
global.fetch = jest.fn();

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

    const data = await fetchOrders();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/orders');
  });

  it('returns data when response is successful', async () => {
    const mockData = [{ id: 1, total_amount: '100' }];
    global.fetch = jest.fn(() => Promise.resolve(mockFetchResponse(mockData, true))) as jest.Mock;

    const data = await fetchOrders();

    expect(data).toEqual(mockData);
  });
it('throws an error when response is not ok', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: false,
    status: 500,
    json: async () => null,
  })) as jest.Mock;

  await expect(fetchOrders()).rejects.toThrow('Failed to fetch orders: 500');
});
it('throws an error when fetch itself fails', async () => {
  global.fetch = jest.fn(() => Promise.reject(new Error('Network failure'))) as jest.Mock;

  await expect(fetchOrders()).rejects.toThrow("Couldn't fetch ordersNetwork failure");
});

});



describe("fetchOrders", () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockReset();
        mockJson.mockReset();
    });

    it("returns data on success", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: mockJson.mockResolvedValue([{ id: 1, foo: "bar" }]),
        });
        const data = await fetchOrders();
        expect(data).toEqual([{ id: 1, foo: "bar" }]);
        expect(fetch).toHaveBeenCalledWith("/api/orders");
    });

    it("returns empty array when response is ok but no orders", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: mockJson.mockResolvedValue([]),
        });
        const data = await fetchOrders();
        expect(data).toEqual([]);
        expect(fetch).toHaveBeenCalledWith("/api/orders");
    });

    it("throws error on failed response", async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: false,
            status: 500,
            json: mockJson,
        });
        await expect(fetchOrders()).rejects.toThrow("Unable to fetch orders");
    });

    it("throws error on fetch exception", async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
        await expect(fetchOrders()).rejects.toThrow("Couldn't fetch orders");
    });
});

