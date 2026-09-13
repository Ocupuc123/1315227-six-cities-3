import type { CityName } from '../const';

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type City = {
  name: CityName;
  location: Location;
};

export type Host = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
};

export type OfferBase = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: City;
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
};

export type Offer = OfferBase & {
  previewImage: string;
};

export type FullOffer = OfferBase & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: Host;
  images: string[];
  maxAdults: number;
};
