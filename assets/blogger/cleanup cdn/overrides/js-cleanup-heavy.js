// js-cleanup-heavy.js — v1.0
(function () {
  const auditMode = true;
  if (auditMode) console.log("Heavy JS cleanup active");

  // Remove reCAPTCHA
  document.querySelectorAll('script[src*="recaptcha"]').forEach(s => s.remove());

  // Remove Blogger bundles
  document.querySelectorAll('script[src*="www.blogger.com"]').forEach(s => s.remove());

  // Disable WidgetManager
  window._WidgetManager = {
    _GetAllData: function () {},
    _SetDataContext: function () {},
  };
})();

