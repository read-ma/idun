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

            store.dispatch(findWordData(selection,'translations', {from:'en', to: 'pl'}));
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
            <div className='row'>
                <div className='col s12'>
                    {boxes}
                </div>
            </div>
        );
    }
};

function DefinitionListItem({text, language, url}) {
    if (url)
        return (
            <tr>
                <td><img className="materialboxed" data-caption={text} width="100%" src={url} alt={text} /></td>
            </tr>
        );
    else
        return (
            <tr>
                <td><div dangerouslySetInnerHTML={{__html: text}}></div></td>
            </tr>
        );
}

class DefinitionList extends  Component {

    render() {
        var items = this.props.items
                .map( item => DefinitionListItem(Object.assign({}, item)));

        return (
            <div className="col s12">
                <table className="responsive-table bordered">
                    <tbody>
                        {items}
                    </tbody>
                </table>
                <br />
                <button className="btn waves-effect waves-light right">
                    More / Less
                    <i className="material-icons right">play_for_work</i>
                </button>
            </div>
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
                <div className="card-content teal lighten-2">
                    <span className="card-title">{this.props.label}</span>
                </div>
                <div className="card-action">
                    <DefinitionList items={this.props.items} />
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
