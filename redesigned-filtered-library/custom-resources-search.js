function searchResources() {
    var searchTerm = $('#custom-resource-search-input').val();

    var url = window.location.href;

    url = url.substring(0, url.indexOf('research-resources') + 19);

    url += 'resources-overview/resource-library-search-results?s=';

    url += '%22' + searchTerm + '%22';
    
    url += '&executesearch=true&cs=LibraryEntries';

    window.location = url;
        
}

$(function () {
    var input = document.getElementById('custom-resource-search-input');

    input.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            searchResources();
        }
    });
});