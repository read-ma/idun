import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
import UserDefinitionCard from './UserDefinitionCard';
import TextField from 'material-ui/lib/text-field';
import GridList from 'material-ui/lib/grid-list/grid-list';

class UserDefinitionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items
    });
  }

  handleFilterChange(event) {
    this.setState({
      items: this.props.items.filter((item) => {
        return [item.word, item.translation, item.definition].join(' ').match(event.target.value);
      })
    });
  }

  componentDidMount() {
    this.props.loadUserDefinitions();
  }

  render() {
    const items = this.state.items
                      .slice(0, 30)
                      .map(item => <UserDefinitionCard key={item.id} item={item} />);

    return (
      <div> {items} </div>
    );
  }
}

UserDefinitionsList.propTypes = {
  items: React.PropTypes.array,
  loadUserDefinitions: React.PropTypes.func,
};

const mapActionsToProps = (dispatch) => {
  return {
    loadUserDefinitions: () => dispatch(loadUserDefinitions())
  };
};

function mapStateToProps(state) {
  return { items: state.main.userDefinitions };
}

export default connect(mapStateToProps, mapActionsToProps)(UserDefinitionsList);
