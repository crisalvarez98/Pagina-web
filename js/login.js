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

  
  // Obtener elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const txtPassword2 = document.getElementById('txtPassword2');
  const SerialNumber = document.getElementById('SerialNumber');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');


  // Añadir Evento login
  btnLogin.addEventListener('click', e => {
  //Obtener email y pass
  const email = txtEmail.value;
  const pass = txtPassword.value;

  // Sign in
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(result){
    //alert("Autenticacion correcta");
    window.location.href="inicio.html";

    })
    .catch(function(error){
      alert("Email o contraseña no válidos. Recuerde que la contraseña debe tener al menos 6 digitos.");
    })
  });



  // Añadir evento signup
  btnSignUp.addEventListener('click', e => {

    document.getElementById('SerialNumberdiv').style.display = '';
    document.getElementById('Passworddiv').style.display = '';
    document.getElementById('btnLogindiv').style.display ='none';
    document.getElementById('btnSignUp2div').style.display ='';
    document.getElementById('btnSignUpdiv').style.display ='none';
    document.getElementById('resetpassdiv').style.display ='none';
    document.getElementById('resetpass2div').style.display ='none';
    
  });


// Sign in
  btnSignUp2.addEventListener('click', e => {
    
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const pass2 = txtPassword2.value;
    const serial=SerialNumber.value;
    var r;
    

      //COMPROBAR QUE EL SERIALNUMBER INTRODUCIDO ESTÉ EN LA BASE DE DATOS
      var ref= firebase.database().ref('dispensadores/'+serial);
      ref.once("value",function(snapshot){
        if(snapshot.exists()&&serial!=''){

          r=snapshot.child("usado").val();
          
          if(r=='si'){
            alert("Este número de serie ya está asociado a una cuenta");
          }else{
        
          if(pass==pass2){
            firebase.auth().createUserWithEmailAndPassword(email, pass)
            .then(function(){
        
              var userId = firebase.auth().currentUser.uid;

              database.ref('usuarios/'+userId+'/datosweb/').update({
                desayuno:'09:00',
                comida:'14:00',
                cena:'20:00',
                noche:'22:00',
        
                btndesayuno:0,
                btncomida:0,
                btncena:0,
                btnnoche:0,
        
                email1:email,
                email2:'',
        
                btnemail1:0,
                btnemail2:0,
        
                espera:'00:30',
                tomasperdidas:1,
                vacaciones:0
        
              }).catch(function(error) {
                // An error happened.
                alert(error);
                console.log('ERROR: ',error);
              });
        
              database.ref('usuarios/'+userId+'/datospersonales/').update({
                
                usuarioid:userId,
                email:email,
                nombre:'',
                dispensadorid:serial
                
              }).catch(function(error) {
                // An error happened.
                alert(error);
                console.log('ERROR: ',error);
              });
        
              database.ref('usuarios/'+userId+'/datosarduino/').update({
                perdidas:0,
                tomadas:0,
                resetear:0,
                tomasminimas:6,
                ultimaconexion:'Conexión no iniciada',
                numlogs:0
                
              }).catch(function(error) {
                // An error happened.
                alert(error);
                console.log('ERROR: ',error);
              });

              database.ref('dispensadores/'+serial).update({
                usado:'si',
                usuarioid:userId
              }).catch(function(error) {
                // An error happened.
                alert(error);
                console.log('ERROR: ',error);
              });
          
              window.location.href="inicio.html";

              })
              .catch(function(error){
                alert("Email o contraseña no válidos. Recuerde que la contraseña debe tener al menos 6 dígitos.");
              })
        E
            }else{
              alert("Las contraseñas no coinciden");
            }
          }

        }else{
          alert("El número de serie no es válido");
        }
        
      });
    
  });



  btnresetpass.addEventListener('click', e => {

    document.getElementById('SerialNumberdiv').style.display = 'none';
    document.getElementById('Passworddiv').style.display = 'none';
    document.getElementById('Password2div').style.display = 'none';
    document.getElementById('btnLogindiv').style.display ='none';
    document.getElementById('btnSignUp2div').style.display ='none';
    document.getElementById('btnSignUpdiv').style.display ='none';
    document.getElementById('resetpassdiv').style.display ='none';
    document.getElementById('resetpass2div').style.display ='';
    
  });


  btnresetpass2.addEventListener('click', e => {

    var auth = firebase.auth();
    const txtEmail = document.getElementById('txtEmail').value;

    auth.sendPasswordResetEmail(txtEmail).then(function() {
      alert("Se ha enviado un correo para resetear su contraseña");
    }).catch(function(error) {
      // An error happened.
    });
    
  });

  



  // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log('se ha logeado el usuario', firebaseUser);

    } else {
      console.log('no logueado');
    }    
  });
} ());