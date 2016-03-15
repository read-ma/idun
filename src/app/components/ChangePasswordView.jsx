import React from 'react';
import { connect } from 'react-redux';
import { updatePassword, resetPassword } from '../actions/auth';
import NotificationBox from './NotificationBox';

class ChangePasswordView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      reset_password_token: props.location.query.t
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    this.setState({[event.target.name] : event.target.value});
  }

  componentDidMount(){
    if (!this.state.reset_password_token)
      this.props.dispatch(push('/Login'));
  }

  updatePassword(event){
    event.preventDefault();
    this.props.dispatch(updatePassword(this.state));
  }

  render(){
    return (
      <div>
        <h4>Change your password</h4>
        {NotificationBox(this.props.error, 'error')}
        <form onSubmit={this.updatePassword.bind(this)}>
          <label onChange={this.handleInputChange} htmlFor="password">Password<input type="password" name="password"></input></label>
          <label onChange={this.handleInputChange} htmlFor="password_confirmation">Confirm password<input type="password" name="password_confirmation"></input></label>
          <input type="submit" className="btn" value="update password" />
        </form>
      </div>);
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.auth.message,
    error: state.auth.error
  };
};

export default connect(mapStateToProps)(ChangePasswordView);
