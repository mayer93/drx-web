var preScroll = 0;

/* select album in spotify player */
$(document).on("click", ".spotify-selector-img:not(.selected)", function() {
    /* modify playlist selectors */
    $(".spotify-selector-img.selected").removeClass("selected");
    $(this).addClass("selected");
    
    /* retrieve current playlist(s) */
    var current = $('.spotify-player-inner');
    var loading = $('.iframe-loading'); /* check if there is any other playlist already loading (for example, if we click two icons in a very short period of time) */

    /* check playlist name and get link to iframe */
    var album = $(this).attr('id');
    var iframeSrc = "";
    switch (album) {
        case "masa-icon":
            iframeSrc = "https://open.spotify.com/embed/album/3IT4zdyKrgWqvPKLjGTEiA";
            break;
        case "true-siberian-icon":
            iframeSrc = "https://open.spotify.com/embed/album/4LSzNFgbjBP8To1uIe6R12";
            break;
        case "reborn-icon":
            iframeSrc = "https://open.spotify.com/embed/album/2PgcRiV3RN9S1YFuwMOSSJ";
            break;
        case "meet-the-doctor-icon":
            iframeSrc = "https://open.spotify.com/embed/album/4EqShfLsLcZLbmnFac0Fw6";
            break;
        default:
            iframeSrc = "";
    }

    /* remove current playlist(s) with fadeout and add new one with fadein */
    if (iframeSrc != "") {
        var elementStr = "<div class=\"spotify-player-inner iframe-loading\"><iframe class=\"spotify-iframe\" src='" + iframeSrc + "' width=\"300\" height=\"380\" frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe></div>";
        $(elementStr).hide().appendTo('.spotify-player').delay(650).fadeIn(300, function() { /* delay is just for aesthetics (to avoid starting the fadein while loading the playlist) */
            $(this).removeClass("iframe-loading");
        });
        if ($(loading).length != 0) {
            $(loading).remove(); /* we remove other loading playlists to avoid accumulating them in case we continously click icons */
        }
        if ($(current).length != 0) {
            $(current).fadeOut(950, function() {
                $(this).remove();
            });
        }
        /*$('.spotify-player').append(elementStr);*/
    }
})

// parallax
window.addEventListener('scroll', function() {
    if ($(window).width() >= 576) {
        var bgParallaxList = document.getElementsByClassName('parallax');
        for (var i = 0; i < bgParallaxList.length; i++) {
            var bgParallax = bgParallaxList.item(i);
            bgParallax.style.backgroundPositionY = calculateBackgroundPositionY(bgParallax);
        }
    }
});

function calculateBackgroundPositionY(elem) {
    if (elementIsOnScreen(elem, false, 0)) {
        return (50 + 0.06 * (getElementCenter(elem) - getDocviewCenter())) + '%';
    }
    else {
        return '50%';
    }
}

function getDocviewCenter() {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var docViewCenter = (docViewTop + docViewBottom) / 2;
    
    return docViewCenter;
}

function getElementCenter(elem) {
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    var elemCenter = (elemTop + elemBottom) / 2;

    return elemCenter;
}

function elementIsOnScreen(elem, above, margin) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    if (above) {
        return (elemTop < docViewBottom - margin);
    } else {
        return (elemBottom >= docViewTop) && (elemTop <= docViewBottom);
    }
}


// navbar autohide

document.addEventListener("DOMContentLoaded", function(){

    autohideElem = document.querySelector('.autohide');
      
    if(autohideElem){
        var lastScrollTop = 0;
        if (window.scrollY == 0) {
            $(autohideElem).addClass('on-top');
        }
        else {
            $(autohideElem).addClass('scrolled-down');
        }
        window.addEventListener('scroll', function() {
            let scrollTop = window.scrollY;
            if(scrollTop < lastScrollTop) {
                    $(autohideElem).removeClass('scrolled-down');
                    $(autohideElem).addClass('scrolled-up');
                }
                else {
                    $(autohideElem).removeClass('scrolled-up');
                    $(autohideElem).addClass('scrolled-down');
                }
                if (scrollTop == 0) {
                    $(autohideElem).addClass('on-top');
                }
                else {
                    $(autohideElem).removeClass('on-top');
                }
                lastScrollTop = scrollTop;
        });
    }
})

// scroll animations

document.addEventListener("DOMContentLoaded", function() {

    var animatedElems = document.getElementsByClassName('animated');
    for (var i = 0; i < animatedElems.length; i++) {
        var elem = animatedElems.item(i);
        if (elementIsOnScreen(elem, true, 0) && !$(elem).hasClass('scrolled')) {
            $(elem).addClass('scrolled');
        }
        else if ($(elem).hasClass('scrolled')) {
            $(elem).removeClass('scrolled');
        }
    }

    window.addEventListener('scroll', function() {
        for (var i = 0; i < animatedElems.length; i++) {
            var elem = animatedElems.item(i);
            if (elementIsOnScreen(elem, true, 250) && !$(elem).hasClass('scrolled')) {
                $(elem).addClass('scrolled');
            }
            else if (!elementIsOnScreen(elem, true, 0) && $(elem).hasClass('scrolled')) {
                $(elem).removeClass('scrolled');
            }
        }

    })
})