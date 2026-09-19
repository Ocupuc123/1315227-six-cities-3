import type { User } from './user';

export type Comment = {
  id: string;
  date: string;
  user: User;
  comment: string;
  rating: number;
};
