import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, AuthorizationStatus, NameSpace } from '../../../const';
import Header from './header';
import { withHistory, withStore } from '../../../utils/mock-component';
import { makeFakeStore, makeFakeUserData } from '../../../utils/mocks';
import { logoutAction } from '../../../store/api-actions';
import type { State } from '../../../types/state';

vi.mock('../../../store/api-actions', async () => {
  const actual = await vi.importActual<typeof import('../../../store/api-actions')>(
    '../../../store/api-actions',
  );

  return {
    ...actual,
    logoutAction: vi.fn(() => ({ type: 'user/logout' })),
  };
});

const renderHeader = (
  route: string = AppRoute.Main,
  initialState: Partial<State> = {},
) => {
  const { withStoreComponent, mockStore } = withStore(
    <Header favoriteCount={3} />,
    makeFakeStore(initialState),
  );
  const preparedComponent = withHistory(withStoreComponent, [route]);

  return {
    ...render(preparedComponent),
    mockStore,
  };
};

describe('Component: Header', () => {
  it('should render logo and "Sign in" link when user is not authorized', () => {
    renderHeader();

    expect(screen.getByAltText('6 cities logo')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('should link "Sign in" to the login page when user is not authorized', () => {
    renderHeader();

    expect(screen.getByText('Sign in').closest('a')).toHaveAttribute(
      'href',
      AppRoute.Login,
    );
  });

  it('should render user email, avatar and favorite count when user is authorized', () => {
    const userData = makeFakeUserData();

    renderHeader(AppRoute.Main, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData,
      },
    });

    expect(screen.getByText(userData.email)).toBeInTheDocument();
    expect(screen.getByAltText(userData.name)).toHaveAttribute(
      'src',
      userData.avatarUrl,
    );
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
  });

  it('should link profile to favorites page when user is authorized', () => {
    const userData = makeFakeUserData();

    renderHeader(AppRoute.Main, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData,
      },
    });

    expect(screen.getByText(userData.email).closest('a')).toHaveAttribute(
      'href',
      AppRoute.Favorites,
    );
  });

  it('should dispatch logoutAction on "Sign out" click', async () => {
    const user = userEvent.setup();
    const userData = makeFakeUserData();

    const { mockStore } = renderHeader(AppRoute.Main, {
      [NameSpace.User]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userData,
      },
    });

    await user.click(screen.getByText('Sign out'));

    expect(logoutAction).toHaveBeenCalledTimes(1);
    expect(mockStore.getActions()).toEqual([
      { type: 'user/logout' },
      { type: `${NameSpace.Data}/clearFavorites`, payload: undefined },
    ]);
  });

  it('should not render navigation on the login page', () => {
    renderHeader(AppRoute.Login);

    expect(screen.queryByText('Sign in')).not.toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });
});
