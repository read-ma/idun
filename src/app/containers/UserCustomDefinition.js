import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { textSelected, saveUserDefinition} from '../actions';
import { DefinitionBoxes } from '../components';


class UserCustomDefinitionForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            word: props.selectedText,
            collapsed: true
        };

        this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
        this.search = this.search.bind(this);
        this.toggleForm = this.toggleForm.bind(this);
        this.saveUserDefinition = this.saveUserDefinition.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            { word: nextProps.selectedText }
        );
    }

    search(event){
        event.preventDefault();

        if (!event.keyCode || event.keyCode === 13)
            this.props.dispatch( textSelected(this.state.word) );
    }

    handleFormInputChanged(event) {
        this.setState(
            Object.assign({}, this.state, {[event.target.name] : event.target.value})
        );
    }

    toggleForm(){
        this.setState(
            Object.assign({}, this.state, {collapsed: !this.state.collapsed})
        );
    }

    saveUserDefinition(event){
        event.preventDefault();
        this.props.dispatch(saveUserDefinition(this.state));
    }

    render() {
        return (
                <div className="box-body white">
                    <div className="row" onSubmit={this.search}>
                        <form>
                            <div className='input-field col s12'>
                                <button className='btn-floating waves-effect waves-light left' onClick={this.search}><i className="small material-icons">search</i></button>
                                <button className='btn-floating waves-effect waves-light left' onClick={this.toggleForm}><i className="small material-icons">add</i></button>
                            </div>
                            <div className='input-field col s12 center-align'>
                                <input type='text' placeholder='selection' name='word' onKeyUp={this.search} onChange={this.handleFormInputChanged} value={this.state.word} />
                            </div>
                            <span className={classnames({hidden: this.state.collapsed})}>
                                <div className='input-field col s12 center-align'>
                                    <textarea className='materialize-textarea' name='translation' placeholder='translation' onChange={this.handleFormInputChanged} value={this.state.translation}></textarea>
                                </div>

                                <div className='input-field col s12 center-align'>
                                    <textarea className='materialize-textarea' name='definition' placeholder='definition' onChange={this.handleFormInputChanged} value={this.state.definition}></textarea>
                                </div>

                                <div className='input-field col s12 center-align'>
                                    <input type='text' name='tags' placeholder='tags' onChange={this.handleFormInputChanged} value={this.state.tags} />
                                </div>
                                <div className='input-field col s12'>
                                    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.saveUserDefinition}>
                                        Save you definition
                                        <i className="material-icons">send</i>
                                    </button>
                                </div>
                            </span>
                        </form>
                    </div>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        selectedText: state.article.selectedText
    };
}


export default connect(mapStateToProps)(UserCustomDefinitionForm);
