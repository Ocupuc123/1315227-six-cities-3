import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createAPI } from '../services/api';
import * as tokenStorage from '../services/token';
import { APIRoute, NameSpace, FavoriteStatus } from '../const';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import {
  type AppThunkDispatch,
  extractActionsTypes,
  makeFakeOffer,
  makeFullOffer,
  makeFakeComment,
  makeFakeCommentData,
} from '../utils/mocks';
import {
  toggleFavoriteAction,
  addCommentAction,
  fetchOfferAction,
  fetchFavoritesAction,
  fetchOffersAction,
  checkAuthAction,
  loginAction,
  logoutAction,
} from './api-actions';
import type { State } from '../types/state';
import type { AuthData } from '../types/auth-data';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    State,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      [NameSpace.Data]: {
        offers: [],
        offer: null,
        offersNearby: [],
        comments: [],
        favorites: [],
        isOffersListLoading: false,
        isOfferDetailsLoading: false,
        isCommentSubmitting: false,
        hasError: false,
      },
    });
  });

  describe('checkAuthAction', () => {
    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(checkAuthAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkAuthAction.pending.type,
        checkAuthAction.rejected.type,
      ]);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async () => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOffersAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchedFulfilled.payload).toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Offers).reply(400);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('fetchOfferAction', () => {
    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.fulfilled", when server response 200', async () => {
      const mockOfferId = crypto.randomUUID();
      const mockOffer = {
        ...makeFullOffer(),
        id: mockOfferId,
      };
      const mockNearby = [makeFakeOffer()];
      const mockComments = [makeFakeComment()];

      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}`)
        .reply(200, mockOffer);
      mockAxiosAdapter
        .onGet(`${APIRoute.Offers}/${mockOfferId}/nearby`)
        .reply(200, mockNearby);
      mockAxiosAdapter
        .onGet(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockComments);

      await store.dispatch(fetchOfferAction(mockOfferId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchOfferAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.fulfilled.type,
      ]);

      expect(fetchedFulfilled.payload).toEqual({
        offer: mockOffer,
        nearby: mockNearby,
        comments: mockComments,
      });
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      const mockOfferId = crypto.randomUUID();
      mockAxiosAdapter.onGet(`${APIRoute.Offers}/${mockOfferId}`).reply(400);

      await store.dispatch(fetchOfferAction(mockOfferId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferAction.pending.type,
        fetchOfferAction.rejected.type,
      ]);
    });
  });

  describe('fetchFavoritesAction', () => {
    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.fulfilled", when server response 200', async () => {
      const mockFavorites = [makeFakeOffer()];

      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, mockFavorites);
      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('secret');

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);

      expect(fetchedFulfilled.payload).toEqual(mockFavorites);
    });

    it('should return empty array without request when there is no token', async () => {
      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('');

      await store.dispatch(fetchFavoritesAction());

      const emittedActions = store.getActions();
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof fetchFavoritesAction.fulfilled
      >;

      expect(extractActionsTypes(emittedActions)).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.fulfilled.type,
      ]);
      expect(fetchedFulfilled.payload).toEqual([]);
    });

    it('should dispatch "fetchFavoritesAction.pending", "fetchFavoritesAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(400);
      vi.spyOn(tokenStorage, 'getToken').mockReturnValue('secret');

      await store.dispatch(fetchFavoritesAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchFavoritesAction.pending.type,
        fetchFavoritesAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "addCommentAction.pending", "addCommentAction.fulfilled", when server response 200', async () => {
      const mockOfferId = crypto.randomUUID();
      const mockComment = {
        ...makeFakeComment(),
        id: mockOfferId,
      };
      const mockCommentData = {
        ...makeFakeCommentData(),
        offerId: mockOfferId,
      };

      mockAxiosAdapter
        .onPost(`${APIRoute.Comments}/${mockOfferId}`)
        .reply(200, mockComment);

      await store.dispatch(addCommentAction(mockCommentData));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof addCommentAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);

      expect(fetchedFulfilled.payload).toEqual(mockComment);
    });

    it('should dispatch "addCommentAction.pending", "addCommentAction.rejected" when server response 400', async () => {
      const mockOfferId = crypto.randomUUID();
      const mockCommentData = {
        ...makeFakeCommentData(),
        offerId: mockOfferId,
      };

      mockAxiosAdapter.onPost(`${APIRoute.Comments}/${mockOfferId}`).reply(400);

      await store.dispatch(addCommentAction(mockCommentData));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "loginAction.fulfilled" when server response 200', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = { token: 'secret' };
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });
  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('toggleFavoriteAction', () => {
    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.fulfilled", when server response 200', async () => {
      const mockOfferId = crypto.randomUUID();
      const mockOffer = {
        ...makeFakeOffer(),
        id: mockOfferId,
        isFavorite: true,
      };

      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${mockOfferId}/${FavoriteStatus.Added}`)
        .reply(200, mockOffer);

      await store.dispatch(
        toggleFavoriteAction({
          offerId: mockOfferId,
          status: FavoriteStatus.Added,
        }),
      );

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchedFulfilled = emittedActions.at(1) as ReturnType<
        typeof toggleFavoriteAction.fulfilled
      >;

      expect(extractedActionsTypes).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.fulfilled.type,
      ]);

      expect(fetchedFulfilled.payload).toEqual(mockOffer);
    });

    it('should dispatch "toggleFavoriteAction.pending", "toggleFavoriteAction.rejected" when server response 400', async () => {
      const mockOfferId = crypto.randomUUID();

      mockAxiosAdapter
        .onPost(`${APIRoute.Favorite}/${mockOfferId}/${FavoriteStatus.Added}`)
        .reply(400);

      await store.dispatch(
        toggleFavoriteAction({
          offerId: mockOfferId,
          status: FavoriteStatus.Added,
        }),
      );

      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        toggleFavoriteAction.pending.type,
        toggleFavoriteAction.rejected.type,
      ]);
    });
  });
});
