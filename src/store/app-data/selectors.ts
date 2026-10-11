import { createSelector } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { getActiveCity, getSortType } from '../app-process/selectors';
import { sortOffers } from '../../utils/offer';
import type { State } from '../../types/state';
import type { Offer, FullOffer } from '../../types/offer';
import type { Comment } from '../../types/comment';

export const getOffersListLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOffersListLoading;

export const getOfferDetailsLoadingStatus = (state: State): boolean =>
  state[NameSpace.Data].isOfferDetailsLoading;

export const getCommentSubmittingStatus = (state: State): boolean =>
  state[NameSpace.Data].isCommentSubmitting;

export const getOffersList = (state: State): Offer[] =>
  state[NameSpace.Data].offers;

export const getOfferDetails = (state: State): FullOffer | null =>
  state[NameSpace.Data].offer;

export const getOffersNearby = (state: State): Offer[] =>
  state[NameSpace.Data].offersNearby;

export const getComments = (state: State): Comment[] =>
  state[NameSpace.Data].comments;

export const getFavorites = (state: State): Offer[] =>
  state[NameSpace.Data].favorites;

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
