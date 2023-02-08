import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Wrapper } from './Wrapper';

export class App extends Component {
  state = {
    query: '',
  };

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Wrapper>
          <ImageGallery query={this.state.query} />
        </Wrapper>
        <GlobalStyle />
        <ToastContainer />
      </>
    );
  }
}
