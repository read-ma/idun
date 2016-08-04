import api from '../api';
import { closeNav } from '../actions';
import { push } from 'react-router-redux';

const updateArticlesFilter = (change) => {
  return {
    type: 'UPDATE_ARTICLES_FILTER',
    payload: change,
  };
};

function pageScrolled(pageId, position) {
  return {
    type: 'PAGE_SCROLLED',
    payload: { position, pageId },
  };
}

function articlesLoaded(items) {
  return {
    type: 'ARTICLES_LOADED',
    items,
  };
}

function getArticles(params, handleSuccess) {
  return api.get('/articles.json')
    .then((response) => {
      handleSuccess(response.data.articles);
    })
    .catch(err => console.log(err));
}

function loadArticles() {
  return (dispatch) => {
    getArticles({}, (items) => {
      dispatch(articlesLoaded(items));
    });
  };
}

function postArticle(article, handleSuccess, handleFail) {
  return api.post('/articles.json', { article })
    .then((response) => {
      handleSuccess(response.data);
    })
    .catch(handleFail);
}

function articleAdded() {
  return {
    type: 'ARTICLE_ADDED'
  };
}

function addArticle(article) {
  return (dispatch) => {
    postArticle(
      Object.assign({}, article, { content_type: 'article', status: 'published' }),
      () => {
        setTimeout(() => {
          dispatch(loadArticles());
        }, 1400);

        dispatch(closeNav('right'));
        dispatch(articleAdded());
      },
      (error) => {
        // TODO: Add snackbar. http://www.material-ui.com/v0.14.4/#/components/snackbar
        // 'There was a problem with adding your article'
        throw new Error(`READMA: article not added ${error.message}`);
      }
    );
  };
}

function changeArticle(articleChangeset) {
  return {
    type: 'ARTICLE_CHANGED',
    payload: articleChangeset
  };
}

function articleLoaded(article) {
  return {
    type: 'ARTICLE_LOADED',
    article,
  };
}

function deleteArticle(id) {
  return dispatch => {
    api.delete(`/articles/${id}.json`)
      .then(() => {
        dispatch(push('/articles'));
      });
  };
}

function getArticle(id, handleSuccess) {
  api.get(`/articles/${id}.json`)
    .then((response) => {
      handleSuccess(response.data.article);
    });
}

function loadArticle(articleId) {
  return (dispatch) => {
    getArticle(articleId, (article) => {
      dispatch(articleLoaded(article));
    });
  };
}

const articleLearned = (articleId) => {
  return {
    type: 'ARTICLE_LEARNED',
    payload: { articleId },
  };
};

const confirmArticleLearned = (id) => {
  return (dispatch) => {
    api.post('/article_actions.json', {
      article_action: { article_id: id, action: 'learned' }
    })
      .then(() => dispatch(articleLearned(id)))
      .catch(error => console.error(error));
  };
};

const articlePageClosed = () => {
  return {
    type: 'ARTICLE_PAGE_CLOSED',
  };
};

export {
  loadArticle,
  loadArticles,
  addArticle,
  pageScrolled,
  confirmArticleLearned,
  updateArticlesFilter,
  articlePageClosed,
  deleteArticle,
  changeArticle,
};
