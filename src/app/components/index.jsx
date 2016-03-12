import Home from './Home';
import Profile from './Profile';
import UserDefinitions from './UserDefinitions';
import Articles from './Articles';
import ArticlePage from './ArticlePage';
import Main from './Main';
import DefinitionBoxes from './DefinitionBoxes';

import React, { Component } from 'react';

import classnames from 'classnames';

const Wordlists = ({header, wordlists, handleSelected}) => {
  let buttons = wordlists.map((list) => {
    return (
      <li className='collection-item' key={list.name}>
        <input id={list.name} key={list.name} type="checkbox" onChange={handleSelected} checked={list.enabled} name={list.name} className='filled-in'/>
        <label htmlFor={list.name}>{list.label}</label>
      </li>
    );
  });
  return (
    <ul className='collection with-header'>
      <li className='collection-header'><h5>{header}</h5></li>
      {buttons}
    </ul>
  );
};

export {
  Home, Profile, Articles, ArticlePage, Main, Wordlists, UserDefinitions,
  DefinitionBoxes
};
