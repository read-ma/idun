import React from 'react';
import {connect} from 'react-redux';
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
            return (
                <div>
                    {this.props.isAuthenticated === true
                        ? <Component {...this.props}/>
                        : null
                    }
                </div>
            );

        }
    }

    AuthenticatedComponent.contextTypes = {
        router: React.PropTypes.object
    };

    const mapStateToProps = (state) => ({
        auth_token: state.auth.auth_token,
        userName: state.auth.userName,
        isAuthenticated: state.auth.isAuthenticated
    });

    return connect(mapStateToProps)(AuthenticatedComponent);

}
