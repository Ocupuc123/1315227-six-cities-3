import { useState, ChangeEvent, FormEvent } from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const MIN_RATING = 1;

type FormData = {
  review: string;
  rating: number;
};

function ReviewsForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    review: '',
    rating: 0,
  });

  const isValid =
  formData.review.length >= MIN_REVIEW_LENGTH &&
  formData.review.length <= MAX_REVIEW_LENGTH &&
  formData.rating >= MIN_RATING;

  const handleInputChange = (
    evt: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = evt.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <ReviewsRating onChange={handleInputChange} rating={formData.rating} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleInputChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
