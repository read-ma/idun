import React from 'react';
import { connect } from 'react-redux';
import LinearProgress from 'material-ui/lib/linear-progress';


const style = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 999999
};



const LinearProgressExampleSimple = ({processesCounter}) => (
  <LinearProgress mode="determinate" value={processesCounter} style={style} color="blue" max="5"/>
);

const mapStateToProps = state => {
  return {
    processesCounter: state.settings.processesCounter
  };
};

export default connect(mapStateToProps)(LinearProgressExampleSimple);
