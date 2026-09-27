import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  loadFavorites,
  requireAuthorization,
  setError,
  setOffersDataLoadingStatus
} from './action';
import type { Offer } from '../types/offer';
import { type CityName, AuthorizationStatus } from '../const';

const DEFAULT_CITY = 'Paris';

type State = {
  activeCity: CityName;
  offers: Offer[];
  favorites: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
};

const initialState: State = {
  activeCity: DEFAULT_CITY,
  offers: [],
  favorites: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});
