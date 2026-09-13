import { ChangeEvent, Fragment } from 'react';

const RATING_TITLES = ['terribly', 'badly', 'not bad', 'good', 'perfect'] as const;
const RATING_COUNT = RATING_TITLES.length;

type ReviewsRatingProps = {
  rating: number;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function ReviewsRating({ onChange, rating }: ReviewsRatingProps): JSX.Element {
  return (
    <div className="reviews__rating-form form__rating">
      {Array.from({ length: RATING_COUNT }, (_, index) => {
        const value = RATING_COUNT - index;
        const startIndex = value.toString();
        const id = `${value}-star`;

        return (
          <Fragment key={id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={startIndex}
              id={`${startIndex}-star`}
              type="radio"
              checked={rating === value}
              onChange={onChange}
            />
            <label
              htmlFor={`${startIndex}-star`}
              className="reviews__rating-label form__rating-label"
              title={RATING_TITLES[value - 1]}
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
