import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Offer } from '../../types/offer';
import { CardType } from '../../const';
import OffersList from './components/offers-list/offers-list';
import PlacesSorting from './components/places-sorting/places-sorting';
import Tabs from './components/tabs/tabs';
import Map from '../../components/map/map';

const ACTIVE_CITY = 'Amsterdam';

type MainScreenProps = {
  offers: Offer[];
};

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const handleCardHover = (id: string | null) => setSelectedOfferId(id);

  if (!offers) {
    return (
      <main className="page__main page__main--index">
        <div className="container">Загрузка...</div>
      </main>
    );
  }

  const cityOffers = offers.filter((offer) => offer.city.name === ACTIVE_CITY);
  const city = cityOffers[0]?.city;

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">312 places to stay in Amsterdam</b>
            <PlacesSorting />
            <OffersList
              offers={offers}
              onCardHover={handleCardHover}
              cardType={CardType.City}
            />
          </section>
          <div className="cities__right-section">
            {city && (
              <Map
                city={city}
                offers={cityOffers}
                selectedOfferId={selectedOfferId}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
