import React from 'react';
import './Track.css';

/*
 The component displays infirmation about a track and can ad or remove itself
 from the playlist
 */
class Track extends React.Component {
  constructor(props) {
    super(props);

    // We bind the handler for the trackAction to be able to use this in the method
    this.handleTrackAction = this.handleTrackAction.bind(this);
  }

  /**
   * Handles the trackAction
   * @param {object} event The event that calls the method0
   */
  handleTrackAction(event) {
    // Call the method given in the props
    this.props.trackAction(this.props.track);
    /*
     We call the preventDefault method on the event to prevent the default
     event from being triggered
     */
    event.preventDefault();
  }

  /**
   * Renders the JSX output of the track
   */
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.title}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        <a
          onClick={this.handleTrackAction}
          className="Track-action">{this.props.trackActionSymbol}</a>
      </div>
    );
  }
}

export default Track; // Export the Track component as default
