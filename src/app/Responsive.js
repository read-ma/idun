function screenSize() {
  let width = screenWidth();

  if (width > 1100) { return 'large' }
  if (width > 768) { return 'medium' }
  if (width > 480) { return 'small' }
  else { return 'extra-small' }
}

function isDesktop() {
  return screenSize() === 'large' || screenSize() === 'medium';
}

function isMobile() {
  return screenSize() === 'small' || screenSize() === 'extra-small';
}

function screenWidth() {
  return window.innerWidth;
}

export { isDesktop, isMobile, screenSize, screenWidth };
