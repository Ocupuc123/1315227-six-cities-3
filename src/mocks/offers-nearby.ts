import type { Offer } from '../types/offer';

export const offersNearby: Offer[] = [
  {
    id: '6af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.35514938496378,
        longitude: 4.673877537499948,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.35514938496378,
      longitude: 4.673877537499948,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 4,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
  },
  {
    id: '5212101f-baab-4d7d-8029-35b3e24a4c7c',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'hotel',
    price: 403,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/6.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 51.225402,
        longitude: 6.776314,
        zoom: 13,
      },
    },
    location: {
      latitude: 51.225402,
      longitude: 6.784314,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 4.9,
  },
  {
    id: '62421a39-034a-49e2-ab0c-50aea4fd1606',
    title: 'The Pondhouse - A Magical Place',
    type: 'room',
    price: 179,
    previewImage: 'https://15.design.htmlacademy.pro/static/hotel/14.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.858610000000006,
      longitude: 2.330499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.6,
  },
];
