import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { closeNav } from '../actions';
import { ShowIf } from '../components';

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
import ActionBook from 'material-ui/lib/svg-icons/action/book';
import ActionPowerSettingsNew from 'material-ui/lib/svg-icons/action/power-settings-new';
import ContentAddCircle from 'material-ui/lib/svg-icons/content/add-circle';
import NavigationArrowForward from 'material-ui/lib/svg-icons/navigation/arrow-forward';

const MainNavigation = ({ children, open, closeNavbar, logoutAction, authenticated }) => {
  return (
    <LeftNav width={200} docked={true} open={open}>
      <AppBar title="ReadMa" showMenuIconButton={false} iconElementRight={
        <IconButton onClick={closeNavbar}><NavigationClose /></IconButton>}
      />
      <List>
        <ListItem primaryText="Home" href="#/home" leftIcon={<ActionHome />} />
        <ListItem primaryText="Articles" href="#/articles" leftIcon={<MapLocalLibrary />} />
        <ListItem primaryText="Flashcards" href="#/learn" leftIcon={<SocialSchool />} />
        <ShowIf condition={authenticated}>
          <ListItem primaryText="Dictionary" href="#/definitions" leftIcon={<ActionBook />} />
        </ShowIf>
        <ShowIf condition={authenticated}>
          <ListItem primaryText="My Profile" href="#/profile" leftIcon={<SocialPerson />} />
        </ShowIf>
      </List>
      <Divider />
      {children}
      <List>
        <ShowIf condition={authenticated}>
          <ListItem id="signOutButton" primaryText="Sign out" leftIcon={<ActionPowerSettingsNew />} onClick={logoutAction} />
        </ShowIf>
        <ShowIf condition={!authenticated}>
          <ListItem primaryText="Sign up" href="#/sign_up" leftIcon={<ContentAddCircle />} />
        </ShowIf>
        <ShowIf condition={!authenticated}>
          <ListItem id="loginButton" primaryText="Login" href="#/login" leftIcon={<NavigationArrowForward />} />
        </ShowIf>
      </List>
    </LeftNav>
  );
};

MainNavigation.propTypes = {
  logoutAction: React.PropTypes.func.isRequired,
  children: React.PropTypes.object,
  open: React.PropTypes.bool,
  closeNavbar: React.PropTypes.func,
  authenticated: React.PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    open: state.settings.navOpen.left,
    authenticated: state.auth.isAuthenticated
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
