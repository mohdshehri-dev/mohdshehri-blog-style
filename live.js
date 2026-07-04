/* mohdshehri.com — live behavior overrides.
   Blogger strips <form> tags from theme HTML, so we rebuild the Kit
   subscribe form here at runtime, then load Kit's script to power it. */
(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }
  ready(function () {
    var card = document.querySelector('.subscribe-band .subscribe');
    if (!card || card.querySelector('form')) return;

    card.innerHTML =
      '<h2>ليصلك جديد المدونة</h2>' +
      '<p class="sub-note">رسائل قليلة ومتباعدة — كقلة الكتابة في المدونة.</p>';

    var form = document.createElement('form');
    form.action = 'https://app.kit.com/forms/9644674/subscriptions';
    form.method = 'post';
    form.className = 'seva-form formkit-form';
    form.setAttribute('data-sv-form', '9644674');
    form.setAttribute('data-uid', 'aad0088c61');
    form.setAttribute('data-format', 'inline');
    form.setAttribute('data-version', '5');
    form.setAttribute('data-options', JSON.stringify({
      settings: {
        after_subscribe: { action: 'message',
          success_message: 'مرحبا بك . ستصلك رسالة للتأكيد', redirect_url: '' },
        recaptcha: { enabled: false },
        powered_by: { show: true,
          url: 'https://kit.com/features/forms?utm_campaign=poweredby&utm_medium=referral&utm_source=dynamic' },
        version: '5'
      }
    }));
    form.innerHTML =
      '<div data-style="clean">' +
        '<ul class="formkit-alert formkit-alert-error" data-element="errors" data-group="alert"></ul>' +
        '<div class="seva-fields formkit-fields" data-element="fields" data-stacked="false">' +
          '<div class="formkit-field">' +
            '<input class="formkit-input" name="email_address" aria-label="بريدك الإلكتروني" placeholder="بريدك الإلكتروني" required type="email" />' +
          '</div>' +
          '<button class="formkit-submit" data-element="submit">' +
            '<div class="formkit-spinner"><div></div><div></div><div></div></div>' +
            '<span>تفضّل</span>' +
          '</button>' +
        '</div>' +
        '<div class="formkit-powered-by-convertkit-container">' +
          '<a class="formkit-powered-by-convertkit" data-element="powered-by" data-variant="dark" ' +
            'href="https://kit.com/features/forms" rel="nofollow noopener" target="_blank">Built with Kit</a>' +
        '</div>' +
      '</div>';
    card.appendChild(form);

    var s = document.createElement('script');
    s.src = 'https://f.convertkit.com/ckjs/ck.5.js';
    document.body.appendChild(s);
  });
})();
