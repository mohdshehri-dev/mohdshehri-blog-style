/* mohdshehri.com — live behavior overrides. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    /* --- subscribe card: force sane layout with inline styles ---------- */
    var band = document.querySelector('.subscribe-band');
    var card = band && band.querySelector('.subscribe');
    if (band && card) {
      band.style.cssText +=
        ';display:block;width:auto;max-width:none;float:none;position:static;clear:both;padding:8px 22px 4px';
      card.style.cssText +=
        ';display:block;box-sizing:border-box;width:100%;max-width:42rem;margin:10px auto 30px;' +
        'float:none;position:static;text-align:center';
      var form = card.querySelector('form');
      if (form) {
        form.style.cssText += ';display:block;width:100%;max-width:460px;margin:0 auto';
        var fields = form.querySelector('.formkit-fields');
        if (fields) fields.style.cssText +=
          ';display:flex;flex-wrap:wrap;gap:10px;justify-content:center;width:100%';
        var inp = form.querySelector('.formkit-input');
        if (inp) inp.style.cssText +=
          ';flex:1 1 220px;width:auto;box-sizing:border-box;font-family:Tajawal,sans-serif;font-size:1rem;' +
          'padding:12px 16px;border:1px solid #E7DBC8;border-radius:8px;background:#FBF6EE;color:#2C2622';
        var btn = form.querySelector('.formkit-submit');
        if (btn) btn.style.cssText +=
          ';flex:0 0 auto;background:#B25B3B;color:#fff;border:0;border-radius:8px;' +
          'font-family:Tajawal,sans-serif;font-weight:500;font-size:.95rem;cursor:pointer;padding:0';
        var span = btn && btn.querySelector('span');
        if (span) span.style.cssText += ';display:inline-block;padding:12px 30px';
      }
    }
  });
})();

/* --- meta description for posts (auto-generated map in descriptions.js;
       a description saved natively in the Blogger editor always wins) ---- */
(function () {
  function inject() {
    var map = window.__postDescs;
    if (!map) return;
    var desc = map[location.pathname.replace(/\/$/, '') || '/'];
    if (!desc) return;
    if (document.querySelector('meta[name="description"]')) return;
    var m = document.createElement('meta');
    m.name = 'description';
    m.content = desc;
    document.head.appendChild(m);
    var og = document.querySelector('meta[property="og:description"]');
    if (!og) {
      og = document.createElement('meta');
      og.setAttribute('property', 'og:description');
      document.head.appendChild(og);
    }
    og.setAttribute('content', desc);
  }
  if (window.__postDescs) { inject(); return; }
  /* self-load the map: works regardless of which loader.js version is cached */
  var v = Math.floor(Date.now() / 600000);
  var s = document.createElement('script');
  s.src = 'https://mohdshehri-dev.github.io/mohdshehri-blog-style/descriptions.js?v=' + v;
  s.onload = inject;
  document.head.appendChild(s);
})();

/* --- favicon: replace Blogger's default orange icon -------------------- */
(function () {
  var href = 'https://mohdshehri-dev.github.io/mohdshehri-blog-style/favicon.png';
  var old = document.querySelectorAll('link[rel~="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]');
  Array.prototype.forEach.call(old, function (l) { l.parentNode.removeChild(l); });
  var link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/png';
  link.href = href;
  document.head.appendChild(link);
})();

/* --- share buttons under each post (item pages) ----------------------- */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (!document.body.classList.contains('item')) return;
    var body = document.querySelector('.post-body');
    if (!body || document.querySelector('.share-row')) return;

    var canonical = document.querySelector('link[rel="canonical"]');
    var url = (canonical && canonical.href) || location.href.split('#')[0];
    var titleEl = document.querySelector('.post-title');
    var title = (titleEl ? titleEl.textContent : document.title).trim();

    var row = document.createElement('div');
    row.className = 'share-row';
    row.innerHTML = '<span class="share-label">شارك:</span>';

    function btn(text, href) {
      var a = document.createElement('a');
      a.className = 'share-btn';
      a.textContent = text;
      a.href = href;
      a.target = '_blank';
      a.rel = 'noopener';
      return a;
    }
    row.appendChild(btn('X', 'https://twitter.com/intent/tweet?text=' +
      encodeURIComponent(title) + '&url=' + encodeURIComponent(url)));
    row.appendChild(btn('واتساب', 'https://wa.me/?text=' +
      encodeURIComponent(title + '\n' + url)));

    var copy = document.createElement('a');
    copy.className = 'share-btn';
    copy.textContent = 'نسخ الرابط';
    copy.href = '#';
    copy.addEventListener('click', function (e) {
      e.preventDefault();
      (navigator.clipboard ? navigator.clipboard.writeText(url)
        : Promise.reject()).then(function () {
        copy.textContent = 'تم النسخ ✓';
        setTimeout(function () { copy.textContent = 'نسخ الرابط'; }, 2000);
      }).catch(function () { prompt('انسخ الرابط:', url); });
    });
    row.appendChild(copy);

    body.parentNode.insertBefore(row, body.nextSibling);
  });
})();

