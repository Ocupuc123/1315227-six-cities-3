import { render, screen } from '@testing-library/react';
import FavoritesEmpty from './favorites-empty';

describe('Component: FavoritesEmpty', () => {
  it('should render empty state section with correct class', () => {
    const { container } = render(<FavoritesEmpty />);

    expect(container.querySelector('section')).toHaveClass(
      'favorites',
      'favorites--empty',
    );
  });

  it('should render visually hidden heading', () => {
    render(<FavoritesEmpty />);

    expect(
      screen.getByRole('heading', { name: 'Favorites (empty)' }),
    ).toBeInTheDocument();
  });

  it('should render status text', () => {
    render(<FavoritesEmpty />);

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
  });

  it('should render status description', () => {
    render(<FavoritesEmpty />);

    expect(
      screen.getByText(
        'Save properties to narrow down search or plan your future trips.',
      ),
    ).toBeInTheDocument();
  });
});
