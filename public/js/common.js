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

const openItem = async function(table, id, name) {
  if (table === "grocery_list") {
    window.location.href = ('/view?id=' + id + '&name=' + name);
  } else {
    window.location.href = ('/grocery-data-manager/' + table + '/view?id=' + id + '&name=' + name);
  }
};