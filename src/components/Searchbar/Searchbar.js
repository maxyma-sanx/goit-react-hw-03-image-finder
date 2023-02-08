import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { settings } from 'utils/notifySettings';

import {
  SearchbarContainer,
  SearchBtn,
  SearchForm,
  SearchInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChangeQuery = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    if (!this.state.query.trim()) {
      toast.error('Please enter a non empty query!', settings);
      return;
    }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchbarContainer>
        <SearchForm onSubmit={this.handleFormSubmit}>
          <SearchBtn type="submit">
            <FaSearch size="18" />
          </SearchBtn>
          <SearchInput
            type="text"
            name="query"
            placeholder="Image search"
            value={this.state.query}
            onChange={this.handleChangeQuery}
          />
        </SearchForm>
      </SearchbarContainer>
    );
  }
}
