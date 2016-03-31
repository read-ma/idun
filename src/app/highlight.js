function getSelectedText() {
  if(window.getSelection)
    return window.getSelection().toString();
  else if(document.getSelection)
    return document.getSelection().toString();
  else if(document.selection)
    return document.selection.createRange().text;

  return "";
};

function markWords(text, words, className) {
  if (words instanceof Array) words = words.join('|');

  return text.replace(buildRegex(words), "<mark class='"+className+"'>$1</mark>");
};

function buildRegex(words) {
  return new RegExp("\\b(" + words + ")\\b(?![^<]*>)", "gim");
};

function cleanUpHighlighting(text) {
  return text.replace(/(<mark class="[a-z]*">|<\/mark>)/igm, "");
};

// Wordlist
// {
//     enabled: boolean,
//     words: <String>[],
//     name: String
// }

function highlightText({text, wordlists}) {
  let result = text;

  wordlists.forEach((list) => {
    if (list.enabled && list.words.length > 0)
      result = markWords(result, list.words, list.name);
  });
  return result;
}


export { highlightText, getSelectedText }
