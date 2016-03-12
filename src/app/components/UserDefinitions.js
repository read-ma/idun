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
            <div className="userdefinitionbox card col m3" key={this.props.item.id}>
              <div className='card-content row'>
                <span className='card-title blue-text'>{this.props.item.word}</span>
                <div className='translation'>{this.props.item.translation}</div>
                <div className='definition'>{this.props.item.definition}</div>
              </div>
              <div className="row">
                <a className="btn">Easy></a>
                <a className="btn">Middle</a>
                <a className="btn">Hard</a>
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
              <input type='search' onChange={this.handleFilterChange} name='word' placeholder='quick search...'/>
              <div className="row">
                {items}
              </div>
            </div>

        );
    }
}

export default connect(mapStateToProps)(UserDefinitions);
