import React, {Component,PropTypes} from 'react';
import {connect} from 'react-redux';
import {pageScrolled} from '../actions/articles';
import ls from '../localStore.js';

class PositioningWidget extends Component {
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }
  componentDidMount(){
    console.log('widget mouted');
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps(nextProps){
    console.log('widget props', nextProps.article, this.props.article);
    if (nextProps.article && nextProps.article != this.props.article)
      this.restorePagePosition();
  }

  restorePagePosition() {
    console.log('restoring page position');
    let y = this.props.positions[this.props.pageId] || 0;
    window.scrollTo(0,y);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.props.synchLocalStorage('PAGE_POSITIONS', this.props.positions);
  }

  handleScroll(event){
    let target = event.target || event.srcElement;
    this.props.pageScrolled(this.props.pageId, target.body.scrollTop);
  }

  render(){
    return false;
  }
}

PositioningWidget.propTypes = {
    pageId: PropTypes.string,
    positions: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    positions: state.settings.articlePositions,
    article: state.article.id
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    pageScrolled(id, position) {
      dispatch(pageScrolled(id, position));
    },
    synchLocalStorage(key, value){
     ls.set(key, JSON.stringify(value));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(PositioningWidget);
