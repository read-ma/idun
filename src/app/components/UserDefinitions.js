import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';

function mapStateToProps(state) {
    return {
        items: state.main.userDefinitions
    };
}

function UserDefinitionRow({id, word, translation, definition}) {
    return (
        <tr key={id}>
          <td className='word'>{word}</td>
          <td className='translation'>{translation}</td>
          <td className='definition'>{definition}</td>
        </tr>
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
        return (
            <table>
              <thead>
                <tr>
                  <td colSpan='3'>
                    <input type='search' onChange={this.handleFilterChange} name='word' placeholder='quick search...'/></td>
                </tr>
              </thead>
              <tbody>
                {this.state.items.map( (item) => {
                    return UserDefinitionRow(item);
                })}
              </tbody>
            </table>

        );
    }
}

export default connect(mapStateToProps)(UserDefinitions);
