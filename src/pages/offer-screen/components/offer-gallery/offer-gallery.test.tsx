import { render, screen } from '@testing-library/react';
import OfferGallery from './offer-gallery';

describe('Component: OfferGallery', () => {
  it('should render all images with correct sources and alts', () => {
    const images = ['img/apartment-01.jpg', 'img/apartment-02.jpg'];

    render(<OfferGallery images={images} />);

    expect(screen.getByAltText('Photo studio 1')).toHaveAttribute(
      'src',
      'img/apartment-01.jpg',
    );
    expect(screen.getByAltText('Photo studio 2')).toHaveAttribute(
      'src',
      'img/apartment-02.jpg',
    );
  });

  it('should limit rendered images to 6', () => {
    const images = Array.from(
      { length: 8 },
      (_, index) => `img/apartment-0${index + 1}.jpg`,
    );

    const { container } = render(<OfferGallery images={images} />);

    expect(container.querySelectorAll('.offer__image')).toHaveLength(6);
    expect(screen.queryByAltText('Photo studio 7')).not.toBeInTheDocument();
  });
});
