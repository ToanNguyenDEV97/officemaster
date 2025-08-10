
import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  totalStars?: number;
  className?: string;
  starSize?: string;
  showText?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ 
    rating, 
    totalStars = 5, 
    className = 'flex items-center gap-1 text-amber-400', 
    starSize = 'w-4 h-4',
    showText = true,
}) => {
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} className={starSize} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} className={starSize} />);
    } else {
      stars.push(<FaRegStar key={i} className={starSize} />);
    }
  }

  return (
    <div className={className}>
      {stars}
      {showText && <span className="text-slate-600 text-sm ml-1 font-semibold">{rating.toFixed(1)}</span>}
    </div>
  );
};

export default StarRating;
