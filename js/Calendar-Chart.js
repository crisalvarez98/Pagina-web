let 
ctxPie,
optionsPie,
configPie,
PieChart;

const width_threshold = 480;



function drawPieChart() {


  if (("#pieChart").length) {
    ctxPie = document.getElementById("pieChart").getContext("2d");
    optionsPie = {
      responsive: true,
      maintainAspectRatio: false
    };

    configPie = {
      type: "pie",
      data: {
        datasets: [
          {
            data: [perdidas, tomadas],
            backgroundColor: [
              window.chartColors.orange,
              window.chartColors.green
            ],
            label: "Porcentajetomas"
          }
        ],
        labels: ["Tomas perdidas", "Tomas correctas"]
      },
      options: optionsPie
    };
    pieChart = new Chart(ctxPie, configPie);
    
  }
}



function drawCalendar() {

  $('#calendar').fullCalendar({              
    firstDay: 1  //El día 1 es el LUNES
  });

  var userId = firebase.auth().currentUser.uid;
  var tomas = [];
  var fechas = [];
      var ref = firebase.database().ref('usuarios/'+userId+'/logs/');
      ref.once('value').then(function(snapshot) {
        snapshot.forEach(function(log) {
          fechas.push(log.child('fecha').val());
          tomas.push(log.child('toma').val());
        });

        if ($("#calendar").length) {
          $("#calendar").fullCalendar({
            height: 500,
            events: [
              
            ]
          });
      };


        for (var i = 0; i<fechas.length; i++){
          var events=new Array();     
          event = new Object();       
          event.start = fechas[i];    // its a date string
          event.end = fechas[i];      // its a date string
          if(tomas[i]=="Correcta"){
            event.title = "Correcta"; 
            event.color = "rgb(75, 192, 192)";
          }else{
            event.title = "Perdida"; 
            event.color = "rgb(255, 159, 64)";
          }
          event.allDay = false;
          

          events.push(event);
        
        
          $('#calendar').fullCalendar('addEventSource',events);
        }
        
      });

}

  