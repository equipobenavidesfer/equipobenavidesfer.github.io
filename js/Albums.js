$(document).ready(function(){
  $("#fetch").on("click", function(){ //Funcion Madre: Buscador de Album
    $('table tbody').html('');
    $('#mydiv').html('');
    var albumname = $("#albname").val();
       $.ajax({
       type : 'GET',
       url : 'https://api.spotify.com/v1/search?query='  +  albumname   +  '&limit=1&type=album',
       dataType : 'json',
       success : function(albumdata) {
                  $.ajax({  //Función Hija: Buscador de Pistas con la variable Album arrastrada de la Madre
                  type: 'GET',
                  url: 'https://api.spotify.com/v1/albums/' + albumdata.albums.items[0].id + '/tracks',
                  dataType: 'json',
                  success: function(trackdata){
                  var tracknumber = trackdata.total; //Tomamos el numero total de pistas
                  for (i=0; i<tracknumber; i++){ //Loop para cada pista
                    $('table tbody').append('<tr></tr>');
                    $('table tbody').append("<td><img src=\"" + albumdata.albums.items[0].images[1]["url"] + "\"></img></td>"); // Imágen de Album
                    $('table tbody').append("<td><p>" + trackdata.items[i].artists[0].name + "</p></td>"); //Nombre de la banda
                    $('table tbody').append("<td><a href=\"" + trackdata.items[i].preview_url +
                    "\" target=\"_blank\">" + trackdata.items[i].name + "</a><i class=\"fa fa-volume-up fa-lg\"></i></td>") //Pista de album con link para preview
                    $('table tbody').append("<td><a href=\"" + trackdata.items[i].external_urls.spotify +
                    "\"class=\"btn btn-info btn-lg\"> ABRIR EN SPOTIFY <i class=\"fa fa-external-link fa-inverse\"></i></a></td>"); // Link para abrir en Spotify
                   }
                  },
                  error: function(errormsg){
                       alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
                  }
                }); //CHILD AJAX HANDLER
       }, //MOTHER AJAX ERROR SWITCH HANDLER
       error : function(errormsg2){
           alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
       }
   }); //MOTHER AJAX HANDLER
   });//click handler


}); //DO NOT ERASE
