$(document).ready(function(){
  //alert("riata");

  $.ajax({
      type : 'POST',
      url : 'http://ws.audioscrobbler.com/2.0/',
      data : 'method=user.getRecentTracks&' +
             'user=Bonemerang&' +
             'limit=6&' +
             'api_key=57ee3318536b23ee81d6b27e36997cde&' +
             'format=json',
      dataType : 'jsonp',
      success : function(data) {

 for (i=0; i<6; i++ ){

          $('#success #artistBio').append('<br>' + data.recenttracks.track[i].artist['#text']); //ARTIST. [0] = TRACK's NUMBER
           $('#success #artistBio').append('<br>' + data.recenttracks.track[i].name);
           $('#success #artistBio').append('<br>' + data.recenttracks.track[i].album['#text']);
           $('#success #artistBio').append('<br><img src=\"' + data.recenttracks.track[i].image[1]['#text'] + '\">');
       //    $('#success #artistBio').append('<br>' + data.recenttracks.album["#text"]);
       //   $('#success #artistBio').append('<img src="' + data.recenttracks.image[1]['#text'] + '" />');
     }
      },
      error : function(code, message){
          $('#error').html('Error Code: ' + code + ', Error Message: ' + message);
      }
  });





}); //DO NOT ERASE
