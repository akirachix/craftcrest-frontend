import { fetchOrders } from "./fetchOrders";

const mockJson = jest.fn();
global.fetch = jest.fn();

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