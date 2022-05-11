$(function() {

  $(".sort-by-urgency").click(async function() {
    let urgencyID = "";
    let listitemID = this.id.split('-').pop();

    if($(this).is(':checked')){
        urgencyID = '1';
    } else {
        urgencyID = '3';
    }

    // update DB
    const response = await fetch('/urgency-checkbox-change', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listitem_id: listitemID,
            urgency_id: urgencyID
        })
    });

    const result = await response.json();
    console.log(result);

    if (document.querySelector('input[name="sortBy"]:checked').value === "urgency") {
      location.reload();
    }
  });

});