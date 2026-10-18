import { NameSpace } from '../../const';
import type { State } from '../../types/state';
import type { Offer, FullOffer } from '../../types/offer';
import type { Comment } from '../../types/comment';

export const getOffersListLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isOffersListLoading;

export const getOfferDetailsLoadingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isOfferDetailsLoading;

export const getCommentSubmittingStatus = (state: Pick<State, NameSpace.Data>): boolean =>
  state[NameSpace.Data].isCommentSubmitting;

export const getOffersList = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].offers;

export const getOfferDetails = (state: Pick<State, NameSpace.Data>): FullOffer | null =>
  state[NameSpace.Data].offer;

export const getOffersNearby = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].offersNearby;

export const getComments = (state: Pick<State, NameSpace.Data>): Comment[] =>
  state[NameSpace.Data].comments;

export const getFavorites = (state: Pick<State, NameSpace.Data>): Offer[] =>
  state[NameSpace.Data].favorites;

export const getErrorStatus = (state: Pick<State, NameSpace.Data>): boolean => state[NameSpace.Data].hasError;
