$(function() {
    // Set background images for any content item that has the bg-image class
    $('.bg-image').each(function() {
        handleBgImage($(this), $(this));
        $(this).find('img').hide();
    });

    $('.main-slide').each(function() {
        $(this).find('.HtmlContent > *:not(img)').wrapAll('<div class="text-container" />');
        $(this).find('.HtmlContent img').wrap('<div class="img-container" />');

        var imgContainer = $('.img-container');
        var ImgSrc = $(this).find('img').attr('src');
        $(this).find('img').hide();
        $(this).find(imgContainer).css('background-image', 'url("' + ImgSrc + '")');
    });

    /*** Main Slider ***/
    $('.main-slide').wrapAll('<div class="main-slider slick-dotted" />');
    handleSlideCount();
    $('.main-slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 7000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: '<button type="button" class="prev-arrow slick-arrow"><i class="fal fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="next-arrow slick-arrow"><i class="fal fa-arrow-right"></i></button>'
    });

    $('.main-slide .text-container').each(function() {
        var h2 = $(this).find('h2');
        $(h2).wrapInner('<span />');
    });

    /*** Blogs Slider ***/

    $('.latest-blogs .SearchResults.HLLandingControl .Content ul li').wrapAll(
        '<div class="col-md-9 blog-slider slick-dotted" />'
    );

    $('.blog-slider').slick({
        draggable: false,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="prev-arrow slick-arrow" onclick="subtractWidth()"><i class="fal fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="next-arrow slick-arrow" onclick="addWidth()";><i class="fal fa-arrow-right"></i></button>',
        responsive: [{
            breakpoint: 1024,
            settings: {
                arrows: false,
                draggable: false
            }
        }]
    });

    $('.latest-blogs .row.heading').addClass('col-md-3');
    var blogNav = $('<div class="blog-nav"><div class="HtmlContent"></div></div>');
    $(blogNav).appendTo('.blog-slider');

    /*** Sponsor Slider ***/

    $('.sponsor-logos').wrapAll('<div class="sponsor-slider slick-dotted" />');
    $('.sponsor-slider').slick({
        dots: true,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 7000,
        slidesToShow: 3,
        slidesToScroll: 3
    });

    appendToSection();

    /*** Event Slider ***/

    $('.upcoming-events .HLLandingControl.HLEventList .Content ul li').wrapAll(
        '<div class="event-slider slick-dotted" />'
    );

    $('.event-slider').slick({
        draggable: false,
        dots: false,
        arrows: true,
        infinite: true,
        autoplay: false,
        slidesToShow: 2,
        slidesToScroll: 2,
        prevArrow: '<button type="button" class="prev-arrow slick-arrow" onclick="subtractWidth()"><i class="fal fa-arrow-left"></i></button>',
        nextArrow: '<button type="button" class="next-arrow slick-arrow" onclick="addWidth()";><i class="fal fa-arrow-right"></i></button>',
        responsive: [{
            breakpoint: 769,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });

    var blogNav = $('<div class="blog-nav"> <div class="HtmlContent"></div></div>');
    $(blogNav).appendTo('.event-title .HtmlContent');
});

function handleSlideCount() {
    var slideArray = $('.main-slide').toArray(),
        slideCount = slideArray.length;

    for (var i = 0; i < slideCount; i++) {
        var slide = slideArray[i],
            number = i + 1,
            h6Text = '<h6>' + number + '/' + slideCount + '</h6>';

        $(slide).find('.HtmlContent .img-container').append(h6Text);
    }
}

function addWidth() {
    var blogNav = $('.blog-nav .HtmlContent');
    right = 'right';
    middle = 'middle';

    if (!$(blogNav).hasClass(middle) && !$(blogNav).hasClass(right)) {
        $(blogNav).addClass(middle);
    } else if ($(blogNav).hasClass(middle)) {
        $(blogNav).removeClass(middle).addClass(right);
    } else if ($(blogNav).hasClass(right)) {
        $(blogNav).removeClass(right).removeClass(middle);
    }
}

function subtractWidth() {
    var blogNav = $('.blog-nav .HtmlContent');
    right = 'right';
    middle = 'middle';

    if (!$(blogNav).hasClass(middle) && !$(blogNav).hasClass(right)) {
        $(blogNav).addClass(right);
    } else if ($(blogNav).hasClass(middle)) {
        $(blogNav).removeClass(middle);
    } else if ($(blogNav).hasClass(right)) {
        $(blogNav).removeClass(right).addClass(middle);
    }
}

function appendToSection() {
    $('.sponsor-slider').wrapAll('<div class="sponsors" />');
    $('.our-sponsors').appendTo('.bg-our-sponsors div[class*="section"]');
    $('.sponsors').appendTo('.bg-our-sponsors div[class*="section"]');
}