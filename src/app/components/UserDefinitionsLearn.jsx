import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadDecks } from '../actions';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import { flashcardsColors } from './shared/Colors';
import NavigationChevronRight from 'material-ui/lib/svg-icons/navigation/chevron-right';
import Label from './shared/Label';

function mapStateToProps(state) {
  return { decks: state.decks };
}

const styles = {
    listItem: {
      lineHeight: '145%',
      fontSize: 25,
      fontWeight: 300
    },
    secondaryText: {
      height: '20px',
      lineHeight: '22px'
    }
  };

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
                style={styles.listItem}
                secondaryText={<div><Label type="difficulty" text={deck.count} /></div>}
                rightIcon={<NavigationChevronRight />}
                leftIcon={<i className="material-icons">assignment</i>}
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
