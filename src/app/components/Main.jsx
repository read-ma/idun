require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import MainNavigaton from './MainNavigation';

class Main extends React.Component {
  //TODO redesign views, remove searchbar from the layout
  //it's a dirty hack
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }
  render() {
    return (
      <div>
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated} />
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
  };
}

export default connect(mapStateToProps)(Main);
