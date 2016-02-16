require('./Main.scss');
import React from 'react';
import { Link } from 'react-router';

const Main = ({children, history}) => {
    return (
        <div>
            <Navigator />
            <main className="container">
                <div className="section">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};

const Navigator = () => {
    return (
        <nav className="white">
            <div className="nav-wrapper container">
                <a href="#!" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><Link to='/'>Home</Link></li>
                    <li><a href="#/profile">Profile</a></li>
                    <li><Link to='/articles'>Articles</Link></li>
                </ul>
            </div>
        </nav>
    );
};

const Footer = () => {
    return (
        <footer className="page-footer teal">
            <div className="container">
                <div className="row">
                    <div className="col s12">
                        <h5 className="white-text">Links:</h5>
                        <ul className="left hide-on-med-and-down">
                            <li><Link to='/'>Home</Link></li>
                            <li><a href="#/profile">Profile</a></li>
                            <li><Link to='/articles'>Articles</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Main;
