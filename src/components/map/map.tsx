type MapProps = {
  mapType?: 'cities' | 'offer';
};

function Map({ mapType = 'cities' }: MapProps): JSX.Element {
  return <section className={`${mapType}__map map`} />;
}

export default Map;
