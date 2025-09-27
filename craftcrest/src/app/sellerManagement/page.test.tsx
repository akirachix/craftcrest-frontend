import React from "react";
import { render, screen, within } from "@testing-library/react";
import SellerTable from "./components/SellerTable";
import StarRating from "./components/StarRating";
import '@testing-library/jest-dom';

const mockSellers = [
  { id: 1, first_name: "Jane", last_name: "Doe" },
  { id: 2, first_name: "John", last_name: "Smith" },
  { id: 3, first_name: "Charity", last_name: "Dawin" },
  { id: 4, first_name: "Nathaniel", last_name: "Sherr" },
];

const mockOrders = [
  { id: 1, artisan: 1, status: "completed" },
  { id: 2, artisan: 1, status: "rejected" },
  { id: 3, artisan: 3, status: "completed" },
];

const mockRatings = [
  { order: 1, rating: 4 },
  { order: 3, rating: 3 },
];

describe("StarRating", () => {
  it("renders 5 star icons total", () => {
    render(<StarRating rating={3} />);
    const stars = screen.getAllByTestId(/-star/);
    expect(stars.length).toBe(5);
  });

  it("renders correct number of filled stars for rating", () => {
    render(<StarRating rating={4} />);
    const filledStars = screen.getAllByTestId("filled-star");
    expect(filledStars.length).toBe(4);
  });

  it("renders all stars as empty for rating 0", () => {
    render(<StarRating rating={0} />);
    const emptyStars = screen.getAllByTestId("empty-star");
    expect(emptyStars.length).toBe(5);
  });

  it("renders all stars as filled for rating 5", () => {
    render(<StarRating rating={5} />);
    const filledStars = screen.getAllByTestId("filled-star");
    expect(filledStars.length).toBe(5);
  });
});
