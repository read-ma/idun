import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadDecks } from '../actions';
import Label from './shared/Label';

import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import ActionAssignment from 'material-ui/lib/svg-icons/action/assignment';
import _ from 'lodash';
import { truncate } from 'lodash/truncate';
import { uniq } from 'lodash/uniq';

function mapStateToProps(state) {
  return { decks: state.decks };
}

class UserDefinitionsLearn extends Component {
  componentDidMount() {
    this.props.dispatch(
      loadDecks()
    );
  }

  renderArticles() {
    return (
      <div>
        <List>
          {this.props.decks.map((deck) => {
            return (
              <ListItem key={deck.id}
                className="UserDefinitionsLearn-ListItem"
                secondaryText={<div className="UserDefinitionsLearn-SecondaryText">
                  <Label type="difficulty" text={ `${deck.count} words to learn` } />
                  from {_.truncate(deck.name, { length: 65 })}
                </div>}
                rightIcon={<NavigationChevronRight />}
                leftIcon={<ActionAssignment />}
                href={`#/learn/${deck.id}`}
              >
                {_.truncate(_.uniq(deck.words).join(', '), { length: 40 })}
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
