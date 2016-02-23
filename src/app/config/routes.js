import React from 'react';

import {Home,Main, Articles, ArticlePage, UserDefinitions} from '../components';
import Login from '../components/Login';
import Profile from '../components/Profile';

import { Route, IndexRoute } from 'react-router';
import { requireAuthentication } from '../utils';

export default (
    <Route path="/" component={Main}>
      <Route path="/login" component={Login}/>

      <Route path="/profile" component={requireAuthentication(Profile)}>
        <Route path="/definitions" component={UserDefinitions} />
        <IndexRoute component={UserDefinitions} />
      </Route>

      <Route path="/articles" component={Articles}/>
      <Route path="/article/:id" component={requireAuthentication(ArticlePage)} />
      <IndexRoute component={Home} />
    </Route>

);
