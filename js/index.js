
function bgColor(color, text) {
  let body = document.getElementById("body");
  body.style.backgroundColor = color;

  if (text == false){
    swal({
      icon: "error",
      text: "Usuario y/o contraseña incorrecta. \n Contacte a un administrador.",
      closeOnClickOutside: true,
      closeOnEsc: true,
      timer: 3000,
      button: false,
    });
  }else{
    let {username, admin} = text
    sessionStorage.setItem("user", username);
    admin == true ? sessionStorage.setItem("admin", true):sessionStorage.setItem("admin", false)
    swal({
      icon: "success",
      text: "¡Bienvenid@, " + username + "!",
      button: false,
    });
    setTimeout(function(){
      window.location.href="./pages/main.html"
    },1300)
  }

}

fetch("js/users.json")
  .then(users => users.json())
  .then(data => sessionStorage.setItem("users", JSON.stringify(data)))

let logga = document.getElementById("logga");

logga.addEventListener("submit", (e) => {
  e.preventDefault()

  let users = sessionStorage.getItem("users")
  users = JSON.parse(users)

  let xuser = document.getElementById("user").value;
  let xpass = document.getElementById("pass").value;

  const userinfo = users.find( userinfo => userinfo.username === xuser) ?? bgColor("#e99191", false);
  userinfo["password"] == xpass ? bgColor("#6BF0D5", userinfo):bgColor("#e99191", false)
  

})

