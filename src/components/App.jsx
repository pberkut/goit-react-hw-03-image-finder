import React, { PureComponent } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImagesWithQuery, handleFetchData } from '../services/pixabay-API';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Loader } from './Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error } from './Error';

export class App extends PureComponent {
  state = {
    query: '',
    totalPages: 0,
    page: 1,
    images: [],
    error: false,
    status: 'idle',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query) {
      this.setState({ status: 'pending', page: 1 });
      try {
        const data = await fetchImagesWithQuery(query, 1);

        if (data.images.length === 0) {
          toast.info(`"${query}" not found!`);

          return this.setState({
            images: [],
            status: 'not found',
            totalPages: 0,
          });
        }

        const handleImages = handleFetchData(data.images);
        this.setState({
          images: handleImages,
          status: 'resolved',
          totalPages: data.totalPages,
        });
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        toast.error(`$Something went wrong`);
      }
    }

    if (prevState.page !== page && page !== 1) {
      this.setState({ status: 'pending' });
      try {
        const data = await fetchImagesWithQuery(query, page);
        const handleImages = handleFetchData(data.images);
        this.setState(({ images }) => ({
          images: [...images, ...handleImages],
          status: 'resolved',
          totalPages: data.totalPages,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
        toast.error(`$Something went wrong`);
      }
    }
  }

  handleSubmit = query => {
    this.setState({ query });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
    const y = document.body.scrollHeight;
    window.scrollTo(0, y);
  };

  render() {
    const { images, status, page, totalPages, error } = this.state;
    const availablePages = totalPages > page;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {status === 'pending' && <Loader />}
        {images.length > 0 && <ImageGallery images={images} />}
        {availablePages && <Button onLoadMore={this.handleLoadMore} />}
        {status === 'rejected' && <Error error={error.message} />}
        <ToastContainer position="top-right" autoClose={1500} />
      </div>
    );
  }
}
