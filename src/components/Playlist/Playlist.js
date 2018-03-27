import React from 'react';
import './Playlist.css';

/*
 The TrckList component is used for displaying the list of tracks that has been
 added to the playlist
 */
import TrackList from '../TrackList/TrackList';

// This component displays and handles the playlist
class Playlist extends React.Component {
  constructor(props) {
    super(props);

    // Bind the method so 'this' can be used
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  /**
   * Handles the change of the name of the playlist
   * @param {object} event The event that triggers the name change
   */
  handleNameChange(event) {
    // Call the method given in the 'props' with the new value
    this.props.changePlaylistName(event.target.value);
  }

  /**
   * Render the JSX output of the playlist
   */
  render() {
    return (
      <div className="Playlist">
        <input
          value={this.props.playlistName}
          onChange={this.handleNameChange} />
        <TrackList
          tracks={this.props.playlist}
          trackActionSymbol="-"
          trackAction={this.props.removeFromPlaylist} />
        <a
          className="Playlist-save"
          onClick={this.props.savePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist; // Export the Playlist component as default
