import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import FavoriteList from './components/favorites-list/favorites-list';
import FavoritesEmpty from './components/favorites-empty/favorites-empty';

function FavoritesScreen(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const hasFavorites = favorites.length > 0;

  return (
    <>
      <main
        className={`page__main page__main--favorites ${!hasFavorites ? 'page__main--favorites-empty' : ''}`}
      >
        <Helmet>
          <title>
            {hasFavorites ? '6 cities: favorites' : '6 cities: favorites empty'}
          </title>
        </Helmet>
        <div className="page__favorites-container container">
          {hasFavorites ? (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteList favorites={favorites} />
            </section>
          ) : (
            <FavoritesEmpty />
          )}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width={64}
            height={33}
          />
        </Link>
      </footer>
    </>
  );
}

export default FavoritesScreen;
