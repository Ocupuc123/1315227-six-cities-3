import { NameSpace } from '../../const';
import { makeFakeOffer, makeFullOffer, makeFakeComment } from '../../utils/mocks';
import {
  getOffersListLoadingStatus,
  getOfferDetailsLoadingStatus,
  getCommentSubmittingStatus,
  getOffersList,
  getOfferDetails,
  getOffersNearby,
  getComments,
  getFavorites,
  getErrorStatus,
} from './selectors';

describe('AppData selectors', () => {
  const mockOffer = makeFakeOffer();
  const mockFullOffer = makeFullOffer();
  const mockComment = makeFakeComment();

  const state = {
    [NameSpace.Data]: {
      offers: [mockOffer],
      offer: mockFullOffer,
      offersNearby: [mockOffer],
      comments: [mockComment],
      favorites: [mockOffer],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    },
  };

  it('should return offers list data loading status', () => {
    const { isOffersListLoading } = state[NameSpace.Data];
    const result = getOffersListLoadingStatus(state);
    expect(result).toBe(isOffersListLoading);
  });

  it('should return offer details data loading status', () => {
    const { isOfferDetailsLoading } = state[NameSpace.Data];
    const result = getOfferDetailsLoadingStatus(state);
    expect(result).toBe(isOfferDetailsLoading);
  });

  it('should return comment submitting status', () => {
    const { isCommentSubmitting } = state[NameSpace.Data];
    const result = getCommentSubmittingStatus(state);
    expect(result).toBe(isCommentSubmitting);
  });

  it('should return error status', () => {
    const { hasError } = state[NameSpace.Data];
    const result = getErrorStatus(state);
    expect(result).toBe(hasError);
  });

  it('should return offers list from state', () => {
    const { offers } = state[NameSpace.Data];
    const result = getOffersList(state);
    expect(result).toEqual(offers);
  });

  it('should return offer details from state', () => {
    const { offer } = state[NameSpace.Data];
    const result = getOfferDetails(state);
    expect(result).toEqual(offer);
  });

  it('should return offers nearby from state', () => {
    const { offersNearby } = state[NameSpace.Data];
    const result = getOffersNearby(state);
    expect(result).toEqual(offersNearby);
  });

  it('should return comments from state', () => {
    const { comments } = state[NameSpace.Data];
    const result = getComments(state);
    expect(result).toEqual(comments);
  });

  it('should return favorites from state', () => {
    const { favorites } = state[NameSpace.Data];
    const result = getFavorites(state);
    expect(result).toEqual(favorites);
  });
});
