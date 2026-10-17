import { createSelector } from '@reduxjs/toolkit';
import { getActiveCity, getSortType } from './app-process/selectors';
import { getOffersList, getFavorites } from './app-data/selectors';
import { sortOffers } from '../utils/offer';

export const getFavoritesCount = createSelector(
  [getFavorites],
  (favorites) => favorites.length,
);

export const getIsFavoritesEmpty = createSelector(
  [getFavorites],
  (favorites) => favorites.length === 0,
);

export const getFilteredOffers = createSelector(
  [getOffersList, getActiveCity],
  (offers, activeCity) =>
    offers.filter((offer) => offer.city.name === activeCity),
);

export const getSortedOffers = createSelector(
  [getFilteredOffers, getSortType],
  (offers, sortType) => sortOffers(offers, sortType),
);
