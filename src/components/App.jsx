import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import { Wrapper } from './Wrapper';
export const App = () => {
  return (
    <>
      <Searchbar />
      <Wrapper>
        <ImageGallery />
      </Wrapper>
      <GlobalStyle />
    </>
  );
};
