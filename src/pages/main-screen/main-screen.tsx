import { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { CardType, Cities, SortType, type CityName } from '../../const';
import { getActiveCity, getSortType } from '../../store/app-process/selectors';
import {
  getSortedOffers,
  getOffersListLoadingStatus,
  getErrorStatus,
} from '../../store/app-data/selectors';
import {
  changeCity,
  changeSortType,
} from '../../store/app-process/app-process';
import { useAppDispatch, useAppSelector } from '../../hooks';
import OffersList from './components/offers-list/offers-list';
import PlacesSorting from './components/places-sorting/places-sorting';
import CitiesList from './components/cities-list/cities-list';
import Map from '../../components/map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import ErrorScreen from './components/error-screen/error-screen';

function MainScreen(): JSX.Element {
  const activeCityName = useAppSelector(getActiveCity);
  const currentSortType = useAppSelector(getSortType);
  const sortedOffers = useAppSelector(getSortedOffers);
  const isLoading = useAppSelector(getOffersListLoadingStatus);
  const hasError = useAppSelector(getErrorStatus);

  const dispatch = useAppDispatch();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleCardHover = useCallback(
    (id: string | null) => setSelectedOfferId(id),
    [],
  );

  const handleTabClick = useCallback(
    (city: CityName) => dispatch(changeCity(city)),
    [dispatch],
  );

  const handleSortChange = useCallback(
    (type: SortType) => dispatch(changeSortType(type)),
    [dispatch],
  );

  const currentCity = sortedOffers[0]?.city;

  const renderContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (hasError) {
      return <ErrorScreen />;
    }

    if (sortedOffers.length === 0) {
      return (
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <p className="places__found">
            There are no offers in the {activeCityName}.
          </p>
        </section>
      );
    }

    return (
      <>
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {sortedOffers.length} {sortedOffers.length > 1 ? 'places' : 'place'}{' '}
            to stay in {activeCityName}
          </b>
          <PlacesSorting
            currentSortType={currentSortType}
            onSortChange={handleSortChange}
          />
          <OffersList
            offers={sortedOffers}
            onCardHover={handleCardHover}
            cardType={CardType.City}
          />
        </section>
        <div className="cities__right-section">
          {activeCityName && currentCity && (
            <Map
              city={currentCity}
              offers={sortedOffers}
              selectedOfferId={selectedOfferId}
            />
          )}
        </div>
      </>
    );
  };

  return (
    <main className={`page__main page__main--index ${hasError ? 'page__main--index-empty' : ''}`}>
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <CitiesList
        cities={Cities}
        activeCityName={activeCityName}
        onClick={handleTabClick}
      />
      <div className="cities">
        <div
          className={`cities__places-container container ${hasError ? 'cities__places-container--empty' : ''}`}
        >
          {renderContent()}
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
