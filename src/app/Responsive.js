import _ from 'lodash';
import { throttle } from 'lodash/throttle';
import { find } from 'lodash/find';
import store from './store';
import { windowResize } from './actions';

const Breakpoint = {
  mobile: 767
};

function screenWidth() {
  return window.innerWidth;
}

function isDesktop() {
  return screenWidth() > Breakpoint.mobile;
}

function isMobile() {
  return screenWidth() >= Breakpoint.mobile;
}

function mobileOrDesktop() {
  return isMobile() ? 'mobile' : 'desktop';
}

export { isDesktop, isMobile, mobileOrDesktop, screenWidth };
