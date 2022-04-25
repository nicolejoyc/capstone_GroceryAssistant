const serverRequest = function(url) {
  window.location.href += url;
};

// Build full path (absolute) URL string
const buildURLString = (targetPage) => {
  var url = (window.location.href.split('/'));
  url[url.length - 1] = targetPage;
  return url.join('/');
};

// Get last path from URL string
const gotoURLEnd = () => {
  var url = (window.location.href.split('/'));
  url.pop();
  window.location.href = url.join('/');
};

