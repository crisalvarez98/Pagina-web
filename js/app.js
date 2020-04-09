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

  
  // Obtener elementos
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');


  // Añadir Evento login
  btnLogin.addEventListener('click', e => {
  //Obtener email y pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function(result){
    //alert("Autenticacion correcta");
    window.location.href="inicio.html";

    })
    .catch(function(error){
      alert("Email o contraseña no válidos");
    })
  });



/*
  // Añadir evento signup
  btnSignUp.addEventListener('click', e => {
    // Obtener email y pass
    // TODO: comprobar que el email sea real
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    // Sign in
    const promise = firebase.auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
  });

*/


  // Añadir un listener en tiempo real
   firebase.auth().onAuthStateChanged( firebaseUser => {
    if(firebaseUser) {
      console.log('se ha logeado el usuario', firebaseUser);

    } else {
      console.log('no logueado');
    }    
  });
} ());