import React from 'react';
import './Playlist.css';

import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.changePlaylistName(event.target.value);
  }

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
