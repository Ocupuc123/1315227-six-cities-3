import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import App from './app/app';
import { fetchOffersAction, fetchFavoritesAction } from './store/api-actions';
import { store } from './store';
import { checkAuthAction } from './store/api-actions';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(checkAuthAction());
store.dispatch(fetchOffersAction());
store.dispatch(fetchFavoritesAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </React.StrictMode>,
);
