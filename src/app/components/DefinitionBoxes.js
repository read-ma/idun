import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { findWordData } from '../actions/definitions';
import classnames from 'classnames';
import _ from  'lodash';

function currentSelectionSelector(state){
    return state.article.selectedText;
}

var cachedSelection = currentSelectionSelector(store.getState());

function updateSelectionCache(selection){
    cachedSelection = selection;
}

function getCachedSelection(){
    return cachedSelection;
}

function selectionChanged(selection){
    return selection != getCachedSelection();
}

function searchingAllowed(selection){
    return selection.length < 20;
}

//TODO do not sync store on every store change
store.subscribe( () => {
    let config = store.getState().definitions.config;
    localStorage.setItem('DEFINITIONS_CONFIG', JSON.stringify(config));
});

store.subscribe( () => {
    let selection = currentSelectionSelector(store.getState());

    if (selectionChanged(selection)) {
        updateSelectionCache(selection);

        if (searchingAllowed(selection)){
            store.dispatch(findWordData(selection,'translations'));
            store.dispatch(findWordData(selection,'definitions'));
            store.dispatch(findWordData(selection,'examples'));
            store.dispatch(findWordData(selection,'graphics'));

        }
    }
});

class DefinitionBoxes extends Component {
    render(){
        var boxes = this.props.boxes
                .filter( box => !_.isEmpty(this.props.data[box.key]) )
                .map( box =>
                      <SidebarBox label={box.label} items={this.props.data[box.key]} /> );

        return (
            <div id="definitionboxes">
                {boxes}
            </div>
        );
    }
};

const LanguageIcon = ({lang}) => {
    let language = lang === 'en' ? 'gb' : lang;

    if (language)
        return (
            <span className={`left flag-icon flag-icon-${language}`}></span>
        );
    else
        return <span></span>;
};

function DefinitionListItem({text, language, url, typeOfSpeech}) {
    if (url)
        return (
            <li className="collection-item col m6 white">
              <img className="materialboxed center white" data-caption={text} src={url} alt={text} />
            </li>
        );
    else
        return (
            <li className="collection-item">
              <div className="secondary-content badge"><i className="material-icons">add</i></div>
              <LanguageIcon lang={language} />
              <div dangerouslySetInnerHTML={{__html: text}}></div>
            </li>
        );
}

class DefinitionList extends  Component {

    render() {
        var items = this.props.items
                .map( item => DefinitionListItem(Object.assign({}, item)));

        return (
            <ul className="collection with-header white">
                <li className="collection-header"><h5>{this.props.label}</h5></li>
                {items}
            </ul>
        );
    }
};

const FilterButton = ({active, name, value, onClick}) => {
    return (
        <button className={classnames({active: active})} name={name} value={value} onClick={onClick}>{value}</button>
    );
};

class SidebarBox extends Component {

    getItems() {
        return _.slice(this.props.items, 0, 10);
    }

    render() {
        return (
            <div className="card">
              <DefinitionList items={this.getItems()} label={this.props.label}/>
            </div>
        );
    }
};

function mapStateToProps(state){
    return {
        boxes: state.definitions.config,
        data: state.definitions.data
    };
}

export default connect(mapStateToProps)(DefinitionBoxes);
