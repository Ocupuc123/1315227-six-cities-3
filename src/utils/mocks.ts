import type { UserData } from '../types/user-data';
import type { AuthData } from '../types/auth-data';
import type { Offer, FullOffer } from '../types/offer';
import type { Comment, CommentData } from '../types/comment';
import { name, system, internet, random, datatype, date, lorem } from 'faker';

export const makeFakeCommentData = (): CommentData => ({
  offerId: crypto.randomUUID(),
  comment: lorem.sentence(),
  rating: datatype.number({ min: 1, max: 5 }),
});

export const makeFakeUserData = (): UserData => ({
  name: name.title(),
  avatarUrl: system.filePath(),
  isPro: true,
  email: internet.email(),
});

export const makeFakeAuthData = (): AuthData => ({
  email: internet.email(),
  password: internet.password(),
});

export const makeFullOffer = (): FullOffer => ({
  id: crypto.randomUUID(),
  title: lorem.sentence(),
  type: random.arrayElement(['apartment', 'house', 'room', 'hotel']),
  price: datatype.number({ min: 50, max: 1000 }),
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: datatype.number(10),
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: datatype.number(10),
  },
  isFavorite: datatype.boolean(),
  isPremium: datatype.boolean(),
  rating: datatype.float({ min: 1, max: 5, precision: 0.1 }),
  description: lorem.paragraph(),
  bedrooms: datatype.number({ min: 1, max: 5 }),
  goods: random.arrayElements(
    [
      'Heating',
      'Kitchen',
      'Cable TV',
      'Washing machine',
      'Coffee machine',
      'Dishwasher',
      'Wi-Fi',
      'Fridge',
    ],
    datatype.number({ min: 1, max: 5 }),
  ),
  host: {
    name: name.findName(),
    avatarUrl: internet.avatar(),
    isPro: datatype.boolean(),
  },
  images: [system.filePath()],
  maxAdults: datatype.number({ min: 1, max: 6 }),
});

export const makeFakeOffer = (): Offer => ({
  id: crypto.randomUUID(),
  title: name.title(),
  type: random.word(),
  price: datatype.number(),
  city: {
    name: 'Amsterdam',
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: datatype.number(10),
    },
  },
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: datatype.number(10),
  },
  isFavorite: false,
  isPremium: false,
  rating: datatype.number(5),
  previewImage: system.filePath(),
});

export const makeFakeComment = (): Comment => ({
  id: crypto.randomUUID(),
  date: date.future().toISOString(),
  user: {
    name: name.title(),
    avatarUrl: system.filePath(),
    isPro: false,
  },
  comment: lorem.sentence(),
  rating: datatype.number(5),
});
