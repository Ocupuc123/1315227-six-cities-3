import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { saveToken, dropToken, getToken } from '../services/token';
import { APIRoute, FavoriteStatus } from '../const';
import type { Offer, FullOffer } from '../types/offer';
import type { Comment } from '../types/comment';
import type { AuthData } from '../types/auth-data';
import type { AuthInfo, UserData } from '../types/user-data';
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
>('data/addComment', async ({ offerId, comment, rating }, { extra: api }) => {
  const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, {
    comment,
    rating,
  });
  return data;
});

export const fetchOfferAction = createAsyncThunk<
  { offer: FullOffer; nearby: Offer[]; comments: Comment[] },
  string,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('data/fetchOffer', async (offerId, { extra: api }) => {
  const [{ data: offer }, { data: nearby }, { data: comments }] =
    await Promise.all([
      api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`),
      api.get<Offer[]>(`${APIRoute.Offers}/${offerId}/nearby`),
      api.get<Comment[]>(`${APIRoute.Comments}/${offerId}`),
    ]);

  return { offer, nearby, comments };
});

export const fetchFavoritesAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchFavorites', async (_arg, { extra: api }) => {
  if (!getToken()) {
    return [];
  }

  const { data } = await api.get<Offer[]>(APIRoute.Favorite);
  return data;
});

export const fetchOffersAction = createAsyncThunk<
  Offer[],
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('data/fetchOffers', async (_arg, { extra: api }) => {
  const { data } = await api.get<Offer[]>(APIRoute.Offers);
  return data;
});

export const checkAuthAction = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { extra: api }) => {
  if (!getToken()) {
    throw new Error('No token');
  }

  const { data } = await api.get<AuthInfo>(APIRoute.Login);
  const { info } = splitAuthInfo(data);
  return info;
});

export const loginAction = createAsyncThunk<
  UserData,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<AuthInfo>(APIRoute.Login, {
    email,
    password,
  });
  const { token, info } = splitAuthInfo(data);
  saveToken(token);
  return info;
});

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { extra: api }) => {
  try {
    await api.delete(APIRoute.Logout);
  } finally {
    dropToken();
  }
});
