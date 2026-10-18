import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
import { toast } from 'react-toastify';
import BookmarkButton from './bookmark-button';
import { withHistory, withStore } from '../../utils/mock-component';
import {
  APIRoute,
  AppRoute,
  AuthorizationStatus,
  ButtonType,
  FavoriteStatus,
  NameSpace,
} from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import type { State } from '../../types/state';

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const getInitialState = (
  authorizationStatus = AuthorizationStatus.Auth,
): Partial<State> => ({
  [NameSpace.User]: { authorizationStatus, userData: null },
});

const renderWithProviders = (
  component: JSX.Element,
  authorizationStatus = AuthorizationStatus.Auth,
) => {
  const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
    component,
    getInitialState(authorizationStatus),
  );
  const preparedComponent = withHistory(withStoreComponent, [
    AppRoute.Main,
  ]);

  return {
    ...render(preparedComponent),
    mockStore,
    mockAxiosAdapter,
  };
};

describe('Component: BookmarkButton', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render "To bookmarks" when not favorite', () => {
    renderWithProviders(
      <BookmarkButton isFavorite={false} offerId="offer-1" />,
    );

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass(
      'place-card__bookmark-button--active',
    );
  });

  it('should render "In bookmarks" and active class when favorite', () => {
    renderWithProviders(<BookmarkButton isFavorite offerId="offer-1" />);

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(
      'place-card__bookmark-button--active',
    );
  });

  it('should apply offer-specific icon size for Offer button type', () => {
    renderWithProviders(
      <BookmarkButton
        isFavorite={false}
        offerId="offer-1"
        buttonType={ButtonType.Offer}
      />,
    );

    const icon = document.querySelector('svg');
    expect(icon).toHaveAttribute('width', '31');
    expect(icon).toHaveAttribute('height', '33');
  });

  it('should redirect to login page on click when user is not authorized', async () => {
    const user = userEvent.setup();

    const { mockAxiosAdapter } = renderWithProviders(
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<BookmarkButton isFavorite={false} offerId="offer-1" />}
        />
        <Route path={AppRoute.Login} element={<h1>Login page</h1>} />
      </Routes>,
      AuthorizationStatus.NoAuth,
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('Login page')).toBeInTheDocument();
    expect(mockAxiosAdapter.history.post).toHaveLength(0);
  });

  it('should send POST request with Added status when offer is not favorite', async () => {
    const user = userEvent.setup();

    const { mockAxiosAdapter } = renderWithProviders(
      <BookmarkButton isFavorite={false} offerId="offer-1" />,
    );

    mockAxiosAdapter
      .onPost(`${APIRoute.Favorite}/offer-1/${FavoriteStatus.Added}`)
      .reply(200, makeFakeOffer());

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockAxiosAdapter.history.post).toHaveLength(1),
    );
    expect(mockAxiosAdapter.history.post[0].url).toBe(
      `${APIRoute.Favorite}/offer-1/${FavoriteStatus.Added}`,
    );
  });

  it('should send POST request with Removed status when offer is favorite', async () => {
    const user = userEvent.setup();

    const { mockAxiosAdapter } = renderWithProviders(
      <BookmarkButton isFavorite offerId="offer-1" />,
    );

    mockAxiosAdapter
      .onPost(`${APIRoute.Favorite}/offer-1/${FavoriteStatus.Removed}`)
      .reply(200, makeFakeOffer());

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(mockAxiosAdapter.history.post).toHaveLength(1),
    );
    expect(mockAxiosAdapter.history.post[0].url).toBe(
      `${APIRoute.Favorite}/offer-1/${FavoriteStatus.Removed}`,
    );
  });

  it('should show success toast after successful update', async () => {
    const user = userEvent.setup();

    const { mockAxiosAdapter } = renderWithProviders(
      <BookmarkButton isFavorite={false} offerId="offer-1" />,
    );

    mockAxiosAdapter
      .onPost(`${APIRoute.Favorite}/offer-1/${FavoriteStatus.Added}`)
      .reply(200, makeFakeOffer());

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(toast.success).toBeCalledWith('Added to favorites'),
    );
  });

  it('should show error toast when update fails', async () => {
    const user = userEvent.setup();

    const { mockAxiosAdapter } = renderWithProviders(
      <BookmarkButton isFavorite={false} offerId="offer-1" />,
    );

    mockAxiosAdapter
      .onPost(`${APIRoute.Favorite}/offer-1/${FavoriteStatus.Added}`)
      .reply(400);

    await user.click(screen.getByRole('button'));

    await waitFor(() =>
      expect(toast.error).toBeCalledWith('Failed to update favorites'),
    );
  });
});
