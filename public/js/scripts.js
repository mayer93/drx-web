/* select album in spotify player */
$(document).on("click", ".spotify-selector-img:not(.selected)", function() {
    $(".spotify-selector-img.selected").removeClass("selected");
    $(this).addClass("selected");
    if ($('#spotify-iframe').length != 0) {
        $('#spotify-iframe').remove();
        /*$('#spotify-iframe').fadeOut("normal", function() {
            $(this).remove();
        })*/
    }
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

    if (iframeSrc != "") {
        var elementStr = "<iframe id=\"spotify-iframe\" src='" + iframeSrc + "' width=\"300\" height=\"380\" frameborder='0' allowtransparency='true' allow='encrypted-media'></iframe>";
        $(elementStr).hide().appendTo('.spotify-player').fadeIn(600);
        /*$('.spotify-player').append(elementStr);*/
    }
})