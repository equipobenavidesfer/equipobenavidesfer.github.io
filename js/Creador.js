$(document).ready(function(){

  function myFunction(){//Funcion de cargar playlist
  var i = 1;
  $.ajax({  // LOAD PLAYLIST

  url: "http://rest.learncode.academy/api/learncode/playlist",
  type: 'GET',
  dataType: 'json',
  success: function(data){
    var x = data;
    $.each(data, function(index, item) {
      $("table tbody").append(

        "<tr><td>" + i +"</td><td>"+ data[index].Artist +
        "</td><td>" + data[index].Album + "</td><td>" + data[index].Track +
        "</td><td><button type=\"button\" id=\"" + data[index].id +
        "\" class=\"btn-danger btn-lg\" id=\"fetch\" ><i class=\"fa fa-trash fa-lg\"></i></button></td></tr>"

  //hacer otro documento html aside index, que cuando se cargue

); i = i+1;


    });
  },
  error : function(){
    alert("Lo siento, tu petición no puede ser procesada. Intenta de nuevo");
  }
});
}
myFunction(); //LOAD PLAYLIST END, FUNCTION END



$("#agregar").on("click", function(){
var artistName = $("#artistan").val();
var albumName = $("#albumn").val();
var pistaName = $("#pistan").val();

    $.ajax({
type: "POST",
url: "http://rest.learncode.academy/api/learncode/playlist/",
data: {Artist: artistName, Album: albumName, Track:pistaName},
dataType: 'json',
error: function(){alert("Lo siento, no se ha podido tu petición. Por favor, intente de nuevo.");},
success: function(data){
  alert("Subida Exitosa!");
  $("table tbody").html('');
  myFunction();


// $("table tbody").append(  "<tr><td>" + i +"</td><td>"+ data.Artist +
//    "</td><td>" + data.Album + "</td><td>" + data.Track + "</td><td><button type=\"button\" id=\"" + data.id + "\" class=\"btn btn-info btn-lg\" id=\"fetch\" >D</button></td></tr>");
//i = i+1;

}


    }); //Upload Handler end





}); //Click Handler



$("table").on("click", "button", function(){ //DELETE OPERATIONS START

  var show_id = this.id;
  $.ajax({
  type: 'DELETE',
  url: 'http://rest.learncode.academy/api/learncode/playlist/' + show_id,
  success: function() {
    alert("Eliminación Exitosa!")
    $("table tbody").html('');
    myFunction();
  }




}); // Ajax function end


});


}); //Master Handler
