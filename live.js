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
