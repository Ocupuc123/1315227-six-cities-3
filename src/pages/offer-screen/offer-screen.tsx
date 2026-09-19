import { Helmet } from 'react-helmet-async';
import type { Offer, FullOffer } from '../../types/offer';
import type { Comment } from '../../types/comment';
import { AuthorizationStatus, ButtonType } from '../../const';
import { getRatingStyle } from '../../utils/offer';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
// import Map from '../../components/map/map';
import NearPlacesList from './components/near-places-list/near-places-list';
import OfferGallery from './components/offer-gallery/offer-gallery';
import OfferHost from './components/offer-host/offer-host';
import OfferFeatures from './components/offer-features/offer-features';
import OfferReviews from './components/offer-reviews/offer-reviews';

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
  if (!offer) {
    return (
      <main className="page__main page__main--offer">
        <div className="container">Загрузка...</div>
      </main>
    );
  }

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
        {images.length > 0 && <OfferGallery images={images} />}
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <BookmarkButton
                isFavorite={isFavorite}
                buttonType={ButtonType.Offer}
              />
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
            <OfferFeatures
              type={type}
              bedrooms={bedrooms}
              maxAdults={maxAdults}
            />
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
            <OfferHost host={host} description={description} />
            <OfferReviews
              comments={comments}
              authorizationStatus={authorizationStatus}
            />
          </div>
        </div>
        {/* <Map mapType='offer' /> */}
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
