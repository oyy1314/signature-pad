// eslint-disable-next-line no-unused-expressions
!(function(win) {
  const documentElement = document.documentElement

  const setSize = function() {
    let clientWidth = documentElement.clientWidth
    clientWidth = clientWidth < 750 ? clientWidth : 750
    documentElement.style.fontSize = clientWidth / 7.5 + 'px'
  }
  win.addEventListener('orientationchange' in window ? 'orientationchange' : 'resize', setSize)
  document.addEventListener('DOMContentLoaded', setSize)
}(window))
