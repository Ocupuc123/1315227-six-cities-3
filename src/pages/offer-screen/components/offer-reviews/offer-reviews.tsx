import type { Comment } from '../../../../types/comment';
import { AuthorizationStatus } from '../../../../const';
import Reviewslist from '../reviews-list/reviews-list';
import ReviewsForm from '../reviews-form/reviews-form';

type OfferReviewsProps = {
  comments: Comment[];
  authorizationStatus: AuthorizationStatus;
  offerId: string;
};

function OfferReviews({
  comments,
  authorizationStatus,
  offerId,
}: OfferReviewsProps): JSX.Element {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews · <span className="reviews__amount">{comments.length}</span>
      </h2>
      {comments.length > 0 && <Reviewslist comments={comments} />}
      {authorizationStatus === AuthorizationStatus.Auth && (
        <ReviewsForm offerId={offerId} />
      )}
    </section>
  );
}

export default OfferReviews;
