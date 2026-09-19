import { Link } from 'react-router-dom';
import { Cities } from '../../../../const';

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Cities.map((cityName) => (
            <li className="locations__item" key={cityName}>
              <Link className="locations__item-link tabs__item" to="#">
                <span>{cityName}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
