const serverRequest = function(url) {
  var baseURL = (window.location.href.split('?')[0]);
  console.log(baseURL);
  console.log(url);
  window.location.href = baseURL + url;
};

// Build full path (absolute) URL string
const buildURLString = (targetPage) => {
  var url = (window.location.href.split('/'));
  url[url.length - 1] = targetPage;
  return url.join('/');
};

// Get last path from URL string
const gotoURL = (url) => {
  window.location.href = url;
};

// Get last path from URL string
const urlBackOne = () => {
  var url = (window.location.href.split('/'));
  url.pop();
  window.location.href = url.join('/');
};

const openItem = function(table, id, name, preference) {
  if (table === "grocery_list") {
    window.location.href = ('/view?id=' + id + '&name=' + name);
  } else {
    if (preference === 'true') {
      window.location.href = ('/grocery-data-manager/product-preferences/view?id=' + id + '&name=' + name);
    } else {
      window.location.href = ('/grocery-data-manager/' + table + '/view?id=' + id + '&name=' + name);
    }
  }
};