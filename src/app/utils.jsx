import React from 'react';
import { connect } from 'react-redux';
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "push" }] */
import { push } from 'react-router-redux';

export function requireAuthentication(Component) {
  class AuthenticatedComponent extends React.Component {

    componentWillMount() {
      this.checkAuth(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.checkAuth(nextProps);
    }

    checkAuth(props) {
      if (!props.isAuthenticated) {
        let redirectAfterLogin = props.location.pathname;
        this.context.router.push(`/login?next=${redirectAfterLogin}`);
      }
    }

    render() {
      if (this.props.isAuthenticated) {
        return (<div><Component {...this.props}/></div>);
      }
      return false;
    }
  }

  AuthenticatedComponent.contextTypes = {
    router: React.PropTypes.object
  };

  AuthenticatedComponent.propTypes = {
    isAuthenticated: React.PropTypes.bool
  };

  const mapStateToProps = (state) => ({
    auth_token: state.auth.auth_token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  });

  return connect(mapStateToProps)(AuthenticatedComponent);
}
