import React from 'react';
import { connect } from 'react-redux';

import LinearProgress from 'material-ui/lib/linear-progress';

const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999,
  backgroundColor: 'transparent'
};

class AppProgressBar extends React.Component {
  render() {
    if (this.props.processesCounter === 0) {
      return null;
    }

    return <LinearProgress mode="indeterminate" color="#bf2a5c" style={style} />;
  }
}

AppProgressBar.propTypes = {
  processesCounter: React.PropTypes.number,
};

const mapStateToProps = state => {
  return {
    processesCounter: state.settings.processesCounter,
  };
};

export default connect(mapStateToProps)(AppProgressBar);
