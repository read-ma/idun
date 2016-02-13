function getSelectedText() {
    if(window.getSelection)
        return window.getSelection().toString();
    else if(document.getSelection)
        return document.getSelection().toString();
    else if(document.selection)
        return document.selection.createRange().text;

    return "";
};

function highlightSearch(text, words, className) {
    return text.replace(buildRegex(words.join('|')), "<mark class='"+className+"'>$1</mark>");
};

function buildRegex(words) {
    return new RegExp("\\b(" + words + ")\\b(?![^<]*>)", "gim");
};

function cleanUpHighlighting(text) {
    return text.replace(/(<mark class="[a-z]*">|<\/mark>)/igm, "");
};

export { highlightSearch, getSelectedText }
