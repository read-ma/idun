require('./styles/Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import { openNav } from '../actions';
import { screenSize, mobileOrDesktop } from '../Responsive';
import MainNavigaton from './MainNavigation';
import AppBar from 'material-ui/lib/app-bar';
import AppProgressBar from './AppProgressBar';

const styles = {
  appbar: {
    position: 'fixed',
    width: '100%',
    top: 0,
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
};

class Main extends React.Component {
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }

  render() {
    return (
      <div className={`${screenSize()} ${mobileOrDesktop()}`}>
        <AppBar
          onLeftIconButtonTouchTap={this.props.openNav}
          style={styles.appbar}
          title={this.props.topNavChildren}
          titleStyle={styles.appbar.title}
        />
        <AppProgressBar />
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated}>
          {this.props.navChildren}
        </MainNavigaton>

        <div className="col-xs-12 col-sm-10 col-md-8 main-content">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  openNav: React.PropTypes.func,
  topNavChildren: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool,
  navChildren: React.PropTypes.object,
  children: React.PropTypes.object,
  routes: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

const mapActionsToProps = dispatch => {
  return {
    openNav() {
      dispatch(openNav('left'));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
