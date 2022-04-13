$(function() {

  $('.grocery-list-button').each((index, e) => {
    $(e).click((e) => {
      console.log($(e.target).text());
    });
  });
});