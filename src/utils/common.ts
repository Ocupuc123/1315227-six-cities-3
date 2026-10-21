import type { AuthInfo, UserData } from '../types/user-data';
import { type CityName, Cities } from '../const';
import type { Offer } from '../types/offer';

type AuthPayload = {
  token: string;
  info: UserData;
};

export const capitalizeString = (stringName: string): string =>
  stringName.charAt(0).toUpperCase() + stringName.slice(1);

export const splitAuthInfo = (data: AuthInfo): AuthPayload => {
  const { token, ...userData } = data;
  return {
    token,
    info: userData,
  };
};

export const getRandomCity = (): CityName =>
  Cities[Math.floor(Math.random() * Cities.length)];

export const resetFavorite = (offers: Offer[]) => {
  for (const offer of offers) {
    offer.isFavorite = false;
  }
};
