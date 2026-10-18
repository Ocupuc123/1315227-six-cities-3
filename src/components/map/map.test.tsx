import { render } from '@testing-library/react';
import { Marker, layerGroup } from 'leaflet';
import Map from './map';
import { makeFakeOffer } from '../../utils/mocks';

const { mapInstance, markerLayer } = vi.hoisted(() => {
  const layer = {
    addTo: vi.fn(),
  };
  layer.addTo.mockReturnValue(layer);

  return {
    mapInstance: {
      addLayer: vi.fn(),
      removeLayer: vi.fn(),
      setView: vi.fn(),
    },
    markerLayer: layer,
  };
});

vi.mock('../../hooks/use-map', () => ({
  default: vi.fn(() => mapInstance),
}));

vi.mock('leaflet', () => ({
  Icon: vi.fn(),
  Marker: vi.fn(() => ({
    setIcon: vi.fn().mockReturnThis(),
    addTo: vi.fn().mockReturnThis(),
  })),
  layerGroup: vi.fn(() => markerLayer),
}));

describe('Component: Map', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render map section with cities modifier by default', () => {
    const offer = makeFakeOffer();

    render(
      <Map city={offer.city} offers={[offer]} />,
    );

    const mapElement = document.querySelector('.cities__map');
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('map');
  });

  it('should render map section with offer modifier for offer map type', () => {
    const offer = makeFakeOffer();

    render(
      <Map mapType="offer" city={offer.city} offers={[offer]} />,
    );

    const mapElement = document.querySelector('.offer__map');
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass('map');
  });

  it('should create marker for each offer and add marker layer to map', () => {
    const offers = [makeFakeOffer(), makeFakeOffer(), makeFakeOffer()];

    render(<Map city={offers[0].city} offers={offers} />);

    expect(layerGroup).toHaveBeenCalledTimes(1);
    expect(markerLayer.addTo).toHaveBeenCalledWith(mapInstance);
    expect(Marker).toHaveBeenCalledTimes(offers.length);
    offers.forEach((offer) => {
      expect(Marker).toHaveBeenCalledWith({
        lat: offer.location.latitude,
        lng: offer.location.longitude,
      });
    });
  });

  it('should add separate marker for currentOfferLocation', () => {
    const offer = makeFakeOffer();

    render(
      <Map
        city={offer.city}
        offers={[offer]}
        currentOfferLocation={offer.location}
      />,
    );

    expect(Marker).toHaveBeenCalledTimes(2);
    expect(Marker).toHaveBeenCalledWith({
      lat: offer.location.latitude,
      lng: offer.location.longitude,
    });
  });

  it('should remove marker layer from map on unmount', () => {
    const offer = makeFakeOffer();

    const { unmount } = render(<Map city={offer.city} offers={[offer]} />);

    unmount();

    expect(mapInstance.removeLayer).toHaveBeenCalledWith(markerLayer);
  });
});
