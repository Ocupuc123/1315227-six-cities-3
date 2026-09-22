import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { type CityName, AppRoute } from '../../../../const';

type CitiesListProps = {
  cities: readonly CityName[];
  activeCityName: CityName;
  onClick: (city: CityName) => void;
};

function CitiesList({
  cities,
  activeCityName,
  onClick,
}: CitiesListProps): JSX.Element {
  const handleTabItemClick = (
    evt: MouseEvent<HTMLAnchorElement>,
    cityName: CityName,
  ) => {
    evt.preventDefault();
    onClick(cityName);
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((cityName) => (
            <li className="locations__item" key={cityName}>
              <Link
                className={`locations__item-link tabs__item ${activeCityName === cityName ? 'tabs__item--active' : ''}`}
                to={AppRoute.Main}
                onClick={(evt) => handleTabItemClick(evt, cityName)}
              >
                <span>{cityName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default CitiesList;
