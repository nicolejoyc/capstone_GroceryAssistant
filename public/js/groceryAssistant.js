$(function() {

  $('.grocery-list-button').each((index, el) => {
    $(el).click((e) => {
      console.log($(el).text());
    });
  });

  $('.add').each(function() {
    var nameButton = this;

    nameButton.addEventListener("click", function() { 
      personName = $(this).attr('id');

      const addList = async function() {

        const response = await fetch('/log', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: `\' ${personName}''s Grocery List\'`
          })
        });
        const result = await response.json();
        console.log(result);
        location.assign("/");
      
      };
      
      addList();

    });

  });

});