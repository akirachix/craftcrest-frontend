
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
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

  it('rejects with error message when response is not ok with error message', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Server error' }), { status: 500, statusText: 'Server error' });


    await expect(fetchOrders()).rejects.toThrow(
      'Unable to fetch orders. Please try again later.: Server error'
    );
  });

  it('rejects with error message when response is not ok without error message', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Server error' }), { status: 500, statusText: 'Server error' });
    await expect(fetchOrders()).rejects.toThrow(
      'Unable to fetch orders. Please try again later.: Server error'
    );
  });

  it('rejects with error message when fetch itself fails', async () => {
    fetchMock.mockReject(new Error('Network failure'));

    await expect(fetchOrders()).rejects.toThrow(
      'Unable to fetch orders. Please try again later.: Network failure'
    );
  });
});
