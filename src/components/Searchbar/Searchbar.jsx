import React, { useState } from 'react';

export const Searchbar = ({ getInputValue }) => {
  const [input, setInput] = useState('');

  const search = (e) => {
    e.preventDefault();
    getInputValue(input);
    setInput('');
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={search}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          name="input"
          type="text"
          autoComplete="off"
          onChange={handleChange}
          value={input}
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
