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

/* --- homepage meta description (the «الشهري» query shows the homepage
       with no snippet — 50 impressions, 0 clicks in GSC) ----------------- */
(function () {
  if (location.pathname !== '/') return;
  if (document.querySelector('meta[name="description"]')) return;
  var desc = 'المدونة الشخصية للدكتور محمد عبدالله الشهري — استشاري أمراض الكلى ' +
    'وأستاذ مشارك بكلية الطب في جامعة الملك خالد بأبها. تأملات ومقالات ويوميات سفر، ' +
    'وتدوينات صحية موثوقة عن الكلى.';
  var m = document.createElement('meta');
  m.name = 'description';
  m.content = desc;
  document.head.appendChild(m);
  var og = document.createElement('meta');
  og.setAttribute('property', 'og:description');
  og.setAttribute('content', desc);
  document.head.appendChild(og);
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

/* --- newsletter form up to the end of the post (item pages) ------------
       the band otherwise sits below the empty comments block and the
       pager, where a reader who just finished the post never sees it */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (!document.body.classList.contains('item')) return;
    var band = document.querySelector('.subscribe-band');
    var row = document.querySelector('.share-row') || document.querySelector('.post-body');
    if (!band || !row) return;
    row.parentNode.insertBefore(band, row.nextSibling);
    band.style.margin = '10px 0';
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
      { title: 'الأكثر قراءة', url: 'https://www.mohdshehri.com/p/blog-page_143.html' },
      { title: 'أسئلة المرضى', url: 'https://www.mohdshehri.com/p/blog-page_11.html' }
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

/* --- homepage: from-the-archive links -----------------------------------
       internal links from the highest-authority page to posts that sit
       near page one in Google with impressions but almost no clicks */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (location.pathname !== '/') return;
    if (document.querySelector('.archive-picks')) return;
    var PICKS = [
      { t: 'أمريكا التي رأيت أنا', u: '/2021/12/blog-post.html' },
      { t: 'بين الطب والفلسفة/المنطق', u: '/2018/09/blog-post_22.html' },
      { t: 'سبع عجاف', u: '/2020/06/blog-post.html' },
      { t: 'أنا لا أحب شرب الحليب', u: '/2018/10/blog-post_21.html' },
      { t: 'كيف تكون طبيب امتياز', u: '/2018/09/blog-post.html' },
      { t: 'قصتي مع محمود شاكر', u: '/2020/01/blog-post.html' },
      { t: 'لماذا تتحجر قلوب الأطباء أمام الموت؟', u: '/2020/11/blog-post.html' }
    ];
    var box = document.createElement('nav');
    box.className = 'archive-picks';
    var h = document.createElement('h3');
    h.textContent = 'من أرشيف المدونة';
    box.appendChild(h);
    var ul = document.createElement('ul');
    PICKS.forEach(function (p) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = p.u;
      a.textContent = p.t;
      li.appendChild(a);
      ul.appendChild(li);
    });
    box.appendChild(ul);
    var pager = document.querySelector('.blog-pager');
    if (pager && pager.parentNode) pager.parentNode.insertBefore(box, pager);
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

/* --- site-wide Person JSON-LD (links the blog to the doctor page) ------
       skipped on the doctor page itself, which carries Physician schema */
(function () {
  if (location.pathname === '/p/blog-page_08.html') return;
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.text = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://www.mohdshehri.com/#person',
    name: 'محمد عبدالله الشهري',
    alternateName: 'Dr. Mohammed Abdullah Alshehri',
    url: 'https://www.mohdshehri.com/',
    jobTitle: 'استشاري أمراض الكلى وأستاذ مشارك بكلية الطب',
    affiliation: {
      '@type': 'CollegeOrUniversity',
      name: 'جامعة الملك خالد — كلية الطب',
      address: { '@type': 'PostalAddress', addressLocality: 'أبها', addressCountry: 'SA' }
    },
    sameAs: ['https://www.mohdshehri.com/p/blog-page_08.html']
  });
  document.head.appendChild(s);
})();

/* --- author card: link to the doctor page ------------------------------ */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var card = document.querySelector('.author-card');
    if (!card || card.querySelector('.med-link')) return;
    var profileLink = card.querySelector('.profile-link');
    var a = document.createElement('a');
    a.className = 'med-link';
    a.href = 'https://www.mohdshehri.com/p/blog-page_08.html';
    a.textContent = 'صفحتي الطبية';
    if (profileLink && profileLink.parentNode) {
      var sep = document.createElement('span');
      sep.className = 'med-link-sep';
      sep.textContent = ' · ';
      profileLink.parentNode.insertBefore(sep, profileLink.nextSibling);
      profileLink.parentNode.insertBefore(a, sep.nextSibling);
    } else {
      card.appendChild(a);
    }
  });
})();

/* --- patient Q&A page: ask box (submits to the user's Google Form) ----- */
(function () {
  var ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSc4s8eeu7L0qb7Ks7Ik2W2H0ST-dNa1ZLtRLvRybSiPBsauOw/formResponse';
  var ENTRY = 'entry.1990910686';
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    if (location.pathname !== '/p/blog-page_11.html') return;
    var slot = document.getElementById('qa-ask');
    if (!slot || slot.firstChild) return;
    slot.className = 'qa-ask';
    var h = document.createElement('h2');
    h.textContent = 'عندك سؤال عام؟';
    var sub = document.createElement('p');
    sub.className = 'qa-ask-sub';
    sub.textContent = 'اكتب سؤالك هنا — الأسئلة المختارة تُجاب في هذه الصفحة إجابةً عامة، ولا تُرسل ردود شخصية.';
    var ta = document.createElement('textarea');
    ta.placeholder = 'سؤالك… من غير أسماء أو تفاصيل شخصية';
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'أرسل سؤالك';
    var fine = document.createElement('p');
    fine.className = 'qa-ask-fine';
    fine.textContent = 'لا نجمع اسمك ولا بريدك — السؤال فقط. وليصلك جديد الأجوبة، اشترك في النشرة أسفل الصفحة.';
    slot.appendChild(h); slot.appendChild(sub); slot.appendChild(ta);
    slot.appendChild(btn); slot.appendChild(fine);
    btn.addEventListener('click', function () {
      var q = ta.value.trim();
      if (!q) { ta.focus(); return; }
      btn.disabled = true;
      btn.textContent = 'يُرسل…';
      var body = new FormData();
      body.append(ENTRY, q);
      function done() {
        var ok = document.createElement('p');
        ok.className = 'qa-ask-done';
        ok.textContent = 'وصل سؤالك، شكرًا لك. الأسئلة المختارة تُجاب في هذه الصفحة تباعًا.';
        slot.replaceChild(ok, ta);
        slot.removeChild(btn);
      }
      fetch(ACTION, { method: 'POST', mode: 'no-cors', body: body }).then(done, done);
    });
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
    /* صحة posts live before 2026-07-08 stay on the homepage; only
       later ones are hidden (grandfathered list, keep in sync if needed) */
    var keep = {
      '/2026/07/blog-post_07.html': 1,
      '/2026/07/blog-post.html': 1,
      '/2025/08/blog-post.html': 1,
      '/2022/05/blog-post.html': 1,
      '/2017/01/blog-post_2.html': 1,
      '/2016/04/blog-post_6.html': 1
    };
    var outers = document.querySelectorAll('.post-outer');
    for (var i = 0; i < outers.length; i++) {
      var title = outers[i].querySelector('.post-title a');
      if (title && keep[decodeURIComponent(new URL(title.href).pathname)]) continue;
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
