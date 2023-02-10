import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryList, GalleryItem } from './ImageGallery.styled';

export const ImageGallery = ({ images, query, toggle, showModal }) => {
  return (
    <>
      <GalleryList>
        {images.map((image, index) => (
          <GalleryItem key={image.id} onClick={() => toggle(index)}>
            <ImageGalleryItem image={image} alt={query} showModal={showModal} />
          </GalleryItem>
        ))}
      </GalleryList>
    </>
  );
};
