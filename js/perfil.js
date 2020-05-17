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
    var btnprofile=document.getElementById('fileInput');
  

    //Si se pusa el botón de "Salir"
    btnLogout.addEventListener('click', e => {
      firebase.auth().signOut();
      window.location.href="index.html";
    });


   
    btnprofile.addEventListener('change', e => {
        var userId = firebase.auth().currentUser.uid;
        var file=e.target.files[0];
        var storageRef=firebase.storage().ref('mis_fotos/'+userId+file.name);
        var uploadTask=storageRef.put(file);
        
        
        uploadTask.on('state_changed', function progress(snapshot){

        },function(err){
          console.log(err);

        },function complete(){
          console.log('subida de la imagen completada');
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log('File available at', downloadURL);
            firebase.auth().currentUser.updateProfile({ //Se actualiza la URL de nueva foto de perfil
              photoURL: downloadURL
              
            }).then(function() { 
              console.log('Se ha actualizado el usuario correctamente');
              var userId = firebase.auth().currentUser.uid;
              database.ref('dispensadores/'+userId+'/datospersonales/').update({
                photourl:downloadURL
              });
              window.location.reload(true);
              // Update successful.
            }).catch(function(err) {
              // An error happened.
              console.log('Error al actualizar el usuario');
            });
           
          }); 
        });
        
    });


  

   //Si se pulsa el botón de "Actualizar"
    btnActualizar.addEventListener('click', e => { 
      e.preventDefault();
    var user = firebase.auth().currentUser;
    nameUser=document.getElementById('UserName').value;
    emailUser=document.getElementById('UserEmail').value;
    oldPassword=document.getElementById('OldPassword').value;
    newPassword=document.getElementById('NewPassword').value;
    email=user.email;


    firebase.auth()
        .signInWithEmailAndPassword(email, oldPassword) //Se inicia sesión de nuevo con la contraseña actual introducida por motivos de seguridad
        .then(function(user) {

            firebase.auth().currentUser.updatePassword(newPassword).then(function(){ //Se actualiza la nueva contraseña
              console.log('Se ha actualizado la contraseña correctamente');

            }).catch(function(err){
              console.log('Error al actualizar la contraseña');
            });



            firebase.auth().currentUser.updateEmail(emailUser).then(function() { //Se actualiza el nuevo email

              console.log('Se ha actualizado el correo correctamente');
              // Update successful.
            }).catch(function(err) {
              console.log('Error al actualizar el correo electrónico');
              // An error happened.
            });



            firebase.auth().currentUser.updateProfile({ //Se actualiza el nuevo nombre de usuario
              displayName:nameUser
              //photoURL: photo
            }).then(function() { 
              console.log('Se ha actualizado el usuario correctamente');
              // Update successful.
            }).catch(function(err) {
              // An error happened.
              console.log('Error al actualizar el usuario');
            });


        }).catch(function(err){
          console.log('Error al iniciar sesión');
            
        });


        //PASAMOS A LA DATABASE LOS DATOS PERSONALES DEL USUARIO
        var userId = firebase.auth().currentUser.uid;
        database.ref('dispensadores/'+userId+'/datospersonales/').update({
          dispensadorid:userId,
          nombre:nameUser,
          email:emailUser
         });
    

    });
  
   
   
// Listener en tiempo real
firebase.auth().onAuthStateChanged( function(user) {
 
  if(user) {
      var user = firebase.auth().currentUser;
      document.getElementById('UserName').value=user.displayName;
      document.getElementById('UserEmail').value=user.email;
      if(user.photoURL==null){

      }else{
      document.getElementById('imgprofile').src=user.photoURL;
      }

    console.log('Se ha logeado el usuario:', user);

  } else {
    console.log('Usuario NO logueado');
  }    
});
  
  
  } ());