import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { loginAttempt } from '../actions/auth';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

const styles = {
  headline: {
    fontSize: 18,
    marginBottom: 12,
    fontWeight: 500,
    color: '#444'
  },
  loginButton: {
    marginRight: 10,
  },
  createAccountLink: {
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
      <form onSubmit={this.login.bind(this)} className="col-xs-12 col-md-8 col-lg-6">
        <h2 style={styles.headline}>If you already have an account, please log in</h2>
        <span className="error">{this.props.error}</span>

        <TextField
          floatingLabelText="Email address" type="email" id="email" name="email" required="true"
          fullWidth={true} onChange={this.handleFormInputChanged}
        />

        <br />

        <TextField
          floatingLabelText="Password" type="password" id="password" name="password" required="true"
          fullWidth={true} onChange={this.handleFormInputChanged}
        />

        <br />

        <RaisedButton label="Login" primary={true} type="submit" style={styles.loginButton} />
        <FlatButton label="I forgot my password" linkButton={true} href="/#/forgot_password" />

        <br /><br/>

        <h2 style={styles.headline}><Link to="sign_up">Please register</Link> if you don't have an account yet.</h2>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: React.PropTypes.func,
  error: React.PropTypes.string,
};

let mapStateToProps = (state) => {
  return {
    auth: state.auth,
    signupMessage: state.auth.signupMessage,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(Login);
