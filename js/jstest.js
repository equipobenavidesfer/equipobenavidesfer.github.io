$(document).ready(function(){
  alert("pito");
  $.getJSON( "https://api.spotify.com/v1/artists/6JL8zeS1NmiOftqZTRgdTz", function( data ) {
    $("body").append(data);
  });


});
