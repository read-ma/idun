import React from 'react';

import { Home, Main, Articles, ArticlePage, UserDefinitionsLearn, UserDefinitionsList } from '../components';
import Login from '../components/Login';
import SignUpForm from '../components/SignUpForm';
import PasswordReminderView from '../components/PasswordReminderView';
import FlashcardsQuiz from '../components/FlashcardsQuiz';
import FlashcardsQuizResults from '../components/FlashcardsQuizResults';
import ChangePasswordView from '../components/ChangePasswordView';
import ArticleSearchInput from '../components/ArticleSearchInput';

import { Route, IndexRedirect } from 'react-router';
import { requireAuthentication } from '../utils';

import AddArticle from '../components/AddArticleWidget';

export default (
  <Route path="/" component={Main}>
    <Route path="/login" component={Login} />
    <Route path="/home" components={{ children: Home }} />

    <Route path="/sign_up" component={SignUpForm} />
    <Route path="forgot_password" component={PasswordReminderView} />
    <Route path="reset_password" component={ChangePasswordView} />

    <Route path="/learn" component={requireAuthentication(UserDefinitionsLearn)} />
    <Route path="/learn/:id" component={requireAuthentication(FlashcardsQuiz)} />
    <Route path="/results" component={requireAuthentication(FlashcardsQuizResults)} />
    <Route path="/definitions" component={UserDefinitionsList} />
    <Route path="/articles"
      components={{ children: requireAuthentication(Articles),
                    topNavChildren: ArticleSearchInput }} />

    <Route path="/new-article" component={AddArticle} />
    <Route path="/article/:id" components={{ children: requireAuthentication(ArticlePage)} } />

    <IndexRedirect to="/home" />
  </Route>

);
