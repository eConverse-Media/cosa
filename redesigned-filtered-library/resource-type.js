function handleLibraryFilter(val) {

    var url = window.location.href;

    if (url.indexOf('?') > -1) {
        url = url.substring(0, url.indexOf('?'));

    } else if (val != 'all') {
        url = url + '?folder=' + val;
    }
    console.log('>>>>>>>> ', url);
}

$(function () {
    var dropdown = $('#resource-type');

    $(dropdown).on('change', function () {
        var val = this.value;

        handleLibraryFilter(val);
    });
});