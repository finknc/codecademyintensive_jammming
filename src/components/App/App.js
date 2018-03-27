import React from 'react';
import './App.css';
import Spotify from '../../util/Spotify';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

// This component is the main entry of our app
class App extends React.Component {
  /**
   * Create a new instance of the App Component
   */
  constructor(props) {
    super(props);

    // Initialize the state values of the component
    this.state = {
      searchResults: [],
      playlist: [],
      playlistName: 'New Playlist'
    }

    // Bind the methods so we can use 'this' as a reference to the App component
    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlaylist = this.addTrackToPlaylist.bind(this);
    this.removeTrackFromPlaylist = this.removeTrackFromPlaylist.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.changePlaylistName = this.changePlaylistName.bind(this);
  }

  /**
   * Search for tracks in the Spotify API
   * @param {str} term The search term
   */
  searchSpotify(term) {
    // Call the search function from the Spotify object given the 'term' as input
    Spotify.search(term).then(tracks => {
      /*
       If the search was succesfull then we set the 'searchResults' in the state
       to the returned tracks
       */
      if(tracks) {
        this.setState({ searchResults:  tracks});
      }
    });
  }

  /**
   * Add a new track to the playlist
   * @param {object} track An object with all information about a track
   */
  addTrackToPlaylist(track) {
    // First, we check if the track is already present in the playlist
    let trackIsInList = false;
    const currentPlaylist = this.state.playlist;
    currentPlaylist.forEach(tt => {
      if (tt.id === track.id) {
        trackIsInList = true;
      }
    })
    // If the track was not found in the playlist then we add id
    if (!trackIsInList){
      currentPlaylist.push(track);
      this.setState({ playlist: currentPlaylist });
    }
  }

  /**
   * Remove a track from the playlist
   * @param {object} track The track to remove from the playlist
   */
  removeTrackFromPlaylist(track) {
    const currentPlaylist = this.state.playlist;
    this.setState({
      playlist: currentPlaylist.filter(tt => tt.id !== track.id)
    });
  }

  /**
   * Save the playlist to the user's Spotify account
   */
  savePlaylist() {
    /*
     Call the 'savePlaylist' function from the Spotify object with the playlist
     name and the tracks in the playlist as the input
     */
    Spotify.savePlaylist(this.state.playlistName, this.state.playlist).then(result => {
      // If the request was succesfull then we reset the playlist
      if (result) {
        this.setState({
          playlistName: 'New Playlist',
          playlist: []
        })
      }
    });
  }

  /**
   * Change the name of the playlist
   * @param {str} newName The new name of the playlist
   */
  changePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  /**
   * Renders the JSX output
   */
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

export default App; // Export the App component as the default
