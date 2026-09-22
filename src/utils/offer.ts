import type { Offer } from '../types/offer';

export const getRatingStyle = (rating: number): string =>
  `${Math.round(rating) * 20}%`;

export const getCityData = (offers: Offer[], cityName: string) => {
  const cityOffers = offers.filter((o) => o.city.name === cityName);

  return {
    cityOffers,
    city: cityOffers[0]?.city,
  };
};
