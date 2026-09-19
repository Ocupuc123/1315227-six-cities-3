import { useMemo } from 'react';
import type { Offer } from '../../../../types/offer';
import { Link } from 'react-router-dom';
import { Cities, CardType, AppRoute } from '../../../../const';
import PlaceCard from '../../../../components/place-card/place-card';

type FavoriteListProps = {
  favorites: Offer[];
};

function FavoriteList({ favorites }: FavoriteListProps): JSX.Element {
  const favoriteGroups = useMemo(
    () =>
      Cities.map((cityName) => ({
        cityName,
        offers: favorites.filter((offer) => offer?.city?.name === cityName),
      })).filter(({ offers }) => offers.length > 0),
    [favorites],
  );

  return (
    <ul className="favorites__list">
      {favoriteGroups.map(({ cityName, offers }) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to={AppRoute.Main}>
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <div className="favorites__places">
            {offers.map((offer) => (
              <PlaceCard
                key={offer?.id}
                offer={offer}
                cardType={CardType.Favorite}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoriteList;
