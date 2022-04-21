$("#submit").click(async function (e) { 
  e.preventDefault();

  let categoryName = $('#add-category-name').val();

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