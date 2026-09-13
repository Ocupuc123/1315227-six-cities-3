import { Helmet } from 'react-helmet-async';
import NearPlacesList from '../../components/near-places-list/near-places-list';
import Reviewslist from '../../components/reviews-list/reviews-list';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import type { Offer, FullOffer } from '../../types/offer';
import type { Comment } from '../../types/comment';
import ReviewsForm from '../../components/reviews-form/reviews-form';
import { AuthorizationStatus, ButtonType } from '../../const';
import { capitalizeString } from '../../utils/common';
import { getRatingStyle } from '../../utils/offer';

const MAX_IMAGES = 6;

type OfferScreenProps = {
  offersNearby: Offer[];
  comments: Comment[];
  offer: FullOffer;
  authorizationStatus: AuthorizationStatus;
};

function OfferScreen({
  offersNearby,
  comments,
  offer,
  authorizationStatus,
}: OfferScreenProps): JSX.Element {
  const {
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    description,
    bedrooms,
    goods,
    host,
    images,
    maxAdults,
  } = offer;

  return (
    <main className="page__main page__main--offer">
      <Helmet>
        <title>6 cities: offer</title>
      </Helmet>
      <section className="offer">
        {images.length > 0 && (
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.slice(0, MAX_IMAGES).map((imageSrc) => (
                <div className="offer__image-wrapper" key={imageSrc}>
                  <img
                    className="offer__image"
                    src={imageSrc}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <BookmarkButton isFavorite={isFavorite} buttonType={ButtonType.Offer} />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: getRatingStyle(rating) }} />
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">
                {rating}
              </span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizeString(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                Max {maxAdults} adults
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            {goods.length > 0 && (
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                <ul className="offer__inside-list">
                  {goods.map((good) => (
                    <li className="offer__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div
                  className={`offer__avatar-wrapper user__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''}`}
                >
                  {host.avatarUrl && (
                    <img
                      className="offer__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  )}
                </div>
                <span className="offer__user-name">{host.name}</span>
                {host.isPro && <span className="offer__user-status">Pro</span>}
              </div>
              <div className="offer__description">
                <p className="offer__text">
                  {description}
                </p>
              </div>
            </div>
            <section className="offer__reviews reviews">
              <h2 className="reviews__title">
                Reviews ·{' '}
                <span className="reviews__amount">{comments.length}</span>
              </h2>
              {comments.length > 0 && <Reviewslist comments={comments} />}
              {authorizationStatus === AuthorizationStatus.Auth && (
                <ReviewsForm />
              )}
            </section>
          </div>
        </div>
        <section className="offer__map map" />
      </section>
      {offersNearby.length > 0 && (
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <NearPlacesList offersNearby={offersNearby} />
          </section>
        </div>
      )}
    </main>
  );
}

export default OfferScreen;
