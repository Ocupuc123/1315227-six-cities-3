import { createAction } from '@reduxjs/toolkit';
import type { Offer } from '../types/offer';
import type { CityName } from '../const';

export const changeCity = createAction<CityName>('city/changeCity');
export const loadOffers = createAction<Offer[]>('offers/loadOffers');
export const loadFavorites = createAction<Offer[]>('favorites/loadFavorites');
