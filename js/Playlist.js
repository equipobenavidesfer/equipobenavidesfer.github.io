$(document).ready(function(){
  alert("All Systems GO");

  $("#fetch").on("click", function(){
   $.ajax({
       type : 'GET',
       url : 'https://api.spotify.com/v1/search?query=hypnotize&limit=1&type=album',
     dataType : 'json',
       success : function(albumdata) {
         $('body').append("<img src=\"" + albumdata.albums.items[0].images[1]["url"] + "\"></img>"); //OFFICIAL ALBUM DAT
        // alert(albumdata.albums.items[0].id); //OFFICIAL ID

                $.ajax({
                  type: 'GET',
                  url: 'https://api.spotify.com/v1/albums/' + albumdata.albums.items[0].id + '/tracks',
                  dataType: 'json',
                  success: function(trackdata){
                    alert(trackdata.total); // TOTAL TRACKS
                    alert(trackdata.items[0].artists[0].name); //BAND NAME
                    alert(trackdata.items[0].name); //TRACK NAME
                    alert(trackdata.items[0].preview_url); //PREVIEW TRACK
                    alert(trackdata.items[0].external_urls.spotify); // ABRIR EN SPOTIFY
                  },
                  error: function(){
                       $('body').append("pito algo salio mal track");
                  }


                }); //CHILD AJAX HANDLER






       }, //MOTHER AJAX ERROR SWITCH HANDLER
       error : function(){
           $('body').append("pito algo salio mal");
       }
   }); //MOTHER AJAX HANDLER


   });//click handler


 // MASTER HANDLER
/*  $("table tbody").append(  "<tr><td>" + data.id +"</td><td>"+ data.registration_number +
    "</td><td>" + data.name + "</td><td>" + data.last_name + "</td><td>" + data.status + "</td></tr>");   */


}); //DO NOT ERASE
