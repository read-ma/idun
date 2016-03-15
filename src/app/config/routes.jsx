import React from 'react';

import {Home,Main, Articles, ArticlePage, UserDefinitions} from '../components';
import Login from '../components/Login';
import Profile from '../components/Profile';
import PasswordReminderView from '../components/PasswordReminderView';
import ChangePasswordView from '../components/ChangePasswordView';

import { Route, IndexRoute } from 'react-router';
import { requireAuthentication } from '../utils';

export default (
  <Route path="/" component={Main}>
    <Route path="/login" component={Login}/>
    <Route path="forgot_password" component={PasswordReminderView}/>
    <Route path="reset_password" component={ChangePasswordView}/>

    <Route path="/profile" component={requireAuthentication(Profile)}>
      <Route path="/definitions" component={UserDefinitions} />
      <IndexRoute component={UserDefinitions} />
    </Route>

    <Route path="/articles" component={requireAuthentication(Articles)}/>
    <Route path="/article/:id" component={requireAuthentication(ArticlePage)} />
    <IndexRoute component={Home} />
  </Route>

);
