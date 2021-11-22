$(function() {
    var name = $('.HLWelcomeHeader .panel-body h4').text(),
        greeting = '<div class="greeting"><span>Welcome back, </span><a href="profile">' + name + '!</a></div>',
        progressBar = '',
        progressText = '';

    //create the first column
    $('.first-column').wrapAll('<div class="dashboard-col-1 col-md-6" />');
    $('.first-column.make-buttons.dashboard-btn').wrapAll('<div class="buttons-container"/>');
    if (!!$('#Welcome_Content div[id*="CompleteBarProgress"]').html()) {
        progressBar = $('#Welcome_Content div[id*="CompleteBarProgress"]').clone();
        $(progressBar).addClass('dashboard-progress');
        progressText = '<span class="progress-text">Profile completion:</span>';
        $(progressText).prependTo(progressBar);
    } else {
        progressBar =
            '<div class="dashboard-progress"><span class="progress-text">Login to complete your profile</span><div class="progress"><div class="progress-bar progress-bar-info" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 50%;">50%></div></div></div>';
    }
    $(progressBar).prependTo('.dashboard-col-1');
    $(greeting).prependTo('.dashboard-col-1');
    if (!!$('.member-dashboard-img').html()) {
        $('.member-dashboard-img').prependTo('.dashboard-col-1');
    }

    //create the second column
    $('.second-column').wrapAll('<div class="dashboard-col-2 col-md-6" />');
    $('.second-column.featured-news .HLLandingControl .row.heading h2').prependTo('.second-column .HLLandingControl ul li');
    $('.second-column.featured-news .HLLandingControl ul li .showMoreLink').appendTo('.second-column .HLLandingControl ul li');


    //create the dashboard
    $('.dashboard-col-1, .dashboard-col-2').wrapAll('<div class="member-dashboard"></div>');

    $('.member-dashboard').wrapInner('<div class="row row-wide" />');

    //check for desktop
    checkForDesktop();

    $('.member-dashboard-toggle').appendTo('.member-dashboard');

    // handle click event
    $('.member-dashboard-toggle').click(function() {
        if ($('.member-dashboard').hasClass('open')) {
            handleClose();
        } else {
            handleOpen();
        }
    });

    handleAnnouncements();

    // Handle Inbox Messages

    if ($('.Welcome ul#ProfileContainer .panel .panel-body .row .welcome-links a[id*="MessagesCount"]').length) {
        handleProfileImgInboxNumber();
    }
});

function handleProfileImgInboxNumber() {
    var inboxNumberValue = $(
        '.Welcome ul#ProfileContainer .panel .panel-body .row .welcome-links a[id*="MessagesCount"]'
    ).text();
    var inboxNumberText = inboxNumberValue.slice(0, 3);

    $('.member-dashboard-img .UserControl .row .col-md-12 .row div[id*="pnlImage"]').prepend(
        '<div class="inbox-numbers">' + inboxNumberText + '</div>'
    );
}

function checkForDesktop() {
    if ($(window).width() < 991) {
        slickify();
    }
}

function handleAnnouncements() {
    $('.member-dashboard .second-column .HLRecentBlogs ul li').each(function() {
        var text = $(this).find('.text-container');
        $(this).find('.ByLine').appendTo(text);
        $(text).prependTo(this);

        // var readMore = $(this).find($('a[id*="More"]'));
        // $(byline).insertBefore($(readMore));
        // // var h3a = $(this).find('.content-row h3 a');
        // var readMoreHref = $(readMore).attr('href');
        // $(this).wrap('<a href="' + readMoreHref + '"></a>');
    });
}

function slickify() {
    $('.member-dashboard .row.row-wide').slick({
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: false,
        mobileFirst: true,
        responsive: [{
            breakpoint: 992,
            settings: 'unslick'
        }]
    });
}