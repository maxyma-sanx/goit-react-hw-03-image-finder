import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery';
import { Wrapper } from './Wrapper';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { settings } from 'utils/notifySettings';

import { getImages } from 'services/pixabayAPI';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    images: [],
    isLoading: false,
  };

  getData = async () => {
    this.setState({ isLoading: true });

    return await getImages(this.state.query, this.state.page);
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { query, page } = this.state;

      const { hits } = await this.getData();

      if (prevState.query !== query) {
        this.setState({ images: hits });
      }

      if (prevState.page !== page && prevState.query === query) {
        this.setState({
          images: [...prevState.images, ...hits],
        });
      }
    } catch (error) {
      toast.error('Something is wrong, try to reload page', settings);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = query => {
    this.setState({ page: 1, query, images: [] });
  };

  render() {
    const { images, query } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Wrapper>
          {this.state.isLoading && <p>Идет загрузка...</p>}
          <ImageGallery images={images} query={query} />
          {images.length > 0 && <Button loadMore={this.loadMore} />}
        </Wrapper>
        <GlobalStyle />
        <ToastContainer />
      </>
    );
  }
}
