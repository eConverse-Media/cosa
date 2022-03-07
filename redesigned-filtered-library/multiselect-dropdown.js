function filterResources() {
    var url = 'https://www.statearchivists.org/research-resources/resources-overview/',
        opts = $('.resource-dropdown li.selected').toArray();

    if (opts.length > 0) {
        url += 'resource-library-search-results?s=tags%3A%22' + $(opts[0]).attr('id') + '%22';
    
        url += '&executesearch=true&cs=LibraryEntries';
    }



    if (opts.length > 1) {
        url += '&rf=';

        for (var i = 1; i < opts.length; i++) {
            url += '%5ETags%3A';
            url += $(opts[i]).attr('id');
        }

        url += '%5E';
    }


    window.location = url;
}

function handleSelectedTags() {
    
}

$(function () {

    handleSelectedTags();

    $('.resource-dropdown li').click(function () {

        var self = $(this);

        $(self).toggleClass('selected');

        if ($(self).attr('id') == 'All') {
            var parent = $(self).closest('ul');

            $(parent).find('li.selected').removeClass('selected');
        }
    });
});