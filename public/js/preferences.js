const editPreferred = async function(productId, table, preferenceId) {

  if (document.querySelector("#" + table + "-" + preferenceId).checked) {
    // send info to be stored into the database
    const response = await fetch('/edit-preference', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "10",
        product_id: productId,
        preference_table: table,
        preference_id: preferenceId
      })
    });

    const result = await response.json();
    console.log(result);

  } else {
    // TODO: Perform delete operation to remove the preference
    const response = await fetch('/remove-preference', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: "10",
        product_id: productId,
        preference_table: table,
        preference_id: preferenceId
      })
    });

    const result = await response.json();
    console.log(result);
  }

};

const slideOpen = function(group) {

  switch (group) {
    case 'categories':
      let categories = document.querySelector('#preferred-categories');
      if (categories.classList.contains('close')) {
        categories.classList.remove('close');
        categories.classList.add('open');
      } else {
        categories.classList.remove('open');
        categories.classList.add('close');
      }
      break;
    case 'stores':
      let stores = document.querySelector('#preferred-stores');
      if (stores.classList.contains('close')) {
        stores.classList.remove('close');
        stores.classList.add('open');
      } else {
        stores.classList.remove('open');
        stores.classList.add('close');
      }
      break;
    case 'brands':
      let brands = document.querySelector('#preferred-brands');
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