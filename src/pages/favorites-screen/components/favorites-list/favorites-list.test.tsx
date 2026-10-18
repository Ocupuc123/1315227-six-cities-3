import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../../../const';
import FavoriteList from './favorites-list';
import { withHistory } from '../../../../utils/mock-component';
import { makeFakeOffer } from '../../../../utils/mocks';
import type { Offer } from '../../../../types/offer';

vi.mock('../../../../components/place-card/place-card', () => ({
  default: ({ offer }: { offer: Offer }) => (
    <div data-testid="place-card">{offer.title}</div>
  ),
}));

const renderFavoriteList = (favorites: Offer[]) => {
  const { container } = render(
    withHistory(<FavoriteList favorites={favorites} />),
  );

  return container;
};

const makeOfferInCity = (cityName: string, id?: string): Offer => ({
  ...makeFakeOffer(),
  ...(id ? { id } : {}),
  city: {
    ...makeFakeOffer().city,
    name: cityName as Offer['city']['name'],
  },
});

describe('Component: FavoriteList', () => {
  it('should render list container', () => {
    const container = renderFavoriteList([makeOfferInCity('Paris')]);

    expect(container.querySelector('ul')).toHaveClass('favorites__list');
  });

  it('should render nothing when favorites are empty', () => {
    const container = renderFavoriteList([]);

    expect(
      container.querySelectorAll('.favorites__locations-items'),
    ).toHaveLength(0);
  });

  it('should group offers by city and render city name', () => {
    renderFavoriteList([
      makeOfferInCity('Paris'),
      makeOfferInCity('Amsterdam'),
    ]);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Amsterdam')).toBeInTheDocument();
  });

  it('should render city as a link to the main page', () => {
    renderFavoriteList([makeOfferInCity('Paris')]);

    expect(screen.getByText('Paris').closest('a')).toHaveAttribute(
      'href',
      AppRoute.Main,
    );
  });

  it('should render one group per city even with several offers', () => {
    const container = renderFavoriteList([
      makeOfferInCity('Paris'),
      makeOfferInCity('Paris'),
      makeOfferInCity('Hamburg'),
    ]);

    expect(
      container.querySelectorAll('.favorites__locations-items'),
    ).toHaveLength(2);
  });

  it('should render all offers of a city', () => {
    renderFavoriteList([
      makeOfferInCity('Paris'),
      makeOfferInCity('Paris'),
      makeOfferInCity('Paris'),
    ]);

    expect(screen.getAllByTestId('place-card')).toHaveLength(3);
  });

  it('should render offers in the order of Cities constant', () => {
    const container = renderFavoriteList([
      makeOfferInCity('Hamburg'),
      makeOfferInCity('Paris'),
    ]);

    const cityLinks = Array.from(
      container.querySelectorAll('.locations__item-link'),
    ).map((link) => link.textContent);

    expect(cityLinks).toEqual(['Paris', 'Hamburg']);
  });

  it('should ignore offers whose city is not in Cities list', () => {
    renderFavoriteList([
      makeOfferInCity('Paris'),
      makeOfferInCity('Unknown City'),
    ]);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.queryByText('Unknown City')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('place-card')).toHaveLength(1);
  });

  it('should render places container for each city group', () => {
    const container = renderFavoriteList([
      makeOfferInCity('Paris'),
      makeOfferInCity('Amsterdam'),
    ]);

    expect(container.querySelectorAll('.favorites__places')).toHaveLength(2);
  });
});
