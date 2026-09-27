import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './app/app';
import { loadFavorites } from './store/action';
import { fetchOffersAction } from './store/api-actions';
import { offer } from './mocks/offer';
import { favorites } from './mocks/favorites';
import { offersNearby } from './mocks/offers-nearby';
import { comments } from './mocks/comments';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());
store.dispatch(loadFavorites(favorites));

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App offer={offer} offersNearby={offersNearby} comments={comments} />
    </Provider>
  </React.StrictMode>,
);
