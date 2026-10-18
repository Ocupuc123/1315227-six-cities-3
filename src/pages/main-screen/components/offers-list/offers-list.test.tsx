import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OffersList from './offers-list';
import { makeFakeOffer } from '../../../../utils/mocks';
import { CardType } from '../../../../const';
import type { Offer } from '../../../../types/offer';

vi.mock('../../../../components/place-card/place-card', () => ({
  default: ({
    offer,
    cardType,
    onCardHover,
  }: {
    offer: Offer;
    cardType: string;
    onCardHover?: (id: string | null) => void;
  }) => (
    <div
      data-testid="place-card"
      data-card-type={cardType}
      onMouseEnter={() => onCardHover?.(offer.id)}
    >
      {offer.title}
    </div>
  ),
}));

describe('Component: OffersList', () => {
  it('should render place card for each offer', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    render(<OffersList offers={offers} />);

    expect(screen.getAllByTestId('place-card')).toHaveLength(3);
  });

  it('should render offer titles', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];

    render(<OffersList offers={offers} />);

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should pass City card type to place cards by default', () => {
    render(<OffersList offers={[makeFakeOffer()]} />);

    screen.getAllByTestId('place-card').forEach((card) => {
      expect(card).toHaveAttribute('data-card-type', CardType.City);
    });
  });

  it('should apply cities classes by default', () => {
    const { container } = render(<OffersList offers={[makeFakeOffer()]} />);

    expect(container.querySelector('.cities__places-list')).toHaveClass(
      'places__list',
      'tabs__content',
    );
  });

  it('should pass Near card type and apply near classes', () => {
    const { container } = render(
      <OffersList offers={[makeFakeOffer()]} cardType={CardType.Near} />,
    );

    expect(container.querySelector('.near-places__list')).toHaveClass(
      'places__list',
    );
    screen.getAllByTestId('place-card').forEach((card) => {
      expect(card).toHaveAttribute('data-card-type', CardType.Near);
    });
  });

  it('should call onCardHover with offer id on card hover', async () => {
    const user = userEvent.setup();
    const handleCardHover = vi.fn();
    const offer = makeFakeOffer();

    render(
      <OffersList offers={[offer]} onCardHover={handleCardHover} />,
    );

    await user.hover(screen.getByTestId('place-card'));

    expect(handleCardHover).toHaveBeenCalledWith(offer.id);
  });
});
