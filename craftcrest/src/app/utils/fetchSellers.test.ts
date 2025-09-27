import { fetchSellers } from "./fetchSellers";

const mockJson = jest.fn();
global.fetch = jest.fn();

describe("fetchSellers", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
    mockJson.mockReset();
  });

  it("returns data on success", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue([{ id: 1, name: "Alice" }]),
    });
    const data = await fetchSellers();
    expect(data).toEqual([{ id: 1, name: "Alice" }]);
    expect(fetch).toHaveBeenCalledWith("/api/sellers");
  });

  it("throws error on failed response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
      json: mockJson,
    });
    await expect(fetchSellers()).rejects.toThrow("Unable to load sellers data");
  });

  it("throws error on fetch exception", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchSellers()).rejects.toThrow("Couldn't load sellers data");
  });
});