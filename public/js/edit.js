$(function() {

  const item = $('#table-name').val();

  switch (item) {
    case 'product':
    case 'category':
    case 'brand':
    {
      $(`#edit-${item}`).click(async function (e) { 
        e.preventDefault();

        let userId = $('#user-id').val();
        let itemId = $('#item-id').val();
        let itemName = $('#input-0').val();

        if (itemName.replace(/\s/g, '') !== "" && charLessThanThirty(itemName)) {

          // send info to be stored into the database
          const response = await fetch(`/${item}/edit`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userId,
              item_id: itemId,
              item_name: "'" + itemName.replace(/'/g, "''") + "'"
            })
          });

          const result = await response.json();
          console.log(result);
          location.assign(`/grocery-data-manager/${item}`);

        } else {
          validate = $('#validate-0');
          if (!charLessThanTwenty(itemName)) {
            validate.html('Name must be 30 characters or less.');
          } else {
            validate.html('Please fill out this field.');
          }
          $('#validate-0').css('display', 'block');
        }
      });
      break;
    }
    case 'list':
    {
      $(`#edit-${item}`).click(async function (e) { 
        e.preventDefault();

        let userId = $('#user-id').val();
        let itemId = $('#item-id').val();
        let itemName = $('#input-0').val();
        let colorID = $('#dropdown-color').val().split('-')[1]; 
        let filtered = $('#filtered').prop('checked'); 
        let sourceListID = $('#dropdown-source-list').val().split('-')[2]; 
        let categoryID = $('#dropdown-cat').val().split('-')[1]; 
        let storeID = $('#dropdown-store').val().split('-')[1];

        if (itemName.replace(/\s/g, '') !== "" && charLessThanThirty(itemName)
          && (!filtered || (sourceListID !== '0'))) {

          // send info to be stored into the database
          const response = await fetch('/edit', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userId,
              item_id: itemId,
              item_name: "'" + itemName.replace(/'/g, "''") + "'",
              color_id: "'" + colorID + "'",
              filtered: "'" + filtered + "'",
              source_list_id: "'" + sourceListID + "'",
              category_id: "'" + categoryID + "'",
              store_id: "'" + storeID + "'"
            })
          });

          const result = await response.json();
          console.log(result);
          location.assign('/');

        } else {
          validate = $('#validate-0');
          if (!charLessThanTwenty(itemName)) {
            validate.html('Name must be 30 characters or less.');
            validate.css('display', 'block');
          } else if (!itemName.length) {
            validate.html('Please fill out this field.');
            validate.css('display', 'block');
          } else {
            validate = $('#validate-source-list');
            validate.css('display', 'block');
          }
        }
      });
      break;
    }
    case 'store':
    {
      $(`#edit-${item}`).click(async function (e) { 
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
              if (!charLessThanThirty(currentField.val())) {
                invalid.push(i);
                message[i] = 'Field must be 30 characters or less.';
              } else {
                valid.push(i);
              }
            }
          } else {
            if (currentField.val() === "") {
              valid.push(i);
            } else {
              if (i === 1) {
                if (!charLessThanForty(currentField.val())) {
                  invalid.push(i);
                  message[i] = 'Field must be 40 characters or less.';
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

          let userId = $('#user-id').val();
          let storeId = $('#item-id').val();
          let storeName = $('#input-0').val();
          let storeWebsite = $('#input-1').val();
          let storePhone = $('#input-2').val();
          // send info to be stored into the database
          const response = await fetch(`/${item}/edit`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user_id: userId,
              store_id: storeId,
              store_name: "'" + storeName.replace(/'/g, "''") + "'",
              store_website: "'" + storeWebsite.replace(/'/g, "''") + "'",
              store_phone: "'" + storePhone.replace(/'/g, "''") + "'"
            })
          });
          const result = await response.json();
          location.assign(`/grocery-data-manager/${item}`);
        }
      });
      break;
    }

    case 'listitem':
      {
        $("#edit-listitem").click(async function (e) { 
          e.preventDefault();
          let listItemId =$('#listitem-id').val();
          let productID = $('#dropdown-product').val().split('-')[1];
          let categoryID = $('#dropdown-cat').val().split('-')[1]; 
          let brandID = $('#dropdown-brand').val().split('-')[1];
          let urgencyID = $('#dropdown-urgency').val().split('-')[1];
          let itemCount =$('#quantity').val();  
          let listName =$('#list-name').val();
          let listId =$('#list-id').val();
      
          // send info to be stored into the database
          const response = await fetch('/list/listitem/edit', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              list_id: listId,
              listitem_id: listItemId,
              product_id: "'" + productID + "'",
              category_id: "'" + categoryID + "'",
              brand_id: "'" + brandID + "'",
              urgency_id: "'" + urgencyID + "'",
              item_count: "'" + itemCount + "'"
            })
          });
      
          const result = await response.json();
          console.log(result);
          location.assign('/list?id=' + listId + '&name=' + listName);
      });
      break;
    }
  }

});