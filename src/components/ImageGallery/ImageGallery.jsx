import { Component } from 'react';
import { getImages } from '../../services/pixabay-API';
// import { RotatingLines } from 'react-loader-spinner';
import { Button } from 'components/Button';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { toast } from 'react-toastify';

export class ImageGallery extends Component {
  state = {
    images: [],
    error: null,
    status: 'idle',
    totalPages: 0,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { query } = this.props;

    if (prevProps.query !== this.props.query) {
      this.setState({ status: 'pending' });
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

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, error, status } = this.state;

    // if (status === 'pending' && images.length === 0)
    //   return (
    //     <div className="Spinner">
    //       <RotatingLines />
    //     </div>
    //   );

    if (status === 'resolved')
      return (
        <>
          {/* <ul className="ImageGallery">
            <ImageGalleryItem
              images={images}
              onSelectedImage={this.props.onSelectedImage}
            />
          </ul> */}

          <ul className="ImageGallery">
            {images.map(({ id, tags, webformatURL }) => (
              <li key={id}>
                <ImageGalleryItem
                  image={webformatURL}
                  tags={tags}
                  onSelectedImage={this.props.onSelectedImage}
                />
              </li>
            ))}
          </ul>

          {status === 'pending' ? (
            'Load'
          ) : (
            <Button onLoadMore={this.handleLoadMore} />
          )}
        </>
      );

    if (status === 'rejected') return toast.error(error);
  }
}
