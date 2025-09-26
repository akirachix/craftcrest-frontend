import { fetchPayments } from "./fetchPayments";

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