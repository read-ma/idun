require('./Sidebar.scss');

import request from 'superagent';
import classnames from 'classnames';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleHighlighting } from '../actions';
import { TTSPlayer } from '../components';

const Dictionaries = ({dictionaries, handleSelected}) => {
    let buttons = dictionaries.map((dict) => {
        return <button className={classnames({active: dict.enabled})} name={dict.name} onClick={handleSelected}>{dict.name}</button>;
    });
    return (<div> {buttons} </div>);
};

class Sidebar extends Component {

    handleSelected(event){
        this.props.dispatch(
            toggleHighlighting(event.target.name)
        );
    }

    render() {
        return (
            <div className='sidebar'>
              <h3>{this.props.selectedText}</h3>
              <TTSPlayer selection={this.props.selectedText}/>
              <Dictionaries handleSelected={this.handleSelected.bind(this)} dictionaries={this.props.dictionaries}/>
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
