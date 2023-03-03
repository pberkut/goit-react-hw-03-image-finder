import { Component } from 'react';
import searchIcon from '../../image/search.svg';

export class Searchbar extends Component {
  state = {
    value: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSearch(this.state.value);

    this.setState({ value: '' });
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit} role="search">
          <button
            type="submit"
            className="SearchForm-button"
            aria-label="search"
            style={{ backgroundImage: `url(${searchIcon})` }}
          >
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.value}
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
