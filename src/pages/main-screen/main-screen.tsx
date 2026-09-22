import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { CardType, Cities, type CityName } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import OffersList from './components/offers-list/offers-list';
import PlacesSorting from './components/places-sorting/places-sorting';
import CitiesList from './components/cities-list/cities-list';
import Map from '../../components/map/map';

function MainScreen(): JSX.Element {
  const activeCityName = useAppSelector((state) => state.activeCity);
  const offers = useAppSelector((state) => state.offers);
  const dispatch = useAppDispatch();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const handleCardHover = (id: string | null) => setSelectedOfferId(id);
  const handleTabClick = (city: CityName) => dispatch(changeCity(city));

  const getOffersByCity = offers.filter(
    (offer) => offer.city.name === activeCityName,
  );

  const currentCity = getOffersByCity[0]?.city;

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
          {getOffersByCity.length === 0 ? (
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
                  {getOffersByCity.length}{' '}
                  {getOffersByCity.length > 1 ? 'places' : 'place'} to stay in{' '}
                  {activeCityName}
                </b>
                <PlacesSorting />
                <OffersList
                  offers={getOffersByCity}
                  onCardHover={handleCardHover}
                  cardType={CardType.City}
                />
              </section>
              <div className="cities__right-section">
                {activeCityName && currentCity && (
                  <Map
                    city={currentCity}
                    offers={getOffersByCity}
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
