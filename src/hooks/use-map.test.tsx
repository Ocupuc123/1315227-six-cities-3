import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { Map, TileLayer } from 'leaflet';
import useMap from './use-map';
import type { City } from '../types/offer';

const { mapInstance } = vi.hoisted(() => ({
  mapInstance: {
    addLayer: vi.fn(),
    setView: vi.fn(),
  },
}));

vi.mock('leaflet', () => ({
  Map: vi.fn(() => mapInstance),
  TileLayer: vi.fn(),
}));

const makeFakeCity = (overrides: Partial<City['location']> = {}): City => ({
  name: 'Paris',
  location: {
    latitude: 48.8566,
    longitude: 2.3522,
    zoom: 10,
    ...overrides,
  },
});

describe('Hook: useMap', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return null when map container ref is not set', () => {
    const city = makeFakeCity();

    const { result } = renderHook(() => {
      const mapRef = useRef<HTMLElement | null>(null);
      return useMap(mapRef, city);
    });

    expect(result.current).toBeNull();
    expect(Map).not.toHaveBeenCalled();
    expect(TileLayer).not.toHaveBeenCalled();
  });

  it('should create map instance and add tile layer when ref is set', () => {
    const city = makeFakeCity();
    const container = document.createElement('div');

    const { result } = renderHook(() => {
      const mapRef = useRef<HTMLElement | null>(container);
      return useMap(mapRef, city);
    });

    expect(Map).toHaveBeenCalledTimes(1);
    expect(Map).toHaveBeenCalledWith(container, {
      center: {
        lat: city.location.latitude,
        lng: city.location.longitude,
      },
      zoom: city.location.zoom,
    });
    expect(TileLayer).toHaveBeenCalledTimes(1);
    expect(result.current).not.toBeNull();
  });

  it('should not recreate map instance on re-render with the same city', () => {
    const city = makeFakeCity();
    const container = document.createElement('div');

    const { rerender } = renderHook(
      ({ currentCity }) => {
        const mapRef = useRef<HTMLElement | null>(container);
        return useMap(mapRef, currentCity);
      },
      { initialProps: { currentCity: city } },
    );

    rerender({ currentCity: city });

    expect(Map).toHaveBeenCalledTimes(1);
    expect(TileLayer).toHaveBeenCalledTimes(1);
  });

  it('should call setView when city changes', () => {
    const initialCity = makeFakeCity();
    const nextCity = makeFakeCity({ latitude: 52.52, longitude: 13.405, zoom: 12 });
    const container = document.createElement('div');

    const { rerender } = renderHook(
      ({ currentCity }) => {
        const mapRef = useRef<HTMLElement | null>(container);
        return useMap(mapRef, currentCity);
      },
      { initialProps: { currentCity: initialCity } },
    );

    rerender({ currentCity: nextCity });

    expect(mapInstance.setView).toHaveBeenCalledWith(
      [nextCity.location.latitude, nextCity.location.longitude],
      nextCity.location.zoom,
    );
  });
});
