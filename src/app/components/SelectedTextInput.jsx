import React from 'react';
import TTSPlayer from '../components/TTSPlayer';
import { textSelected } from '../actions';
import { connect } from 'react-redux';

class SelectedTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text };
    this.triggerSearch = this.triggerSearch.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyUp = this.handleInputKeyUp.bind(this);
    this.timeout = null;
  }

  componentWillReceiveProps({ text }) {
    this.setState({ text });
  }

  handleInputChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleInputKeyUp() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.triggerSearch, 1000);
  }

  triggerSearch(event) {
    if (event) {
      event.preventDefault();
    }

    this.props.search(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.triggerSearch} className="right col s8 m4 main-navigation">
        <div className="input-field black-text">
          <input id="search" className="search-input" type="search" required name="text"
            value={this.state.text}
            onKeyUp={this.handleInputKeyUp}
            onChange={this.handleInputChange}
          />
          <label htmlFor="search"><i className="material-icons grey-text">search</i></label>
          <TTSPlayer />
        </div>
      </form>
    );
  }
}

SelectedTextInput.propTypes = {
  text: React.PropTypes.string.isRequired,
  search: React.PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    text: state.article.selectedText,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    search(text) {
      if (text) {
        dispatch(textSelected(text));
      }
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(SelectedTextInput);
