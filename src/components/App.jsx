/* 
https://pixabay.com/api/?key=32766360-76e7eba189222bd8a15da9e43&q=cat&safesearch=true&per_page=12&page=1
*/

import { Component } from 'react';
// import { RotatingLines } from 'react-loader-spinner';
// import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
export class App extends Component {
  state = {
    // showModal: false,
    query: '',
    selectedImage: null,
    alt: null,
  };

  handleSubmit = query => {
    this.setState({ query });
  };

  handleSelectedImage = (url, alt) => {
    this.setState({ selectedImage: url, alt });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };
  // toggleModal = () => {
  //   this.setState(({ showModal }) => ({
  //     showModal: !showModal,
  //   }));
  // };

  render() {
    return (
      <div className="App">
        {/* <RotatingLines /> */}

        <Searchbar onSearch={this.handleSubmit} />

        <ImageGallery
          query={this.state.query}
          onSelectedImage={this.handleSelectedImage}
        />

        {this.state.selectedImage && (
          <Modal
            onClose={this.handleCloseModal}
            selectedImage={this.state.selectedImage}
            alt={this.state.alt}
          />
        )}
      </div>
    );
  }
}
