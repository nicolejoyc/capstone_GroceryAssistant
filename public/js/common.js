const SortByKey = 'sortBy';
const ShowPurchasedKey = 'ShowPurchased';
const ShowHiddenKey = 'ShowHidden';
const ToolbarKey = 'ToolbarKey';

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

const getListURLParams = () => {
  let orderBy = '';
  let show = '';
  if(sessionStorage.getItem(SortByKey)) {
    const sortBy = sessionStorage.getItem(SortByKey);
    const purchased = sessionStorage.getItem(ShowPurchasedKey);
    const hidden = sessionStorage.getItem(ShowHiddenKey);

    switch (sortBy) {
      case 'product':
          orderBy = '&orderBy=name';
          break;
      case 'category':
          orderBy = '&orderBy=category%2C%20name';
          break;
      case 'urgency':
          orderBy = '&orderBy=urgency%2C%20name';
          break;
    }
    show = `&showPurchased=${purchased}` + `&showHidden=${hidden}`;
  }
  return orderBy + show;
};