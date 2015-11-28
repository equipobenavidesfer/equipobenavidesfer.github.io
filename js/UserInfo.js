$(document).ready(function(){
  $("h2").hide();
  $(".table-striped").hide();
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
            $('.modal-body').append('<h3>' + data.artist.name + '</h3><br>'); // Nombre de Artista
            $('.modal-body').append('<img src="' + data.artist.image[2]['#text'] + '" /><br>'); //Foto de artista
            $('.modal-body').append('<p class=numunf>' + data.artist.stats.listeners + '</p><p id=\"tagged\"> Oyentes </p><br>'); //Listeners
            $('.modal-body').append('<p class=numunf>' + data.artist.stats.playcount + '</p><p id=\"tagged\"> Reproducciones </p>'); // Playcount
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

  $("#usernamebtn").on("click", function(){  //Funcion buscador de usuario
    $("h2").show();
    $(".table-striped").show();
    $('#mydiv').html('');
    $('#usersTop').html('');
    $('#userprofile #usernametxt').html('');
    $('#userprofile #usernameimg').html('');
    $('#userprofile #usernamescrobbles').html('');
    $('#userprofile #misc').html('');
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
              $('#userprofile #usernametxt').append('<p>' + data.user.name + '</p>'); //Nombre de Usuario
              $('#userprofile #usernameimg').append('<img src="' + data.user.image[3]['#text'] + '" />'); //Imagen de Perfil
              $('#userprofile #usernamescrobbles').append('<p>Reproducciones: ' + data.user.playcount + '</p>'); //Scrobbles
              $('#userprofile #misc').append('<p> País: ' + data.user.country + '   '); //País
            //  $('#userprofile #misc').append('Edad: ' + data.user.age + '</p>'); //Edad, la dejamos fuera
            //  $('#userprofile #misc').append('<br><date uts=\"' + data.user.registered['#text'] + '">Fecha</date><br><br><br>');
            //Fecha de Ingreso, la dejamos fuera
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
             $('#mytarget').html('');
    for (i=0; i<6; i++ ){ //Queremos 5 canciones únicamente
              $('#mytarget').append('<tr></tr>');
              $('#mytarget').append('<td><img src=\"' + data.recenttracks.track[i].image[1]['#text'] + '\"></td>'); //Img del album
             $('#mytarget').append('<td><p class=\"artistcl\">' +
             data.recenttracks.track[i].artist['#text'] + '<i class="fa fa-question-circle"></i></p></td>'); //Nombre de artista. [x] = Numero de la pista
              $('#mytarget').append('<td><p>' + data.recenttracks.track[i].album['#text'] +'</p></td>'); //Nombre del album
              $('#mytarget').append('<td><p>' + data.recenttracks.track[i].name + '</p></td>'); // Nombre de la pista


        }
      }, //Success end
         error : function(code, message){
              alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
         }
         //USER TOP TRACKS end
     });
   });//click handler
}); //DO NOT ERASE
