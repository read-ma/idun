import { connect } from 'react-redux';
import { updateArticlesFilter } from '../actions/articles';
import SearchInputBase from './SearchInputBase';


class ArticleSearchInput extends SearchInputBase {}

function mapStateToProps(state) {
  return {
    query: state.articlesFilter.values.query,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    onFilterChange(change) {
      dispatch(updateArticlesFilter(change));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleSearchInput);
