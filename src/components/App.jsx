import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  state = {
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

  render() {
    return (
      <div className="App">
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

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
