import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import PropTypes from "prop-types";
import Star from "./Star";

const createArray = (length) => [...Array(length)];

function StarRating({ productId, totalStars = 5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  const [ratings, setRatings] = useState(() => {
    const savedRatings = localStorage.getItem(`ratings_${productId}`);
    return savedRatings ? JSON.parse(savedRatings) : [];
  });

  useEffect(() => {
    localStorage.setItem(`ratings_${productId}`, JSON.stringify(ratings));
  }, [ratings, productId]);

  const handleSelect = (rating) => {
    setSelectedStars(rating);
    setRatings((prevRatings) => [...prevRatings, rating]);
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <>
      <div className="raiting-box">
        <p className="average-rating">
          Average Rating: <span>{averageRating} </span>({ratings.length}{" "}
          reviews)
        </p>
        <div>
          {createArray(totalStars).map((n, i) => (
            <Star
              key={i}
              selected={selectedStars > i}
              onSelect={() => handleSelect(i + 1)}
            />
          ))}
        </div>
        <p>0 out of {totalStars} stars</p>
      </div>
    </>
  );
}

StarRating.propTypes = {
  productId: PropTypes.string.isRequired,
  totalStars: PropTypes.number,
};

export default StarRating;
