import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

export default function StarRating(props: { rating: number }) {
  let starArray = [];
  for (let index = 0; index < 5; index++)
    starArray.push(index < props.rating ? <FaStar key={index} /> : <FaRegStar key={index} />);
  return <span className="text-[#5D070D] flex">{starArray}</span>;
}
