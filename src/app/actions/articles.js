import request from 'superagent';
import store from '../store';


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

const ARTICLES_END_POINT = 'http://ms-dashboard.herokuapp.com/api';

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
    return handleSuccess(
        getLocalArticle(id)
    );
}

export { loadArticle, loadArticles }
