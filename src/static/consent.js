/* Ccentric cookie consent: banner + Google Consent Mode updates.
   Defaults are set inline in each page's <head> before the Google tag:
   analytics off in the EEA, UK and Switzerland until accepted; on elsewhere unless declined. */
(function () {
  var KEY = 'cc-consent';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function apply(v) {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: v === 'granted' ? 'granted' : 'denied' });
    }
  }

  var css = '' +
    '.cc-consent{position:fixed;left:0;right:0;bottom:0;z-index:1000;background:#001F1E;color:#A9C9C6;border-top:1px solid rgba(255,255,255,.12);' +
    'font-family:"Public Sans",Arial,sans-serif;padding:16px max(16px,env(safe-area-inset-right,0px)) calc(16px + env(safe-area-inset-bottom,0px)) max(16px,env(safe-area-inset-left,0px));}' +
    '.cc-consent[hidden]{display:none}' +
    '.cc-consent-inner{max-width:1160px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px 28px;flex-wrap:wrap;}' +
    '.cc-consent p{margin:0;font-size:14px;line-height:1.55;max-width:70ch;}' +
    '.cc-consent a{color:#00B9B5;text-decoration:none;}' +
    '.cc-consent a:hover{text-decoration:underline;}' +
    '.cc-consent-actions{display:flex;gap:12px;flex-shrink:0;}' +
    '.cc-consent button{font-family:inherit;font-size:12.5px;font-weight:800;text-transform:uppercase;letter-spacing:.02em;padding:11px 22px;border-radius:0;cursor:pointer;line-height:1;}' +
    '.cc-consent .cc-accept{background:#00B9B5;color:#001F1E;border:1px solid #00B9B5;}' +
    '.cc-consent .cc-accept:hover{opacity:.85;}' +
    '.cc-consent .cc-decline{background:transparent;color:#FFFFFF;border:1px solid rgba(255,255,255,.35);}' +
    '.cc-consent .cc-decline:hover{border-color:#00B9B5;color:#00B9B5;}' +
    '.cc-consent button:focus-visible{outline:2px solid #00B9B5;outline-offset:3px;}' +
    '@media(max-width:600px){.cc-consent-actions{width:100%;}.cc-consent button{flex:1;}}';

  function build() {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'cc-consent';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', 'Cookie preferences');
    bar.hidden = true;
    bar.innerHTML =
      '<div class="cc-consent-inner">' +
        '<p>We use analytics cookies to understand how this site is used and improve it. ' +
        'See our <a href="ccentric-privacy.html">privacy policy</a>.</p>' +
        '<div class="cc-consent-actions">' +
          '<button type="button" class="cc-decline">Decline</button>' +
          '<button type="button" class="cc-accept">Accept</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(bar);

    function choose(v) {
      save(v);
      apply(v);
      bar.hidden = true;
    }
    bar.querySelector('.cc-accept').addEventListener('click', function () { choose('granted'); });
    bar.querySelector('.cc-decline').addEventListener('click', function () { choose('denied'); });

    document.addEventListener('click', function (e) {
      var link = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (link) {
        e.preventDefault();
        bar.hidden = false;
        bar.querySelector('.cc-accept').focus();
      }
    });

    if (!stored()) bar.hidden = false;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
