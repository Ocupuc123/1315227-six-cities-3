import { createAction } from '@reduxjs/toolkit';
import type { Offer, FullOffer } from '../types/offer';
import type { Comment } from '../types/comment';
import { type CityName, AuthorizationStatus } from '../const';
import type { UserData } from '../types/user-data';

export const changeCity = createAction<CityName>('app/changeCity');
export const loadOffers = createAction<Offer[]>('data/loadOffers');
export const loadOffer = createAction<FullOffer>('data/loadOffer');
export const clearOffer = createAction('data/clearOffer');
export const loadOffersNearby = createAction<Offer[]>('data/loadOffersNearby');
export const loadComments = createAction<Comment[]>('data/loadComments');
export const loadFavorites = createAction<Offer[]>('data/loadFavorites');
export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization',
);
export const setUserData = createAction<UserData>('user/setUserData');
export const resetUser = createAction('user/resetUser');
export const setOffersDataLoadingStatus = createAction<boolean>(
  'data/setOffersDataLoadingStatus',
);
export const setOfferLoadingStatus = createAction<boolean>(
  'data/setOfferLoadingStatus',
);
export const setCommentSubmittingStatus = createAction<boolean>(
  'data/setCommentSubmittingStatus',
);
