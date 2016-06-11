import React, { Component } from 'react';
import { connect } from 'react-redux';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import { toggleHighlighting } from '../actions';
import { Wordlists } from '../components';
import { isMobile } from '../Responsive';
import LanguageSelection from './LanguageSelection';
import { ShowIf } from '../components';

const styles = {
  toolbar: {}
}

class ArticleToolbar extends Component {
  render() {
    return (
      <Toolbar style={styles.toolbar} className="articles-toolbar">
        <Wordlists handleSelected={this.props.showDictMatchingWords} wordlists={this.props.wordlists} />

        <ShowIf condition={!isMobile()}>
          <LanguageSelection />
        </ShowIf>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    wordlists: state.wordlists.filter((wl) => wl.toggable),
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    showDictMatchingWords(event) {
      dispatch(
        toggleHighlighting(event.target.name)
      );
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleToolbar);
