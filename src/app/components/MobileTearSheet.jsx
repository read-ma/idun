import React from 'react';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

class MobileTearSheet extends React.Component {
  render() {
    const {
      prepareStyles,
    } = getMuiTheme();

    const styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
      },
      container: {
        borderTop: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.container)}>
          {this.props.children}
        </div>
        <img style={prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />
      </div>
    );
  }
}

MobileTearSheet.propTypes = {
  children: React.PropTypes.node,
  height: React.PropTypes.number,
}

MobileTearSheet.contextTypes = {
  muiTheme: React.PropTypes.object,
}

MobileTearSheet.defaultProps = {
  height: 500,
}

export default MobileTearSheet;
