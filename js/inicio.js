var perdidas;
var tomadas;
var resetear;

(function(){

  // Listener en tiempo real
  firebase.auth().onAuthStateChanged( function(user) {
    if(user) {
      var userId = firebase.auth().currentUser.uid;
  
      var ref = firebase.database().ref('dispensadores/'+userId+'/datosarduino/');
      ref.once("value")
      .then(function(snapshot) {
        perdidas=snapshot.child("perdidas").val();
        tomadas=snapshot.child("tomadas").val();
        resetear=snapshot.child("resetear").val();
        document.getElementById('resetear').innerHTML=resetear
        drawPieChart();
        drawCalendar(); // Calendar
        updatePieChart();
      
        $(window).resize(function () {
        //updateChartOptions();
        reloadPage();
        });
  
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