import { render, screen } from '@testing-library/react';
import OfferFeatures from './offer-features';

describe('Component: OfferFeatures', () => {
  it('should render offer type, bedrooms and adults limit', () => {
    render(<OfferFeatures type="apartment" bedrooms={2} maxAdults={3} />);

    expect(screen.getByText('Apartment')).toBeInTheDocument();
    expect(screen.getByText('2 Bedrooms')).toBeInTheDocument();
    expect(screen.getByText('Max 3 adults')).toBeInTheDocument();
  });

  it('should capitalize the offer type', () => {
    render(<OfferFeatures type="hotel" bedrooms={1} maxAdults={2} />);

    expect(screen.getByText('Hotel')).toBeInTheDocument();
  });

  it('should render single bedroom count without pluralization issue', () => {
    render(<OfferFeatures type="room" bedrooms={1} maxAdults={1} />);

    expect(screen.getByText('1 Bedrooms')).toBeInTheDocument();
  });
});
