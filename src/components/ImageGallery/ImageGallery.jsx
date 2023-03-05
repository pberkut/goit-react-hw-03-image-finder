import { ImageGalleryItem } from 'components/ImageGalleryItem';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class ImageGallery extends Component {
  componentDidUpdate() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  render() {
    return (
      <ul className="imageGallery">
        {this.props.images.map(image => (
          <li className="imageGalleryItem" key={image.id}>
            <ImageGalleryItem image={image} />
          </li>
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webImgURL: PropTypes.string,
      lgImgURL: PropTypes.string,
      tags: PropTypes.string,
    })
  ).isRequired,
};
