import store from '../store';
import Config from 'Config';
import api from '../api';

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
    });
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

export { loadArticle, loadArticles, addArticle }
