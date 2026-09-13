import type { Comment } from '../types/comment';

export const comments: Comment[] = [
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b62a',
    date: '2026-02-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: true,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 4.3,
  },
  {
    id: 'b67ddfd5-b953-4a30-8c8d-bd083cd6b63b',
    date: '2019-05-08T14:13:56.569Z',
    user: {
      name: 'Oliver Conner',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false,
    },
    comment:
      'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    rating: 2,
  },
];
