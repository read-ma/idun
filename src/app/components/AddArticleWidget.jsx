import React from 'react';
import { addArticle } from '../actions/articles';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import { connect } from 'react-redux';
import LeftNav from 'material-ui/lib/left-nav';

const styles = {
  sidebar: {
    width: 350
  },
};

const ArticleForm = ({onChange, addArticle}) => {
  return (

    <form onSubmit={addArticle}>
    <div>
      <h4 className="left-align">Add article</h4>

      <div className="input-field">
        <input
          type="url"
          name="source_url"
          className="validate"
          id="sourceUrl"
          onChange={onChange}
        />
        <label htmlFor="sourceUrl">Enter URL for article to import</label>
      </div>

      <div className="input-field hide">
        <input name="title" type="text" id="article-source-title" className="materialize-textarea" onChange={onChange}></input>
        <label htmlFor="article-source-title">Title</label>
      </div>

      <div className="input-field hide">
        <textarea name="content" id="article-source-text" className="materialize-textarea" onChange={onChange}></textarea>
        <label htmlFor="article-source-text">Article body</label>
      </div>

    </div>
    <div className="modal-footer">
      <button type="submit" className="waves-effect waves-green btn-flat">Add article</button>
    </div>
  </form>);
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
      <LeftNav width={styles.sidebar.width} styles={styles.sidebar} docked={true} openRight={true} open={true}>
        <ArticleForm />
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
