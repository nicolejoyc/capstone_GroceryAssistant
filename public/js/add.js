$("#add-grocery-list").click(async function (e) { 
  e.preventDefault();

  let groceryListName = $('#input-0').val();
  console.log("Here");
  if (groceryListName !== "") {
    console.log(groceryListName);

    // send info to be stored into the database
	  const response = await fetch('/grocery-list/add', {
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
    location.assign("/grocery-list");

  } else {
    alert("Please enter a grocery list name.");
  }
  
});

$("#add-product").click(async function (e) { 
  e.preventDefault();

  let productName = $('#input-0').val();

  if (productName !== "") {
    console.log(productName);

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
    alert("Please enter a product name.");
  }
  
});

$("#add-category").click(async function (e) { 
  e.preventDefault();

  let categoryName = $('#input-0').val();

  if (categoryName !== "") {
    console.log(categoryName);

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
    alert("Please enter a category name.");
  }
  
});
