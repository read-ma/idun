import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { loadTranslation, loadDefinitions, loadPictures } from '../actions/definitions';
import classnames from 'classnames';
import 'lodash';

function currentSelectionSelector(state){
    return state.article.selectedText;
}

var cachedSelection = currentSelectionSelector(store.getState());

function onSelectionChanged(selection){
        store.dispatch(loadTranslation(selection, {from:'en', to: 'pl'}));
        store.dispatch(loadPictures(selection));
        store.dispatch(loadDefinitions(selection));
};


store.subscribe( () => {
    if (cachedSelection != currentSelectionSelector(store.getState())){
        cachedSelection = currentSelectionSelector(store.getState());

        onSelectionChanged(currentSelectionSelector(store.getState()));
    }
});

class DefinitionBoxes extends Component {
    render(){
        var boxes = this.props.boxes
                .filter( box => !_.isEmpty(this.props.data[box.key]) )
                .map( box =>
                      <SidebarBox label={box.label} items={this.props.data[box.key]} /> );

        return (<div>{boxes}</div>);
    }
};

function DefinitionListItem({text, language, url}) {
    if (url)
        return (
            <li>
              <img src={url} alt={text} />
            </li>
        );
    else
        return (
            <li>
              <span dangerouslySetInnerHTML={{__html: text}}></span>
            </li>
        );
}

class DefinitionList extends  Component {

    render() {
        var items = this.props.items
                .map( item => DefinitionListItem(Object.assign({}, item)));

        return (
            <span>
              <ul>
                {items}
              </ul>
            </span>);
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
            <div>
              <h3>
                {this.props.label}
              </h3>

              <DefinitionList items={this.props.items} />
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
