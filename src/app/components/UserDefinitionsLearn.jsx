import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
import FlashcardsQuiz from './FlashcardsQuiz';
import FlashcardsQuizResults from './FlashcardsQuizResults';
import _ from 'lodash';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

function mapStateToProps(state) {
  return { items: state.main.userDefinitions };
}

class UserDefinitionsLearn extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
    this.startQuizForArticle = this.startQuizForArticle.bind(this);
    this.endQuiz = this.endQuiz.bind(this);
    this.closeResults = this.closeResults.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      loadUserDefinitions()
    );
  }

  startQuizForArticle(articleId) {
    this.setState({ items: this.props.items.filter(item => item.article_id === parseInt(articleId, 10)) });
  }

  endQuiz() {
    this.setState({
      showResults: true,
    });
  }

  closeResults() {
    this.setState({
      showResults: false,
      items: [],
    });
  }

  shouldShowQuiz() {
    return this.state.items.length > 0 && !this.state.showResults;
  }

  shouldShowResults() {
    return this.state.showResults;
  }

  renderArticles() {
    const articles = {};
    this.props.items.map(item => articles[item.article_id] = item.article_title);
    const articlesCount = _.countBy(this.props.items, 'article_id');
    if (!this.shouldShowQuiz() && !this.shouldShowResults()) {
      return (
        <div>
          <h1>Learn words used in recently read articles</h1>
          <p>Click on article title to enter quiz from an article.</p>
          <List>
            {Object.keys(articles).map(id => {
              return (
                <ListItem key={id} onClick={this.startQuizForArticle.bind(null, id)}
                  leftAvatar={
                    <Avatar
                      color={Colors.pinkA200} backgroundColor={Colors.transparent}
                      style={{left: 8}}>
                      {articlesCount[id]}
                    </Avatar>
                  }
                  rightIcon={<NavigationChevronRight />}
                >
                  {articles[id]}
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    }
  }

  renderEmptyMessage() {
    return (
      <div className="col-xs-12">
        <h1>Here will be words to practice once you add them on article</h1>
      </div>
    );
  }

  renderLearnPart() {
    return (
      <div className="col-xs-12">
        <div className="flashcards-container">
          <FlashcardsQuiz items={this.state.items} endQuiz={this.endQuiz} show={this.shouldShowQuiz()} />
          <FlashcardsQuizResults items={this.state.items} show={this.shouldShowResults()} closeResults={this.closeResults} />
        </div>
        <div>
          {this.renderArticles()}
        </div>
      </div>
    )
  }

  render() {
    return this.props.items.length > 0 ? this.renderLearnPart() : this.renderEmptyMessage();
  }
}

export default connect(mapStateToProps)(UserDefinitionsLearn);
