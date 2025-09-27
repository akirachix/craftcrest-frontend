import '@testing-library/jest-dom';
import 'jest-fetch-mock'; 

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import OrdersPage from './page';

jest.mock('../hooks/useFetchOrders');
jest.mock('../hooks/useFetchUsers');

import useFetchOrders from '../hooks/useFetchOrders';
import useFetchUsers from '../hooks/useFetchUsers';

const mockOrders = [
  {
    id: 1,
    buyer: 11,
    artisan: 21,
    order_type: 'custom',
    status: 'completed',
    quantity: 2,
    total_amount: 1000,
    payment_status: 'pending',
  },
  {
    id: 2,
    buyer: 12,
    artisan: 22,
    order_type: 'standard',
    status: 'pending',
    quantity: 5,
    total_amount: 2500,
    payment_status: 'completed',
  },
];

const mockUsers = [
  { id: 11, first_name: 'Alice', last_name: 'Smith' },
  { id: 12, first_name: 'Bob', last_name: 'Jones' },
  { id: 21, first_name: 'Carol', last_name: 'Miller' },
  { id: 22, first_name: 'Dave', last_name: 'Wilson' },
];

describe('OrdersPage', () => {
  beforeEach(() => {
    (useFetchOrders as jest.Mock).mockReturnValue({
      orders: mockOrders,
      loading: false,
      error: null,
    });
    (useFetchUsers as jest.Mock).mockReturnValue({
      users: mockUsers,
      loading: false,
      error: null,
    });
  });

  it('renders loading state initially', () => {
    (useFetchOrders as jest.Mock).mockReturnValueOnce({
      orders: [],
      loading: true,
      error: null,
    });
    (useFetchUsers as jest.Mock).mockReturnValueOnce({
      users: [],
      loading: true,
      error: null,
    });

    render(<OrdersPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state when orders or users have error', () => {
    (useFetchOrders as jest.Mock).mockReturnValueOnce({
      orders: [],
      loading: false,
      error: 'Failed to load orders',
    });
    (useFetchUsers as jest.Mock).mockReturnValueOnce({
      users: [],
      loading: false,
      error: null,
    });

    render(<OrdersPage />);
    expect(screen.getByText(/Failed to load orders/i)).toBeInTheDocument();
  });

  it('displays order details with buyer and seller names', () => {
    render(<OrdersPage />);

    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.getByText(/Carol Miller/i)).toBeInTheDocument();
    expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument();
    expect(screen.getByText(/Dave Wilson/i)).toBeInTheDocument();
  });

  it('filters orders by status using dropdown', () => {
    render(<OrdersPage />);
    fireEvent.click(screen.getByRole('button', { name: /all status/i }));
    fireEvent.click(screen.getByRole('option', { name: /completed/i }));

    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob Jones/i)).not.toBeInTheDocument();
  });

  it('filters orders by search query matching order id', () => {
    render(<OrdersPage />);
    const searchInput = screen.getByPlaceholderText(/search by order, buyer, seller, type, status/i);
    fireEvent.change(searchInput, { target: { value: '1' } });

    expect(screen.getByText(/Alice Smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/Bob Jones/i)).not.toBeInTheDocument();
  });

  it('filters orders by search query matching buyerName', () => {
    render(<OrdersPage />);
    const searchInput = screen.getByPlaceholderText(/search by order, buyer, seller, type, status/i);
    fireEvent.change(searchInput, { target: { value: 'bob' } });

    expect(screen.getByText(/Bob Jones/i)).toBeInTheDocument();
    expect(screen.queryByText(/Alice Smith/i)).not.toBeInTheDocument();
  });

  it('handles pagination buttons correctly', () => {
    render(<OrdersPage />);
    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });

  it('opens order modal when view button clicked and closes when modal closed', async () => {
    render(<OrdersPage />);
    const viewButtons = screen.getAllByRole('button', { name: /view/i });
    await act(async () => {
      fireEvent.click(viewButtons[0]);
    });

    expect(await screen.findByText(/order details/i)).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /close/i });
    await act(async () => {
      fireEvent.click(closeButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/order details/i)).not.toBeInTheDocument();
    });
  });
});
