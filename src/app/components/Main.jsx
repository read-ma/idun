require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import MainNavigaton from './MainNavigation';
import ProgressBar from './ProgressBar';
import AppBar from 'material-ui/lib/app-bar';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';


class Main extends React.Component {
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }
  render() {
    return (
      <div className="row">
        <AppBar iconElementRight={
          <IconMenu iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        } />
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated} />
        <div className="col-xs-offset-2 col-xs-10">
          {this.props.children}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Main);
