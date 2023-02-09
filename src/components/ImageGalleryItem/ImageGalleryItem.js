import { GalleryImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ image: { webformatURL }, alt }) => {
  return <GalleryImage src={webformatURL} alt={alt} />;
};
