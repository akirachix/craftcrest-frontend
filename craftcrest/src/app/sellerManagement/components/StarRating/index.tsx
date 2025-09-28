import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function StarRating(props: { rating: number }) {
  const starArray = [];
  for (let index = 0; index < 5; index++) {
    if (index < props.rating) {
      starArray.push(<FaStar key={index} data-testid="filled-star" />);
    } else {
      starArray.push(<FaRegStar key={index} data-testid="empty-star" />);
    }
  }
  return <span className="text-[#5D070D] flex">{starArray}</span>;
}
