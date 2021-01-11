$(function() {
    $('<div class="dropdown-group"><div class="HtmlContent"></div></div>').insertAfter('.filter-title');
    $('.filter-wrap, .dropdown-group').wrapAll('<div class="filter-wrap" />');
    $('.filter-wrap .filter-wrap').removeClass('filter-wrap');
    $('.filter-wrap .SearchInputs .form-control').attr('placeholder', 'Search...');
    $('.library-content.row-wide > .col-md-4').wrapInner('<div class="selector-wrap" />');

    $('.library-content.row-wide > .col-md-4').append($('.selected-filters'));

    $('.selector-wrap .search-box .form-control').attr('placeholder', 'Search resources');
    $('.filtered-library .content-tags')
        .contents()
        .filter(function() {
            return this.nodeType === 3;
        })
        .wrap('<span></span>');
    $('.filtered-library .content-tags span').remove();

    $('.library-list').each(function() {
        var self = $(this),
            tags = $(self).find('a.label-search-tag').toArray();
        var title = $(self).find('h3 a');
        $(title).closest('.row').prepend('<div class="icon-container"/>');

        var iconContainer = $(self).find('.icon-container');

        var entryAttachementList = $(self).find('.libListReptEntAttchLble');
        $(entryAttachementList).parent().addClass('attachment-wrap');
        $(this).find('.attachment-wrap').appendTo(this);

        var timeAgo = $(this).find('.timeAgoFormat');
        var ByLine = $(this).find('.ByLine .Content > div');
        $(timeAgo).appendTo(ByLine);

        $(this).find('.tags-container').appendTo(this);

        $(self).addClass('iso');

        if (tags.length) {
            for (var i = 0; i < tags.length; i++) {
                var tag = $(tags[i]).attr('data-tag').toLowerCase();
                tag = tag.replace(/\s+/g, '-');
                tag = tag.replace(/,/g, '');
                tag = tag.replace(/[{()}]/g, '');
                tag = tag.replace(/&/g, '');
                // console.log("Tag: " + tag)
                $(self).addClass(tag);
            }
        }

        var classList = $(self).find('.listIconContainer a > div:first-of-type').attr('class');

        if (!!classList && classList.length > 0) {
            classList = classList.split(' ');

            var klass = classList[1];
            switch (klass) {
                case 'HLMListTypePresentation':
                    $(iconContainer).addClass('powerpoint');
                    break;
                case 'HLMListTypePdfMul':
                    $(iconContainer).addClass('pdf');
                    break;
                case 'HLMListTypeYoutube':
                    $(iconContainer).addClass('youtube');
                    break;
                case 'HLMListTypeWordDoc':
                    $(iconContainer).addClass('word');
                    break;
                case 'HLMListTypeHyperlink':
                    $(iconContainer).addClass('link');
                    break;
                case 'HLMListTypeImg':
                    $(iconContainer).addClass('image');
                    break;
            }
        }
    });

    makinFilters();

    // handle opening dropdowns
    $('.filter-label').click(function() {
        $($(this).parent()).toggleClass('open');
    });

    // handle closing dropdowns
    $(document).click(function(e) {
        var target = e.target,
            selector;

        // if a dropdown or its contents are clicked, don't close that dropdown
        if ($(target).parents('.filter-button-group').length) {
            var parent = $(target).parents('.filter-button-group'),
                klass = $(parent).attr('class').split(/\s+/)[0];

            selector = '.filter-button-group:not(.' + klass + ')';
            //otherwise close all dropdowns
        } else {
            selector = '.filter-button-group';
        }
        $(selector).removeClass('open');
    });

    $("div[id*='DocumentPanel'] .row > .col-md-12 .Content div[id*='ListViewContent']").isotope({
        itemSelector: '.library-list'
    });

    var contentText = [];

    // for(var i = 0; i < $('.filter-button-group').length; i++ ) {

    var groupFilterButtons = $('.filter-button-group');

    $(groupFilterButtons).each(function(i) {
        w = window;

        var filterButtonGroupEach = groupFilterButtons[i];

        firstFilterClass = filterButtonGroupEach.className.split(' ')[0];

        // return firstFilterClass;

        w['arr_' + firstFilterClass] = [];
    });

    // Update Filters When Drop down input clicked
    $('.checkbox-filter').click(function() {
        var self = $(this),
            input = $(self).find('input');

        handleCheckboxClick(input);
    });

    function handleCheckboxClick(self) {
        var parent = $(self).parents('.filter-button-group'),
            selectors = $(parent).find('.checkbox-filter input').toArray(),
            parentGroup = $(parent).attr('class').split(/\s+/)[0],
            label = $(parent).find('.filter-label'),
            text = $(self).attr('id').toLowerCase(),
            labelText,
            defaultText = 'Filter by';

        //toggle active class
        $(self).toggleClass('active');
        $(self).parent().toggleClass('is-active');

        //check for show all
        var dataFilter = $(self).attr('data-filter');
        if (!dataFilter && $(self).hasClass('active')) {
            for (var i = 1; i < selectors.length; i++) {
                var checkbox = selectors[i];
                $(checkbox).removeClass('active');
                $(checkbox).parent().removeClass('is-active');
                checkbox.checked = false;
            }
        } else {
            $(selectors[0]).removeClass('active');
            $($(selectors)[0]).parent().removeClass('is-active');
            selectors[0].checked = false;
        }

        // set dropdown label text
        text = text.replace('-', ' ');

        var klass = dataFilter.substring(1, dataFilter.length);

        var selectedFilters = $('.selected-filters .HtmlContent div').toArray();
        for (var i = 0; i < selectedFilters.length; i++) {
            var currentFilter = selectedFilters[i];
            if ($(currentFilter).hasClass(parentGroup)) {
                if (text == 'all') {
                    $(currentFilter).find('h4').remove();
                } else if ($(self).hasClass('active')) {
                    $('<h4 class="' + klass + '">' + text + '<button type="button" onclick="removeMe(this);"><i class="cosa cosa-trash-alt"></i></button></h4>').appendTo(currentFilter);
                } else {
                    var elem = $(currentFilter).find('.' + klass);
                    $(elem).remove();
                }
            }
        }

        filterButtonGroup = $('.filter-button-group');

        $(filterButtonGroup).each(function(i) {
            var filterButtonFirstElement = filterButtonGroup[i];
            var elementFirstClass = filterButtonFirstElement.className.split(' ')[0];
            var classConversion = elementFirstClass.replace(/-/g, ' ');

            switch (parentGroup) {
                case elementFirstClass:
                    if (!dataFilter) {
                        w['arr_' + elementFirstClass] = [];
                    }
                    labelText = w['arr_' + elementFirstClass];
                    defaultText += ' ' + classConversion;
                    break;
            }
        });

        if ($(self).hasClass('active') && !!text && text !== 'all') {
            labelText.push(text);
        } else {
            var index = labelText.indexOf(text);
            if (index !== -1) {
                labelText.splice(index, 1);
            }
        }

        if (labelText.length) {
            labelText = labelText.join(', ');
            $(label).text(labelText);
            $(parent).find('.filter-content').addClass('has-selection');
        } else {
            $(label).text(defaultText);
            $(parent).find('.filter-content').removeClass('has-selection');
        }

        updateFilters();
    }

    $(document).click(function(e) {
        var target = e.target,
            selector;

        if ($(target).parents('.filter-content').length) {
            var parent = $(target).parents('.filter-content'),
                klass = $(parent).parent().attr('class').split(/\s+/)[0];
            selector = '.filter-button-group:not(.' + klass + ') .filter-content';
        } else {
            selector = '.filter-content';
        }
        $(selector).removeClass('open');
    });
});

