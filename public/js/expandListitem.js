$(function() {

  $(".expand-item").click(function() {
    let listitemID = this.id.split('-').pop();
    info = document.querySelector("#info-" + listitemID);

    if (info.classList.contains('open')) {
      info.classList.remove('open');
      this.parentNode.style.height = '4rem';
    } else {
      info.classList.add('open');
      this.parentNode.style.height = '10rem';
    }

  });

});