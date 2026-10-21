import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import type { AppData } from '../../types/state';
import { resetFavorite } from '../../utils/common';
import {
  toggleFavoriteAction,
  addCommentAction,
  fetchOfferAction,
  fetchFavoritesAction,
  fetchOffersAction,
} from '../api-actions';

const initialState: AppData = {
  offers: [],
  offer: null,
  offersNearby: [],
  comments: [],
  favorites: [],
  isOffersListLoading: false,
  isOfferDetailsLoading: false,
  isCommentSubmitting: false,
  hasError: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    clearOffer(state) {
      state.offer = null;
      state.offersNearby = [];
      state.comments = [];
    },
    clearFavorites(state) {
      state.favorites = [];
      resetFavorite(state.offers);
      resetFavorite(state.offersNearby);

      if (state.offer) {
        state.offer.isFavorite = false;
      }
    },
  },
  extraReducers(builder) {
    builder
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
      .addCase(addCommentAction.pending, (state) => {
        state.isCommentSubmitting = true;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.isCommentSubmitting = false;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.comments.push(action.payload);
        state.isCommentSubmitting = false;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDetailsLoading = true;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDetailsLoading = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload.offer;
        state.offersNearby = action.payload.nearby;
        state.comments = action.payload.comments;
        state.isOfferDetailsLoading = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersListLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersListLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersListLoading = false;
      });
  },
});

export const { clearOffer, clearFavorites } = appData.actions;
