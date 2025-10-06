// LCP Audit Script — v1.0
document.addEventListener("DOMContentLoaded", () => {
  const lcpImage = document.querySelector('img[fetchpriority="high"]');
  if (lcpImage) {
    console.log("✅ LCP image discovered early:", lcpImage.src);

    // Inject audit badge
    const badge = document.createElement("div");
    badge.textContent = "LCP Optimized";
    badge.className = "lcp-badge";
    document.body.appendChild(badge);
  } else {
    console.warn("⚠️ No LCP image with fetchpriority=high found.");
  }
});

