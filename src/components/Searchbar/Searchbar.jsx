import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [search, setSearch] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  const searchResult = event => {
    setSearch(event.currentTarget.value);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.Search}>
        <button className={css.SearchFormButton} type="submit">
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          name="query"
          className={css.SearchFormInput}
          type="text"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
          value={search}
          onChange={searchResult}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
