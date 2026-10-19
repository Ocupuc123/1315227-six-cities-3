import { ChangeEvent, Fragment } from 'react';

const RatingTitles = [
  'terribly',
  'badly',
  'not bad',
  'good',
  'perfect',
] as const;

const RATING_COUNT = RatingTitles.length;

type ReviewsRatingProps = {
  rating: number;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  isSubmitting: boolean;
};

function ReviewsRating({ onChange, rating, isSubmitting }: ReviewsRatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {Array.from({ length: RATING_COUNT }, (_, index) => {
        const value = RATING_COUNT - index;
        const startIndex = value.toString();
        const id = `${value}-stars`;

        return (
          <Fragment key={id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={startIndex}
              id={id}
              type="radio"
              checked={rating === value}
              onChange={onChange}
              disabled={isSubmitting}
            />
            <label
              htmlFor={id}
              className="reviews__rating-label form__rating-label"
              title={RatingTitles[value - 1]}
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        );
      })}
    </div>
  );
}

export default ReviewsRating;
