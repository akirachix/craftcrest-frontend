
import { getProducts } from './fetchProducts';

global.fetch = jest.fn();
const mockJson = jest.fn();
describe('getProducts', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    mockJson.mockReset();
  });

  it('should handle success state', async () => {
    const mockData = [
      {
        id: '1',
        product_name: 'clay pot',
        description: 'handmade clay pot',
        category: 'pottery',
        price: 1200,
        stock_quantity: 15,
        is_customizable: false,
        image: 'clay-pot.jpg',
        custom_options: null,
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue(mockData),
    });

    const data = await getProducts();

    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/inventory');
  });

  it('should handle empty state', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue([]),
    });

    const data = await getProducts();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/inventory');
  });

  it('should handle error state', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: mockJson,
    });

    await expect(getProducts()).rejects.toThrow('Something went wrong: 500');
    expect(global.fetch).toHaveBeenCalledWith('/api/inventory');
  });

  it('throws error on network-level fetch failure', async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

    await expect(getProducts()).rejects.toThrow('Error fetching products:Network error');
    expect(global.fetch).toHaveBeenCalledWith('/api/inventory');
  });
});