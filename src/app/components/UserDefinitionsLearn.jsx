import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDecks } from '../actions';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Colors from 'material-ui/lib/styles/colors';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';

function mapStateToProps(state) {
  return { decks: state.decks };
}

class UserDefinitionsLearn extends Component {
  constructor(props) {
    super(props);
    this.startQuizForArticle = this.startQuizForArticle.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(
      loadDecks()
    );
  }

  startQuizForArticle() {}

  renderArticles() {
    return (
      <div>
        <h1>Learn words used in recently read articles</h1>
        <p>Click on article title to enter quiz from an article.</p>
        <List>
          {this.props.decks.map((deck) => {
            return (
              <ListItem key={deck.id} onClick={this.startQuizForArticle.bind(null, deck.id)}
                leftAvatar={
                  <Avatar
                    color={Colors.pinkA200} backgroundColor={Colors.transparent}
                    style={{ left: 8 }}
                  >
                    {deck.count}
                  </Avatar>
                }
                rightIcon={<NavigationChevronRight />}
                href={`#/learn/${deck.id}`}
              >
                {deck.name}
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

  render() {
    return this.props.decks && this.props.decks.length > 0 ? this.renderArticles() : this.renderEmptyMessage();
  }
}

UserDefinitionsLearn.propTypes = {
  decks: React.PropTypes.array,
  dispatch: React.PropTypes.func
};


export default connect(mapStateToProps)(UserDefinitionsLearn);
