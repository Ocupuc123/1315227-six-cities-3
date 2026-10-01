import { useState, ChangeEvent, FormEvent } from 'react';
import ReviewsRating from '../reviews-rating/reviews-rating';
import { addCommentAction } from '../../../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { toast } from 'react-toastify';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 300;
const MIN_RATING = 1;
const MESSAGE_SUCCESS_SUBMITTING = 'The comment has been published.';
const MESSAGE_FAILED_SUBMITTING = 'The comment has not been published.';

type FormData = {
  review: string;
  rating: number;
};

type ReviewsFormProps = {
  offerId: string;
};

function ReviewsForm({ offerId }: ReviewsFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isSubmitting = useAppSelector((state) => state.isCommentSubmitting);

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

    dispatch(
      addCommentAction({
        offerId,
        comment: formData.review,
        rating: formData.rating,
      }),
    )
      .unwrap()
      .then(() => {
        setFormData({ review: '', rating: 0 });
        toast.success(MESSAGE_SUCCESS_SUBMITTING);
      })
      .catch(() => {
        toast.error(MESSAGE_FAILED_SUBMITTING);
      });
  };

  return (
    <form className="reviews__form form" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <ReviewsRating
        onChange={handleInputChange}
        rating={formData.rating}
        isSubmitting={isSubmitting}
      />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleInputChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{MIN_REVIEW_LENGTH} characters</b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
