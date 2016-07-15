import React from 'react';
import { Route, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { Home, Main, Articles, ArticlePage, UserDefinitionsLearn, UserDefinitionsList } from '../components';
import Login from '../components/Login';
import SignUpForm from '../components/SignUpForm';
import PasswordReminderView from '../components/PasswordReminderView';
import FlashcardsQuiz from '../components/FlashcardsQuiz';
import FlashcardsQuizResults from '../components/FlashcardsQuizResults';
import ChangePasswordView from '../components/ChangePasswordView';
import ArticleSearchInput from '../components/ArticleSearchInput';
import AddArticleWidget from '../components/AddArticleWidget';
import { requireAuthentication } from '../utils';
import { TTSPlayer } from '../components/TTSPlayer';

// Tried to turn off query param. But it didnt work.
// https://github.com/reactjs/react-router/issues/1967
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const LearnHeader = () => {
  return <span>Learn</span>;
};

export default (
  <Route path="/" component={Main} history={appHistory}>
    <Route path="/login" component={Login} />
    <Route path="/home" components={{ children: Home }} />

    <Route path="/sign_up" component={SignUpForm} />
    <Route path="forgot_password" component={PasswordReminderView} />
    <Route path="reset_password" component={ChangePasswordView} />

    <Route path="/learn" components={{
      children: requireAuthentication(UserDefinitionsLearn),
      topNavChildren: LearnHeader
    }} />
    <Route path="/learn/:id" component={requireAuthentication(FlashcardsQuiz)} />
    <Route path="/results" component={requireAuthentication(FlashcardsQuizResults)} />
    <Route path="/definitions" component={UserDefinitionsList} />
    <Route path="/articles"
      components={{ children: requireAuthentication(Articles),
                    topNavChildren: ArticleSearchInput }} />

    <Route path="/new-article" component={AddArticleWidget} />
    <Route path="/article/:id" components={{ children: requireAuthentication(ArticlePage), topNavChildren: TTSPlayer }} />

    <IndexRedirect to="/articles" />
  </Route>

);
