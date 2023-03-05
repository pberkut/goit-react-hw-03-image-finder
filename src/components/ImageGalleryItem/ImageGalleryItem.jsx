import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, tags, onSelectedImage }) => (
  <>
    <img
      className="ImageGalleryItem-image"
      src={image}
      alt={tags}
      onClick={() => onSelectedImage(image, tags)}
    />
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};
