/* mohdshehri.com bootstrap: loads style.css + live.js fresh (10-min version bucket).
   This file rarely changes — the assets it loads carry the real updates. */
(function () {
  var v = Math.floor(Date.now() / 600000); /* changes every 10 minutes */
  var base = 'https://cdn.jsdelivr.net/gh/mohdshehri-dev/mohdshehri-blog-style@main/';
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = base + 'style.css?v=' + v;
  document.head.appendChild(l);
  var s = document.createElement('script');
  s.defer = true;
  s.src = base + 'live.js?v=' + v;
  document.head.appendChild(s);
})();
