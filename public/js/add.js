$("#submit-product").click(async function (e) { 
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
