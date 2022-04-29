productButtons = document.querySelectorAll(".open-button");

productButtons.forEach(function(i) {
  console.log(i);
  i.classList.add('open-button-active');
});

const editListItem = async function(productId, table, preferenceId) {

  if (document.querySelector("#" + table + "-" + preferenceId).checked) {
    // send info to be stored into the database
    // const response = await fetch('/edit-listitem', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user_id: "10",
    //     product_id: productId,
    //     preference_table: table,
    //     preference_id: preferenceId
    //   })
    // });

    // const result = await response.json();
    // console.log(result);
      console.log("checked", productId, table, preferenceId);
  } else {
    // TODO: Perform delete operation to remove the preference
    // const response = await fetch('/remove-preference', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //     user_id: "10",
    //     product_id: productId,
    //     preference_table: table,
    //     preference_id: preferenceId
    //   })
    // });

    // const result = await response.json();
    // console.log(result);
    console.log("unchecked", productId, table, preferenceId);
  }

};

const slideOpen = function(group) {

  switch (group) {
    case 'categories':
      let categories = document.querySelector('#listitem-categories');
      if (categories.classList.contains('close')) {
        categories.classList.remove('close');
        categories.classList.add('open');
      } else {
        categories.classList.remove('open');
        categories.classList.add('close');
      }
      break;
    case 'stores':
      let stores = document.querySelector('#listitem-stores');
      if (stores.classList.contains('close')) {
        stores.classList.remove('close');
        stores.classList.add('open');
      } else {
        stores.classList.remove('open');
        stores.classList.add('close');
      }
      break;
    case 'brands':
      let brands = document.querySelector('#listitem-brands');
      if (brands.classList.contains('close')) {
        brands.classList.remove('close');
        brands.classList.add('open');
      } else {
        brands.classList.remove('open');
        brands.classList.add('close');
      }
      break;
  }

};