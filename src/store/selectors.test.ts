import { NameSpace, SortType, type CityName } from '../const';
import { makeFakeOffer, makeFullOffer, makeFakeComment } from '../utils/mocks';
import {
  getFavoritesCount,
  getIsFavoritesEmpty,
  getFilteredOffers,
  getSortedOffers,
} from './selectors';

describe('Store selectors', () => {
  const mockOffer = makeFakeOffer();
  const mockFullOffer = makeFullOffer();
  const mockComment = makeFakeComment();

  const amsterdamOffer = {
    ...mockOffer,
    city: {
      ...mockOffer.city,
      name: 'Amsterdam' as CityName,
    },
    price: 100,
    rating: 1,
  };

  const parisOffer = {
    ...mockOffer,
    city: {
      ...mockOffer.city,
      name: 'Paris' as CityName,
    },
    price: 200,
    rating: 2,
  };

  const cologneOffer = {
    ...mockOffer,
    city: {
      ...mockOffer.city,
      name: 'Cologne' as CityName,
    },
    price: 300,
    rating: 3,
  };

  const allInAmsterdam = [amsterdamOffer, parisOffer, cologneOffer].map(
    (offer) => ({
      ...offer,
      city: { ...offer.city, name: 'Amsterdam' as CityName },
    }),
  );

  const state = {
    [NameSpace.Data]: {
      offers: [amsterdamOffer, parisOffer, cologneOffer],
      offer: mockFullOffer,
      offersNearby: [mockOffer],
      comments: [mockComment],
      favorites: [mockOffer, mockOffer],
      isOffersListLoading: false,
      isOfferDetailsLoading: false,
      isCommentSubmitting: false,
      hasError: false,
    },
    [NameSpace.App]: {
      activeCity: 'Amsterdam' as CityName,
      sortType: SortType.Popular,
    },
  };

  it('should return favorites count', () => {
    const result = getFavoritesCount(state);
    expect(result).toBe(2);
  });

  it('should return "false" if favorites are not empty', () => {
    const result = getIsFavoritesEmpty(state);
    expect(result).toBe(false);
  });

  it('should return true if favorites are empty', () => {
    const emptyFavoritesState = {
      [NameSpace.Data]: {
        ...state[NameSpace.Data],
        favorites: [],
      },
    };
    const result = getIsFavoritesEmpty(emptyFavoritesState);
    expect(result).toBe(true);
  });

  it('should return offers filtered by active city', () => {
    const result = getFilteredOffers(state);
    expect(result).toEqual([amsterdamOffer]);
  });

  it('should return offers sorted by price low to high', () => {
    const sortedState = {
      ...state,
      [NameSpace.Data]: {
        ...state[NameSpace.Data],
        offers: allInAmsterdam,
      },
      [NameSpace.App]: {
        ...state[NameSpace.App],
        sortType: SortType.PriceLowToHigh,
      },
    };

    const result = getSortedOffers(sortedState);
    expect(result.map((offer) => offer.price)).toEqual([100, 200, 300]);
  });

  it('should return offers sorted by price high to low', () => {
    const sortedState = {
      ...state,
      [NameSpace.Data]: {
        ...state[NameSpace.Data],
        offers: allInAmsterdam,
      },
      [NameSpace.App]: {
        ...state[NameSpace.App],
        sortType: SortType.PriceHighToLow,
      },
    };

    const result = getSortedOffers(sortedState);
    expect(result.map((offer) => offer.price)).toEqual([300, 200, 100]);
  });

  it('should return offers sorted by rating', () => {
    const sortedState = {
      ...state,
      [NameSpace.Data]: {
        ...state[NameSpace.Data],
        offers: allInAmsterdam,
      },
      [NameSpace.App]: {
        ...state[NameSpace.App],
        sortType: SortType.TopRatedFirst,
      },
    };

    const result = getSortedOffers(sortedState);
    expect(result.map((offer) => offer.rating)).toEqual([3, 2, 1]);
  });
});
