import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './app/app';
import { loadOffers, loadFavorites } from './store/action';
import { offers } from './mocks/offers';
import { offer } from './mocks/offer';
import { favorites } from './mocks/favorites';
import { offersNearby } from './mocks/offers-nearby';
import { comments } from './mocks/comments';
import { store } from './store';

store.dispatch(loadOffers(offers));
store.dispatch(loadFavorites(favorites));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offer={offer}
        offersNearby={offersNearby}
        comments={comments}
      />
    </Provider>
  </React.StrictMode>,
);
