require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import MainNavigaton from './MainNavigation'

class Main extends React.Component {
  logout(){
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        <MainNavigaton isAuthenticated={this.props.isAuthenticated} handleLogout={this.logout.bind(this)}/>
        <main className="container">
          <div className="section">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
};

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Main);
