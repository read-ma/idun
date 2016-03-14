import store from '../store';
import Config from 'Config';
import api from '../api';

function articlesLoaded(items) {
  return {
    type: 'ARTICLES_LOADED',
    items: items
  };
}

function addArticle({url}) {
  return (dispatch) => {
    postArticle(
      url,
      (article) => { Materialize.toast('Article will be loaded in couple of minutes', 4000)},
      (error) => {
        Materialize.toast('There was a problem with adding article', 4000);
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
  let articles = store.getState().articles;

  if (articles.length >0) {
    return handleSuccess(articles);
  }
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

function postArticle(url, handleSuccess, handleFail) {
  return api.post('/articles.json', {article: {url: url}})
    .then( (response) => {handleSuccess(response.data)})
    .catch( (error) => { handleFail(error)});
}

export { loadArticle, loadArticles, addArticle }
