require('./Main.scss');
import React from 'react';

const Main = ({children, history}) => {
  return (
    <div className="main-container">
      <nav className="navbar navbar-default" role="navigation">
        <a href="#/">Home</a> 
        <a href="#/profile">Profile</a>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default Main;
