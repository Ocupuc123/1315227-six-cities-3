import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import { offers } from './mocks/offers';
import { offer } from './mocks/offer';
import { favorites } from './mocks/favorites';
import { offersNearby } from './mocks/offers-nearby';
import { comments } from './mocks/comments';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offers={offers}
      offer={offer}
      offersNearby={offersNearby}
      favorites={favorites}
      comments={comments}
    />
  </React.StrictMode>,
);
