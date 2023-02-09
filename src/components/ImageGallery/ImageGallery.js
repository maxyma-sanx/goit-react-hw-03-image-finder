import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { GalleryList, GalleryItem } from './ImageGallery.styled';

export const ImageGallery = ({ images, query }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <GalleryItem key={image.id}>
          <ImageGalleryItem image={image} alt={query} />
        </GalleryItem>
      ))}
    </GalleryList>
  );
};
