import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';
import { loadFavorites } from './store/action';
import { fetchOffersAction } from './store/api-actions';
import { offer } from './mocks/offer';
import { favorites } from './mocks/favorites';
import { offersNearby } from './mocks/offers-nearby';
import { comments } from './mocks/comments';
import { store } from './store';
import ErrorMessage from './components/error-message/error-message';
import { checkAuthAction } from './store/api-actions';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(loadFavorites(favorites));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage />
      <App offer={offer} offersNearby={offersNearby} comments={comments} />
    </Provider>
  </React.StrictMode>,
);
