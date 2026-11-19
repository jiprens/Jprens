var lenis;

if (typeof Lenis !== 'undefined') {     // only if Lenis loaded (needs internet)
  lenis = new Lenis({
    autoRaf: true,      // it updates itself on every frame
    lerp: 0.08,         // how soft the glide is
    smoothWheel: true,  // smooth the mouse wheel
    anchors: true       // links like #Film-Sector also glide smoothly
  });
}