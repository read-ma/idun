import { connect } from 'react-redux';
import { textSelected } from '../actions';
import SearchInputBase from './SearchInputBase';

class WordSearchInput extends SearchInputBase {}

function mapStateToProps(state) {
  return {
    query: state.article.selectedText,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    onFilterChange(change) {
      dispatch(
        textSelected(change.query));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(WordSearchInput);
