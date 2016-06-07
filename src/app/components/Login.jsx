import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loginAttempt } from '../actions/auth';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';
import Divider from 'material-ui/lib/divider';


const styles = {
  tabTitle: {
    fontWeight: 700,
  },
  headline: {
    fontSize: 20,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 500,
  },
  loginButton: {
    marginRight: 10,
  },
  createAccountLink: {
    marginBottom: 10,
    marginTop: 10,
  },
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
  }

  handleFormInputChanged(event) {
    this.setState(
      Object.assign({}, this.state, { [event.target.name]: event.target.value })
    );
  }

  login(event) {
    event.preventDefault();
    this.props.dispatch(
      loginAttempt(this.state.email, this.state.password)
    );
  }

  render() {
    return (
      <Paper zDepth={2} className="col-xs-10">
        <h2 style={styles.headline}>If you already have an account, please log in</h2>
        <span className="error">
         {this.props.error}
        </span>

        <form onSubmit={this.login.bind(this)}>

          <TextField
            floatingLabelText="Your email address"
            type="email"
            id="email"
            name="email"
            required="true"
            onChange={this.handleFormInputChanged}
          />

          <br style={{ marginBottom: '1em' }} />

          <TextField
            floatingLabelText="Enter your password"
            type="password"
            id="password"
            name="password"
            require="true"
            onChange={this.handleFormInputChanged}
          />
          <br />

          <RaisedButton label="Login" primary={true} type="submit" style={styles.loginButton} />

          <Link to="forgot_password">I forgot my password</Link>

          <Divider />
          <Link to="sign_up" style={styles.createAccountLink}>Create account</Link>

        </form>
      </Paper>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signupMessage: state.auth.signupMessage,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(Login);
