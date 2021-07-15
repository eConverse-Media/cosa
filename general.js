$(function() {
    if ($('.HLWelcome .imgButton').length) {
        $('body').addClass('logged-in');
    }

    $('#BreadCrumb').appendTo('#PageTitleH1');

    handleAnchor();
    handleSearch();
    handleCallout();
    handleSupportCTA();
    userGroupTabs();
    handleUpcomingEvents();
    handleClickableTiles();

    $('.latest-blogs .SearchResults.HLLandingControl .Content ul li').each(function() {
        handleAjaxCall(this);

        var label = $(this).find('span.label');
        var labelTextBlog = $(this).find('span.label:contains(Blog Entry)');
        $(labelTextBlog).text('Blog');

        var imgContainer = $(this).find('.img-container');
        var textContainer = $(this).find('.text-container');

        var moreLink = $(this).find('.text-container .showMoreLink');
        $(label).appendTo(imgContainer);
        $(moreLink).appendTo(textContainer);
    });
});

function openPanel(klass) {
    $('.bg-our-mission .panel').hide();
    $('.bg-our-mission .panel' + klass).show();
}


function handleAnchor() {
    $('.interior #MainCopy_ContentWrapper').append(
        '<button onclick="topFunction()" id="topButton" title="Go to top">Back to Top<i class="far fa-chevron-up"></i></button>'
    );

    mybutton = document.getElementById('topButton');

    $('#topButton').on('click', function(e) {
        e.preventDefault();
        topFunction();
    });

    window.onscroll = function() {
        scrollFunction();
    };
}

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        $(mybutton).addClass('display');
    } else {
        $(mybutton).removeClass('display');
    }
}

function topFunction() {
    $('html, body').animate({
            scrollTop: '0'
        },
        1000
    );
}

function handleSearch() {
    $('.search-bar-top').insertBefore('#MPAuxNav ul.level1');
    $('#searchColumn .input-group input[id$="SearchTerm"]').attr('placeholder', 'Type search terms here...');
}

function handleCallout() {
    $('.callout-box .HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
    $('.callout-box .HtmlContent img').wrap('<div class="img-container" />');

    var imgContainer = $('.callout-box .img-container');
    var ImgSrc = $('.callout-box img').attr('src');
    $('.callout-box img').hide();
    $(imgContainer).css('background-image', 'url("' + ImgSrc + '")');
}

function handleSupportCTA() {
    $('.hero-cta img').hide();
    var heroBGSrc = $('.hero-cta img').attr('src');
    $('.hero-cta .img-container').css('background-image', 'url("' + heroBGSrc + '")');
}

function userGroupTabs() {
    $('.tabbed-content .col-md-8').append(
        '<div class="row-groups"><div class="container"><div class="row"><div class="col-md-12"><ul class="nav nav-tabs" role="tablist"></ul></div></div><div class="row"><div class="col-md-12"><div class="tab-content"></div></div></div></div></div>'
    );

    var counter = 1;

    $('.tabbed-content .tabs').each(function() {
        $(this).wrap(
            '<div id="tab-' +
            counter +
            '" class="tab-pane" aria-labelledby="tab-' +
            counter +
            '" role="tabpanel" ></div>'
        );

        $('.tab-content').append($('#tab-' + counter));

        $('.nav-tabs').append(
            '<li role="presentation"><a href="#tab-' +
            counter +
            '" aria-controls="all" role="tab" data-toggle="tab">FIRST TAB</a></li>'
        );

        var tabTitle = $('#tab-' + counter).find(' .tabs .heading h2').text();

        $('.tabs .heading h2').hide();
        // var tabTitleText = $(tabTitle).text().replace('User Groups', '');

        $('.nav-tabs a[href="#tab-' + counter + '"]').text(tabTitle);

        counter++;
    });

    $('.tabbed-content .nav-tabs > li:first-of-type').addClass('active');

    $('.tabbed-content .tab-content > div.tab-pane:first-of-type').addClass('active');

    $('.tabs ul li').each(function() {
        var communityName = $(this).find('h5');
        var byline = $(this).find('.ByLine');

        $(byline).appendTo(this);
        $(communityName).appendTo(this);
    });

    $('.announcements .SearchResults.HLLandingControl ul li').each(function() {
        var communityName = $(this).find('h5');
        var byline = $(this).find('.ByLine');

        $(byline).appendTo(this);
        $(communityName).appendTo(this);
    });

    $('.community-activity .SearchResults.HLLandingControl ul li').each(function() {
        var communityName = $(this).find('h5');
        var byline = $(this).find('.ByLine');

        $(byline).appendTo(this);
        $(communityName).appendTo(this);
    });
}

function handleUpcomingEvents() {
    $('.upcoming-events .HLLandingControl.HLEventList ul li').each(function() {
        /* event image */
        $(this).find('> *:not(img)').wrapAll('<div class="text-container" />');
        var imgContainer = '<div class="img-container" />';
        $(this).prepend(imgContainer);

        var eventImage = $(this).find('.col-md-3 img');
        $(eventImage).hide();
        var eventImageSrc = $(eventImage).attr('src');
        $(this).find('.img-container').css('background-image', 'url("' + eventImageSrc + '")');

        /* month 3 letters */
        var month = $(this).find('.date-block .calendar-month span').text();
        month = month.substring(0, 3);
        $(this).find('.date-block .calendar-month').text(month);

        // /* event info */

        var eventLocation = $(this).find('div[id*="LocationPanel"]');
        var eventDate = $(this).find('.timeAgoFormat');

        var div = $(this).find('div[id*="CalendarMain"] > .row.title-row > .col-md-12');
        $(div).append(eventDate);
        $(div).append(eventLocation);
    });
}

function handleClickableTiles() {
    $('.make-clickable').each(function() {
        var self = $(this),
            link = $(self).find('a'),
            href = $(link).attr('href');

        $(self).wrapInner('<a href="' + href + '" />');
        $(link).hide();
    });
}