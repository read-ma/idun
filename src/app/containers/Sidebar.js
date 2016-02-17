require('./Sidebar.scss');

import request from 'superagent';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, toggleHighlighting } from '../actions';
import { TTSPlayer, Wordlists, DefinitionBoxes } from '../components';
import 'lodash';

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
        this.handleSearchSubmittion = this.handleSearchSubmittion.bind(this);

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

    handleChange(event) {
        this.setState(
            Object.assign({}, this.state, {
                [event.target.name] : event.target.value
            })
        );
    }

    handleSearchSubmittion(event){

        this.props.dispatch(
            textSelected(this.state.selectedText)
        )

    }

    render() {
        return (
            <div className='sidebar'>
              <TTSPlayer selection={this.props.selectedText}/>
              <Wordlists handleSelected={this.handleSelected} wordlists={this.props.wordlists}/>
                <textarea id="selectedText" name='selectedText' onChange={this.handleChange} value={this.state.selectedText}></textarea>
                <button onClick={this.handleSearchSubmittion}>search</button>
              <DefinitionBoxes />
            </div>);
    }
}

function mapStateToProps(state){
    return {
        selectedText: state.article.selectedText,
        wordlists: state.wordlists
    };
}

export default connect(mapStateToProps)(Sidebar);
