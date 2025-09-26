import { renderHook } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import useFetchProducts from './useFetchProducts';
import { getProducts } from '../utils/fetchProducts';
import { Product } from '../utils/type';

jest.mock('../utils/fetchProducts', () => ({
  getProducts: jest.fn(),
}));

const mockGetProducts = getProducts as jest.Mock;

describe('useFetchProducts hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle loading state', () => {
    mockGetProducts.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useFetchProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty state', async () => {
    mockGetProducts.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchProducts());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle eror on success', async () => {
    const mockProducts: Product[] = [
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

    mockGetProducts.mockResolvedValue(mockProducts);

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual(mockProducts);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch error', async () => {
    const errorMessage = 'Failed to fetch products';
    mockGetProducts.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useFetchProducts());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});