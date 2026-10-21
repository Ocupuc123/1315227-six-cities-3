import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { createAPI } from '../../services/api';
import { APIRoute } from '../../const';
import {
  type AppThunkDispatch,
  extractActionsTypes,
  makeFakeAuthData,
  makeFakeStore,
  makeFakeUserData,
} from '../../utils/mocks';
import { afterLogin } from './after-login';
import {
  loginAction,
  fetchFavoritesAction,
  fetchOffersAction,
} from '../api-actions';
import type { State } from '../../types/state';

describe('Middleware: afterLogin', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios), afterLogin];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator(makeFakeStore());
    mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, []);
    mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, []);
  });

  afterEach(() => {
    mockAxiosAdapter.reset();
  });

  it('should dispatch "fetchFavoritesAction" and "fetchOffersAction" after "loginAction.fulfilled"', () => {
    store.dispatch(
      loginAction.fulfilled(makeFakeUserData(), '', makeFakeAuthData()),
    );

    expect(extractActionsTypes(store.getActions())).toEqual([
      fetchFavoritesAction.pending.type,
      fetchOffersAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('should not dispatch fetch actions on "loginAction.rejected"', () => {
    store.dispatch(loginAction.rejected(null, '', makeFakeAuthData()));

    expect(extractActionsTypes(store.getActions())).toEqual([
      loginAction.rejected.type,
    ]);
  });

  it('should not dispatch fetch actions on an unknown action', () => {
    store.dispatch({ type: 'UNKNOWN_ACTION' });

    expect(extractActionsTypes(store.getActions())).toEqual(['UNKNOWN_ACTION']);
  });
});
