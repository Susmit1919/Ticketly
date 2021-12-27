var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function register() {
  x.style.left = "-400px";
  y.style.left = "50px";
  z.style.left = "110px";
}

function loginnn() {
  x.style.left = "50px";
  y.style.left = "450px";
  z.style.left = "0";
}

document.getElementById("login").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("register").addEventListener("submit", (event) => {
  event.preventDefault();
});


