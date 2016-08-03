const pagesPatterns = {
  articles: /#\/articles/,
  home: /home/,
  login: /#\/login/
};

module.exports = {
  checkUrl: function(context, pageName) {
    context.test.assertUrlMatch(pagesPatterns[pageName], 'User is at "' + pageName + '" page');
  }
};
