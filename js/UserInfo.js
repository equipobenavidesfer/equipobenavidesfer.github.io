$(document).ready(function(){



  $('body').on('click', '.artistcl', function() {
  var artistlookup = $(this).text();
  alert(artistlookup); //TO ADD: A MODAL TO THE HTML, AND AN ARTIST LOOKUP USING THIS STRING, ATTACHING TO THE MODAL :)
});


//alert("Systems Ready and Waiting.")
  $("#usernamebtn").on("click", function(){
    $('#mydiv').html('');
    $('#usersTop').html('');
    var username = $("#usernametxt").val(); //MAKE ARTIST INTO LINK WITH CLASS, THEN US (THIS) TO GET EACH ARTIST NAME FOR LOOKUP
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
      });
     //USER BASIC INFO end

     //USER TOP TRACKS
     $.ajax({
         type : 'POST',
         url : 'http://ws.audioscrobbler.com/2.0/',
         data : 'method=user.getRecentTracks&' +
                'user=' + username + '&' +
                'limit=6&' +
                'api_key=57ee3318536b23ee81d6b27e36997cde&' +
                'format=json',
         dataType : 'jsonp',
         success : function(data) {

    for (i=0; i<6; i++ ){

             $('#usersTop').append('<p class=\"artistcl\">' + data.recenttracks.track[i].artist['#text'] + '</p>'); //ARTIST. [0] = TRACK's NUMBER
              $('#usersTop').append(data.recenttracks.track[i].name); // Nombre de la pista
              $('#usersTop').append('<br>' + data.recenttracks.track[i].album['#text']); //Nombre del album
              $('#usersTop').append('<br><img src=\"' + data.recenttracks.track[i].image[1]['#text'] + '\"><br><br><br>'); //Img del album
                $('#usersTop').append('<p>test</p>');
          //    $('#success #artistBio').append('<br>' + data.recenttracks.album["#text"]);
          //   $('#success #artistBio').append('<img src="' + data.recenttracks.image[1]['#text'] + '" />');
        }
         },
         error : function(code, message){
              alert("Lo siento, tu petición no puede ser procesada, por favor intenta de nuevo.");
         }
         //USER TOP TRACKS end
     });




   });//click handler





}); //DO NOT ERASE
