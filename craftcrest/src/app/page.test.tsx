
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductManagement from './products/page';
import { Product } from './utils/type';
import useFetchProducts from './hooks/useFetchProducts';


jest.mock('./hooks/useFetchProducts', () => ({
  __esModule: true,
  default: jest.fn(),
}));


const mockUseGetProducts = useFetchProducts as jest.Mock;

const mockProducts: Product[] = [
  {
    id: '1',
    product_name: 'clay pot',
    description: 'handmade clay pot for cooking',
    category: 'pottery',
    price: 1200,
    stock_quantity: 15,
    is_customizable: false,
    image: 'clay-pot.jpg',
    custom_options: null,
  },
  {
    id: '2',
    product_name: 'woven basket',
    description: 'traditional woven basket',
    category: 'basketry',
    price: 800,
    stock_quantity: 5,
    is_customizable: true,
    image: 'basket.jpg',
    custom_options: 'Color, Size',
  },
  {
    id: '3',
    product_name: 'ceramic mug',
    description: 'glazed ceramic coffee mug',
    category: 'ceramics',
    price: 600,
    stock_quantity: 20,
    is_customizable: true,
    image: 'mug.jpg',
    custom_options: 'Handle style, Glaze color',
  },
];

describe('ProductManagement', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockUseGetProducts.mockReturnValue({ products: [], loading: true, error: null });
    render(<ProductManagement />);
    expect(screen.getByText('Loading products...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockUseGetProducts.mockReturnValue({ products: [], loading: false, error: 'Failed to fetch' });
    render(<ProductManagement />);
    expect(screen.getByText('Error: Failed to fetch')).toBeInTheDocument();
  });

  it('renders product table with correct data when loaded', () => {
    mockUseGetProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });
    render(<ProductManagement />);

    expect(screen.getByText('All Products (3)')).toBeInTheDocument();
    expect(screen.getByText('Clay pot')).toBeInTheDocument(); 
    expect(screen.getByText('Woven basket')).toBeInTheDocument();
    expect(screen.getByText('Ceramic mug')).toBeInTheDocument();
    expect(screen.getByText('1200')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('filters products by search term', async () => {
    mockUseGetProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });
    render(<ProductManagement />);

    const searchInput = screen.getByPlaceholderText('Search by product name or category...');
    fireEvent.change(searchInput, { target: { value: 'basket' } });
    expect(screen.getByText('All Products (1)')).toBeInTheDocument();
    expect(screen.getByText('Woven basket')).toBeInTheDocument();
    expect(screen.queryByText('Clay pot')).not.toBeInTheDocument();
  });

  it('filters products by category', async () => {
    mockUseGetProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });
    render(<ProductManagement />);

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'ceramics' } });

    expect(screen.getByText('All Products (1)')).toBeInTheDocument();
    expect(screen.getByText('Ceramic mug')).toBeInTheDocument();
    expect(screen.queryByText('Clay pot')).not.toBeInTheDocument();
  });

  it('resets to all products when category is "all"', () => {
    mockUseGetProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });
    render(<ProductManagement />);

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'pottery' } });
    expect(screen.getByText('All Products (1)')).toBeInTheDocument();

    fireEvent.change(categorySelect, { target: { value: 'all' } });
    expect(screen.getByText('All Products (3)')).toBeInTheDocument();
  });

  it('displays "No products found" when filters yield no results', () => {
    mockUseGetProducts.mockReturnValue({ products: mockProducts, loading: false, error: null });
    render(<ProductManagement />);

    const searchInput = screen.getByPlaceholderText('Search by product name or category...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  describe('Pagination', () => {
    const manyProducts = Array.from({ length: 12 }, (_, i) => ({
      id: `${i + 1}`,
      product_name: `product ${i + 1}`,
      description: `description ${i + 1}`,
      category: 'pottery',
      price: 100,
      stock_quantity: 10,
      is_customizable: false,
      image: 'img.jpg',
      custom_options: null,
    }));

    it('shows correct number of items per page', () => {
      mockUseGetProducts.mockReturnValue({ products: manyProducts, loading: false, error: null });
      render(<ProductManagement />);
      expect(screen.getAllByText(/product \d/i).length).toBe(5); 
      expect(screen.getByText('Page 1 of 3')).toBeInTheDocument();
    });

    it('navigates to next page', () => {
      mockUseGetProducts.mockReturnValue({ products: manyProducts, loading: false, error: null });
      render(<ProductManagement />);

      const nextPageButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextPageButton);

      expect(screen.getByText('Page 2 of 3')).toBeInTheDocument();
      expect(screen.getAllByText(/product \d/i).length).toBe(5);
      expect(screen.getByText(/product 6/i)).toBeInTheDocument();
    });

    it('disables "Previous" on first page and "Next" on last page', () => {
      mockUseGetProducts.mockReturnValue({ products: manyProducts, loading: false, error: null });
      render(<ProductManagement />);

      const prevButton = screen.getByRole('button', { name: /previous/i });
      const nextButton = screen.getByRole('button', { name: /next/i });

      expect(prevButton).toBeDisabled();
      expect(nextButton).not.toBeDisabled();

      fireEvent.click(nextButton);
      fireEvent.click(nextButton);

      expect(screen.getByText('Page 3 of 3')).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
      expect(prevButton).not.toBeDisabled();
    });
  });
});