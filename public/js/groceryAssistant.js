$(function() {

  $('.grocery-list-button').each((index, el) => {
    $(el).click((e) => {
      console.log($(el).text());
    });
  });
});