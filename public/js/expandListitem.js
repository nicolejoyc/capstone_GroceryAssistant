$(function() {

  $(".expand-item").click(function() {
    let listitemID = this.id.split('-').pop();
    info = document.querySelector("#info-" + listitemID);

    if (info.classList.contains('open')) {
      info.classList.remove('open');
      this.parentNode.style.height = '4rem';
    } else {
      info.classList.add('open');
      this.parentNode.style.height = '11.5rem';
    }

  });

  const ScrollPosition8 = 'scrollPosition8';
  $('.button-list-wrapper-8').scroll(function (e) {
    sessionStorage.setItem(ScrollPosition8, e.target.scrollTop);
  });

  const y = sessionStorage.getItem(ScrollPosition8) || 0;
  $('.button-list-wrapper-8').scrollTop(y);

});