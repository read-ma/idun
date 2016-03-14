import React from 'react';
import { connect } from 'react-redux';
import { resetPassword } from '../actions/auth';

class PasswordReminder extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.handleInputChange = this.handleInputChange.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
  }

  handleInputChange(event){
    this.setState({[event.target.name] : event.target.value});
  }

  resetPassword(event){
    event.preventDefault();
    this.props.onSubmit(this.state.email);
  }

  render(){
    console.log(this.props);
    return (<div className="card">
      <h4 className="green-text">{this.props.message}</h4>
      <form className="card-content" onSubmit={this.resetPassword}>
      <input onChange={this.handleInputChange} name="email" type="email" placeholder="Your email" required="required"/>
      <input type="submit" className="btn" onClick={this.props.resetPassword} value='Remind me my password' />
      </form>
    </div>);
  }
};

class PasswordReminderViewBase extends React.Component {
  resetPassword(email){
    this.props.dispatch(
      resetPassword(email));
  }
  render() {
    return (<PasswordReminder message={ this.props.message } onSubmit={this.resetPassword.bind(this)}/>);
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.auth.message
  };
};

export default connect(mapStateToProps)(PasswordReminderViewBase);
