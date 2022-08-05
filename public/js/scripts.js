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
        $(elementStr).hide().appendTo('.spotify-player').delay(1000).fadeIn(750, function() { /* delay is just for aesthetics (to avoid starting the fadein while loading the playlist) */
            $(this).removeClass("iframe-loading");
        });
        if ($(loading).length != 0) {
            $(loading).remove(); /* we remove other loading playlists to avoid accumulating them in case we continously click icons */
        }
        if ($(current).length != 0) {
            $(current).fadeOut(1750, function() {
                $(this).remove();
            });
        }
        /*$('.spotify-player').append(elementStr);*/
    }
})