import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ButtonType,
  AppRoute,
  AuthorizationStatus,
  FavoriteStatus,
} from '../../const';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { toggleFavoriteAction } from '../../store/api-actions';
import { toast } from 'react-toastify';

const MESSAGE_ADDED_FAVORITE = 'Added to favorites';
const MESSAGE_REMOVED_FAVORITE = 'Removed from favorites';
const MESSAGE_FAILED_FAVORITE = 'Failed to update favorites';

const PLACE_CARD_ICON_SIZE = {
  width: 18,
  height: 19,
};

const OFFER_ICON_SIZE = {
  width: 31,
  height: 33,
};

const IconSize = {
  [ButtonType.Offer]: OFFER_ICON_SIZE,
  [ButtonType.PlaceCard]: PLACE_CARD_ICON_SIZE,
} as const;

type BookmarkButtonProps = {
  isFavorite: boolean;
  buttonType?: ButtonType;
  offerId: string;
};

function BookmarkButton({
  isFavorite,
  buttonType = ButtonType.PlaceCard,
  offerId,
}: BookmarkButtonProps): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }

    const nextStatus = isFavorite
      ? FavoriteStatus.Removed
      : FavoriteStatus.Added;

    dispatch(toggleFavoriteAction({ offerId, status: nextStatus }))
      .unwrap()
      .then(() => {
        toast.success(
          nextStatus === FavoriteStatus.Added
            ? MESSAGE_ADDED_FAVORITE
            : MESSAGE_REMOVED_FAVORITE,
        );
      })
      .catch(() => {
        toast.error(MESSAGE_FAILED_FAVORITE);
      });
  };

  return (
    <button
      className={`${buttonType}__bookmark-button button ${isFavorite ? `${buttonType}__bookmark-button--active` : ''}`}
      type="button"
      onClick={handleButtonClick}
    >
      <svg
        className={`${buttonType}__bookmark-icon`}
        width={IconSize[buttonType].width}
        height={IconSize[buttonType].height}
      >
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In bookmarks' : 'To bookmarks'}
      </span>
    </button>
  );
}

export default BookmarkButton;
