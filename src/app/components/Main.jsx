require('./Main.scss');
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

class Main extends React.Component {

  logout(){
    this.props.dispatch(logout());
  }

  render() {
    return (
      <div>
        <Navigator isAuthenticated={this.props.isAuthenticated} handleLogout={this.logout.bind(this)}/>
        <main className="container">
          <div className="section">
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
};

const Navigator = (props) => {
  return (
    <div className="navbar-fixed">
      <nav className="white">
        <div className="nav-wrapper container">

          {/* FIXME 1: "Navigator" Placeholder #1 */}

          <ul className="left hide-on-med-and-down">
            <li><Link to='/articles'>Articles</Link></li>
            <li><Link to='/profile'>Learn</Link></li>
          </ul>

          {/* why the fuck isnt it just working like a normal piece of shit cocksucker */}
          {/* if (props.isAuthenticated) */}
          <ul className="right">
            <li><a onClick={props.handleLogout}><i className="material-icons">power_settings_new</i></a></li>
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link to='/articles'>Articles</Link></li>
          </ul>

          <form className="right s10 m8 l6">
            <div className="input-field">
              <input id="search" type="search" required />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
    </div>
  );
};

$(document).ready(function(){
  $(".button-collapse").sideNav({ closeOnClick: true });
});

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(Main);
