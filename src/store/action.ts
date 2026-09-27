import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import { type CityName, AuthorizationStatus } from '../const';

export const changeCity = createAction<CityName>('app/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadFavorites = createAction<Offer[]>('data/loadFavorites');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const setError = createAction<string | null>('app/setError');
export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus',
);
