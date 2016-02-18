require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting } from '../actions';
import { TTSPlayer, Wordlists, DefinitionBoxes } from '../components';

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedText: '',

            boxes: [
                {label: 'Definitions', component: 'SimpleList'},
                {label: 'Translations', component: 'SimpleList'},
                {label: 'Related Words', component: 'SimpleList'},
                {label: 'Pictures', component: 'PictureList'},
            ]
        };

        this.handleSelected = this.handleSelected.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

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
            <aside className='sidebar'>
              <TTSPlayer selection={this.props.selectedText}/>
              <Wordlists handleSelected={this.handleSelected} wordlists={this.props.wordlists}/>
              <textarea id="selectedText" name='selectedText' onChange={this.handleChange} value={this.state.selectedText}></textarea>
              <DefinitionBoxes />
            </aside>);
    }
}

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists
    };
}

export default connect(mapStateToProps)(Sidebar);
