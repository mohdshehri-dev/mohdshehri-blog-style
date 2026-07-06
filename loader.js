/* mohdshehri.com bootstrap: loads style.css + live.js fresh (10-min version bucket).
   This file rarely changes — the assets it loads carry the real updates. */
(function () {
  var v = Math.floor(Date.now() / 600000); /* changes every 10 minutes */
  var base = 'https://cdn.jsdelivr.net/gh/mohdshehri-dev/mohdshehri-blog-style@main/';
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
