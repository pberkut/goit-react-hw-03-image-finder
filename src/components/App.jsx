import { PureComponent } from 'react';
import { ImageGallery } from './ImageGallery';
import { Modal } from './Modal';
import { Searchbar } from './Searchbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getImages } from '../services/pixabay-API';
import { toast } from 'react-toastify';
import { Button } from './Button';

export class App extends PureComponent {
  state = {
    query: '',
    selectedImage: null,
    tags: null,
    images: [],
    error: null,
    status: 'idle',
    totalPages: 0,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    // const { query } = this.props;

    if (prevState.query !== query) {
      this.setState({ status: 'pending', page: 1 });
      getImages(query, 1)
        .then(data => {
          // when not fined images
          if (data.hits.length === 0) {
            toast.info(`Not fined image: ${query}`);

            this.setState({
              images: [],
              totalPages: 0,
              status: 'rejected',
            });
            return;
          }

          this.setState({
            images: [...data.hits],
            status: 'resolved',
            totalPages: data.totalHits,
          });
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          })
        );
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });
      getImages(query, page)
        .then(data => {
          this.setState(prevState => ({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
            totalPages: data.totalHits,
          }));
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          })
        );
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleSelectedImage = (url, tags) => {
    this.setState({ selectedImage: url, tags });
  };

  handleCloseModal = () => {
    this.setState({ selectedImage: null });
  };

  render() {
    const { images, status } = this.state;

    return (
      <div className="App">
        <Searchbar onSearch={this.handleSubmit} />

        {status === 'resolved' && (
          <ImageGallery
            images={images}
            onSelectedImage={this.handleSelectedImage}
          />
        )}
        <Button onLoadMore={this.handleLoadMore} />

        {this.state.selectedImage && (
          <Modal
            onClose={this.handleCloseModal}
            selectedImage={this.state.selectedImage}
            alt={this.state.tags}
          />
        )}

        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}
