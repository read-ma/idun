require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import MainNavigaton from './MainNavigation';
import ProgressBar from './ProgressBar';
import AppBar from 'material-ui/lib/app-bar';

class Main extends React.Component {
  displaySearchBar() {
    return this.props.routes && this.props.routes[this.props.routes.length-1].displaySearchBar;
  }
  render() {
    return (
      <div className="row center-xs">
        <AppBar />
        <MainNavigaton displaySearchBar={this.displaySearchBar()} isAuthenticated={this.props.isAuthenticated} />
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}

export default connect(mapStateToProps)(Main);
