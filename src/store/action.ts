import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import { type CityName, AuthorizationStatus } from '../const';
import type { UserData } from '../types/user-data';

export const changeCity = createAction<CityName>('app/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadFavorites = createAction<Offer[]>('data/loadFavorites');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const setUserData = createAction<UserData | null>('user/setUserData');
export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus',
);
