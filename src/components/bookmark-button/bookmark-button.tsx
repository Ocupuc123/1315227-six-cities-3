import { ButtonType } from '../../const';

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
  buttonType?: ButtonType;
  isFavorite: boolean;
};

function BookmarkButton({
  isFavorite,
  buttonType = ButtonType.PlaceCard,
}: BookmarkButtonProps): JSX.Element {
  return (
    <button
      className={`${buttonType}__bookmark-button button ${isFavorite ? `${buttonType}__bookmark-button--active` : ''}`}
      type="button"
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
