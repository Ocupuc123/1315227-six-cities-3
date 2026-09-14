function PlacesOptions(): JSX.Element {
  return (
    <ul className="places__options places__options--custom">
      <li className="places__option places__option--active" tabIndex={0}>
        Popular
      </li>
      <li className="places__option" tabIndex={0}>
        Price: low to high
      </li>
      <li className="places__option" tabIndex={0}>
        Price: high to low
      </li>
      <li className="places__option" tabIndex={0}>
        Top rated first
      </li>
    </ul>
  );
}

export default PlacesOptions;
