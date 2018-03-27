import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';

import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

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
    this.changePlaylistName = this.changePlaylistName.bind(this);
  }

  searchSpotify(term) {
    Spotify.search(term).then(tracks => {
      if(tracks) {
        this.setState({ searchResults:  tracks});
      }
    });
  }

  addTrackToPlaylist(track) {
    let trackIsInList = false;
    const currentPlaylist = this.state.playlist;
    currentPlaylist.forEach(tt => {
      if (tt.id === track.id) {
        trackIsInList = true;
      }
    })
    if (!trackIsInList){
      currentPlaylist.push(track);
      this.setState({ playlist: currentPlaylist });
    }
  }

  removeTrackFromPlaylist(track) {
    const currentPlaylist = this.state.playlist;
    this.setState({
      playlist: currentPlaylist.filter(tt => tt.id !== track.id)
    });
  }

  savePlaylist() {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlist).then(result => {
      if (result) {
        this.setState({
          playlistName: 'New Playlist',
          playlist: []
        })
      }
    });
  }

  changePlaylistName(newName) {
    this.setState({ playlistName: newName });
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
            playlistName={this.state.playlistName}
            playlist={this.state.playlist}
            changePlaylistName={this.changePlaylistName}
            removeFromPlaylist={this.removeTrackFromPlaylist}
            savePlaylist={this.savePlaylist} />
        </div>
      </div>
    );
  }
}

export default App;
