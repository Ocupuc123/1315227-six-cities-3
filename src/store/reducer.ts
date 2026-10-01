import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadOffers,
  loadOffer,
  clearOffer,
  loadOffersNearby,
  loadComments,
  loadFavorites,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setOfferLoadingStatus,
  setCommentSubmittingStatus,
  setUserData,
  resetUser,
} from './action';
import { toggleFavoriteAction, addCommentAction } from './api-actions';
import type { Offer, FullOffer } from '../types/offer';
import type { Comment } from '../types/comment';
import type { UserData } from '../types/user-data';
import { type CityName, AuthorizationStatus } from '../const';

const DEFAULT_CITY = 'Paris';

type AppState = {
  activeCity: CityName;
  offers: Offer[];
  offer: FullOffer | null;
  offersNearby: Offer[];
  comments: Comment[];
  favorites: Offer[];
  authorizationStatus: AuthorizationStatus;
  error: string | null;
  isOffersDataLoading: boolean;
  isOfferLoading: boolean;
  isCommentSubmitting: boolean;
  userData: UserData | null;
};

const initialState: AppState = {
  activeCity: DEFAULT_CITY,
  offers: [],
  offer: null,
  offersNearby: [],
  comments: [],
  favorites: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  isOfferLoading: false,
  isCommentSubmitting: false,
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(clearOffer, (state) => {
      state.offer = null;
      state.offersNearby = [];
      state.comments = [];
    })
    .addCase(loadOffersNearby, (state, action) => {
      state.offersNearby = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(addCommentAction.fulfilled, (state, action) => {
      state.comments.push(action.payload);
    })
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const updated = action.payload;

      if (state.offer && state.offer.id === updated.id) {
        state.offer.isFavorite = updated.isFavorite;
      }

      for (const list of [state.offers, state.offersNearby]) {
        const offer = list.find((item) => item.id === updated.id);

        if (offer) {
          offer.isFavorite = updated.isFavorite;
        }
      }

      state.favorites = state.favorites.filter(
        (offer) => offer.id !== updated.id,
      );

      if (updated.isFavorite) {
        state.favorites.push(updated);
      }
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setCommentSubmittingStatus, (state, action) => {
      state.isCommentSubmitting = action.payload;
    })
    .addCase(setOfferLoadingStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(resetUser, (state) => {
      state.userData = null;
      state.authorizationStatus = AuthorizationStatus.NoAuth;
    });
});
