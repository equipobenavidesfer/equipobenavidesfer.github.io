$(document).ready(function(){
  $('body').on('click', '.artistcl', function() {    //Artist Lookup para el modal
    $(".modal-body").html('');
  var artistlookup = $(this).text();
    $.ajax({
        type : 'POST',
        url : 'http://ws.audioscrobbler.com/2.0/',
        data : 'method=artist.getinfo&' +
               'artist=' + artistlookup + '&' +
               'api_key=57ee3318536b23ee81d6b27e36997cde&' +
               'format=json',
        dataType : 'jsonp',
        success : function(data) {
            $('#myModal').modal('show');
            $('.modal-body').append(data.artist.name + '<br>'); // Nombre de Artista
            $('.modal-body').append('<img src="' + data.artist.image[2]['#text'] + '" /><br>'); //Foto de artista
            $('.modal-body').append('<p class=numunf>' + data.artist.stats.listeners + '</p><p> Oyentes </p>'); //Listeners
            $('.modal-body').append('<p class=numunf>' + data.artist.stats.playcount + '</p><p> Reproducciones </p>'); // Playcount
            $('.modal-body').append(data.artist.bio.content); //Biografia artista

            function numberWithCommas(x) {   //Darle Formato de Comas a nuestros Scrobbles
              return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");}

              $('.numunf').each(function(){
              var v_pound = $(this).html();
              v_pound = numberWithCommas(v_pound);
              $(this).html(v_pound)

            });
        }, //Success end
        error : function(code, message){
            alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
        } //Error end
    }); //Click handler
});

  $("#usernamebtn").on("click", function(){ //Funcion buscador de usuario
    $('#mydiv').html('');
    $('#usersTop').html('');
    var username = $("#usernametxt").val();
      $.ajax({ //USER BASIC INFO
          type : 'POST',
          url : 'http://ws.audioscrobbler.com/2.0/',
          data : 'method=user.getinfo&' +
                 'user=' + username + '&' +
                 'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                 'format=json',
          dataType : 'jsonp',
          success : function(data) {
              $('#mydiv').append(data.user.name + '<br>'); //Nombre de Usuario
              $('#mydiv').append('<img src="' + data.user.image[3]['#text'] + '" /><br>'); //Imagen de Perfil
              $('#mydiv').append('<br>' + data.user.country); //País
              $('#mydiv').append('<br>' + data.user.age); //Edad
              $('#mydiv').append('<br>' + data.user.playcount); //Scrobbles
              $('#mydiv').append('<br><date uts=\"' + data.user.registered['#text'] + '">Fecha</date><br><br><br>'); //Fecha de Ingreso
          },
          error : function(code, message){
               alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
          }
      }); //USER BASIC INFO end

     $.ajax({    //USER TOP TRACKS
         type : 'POST',
         url : 'http://ws.audioscrobbler.com/2.0/',
         data : 'method=user.getRecentTracks&' +
                'user=' + username + '&' +
                'limit=6&' +
                'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                'format=json',
         dataType : 'jsonp',
         success : function(data) {

    for (i=0; i<6; i++ ){ //Queremos 5 canciones únicamente

             $('#usersTop').append('<p class=\"artistcl\">' +
             data.recenttracks.track[i].artist['#text'] + '</p>'); //Nombre de artista. [x] = Numero de la pista
              $('#usersTop').append(data.recenttracks.track[i].name); // Nombre de la pista
              $('#usersTop').append('<br>' + data.recenttracks.track[i].album['#text']); //Nombre del album
              $('#usersTop').append('<br><img src=\"' + data.recenttracks.track[i].image[1]['#text'] + '\"><br><br><br>'); //Img del album
        }
      }, //Success end
         error : function(code, message){
              alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
         }
         //USER TOP TRACKS end
     });
   });//click handler
}); //DO NOT ERASE
