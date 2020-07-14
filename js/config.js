var resetear;
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




   // Listener en tiempo real
   firebase.auth().onAuthStateChanged( function(user) {
    if(user) {
      var userId = firebase.auth().currentUser.uid;

      var ref = firebase.database().ref('usuarios/'+userId+'/datosarduino/');
      ref.once("value")
      .then(function(snapshot) {
        document.getElementById('resetear').value = snapshot.child("resetear").val();
        document.getElementById('tomasminimas').value = snapshot.child("tomasminimas").val();
      });


      var ref = firebase.database().ref('usuarios/'+userId+'/datosweb/');
      ref.once("value")
      .then(function(snapshot) {
      
        document.getElementById('desayuno').value = snapshot.child("desayuno").val(); // "valor de la alarma del desayuno"
        document.getElementById('comida').value = snapshot.child("comida").val(); // "valor de la alarma del comida"
        document.getElementById('cena').value = snapshot.child("cena").val(); // "valor de la alarma del cena"
        document.getElementById('noche').value = snapshot.child("noche").val(); // "valor de la alarma del noche"
        document.getElementById('espera').value = snapshot.child("espera").val();
        document.getElementById('email1').value = snapshot.child("email1").val();
        document.getElementById('email2').value = snapshot.child("email2").val();


        valperdidas=snapshot.child("tomasperdidas").val();
        vacaciones=snapshot.child("vacaciones").val();
        btndesayuno=snapshot.child("btndesayuno").val();
        btncomida=snapshot.child("btncomida").val();
        btncena=snapshot.child("btncena").val();
        btnnoche=snapshot.child("btnnoche").val();
        btnemail1=snapshot.child("btnemail1").val();
        btnemail2=snapshot.child("btnemail2").val();
       
        
        if (valperdidas){
          document.getElementById('btnPerdidas').checked="true"; 
          document.getElementById('btnPerdidas').click(); 
        }
        if (vacaciones){
          document.getElementById('btnVacaciones').checked="true"; 
          document.getElementById('btnVacaciones').click(); 
        }

        if (btndesayuno){
          document.getElementById('btnDesayuno').checked="true"; 
          document.getElementById('btnDesayuno').click(); 
        }

        if (btncomida){
          document.getElementById('btnComida').checked="true"; 
          document.getElementById('btnComida').click(); 
        }

        if (btncena){
          document.getElementById('btnCena').checked="true"; 
          document.getElementById('btnCena').click(); 
        }

        if (btnnoche){
          document.getElementById('btnNoche').checked="true"; 
          document.getElementById('btnNoche').click(); 
        }

        if (btnemail1){
          document.getElementById('btnemail1').checked="true"; 
          document.getElementById('btnemail1').click(); 
        }

        if (btnemail2){
          document.getElementById('btnemail2').checked="true"; 
          document.getElementById('btnemail2').click(); 
        }

    });

      console.log('Se ha logeado el usuario:', user);
    } else {
      console.log('Usuario NO logueado');
    }    
  });

 


  btnActualizar.addEventListener('click', e => { 
        
    //PASAMOS A LA DATABASE LOS DATOS PERSONALES DEL USUARIO
    var userId = firebase.auth().currentUser.uid;

    if(document.getElementById('btnDesayuno').checked){
      var des=1;
    }else{
      var des=0;
    }

    if(document.getElementById('btnComida').checked){
      var com=1;
    }else{
      var com=0;
    }
    if(document.getElementById('btnCena').checked){
      var cen=1;
    }else{
      var cen=0;
    }
    if(document.getElementById('btnNoche').checked){
      var noc=1;
    }else{
      var noc=0;
    }


    database.ref('usuarios/'+userId+'/datosweb/').update({
        desayuno:document.getElementById('desayuno').value,
        comida:document.getElementById('comida').value,
        cena:document.getElementById('cena').value,
        noche:document.getElementById('noche').value,

        btndesayuno:des,
        btncomida:com,
        btncena:cen,
        btnnoche:noc

    }).then(function() { 
      console.log('Se han actualizado las alarmas del usuario:', user);
      alert("Tus cambios han sido actualizados con éxito.");
      // Update successful.
    }).catch(function(error) {
      // An error happened.
      console.log('NO se ha actualizado las alarmas');
    });
  });






btnActualizar2.addEventListener('click', e => { 

    var userId = firebase.auth().currentUser.uid;
    
    database.ref('usuarios/'+userId+'/datosweb/').update({
      espera:document.getElementById('espera').value

  }).then(function() { 
    console.log('Se ha actualizado el tiempo de espera del usuario:', user);
    alert("Tus cambios han sido actualizados con éxito.");
    // Update successful.
  }).catch(function(error) {
    // An error happened.
    console.log('NO se ha actualizado las alarmas');
  });


  });




  btnActualizar3.addEventListener('click', e => { 

    var userId = firebase.auth().currentUser.uid;
    if(document.getElementById('btnPerdidas').checked){
      var perd=1;
    }else{
      var perd=0;
    }

    if(document.getElementById('btnVacaciones').checked){
      var vac=1;
    }else{
      var vac=0;
    }


    database.ref('usuarios/'+userId+'/datosweb/').update({
        tomasperdidas:perd,
        vacaciones:vac
    }).then(function() { 
      console.log('Se ha actualizado la configuración del usuario:', user);
      alert("Tus cambios han sido actualizados con éxito.");
      // Update successful.
    });

  });
  
  

  btnresetear.addEventListener('click', e => { 

    var userId = firebase.auth().currentUser.uid;
    
    database.ref('usuarios/'+userId+'/datosarduino/').update({
      resetear:document.getElementById('resetear').value

  }).then(function() { 
    console.log('Se han actualizado las tomas rellenadas del usuario:', user);
    alert("Tus cambios han sido actualizados con éxito.");
    // Update successful.
  }).catch(function(error) {
    // An error happened.
    console.log('NO se ha actualizado las alarmas');
  });


  });


  btnActualizar4.addEventListener('click', e => { 

    var userId = firebase.auth().currentUser.uid;
    
    database.ref('usuarios/'+userId+'/datosarduino/').update({
        tomasminimas:document.getElementById('tomasminimas').value
    }).then(function() { 
      console.log('Se han actualizado los cambios del usuario:', user);
      alert("Tus cambios han sido actualizados con éxito.");
      // Update successful.
    });

  });



  btnActualizar5.addEventListener('click', e => { 

    var userId = firebase.auth().currentUser.uid;
    if(document.getElementById('btnemail1').checked){
      var email1=1;
    }else{
      var email1=0;
    }

    if(document.getElementById('btnemail2').checked){
      var email2=1;
    }else{
      var email2=0;
    }


    database.ref('usuarios/'+userId+'/datosweb/').update({
        btnemail1:email1,
        btnemail2:email2,
        email1:document.getElementById('email1').value,
        email2:document.getElementById('email2').value
    }).then(function() { 
      console.log('Se han actualizado los email del usuario:', user);
      alert("Tus cambios han sido actualizados con éxito.");
      // Update successful.
    });

  });


  } ());