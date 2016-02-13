require('./Main.scss');
import React from 'react';
import { Link } from 'react-router';

const Main = ({children, history}) => {
    return (
        <div className="main-container">
          <Navigator />
          <div className="container">
            {children}
          </div>
        </div>
    );
};

const Navigator = () => {
    return (
        <nav className="navbar navbar-default" role="navigation">
          <Link to='/'>Home</Link>
          <a href="#/profile">Profile</a>
          <Link to='/articles'>Articles</Link>
        </nav>
    );
};

export default Main;
