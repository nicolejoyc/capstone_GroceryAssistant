$(function() {
    $("#on-view").click(function() {
        $("#out-of-sight").toggleClass("show-toolbar");
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

        window.location.href = ('list?id=' + listId + '&name=' + name + orderBy + show);
        //console.log(('list?id=' + listId + '&name=' + name + orderBy + show));
    });
});