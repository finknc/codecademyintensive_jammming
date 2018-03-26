import React from 'react';
import './TrackList.css';

import { Track } from '../Track/Track';

export class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              id={track.id}
              track={track}
              trackActionSymbol={this.props.trackActionSymbol} />
          );
        })}
      </div>
    );
  }
}
