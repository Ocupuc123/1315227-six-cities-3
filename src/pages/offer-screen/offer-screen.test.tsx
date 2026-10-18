import { render, screen, waitFor } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import { AppRoute, NameSpace } from '../../const';
import OfferScreen from './offer-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import {
  makeFakeOffer,
  makeFakeStore,
  makeFullOffer,
} from '../../utils/mocks';
import { fetchOfferAction } from '../../store/api-actions';
import type { State } from '../../types/state';
import type { FullOffer } from '../../types/offer';

vi.mock('../../store/api-actions', () => ({
  fetchOfferAction: vi.fn(() => ({
    type: 'data/fetchOffer/pending',
    unwrap: () => Promise.resolve(),
  })),
}));

vi.mock('./components/offer-gallery/offer-gallery', () => ({
  default: () => <div data-testid="offer-gallery" />,
}));

vi.mock('./components/offer-host/offer-host', () => ({
  default: () => <div data-testid="offer-host" />,
}));

vi.mock('./components/offer-features/offer-features', () => ({
  default: () => <div data-testid="offer-features" />,
}));

vi.mock('./components/offer-reviews/offer-reviews', () => ({
  default: () => <div data-testid="offer-reviews" />,
}));

vi.mock('./components/near-places-list/near-places-list', () => ({
  default: ({ offersNearby }: { offersNearby: unknown[] }) => (
    <div data-testid="near-places-list">Nearby: {offersNearby.length}</div>
  ),
}));

vi.mock('../../components/map/map', () => ({
  default: () => <div data-testid="map" />,
}));

const mockOfferId = 'test-offer-id';

const renderOfferScreen = (initialState: Partial<State> = {}) => {
  const { withStoreComponent } = withStore(
    <Routes>
      <Route path={AppRoute.Offer} element={<OfferScreen />} />
    </Routes>,
    makeFakeStore(initialState),
  );
  const preparedComponent = withHistory(withStoreComponent, [
    `${AppRoute.Offer.replace(':id', mockOfferId)}`,
  ]);

  return render(preparedComponent);
};

const withOffer = (offer: FullOffer): Partial<State> => ({
  [NameSpace.Data]: {
    ...makeFakeStore()[NameSpace.Data],
    offer,
  },
});

describe('Component: OfferScreen', () => {
  it('should render loading screen while offer details are loading', () => {
    renderOfferScreen({
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        isOfferDetailsLoading: true,
      },
    });

    expect(screen.getByText('Loading ...')).toBeInTheDocument();
    expect(screen.queryByTestId('offer-features')).not.toBeInTheDocument();
  });

  it('should dispatch fetchOfferAction with offer id from params', () => {
    renderOfferScreen(withOffer(makeFullOffer()));

    expect(fetchOfferAction).toHaveBeenCalledWith(mockOfferId);
  });

  it('should render offer details', () => {
    const offer = {
      ...makeFullOffer(),
      title: 'Beautiful & luxurious apartment',
      price: 120,
      rating: 4.4,
      isPremium: false,
      goods: ['Wi-Fi', 'Kitchen'],
      images: ['img/apartment-01.jpg'],
    };

    renderOfferScreen(withOffer(offer));

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(String(offer.rating))).toBeInTheDocument();
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getByText('Wi-Fi')).toBeInTheDocument();
    expect(screen.getByText('Kitchen')).toBeInTheDocument();
  });

  it('should render premium mark when offer is premium', () => {
    renderOfferScreen(withOffer({ ...makeFullOffer(), isPremium: true }));

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render premium mark when offer is not premium', () => {
    renderOfferScreen(withOffer({ ...makeFullOffer(), isPremium: false }));

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render image gallery only when offer has images', () => {
    const { unmount } = renderOfferScreen(
      withOffer({ ...makeFullOffer(), images: ['img/apartment-01.jpg'] }),
    );

    expect(screen.getByTestId('offer-gallery')).toBeInTheDocument();
    unmount();

    renderOfferScreen(withOffer({ ...makeFullOffer(), images: [] }));

    expect(screen.queryByTestId('offer-gallery')).not.toBeInTheDocument();
  });

  it('should render host, features and reviews sections', () => {
    renderOfferScreen(withOffer(makeFullOffer()));

    expect(screen.getByTestId('offer-host')).toBeInTheDocument();
    expect(screen.getByTestId('offer-features')).toBeInTheDocument();
    expect(screen.getByTestId('offer-reviews')).toBeInTheDocument();
  });

  it('should render bookmark button when offer is not favorite', () => {
    renderOfferScreen(withOffer({ ...makeFullOffer(), isFavorite: false }));

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('should render map and near places when there are nearby offers', () => {
    const offersNearby = [makeFakeOffer(), makeFakeOffer()];

    renderOfferScreen({
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        offer: makeFullOffer(),
        offersNearby,
      },
    });

    expect(
      screen.getByText('Other places in the neighbourhood'),
    ).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('near-places-list')).toHaveTextContent(
      'Nearby: 2',
    );
  });

  it('should limit a number of nearby offers to 3', () => {
    const offersNearby = [
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
    ];

    renderOfferScreen({
      [NameSpace.Data]: {
        ...makeFakeStore()[NameSpace.Data],
        offer: makeFullOffer(),
        offersNearby,
      },
    });

    expect(screen.getByTestId('near-places-list')).toHaveTextContent(
      'Nearby: 3',
    );
  });

  it('should not render map and near places when there are no nearby offers', () => {
    renderOfferScreen(withOffer(makeFullOffer()));

    expect(screen.queryByTestId('map')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Other places in the neighbourhood'),
    ).not.toBeInTheDocument();
  });

  it('should set page title', async () => {
    renderOfferScreen(withOffer(makeFullOffer()));

    await waitFor(() => expect(document.title).toBe('6 cities: offer'));
  });

  it('should redirect to not found page when offer fetch fails', async () => {
    const fetchMock = vi.mocked(fetchOfferAction);
    fetchMock.mockImplementationOnce(
      (() => ({
        type: 'data/fetchOffer/pending',
        unwrap: () => Promise.reject(new Error('Offer not found')),
      })) as unknown as typeof fetchOfferAction,
    );

    const { withStoreComponent } = withStore(
      <Routes>
        <Route path={AppRoute.Offer} element={<OfferScreen />} />
        <Route path={AppRoute.NotFound} element={<h1>Not Found Page</h1>} />
      </Routes>,
      makeFakeStore(),
    );
    const preparedComponent = withHistory(withStoreComponent, [
      `/offer/${mockOfferId}`,
    ]);

    render(preparedComponent);

    expect(await screen.findByText('Not Found Page')).toBeInTheDocument();
  });
});
