import React from 'react';
import { addArticle } from '../actions/articles';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

const styles = {
  sidebar: {
    width: 350
  },
  sendButton: {
    marginTop: '1em'
  }
};


class ArticleForm extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.addArticle}>
        <TextField
          floatingLabelText="Enter URL for article to import"
          type="url"
          name="source_url"
          className="validate"
          id="sourceUrl"
          onChange={this.props.onChange}
        />

        <TextField
          floatingLabelText="Article Title"
          name="title"
          type="text"
          id="article-source-title"
          className="materialize-textarea"
          onChange={this.props.onChange} />

        <TextField
          floatingLabelText="Article Body"
          multiLine={true}
          name="content"
          id="article-source-text"
          className="materialize-textarea"
          onChange={this.props.onChange} />

        <RaisedButton
          label="Add Article"
          primary={true}
          type="submit"
          style={styles.sendButton} />
      </form>);
  };
}

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
      <LeftNav width={styles.sidebar.width} styles={styles.sidebar} docked={true} openRight={true} open={true}>
        <h2 className="left-align">Add article</h2>
        <ArticleForm addArticle={this.addArticle} onChange={this.onChange}/>
      </LeftNav>
    );
  }
}

ArticleAdd.propTypes = {
  addArticle: React.PropTypes.func.isRequired,
};

const mapActionsToProps = (dispatch) => {
  return {
    addArticle(article) {
      dispatch(addArticle(article));
    }
  };
};

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, mapActionsToProps)(ArticleAdd);
