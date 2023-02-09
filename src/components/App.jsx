import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Wrapper } from './Wrapper';

import { getImages } from 'services/pixabayAPI';

export class App extends Component {
  state = {
    query: '',
    images: [],
  };

  handleFormSubmit = async query => {
    const { hits } = await getImages(query);

    this.setState({ query, images: hits });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Wrapper>
          <ImageGallery images={this.state.images} query={this.state.query} />
        </Wrapper>
        <GlobalStyle />
        <ToastContainer />
      </>
    );
  }
}
