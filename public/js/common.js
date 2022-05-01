const serverRequest = function(url) {
  var baseURL = (window.location.href.split('?')[0]);
  window.location.href = baseURL + url;
};

// Go to parent URL
const gotoParentURL = () => {
  var url = (window.location.href.split('/'));
  url.pop();
  window.location.href = url.join('/');
};

const openItem = function(table, id, name, preference) {
    window.location.href = ('/grocery-data-manager/product-preferences/view?id=' + id + '&name=' + name);
};