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

    //if (document.querySelector('input[name="sortBy"]:checked').value === "urgency") {
      location.reload();
    //}
  });
  $(".sort-by-purchased").click(async function() {
    let purchased = false;
    let listitemID = this.id.split('-').pop();

    if($(this).is(':checked')){
        purchased = true;
    } 

    // update DB
    const response = await fetch('/purchased-checkbox-change', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listitem_id: listitemID,
            purchased: purchased
        })
    });

    const result = await response.json();
    console.log(result);

    if (purchased) {
      location.reload();
    }
  });
  $(".sort-by-hidden").click(async function() {
    let hidden = false;
    let listitemID = this.id.split('-').pop();
    console.log(listitemID);

    if($(this).is(':checked')){
        hidden = true;
    } 

    // update DB
    const response = await fetch('/hidden-checkbox-change', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            listitem_id: listitemID,
            hidden: hidden
        })

    });

    const result = await response.json();
    console.log(result);

    if (hidden) {
      location.reload();
    }
  });

});
