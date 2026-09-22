import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, loadFavorites } from './action';
import type { Offer } from '../types/offer';
import { DEFAULT_CITY, type CityName } from '../const';

type State = {
  activeCity: CityName;
  offers: Offer[];
  favorites: Offer[];
};

const initialState: State = {
  activeCity: DEFAULT_CITY,
  offers: [],
  favorites: [],
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
    });
});
