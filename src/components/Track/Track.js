import React from 'react';

export class Track extends React.Component {
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>Stronger</h3>
          <p>Britney Spears | Oops!... I Did It Again</p>
        </div>
        <a className="Track-action">{this.props.trackActionSymbol}</a>
      </div>
    );
  }
}
