import React from 'react';
import './App.css';
import Spotify from './util/Spotify';

import { SearchBar } from './components/SearchBar/SearchBar';
import { SearchResults } from './components/SearchResults/SearchResults';
import { Playlist } from './components/Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchResult: Spotify.search(),
      playList: []
    }
  }
  render() {
    return (
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults searchResult={this.state.searchResult} />
          <Playlist playList={this.state.playList} />
        </div>
      </div>
    );
  }
}

export default App;
