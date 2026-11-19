// ---------- Hover sound (gear) ----------
var gear = new Audio('sfx.mp3');
gear.preload = 'auto';
gear.volume = 0.3;
gear.load();

// ---------- Click sound ----------
var clickSound = new Audio('sfx2.mp3');
clickSound.preload = 'auto';
clickSound.volume = 1;
clickSound.load();

// ---------- The first click or key press unlocks the sound ----------
var unlocked = false;

function unlock(){
  if (unlocked) return;
  unlocked = true;

  gear.muted = true;
  gear.play().then(function(){
    gear.pause();
    gear.currentTime = 0;
    gear.muted = false;
  }).catch(function(){
    unlocked = false;
    gear.muted = false;
  });
}

document.addEventListener('click', unlock);
document.addEventListener('keydown', unlock);
document.addEventListener('touchend', unlock);

// ---------- Clicking the intro scrolls down to the menu (Homepage only) ----------
document.addEventListener('click', function(){
  if (document.querySelector('#selections') && window.scrollY < 50) {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  }
});

// ---------- Hover: play the gear sound ----------
var items = document.querySelectorAll('#selections h1, #menu > p > a, #socials a');

for (var i = 0; i < items.length; i++) {
  items[i].addEventListener('mouseenter', function(){
    gear.currentTime = 0;
    gear.play().catch(function(){});
  });
}

// ---------- Click: play the click sound, then open the page ----------
var links = document.querySelectorAll('#selections a, #menu > p > a, #socials a');

for (var j = 0; j < links.length; j++) {
  links[j].addEventListener('click', function(e){
    clickSound.currentTime = 0;
    clickSound.play().catch(function(){});

    // If the link opens in a new tab (like your socials), let it open normally
    if (this.target === '_blank') return;

    e.preventDefault();               // stop the page from opening right away
    var url = this.href;              // remember where the link goes

    setTimeout(function(){            // wait a moment, then open the page
      window.location.href = url;
    }, 250);
  });
}