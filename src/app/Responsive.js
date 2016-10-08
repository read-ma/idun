import _ from 'lodash';
import { throttle } from 'lodash/throttle';
import { find } from 'lodash/find';
import store from './store';
import { windowResize } from './actions';

function watchResize() {
  window.addEventListener('resize', _.throttle(function() {
    store.dispatch(windowResize());
  }, 500));
}

const breakpoints = [
  { name: 'large', minWidth: 1100 },
  { name: 'medium', minWidth: 768 },
  { name: 'small', minWidth: 480 },
  { name: 'extra-small', minWidth: 0 },
];

function screenWidth() {
  return window.innerWidth;
}

function screenSize() {
  let width = screenWidth();

  for (let i = 0; i < breakpoints.length; i++) {
    if (breakpoints[i].minWidth < width) {
      return breakpoints[i].name;
    }
  }

  return false;
}

function getMinWidthForBreakpoint(screenSizeName) {
  return _.find(breakpoints, { name: screenSizeName }).minWidth;
}

function isDesktop() {
  return screenSize() === 'large' || screenSize() === 'medium';
}

function isMobile() {
  return screenSize() === 'small' || screenSize() === 'extra-small';
}

function mobileOrDesktop() {
  return isMobile() ? 'mobile' : 'desktop';
}

export { watchResize, isDesktop, isMobile, screenSize, mobileOrDesktop, screenWidth, getMinWidthForBreakpoint };
