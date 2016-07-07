import _ from 'lodash';

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
}

function getMinWidthForBreakpoint(screenSize) {
  return _.find(breakpoints, { name: screenSize }).minWidth;
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

export { isDesktop, isMobile, screenSize, mobileOrDesktop, screenWidth, getMinWidthForBreakpoint };
