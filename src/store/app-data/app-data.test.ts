import { appData } from './app-data';
import {
  fetchOffersAction,
  fetchOfferAction,
  toggleFavoriteAction,
  addCommentAction,
  fetchFavoritesAction,
} from '../api-actions';
import {
  makeFakeOffer,
  makeFullOffer,
  makeFakeComment,
  makeFakeCommentData,
} from '../../utils/mocks';

describe('AppData Slice', () => {
  const mockOffer = makeFakeOffer();
  const mockComment = makeFakeComment();
  const mockFullOffer = makeFullOffer();
  const mockOfferId = crypto.randomUUID();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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

    const result = appData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
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

    const result = appData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersListLoading" to "true", "hasError" to "false" with "fetchOffersAction.pending" action', () => {
    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [],
      isOffersListLoading: true,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(expectedState, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersListLoading" to "false", "hasError" to "true" with "fetchOffersAction.rejected" action', () => {
    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: true,
    };

    const result = appData.reducer(expectedState, fetchOffersAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "isOffersListLoading" to "false" with "fetchOffersAction.fulfilled" action', () => {
    const expectedState = {
      offers: [mockOffer],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      undefined,
      fetchOffersAction.fulfilled([mockOffer], '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDetailsLoading" to "true" with "fetchOfferAction.pending" action', () => {
    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: true,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(undefined, fetchOfferAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferDetailsLoading" to "false" with "fetchOfferAction.rejected" action', () => {
    const expectedState = {
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

    const result = appData.reducer(undefined, fetchOfferAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to object with offer, "offersNearby" to array with offer nearby, "comments" to array with comment, "isOfferDetailsLoading" to "false" with "fetchOfferAction.fulfilled" action', () => {
    const expectedState = {
      offers: [],
      offer: mockFullOffer,
      offersNearby: [mockOffer],
      comments: [mockComment],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      undefined,
      fetchOfferAction.fulfilled(
        {
          offer: mockFullOffer,
          nearby: [mockOffer],
          comments: [mockComment],
        },
        '',
        mockOfferId,
      ),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavorite" to "true" in "offer", "offers" and "offersNearby", add offer to "favorites" with "toggleFavoriteAction.fulfilled" action', () => {
    const initialOffer = {
      ...mockOffer,
      id: mockOfferId,
      isFavorite: false,
    };

    const initialFullOffer = {
      ...mockFullOffer,
      id: mockOfferId,
      isFavorite: false,
    };

    const updateOffer = { ...initialOffer, isFavorite: true };

    const initialState = {
      offers: [initialOffer],
      offer: initialFullOffer,
      offersNearby: [initialOffer],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const expectedState = {
      offers: [updateOffer],
      offer: {
        ...initialFullOffer,
        isFavorite: true,
      },
      offersNearby: [updateOffer],
      comments: [],
      favorites: [updateOffer],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      initialState,
      toggleFavoriteAction.fulfilled(updateOffer, '', {
        offerId: mockOfferId,
        status: 1,
      }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavorite" to "false" in "offer", "offers" and "offersNearby", and remove offer from "favorites" with "toggleFavoriteAction.fulfilled" action', () => {
    const initialOffer = {
      ...mockOffer,
      id: mockOfferId,
      isFavorite: true,
    };

    const initialFullOffer = {
      ...mockFullOffer,
      id: mockOfferId,
      isFavorite: true,
    };

    const updateOffer = { ...initialOffer, isFavorite: false };

    const initialState = {
      offers: [initialOffer],
      offer: initialFullOffer,
      offersNearby: [initialOffer],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const expectedState = {
      offers: [updateOffer],
      offer: {
        ...initialFullOffer,
        isFavorite: false,
      },
      offersNearby: [updateOffer],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      initialState,
      toggleFavoriteAction.fulfilled(updateOffer, '', {
        offerId: mockOfferId,
        status: 0,
      }),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSubmitting" to "true" with "addCommentAction.pending" action', () => {
    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: true,
      hasError: false,
    };

    const result = appData.reducer(undefined, addCommentAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "isCommentSubmitting" to "false" with "addCommentAction.rejected" action', () => {
    const expectedState = {
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

    const result = appData.reducer(undefined, addCommentAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "comments" to array with comment, "isCommentSubmitting" to "false" with "addCommentAction.fulfilled" action', () => {
    const mockCommentData = makeFakeCommentData();

    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [mockComment],
      favorites: [],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      undefined,
      addCommentAction.fulfilled(mockComment, '', mockCommentData),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "favorites" to array with favorite with "fetchFavoritesAction.fulfilled" action', () => {
    const expectedState = {
      offers: [],
      offer: null,
      offersNearby: [],
      comments: [],
      favorites: [mockOffer],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    };

    const result = appData.reducer(
      undefined,
      fetchFavoritesAction.fulfilled([mockOffer], '', undefined),
    );

    expect(result).toEqual(expectedState);
  });
});
