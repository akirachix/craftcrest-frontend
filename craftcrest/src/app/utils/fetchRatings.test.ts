import { fetchRatings } from "./fetchRatings";

const mockJson = jest.fn();
global.fetch = jest.fn();

describe("fetchRatings", () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockReset();
    mockJson.mockReset();
  });

  it("returns data on success", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue([{ id: 1, score: 5 }]),
    });
    const data = await fetchRatings();
    expect(data).toEqual([{ id: 1, score: 5 }]);
    expect(fetch).toHaveBeenCalledWith("/api/ratings");
  });

  it("throws error on failed response", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 400,
      json: mockJson,
    });
    await expect(fetchRatings()).rejects.toThrow("Unable to fetch ratings");
  });

  it("throws error on fetch exception", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));
    await expect(fetchRatings()).rejects.toThrow("Couldn't fetch ratings");
  });
});