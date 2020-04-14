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

  

    //Si se pusa el botón de "Salir"
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
      window.location.href="index.html";
    });

  

   
   //Si se pulsa el botón de "Actualizar"
    btnActualizar.addEventListener('click', e => { 
    var user = firebase.auth().currentUser;

    //var email= document.getElementById('UserPassword').value;
    //user.updateEmail(document.getElementById('UserPassword').value);

    user.updateProfile({
        displayName:document.getElementById('UserName').value,
        //photoURL: photo
      }).then(function() { 
        console.log('Se ha actualizado el usuario:', user);
        // Update successful.
      }).catch(function(error) {
        // An error happened.
        console.log('NO se ha actualizado el usuario');
      });
    
    });




    // Listener en tiempo real
    firebase.auth().onAuthStateChanged( function(user) {

        if(user) {
            var user = firebase.auth().currentUser;
            document.getElementById('UserName').value=user.displayName;
            document.getElementById('UserEmail').value=user.email;
            document.getElementById('UserPassword').value=user.pass;

            //PASAMOS A LA DATABASE LOS DATOS PERSONALES DEL USUARIO
             var userId = firebase.auth().currentUser.uid;
             database.ref('dispensadores/'+userId+'/datospersonales/').update({
               dispensadorid:userId,
               nombre:document.getElementById('UserName').value,
               email:document.getElementById('UserEmail').value
             });

          console.log('Se ha logeado el usuario:', user);

        } else {
          console.log('Usuario NO logueado');
        }    
      });
  
   
   

  
  
  } ());