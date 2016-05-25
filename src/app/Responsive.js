function screenSize() {
  let width = window.innerWidth;

  if (width > 1100) { return 'large' }
  if (width > 768) { return 'medium' }
  if (width > 480) { return 'small' }
  else { return 'extra-small' }
}

function isDesktop() {
  return screenSize() === 'large' || screenSize() === 'medium'
}

function isMobile() {
  return screenSize() === 'small' || screenSize() === 'extra-small'
}


export { isDesktop, isMobile, screenSize }
