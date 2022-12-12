import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function RatingStar({ rating, setRating }) {
  //   const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  return (
    <div className="w-28 flex whitespace-nowrap">
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              className="hidden "
              value={ratingValue}
              onClick={() => setRating(ratingValue)}
            />
            <FaStar
              size={30}
              color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}
