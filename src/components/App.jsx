import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery';
import { Wrapper } from './Wrapper';
import { Searchbar } from './Searchbar';
import { Button } from './Button';
import { Loader } from './Loader';
import { settings } from 'utils/notifySettings';
import { getImages } from 'services/pixabayAPI';
import { Modal } from './Modal';

export class App extends Component {
  state = {
    page: 1,
    totalPages: null,
    query: '',
    images: [],
    isLoading: false,
    showModal: false,
    currentIdx: null,
  };

  async componentDidUpdate(_, prevState) {
    try {
      const { query, page } = this.state;

      if (prevState.query !== this.state.query) {
        this.setState({ isLoading: true });
        const { hits, totalHits } = await getImages(query, page);
        this.setState({
          totalPages: Math.round(totalHits / 12),
          images: hits,
          isLoading: false,
        });
      }

      if (prevState.page !== page && prevState.query === query) {
        this.setState({ isLoading: true });
        const { hits } = await getImages(query, page);
        this.setState({
          images: [...prevState.images, ...hits],
          isLoading: false,
        });
      }
    } catch (e) {
      toast.error(
        `Something is wrong, try to reload page! Error: ${e.message}`,
        settings
      );
    }
  }

  handleFormSubmit = query => {
    this.setState({ page: 1, totalPages: null, query, images: [] });
  };

  toggleModal = id => {
    this.setState({ showModal: !this.state.showModal, currentIdx: id });
  };

  closeModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { page, totalPages, images, query, showModal, currentIdx } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <Wrapper>
          <ImageGallery
            images={images}
            query={query}
            toggle={this.toggleModal}
            showModal={showModal}
            currentIdx={currentIdx}
          />

          <Loader loading={this.state.isLoading} />

          {images.length > 0 && totalPages > page && (
            <Button loadMore={this.loadMore} />
          )}
        </Wrapper>

        {showModal && (
          <Modal
            image={images[currentIdx]}
            alt={query}
            onClose={this.closeModal}
          />
        )}

        <GlobalStyle />
        <ToastContainer />
      </>
    );
  }
}
