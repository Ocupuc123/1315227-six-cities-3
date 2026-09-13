import type { Offer } from '../../types/offer';
import { CardType } from '../../const';
import PlaceCard from '../../components/place-card/place-card';

const LIST_CLASS = {
  [CardType.City]: 'cities__places-list places__list tabs__content',
  [CardType.Near]: 'near-places__list places__list',
};

type OffersListCardType = CardType.City | CardType.Near;

type OffersListProps = {
  offers: Offer[];
  onCardHover?: (id: string | null) => void;
  cardType?: OffersListCardType;
};

function OffersList({
  offers,
  onCardHover,
  cardType = CardType.City,
}: OffersListProps): JSX.Element {
  return (
    <div className={`${LIST_CLASS[cardType]}`}>
      {offers.map((offer) => (
        <PlaceCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
          cardType={cardType}
        />
      ))}
    </div>
  );
}

export default OffersList;
