require('./ProgressBar.scss');
import React from 'react';
import { connect } from 'react-redux';
import classnames  from 'classnames';

const ProgressBar = ({ processing }) => {
  return <div className={classnames('progress progress-loader', { hide: !processing })}><div className="indeterminate"></div> </div>;
};

const mapStateToProps = (state) => {
  return {
    processing: state.settings.processesCounter > 0
  };
};

export default connect(mapStateToProps)(ProgressBar);
