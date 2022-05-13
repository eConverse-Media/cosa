function handleDropdownValue(dropdown) {
    var url = window.location.href,
        opts = dropdown[0].options;

    var folder = url.substring(url.indexOf('?folder=') + 8, url.length);

    if (!folder) {
        folder = 'all';
    }

    for (var i = 0; i < opts.length; i++) {
        if (opts[i].value == folder) {
            opts[i].selected = true;
        }
    }
}

function handleLibraryFilter(val) {

    var url = window.location.href;

    url = url.substring(0, url.indexOf('resource-center') + 15);

    if (val != 'all') {
        url = url + '?folder=' + val;
    }
    window.location = url;
}

$(function () {
    var dropdown = $('#resource-type');

    handleDropdownValue(dropdown);

    $(dropdown).on('change', function () {
        var val = this.value;

        handleLibraryFilter(val);
    });
});