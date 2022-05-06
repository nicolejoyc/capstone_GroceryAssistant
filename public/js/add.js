
$("#add-grocery-list").click(async function (e) { 
  e.preventDefault();

  let groceryListName = $('#input-0').val();

  if (groceryListName.replace(/\s/g, '') !== "" && charLessThanTwenty(groceryListName)) {

    // send info to be stored into the database
    const response = await fetch('/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        grocery_list_name: "'" + groceryListName.replace(/'/g, "''") + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/");

  } else {
    validate = $('#validate-0');
    if (!charLessThanTwenty(groceryListName)) {
      validate.html('Name must be 20 characters or less.');
    } else {
      validate.html('Please fill out this field.');
    }
    validate.css('display', 'block');
  }
  
});

$("#add-product").click(async function (e) { 
  e.preventDefault();

  let productName = $('#input-0').val();

  if (productName.replace(/\s/g, '') !== "" && charLessThanTwenty(productName)) {

    // send info to be stored into the database
	  const response = await fetch('/product/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        product_name: "'" + productName.replace(/'/g, "''") + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/product");

  } else {
    validate = $('#validate-0');
    if (!charLessThanTwenty(productName)) {
      validate.html('Name must be 20 characters or less.');
    } else {
      validate.html('Please fill out this field.');
    }
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-category").click(async function (e) { 
  e.preventDefault();

  let categoryName = $('#input-0').val();

  if (categoryName.replace(/\s/g, '') !== "" && charLessThanTwenty(categoryName)) {

    // send info to be stored into the database
	  const response = await fetch('/category/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 11, // just a random number > 0
        category_name: "'" + categoryName.replace(/'/g, "''") + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/category");

  } else {
    validate = $('#validate-0');
    if (!charLessThanTwenty(categoryName)) {
      validate.html('Name must be 20 characters or less.');
    } else {
      validate.html('Please fill out this field.');
    }
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-brand").click(async function (e) { 
  e.preventDefault();

  let brandName = $('#input-0').val();

  if (brandName.replace(/\s/g, '') !== "" && charLessThanTwenty(brandName)) {

    // send info to be stored into the database
	  const response = await fetch('/brand/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 1,
        brand_name: "'" + brandName.replace(/'/g, "''") + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/brand");

  } else {
    validate = $('#validate-0');
    if (!charLessThanTwenty(brandName)) {
      validate.html('Name must be 20 characters or less.');
    } else {
      validate.html('Please fill out this field.');
    }
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-store").click(async function (e) { 
  e.preventDefault();

  let invalid = [];
  let valid = [];
  let message = [];

  for (let i = 0; i < 3; i++) {
    let currentField = $('#input-' + i);

    if (i === 0) {
      if (currentField.val().replace(/\s/g, '') === "") {
        invalid.push(i);
        message[i] = 'Please fill out this field.';
      } else {
        if (!charLessThanTwenty(currentField.val())) {
          invalid.push(i);
          message[i] = 'Field must be 20 characters or less.';
        } else {
          valid.push(i);
        }
      }
    } else {
      if (currentField.val() === "") {
        valid.push(i);
      } else {
        if (i === 1) {
          if (!charLessThanThirty(currentField.val())) {
            invalid.push(i);
            message[i] = 'Field must be 30 characters or less.';
          } else {
            valid.push(i);
          }
        } else {
          if (!charLessThanTwenty(currentField.val())) {
            invalid.push(i);
            message[i] = 'Field must be 20 characters or less.';
          } else {
            valid.push(i);
          }
        }
      }
    }
  }

  invalid.forEach(function(i) {
    $('#validate-' + i).html(message[i]);
    $('#validate-' + i).css('display', 'block');
  });

  valid.forEach(function(i) {
    $('#validate-' + i).css('display', 'none');
  });

  if (invalid.length === 0) {
    let storeName = $('#input-0').val();
    let storeWebsite = $('#input-1').val();
    let storePhone = $('#input-2').val();

    // send info to be stored into the database
	  const response = await fetch('/store/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: 11, // just a random number > 0
        store_name: "'" + storeName.replace(/'/g, "''") + "'",
        store_website: "'" + storeWebsite.replace(/'/g, "''") + "'",
        store_phone: "'" + storePhone.replace(/'/g, "''") + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/store");

  }
  
});

$("#add-listitem").click(async function (e) { 
  e.preventDefault();
  let productID = $('#dropdown-product').val().split('-')[1];
  let categoryID = $('#dropdown-cat').val().split('-')[1]; 
  let brandID = $('#dropdown-brand').val().split('-')[1];
  let itemCount =$('#quantity').val();  
  let listName =$('#list-name').val();
  let listId =$('#list-id').val();

    // send info to be stored into the database
	  const response = await fetch('/list/listitem/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        list_id: listId,
        product_id: "'" + productID + "'",
        category_id: "'" + categoryID + "'",
        brand_id: "'" + brandID + "'",
        item_count: "'" + itemCount + "'",
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign('/list?id=' + listId + '&name=' + listName);

});