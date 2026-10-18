import { capitalizeString } from '../../../../utils/common';

type OfferFeaturesProps = {
  type: string;
  bedrooms: number;
  maxAdults: number;
};

function OfferFeatures({
  type,
  bedrooms,
  maxAdults,
}: OfferFeaturesProps): JSX.Element {
  const bedroomsText = `${bedrooms} ${bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}`;
  const adultsText = `Max ${maxAdults} ${maxAdults === 1 ? 'adult' : 'adults'}`;

  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalizeString(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedroomsText}
      </li>
      <li className="offer__feature offer__feature--adults">
        {adultsText}
      </li>
    </ul>
  );
}

export default OfferFeatures;
