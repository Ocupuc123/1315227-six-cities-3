export const Cities = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type CityName = (typeof Cities)[number];

export enum FavoriteStatus {
  Removed = 0,
  Added = 1,
}

export enum SortType {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first'
}

export enum APIRoute {
  Offers = '/offers',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
  NotFound = '/404'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum CardType {
  City = 'city',
  Favorite = 'favorite',
  Near = 'near',
}

export enum ButtonType {
  PlaceCard = 'place-card',
  Offer = 'offer',
}
