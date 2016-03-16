import { Link } from 'react-router';
import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import Settings from './Settings';

const MainNavigation = (props) => {
  return (
    <div className="navbar-fixed">
      <nav className="white row">
        <div className="nav-wrapper container" style={{position: 'relative'}}>
          {/* FIXME 1: "Navigator" Placeholder #1 */}
          <ul className="left hide-on-med-and-down">
            <li><Link to='/articles'>Articles</Link></li>
            <li><Link to='/profile'>Learn</Link></li>
          </ul>

          {/* why the fuck isnt it just working like a normal piece of shit cocksucker */}
          {/* if (props.isAuthenticated) */}
          <ul className="right">
            <Settings />
          </ul>

          <ul className="side-nav" id="mobile-demo">
            <li><Link to='/profile'>Learn</Link></li>
            <li><Link to='/articles'>Articles</Link></li>
          </ul>

          <form className="right col s4">
            <div className="input-field">
              <input id="search" type="search" required defaultValue="Search or translate" />
              <label htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons" title="Read phrase">play_arrow</i>
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

export default MainNavigation;
