require('./Articles.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadArticles } from '../actions/articles';
import PositioningWidget from './PositioningWidget';
import ArticleLink from './ArticleLink';
import filterArticles from '../articleCriteriaMatcher';

import List from 'material-ui/lib/lists/list';
import Paper from 'material-ui/lib/paper';

const ArticleList = ({ articles }) => {
  const articleLinks = articles.map((article) => {
    return new ArticleLink(article);
  });

  return (
    <List>{articleLinks}</List>
  );
};

ArticleList.propTypes = {
  articles: React.PropTypes.array.isRequired,
}

class Articles extends Component {

  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props);
  }

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
        <PositioningWidget pageId="article-list-page" />
        <ArticleList articles={this.state.articles} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    filter: state.articlesFilter.values,
  };
}

Articles.propTypes = {
  loadArticles: React.PropTypes.func.isRequired,
  filter: React.PropTypes.object.isRequired,
  articles: React.PropTypes.array.isRequired,
}

const mapActionsToProps = (dispatch) => {
  return {
    loadArticles(){
      dispatch(loadArticles());
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(Articles);
