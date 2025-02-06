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
  const [review, setReview] = useState("");
  const [savedReviews, setSavedReviews] = useState(() => {
    const savedProductReviews = localStorage.getItem(`reviews_${productId}`);
    return savedProductReviews ? JSON.parse(savedProductReviews) : [];
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    localStorage.setItem(`ratings_${productId}`, JSON.stringify(ratings));
  }, [ratings, productId]);

  useEffect(() => {
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(savedReviews));
  }, [savedReviews, productId]);

  const handleSelect = (rating) => {
    setSelectedStars(rating);
    setRatings((prevRatings) => [...prevRatings, rating]);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleReviewSubmit = () => {
    if (review.trim() && selectedStars > 0) {
      const newReview = {
        text: review,
        rating: selectedStars,
        date: new Date().toLocaleString(),
      };
      setSavedReviews((prevReviews) => [...prevReviews, newReview]);
      setReview("");
      setSelectedStars(0);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const averageRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

  return (
    <>
      {showAlert && (
        <div className="alert">You successfully added a review!</div>
      )}
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
        <p>
          {selectedStars} stars out of {totalStars}
        </p>
      </div>
      <div className="review-section">
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          rows={4}
        />
        <button onClick={handleReviewSubmit}>Submit Review</button>

        {savedReviews.length > 0 && (
          <div className="reviews-list">
            <h3>All Reviews</h3>
            {savedReviews.map((savedReview, index) => (
              <div key={index} className="review">
                <p>{savedReview.text}</p>
                <div className="review-meta">
                  <span>Rating: {savedReview.rating} stars</span>
                  <span>{savedReview.date}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

StarRating.propTypes = {
  productId: PropTypes.string.isRequired,
  totalStars: PropTypes.number,
};

export default StarRating;
