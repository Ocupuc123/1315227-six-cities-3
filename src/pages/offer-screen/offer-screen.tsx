import { useParams, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppRoute, ButtonType } from '../../const';
import { getRatingStyle } from '../../utils/offer';
import BookmarkButton from '../../components/bookmark-button/bookmark-button';
import Map from '../../components/map/map';
import NearPlacesList from './components/near-places-list/near-places-list';
import OfferGallery from './components/offer-gallery/offer-gallery';
import OfferHost from './components/offer-host/offer-host';
import OfferFeatures from './components/offer-features/offer-features';
import OfferReviews from './components/offer-reviews/offer-reviews';
import LoadingScreen from '../loading-screen/loading-screen';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferAction } from '../../store/api-actions';
import { clearOffer } from '../../store/action';

const MAX_NUMBER_MARKERS_FOR_MAP = 3;

function OfferScreen(): JSX.Element {
  const [notFound, setNotFound] = useState<boolean>(false);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const offer = useAppSelector((state) => state.offer);
  const offersNearby = useAppSelector((state) => state.offersNearby);
  const comments = useAppSelector((state) => state.comments);
  const isLoading = useAppSelector((state) => state.isOfferLoading);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    dispatch(fetchOfferAction(id))
      .unwrap()
      .catch(() => setNotFound(true));

    return () => {
      dispatch(clearOffer());
    };
  }, [id, dispatch]);

  if (notFound) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (!id || isLoading || !offer) {
    return <LoadingScreen />;
  }

  const {
    location,
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

  const hasNearby = offersNearby.length > 0;
  const city = offer.city;

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
                offerId={id}
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
              offerId={id}
            />
          </div>
        </div>
        {hasNearby && <Map mapType="offer" city={city} offers={offersNearby.slice(0, MAX_NUMBER_MARKERS_FOR_MAP)} currentOfferLocation={location} />}
      </section>
      {hasNearby && (
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
