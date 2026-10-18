import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../../../const';
import OfferReviews from './offer-reviews';
import { withStore } from '../../../../utils/mock-component';
import { makeFakeComment, makeFakeStore } from '../../../../utils/mocks';
import type { State } from '../../../../types/state';

vi.mock('../reviews-list/reviews-list', () => ({
  default: () => <div data-testid="reviews-list" />,
}));

vi.mock('../reviews-form/reviews-form', () => ({
  default: () => <div data-testid="reviews-form" />,
}));

const renderOfferReviews = (
  initialState: Partial<State> = {},
  authorizationStatus = AuthorizationStatus.Auth,
) => {
  const { withStoreComponent } = withStore(
    <OfferReviews
      comments={[makeFakeComment()]}
      authorizationStatus={authorizationStatus}
      offerId="offer-1"
    />,
    makeFakeStore(initialState),
  );

  return render(withStoreComponent);
};

describe('Component: OfferReviews', () => {
  it('should render reviews title with comments amount', () => {
    const comments = [makeFakeComment(), makeFakeComment()];

    const { withStoreComponent } = withStore(
      <OfferReviews
        comments={comments}
        authorizationStatus={AuthorizationStatus.NoAuth}
        offerId="offer-1"
      />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    const title = screen.getByText((_content, element) =>
      Boolean(
        element?.classList.contains('reviews__title') &&
        element.textContent === 'Reviews · 2',
      ),
    );
    expect(title).toBeInTheDocument();
  });

  it('should render reviews list when there are comments', () => {
    renderOfferReviews();

    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
  });

  it('should not render reviews list when there are no comments', () => {
    const { withStoreComponent } = withStore(
      <OfferReviews
        comments={[]}
        authorizationStatus={AuthorizationStatus.NoAuth}
        offerId="offer-1"
      />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.queryByTestId('reviews-list')).not.toBeInTheDocument();
  });

  it('should render reviews form for authorized user', () => {
    renderOfferReviews(
      {},
      AuthorizationStatus.Auth,
    );

    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
  });

  it('should not render reviews form for not authorized user', () => {
    renderOfferReviews(
      {},
      AuthorizationStatus.NoAuth,
    );

    expect(screen.queryByTestId('reviews-form')).not.toBeInTheDocument();
  });

  it('should pass offer id to the form', () => {
    const offerId = 'offer-42';

    const { withStoreComponent } = withStore(
      <OfferReviews
        comments={[]}
        authorizationStatus={AuthorizationStatus.Auth}
        offerId={offerId}
      />,
      makeFakeStore(),
    );

    render(withStoreComponent);

    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
  });
});
