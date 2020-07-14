var perdidas;
var tomadas;
var resetear;
var tomasminimas;
var ultimaconexion;

(function(){


  // Listener en tiempo real
  firebase.auth().onAuthStateChanged( function(user) {
    if(user) {
      var userId = firebase.auth().currentUser.uid;
  
      var ref = firebase.database().ref('usuarios/'+userId+'/datosarduino/');
      ref.once("value")
      .then(function(snapshot) {

        //ULTIMA CONEXION
        ultimaconexion=snapshot.child("ultimaconexion").val();
        document.getElementById('ultimaconexion').innerHTML=ultimaconexion;

        //RESETEAR
        resetear=snapshot.child("resetear").val();
        document.getElementById('resetear').innerHTML=resetear;
        var res=parseInt(resetear, 10);
        tomasminimas=snapshot.child("tomasminimas").val();
        var min=parseInt(tomasminimas, 10);
        if(res<=min){
          document.getElementById('resetear').style.color="rgb(255, 159, 64)"; //orange (MAL)
          }else{
            document.getElementById('resetear').style.color="rgb(75, 192, 192)"; //green (BIEN)
          }

        //ULTIMA CONEXIÓN
        var hoy=new Date();
        var hora=hoy.getHours();
        var minutos=hoy.getMinutes();
        var dia=hoy.getDate();
        var horaarduino= ultimaconexion.substring(0,2);
        var minarduino= ultimaconexion.substring(3,5);
        var diaarduino= ultimaconexion.substring(10,12);

        if(hora!=horaarduino || minutos>(minarduino+1) || dia!=diaarduino){
        document.getElementById('ultimaconexion').style.color="rgb(255, 159, 64)"; //orange (MAL)
        }else{
          document.getElementById('ultimaconexion').style.color="rgb(75, 192, 192)"; //green (BIEN)
        }

        //GRÁFICO
        perdidas=snapshot.child("perdidas").val();
        tomadas=snapshot.child("tomadas").val();
        drawPieChart();

        //EXTRA
        drawCalendar(); // Calendar
        updatePieChart();
        /*$(window).resize(function () {
        //updateChartOptions();
        reloadPage();
        });*/

      
       });
  

      console.log('Se ha logeado el usuario:', user);
    } else {
      console.log('Usuario NO logueado');
    }    
    
  });

  


      
      //SALIR
      btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location.href="index.html";
      });
  
     


} ());