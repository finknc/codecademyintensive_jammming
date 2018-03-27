import React from 'react';
import './TrackList.css';

// console.log(require('util').inspect(, { depth: null }));mport the Track component as this is used for each track that is displayed
import Track from '../Track/Track';

// This component displays a list of tracks
class TrackList extends React.Component {
  /**
   * Render the JSX output of the list of tracks
   */
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => {
          return (
            <Track
              key={track.id}
              track={track}
              trackActionSymbol={this.props.trackActionSymbol}
              trackAction={this.props.trackAction} />
          );
        })}
      </div>
    );
  }
}

export default TrackList; // Export the TrackList component as default
