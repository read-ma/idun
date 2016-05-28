require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import MainNavigaton from './MainNavigation';
import ProgressBar from './ProgressBar';
import AppBar from 'material-ui/lib/app-bar';
import { logout } from '../actions/auth';
import { openNav } from '../actions';

import SelectedTextInput from './SelectedTextInput';
import {screenSize} from '../Responsive';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
  appbar: {
    position: 'fixed',
    width: '100%'
  },
  articleslist: {
    paddingTop: 64
  }
}

class Main extends React.Component {
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }

  render() {

    return (
      <div className={`row ${screenSize()}`}>
        <AppBar
          onLeftIconButtonTouchTap={this.props.openNav}
          style={styles.appbar}
          title={this.props.topNavChildren}
          titleStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated}>
          {this.props.navChildren}
        </MainNavigaton>
        <div className="col-xs-10" style={styles.articleslist}>
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

const mapActionsToProps = dispatch => {
  return {
    openNav() { dispatch(openNav('left')); }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Main);
