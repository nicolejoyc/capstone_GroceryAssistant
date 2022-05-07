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

        window.location.href = ('list?id=' + listId + '&name=' + name + orderBy);
    });

});