import '@testing-library/jest-dom';
import { fetchOrders } from './fetchOrders';

describe('fetchOrders', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should fetch and return orders successfully', async () => {
    const mockOrders = [
      { id: 1, customer: 'Alice' },
      { id: 2, customer: 'Bob' },
    ];
    fetchMock.mockResponseOnce(JSON.stringify(mockOrders));
    const result = await fetchOrders();
    expect(fetch).toHaveBeenCalledWith('/api/orders');
    expect(result).toEqual(mockOrders);
  });

  it('should throw an error when the response is not ok', async () => {
    fetchMock.mockResponseOnce('Not Found', { status: 404, statusText: 'Not Found' });
    await expect(fetchOrders()).rejects.toThrow('Something went wrong, Not Found');
  });

  it('should throw a descriptive error when fetch fails (e.g., network error)', async () => {
    fetchMock.mockRejectOnce(new Error('Network error'));
    await expect(fetchOrders()).rejects.toThrow('Failed to fetch orders: Network error');
  });
});
