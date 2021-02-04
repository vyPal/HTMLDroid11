// JavaScript Document

let on = false;
let locked = true;
let isshutdown = true;
let timer = 0;
let timerInterval;
let powerbutton = document.getElementById("powerbutton");

function powerbtn() {
  if (!on && !isshutdown) {
    on = true;
    document.getElementById('phone').classList.toggle('off');
  }else if (on){
    on = false;
    if (!locked) {
      locked = true;
      document.getElementById('phone').classList.toggle('locked');
    }
    document.getElementById('phone').classList.toggle('off');
  }
}

function unlock() {
  if (!locked && on) {
    locked = true;
    document.getElementById('phone').classList.toggle('locked');
  }else if (locked && on){
    locked = false;
    document.getElementById('phone').classList.toggle('locked');
  }
}

document.getElementById('unlockbutton').addEventListener('click', function (event) {
  unlock();
});

var videoelement = document.createElement("video");
videoelement.setAttribute("id", "bootscreen");
videoelement.setAttribute("muted", "muted");
videoelement.setAttribute("height", "544");
videoelement.setAttribute("width", "262");

var sourceWEBM = document.createElement("source"); 
sourceWEBM.type = "video/webm";
sourceWEBM.src = "videos/bootanim.webm";
videoelement.appendChild(sourceWEBM);

powerbutton.addEventListener("mousedown", function() {
  timerInterval = setInterval(function(){
    timer += 1;
    if (timer == 2){
      $('#screen').html(videoelement);
      var video = document.getElementById("bootscreen");
      document.getElementById('phone').classList.add('booting');
      video.play();
      document.getElementById('bootscreen').addEventListener('ended',deletevid,false);
      clearInterval(timerInterval);
      timer = 0;
    }
  }, 1000);
});

powerbutton.addEventListener("mouseup", function() {
  clearInterval(timerInterval);
  timer = 0;
});

function deletevid(e) {
  e.target.parentNode.removeChild(e.target)
  setTimeout(() => {
    document.getElementById('phone').classList.remove('booting');
    document.getElementById('phone').classList.toggle('off');
    isshutdown = false;
    on = true;
  }, 2000);
}

$(".draggable").draggable({
  containment: "parent",
  axis: "y"
});