
if ((localStorage.getItem("MasterList") || 0) == 0){
  fetch("../js/masterlist.json")
    .then(masterlistjson => masterlistjson.json())
    .then(data => PushMasterList(data))
}

function GetMasterList(){
  let master_list = localStorage.getItem("MasterList")
  master_list = JSON.parse(master_list)

  return master_list
}

function PushMasterList(master_list){
  localStorage.setItem("MasterList", JSON.stringify(master_list))
}

listasimple()

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////// NAVEGADOR ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


function switchcontent() {
  if (document.getElementById("switch1")){
    document.getElementById("infoboxdiv").style.display = "none";
    document.getElementById("listasimplediv").style.display = "block";
    document.getElementById("switch1").id = "switch2" 
    document.getElementById("switch2").src = 'https://img.icons8.com/ios-glyphs/30/000000/contract-job.png'

  }else{
    document.getElementById("infoboxdiv").style.display = "";
    document.getElementById("listasimplediv").style.display = "none";
    document.getElementById("switch2").id = "switch1" 
    document.getElementById("switch1").src = 'https://img.icons8.com/ios-glyphs/30/000000/list--v1.png'

  }

}


function validuser(action){
  if (sessionStorage.getItem("admin") == "false"){
    swal({
      icon: "warning",
      text: "Acción no permitida. \n Inicie como administrador.",
      closeOnClickOutside: true,
      closeOnEsc: true,
      timer: 2000,
      button: false,
    });
  }else{
    switch (action) {
      case 0:
        ADDPJ()
        break;
      case 1:
        EDITPJ()
        break; 
      case 2:
        DELPJ()
        break; 
    }
  }
}


async function ADDPJ(title, index, nombre, imgref, otros, nacimiento, idiomas, tipo, estatura, especie, padres, hermanos, pareja, hijos) {

  isitnew = true

  if (nombre){
    isitnew = false
  }else{
    nombre = ""
    imgref = ""
    otros = ""
    nacimiento = ""
    idiomas = ""
    tipo = ""
    estatura = ""
    especie = ""
    padres = ""
    hermanos = ""
    pareja = ""
    hijos = ""
  }

  const { value: PjData } = await Swal.fire({
    title: title || "Nuevo personaje",
    confirmButtonColor: "#73C2BE",
    confirmButtonText: "Guardar",

    html:

      '<input type="text" id="nombre" name="nombre" class="swal2-input" placeholder="Nombre" value="' + nombre + '">' +
      '<input type="url" id="imgref" name="imgref" class="swal2-input" placeholder="Referencia (SOLO URL)" value="' + imgref + '">' +
      '<input type="text" id="otros" name="otros" class="swal2-input" placeholder="Otros nombres" value="' + otros + '">' +
      '<input type="number" id="nacimiento" name="nacimiento" class="swal2-input" placeholder="Año de nacimiento" value="' + nacimiento + '">' +
      '<input type="text" id="idiomas" name="idiomas" class="swal2-input" placeholder="Idiomas" value="' + idiomas + '">' +
      '<input type="text" id="tipo" name="tipo" class="swal2-input" placeholder="JCF/EoP" value="' + tipo + '">' +
      '<input type="number" id="estatura" name="estatura" class="swal2-input" placeholder="Estatura" value="' + estatura + '">' +
      '<input type="text" id="especie" name="especie" class="swal2-input" placeholder="Especie" value="' + especie + '">' +
      '<input type="text" id="padres" name="padres" class="swal2-input" placeholder="Padres" value="' + padres + '">' +
      '<input type="text" id="hermanos" name="hermanos" class="swal2-input" placeholder="Hermanos" value="' + hermanos + '">' +
      '<input type="text" id="pareja" name="pareja" class="swal2-input" placeholder="Pareja" value="' + pareja + '">' +
      '<input type="text" id="hijos" name="hijos" class="swal2-input" placeholder="Hijos" value="' + hijos + '">',

    focusConfirm: false,
    preConfirm: () => {
      return [
        nombre = document.getElementById("nombre").value,
        imgref = document.getElementById("imgref").value || imgref,
        otros = document.getElementById("otros").value,
        nacimiento = document.getElementById("nacimiento").value,
        idiomas = document.getElementById("idiomas").value,
        tipo = document.getElementById("tipo").value,
        estatura = document.getElementById("estatura").value,
        especie = document.getElementById("especie").value,
        padres = document.getElementById("padres").value,
        hermanos = document.getElementById("hermanos").value,
        pareja = document.getElementById("pareja").value,
        hijos = document.getElementById("hijos").value
      ]
    }
  })

  class Personaje {
    constructor(nombre, imgref, otros, nacimiento, idiomas, tipo, estatura, especie, padres, hermanos, pareja, hijos){
      this.nombre = nombre;
      this.imgref = imgref;
      this.otros = otros.split(", ");
      this.nacimiento = nacimiento;
      this.idiomas = idiomas.split(", ");
      this.tipo = tipo;
      this.estatura = estatura;
      this.especie = especie;
      this.padres = padres.split(", ");
      this.hermanos = hermanos.split(", ");
      this.pareja = pareja.split(", ");
      this.hijos = hijos.split(", ");
    }
  
  }

  const newpj = new Personaje(nombre, imgref, otros, nacimiento, idiomas, tipo, estatura, especie, padres, hermanos, pareja, hijos)
  let master_list = GetMasterList()

  if (!nombre) {

    const { value: nombre } = await Swal.fire({
      icon: "error",
      title: "Ehhh...",
      input: "text",
      text: "Un personaje sin nombre no puede guardarse. Todos los cambios se perderán.",
      inputPlaceholder: "¡__ necesita un nombre!",
      confirmButtonColor: "#73C2BE",
      confirmButtonText: "Entendido",

    })

    if (nombre) {
      newpj["nombre"] = nombre
      complete = true
    }else{
      complete = false
    }

  }else{
    complete = true
  }

  if (complete == true) {

    if (isitnew == true){
      master_list.push(newpj)
      text = " ha sido añadido!";

    }else{
      master_list[index] = newpj
      text = " ha sido actualizado!";

    }

    PushMasterList(master_list)
    swal({
      icon: "success",
      text: "¡" + nombre + text,
      button: false,
      timer: 2000,
    }); 

    listasimple()
    complete = false

  }else{

    swal({
      icon: "info",
      text: "Los cambios NO fueron guardados.",
      button: false,
      timer: 2000,
    }); 

  }

}

