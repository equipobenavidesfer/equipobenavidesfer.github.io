$(document).ready(function(){
$.ajax({

url: "https://andreihelo-restful-api.herokuapp.com/students",
type: 'GET',
dataType: 'json',
success: function(data){
  $.each(data, function(index, item) {
    $("table tbody").append(

      "<tr><td>" + item.id +"</td><td>"+ item.registration_number +
      "</td><td>" + item.name + "</td><td>" + item.last_name + "</td><td>" + item.status + "</td></tr>"

//hacer otro documento html aside index, que cuando se cargue

    );


  });
      }
    });
});
