import React from 'react';
import './App.css';

import { SearchBar } from './components/SearchBar/SearchBar';
import { TrackList } from './components/TrackList/TrackList';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
        <div className="SearchResults">
          <h2>Results</h2>
          <TrackList trackActionSymbol="+" />
        </div>
          <div className="Playlist">
            <input defaultValue="New Playlist" />
            <TrackList trackActionSymbol="-" />
            <a className="Playlist-save">SAVE TO SPOTIFY</a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
