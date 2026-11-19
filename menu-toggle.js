(function(){

  var toggle = document.getElementById('menu-toggle');
  var sideMenu = document.getElementById('menu');

  if (!toggle || !sideMenu) return;      

  function setMenu(open){
    sideMenu.classList.toggle('open', open);
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    toggle.innerHTML = open
      ? '<i class="fa-solid fa-xmark"></i>'     
      : '<i class="fa-solid fa-bars"></i>';     
  }

  // click the button: open or close
  toggle.addEventListener('click', function(){
    setMenu(!sideMenu.classList.contains('open'));
  });

  // click anywhere else: close
  document.addEventListener('click', function(e){
    if (!sideMenu.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
  });

  // press the Esc key: close
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') setMenu(false);
  });

  // the window becomes wide again: close and reset
  window.addEventListener('resize', function(){
    if (window.innerWidth > 900) setMenu(false);
  });

})();