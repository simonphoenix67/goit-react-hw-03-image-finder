import { Component } from 'react';
// import '../../index.css';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  search = e => {
    e.preventDefault();
    this.props.getInputValue(this.state.input);
    this.setState({ input: '' });
  };

  handleChange = e => {
    this.setState({ input: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm"  onSubmit={this.search} >
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            name="input"
            type="text"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.input}
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
