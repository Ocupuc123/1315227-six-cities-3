import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../const';
import Layout from './layout';
import { withHistory, withStore } from '../utils/mock-component';
import { makeFakeOffer, makeFakeStore } from '../utils/mocks';
import type { State } from '../types/state';

vi.mock('./components/header/header', () => ({
  default: () => <header>Mock Header</header>,
}));

vi.mock('./components/scroll-to-top/scroll-to-top', () => ({
  default: () => null,
}));

const renderLayout = (
  route: string,
  initialState: Partial<State> = {},
) => {
  const { withStoreComponent } = withStore(
    <Routes>
      <Route path="*" element={<Layout />}>
        <Route path="*" element={<span>Outlet content</span>} />
      </Route>
    </Routes>,
    makeFakeStore(initialState),
  );
  const preparedComponent = withHistory(withStoreComponent, [route]);

  return render(preparedComponent);
};

describe('Component: Layout', () => {
  it('should render header, outlet and scroll-to-top', () => {
    renderLayout(AppRoute.Main);

    expect(screen.getByText('Mock Header')).toBeInTheDocument();
    expect(screen.getByText('Outlet content')).toBeInTheDocument();
  });

  it('should apply page--gray and page--main modifiers on the main page', () => {
    const { container } = renderLayout(AppRoute.Main);

    const page = container.querySelector('.page');
    expect(page).toHaveClass('page--gray');
    expect(page).toHaveClass('page--main');
  });

  it('should apply page--gray and page--login modifiers on the login page', () => {
    const { container } = renderLayout(AppRoute.Login);

    const page = container.querySelector('.page');
    expect(page).toHaveClass('page--gray');
    expect(page).toHaveClass('page--login');
  });

  it('should apply page--favorites-empty modifier on the favorites page when favorites are empty', () => {
    const { container } = renderLayout(AppRoute.Favorites, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
      },
    });

    const page = container.querySelector('.page');
    expect(page).toHaveClass('page--favorites-empty');
  });

  it('should not apply page--favorites-empty modifier when favorites are not empty', () => {
    const { container } = renderLayout(AppRoute.Favorites, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
      },
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        favorites: [makeFakeOffer()],
      },
    });

    const page = container.querySelector('.page');
    expect(page).not.toHaveClass('page--favorites-empty');
  });

  it('should not apply page modifiers on the offer page', () => {
    const { container } = renderLayout('/offer/1');

    const page = container.querySelector('.page');
    expect(page).not.toHaveClass('page--gray');
    expect(page).not.toHaveClass('page--main');
    expect(page).not.toHaveClass('page--login');
  });
});
