const MAX_IMAGES = 6;

type OfferGalleryProps = {
  images: string[];
};

function OfferGallery({ images }: OfferGalleryProps): JSX.Element {
  const visibleImages = images.slice(0, MAX_IMAGES);

  return (
    <div className="offer__gallery-container container">
      <div className="offer__gallery">
        {visibleImages.map((imageSrc, index) => (
          <div className="offer__image-wrapper" key={imageSrc}>
            <img
              className="offer__image"
              src={imageSrc}
              alt={`Photo studio ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default OfferGallery;
