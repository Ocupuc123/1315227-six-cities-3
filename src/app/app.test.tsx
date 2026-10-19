import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, NameSpace } from '../const';
import App from './app';
import { withStore } from '../utils/mock-component';
import { makeFakeStore, makeFakeOffer } from '../utils/mocks';

beforeAll(() => {
  window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
});

const renderRoute = (
  route: string,
  initialState: Parameters<typeof makeFakeStore>[0] = {},
) => {
  window.history.pushState({}, '', route);

  const { withStoreComponent } = withStore(
    <App />,
    makeFakeStore(initialState),
  );

  return render(withStoreComponent);
};

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    renderRoute(AppRoute.Main);

    expect(
      screen.getByText(
        /We could not find any property available at the moment in Paris/i,
      ),
    ).toBeInTheDocument();
    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    renderRoute(AppRoute.Login);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user is authorized and navigate to "/favorites"', () => {
    renderRoute(AppRoute.Favorites, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData: null,
      },
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        favorites: [makeFakeOffer()],
      },
    });

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized and navigate to "/favorites"', () => {
    renderRoute(AppRoute.Favorites);

    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    expect(screen.queryByText('Saved listing')).not.toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    renderRoute('/unknown-route');

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText('Back to the main page')).toBeInTheDocument();
  });
});
