(function(){

  // ----- settings you can change -----
  var menuWidth = 200;               // width of your left menu (dots start after it)
  var gap = 12;                      // space between dots
  var maxSize = 3;                   // size of the biggest dots
  var reach = 0.5;                   // how far the dots spread from a corner (smaller = smaller corner)
  var corners = [[1, 0], [0, 1]];    // [1,0] = top-right, [0,1] = bottom-left
  var color = '#c2c2c2';                // dot color
  // -----------------------------------

  // the drawing board starts AFTER the menu, so the menu stays clean
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;right:0;bottom:0;left:' + menuWidth + 'px;z-index:-2;pointer-events:none;';
  canvas.style.width = 'calc(100% - ' + menuWidth + 'px)';
  canvas.style.height = '100%';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');

  function draw(){
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    var dpr = window.devicePixelRatio || 1;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = color;

    var distance = Math.min(w, h) * reach;

    for (var x = gap / 2; x < w; x += gap) {
      for (var y = gap / 2; y < h; y += gap) {

        var nearest = 99999;
        for (var i = 0; i < corners.length; i++) {
          var dx = x - corners[i][0] * w;
          var dy = y - corners[i][1] * h;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < nearest) nearest = d;
        }

        var size = maxSize * (1 - nearest / distance);

        if (size > 0.4) {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  }

  draw();
  window.addEventListener('resize', draw);
})();