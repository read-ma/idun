import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pageScrolled } from '../actions/articles';
import ls from '../localStore.js';

class PositioningWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
    window.setTimeout(this.restorePosition.bind(this), 800);
  }

  restorePosition() {
    let newPosition = this.props.positions[this.props.pageId] || 0;
    window.scrollTo(0, newPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);

    this.props.pageScrolled(this.props.pageId, this.state.position);
    this.props.synchLocalStorage('PAGE_POSITIONS', this.props.positions);
  }

  handleScroll(event) {
    let target = event.target || event.srcElement;
    this.setState({ position: target.body.scrollTop });
  }

  render() {
    return false;
  }
}

PositioningWidget.propTypes = {
  pageId: React.PropTypes.string.isRequired,
  positions: React.PropTypes.object,
  pageScrolled: React.PropTypes.func,
  synchLocalStorage: React.PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    positions: state.settings.articlePositions
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageScrolled(id, position) {
      dispatch(pageScrolled(id, position));
    },
    synchLocalStorage(key, value) {
      ls.set(key, JSON.stringify(value));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(PositioningWidget);
