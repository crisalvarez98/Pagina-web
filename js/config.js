(function(){


    // Configuración de Firebase
    var firebaseConfig = {
      apiKey: "AIzaSyDylRFYlqUDU9FA1qzrlgUjsUo0XM_MFvM",
      authDomain: "myepill.firebaseapp.com",
      databaseURL: "https://myepill.firebaseio.com",
      projectId: "myepill",
      storageBucket: "myepill.appspot.com",
      messagingSenderId: "674327067819",
      appId: "1:674327067819:web:b29053106780c98c1a0bee",
      measurementId: "G-V4GPG3EZWV"
    };
    // Inicialización de Firebase
    firebase.initializeApp(firebaseConfig);
    var database=firebase.database();
    var user = firebase.auth().currentUser;
   



    
    //Si se pusa el botón de "Salir"
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
      window.location.href="index.html";
    });




    btnActualizar.addEventListener('click', e => { 
        
        //PASAMOS A LA DATABASE LOS DATOS PERSONALES DEL USUARIO
        var userId = firebase.auth().currentUser.uid;
        database.ref('dispensadores/'+userId+'/datosweb/').update({
            desayuno:document.getElementById('desayuno').value,
            comida:document.getElementById('comida').value,
            cena:document.getElementById('cena').value,
            noche:document.getElementById('noche').value
        }).then(function() { 
          console.log('Se han actualizado las alarmas del usuario:', user);
          // Update successful.
        }).catch(function(error) {
          // An error happened.
          console.log('NO se ha actualizado las alarmas');
        });
      });






   // Listener en tiempo real
   firebase.auth().onAuthStateChanged( function(user) {
    if(user) {
      var userId = firebase.auth().currentUser.uid;
      valdesayuno=document.getElementById('desayuno').value;
      valcomida=document.getElementById('comida').value;
      valcena=document.getElementById('cena').value;
      valnoche=document.getElementById('noche').value;

      var ref = firebase.database().ref('dispensadores/'+userId+'/datosweb/');
      ref.once("value")
      .then(function(snapshot) {
        document.getElementById('desayuno').value = snapshot.child("desayuno").val(); // "valor de la alarma del desayuno"
        document.getElementById('comida').value = snapshot.child("comida").val(); // "valor de la alarma del comida"
        document.getElementById('cena').value = snapshot.child("cena").val(); // "valor de la alarma del cena"
        document.getElementById('noche').value = snapshot.child("noche").val(); // "valor de la alarma del noche"
    });
      
      console.log('Se ha logeado el usuario:', user);
    } else {
      console.log('Usuario NO logueado');
    }    
  });


      
  
  
  } ());