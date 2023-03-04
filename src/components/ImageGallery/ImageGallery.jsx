import { Component } from 'react';
import { getImages } from '../../services/pixabay-API';
import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;
    if (
      prevProps.query !== this.props.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      getImages(query, page)
        .then(data => {
          if (data.hits.length === 0) {
            return Promise.reject(`Not fined image: ${query}`);
          }

          this.setState({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
          });
        })
        .catch(error =>
          this.setState({
            error,
            status: 'rejected',
          })
        );
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status } = this.state;

    if (status === 'pending')
      return (
        <div className="Spinner">
          <RotatingLines />
        </div>
      );

    if (status === 'resolved')
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem
              images={images}
              onSelectedImage={this.props.onSelectedImage}
            />
          </ul>
          <Button onLoadMore={this.handleLoadMore} />
        </>
      );

    if (status === 'rejected') return toast.error(error);
  }
}
