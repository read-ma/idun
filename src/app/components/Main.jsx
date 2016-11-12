import React from 'react';
import { connect } from 'react-redux';

import { openNav } from '../actions';
import { mobileOrDesktop } from '../Responsive';
import MainNavigaton from './MainNavigation';
import AppBar from 'material-ui/lib/app-bar';
import Notify from './shared/Notify';

class Main extends React.Component {
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }

  render() {
    return (
      <div className={`${this.props.mobileOrDesktopClass} ${this.props.sidebarOpenClass}`}>
        <AppBar
          onLeftIconButtonTouchTap={this.props.openNav}
          className="Appbar"
          title="ReadMa"
          children={this.props.topNavChildren}
        />
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated}>
          {this.props.navChildren}
        </MainNavigaton>

        <div className="col-xs-12 main-content">
          {this.props.children}
        </div>

        <Notify notifyMessage={this.props.notifyMessage} />
      </div>
    );
  }
}

Main.propTypes = {
  openNav: React.PropTypes.func,
  sidebarOpen: React.PropTypes.bool,
  topNavChildren: React.PropTypes.object,
  isAuthenticated: React.PropTypes.bool,
  navChildren: React.PropTypes.object,
  children: React.PropTypes.object,
  routes: React.PropTypes.array,
  mobileOrDesktopClass: React.PropTypes.string,
  sidebarOpenClass: React.PropTypes.string,
  notifyMessage: React.PropTypes.string,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    sidebarOpenClass: state.settings.navOpen.right ? 'sidebar-opened' : 'sidebar-closed',
    mobileOrDesktopClass: mobileOrDesktop(),
    notifyMessage: state.notifyMessage
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
