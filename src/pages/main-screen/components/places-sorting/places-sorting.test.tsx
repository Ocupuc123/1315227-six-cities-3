import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PlacesSorting from './places-sorting';
import { SortType } from '../../../../const';

describe('Component: PlacesSorting', () => {
  it('should render current sort type', () => {
    const { container } = render(
      <PlacesSorting currentSortType={SortType.Popular} onSortChange={vi.fn()} />,
    );

    expect(container.querySelector('.places__sorting-type')).toHaveTextContent(
      SortType.Popular,
    );
  });

  it('should render all sort options', () => {
    render(
      <PlacesSorting currentSortType={SortType.Popular} onSortChange={vi.fn()} />,
    );

    Object.values(SortType).forEach((sortType) => {
      expect(screen.getAllByText(sortType).length).toBeGreaterThan(0);
    });
  });

  it('should open sorting menu on click', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <PlacesSorting currentSortType={SortType.Popular} onSortChange={vi.fn()} />,
    );

    await user.click(
      container.querySelector('.places__sorting-type') as HTMLElement,
    );

    expect(container.querySelector('.places__options')).toHaveClass(
      'places__options--opened',
    );
  });

  it('should mark the active sort option', () => {
    const { container } = render(
      <PlacesSorting currentSortType={SortType.Popular} onSortChange={vi.fn()} />,
    );

    expect(container.querySelector('.places__option--active')).toHaveTextContent(
      SortType.Popular,
    );
  });

  it('should call onSortChange and close menu when option is clicked', async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    const { container } = render(
      <PlacesSorting
        currentSortType={SortType.Popular}
        onSortChange={handleSortChange}
      />,
    );

    await user.click(
      container.querySelector('.places__sorting-type') as HTMLElement,
    );
    await user.click(screen.getByText(SortType.PriceLowToHigh));

    expect(handleSortChange).toHaveBeenCalledWith(SortType.PriceLowToHigh);
    expect(container.querySelector('.places__options')).not.toHaveClass(
      'places__options--opened',
    );
  });

  it('should not call onSortChange when the active option is clicked', async () => {
    const user = userEvent.setup();
    const handleSortChange = vi.fn();
    const { container } = render(
      <PlacesSorting
        currentSortType={SortType.Popular}
        onSortChange={handleSortChange}
      />,
    );

    await user.click(
      container.querySelector('.places__option--active') as HTMLElement,
    );

    expect(handleSortChange).not.toHaveBeenCalled();
  });
});
