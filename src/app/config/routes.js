import React from 'react';

import {Home,Main, Articles, Article} from '../components';

import Profile from '../components/Profile';
import { Route, IndexRoute } from 'react-router';

export default (
    <Route path="/" component={Main}>
      <Route path="/profile" component={Profile} />
      <Route path="/articles" component={Articles}/>
      <Route path="/article/:id" component={Article} />
      <IndexRoute component={Home} />
    </Route>
);
