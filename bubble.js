var box = document.getElementById('bubbles');
var W = box.offsetWidth;    // width of the white page
var H = box.offsetHeight;   // height of the white page

// if the window changes size, measure again
window.addEventListener('resize', function(){
  W = box.offsetWidth;
  H = box.offsetHeight;
});

var dots = [];

for (var i = 0; i < 90; i++) {
  var el = document.createElement('div');
  el.className = 'bubble';

  var size = 10 + Math.random() * 5;   // small dots
  el.style.width = size + 'px';
  el.style.height = size + 'px';
  box.appendChild(el);

  dots.push({
    el: el,
    shift: Math.random() * 0.75,                 // how far right of the curve (0 = touching the curve)
    u: Math.random(),                            // how high it is now (0 = bottom, 1 = top)
    speed: 1 / (10 + Math.random() * 10)         // how fast it climbs
  });
}

var last = performance.now();

function move(now){
  var dt = (now - last) / 1000;   // seconds since the last frame
  last = now;

  for (var i = 0; i < dots.length; i++) {
    var d = dots[i];

    d.u = d.u + d.speed * dt;     // climb a little
    if (d.u > 1) d.u = 0;         // reached the top, so go back to the bottom

    // where the red curve is at this height (0 = left edge, 1 = right edge)
    var curve = 0.25 + 0.42 * Math.sqrt(1 - (1 - d.u) * (1 - d.u));

    var x = (curve + d.shift) * W;
    var y = (H + 40) * (1 - d.u) - 20;

    d.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }

  requestAnimationFrame(move);    // do it again on the next frame
}

requestAnimationFrame(move);