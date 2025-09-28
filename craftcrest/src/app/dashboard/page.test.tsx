import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { SellerVerificationChart } from '../dashboard/components/SellerVerificationChart';
import { PerformanceStats } from './components/PerformanceStats';

const mockData = {
  verified: 30,
  unverified: 20,
  verificationRate: 60
};

function ChartTestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: 400, height: 300 }}>
      {children}
    </div>
  );
}

describe('SellerVerificationChart', () => {
  test('renders chart title', () => {
    render(
      <ChartTestWrapper>
        <SellerVerificationChart data={mockData} />
      </ChartTestWrapper>
    );
    expect(screen.getByText('Seller Verification')).toBeInTheDocument();
  });

  test('renders pie chart slices and total', () => {
    render(
      <ChartTestWrapper>
        <SellerVerificationChart data={mockData} />
      </ChartTestWrapper>
    );
    expect(screen.getByText((mockData.verified + mockData.unverified).toString())).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText(`30 (60%)`)).toBeInTheDocument();

    expect(screen.getByText('Unverified')).toBeInTheDocument();
    expect(screen.getByText(`20 (40%)`)).toBeInTheDocument();
    expect(screen.getByText('Verification rate:')).toBeInTheDocument();
    expect(screen.getByText('60%')).toBeInTheDocument();
  });
});

jest.mock('lucide-react', () => ({
  LayoutGrid: () => <svg data-testid="layout-grid-icon" />,
}));

jest.mock('lucide-react', () => ({
  AlertCircle: (props: Record<string, unknown>) => <svg data-testid="alert-circle-icon" {...props} />,
  CheckCircle: (props: Record<string, unknown>) => <svg data-testid="check-circle-icon" {...props} />,
  Star: (props: Record<string, unknown>) => <svg data-testid="star-icon" {...props} />,
}));

describe('PerformanceStats component', () => {
  const data = {
    rejectionRate: 8,
    paidOrders: 12,
    averageRating: 4.3,
    fulfillmentRate: 95,
  };

  it('renders the header correctly', () => {
    render(<PerformanceStats data={data} />);
    expect(screen.getByText('Quick Performance Stats')).toBeInTheDocument();
  });

  it('renders all stats with correct labels, targets, and formatted values', () => {
    render(<PerformanceStats data={data} />);
    expect(screen.getByText('Rejection Rate')).toBeInTheDocument();
    expect(screen.getByText('Target: <=10%')).toBeInTheDocument();
    expect(screen.getByText('Paid Orders')).toBeInTheDocument();
    expect(screen.getByText('Target: >=10 orders')).toBeInTheDocument();
    expect(screen.getByText('Average Customer Rating')).toBeInTheDocument();
    expect(screen.getByText('Target: >=4.0 out of 5')).toBeInTheDocument();
    expect(screen.getByText('Order Fulfillment Rate')).toBeInTheDocument();
    expect(screen.getByText('Target: >=90%')).toBeInTheDocument();
    expect(screen.getByText('8%')).toBeInTheDocument();
    expect(screen.getByText('12')).toBeInTheDocument();
    expect(screen.getByText('4.3')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
  });

  it('renders all icons with correct test ids', () => {
    render(<PerformanceStats data={data} />);
    expect(screen.getByTestId('alert-circle-icon')).toBeInTheDocument();
    const checkCircleIcons = screen.getAllByTestId('check-circle-icon');
    expect(checkCircleIcons.length).toBe(2);
    expect(screen.getByTestId('star-icon')).toBeInTheDocument();
  });
});