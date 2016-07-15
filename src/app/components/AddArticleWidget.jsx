import React from 'react';
import { connect } from 'react-redux';
import { addArticle } from '../actions/articles';
import { closeNav } from '../actions';
import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';

import AppBar from 'material-ui/lib/app-bar';

const styles = {
  sidebar: {
    width: 350,
  },
  articleForm: {
    padding: '20px',
  },
  sendButton: {
    marginTop: '1em',
    fontWeight: 600
  }
};


class ArticleForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.addArticle} style={styles.articleForm}>

        <fieldset>
          <legend>Import from link</legend>

          <TextField
            floatingLabelText="Copy & paste link to the article"
            type="url"
            name="source_url"
            className="validate"
            id="sourceUrl"
            onChange={this.props.onChange}
          />
          <RaisedButton
            label="Import"
            primary={true}
            type="submit"
            style={styles.sendButton} />

        </fieldset>

        <br />

        <fieldset>
          <legend>Create new</legend>
          <TextField
            floatingLabelText="Article title"
            name="title"
            type="text"
            id="article-source-title"
            className="materialize-textarea"
            onChange={this.props.onChange} />

          <TextField
            floatingLabelText="Article body"
            multiLine={true}
            name="content"
            id="article-source-text"
            className="materialize-textarea"
            onChange={this.props.onChange} />

          <RaisedButton
            label="Save"
            primary={true}
            type="submit"
            style={styles.sendButton} />
        </fieldset>
      </form>);
  }
}

ArticleForm.propTypes = {
  addArticle: React.PropTypes.func,
  onChange: React.PropTypes.func
};

class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { article: {} };
    this.addArticle = this.addArticle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { article: Object.assign(
          {},
          this.state.article, { [e.target.name]: e.target.value }) }));
  }

  addArticle(event) {
    event.preventDefault();
    this.props.addArticle(this.state.article);
  }

  render() {
    return (
      <LeftNav width={styles.sidebar.width} styles={styles.sidebar} docked={true} openRight={true} open={this.props.open}>
        <AppBar title="Add article" iconElementLeft={<IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton>} />
        <ArticleForm addArticle={this.addArticle} onChange={this.onChange}/>
      </LeftNav>
    );
  }
}

ArticleAdd.defaultProps = {
  open: false
};

ArticleAdd.propTypes = {
  addArticle: React.PropTypes.func.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    closeNav() {
      dispatch(
        closeNav('right'));
    },
    addArticle(article) {
      dispatch(addArticle(article));
    }
  };
};

function mapStateToProps({ settings }) {
  return {
    open: settings.navOpen.right,
};
}

export default connect(mapStateToProps, mapActionsToProps)(ArticleAdd);
