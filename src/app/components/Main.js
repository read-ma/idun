require('./Main.scss');
import React from 'react';
import { Link } from 'react-router';

class Main extends React.Component {
    render() {
        return (
            <div>
              <Navigator />
              <main className="container">
                <div className="section">
                  {this.props.children}
                </div>
              </main>
              {/*<Footer />*/}
            </div>
        );
    }
};

const Navigator = () => {
    return (
        <nav className="white">
            <div className="nav-wrapper container">
                <a href="/" className="black-text right">BETA | Language Assistant | Tutor | Coach | BETA</a>
                <a href="#" data-activates="mobile-demo" className="button-collapse">
                    <i className="material-icons teal-text">menu</i>
                </a>
                <ul className="left hide-on-med-and-down">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/articles'>Articles</Link></li>
                    <li><Link to='/profile'>Learn</Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link to='/articles'>Articles</Link></li>
                </ul>
            </div>
        </nav>
    );
};

$(document).ready(function(){
    $(".button-collapse").sideNav({ closeOnClick: true });
})

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
