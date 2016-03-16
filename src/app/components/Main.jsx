require('./Main.scss');
import React from 'react';
import { connect } from 'react-redux';
import MainNavigaton from './MainNavigation'

class Main extends React.Component {

  render() {
    return (
      <div>
        <MainNavigaton isAuthenticated={this.props.isAuthenticated} />
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
