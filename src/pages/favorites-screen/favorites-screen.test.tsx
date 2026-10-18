import { render, screen, waitFor } from '@testing-library/react';
import { AppRoute, NameSpace } from '../../const';
import FavoritesScreen from './favorites-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeOffer, makeFakeStore } from '../../utils/mocks';
import type { State } from '../../types/state';

vi.mock('./components/favorites-list/favorites-list', () => ({
  default: ({ favorites }: { favorites: unknown[] }) => (
    <div data-testid="favorites-list">Items: {favorites.length}</div>
  ),
}));

const renderFavoritesScreen = (initialState: Partial<State> = {}) => {
  const { withStoreComponent } = withStore(
    <FavoritesScreen />,
    makeFakeStore(initialState),
  );
  const preparedComponent = withHistory(withStoreComponent, [
    AppRoute.Favorites,
  ]);

  return render(preparedComponent);
};

const withFavorites = (favorites = [makeFakeOffer()]): Partial<State> => ({
  [NameSpace.Data]: {
    ...makeFakeStore()[NameSpace.Data],
    favorites,
  },
});

describe('Component: FavoritesScreen', () => {
  it('should render empty state when there are no favorites', () => {
    renderFavoritesScreen();

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Save properties to narrow down search or plan your future trips.',
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });

  it('should add empty modifier to the main element when there are no favorites', () => {
    const { container } = renderFavoritesScreen();

    expect(container.querySelector('main')).toHaveClass(
      'page__main--favorites-empty',
    );
  });

  it('should render favorites list when there are favorites', () => {
    renderFavoritesScreen(withFavorites());

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-list')).toHaveTextContent('Items: 1');
    expect(screen.queryByText('Nothing yet saved.')).not.toBeInTheDocument();
  });

  it('should not add empty modifier when there are favorites', () => {
    const { container } = renderFavoritesScreen(withFavorites());

    expect(container.querySelector('main')).not.toHaveClass(
      'page__main--favorites-empty',
    );
  });

  it('should pass all favorites to the list', () => {
    renderFavoritesScreen(
      withFavorites([makeFakeOffer(), makeFakeOffer(), makeFakeOffer()]),
    );

    expect(screen.getByTestId('favorites-list')).toHaveTextContent('Items: 3');
  });

  it('should render footer logo link to the main page', () => {
    renderFavoritesScreen();

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('width', '64');
    expect(logo).toHaveAttribute('height', '33');
    expect(logo.closest('a')).toHaveAttribute('href', AppRoute.Main);
  });

  it('should render footer on both empty and non-empty states', () => {
    const { unmount } = renderFavoritesScreen();
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    unmount();

    renderFavoritesScreen(withFavorites());
    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
  });

  it('should set page title for empty favorites', async () => {
    renderFavoritesScreen();

    await waitFor(() =>
      expect(document.title).toBe('6 cities: favorites empty'),
    );
  });

  it('should set page title when favorites are present', async () => {
    renderFavoritesScreen(withFavorites());

    await waitFor(() => expect(document.title).toBe('6 cities: favorites'));
  });
});
