(function () {
  // Highlight LCP candidate
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    if (entries.length > 0) {
      const lcp = entries[entries.length - 1];
      if (lcp.element) {
        lcp.element.classList.add("lcp-candidate");
        console.log("LCP candidate:", lcp.element);
      }
    }
  });

  observer.observe({ type: "largest-contentful-paint", buffered: true });

  // Toggle audit overlays
  document.querySelectorAll("[data-audit]").forEach((el) => {
    el.classList.add("audit-outline");
  });

  // Enable senior-friendly mode
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.body.classList.add("senior-mode");
  }
})();

