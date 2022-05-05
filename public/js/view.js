$(function() {

  const item = $('#table-name').val();

  $(`#view-${item}`).click(async function (e) { 
    e.preventDefault();
    gotoParentURL();
  });
  $('#view-listitem-done').click(() => {
    window.location.href = '/list?id=' + $('#list-id').val() + '&name=' + $('#list-name').val();
  });

});