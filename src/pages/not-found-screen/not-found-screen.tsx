import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

function NotFoundScreen(): JSX.Element {
  return (
    <main className="page__main page__main--favorites page__main--favorites-empty">
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites favorites--empty">
          <div className="favorites__status-wrapper">
            <h1 className="favorites__status">404 Not Found</h1>
            <p
              className="favorites__status-description"
              style={{ marginBottom: 30 }}
            >
              We didn’t find what we were looking for.
            </p>
            <Link
              className="login__submit form__submit button"
              to={AppRoute.Main}
            >
              Back to the main page
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

export default NotFoundScreen;
