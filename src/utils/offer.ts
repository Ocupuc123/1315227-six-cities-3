export const getRatingStyle = (rating: number): string =>
  `${Math.round(rating) * 20}%`;
