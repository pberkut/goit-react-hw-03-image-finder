export const Searchbar = onSubmit => (
  <header className="Searchbar">
    <form className="SearchForm">
      <button type="SearchForm-button" className="button">
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
