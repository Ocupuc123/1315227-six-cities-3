import { capitalizeString } from '../../utils/common';

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
  return (
    <ul className="offer__features">
      <li className="offer__feature offer__feature--entire">
        {capitalizeString(type)}
      </li>
      <li className="offer__feature offer__feature--bedrooms">
        {bedrooms} Bedrooms
      </li>
      <li className="offer__feature offer__feature--adults">
        Max {maxAdults} adults
      </li>
    </ul>
  );
}

export default OfferFeatures;
