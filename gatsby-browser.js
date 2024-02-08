// in gastby-browser.js
exports.shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  document.querySelector(".scroll-container").scrollTo(0, 0)
  return false
}
