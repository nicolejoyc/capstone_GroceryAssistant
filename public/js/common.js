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

charLessThanTwenty = function(name) {
  if (name.length <= 20) {
    return true;
  } else {
    return false;
  }
};

charLessThanThirty = function(name) {
  if (name.length <= 30) {
    return true;
  } else {
    return false;
  }
};

charLessThanForty = function(name) {
  if (name.length <= 40) {
    return true;
  } else {
    return false;
  }
};