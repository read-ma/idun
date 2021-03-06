import React from 'react';
import { Route, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';

import { Home, Main, Articles, ArticlePage, UserDefinitionsLearn, UserDefinitionsList } from '../components';
import Login from '../components/Login';
import Profile from '../components/Profile';
import SignUpForm from '../components/SignUpForm';
import PasswordReminderView from '../components/PasswordReminderView';
import FlashcardsQuiz from '../components/FlashcardsQuiz';
import FlashcardsQuizResults from '../components/FlashcardsQuizResults';
import ChangePasswordView from '../components/ChangePasswordView';
import ConfirmationView from '../components/Confirmation';
import ArticleSearchInput from '../components/ArticleSearchInput';
import { requireAuthentication } from '../utils';
import AudioPlayer from '../components/AudioPlayer';
import ls from '../localStore';

// Tried to turn off query param. But it didnt work.
// https://github.com/reactjs/react-router/issues/1967
const appHistory = useRouterHistory(createHashHistory)();

const LearnHeader = () => {
  return <h3>Flashcards</h3>;
};

const ProfileHeader = () => {
  const userName = ls.get('CURRENT_USER_EMAIL');
  return <h3>My Profile - {userName}</h3>;
};

export default (
  <Route path="/" component={Main} history={appHistory}>
    <IndexRedirect to="/home" />
    <Route path="home" components={{ children: Home }} />
    <Route path="profile" components={{
      children: requireAuthentication(Profile),
      topNavChildren: ProfileHeader
    }} />

    <Route path="login" component={Login} />
    <Route path="sign_up" component={SignUpForm} />

    {/* Group under password */}
    <Route path="forgot_password" component={PasswordReminderView} />
    <Route path="reset_password" component={ChangePasswordView} />
    <Route path="confirmation_token" component={ConfirmationView} />

    {/* Group under /learn */}
    <Route path="learn" components={{
      children: requireAuthentication(UserDefinitionsLearn),
      topNavChildren: LearnHeader
    }} />
    <Route path="learn/:id" component={requireAuthentication(FlashcardsQuiz)} />
    <Route path="results" component={requireAuthentication(FlashcardsQuizResults)} />


    <Route path="definitions" component={UserDefinitionsList} />
    <Route path="articles" components={{
      children: requireAuthentication(Articles),
      topNavChildren: ArticleSearchInput
    }} />

    <Route path="article/:id" components={{
      children: requireAuthentication(ArticlePage),
      topNavChildren: AudioPlayer
    }} />
  </Route>
);
