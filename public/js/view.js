$(function() {

  const item = $('#table-name').val();

  $(`#view-${item}`).click(async function (e) { 
    e.preventDefault();
    gotoParentURL();
  });

});