function updateSelection(val, klass, filters) {
    var checkboxes = $(val).find('.active').toArray(),
        localFilters = [];

    $(checkboxes).each(function() {
        var dataFilter = $(this).attr('data-filter');
        localFilters.push(dataFilter);
    });

    filters[klass] = localFilters;
}

function updateFilters() {
    var groups = $('.filter-button-group').toArray(),
        filters = {};

    $(groups).each(function() {
        var self = $(this),
            klass = $(self).attr('class').split(/\s+/)[0],
            selector = '.' + klass;

        updateSelection(selector, klass, filters);
    });

    var filterVal = concatFilters(filters);

    $('.grid div[id*="ListViewContent"]').isotope({ filter: filterVal });
}

function concatFilters(obj) {
    var allFilters = [];

    for (var prop in obj) {
        var group = obj[prop];
        if (!group.length) {
            continue;
        }

        if (!allFilters.length) {
            allFilters = group.slice(0);
            continue;
        }

        var nextFilterList = [];

        for (var i = 0; i < allFilters.length; i++) {
            for (var j = 0; j < group.length; j++) {
                var item = allFilters[i] + group[j];
                nextFilterList.push(item);
            }
        }

        allFilters = nextFilterList;
    }

    allFilters = allFilters.join(', ');

    return allFilters;
}

