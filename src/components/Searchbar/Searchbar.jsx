import searchIcon from '../../image/search.svg';

export const Searchbar = onSubmit => (
  <header className="Searchbar">
    <form className="SearchForm">
      <button
        type="submit"
        className="SearchForm-button"
        aria-label="search"
        style={{ backgroundImage: `url(${searchIcon})` }}
      >
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);
