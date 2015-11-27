$(document).ready(function(){
  alert("All Systems GO");

  $("#fetch").on("click", function(){
    $('#mydiv').html('');
    var albumname = $("#albname").val();
   $.ajax({
       type : 'GET',
       url : 'https://api.spotify.com/v1/search?query='  +  albumname   +  '&limit=1&type=album',
     dataType : 'json',
       success : function(albumdata) {
        // alert(albumdata.albums.items[0].id); //OFFICIAL ID

                $.ajax({
                  type: 'GET',
                  url: 'https://api.spotify.com/v1/albums/' + albumdata.albums.items[0].id + '/tracks',
                  dataType: 'json',
                  success: function(trackdata){

                    var tracknumber = trackdata.total;

                  for (i=0; i<tracknumber; i++){
                   $('#mydiv').append("<img src=\"" + albumdata.albums.items[0].images[1]["url"] + "\"></img><br>"); // ALBUM IMAGE
                    $('#mydiv').append(trackdata.items[i].artists[0].name + "<br>"); //BAND NAME
                    $('#mydiv').append("<a href=\"" + trackdata.items[i].preview_url + "\">" + trackdata.items[i].name + "</a><br>") //ALBUM TRACK WITH ADDED LINK TO PREVIEW
                    $('#mydiv').append("<a href=\"" + trackdata.items[i].external_urls.spotify + "\"class=\"btn btn-info btn-lg\"> ABRIR EN SPOTIFY</a><br><br><br><br><br>"); // ABRIR EN SPOTIFY     POTIFY
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


 // MASTER HANDLER
/*  $("table tbody").append(  "<tr><td>" + data.id +"</td><td>"+ data.registration_number +
    "</td><td>" + data.name + "</td><td>" + data.last_name + "</td><td>" + data.status + "</td></tr>");   */


}); //DO NOT ERASE
