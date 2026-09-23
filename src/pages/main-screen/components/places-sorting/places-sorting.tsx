import { useState } from 'react';
import { SortType } from '../../../../const';

type PlacesSortingProps = {
  currentSortType: SortType;
  onSortChange: (type: SortType) => void;
};

function PlacesSorting({
  currentSortType,
  onSortChange,
}: PlacesSortingProps): JSX.Element {
  const [isOpenMenu, setOpenMenu] = useState<boolean>(false);

  const sortTypes = Object.values(SortType);

  const handleSortOptionClick = (sortType: SortType) => {
    if (currentSortType !== sortType) {
      onSortChange(sortType);
    }
    setOpenMenu(false);
  };

  const handleSortMenuClick = () => {
    setOpenMenu((prevIsOpen) => !prevIsOpen);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleSortMenuClick}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width={7} height={4}>
          <use xlinkHref="#icon-arrow-select" />
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${isOpenMenu ? 'places__options--opened' : ''}`}
      >
        {sortTypes.map((sortType) => (
          <li
            className={`places__option ${currentSortType === sortType ? 'places__option--active' : ''}`}
            tabIndex={0}
            key={sortType}
            onClick={() => handleSortOptionClick(sortType)}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
