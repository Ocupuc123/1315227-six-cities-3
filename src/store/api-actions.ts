import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import {
  loadOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setUserData
} from './action';
import { saveToken, dropToken, getToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import type { Offer } from '../types/offer';
import type { AuthData } from '../types/auth-data';
import type { AuthInfo } from '../types/user-data';
import { splitAuthInfo } from '../utils/common';

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
    const {info} = splitAuthInfo(data);

    dispatch(setUserData(info));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  } catch {
    dropToken();
    dispatch(setUserData(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
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
  const {token, info} = splitAuthInfo(data);

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
  dispatch(setUserData(null));
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
