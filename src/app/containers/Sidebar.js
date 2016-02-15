require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting } from '../actions';
import { TTSPlayer, Dictionaries } from '../components';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedText: 'dupa'};

        this.handleSelected = this.handleSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            { selectedText: nextProps.selectedText }
        );
    }

    handleChange(event){
        this.props.dispatch(
            textSelected(event.target.value)
        );

        this.setState(
            Object.assign({}, this.state, {
                [event.target.name] : event.target.value
            })
        );
    }

    render() {
        return (
            <div className='sidebar'>
              <TTSPlayer selection={this.props.selectedText}/>
              <Dictionaries handleSelected={this.handleSelected} dictionaries={this.props.dictionaries}/>
              <textarea id="selectedText" name='selectedText' onChange={this.handleChange} value={this.state.selectedText}></textarea>
            </div>);
    }
}

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        dictionaries: state.dictionaries
    };
}

export default connect(mapStateToProps)(Sidebar);
