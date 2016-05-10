import React from 'react';

import { Home, Main, Articles, ArticlePage, UserDefinitionsLearn, UserDefinitionsList } from '../components';
import Login from '../components/Login';
import SignUpForm from '../components/SignUpForm';
import Profile from '../components/Profile';
import PasswordReminderView from '../components/PasswordReminderView';
import ChangePasswordView from '../components/ChangePasswordView';

import { Route, IndexRoute, IndexRedirect } from 'react-router';
import { requireAuthentication } from '../utils';

import ArticleFilter from '../components/ArticleFilter';

export default (
  <Route path="/" component={Main}>
    <Route path="/login" component={Login} />
    <Route path="/sign_up" component={SignUpForm} />
    <Route path="forgot_password" component={PasswordReminderView} />
    <Route path="reset_password" component={ChangePasswordView} />

    <Route path="/learn" component={requireAuthentication(Profile)}>
      <Route path="definitions" component={UserDefinitionsList} />
      <IndexRoute component={UserDefinitionsLearn} />
    </Route>

    <Route path="/articles" components={{ children: requireAuthentication(Articles), navChildren: ArticleFilter }} />
    <Route path="/article/:id" component={requireAuthentication(ArticlePage)} displaySearchBar={true} />
    <IndexRedirect to="/articles" />
  </Route>

);
