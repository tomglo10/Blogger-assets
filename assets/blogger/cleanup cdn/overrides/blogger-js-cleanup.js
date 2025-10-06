<script>(function () {
  // Audit mode toggle
  const auditMode = true;
  if (auditMode) console.log("Blogger JS cleanup active");

  // Disable Blogger's widget manager
  if (window._WidgetManager) {
    window._WidgetManager._GetAllData = function () {};
    console.log("WidgetManager disabled");
  }

  // Remove Blogger's injected scripts
  document.querySelectorAll('script[src*="blogger.com"]').forEach(script => {
    script.remove();
    console.log("Removed Blogger script:", script.src);
  });
})();</script>

