import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { findWordData } from '../actions/definitions';
import classnames from 'classnames';
import 'lodash';

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

store.subscribe( () => {
    let selection = currentSelectionSelector(store.getState());

    if (selectionChanged(selection)) {
        updateSelectionCache(selection);

        if (searchingAllowed(selection)){
            store.dispatch(findWordData(selection,'translations', store.getState().settings.language));
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
            <div>
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
            <li className="collection-item">
              <img className="materialboxed" data-caption={text} src={url} alt={text} />
            </li>
        );
    else
        return (
            <li className="collection-item">
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
            <ul className="collection with-header">
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

    render() {
        return (
            <div className="card">
              <div className="collapsed">
                <DefinitionList items={this.props.items} label={this.props.label}/>
              </div>
              <div className="card-action">
                <a>
                  More / Less <i className="material-icons">play_for_work</i>
                </a>
              </div>
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
