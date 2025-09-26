import React from "react";
import { render, screen } from "@testing-library/react";
import SellerTable from "./components/SellerTable";
import StarRating from "./components/StarRating";
import '@testing-library/jest-dom';

jest.mock("../hooks/useSellers", () => ({
  useSellers: () => ({
    sellers: [
      { id: 1, first_name: "Jane", last_name: "Doe" },
      { id: 2, first_name: "John", last_name: "Smith" },
    ],
  }),
}));
jest.mock("../hooks/useOrders", () => ({
  useOrders: () => ({
    orders: [
      { id: 1, artisan: 1, status: "completed" },
      { id: 2, artisan: 1, status: "rejected" },
      { id: 3, artisan: 2, status: "completed" },
    ],
  }),
}));
jest.mock("../hooks/useRatings", () => ({
  useRatings: () => ({
    ratings: [
      { order: 1, rating: 4 },
      { order: 3, rating: 5 },
    ],
  }),
}));

describe("SellerTable", () => {
  it("renders sellers' names", () => {
    render(<SellerTable search="" />);
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
    expect(screen.getByText("John Smith")).toBeInTheDocument();
  });

  it("filters sellers by search", () => {
    render(<SellerTable search="Charity" />);
    expect(screen.getByText("Charity Dawin")).toBeInTheDocument();
    expect(screen.queryByText("Nathaniel Sherr ")).not.toBeInTheDocument();
  });

  it("shows not found when no sellers match", () => {
    render(<SellerTable search="zzz" />);
    expect(screen.getByText(/Result Not Found/i)).toBeInTheDocument();
  });

  it("renders star ratings for each seller", () => {
    render(<SellerTable search="" />);
    expect(screen.getAllByRole("img").length).toBeGreaterThan(0);
  });

  it("pagination disables previous on first page", () => {
    render(<SellerTable search="" />);
    expect(screen.getByText(/Previous/)).toBeDisabled();
  });
});

describe("StarRating", () => {
  it("renders correct number of filled and empty stars", () => {
    render(<StarRating rating={3} />);
    expect(screen.getAllByRole("img").length).toBe(5);
  });

  it("renders all stars as empty for rating 0", () => {
    render(<StarRating rating={0} />);
    expect(screen.getAllByRole("img").length).toBe(5);
  });

  it("renders all stars as filled for rating 5", () => {
    render(<StarRating rating={5} />);
    expect(screen.getAllByRole("img").length).toBe(5);
  });
});