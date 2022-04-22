$(function() {

  $('.grocery-list-button').each((index, el) => {
    $(el).click((e) => {
      console.log($(el).text());
    });
  });

  $('.maintenance-page-button').each((index, el) => {
    $(el).click((e) => {
      console.log($(el).text());
    });
  });

});