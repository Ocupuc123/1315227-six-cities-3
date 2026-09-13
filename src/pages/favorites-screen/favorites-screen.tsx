import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import type { Offer } from '../../types/offer';
import FavoriteList from '../../components/favorites-list/favorites-list';
import FavoritesEmpty from '../../components/favorites-empty/favorites-empty';

type FavoritesScreenProps = {
  favorites: Offer[];
};

function FavoritesScreen({ favorites }: FavoritesScreenProps): JSX.Element {
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
      <footer className={`footer ${!hasFavorites ? 'container' : ''}`}>
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
