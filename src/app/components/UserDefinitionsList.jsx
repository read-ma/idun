import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
import UserDefinitionCard from './UserDefinitionCard';
import { deleteUserDefinition } from '../actions';

class UserDefinitionsList extends Component {

  componentDidMount() {
    if (this.props.items.length === 0) {
      this.props.loadUserDefinitions();
    }
  }

  render() {
    const items = this.props.items
                      .map(item => <UserDefinitionCard key={item.id} item={item} onDelete={this.props.delete.bind(null, item)} />);

    return <div className="row"> {items} </div>;
  }
}

UserDefinitionsList.propTypes = {
  items: React.PropTypes.array,
  loadUserDefinitions: React.PropTypes.func,
  delete: React.PropTypes.func,
};

const mapActionsToProps = (dispatch) => {
  return {
    loadUserDefinitions: () => dispatch(loadUserDefinitions()),
    delete: function(definition) {
      dispatch(deleteUserDefinition(definition));
    }
  };
};

function mapStateToProps(state) {
  return {
    items: state.main.userDefinitions
  };
}

export default connect(mapStateToProps, mapActionsToProps)(UserDefinitionsList);
