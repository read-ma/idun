require('./styles/MainNavigation.scss');
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { closeNav } from '../actions';

import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';

// Icons
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import MapLocalLibrary from 'material-ui/lib/svg-icons/maps/local-library';
import SocialSchool from 'material-ui/lib/svg-icons/social/school';
import SocialPerson from 'material-ui/lib/svg-icons/social/person';
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';

const MainNavigation = ({ children, open, closeNavbar, logoutAction }) => {
  return (
    <LeftNav width={200} docked={true} open={open} style={{ padding: 0 }}>
      <AppBar title="ReadMa" showMenuIconButton={false} iconElementRight={
        <IconButton onClick={closeNavbar}><NavigationClose /></IconButton>}
      />
      <List>
        <ListItem primaryText="Home" href="#/home" leftIcon={<ActionHome />} />
        <ListItem primaryText="Articles" href="#/articles" leftIcon={<MapLocalLibrary />} />
        <ListItem primaryText="Learn" href="#/learn" leftIcon={<SocialSchool />} />
        <ListItem primaryText="My Profile" href="#/my_profile" leftIcon={<SocialPerson />} />
      </List>
      <Divider />
      {children}
      <List>
        <ListItem id="signOutButton" primaryText="Sign out" leftIcon={<ActionPowerSettingsNew />} onClick={logoutAction} />
      </List>
    </LeftNav>
  );
};

MainNavigation.propTypes = {
  logoutAction: React.PropTypes.func.isRequired,
  children: React.PropTypes.object,
  open: React.PropTypes.bool,
  closeNavbar: React.PropTypes.func,
};

const mapStateToProps = state => {
  return {
    open: state.settings.navOpen.left
  };
};

const mapActionsToProps = dispatch => {
  return {
    logoutAction() {
      dispatch(logout());
    },
    closeNavbar() {
      dispatch(closeNav('left'));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(MainNavigation);
