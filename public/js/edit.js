$(function() {

  const item = $('#table-name').val();

  let fetch_url;
  let redirect_url;
  if(item === 'list') {
    fetch_url = '/edit';
    redirect_url = '/';
  } else {
    fetch_url = `/${item}/edit`;
    redirect_url = `/grocery-data-manager/${item}`;
  }

  $(`#edit-${item}`).click(async function (e) { 
    e.preventDefault();

    let userId = $('#user-id').val();
    let itemId = $('#item-id').val();
    let itemName = $('#input-0').val();

    if (itemName.replace(/\s/g, '') !== "" && charLessThanTwenty(itemName)) {

      // send info to be stored into the database
      const response = await fetch(fetch_url, {
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
      location.assign(redirect_url);

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