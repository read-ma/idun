import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadUserDefinitions } from '../actions';
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
  }

  componentDidMount() {
    this.props.dispatch(
      loadUserDefinitions()
    );
  }

  startQuizForArticle(articleId) {
  }

  renderArticles() {
    const articles = {};
    this.props.items.map(item => articles[item.article_id] = item.article_title);
    const articlesCount = _.countBy(this.props.items, 'article_id');
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
                    style={{ left: 8 }}
                  >
                    {articlesCount[id]}
                  </Avatar>
                }
                rightIcon={<NavigationChevronRight />}
                href={`#/learn/${id}`}
              >
                {articles[id]}
              </ListItem>
            );
          })}
        </List>
      </div>
    );
  }

  renderEmptyMessage() {
    return (
      <div className="col-xs-12">
        <h1>Please add words to learn from article</h1>
      </div>
    );
  }

  // <FlashcardsQuiz items={this.state.items} endQuiz={this.endQuiz} show={this.shouldShowQuiZ()} />
  // <FlashcardsQuizResults items={this.state.items} show={this.shouldShowResults()} closeResults={this.closeResults} />

  render() {
    return this.props.items.length > 0 ? this.renderArticles() : this.renderEmptyMessage();
  }
}

UserDefinitionsLearn.propTypes = {
  items: React.PropTypes.array,
};


export default connect(mapStateToProps)(UserDefinitionsLearn);
