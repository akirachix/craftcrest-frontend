import React from "react";
import { render, screen } from "@testing-library/react";
import StarRating from "./components/StarRating";
import '@testing-library/jest-dom';


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