function EDITPJ(){

  let master_list = GetMasterList()

  pjname = document.getElementById("searchbar").value

  if (pjname){
    personaje= master_list.find(personaje => personaje.nombre == pjname);

    let {nombre, imgref, otros, nacimiento, idiomas, tipo, estatura, especie, padres, hermanos, pareja, hijos} = personaje;

    let index = master_list.indexOf(personaje)

    ADDPJ("Editar personaje", index, nombre, imgref, otros, nacimiento, idiomas, tipo, estatura, especie, padres, hermanos, pareja, hijos)

  }else{
    swal({
      icon: "info",
      text: "No hay ningún personaje seleccionado.",
      button: false,
      timer: 1000,
    }); 
  }
  
}

function DELPJ(){

  let master_list = GetMasterList()

  pjname = document.getElementById("searchbar").value

  if (pjname){
    personaje= master_list.find(personaje => personaje.nombre == pjname);
    let index = master_list.indexOf(personaje);
    master_list.splice(index, 1)
    document.getElementById("searchbar").value = ""
    infos = document.getElementsByClassName("info")
    for (i = 0; i < infos.length; i++) {
      document.getElementById(i).innerHTML = ""
    }
    PushMasterList(master_list)
    listasimple()

  }else{
    swal({
      icon: "info",
      text: "No hay ningún personaje seleccionado.",
      button: false,
      timer: 1000,
    }); 
  }
  
}


/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////// INFOBOX ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function dropdown(){
  document.getElementById("varnamelist").innerHTML = namelist()

  const ibsearchbar = document.getElementById("infobox-searchbar");
  const searchbar = document.getElementById("searchbar");
  

  searchbar.addEventListener("keydown", e => {
    document.getElementById("namelist").classList.add("show");

  });

  ibsearchbar.addEventListener("mouseleave", e => {
  const typing = document.getElementById("searchbar").value;
    (typing.length < 1) && document.getElementById("namelist").classList.remove("show")
  });
 
  document.addEventListener('click', e => {
    let isClickInsideElement = ibsearchbar.contains(e.target);
    if (!isClickInsideElement) {
      document.getElementById("namelist").classList.remove("show")
    }
  });

}

function namelist() {
  let master_list = GetMasterList()
  let list = ""
  let nopj = 0

  for (i in master_list) {
    pj = master_list[i]
    list = list + "<li><a onclick='sokpj()'>" + pj["nombre"] + "</a></li>";
    nopj = nopj + 1
  }

  return(list)
}

function filter() {
  let input = document.getElementById("searchbar");
  let filter = input.value.toUpperCase();
  let div = document.getElementById("namelist");
  let a = div.getElementsByTagName("li");

  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    (txtValue.toUpperCase().indexOf(filter) > -1) ? a[i].style.display = "":a[i].style.display = "none";
  }
}

function sokpj(){

  window.onclick = e => {

    
    let namelist = document.getElementById("namelist")
    let listasimple = document.getElementById("listasimple")


    let isClickInsideElement = namelist.contains(e.target) || listasimple.contains(e.target);

    if (isClickInsideElement){
      
      let master_list = GetMasterList()
    
      document.getElementById("searchbar").value = e.target.innerText
      document.getElementById("namelist").classList.remove("show")
  
      pjname = document.getElementById("searchbar").value;
      const pjinfo = master_list.find( pjinfo => pjinfo.nombre === pjname);
    
      let mlkeys = Object.keys(pjinfo)
      mlkeys.splice(0, 1);
      let prop = 0
  
      mlkeys.forEach(function (key){
        if (prop == 0){
          document.getElementById(prop).innerHTML = '<img id="pjref" src="'+pjinfo[key]+'">'
  
        }else{
          document.getElementById(prop).innerHTML = pjinfo[key]
        }
        prop = prop + 1
  
      });

    }

  } 

}

/////////////////////////////////////////////////////////////////////////////////
///////////////////////////////// LISTA SIMPLE /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////


function listasimple(){
  let master_list = GetMasterList()
  let lista = ''
  let pjnum = 0
  
  for (pj in master_list){
    let {nombre, nacimiento} = master_list[pj]
    lista = lista + "<tr><th onclick='sokpj()'>" + nombre + "</th><td class='simpleage' id='pj" + pjnum + "'>" + nacimiento + "</td></tr>"
    pjnum = pjnum + 1
  }
  
  document.getElementById("listasimple").innerHTML = lista
}

function agepj(){
  let td = document.getElementsByClassName("simpleage")
  let yearbar = document.getElementById("yearbar")

  yearbar.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
      listasimple()
      let year = document.getElementById("yearbar").value

      if (year){
        for (i = 0; i < td.length; i++) {
          txt = "pj" + i;
          age = document.getElementById(txt).innerHTML
          newage = year - age
          document.getElementById(txt).innerHTML = newage
        };
      }else{
        listasimple()
      }

    }
  });

}