/* --- extra nav pills (added via pipeline, no Layout edit needed) ------- */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var ul = document.querySelector('.site-nav .PageList ul, .site-nav .LinkList ul');
    if (!ul) return;
    var EXTRAS = [
      { title: 'صحة', url: 'https://www.mohdshehri.com/search/label/صحة' },
      { title: 'الأكثر قراءة', url: 'https://www.mohdshehri.com/p/blog-page_143.html' }
    ];
    var here = decodeURIComponent(location.href).replace(/[?#].*$/, '').replace(/\/+$/, '');
    EXTRAS.forEach(function (item) {
      // skip if already present (e.g., user later adds it in Layout)
      var exists = Array.prototype.some.call(ul.querySelectorAll('a'), function (a) {
        return decodeURIComponent(a.href || '').indexOf(encodeURI ? item.url.split('/').pop() : '') !== -1 &&
               a.textContent.trim() === item.title;
      });
      if (exists) return;
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = item.url;
      a.textContent = item.title;
      if (decodeURIComponent(a.href).replace(/[?#].*$/, '').replace(/\/+$/, '') === here) {
        a.classList.add('active');
      }
      li.appendChild(a);
      // insert before the last static-page link (لماذا أكتب؟) if present
      var lis = ul.querySelectorAll('li');
      var anchor = null;
      for (var i = 0; i < lis.length; i++) {
        var link = lis[i].querySelector('a');
        if (link && /\/p\//.test(link.getAttribute('href') || '')) { anchor = lis[i]; break; }
      }
      ul.insertBefore(li, anchor);
    });
  });
})();

/* --- book card in the footer (site-wide) ------------------------------- */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var footer = document.querySelector('.site-footer');
    if (!footer || footer.querySelector('.book-card')) return;
    var card = document.createElement('a');
    card.className = 'book-card';
    card.href = 'https://tashkeell.com/ar/ZYDmrXm';
    card.target = '_blank';
    card.rel = 'noopener';
    card.innerHTML =
      '<img alt="غلاف كتاب من على بوابة الأربعين" src="https://mohdshehri-dev.github.io/mohdshehri-blog-style/book-cover.png" />' +
      '<span class="book-card-text">' +
        '<span class="book-card-kicker">صدر للكاتب</span>' +
        '<span class="book-card-title">من على بوابة الأربعين</span>' +
        '<span class="book-card-sub">خواطر الغربة والابتعاث — أحاديث طريق وسواليف مقهى</span>' +
        '<span class="book-card-cta">اقتنِ الكتاب ←</span>' +
      '</span>';
    var anchor = footer.querySelector('.author-card') || footer.querySelector('.colophon');
    footer.insertBefore(card, anchor);
  });
})();

/* --- hide صحة posts from the main chronological stream -----------------
       (homepage + its older/newer pagination). They stay fully visible on
       the صحة label page, in search results, archives, and direct links. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var path = location.pathname;
    var isStream = path === '/' ||
      (path === '/search' && !/[?&]q=/.test(location.search));
    if (!isStream) return;
    var outers = document.querySelectorAll('.post-outer');
    for (var i = 0; i < outers.length; i++) {
      var labels = outers[i].querySelectorAll('.post-labels a');
      for (var j = 0; j < labels.length; j++) {
        if (decodeURIComponent(labels[j].href).indexOf('/search/label/صحة') !== -1) {
          outers[i].style.display = 'none';
          break;
        }
      }
    }
  });
})();
