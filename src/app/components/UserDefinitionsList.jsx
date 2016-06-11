import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
import TextField from 'material-ui/lib/text-field';
import UserDefinitionBox from './UserDefinitionBox';


function mapStateToProps(state) {
  return { items: state.main.userDefinitions };
}

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
    this.props.dispatch(
      loadUserDefinitions()
    );
  }

  render() {
    const items = this.state.items.map(item => <UserDefinitionBox key={item} item={item} />);

    return (
      <div>
        <div className="row">
          <div className="col-xs-4 col-xs-offset-1">
            <TextField hintText="Quick Search..." onChange={this.handleFilterChange} />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            {items}
          </div>
        </div>
      </div>
    );
  }
}

UserDefinitionsList.propTypes = {
  items: React.PropTypes.array,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(UserDefinitionsList);
