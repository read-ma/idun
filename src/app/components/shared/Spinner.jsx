import React from 'react';
import { spinnerColors } from './Colors';
import CircularProgress from 'material-ui/lib/circular-progress';

const Spinner = ({ styles, size, color }) => {
  const style = Object.assign({}, styles, {
    margin: '10px'
  });

  const spinnerColor = spinnerColors[color] || spinnerColors.default;

  return <CircularProgress size={size} style={style} color={spinnerColor}/>;
};

Spinner.defaultProps = {
  size: 2
};

Spinner.propTypes = {
  styles: React.PropTypes.object,
  size: React.PropTypes.number.isRequired,
  color: React.PropTypes.string
};

export default Spinner;
