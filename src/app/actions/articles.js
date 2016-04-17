import store from '../store';
import Config from 'Config';
import api from '../api';

const updateArticlesFilter = (change) => {
  return {
    type: 'UPDATE_ARTICLES_FILTER',
    payload: change
  };
};

function pageScrolled(pageId, position){
  return {
    type: 'PAGE_SCROLLED',
    payload: {position,pageId}
  };
};

function articlesLoaded(items) {
  return {
    type: 'ARTICLES_LOADED',
    items: items
  };
}

function addArticle({source_url}) {
  return (dispatch) => {
    postArticle(
      source_url,
      (article) => { Materialize.toast('Article will be added to list after a short while', 6000); },
      (error) => {
        Materialize.toast('There was a problem with adding your article', 6000);
        throw new Error('READMA: article not added' + error.message);
      }
    );
  };
}

function loadArticles() {
  return (dispatch) => {
    getArticles({}, (items) => {
      dispatch(articlesLoaded(items));
    });
  };
};

function loadArticle(articleId){
  return (dispatch) => {
    getArticle(articleId, (article) => { dispatch(articleLoaded(article)); });
  };
}

function articleLoaded(article){
  return {
    type: 'ARTICLE_LOADED',
    article: article
  };
}

function getArticles(params, handleSuccess){
  return api.get('/articles.json')
    .then((response) => {
      handleSuccess(response.data.articles);
    })
    .catch(err => console.log(err));
}

function getArticle(id, handleSuccess) {
  api.get(`/articles/${id}.json`)
    .then( (response) => {
      handleSuccess(response.data.article);
    });
}

function postArticle(source_url, handleSuccess, handleFail) {
  return api.post('/articles.json', {article: {content_type: 'article', source_url: source_url}})
    .then( (response) => {handleSuccess(response.data);})
    .catch(handleFail);
}

const confirmArticleLearned = (id) => {
  return (dispatch) => {
    api.post(`/article_actions.json`, {article_action: {article_id: id, action: 'learned'}})
      .then(response => dispatch(articleLearned(id)))
      .catch(error => console.log(error));
  };
};

const articleLearned = (articleId) => {
  return {
    type: 'ARTICLE_LEARNED',
    payload: {articleId}
  };
};

export { loadArticle, loadArticles, addArticle, pageScrolled, confirmArticleLearned, updateArticlesFilter }
