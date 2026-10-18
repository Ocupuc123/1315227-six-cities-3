import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CardType } from '../../const';
import PlaceCard from './place-card';
import { withHistory } from '../../utils/mock-component';
import { makeFakeOffer } from '../../utils/mocks';
import type { Offer } from '../../types/offer';

vi.mock('../bookmark-button/bookmark-button', () => ({
  default: () => <button type="button">Bookmark</button>,
}));

const renderPlaceCard = (offer: Offer, cardType?: CardType) =>
  render(withHistory(<PlaceCard offer={offer} cardType={cardType} />));

describe('Component: PlaceCard', () => {
  it('should render offer info', () => {
    const offer = { ...makeFakeOffer(), isPremium: false };

    renderPlaceCard(offer);

    expect(screen.getByText(offer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
    expect(screen.getByText(offer.type[0].toUpperCase() + offer.type.slice(1))).toBeInTheDocument();
    expect(screen.getByAltText(offer.title)).toHaveAttribute('src', offer.previewImage);
  });

  it('should render Premium mark when offer is premium', () => {
    const offer = { ...makeFakeOffer(), isPremium: true };

    renderPlaceCard(offer);

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should not render Premium mark when offer is not premium', () => {
    const offer = { ...makeFakeOffer(), isPremium: false };

    renderPlaceCard(offer);

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render bookmark button', () => {
    renderPlaceCard(makeFakeOffer());

    expect(screen.getByRole('button', { name: /Bookmark/i })).toBeInTheDocument();
  });

  it('should render link to offer page', () => {
    const offer = makeFakeOffer();

    renderPlaceCard(offer);

    const links = screen.getAllByRole('link');
    links.forEach((link) =>
      expect(link).toHaveAttribute('href', `/offer/${offer.id}`),
    );
  });

  it('should apply cities classes for City card type by default', () => {
    const offer = makeFakeOffer();

    const { container } = renderPlaceCard(offer);

    expect(container.querySelector('.cities__card')).toBeInTheDocument();
    expect(container.querySelector('.cities__image-wrapper')).toBeInTheDocument();
  });

  it('should apply favorites classes and image size for Favorite card type', () => {
    const offer = makeFakeOffer();

    const { container } = renderPlaceCard(offer, CardType.Favorite);

    expect(container.querySelector('.favorites__card')).toBeInTheDocument();
    expect(container.querySelector('.favorites__card-info')).toBeInTheDocument();
    expect(screen.getByAltText(offer.title)).toHaveAttribute('width', '150');
    expect(screen.getByAltText(offer.title)).toHaveAttribute('height', '110');
  });

  it('should apply near-places classes for Near card type', () => {
    const offer = makeFakeOffer();

    const { container } = renderPlaceCard(offer, CardType.Near);

    expect(container.querySelector('.near-places__card')).toBeInTheDocument();
    expect(container.querySelector('.near-places__image-wrapper')).toBeInTheDocument();
  });

  it('should call onCardHover with offer id on mouse enter', async () => {
    const user = userEvent.setup();
    const offer = makeFakeOffer();
    const onCardHover = vi.fn();

    render(withHistory(<PlaceCard offer={offer} onCardHover={onCardHover} />));

    await user.hover(screen.getByText(offer.title));

    expect(onCardHover).toHaveBeenCalledWith(offer.id);
  });

  it('should call onCardHover with null on mouse leave', async () => {
    const user = userEvent.setup();
    const offer = makeFakeOffer();
    const onCardHover = vi.fn();

    render(withHistory(<PlaceCard offer={offer} onCardHover={onCardHover} />));

    const card = screen.getByText(offer.title).closest('article');
    await user.hover(card as HTMLElement);
    await user.unhover(card as HTMLElement);

    expect(onCardHover).toHaveBeenLastCalledWith(null);
  });

  it('should render rating width based on offer rating', () => {
    const offer = { ...makeFakeOffer(), rating: 4 };

    const { container } = renderPlaceCard(offer);

    const stars = container.querySelector('.place-card__stars span');
    expect(stars).toHaveStyle({ width: '80%' });
  });
});
