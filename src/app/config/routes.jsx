import React from 'react';

import { Home, Main, Articles, ArticlePage, UserDefinitionsLearn, UserDefinitionsList } from '../components';
import Login from '../components/Login';
import SignUpForm from '../components/SignUpForm';
import Settings from '../components/Settings';
import Profile from '../components/Profile';
import PasswordReminderView from '../components/PasswordReminderView';
import FlashcardsQuiz from '../components/FlashcardsQuiz';
import ChangePasswordView from '../components/ChangePasswordView';


import { Route, IndexRedirect } from 'react-router';
import { requireAuthentication } from '../utils';

import ArticleFilter from '../components/ArticleFilter';
import AddArticle from '../components/AddArticleWidget';

export default (
  <Route path="/" component={Main}>
    <Route path="/login" component={Login} />
    <Route path="/sign_up" component={SignUpForm} />
    <Route path="forgot_password" component={PasswordReminderView} />
    <Route path="reset_password" component={ChangePasswordView} />

    <Route path="/learn" component={requireAuthentication(UserDefinitionsLearn)} />
    <Route path="/learn/:id" component={requireAuthentication(FlashcardsQuiz)} />
    <Route path="/definitions" component={UserDefinitionsList} />

    <Route path="/articles" components={{ children: requireAuthentication(Articles), navChildren: ArticleFilter }} />
    <Route path="/new-article" component={AddArticle} />
    <Route path="/article/:id" components={{ children: requireAuthentication(ArticlePage), navChildren: Settings} } />
    <IndexRedirect to="/articles" />
  </Route>

);
