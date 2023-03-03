import { Component } from 'react';
import { getImages } from '../../services/pixabay-API';
import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem';

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
      getImages(query, page)
        .then(data =>
          this.setState({
            images: [...prevState.images, ...data.hits],
            status: 'resolved',
          })
        )
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

    if (status === 'pending') return <p>Loading...</p>;

    if (status === 'resolved')
      return (
        <>
          <ul className="ImageGallery">
            <ImageGalleryItem images={images} />
          </ul>
          <Button onLoadMore={this.handleLoadMore} />
        </>
      );

    if (status === 'rejected') return <p>Error:${error} </p>;

    // return;
  }
}
