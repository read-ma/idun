import request from 'superagent';
import store from './store';

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
        console.log('loadArticle', articleId);
        dispatch(articleLoaded(getArticle(articleId)));
    };
}

function articleLoaded(article){
    return {
        type: 'ARTICLE_LOADED',
        article: article
    };
}

export {loadArticles, loadArticle}

const ARTICLES_END_POINT = 'http://localhost:3000/api/articles.json';

function getArticles(params, handleSuccess){
    return request
        .get(ARTICLES_END_POINT).accept('application/json')
        .end((err, response) => {
            if (err) console.log(err);
            handleSuccess(response.body.articles);
        });
}

function getArticle(id) {
    return store.getState().articles.filter((article) => { return article.id == id;})[0];
}
