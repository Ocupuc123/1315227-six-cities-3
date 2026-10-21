import type { ThunkDispatch } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';
import type { AxiosInstance } from 'axios';
import { rootReducer } from '../store/root-reducer';
import { AuthorizationStatus, type CityName, type SortType } from '../const';
import type { UserData } from './user-data';
import type { Offer, FullOffer } from './offer';
import type { Comment } from './comment';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userData: UserData | null;
};

export type AppProcess = {
  activeCity: CityName;
  sortType: SortType;
};

export type AppData = {
  offers: Offer[];
  offer: FullOffer | null;
  offersNearby: Offer[];
  comments: Comment[];
  favorites: Offer[];
  isOffersListLoading: boolean;
  isOfferDetailsLoading: boolean;
  isCommentSubmitting: boolean;
  hasError: boolean;
};

export type State = ReturnType<typeof rootReducer>;

export type AppDispatch = ThunkDispatch<State, AxiosInstance, AnyAction>;
