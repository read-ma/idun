require('./Main.scss');
import React from 'react';
import { Link } from 'react-router';

const Main = ({children, history}) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <a href="#/">Home</a>
        <a href="#/profile">Profile</a>
        <Link to='/'>Home</Link>
        <Link to='/articles'>Articles</Link>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Main;
