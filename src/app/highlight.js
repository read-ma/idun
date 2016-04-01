function getSelectedText() {
  if(window.getSelection)
    return window.getSelection().toString();
  else if(document.getSelection)
    return document.getSelection().toString();
  else if(document.selection)
    return document.selection.createRange().text;

  return "";
};

export { getSelectedText }
