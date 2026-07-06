/* mohdshehri.com bootstrap: loads style.css + live.js fresh (10-min version bucket).
   This file rarely changes — the assets it loads carry the real updates. */
(function () {
  var v = Math.floor(Date.now() / 600000); /* changes every 10 minutes */
  /* GitHub Pages: ~10-min cache, no purge needed (jsDelivr left us stale-cached 2026-07-06) */
  var base = 'https://mohdshehri-dev.github.io/mohdshehri-blog-style/';
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = base + 'style.css?v=' + v;
  document.head.appendChild(l);
  /* descriptions.js must run before live.js — async=false keeps dynamic
     scripts in insertion order (defer alone doesn't for dynamic scripts) */
  var d = document.createElement('script');
  d.async = false;
  d.src = base + 'descriptions.js?v=' + v;
  document.head.appendChild(d);
  var s = document.createElement('script');
  s.async = false;
  s.src = base + 'live.js?v=' + v;
  document.head.appendChild(s);
})();
