$(document).ready(function(){
  alert("riata");
$("#subir").on("click", function(){
var idRegistro = $("#regnum").val();
var firstName = $("#fname").val();
var lastName = $("#lname").val();
var statusCode = $("#status").val();




    $.ajax({
type: "POST",
url: "https://andreihelo-restful-api.herokuapp.com/students/",
data: {id: idRegistro, registration_number: idRegistro, name:firstName, last_name:lastName, status:statusCode },
dataType: 'json',
error: function(){alert("Lo siento, no se ha podido registrar a la persona con ID " + idRegistro + ".\n\n\t\t\tPor favor, intente de nuevo.");},
success: function(data){
  alert("Subida Exitosa!");


  $("table tbody").append(  "<tr><td>" + data.id +"</td><td>"+ data.registration_number +
    "</td><td>" + data.name + "</td><td>" + data.last_name + "</td><td>" + data.status + "</td></tr>");





}


    });




});


});
