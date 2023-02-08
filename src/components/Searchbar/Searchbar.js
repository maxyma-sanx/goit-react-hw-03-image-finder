import { FaSearch } from 'react-icons/fa';

import {
  SearchbarContainer,
  SearchBtn,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export const Searchbar = () => {
  return (
    <SearchbarContainer>
      <SearchForm>
        <SearchBtn type="submit">
          <FaSearch size="18" />
        </SearchBtn>
        <SearchInput type="text" placeholder="Image search" />
      </SearchForm>
    </SearchbarContainer>
  );
};
