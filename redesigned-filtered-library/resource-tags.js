function handleTagDropdownValue(dropdowns) {
    var url = window.location.href,
        tag,
        hasColonEncoding = !!(url.indexOf('tags%3A') > -1),
        hasOpeningQuotationEncoding = !!(url.indexOf('tags%3A%2') > -1 || url.indexOf('tags:%2') > -1),
        hasClosingQuotationEncoding = !!(url.indexOf('%22&') > -1),
        firstUrlPoint,
        secondUrlPoint;

    if (url.indexOf('tags') > -1) {

        if (hasColonEncoding && hasOpeningQuotationEncoding) {
            firstUrlPoint = 10;
        } else if (hasColonEncoding || hasOpeningQuotationEncoding) {
            firstUrlPoint = 8;
        } else {
            firstUrlPoint = 6;
        }
    
        if (hasClosingQuotationEncoding) {
            secondUrlPoint = 3;
        } else {
            secondUrlPoint = 1;
        }

        tag = url.substring(url.indexOf('tags') + firstUrlPoint, url.indexOf('&execute') - secondUrlPoint);

    } else {
        tag = 'all';
    }

    for (var j = 0; j < dropdowns.length; j++) {
        
        var opts = dropdowns[j].options;
        
        for (var i = 0; i < opts.length; i++) {
            if (opts[i].value == tag) {
                opts[i].selected = true;
            }
        }
    }
    


}

function handleLibraryTag(val) {

    var url = window.location.href;

    url = url.substring(0, url.indexOf('research-resources') + 19);

    if (val == 'all') {
        url += 'resources-overview/';
    } else {
        url += 'resources-overview/resource-library-search-results?s=tags%3A';
    
        url += '%22' + val + '%22';
    
        url += '&executesearch=true&cs=LibraryEntries';
    }

    window.location = url;
}

$(function () {
    var dropdowns = $('.tag-dropdown').toArray();

    handleTagDropdownValue(dropdowns);
    for (var i = 0; i < dropdowns.length; i++) {
    
        $(dropdowns[i]).on('change', function () {
            var val = this.value;
    
            handleLibraryTag(val);
        });
    }

});