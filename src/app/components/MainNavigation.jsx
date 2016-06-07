require('./MainNavigation.scss');
import React from 'react';
import { connect } from 'react-redux';
import Settings from './Settings';
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
import ActionReorder from 'material-ui/lib/svg-icons/action/reorder';
import SocialSchool from 'material-ui/lib/svg-icons/social/school';
import NavigationApps from 'material-ui/lib/svg-icons/navigation/apps';
import ActionSettings from 'material-ui/lib/svg-icons/action/settings';
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';

const MainNavigation = ({ logout, children, open, closeNav }) => {
  return (
    <LeftNav width={200} docked={true} open={open} style={{ padding: 0 }}>
      <AppBar title="ReadMa" showMenuIconButton={false} iconElementRight={<IconButton onClick={closeNav}><NavigationClose /></IconButton>} />
      <List>
        <ListItem primaryText="Articles" href="#/articles" leftIcon={<ActionReorder />} />
        <ListItem primaryText="Learn" href="#/learn" leftIcon={<SocialSchool />} />
        <ListItem primaryText="Words" href="#/definitions" leftIcon={<NavigationApps />} />
      </List>
      <Divider />
      {children}
      <List>
        <ListItem primaryText="Sign out" leftIcon={<ActionPowerSettingsNew />} onClick={logout} />
      </List>
    </LeftNav>
  );
};

MainNavigation.propTypes = {
  logout: React.PropTypes.func.isRequired,
  children: React.PropTypes.object,
  // displaySearchBar: React.PropTypes.bool.isRequired,
};

const mapActionsToProps = dispatch => {
  return {
    logout() { dispatch(logout()); },
    closeNav() { dispatch(closeNav('left')); }
  };
};

const mapStateToProps = state => {
  return {
    open: state.settings.navOpen.left
  }
};

export default connect(mapStateToProps, mapActionsToProps)(MainNavigation);
