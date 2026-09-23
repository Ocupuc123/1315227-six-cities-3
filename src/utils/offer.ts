import type { Offer } from '../types/offer';
import { SortType } from '../const';

export const getRatingStyle = (rating: number): string =>
  `${Math.round(rating) * 20}%`;

const sortByPriceLowToHigh = (offers: Offer[]): Offer[] =>
  [...offers].sort((offerA, offerB) => offerA.price - offerB.price);
const sortByPriceHighToLow = (offers: Offer[]): Offer[] =>
  [...offers].sort((offerA, offerB) => offerB.price - offerA.price);
const sortByRating = (offers: Offer[]): Offer[] =>
  [...offers].sort((offerA, offerB) => offerB.rating - offerA.rating);

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  switch (sortType) {
    case SortType.PriceHighToLow:
      return sortByPriceHighToLow(offers);
    case SortType.PriceLowToHigh:
      return sortByPriceLowToHigh(offers);
    case SortType.TopRatedFirst:
      return sortByRating(offers);
    default:
      return offers;
  }
};
