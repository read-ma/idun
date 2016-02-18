import React, { Component } from 'react';
import { connect } from 'react-redux';
import { textSelected, saveUserDefinition} from '../actions';

class UserCustomDefinitionForm extends Component {
    constructor(props){
        super(props);
        this.state = {word: props.selectedText};

        this.handleFormInputChanged = this.handleFormInputChanged.bind(this);
        this.submit = this.submit.bind(this);
        this.saveUserDefinition = this.saveUserDefinition.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            { word: nextProps.selectedText }
        );
    }

    submit(event){
        if (!event.keycode || event.keycode === 13)
            this.props.dispatch( textSelected(this.state.word) );
    }

    handleFormInputChanged(event) {
        this.setState(
            Object.assign({}, this.state, {[event.target.name] : event.target.value})
        );
    }

    saveUserDefinition(event){
        event.preventDefault();
        this.props.dispatch(saveUserDefinition(this.state));
    }

    render() {
        return (
            <div className='userCustomDefinition'>
              <form>
                <fieldset>
                  <textarea name='word' onKeyUp={this.submit} onChange={this.handleFormInputChanged} value={this.state.word}></textarea>
                  <textarea name='translation' placeholder='translation' onChange={this.handleFormInputChanged} value={this.state.translation}></textarea>
                  <textarea name='definition' placeholder='definition' onChange={this.handleFormInputChanged} value={this.state.definition}></textarea>
                  <textarea name='tags' placeholder='tags' onChange={this.handleFormInputChanged} value={this.state.tags}></textarea>

                  <input type='submit' onClick={this.saveUserDefinition} />
                </fieldset>
              </form>
            </div>

        );
    }
}

function mapStateToProps(state) {
    return {
        selectedText: state.article.selectedText
    }
}


export default connect(mapStateToProps)(UserCustomDefinitionForm);
