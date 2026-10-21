import { AnyAction, Middleware } from 'redux';
import type { AppDispatch, State } from '../../types/state';
import {
  fetchFavoritesAction,
  fetchOffersAction,
  loginAction,
} from '../api-actions';

export const afterLogin: Middleware<unknown, State, AppDispatch> =
  (store) => (next) => (action: AnyAction) => {
    if (loginAction.fulfilled.match(action)) {
      store.dispatch(fetchFavoritesAction());
      store.dispatch(fetchOffersAction());
    }

    return next(action);
  };
