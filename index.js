console.log('klk');

function selectOnlyThis(id) {
  for (var i = 1;i <= 2; i++)
  {
      document.getElementById("Check" + i).checked = false;
  }
  document.getElementById(id).checked = true;
}
// TODO: Replace with your project's config object
 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyAdXoQ_k6SVY3P1O5Expkz4yM9pAa-46OA",
    authDomain: "baseball-985d4.firebaseapp.com",
    databaseURL: "https://baseball-985d4.firebaseio.com",
    projectId: "baseball-985d4",
    storageBucket: "baseball-985d4.appspot.com",
    messagingSenderId: "125749112689",
    appId: "1:125749112689:web:4d14158713fe8dc47010d0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.firestore();


  //Leer Documentos
  let listaAguila = document.getElementById("aguilaList");
  let listaLicey = document.getElementById("liceyList");
  database.collection("jugadores").onSnapshot((res)=>{
    listaAguila.innerHTML = "";
    listaLicey.innerHTML = "";
      res.forEach(doc => {
        console.log(`${doc.id} - ${doc.data().username} - ${doc.data().team}`);
        if(doc.data().team == "licey")
        {
           listaLicey.innerHTML += 
           `<li><input type="checkbox" id="${doc.id}" class="campoL"/> ${doc.data().username}</li>`;
        }
        else 
        {
           listaAguila.innerHTML += `<li><input type="checkbox" id="${doc.id}" class="campoA"/> ${doc.data().username}</li>`;
        }
      });
  });

  //agregar jugador
  function writeUserData() {
      let nombre = document.getElementById("nombre").value;
      let equipo1 = document.getElementById("Check1").checked;
      //let equipo2 = document.getElementById("Check2").checked;
      let team;
      equipo1 == true ? team = "aguilas" : team = "licey";

    database.collection("jugadores").add({
      username: nombre,
      team: team  
    }).then((res)=>{
      document.getElementById("nombre").value = "";
      document.getElementById("Check1").checked = false;
      document.getElementById("Check2").checked  = false;
       
        console.log("jugador agregado: ", res);
    }).catch((err)=>{
        console.log("a ocurrido un error: ", err);
    });
  }

  //actualizar datos
  const setAguila = ()=>{
    let campos = document.querySelectorAll(".campoL");
    campos.forEach(camp => {
       if(camp.checked == true) {
        database.collection("jugadores").doc(camp.id).update({
          team: "aguilas"
       });
       }
    });
  }

  const setLicey = ()=>{
      let campos = document.querySelectorAll(".campoA");
      campos.forEach(camp => {
        if(camp.checked == true) {
          database.collection("jugadores").doc(camp.id).update({
            team: "licey"
        });
        }
      });
    }
    

  const setLiceyAll = () =>{
    let aguilas = document.querySelectorAll(".campoA");
  
      aguilas.forEach(camp =>{
          database.collection("jugadores").doc(camp.id).update({
            team: "licey"
          })    
      })
    }

    const setAguilaAll = () =>{
      let licey = document.querySelectorAll(".campoL");
    
      licey.forEach(camp =>{
            database.collection("jugadores").doc(camp.id).update({
              team: "aguila"
            })    
        })
      }
 
