$("#add-grocery-list").click(async function (e) { 
  e.preventDefault();

  let groceryListName = $('#input-0').val();

  if (groceryListName !== "") {

    // send info to be stored into the database
    const response = await fetch('/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "'1'",
        grocery_list_name: "'" + groceryListName + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    gotoURLEnd();

  } else {
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-product").click(async function (e) { 
  e.preventDefault();

  let productName = $('#input-0').val();

  if (productName !== "") {

    // send info to be stored into the database
	  const response = await fetch('/product/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "'1'",
        product_name: "'" + productName + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/product");

  } else {
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-category").click(async function (e) { 
  e.preventDefault();

  let categoryName = $('#input-0').val();

  if (categoryName !== "") {

    // send info to be stored into the database
	  const response = await fetch('/category/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "'11'", // just a random number > 0
        category_name: "'" + categoryName + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/category");

  } else {
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-brand").click(async function (e) { 
  e.preventDefault();

  let brandName = $('#input-0').val();

  if (brandName !== "") {

    // send info to be stored into the database
	  const response = await fetch('/brand/add', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "'1'",
        brand_name: "'" + brandName + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/brand");

  } else {
    $('#validate-0').css('display', 'block');
  }
  
});

$("#add-store").click(async function (e) { 
  e.preventDefault();

  let invalid = [];
  let valid = [];

  for (let i = 0; i < 3; i++) {
    if ($('#input-' + i).val() === "") {
      invalid.push('#validate-' + i);
    } else {
      valid.push('#validate-' + i);
    }
  }

  invalid.forEach(function(i) {
    $(i).css('display', 'block');
  });

  valid.forEach(function(i) {
    $(i).css('display', 'none');
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
        user_id: "'11'", // just a random number > 0
        store_name: "'" + storeName + "'",
        store_website: "'" + storeWebsite + "'",
        store_phone: "'" + storePhone + "'"
      })
    });

    const result = await response.json();
    console.log(result);
    location.assign("/grocery-data-manager/store");

  }
});
