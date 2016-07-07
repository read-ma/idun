import React, { Component } from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999
};

class AppProgressBar extends Component {
  constructor(props) {
    super(props);
    this.processesCounter = props.processesCounter;
    this.max = props.max;
  }

  render() {
    if (this.processesCounter === 0) {
      console.log('There are no processes in queue. Not showing progress bar.')
      return null;
    }

    return <LinearProgress mode="determinate" value={this.processesCounter} color="#bf2a5c" style={style} max={this.max} />;
  }
}

AppProgressBar.propTypes = {
  processesCounter: React.PropTypes.number,
  max: React.PropTypes.number,
};

const mapStateToProps = state => {
  return {
    processesCounter: state.settings.processesCounter,
    max: 5
  };
};

export default connect(mapStateToProps)(AppProgressBar);
