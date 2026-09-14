import type { Offer } from '../../types/offer';
import { CardType } from '../../const';
import PlaceCard from '../../components/place-card/place-card';

type NearPlacesListProps = {
  offersNearby: Offer[];
};

function NearPlacesList({ offersNearby = [] }: NearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offersNearby.map((offer) => (
        <PlaceCard key={offer.id} offer={offer} cardType={CardType.Near} />
      ))}
    </div>
  );
}

export default NearPlacesList;
