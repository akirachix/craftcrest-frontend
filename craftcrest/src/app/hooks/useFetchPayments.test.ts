import { renderHook, waitFor } from '@testing-library/react';
import useFetchPayments from './useFetchPayments';

jest.mock('../utils/fetchPayments');
import { getPayments } from '../utils/fetchPayments';

const mockGetPayments = getPayments as jest.MockedFunction<typeof getPayments>;

describe('useFetchPayments hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should start loading state correctly', () => {
    mockGetPayments.mockReturnValue(new Promise(() => {})); 
    const { result } = renderHook(() => useFetchPayments());

    expect(result.current.loading).toBe(true);
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle success state', async () => {
    const payments = [
      { id: 1, amount: 100, method: 'Mpesa' },
      { id: 2, amount: 50, method: 'Mpesa' },
    ];
    mockGetPayments.mockResolvedValue(payments);
    const { result } = renderHook(() => useFetchPayments());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual(payments);
    expect(result.current.error).toBeNull();
  });

  it('should handle empty payments', async () => {
    mockGetPayments.mockResolvedValue([]);
    const { result } = renderHook(() => useFetchPayments());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBeNull();
  });

  it('should handle error state', async () => {
    const mockError = new Error('Failed to fetch');
    mockGetPayments.mockRejectedValue(mockError);
    const { result } = renderHook(() => useFetchPayments());

    expect(result.current.loading).toBe(true); 

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.payments).toEqual([]);
    expect(result.current.error).toBe('Failed to fetch');
  });
});
