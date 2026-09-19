import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import type { Offer } from '../../types/offer';
import { CardType } from '../../const';
import { capitalizeString } from '../../utils/common';
import { getRatingStyle } from '../../utils/offer';
import BookmarkButton from '../bookmark-button/bookmark-button';

const DEFAULT_IMAGE_SIZE = {
  width: 260,
  height: 200,
};

const FAVORITE_IMAGE_SIZE = {
  width: 150,
  height: 110,
};

const CardWrapper = {
  [CardType.City]: 'cities',
  [CardType.Favorite]: 'favorites',
  [CardType.Near]: 'near-places',
} as const;

const ImageSize = {
  [CardType.City]: DEFAULT_IMAGE_SIZE,
  [CardType.Favorite]: FAVORITE_IMAGE_SIZE,
  [CardType.Near]: DEFAULT_IMAGE_SIZE,
} as const;

type PlaceCardProps = {
  offer: Offer;
  onCardHover?: (id: string | null) => void;
  cardType?: CardType;
};

function PlaceCard({
  offer,
  onCardHover,
  cardType = CardType.City,
}: PlaceCardProps): JSX.Element | null {
  if (!offer) {
    return null;
  }

  const {
    id,
    title,
    type,
    price,
    previewImage,
    isFavorite,
    isPremium,
    rating,
  } = offer;

  const handleCardHover = (evt: MouseEvent<HTMLLIElement>) => {
    evt.preventDefault();
    onCardHover?.(id);
  };

  const handleCardLeave = () => {
    onCardHover?.(null);
  };

  return (
    <article
      className={`${CardWrapper[cardType]}__card place-card`}
      onMouseEnter={handleCardHover}
      onMouseLeave={handleCardLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div
        className={`${CardWrapper[cardType]}__image-wrapper place-card__image-wrapper`}
      >
        <Link to={`/offer/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={ImageSize[cardType].width}
            height={ImageSize[cardType].height}
            alt={title}
          />
        </Link>
      </div>
      <div
        className={`${cardType === CardType.Favorite ? 'favorites__card-info' : ''} place-card__info`}
      >
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/&nbsp;night</span>
          </div>
          <BookmarkButton isFavorite={isFavorite} />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: getRatingStyle(rating) }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeString(type)}</p>
      </div>
    </article>
  );
}

export default PlaceCard;
