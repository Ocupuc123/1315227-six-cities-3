import type { Comment } from '../../../../types/comment';
import { getRatingStyle } from '../../../../utils/offer';

const MAX_REVIEWS = 10;

const getLatestComments = (
  comments: Comment[],
  limit = MAX_REVIEWS,
): Comment[] =>
  [...comments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, limit);

type ReviewslistProps = {
  comments: Comment[];
};

const formatReviewDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric',
  }).format(date);
};

function Reviewslist({ comments }: ReviewslistProps): JSX.Element {
  const visibleComments = getLatestComments(comments);

  return (
    <ul className="reviews__list">
      {visibleComments.map((comment) => (
        <li className="reviews__item" key={comment.id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              {comment.user.avatarUrl && (
                <img
                  className="reviews__avatar user__avatar"
                  src={comment.user.avatarUrl}
                  width={54}
                  height={54}
                  alt={comment.user.name}
                />
              )}
            </div>
            <span className="reviews__user-name">{comment.user.name}</span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span
                  style={{ width: getRatingStyle(comment.rating) }}
                />
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">{comment.comment}</p>
            <time className="reviews__time" dateTime={comment.date}>
              {formatReviewDate(comment.date)}
            </time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default Reviewslist;
