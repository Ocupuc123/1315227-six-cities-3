import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  loadFavorites,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setUserData,
} from './action';
import type { Offer } from '../types/offer';
import type { UserData } from '../types/user-data';
import { type CityName, AuthorizationStatus } from '../const';

const DEFAULT_CITY = 'Paris';

type State = {
  activeCity: CityName;
  offers: Offer[];
  favorites: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  userData: UserData | null;
};

const initialState: State = {
  activeCity: DEFAULT_CITY,
  offers: [],
  favorites: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  userData: null,
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    });
});
