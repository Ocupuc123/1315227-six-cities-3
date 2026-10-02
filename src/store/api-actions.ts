import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import {
  loadOffers,
  loadOffer,
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
import { saveToken, dropToken, getToken } from '../services/token';
import { APIRoute, AuthorizationStatus, FavoriteStatus } from '../const';
import type { Offer, FullOffer } from '../types/offer';
import type { Comment } from '../types/comment';
import type { AuthData } from '../types/auth-data';
import type { AuthInfo } from '../types/user-data';
import { splitAuthInfo } from '../utils/common';

export const toggleFavoriteAction = createAsyncThunk<
  Offer,
  { offerId: string; status: FavoriteStatus.Removed | FavoriteStatus.Added },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/changeFavoriteStatus', async ({ offerId, status }, { extra: api }) => {
  const { data } = await api.post<Offer>(
    `${APIRoute.Favorite}/${offerId}/${status}`,
  );
  return data;
});

export const addCommentAction = createAsyncThunk<
  Comment,
  { offerId: string; comment: string; rating: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'data/addComment',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    dispatch(setCommentSubmittingStatus(true));
    try {
      const { data } = await api.post<Comment>(
        `${APIRoute.Comments}/${offerId}`,
        {
          comment,
          rating,
        },
      );
      return data;
    } finally {
      dispatch(setCommentSubmittingStatus(false));
    }
  },
);

export const fetchOfferAction = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchOffer', async (offerId, { dispatch, extra: api }) => {
  dispatch(setOfferLoadingStatus(true));
  try {
    const [{ data: offer }, { data: nearby }, { data: comments }] =
      await Promise.all([
        api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`),
        api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`),
        api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`),
      ]);

    dispatch(loadOffer(offer));
    dispatch(loadOffersNearby(nearby));
    dispatch(loadComments(comments));
  } finally {
    dispatch(setOfferLoadingStatus(false));
  }
});

export const fetchFavoritesAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { dispatch, extra: api }) => {
  if (!getToken()) {
    return;
  }

  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  dispatch(loadFavorites(data));
});

export const fetchOffersAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { dispatch, extra: api }) => {
  dispatch(setOffersDataLoadingStatus(true));
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  dispatch(setOffersDataLoadingStatus(false));
  dispatch(loadOffers(data));
});

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  if (!getToken()) {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    return;
  }

  try {
    const { data } = await api.get<AuthInfo>(APIRoute.Login);
    const { info } = splitAuthInfo(data);

    dispatch(setUserData(info));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dropToken();
    dispatch(resetUser());
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<AuthInfo>(APIRoute.Login, {
    email,
    password,
  });
  const { token, info } = splitAuthInfo(data);

  saveToken(token);
  dispatch(setUserData(info));
  dispatch(requireAuthorization(AuthorizationStatus.Auth));
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(resetUser());
});
