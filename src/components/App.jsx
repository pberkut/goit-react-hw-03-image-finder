/* 
https://pixabay.com/api/?key=32766360-76e7eba189222bd8a15da9e43&q=cat&safesearch=true&per_page=12&page=1
*/

import { Component } from 'react';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';

export class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    return (
      <div className="App">
        <Searchbar />

        {/* <RotatingLines /> */}

        <ImageGallery />

        <Button />

        {this.state.showModal && <Modal onClose={this.toggleModal} />}
      </div>
    );
  }
}
