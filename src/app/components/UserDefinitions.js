import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';

function mapStateToProps(state) {
    return {
        items: state.main.userDefinitions
    };
}

function UserDefinition({id, word, translation, definition}) {
    return (
        <div className="card col m3" key={id}>
          <div className='card-content'>
            <span className='card-title blue-text'>{word}</span>
            <div className='translation'>{translation}</div>
            <div className='definition'>{definition}</div>
          </div>
        </div>
    );
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
        let items =  this.state.items.map( (item) => {
            return UserDefinition(item);
        });

        return (

            <div>
              <input type='search' onChange={this.handleFilterChange} name='word' placeholder='quick search...'/>
              <div className="row">
                {items}
              </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(UserDefinitions);
