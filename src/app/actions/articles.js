import request from 'superagent';
import store from '../store';
import Config from 'Config';
import api from '../api';

function articlesLoaded(items) {
    return {
        type: 'ARTICLES_LOADED',
        items: items
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

const ARTICLES_END_POINT = Config.apiUrl + '/articles.json';

function getArticles(params, handleSuccess){
    let articles = store.getState().articles;

    if (articles.length >0) {
        return handleSuccess(articles);
    }
    return request
        .get(ARTICLES_END_POINT).accept('application/json')
        .end((err, response) => {
            if (err) console.log(err);
            handleSuccess(response.body.articles);
        });
}

function getLocalArticle(id) {
    return store.getState().articles.filter((article) => {
        return article.id == id;})[0];
}

function getArticle(id, handleSuccess) {
    if (getLocalArticle(id))
        return handleSuccess( getLocalArticle(id) );
    else {
        api.get(`/articles/${id}.json`)
            .then( (response) => {
                handleSuccess(response.data.article);
            });
    };
}

export { loadArticle, loadArticles }
