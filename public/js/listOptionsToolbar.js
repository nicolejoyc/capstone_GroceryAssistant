$(function() {
    $("#on-view").click(function() {
        $("#out-of-sight").toggleClass("show-toolbar");

        // Update toolbar open / closed state
        if(sessionStorage.getItem(ToolbarKey) === 'open') {
          sessionStorage.setItem(ToolbarKey, 'closed');
        } else {
          sessionStorage.setItem(ToolbarKey, 'open');
        }
    });

    $('input[type=radio][name="sortBy"]').change(function() {
        strStart = location.href.search('id') + 3;
        strEnd = location.href.search('&');

        let listId = location.href.substring(strStart, strEnd);
        let name = document.title;
        let orderBy = '';

        console.log(this.value);

        switch (this.value) {
            case 'product':
                orderBy = '&orderBy=name';
                break;
            case 'category':
                orderBy = '&orderBy=category%2C%20name';
                break;
            case 'urgency':
                orderBy = '&orderBy=urgency%2C%20name';
                break;
        }

        sessionStorage.setItem(SortByKey, this.value);
        let purchased = $('#show-purchased').prop('checked');
        let hidden = $('#show-hidden').prop('checked');
        let show = `&showPurchased=${purchased}`;
        show += `&showHidden=${hidden}`;

        window.location.href = ('list?id=' + listId + '&name=' + name + orderBy + show);
        
    });
    $('input[type=checkbox][name="show"]').change(function() {
        strStart = location.href.search('id') + 3;
        strEnd = location.href.search('&');

        let listId = location.href.substring(strStart, strEnd);
        let name = document.title;
        
         if ($('#sort-by-product').prop('checked')) {
            orderBy = '&orderBy=name';
         } else if ($('#sort-by-category').prop('checked')) {
            orderBy = '&orderBy=category%2C%20name';
         } else {
            orderBy = '&orderBy=urgency%2C%20name';
         }

        let purchased = $('#show-purchased').prop('checked');
        let hidden = $('#show-hidden').prop('checked');
        let show = `&showPurchased=${purchased}`;
        show += `&showHidden=${hidden}`;
        sessionStorage.setItem(ShowPurchasedKey, purchased);
        sessionStorage.setItem(ShowHiddenKey,hidden);

        window.location.href = ('list?id=' + listId + '&name=' + name + orderBy + show);
    });

    if(sessionStorage.getItem(ToolbarKey) === 'open') {
        $("#out-of-sight").toggleClass("show-toolbar");
    }

    // Toolbar defaults
    if(!(sessionStorage.getItem(SortByKey))) {
      const sortBy = $('input[type=radio][name="sortBy"]').val();
      const showPurchased = $('#show-purchased').prop('checked');
      const showHidden = $('#show-hidden').prop('checked');
      sessionStorage.setItem(SortByKey, sortBy);
      sessionStorage.setItem(ShowPurchasedKey, showPurchased);
      sessionStorage.setItem(ShowHiddenKey, showHidden);
      sessionStorage.setItem(ToolbarKey, 'closed');
    }
});