import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ images, onSelectedImage }) => (
  <>
    {images.map(({ id, tags, webformatURL }) => (
      <li key={id} className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
          onClick={() => onSelectedImage(webformatURL, tags)}
        />
      </li>
    ))}
  </>
);

ImageGalleryItem.propTypes = {
  images: PropTypes.array.isRequired,
};
