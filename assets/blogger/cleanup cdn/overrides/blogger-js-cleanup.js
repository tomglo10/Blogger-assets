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
    console.log("Removed Blogger script:", script.src);document.querySelectorAll('iframe[src*="comment_from_post_iframe"]').forEach(iframe => {
  iframe.remove();
  console.log("Removed Blogger comment iframe");
});
  });
})();</script>
  <script>const badge = document.createElement('div');
badge.textContent = "Audit Mode: Layout Cleanup Active";
badge.style = "position:fixed;bottom:0;right:0;background:#222;color:#fff;padding:4px;font-size:12px;z-index:9999;";
document.body.appendChild(badge);
window.addEventListener('load', () => {
  const lcpImage = document.querySelector('img[fetchpriority="high"]');
  if (lcpImage) {
    console.log("LCP image discovered early:", lcpImage.src);
  }
});</script>




