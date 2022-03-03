function handleTagDropdownValue(dropdowns) {
    var url = window.location.href,
        tag;

    if (url.indexOf('tags') > -1) {
        if (url.indexOf('tags%3A') > -1) {
            tag = url.substring(url.indexOf('tags') + 10, url.indexOf('&execute') - 3);
        } else {
            tag = url.substring(url.indexOf('tags') + 8, url.indexOf('&execute') - 3);
        }

    }
    
    if (!tag) {
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