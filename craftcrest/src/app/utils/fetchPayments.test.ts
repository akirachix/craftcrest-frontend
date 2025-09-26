import { fetchPayments } from './fetchPayments';
import '@testing-library/jest-dom';

global.fetch = jest.fn();
const mockJson = jest.fn();

describe('fetchPayments', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockReset();
    mockJson.mockReset();
  });

  it('should handle success state', async () => {
    const mockData = [
      {
        id: '1',
        amount: 1500,
        currency: 'USD',
        status: 'completed',
        customer_id: 'cust_123',
        created_at: '2023-01-01T00:00:00Z',
        payment_method: 'credit_card',
      },
    ];

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue(mockData),
    });

    const data = await fetchPayments();

    expect(data).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith('/api/payments');
  });

  it('should handle empty state', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: mockJson.mockResolvedValue([]),
    });

    const data = await fetchPayments();

    expect(data).toEqual([]);
    expect(global.fetch).toHaveBeenCalledWith('/api/payments');
  });

  it('should handle error state', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
      json: mockJson,
    });

    await expect(fetchPayments()).rejects.toThrow(
      'Failed to fetch payments: Internal Server Error'
    );
    expect(global.fetch).toHaveBeenCalledWith('/api/payments');
  });

  
});