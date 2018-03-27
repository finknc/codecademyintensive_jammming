import React from 'react';
import './SearchBar.css';

// This component handles the search bar
class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    // Initialize the 'term' in the state to be empty
    this.state = { term: '' }

    // Bind the methods so we can access 'this' inside the methods
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  /**
   * Handles the change in the search term
   * @param {object} event The event that triggers the handler
   */
  handleTermChange(event) {
    // Update the state according to the value change
    this.setState({
      term: event.target.value
    })
  }

  /**
   * Handles the search when the user press 'SEARCH'
   * @param {object} event The event that triggers the search0
   */
  handleSearch(event) {
    // Call the method to search Spotify given in the props
    this.props.searchSpotify(this.state.term);
    /*
     We call the preventDefault method on the event to prevent the default
     event from being triggered
     */
    event.preventDefault();
  }

  /**
   * Render the JSX output
   */
  render() {
    return (
      <div className="SearchBar">
        <input
          onChange={this.handleTermChange}
          placeholder="Enter your search term" />
        <a onClick={this.handleSearch}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar; // Export eh SearchBar component as default