function makinFilters() {
    categoryList = [];

    $('.label-search-tag:not([aria-label*="User"])').each(function() {
        var self = $(this);
        categoriesMaster = {};
        var ariaLabels = $(self).attr('aria-label');
        var filterCategory = ariaLabels.indexOf(':');
        var categoryValue = ariaLabels.slice(6, filterCategory);
        var tagValueStart = ariaLabels.indexOf('tag=') + 4;
        var tagValue = ariaLabels.slice(tagValueStart, ariaLabels.length);
        categoriesMaster.categoryType = categoryValue;
        categoriesMaster.tag = tagValue;
        categoryList.push(categoriesMaster);
    });

    categoryList.forEach(function(category) {
        var categoryTypeClassConversion = category.categoryType;
        categoryTypeClassConversion = categoryTypeClassConversion.replace(/\s+/g, '-').toLowerCase();
        categoryTypeClassConversion = categoryTypeClassConversion.replace(/&/g, 'and').toLowerCase();

        var categoryTagClassConversion = category.tag;
        categoryTagClassConversion = categoryTagClassConversion
            .replace(/\s+/g, '-')
            .replace(/[^a-zA-Z0-9\-]+/g, '')
            .toLowerCase();

        if (
            $('.dropdown-group .HtmlContent > div.' + categoryTypeClassConversion + '.filter-button-group').length === 0
        ) {
            $('.dropdown-group .HtmlContent').append(
                '<div class="' +
                categoryTypeClassConversion +
                ' filter-button-group "><h2>' +
                category.categoryType +
                '</h2><span class="filter-label">Filter by</span><div class="filter-content"><ul class="multiple-select"></ul></div></div>'
            );
        }

        if ($('.filter-button-group').hasClass(categoryTypeClassConversion)) {
            if (
                $('ul.multiple-select > li.checkbox-filter input[data-filter=".' + categoryTagClassConversion + '"]')
                .length === 0
            ) {
                $('div.' + categoryTypeClassConversion + '.filter-button-group ul.multiple-select').append(
                    '<li class="checkbox-filter"><input type="checkbox" id="' +
                    category.tag +
                    '" data-filter=".' +
                    categoryTagClassConversion +
                    '">' +
                    category.tag +
                    '<span class="checkmark"></span></li>'
                );
            }
        }
    });

    //I got this far before I had a breakdown
    handleSelection();

    function handleSelection() {
    	$('.filter-button-group').each(function() {
    		var selectionClassList = $(this).attr('class'),
    		selectionClassList = selectionClassList.split(' ');
    		selectionClass = selectionClassList[0];
    		selectionClass = selectionClass
    		.replace(/\s+/g, '-')
    		.replace(/&/g, 'and')
    		.replace(/[^a-zA-Z0-9\-]+/g, '')
    		.toLowerCase();
    		headerText = $(this).find('h2').text()

    		var header = '<div class="' + selectionClass +'"><h2>' + headerText + '</h2></div>'
    		$(header).appendTo('.selected-filters .HtmlContent')

        });
        
        // add 'Clear All' button

        var clearAllButton = '<button type="button" onclick="clearFilters();">Clear All</button>';

        $(clearAllButton).appendTo('.selected-filters .HtmlContent');

    }


    $('.filter-button-group').wrapAll('<div class="row "/>');

    $('.filter-button-group .filter-content .multiple-select').prepend(
        '<li class="checkbox-filter"><input type="checkbox" id="all" data-filter="">Show All<span class="checkmark"></span></li>'
    );
}

function clearFilters() {
    $('.selected-filters h4').remove();
    $('.filter-button-group').each(function () {
        var self = $(this),
            selectors = $(self).find('checkbox-filter input');

        $(selectors).each(function () {
            var selector = $(this);
            $(selector).removeClass('active');
            selector.checked = false;
            $(selector).parent().removeClass('is-active');
        });
    });
    $('.grid div[id*="ListViewContent"]').isotope({ filter: '*' });
    $('.filter-label').text('Filter By');
    $('.filter-content').removeClass('has-selection');
}

function removeMe(elem) {
    var parent = $(elem).closest('h4'),
        parentClass = $(parent).attr('class');
    var filterElem = $('input[data-filter=".' + parentClass + '"]');
    $(filterElem).removeClass('active');
    filterElem.checked = false;
    $(parent).remove();

    // do something so that it only removes the active class and changes the text back to Filter By/removes 'has-selection' if it's the last one in that list to be removed
    $(filterElem).parent().removeClass('is-active');

    // refactor so this + clear filters has less code repetition
}