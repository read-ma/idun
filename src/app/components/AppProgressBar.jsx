import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';


const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999
};

const LinearProgressExampleSimple = ({processesCounter, max}) => (
  <LinearProgress mode="determinate" value={processesCounter} color="#bf2a5c" style={style} max={max} />
);

const mapStateToProps = state => {
  return {
    processesCounter: state.settings.processesCounter,
    max: 5
  };
};

export default connect(mapStateToProps)(LinearProgressExampleSimple);
