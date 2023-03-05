import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { tags, webImgURL } = this.props.image;
    return (
      <>
        <img
          className="imageGalleryItem-image"
          src={webImgURL}
          alt={tags}
          onClick={() => this.setState({ showModal: true })}
        />
        {this.state.showModal && (
          <Modal showImage={this.props.image} onClose={this.toggleModal} />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webImgURL: PropTypes.string,
    lgImgURL: PropTypes.string,
    tags: PropTypes.string,
  }).isRequired,
};
