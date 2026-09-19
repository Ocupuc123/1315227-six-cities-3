import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import type { Offer } from '../../types/offer';
import { CardType, ACTIVE_CITY } from '../../const';
import { getCityData } from '../../utils/offer';
import OffersList from './components/offers-list/offers-list';
import PlacesSorting from './components/places-sorting/places-sorting';
import Tabs from './components/tabs/tabs';
import Map from '../../components/map/map';

type MainScreenProps = {
  offers: Offer[];
};

function MainScreen({ offers }: MainScreenProps): JSX.Element {
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const handleCardHover = (id: string | null) => setSelectedOfferId(id);

  const { cityOffers, city } = getCityData(offers, ACTIVE_CITY);

  return (
    <main className="page__main page__main--index">
      <Helmet>
        <title>6 cities</title>
      </Helmet>
      <h1 className="visually-hidden">Cities</h1>
      <Tabs />
      <div className="cities">
        <div className="cities__places-container container">
          {cityOffers.length === 0 ? (
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <p className="places__found">
                There are no offers in the {ACTIVE_CITY}.
              </p>
            </section>
          ) : (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">312 places to stay in Amsterdam</b>
                <PlacesSorting />
                <OffersList
                  offers={cityOffers}
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
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
