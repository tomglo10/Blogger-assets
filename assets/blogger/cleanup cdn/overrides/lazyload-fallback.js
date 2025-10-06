// Lazyload Fallback — v1.0
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      img.setAttribute("loading", "lazy");
      console.log("Deferred offscreen image:", img.src);
    }
  });  // Inject audit badge
  const badge = document.createElement("div");
  badge.textContent = "Lazy-Loading Active";
  badge.className = "lazy-badge";
  document.body.appendChild(badge);
});



