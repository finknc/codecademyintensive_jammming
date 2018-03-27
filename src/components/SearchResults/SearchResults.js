import React from 'react';
import './SearchResults.css';

/*
 The TrckList component is used for displaying the list of tracks returned from
 a search query
 */
import TrackList from '../TrackList/TrackList';

// This component displays a list of tracks from a search query
class SearchResults extends React.Component {
  /**
   * Render the JSX output
   */
  render() {
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList
          tracks={this.props.searchResults}
          trackActionSymbol="+"
          trackAction={this.props.addToPlaylist} />
      </div>
    );
  }
}

export default SearchResults; // Export the SearchResults component as default
