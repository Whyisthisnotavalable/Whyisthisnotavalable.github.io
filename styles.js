document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    return false;
  }
};

function update(event) {
  for (let dot; dot = document.querySelector("dot");) {
    dot.remove;
  }
  for (let i = 0; i < event.touches.length; i++) {
    let {pageX, pageY} = event.touches[i];
    let dot = document.createElement("dot");
    dot.style.left = (pageX - 50) + "px";
    dot.style.top = (pageY - 50) + "px";
    dot.style.pointerEvents = "none";
    event.preventDefault();
    document.appendChild(dot);
  }
}
window.addEventListener("touchstart", update);
window.addEventListener("touchmove", update);
window.addEventListener("touchend", update);
document.addEventListener("contextmenu", (event) => {
/*  let x = event.clientX;
  let y = event.clientY;
  let contextmenu = document.createElement("div");
  contextmenu.innerHTML = '<button>Inspect</button>'
  contextmenu.className = "contextmenu";
  contextmenu.style.position = "absolute";
  contextmenu.style.top = y + "px";
  contextmenu.style.left = x + "px";
  document.body.appendChild(contextmenu); */
  event.preventDefault();
});
let mt = document.querySelector("#mousetrail");
let settings = document.querySelector(".settingbutton");
let close = document.querySelector("#exit");
let backdrop = document.querySelector(".backdrop");
settings.addEventListener("click", event => {
  let setting = document.querySelector(".settings"); 
  setting.style.display = "block";
  backdrop.style.display = "block";
});
close.addEventListener("click", function (event) {
  event.preventDefault();
  let setting = document.querySelector(".settings"); 
  setting.style.display = "none";
  backdrop.style.display = "none";
})
backdrop.addEventListener("click", function (event) {
  event.preventDefault();
  let setting = document.querySelector(".settings"); 
  setting.style.display = "none";
  backdrop.style.display = "none";
})
var mousestuff = false;
function mousetrail() {
  document.addEventListener("mousemove", event => {
  let x = event.clientX;
  let y = event.clientY;
  let mouse = document.createElement("div");
  mouse.style.position = "absolute";
  mouse.innerHTML = '<img src="https://cdn.glitch.global/866c4287-dbb9-40bb-81d8-737652882677/cursorXD-removebg-preview.png?v=1658186230865" style="width: 15px; height: 15px";>'
  mouse.style.top = y + "px";
  mouse.style.left = x + "px";
  mouse.style.opacity = 1;
  mouse.style.pointerEvents = "none";
  window.setInterval(function () {
    mouse.style.opacity -= 0.1;
}, 10)
  window.setTimeout(function () {
    mouse.remove();
  }, 100)
    if(mousestuff == true) {
      document.body.appendChild(mouse); 
    } else {
      
    }
})};
mt.addEventListener("change", () => {
  if(!mt.checked){
    mousestuff = false;
    console.log("Mouse trail disabled");
  } else {
    mousestuff = true;
    mousetrail();
    console.log("Mouse trail enabled " + "WARNING: Mouse trail is very buggy, user may want to reload after disabling.")
  }
});

function changecolor(index) {
  document.body.style.backgroundColor = index;
  let header = document.querySelector("h1");
  header.style.backgroundColor = index;
  header.style.backgroundBlendMode = "luminosity";
  console.log("Background color changed to "+ index + ".");
}