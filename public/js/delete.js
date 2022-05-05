$(function() {

  $('#delete-icon-button').click(function (e) { 
    e.preventDefault();
    
    let selectedItems = document.querySelectorAll('.select-button-active');
    const table = document.querySelector('#interface-identifier').innerHTML;
    const itemString = selectedItems.length > 1 ? ' items.' : ' item.';

    if (confirm('You are about to delete ' + selectedItems.length + itemString)) {
      selectedItems.forEach(async function(item, i) {
        const itemId = item.id.split('-').pop();
  
        // send info to be stored into the database
        const response = await fetch('/delete', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            item_id: itemId,
            table_name: table
          })
        });
  
        const result = await response.json();
        console.log(result);
      });
      location.reload();
    }

  });

});