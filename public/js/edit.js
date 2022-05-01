$(function() {

  const item = $('#table-name').val();

  $(`#edit-${item}`).click(async function (e) { 
    e.preventDefault();

    let userId = $('#user-id').val();
    let itemId = $('#item-id').val();
    let itemName = $('#input-0').val();

    if (itemName.replace(/\s/g, '') !== "" && charLessThanTwenty(itemName)) {

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
        validate.html('Name must be 20 characters or less.');
      } else {
        validate.html('Please fill out this field.');
      }
      $('#validate-0').css('display', 'block');
    }
    
  });

});