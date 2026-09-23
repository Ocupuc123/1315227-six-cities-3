import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { CardType, Cities, SortType, type CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { sortOffers } from '../../utils/offer';
import OffersList from './components/offers-list/offers-list';
import PlacesSorting from './components/places-sorting/places-sorting';
import CitiesList from './components/cities-list/cities-list';
import Map from '../../components/map/map';

const DEFAULT_SORT_TYPE = SortType.Popular;

function MainScreen(): JSX.Element {
  const [currentSortType, setCurrentSortType] =
    useState<SortType>(DEFAULT_SORT_TYPE);
  const activeCityName = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const handleCardHover = (id: string | null) => setSelectedOfferId(id);
  const handleTabClick = (city: CityName) => dispatch(changeCity(city));
  const handleSortChange = (type: SortType) => setCurrentSortType(type);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === activeCityName),
    [offers, activeCityName],
  );

  const sortedOffers = useMemo(
    () => sortOffers(filteredOffers, currentSortType),
    [filteredOffers, currentSortType],
  );

  const currentCity = filteredOffers[0]?.city;

  return (
    <main className="page__main page__main--index">
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
        <div className="cities__places-container container">
          {sortedOffers.length === 0 ? (
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <p className="places__found">
                There are no offers in the {activeCityName}.
              </p>
            </section>
          ) : (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {sortedOffers.length}{' '}
                  {sortedOffers.length > 1 ? 'places' : 'place'} to stay in{' '}
                  {activeCityName}
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
          )}
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
