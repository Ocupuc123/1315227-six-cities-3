import { render, screen } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../const';
import PrivateRoute from './private-route';
import { withHistory, withStore } from '../../utils/mock-component';
import type { State } from '../../types/state';

const getInitialState = (authorizationStatus: AuthorizationStatus): Partial<State> => ({
  [NameSpace.User]: { authorizationStatus, userData: null },
});

const renderPrivateRoute = (
  access: 'auth' | 'guest',
  authorizationStatus: AuthorizationStatus,
  initialEntry: AppRoute = AppRoute.Favorites,
) => {
  const { withStoreComponent } = withStore(
    <Routes>
      <Route path={AppRoute.Login} element={<span>Login page</span>} />
      <Route path={AppRoute.Main} element={<span>Main page</span>} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute access={access}>
            <span>Private content</span>
          </PrivateRoute>
        }
      />
    </Routes>,
    getInitialState(authorizationStatus),
  );
  const preparedComponent = withHistory(withStoreComponent, [initialEntry]);

  return render(preparedComponent);
};

describe('Component: PrivateRoute', () => {
  it('should render children when user is authorized and access is "auth"', () => {
    renderPrivateRoute('auth', AuthorizationStatus.Auth);

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('should redirect to login page when user is not authorized and access is "auth"', () => {
    renderPrivateRoute('auth', AuthorizationStatus.NoAuth);

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });

  it('should render children when user is not authorized and access is "guest"', () => {
    renderPrivateRoute('guest', AuthorizationStatus.NoAuth);

    expect(screen.getByText('Private content')).toBeInTheDocument();
  });

  it('should redirect to main page when user is authorized and access is "guest"', () => {
    renderPrivateRoute('guest', AuthorizationStatus.Auth);

    expect(screen.getByText('Main page')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });

  it('should render LoadingScreen while auth status is unknown', () => {
    renderPrivateRoute('auth', AuthorizationStatus.Unknown);

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(screen.queryByText('Private content')).not.toBeInTheDocument();
  });
});
