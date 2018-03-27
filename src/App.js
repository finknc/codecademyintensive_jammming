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
      searchResults: [],
      playlist: [],
      playlistName: 'New Playlist'
    }

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      if(tracks) {
        this.setState({ searchResults:  tracks});
      }
    });
  }

  addTrackToPlaylist(track) {
    const currentPlaylist = this.state.playlist;
    if (currentPlaylist.indexOf(track) === -1){
      currentPlaylist.push(track);
      this.setState({ playlist: currentPlaylist });
    }
  }

  removeTrackFromPlaylist(track) {
    const currentPlaylist = this.state.playlist;
    this.setState({
      playlist: currentPlaylist.filter(tt => tt !== track)
    });
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlist);
  }

  render() {
    return (
      <div className="App">
        <SearchBar
          searchSpotify={this.searchSpotify} />
        <div className="App-playlist">
          <SearchResults
            searchResults={this.state.searchResults}
            addToPlaylist={this.addTrackToPlaylist} />
          <Playlist
            playlist={this.state.playlist}
            removeFromPlaylist={this.removeTrackFromPlaylist}
            savePlaylist={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
