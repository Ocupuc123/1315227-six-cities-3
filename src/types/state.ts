import { store } from '../store/index';
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
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
