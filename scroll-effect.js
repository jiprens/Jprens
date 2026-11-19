var intro = document.querySelector('.intro-banner').parentElement; 
var main = document.querySelector('main-page');                          

function update(){
  var p = Math.min(1, window.scrollY / (window.innerHeight * 0.5)); 
  intro.style.opacity = 1 - p;
  main.style.opacity = p;
  intro.style.visibility = p >= 1 ? 'hidden' : 'visible';
}

window.addEventListener('scroll', update);
update();