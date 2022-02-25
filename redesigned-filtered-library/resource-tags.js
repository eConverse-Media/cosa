function handleTagDropdownValue(dropdown) {
    var url = window.location.href,
        opts = dropdown[0].options,
        tag;

    if (url.indexOf('tags') > -1) {
        tag = url.substring(url.indexOf('tags%3A') + 10, url.indexOf('&execute') - 3);

    }
    
    if (!tag) {
        tag = 'all';
    }
    
    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value == tag) {
            opts[i].selected = true;
        }
    }


}

function handleLibraryTag(val) {

    var url = window.location.href;

    url = url.substring(0, url.indexOf('research-resources') + 19);

    //NOTE this needs to change after launch
    if (val == 'all') {
        url += 'resources-overview-test/test-library-outline';
    } else {
        //NOTE this needs to change after launch
        url += 'resources-overview-test/resource-library-search-results-test?s=tags%3A';
    
        url += '%22' + val + '%22';
    
        url += '&executesearch=true&cs=LibraryEntries';
    }

    window.location = url;
}

$(function () {
    var dropdown = $('#topics');

    handleTagDropdownValue(dropdown);

    $(dropdown).on('change', function () {
        var val = this.value;

        handleLibraryTag(val);
    });
});