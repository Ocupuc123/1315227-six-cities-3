import { render, screen } from '@testing-library/react';
import NearPlacesList from './near-places-list';
import { makeFakeOffer } from '../../../../utils/mocks';
import type { Offer } from '../../../../types/offer';

vi.mock('../../../../components/place-card/place-card', () => ({
  default: ({ offer, cardType }: { offer: Offer; cardType: string }) => (
    <div data-testid="place-card" data-card-type={cardType}>
      {offer.title}
    </div>
  ),
}));

describe('Component: NearPlacesList', () => {
  it('should render place card for each nearby offer', () => {
    const offersNearby = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    render(<NearPlacesList offersNearby={offersNearby} />);

    expect(screen.getAllByTestId('place-card')).toHaveLength(3);
  });

  it('should pass Near card type to place cards', () => {
    render(<NearPlacesList offersNearby={[makeFakeOffer()]} />);

    expect(screen.getByTestId('place-card')).toHaveAttribute(
      'data-card-type',
      'near',
    );
  });

  it('should render place card titles', () => {
    const offersNearby = [makeFakeOffer(), makeFakeOffer()];

    render(<NearPlacesList offersNearby={offersNearby} />);

    offersNearby.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should render list container with near-places class', () => {
    const { container } = render(
      <NearPlacesList offersNearby={[makeFakeOffer()]} />,
    );

    expect(container.querySelector('.near-places__list')).toHaveClass(
      'places__list',
    );
  });

  it('should render nothing when there are no nearby offers', () => {
    render(<NearPlacesList offersNearby={[]} />);

    expect(screen.queryByTestId('place-card')).not.toBeInTheDocument();
  });
});
