import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';

function mapStateToProps(state) {
  return {
    items: state.main.userDefinitions
  };
}

class UserDefinitionBox extends Component {
  handleMouseOver(event) {
  }

  render() {
    return (
      <div className="userdefinitionbox card-item" key={this.props.item.id}>
        <div className='card-content'>
          <h5 className='card-title blue-text'>{this.props.item.word}</h5>
          <h6 className='card-subtitle'>{this.props.item.translation}</h6>
          <div className='card-description'>{this.props.item.definition}</div>
        </div>
      </div>
    );
  }
}

class UserDefinitions extends Component {
  constructor(props) {
    super(props);
    this.state = { items: props.items };
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps){
    this.setState({ items: nextProps.items });
  }

  handleFilterChange(event) {
    this.setState({
      items: this.props.items.filter((item) => {
        return [item.word, item.translation, item.definition].join(' ').match(event.target.value);
      })
    });
  }

  componentDidMount(){
    this.props.dispatch(
      loadUserDefinitions()
    );
  }

  render(){
    let items =  this.state.items.map( item => <UserDefinitionBox item={item}/>);


    return (

      <div className="articles">
        <form className="row">
          <div className="input-field col s4">
            <input type='text' onChange={this.handleFilterChange} name='word' />
            <label htmlFor="word">Quick search...</label>
          </div>
        </form>
        <div className="cards-container row">
          {items}
        </div>
      </div>

    );
  }
}

export default connect(mapStateToProps)(UserDefinitions);
