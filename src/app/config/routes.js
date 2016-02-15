import React from 'react';

import {Home,Main, Articles, Article, UserDefinitions} from '../components';

import Profile from '../components/Profile';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path="/" component={Main}>
      <Route path="/profile" component={Profile}>
        <Route path="/definitions" component={UserDefinitions} />
        <IndexRoute component={UserDefinitions} />
      </Route>
      <Route path="/articles" component={Articles}/>
      <Route path="/article/:id" component={Article} />
      <IndexRoute component={Home} />
    </Route>
);
