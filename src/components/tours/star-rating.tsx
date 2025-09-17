'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

type StarRatingProps = {
  rating?: number;
  isEditable?: boolean;
  onRatingChange?: (rating: number) => void;
};

export function StarRating({ rating = 0, isEditable = false, onRatingChange }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  const handleClick = (rate: number) => {
    if (!isEditable) return;
    setCurrentRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  const displayRating = hoverRating || currentRating;

  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={cn(
            'h-5 w-5',
            star <= displayRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300',
            isEditable ? 'cursor-pointer' : ''
          )}
          onMouseEnter={isEditable ? () => setHoverRating(star) : undefined}
          onMouseLeave={isEditable ? () => setHoverRating(0) : undefined}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
}
