import React from 'react';
import { connect } from 'react-redux';
import { addArticle, changeArticle } from '../actions/articles';
import { closeNav } from '../actions';
import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import colors from 'material-ui/lib/styles/colors';
import { ShowIf } from '../components';
import Toggle from 'material-ui/lib/toggle';
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
  },
  fieldset: {
    borderColor: colors.grey300,
    borderStyle: 'solid',
  }
};

class ArticleForm extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle (event, value) {
    event.target.value = value;
    this.props.onChange(event);
  }

  isPublic () {
    return this.props.article.public === "true";
  }

  render() {
    return (
      <form onSubmit={this.props.addArticle} style={styles.articleForm}>
        <fieldset style={styles.fieldset}>
          <legend>Import from link</legend>

          <TextField
            floatingLabelText="Copy & paste link to the article"
            type="url"
            name="source_url"
            className="validate"
            id="sourceUrl"
            onChange={this.props.onChange}
            value={this.props.article.source_url}
          />

          <ShowIf condition={this.props.isAdmin}>
            <Toggle label="Publish to everyone" labelPosition="right" name="public" onToggle={this.onToggle} toggled={this.isPublic()} />
          </ShowIf>
 
          <RaisedButton
            label="Import"
            primary={true}
            type="submit"
            style={styles.sendButton} />

        </fieldset>

        <br />

        <fieldset style={styles.fieldset}>
          <legend>Create new</legend>
          <TextField
            floatingLabelText="Article title"
            name="title"
            type="text"
            id="article-source-title"
            className="materialize-textarea"
            onChange={this.props.onChange} 
            value={this.props.article.title}
          />

          <TextField
            floatingLabelText="Article body"
            multiLine={true}
            name="content"
            id="article-source-text"
            className="materialize-textarea"
            onChange={this.props.onChange}
            value={this.props.article.content}
          />

          <ShowIf condition={this.props.isAdmin}>
            <Toggle label="Publish to everyone" labelPosition="right" name="public" onToggle={this.onToggle} toggled={this.isPublic()} />
          </ShowIf>

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
  onChange: React.PropTypes.func,
  isAdmin: React.PropTypes.bool,
  article: React.PropTypes.object,
};

class ArticleAdd extends React.Component {
  constructor(props) {
    super(props);
    this.addArticle = this.addArticle.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.changeArticle({ [e.target.name]: e.target.value });
  }

  addArticle(event) {
    event.preventDefault();
    this.props.addArticle(this.props.article);
  }

  render() {
    return (
      <LeftNav width={styles.sidebar.width} styles={styles.sidebar} docked={true} openRight={true} open={this.props.open}>
        <AppBar title="Add article" iconElementLeft={<IconButton onClick={this.props.closeNav}><NavigationClose /></IconButton>} />
        <ArticleForm addArticle={this.addArticle} onChange={this.onChange} isAdmin={this.props.isAdmin} article={this.props.article}/>
      </LeftNav>
    );
  }
}

ArticleAdd.defaultProps = {
  open: false
};

ArticleAdd.propTypes = {
  addArticle: React.PropTypes.func.isRequired,
  changeArticle: React.PropTypes.func.isRequired,
  closeNav: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool,
  isAdmin: React.PropTypes.bool,
  article: React.PropTypes.object.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    closeNav() {
      dispatch(
        closeNav('right'));
    },
    addArticle(article) {
      if (!article.public) {
        dispatch({ type: article.source_url ? 'IMPORT_ARTICLE' : 'ADD_ARTICLE' });
      }
      dispatch(addArticle(article));
    },
    changeArticle(changeset) {
      dispatch(
        changeArticle(changeset)
      );
    }
  };
};

function mapStateToProps(state) {
  return {
    open: state.settings.navOpen.right,
    isAdmin: state.auth.isAdmin,
    article: state.articleForm,
  };
}

export default connect(mapStateToProps, mapActionsToProps)(ArticleAdd);
