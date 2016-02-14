import { loadArticles, loadArticle } from './articles';

function textSelected(text) {
    return {
        type: 'TEXT_SELECTED',
        text: text
    };
};

function toggleHighlighting(dictionary) {
    return {
        type: 'TOGGLE_HIGHLIGHTING',
        dictionary: dictionary
    };
}

export { loadArticles, loadArticle, textSelected, toggleHighlighting }
