require('./styles/Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadArticles } from '../actions/articles';
import PositioningWidget from './PositioningWidget';
import ArticleLink from './ArticleLink';
import ArticlesToolbar from './ArticlesToolbar';
import filterArticles from '../articleCriteriaMatcher';
import AddArticleWidget from './AddArticleWidget';
import AddArticleFloatingButton from './AddArticleFloatingButton';

import List from 'material-ui/lib/lists/list';

const ArticleList = ({ articles }) => {
  const articleLinks = articles.map((article) => {
    return new ArticleLink(article);
  });

  return <List className="articles">{articleLinks}</List>;
};

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired,
};

class Articles extends Component {
  componentDidMount() {
    this.props.loadArticles();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      articles: filterArticles(nextProps.articles, nextProps.filter),
    });
  }

  render() {
    return (
      <div>
        <ArticlesToolbar />
        <PositioningWidget pageId="article-list-page" />
        <ArticleList articles={this.props.articles} />
        <AddArticleWidget />
        <AddArticleFloatingButton />
      </div>
    );
  }
}

Articles.propTypes = {
  loadArticles: React.PropTypes.func.isRequired,
  filter: React.PropTypes.object.isRequired,
  articles: React.PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter,
  };
}


const mapActionsToProps = (dispatch) => {
  return {
    loadArticles() {
      dispatch(loadArticles());
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Articles);
