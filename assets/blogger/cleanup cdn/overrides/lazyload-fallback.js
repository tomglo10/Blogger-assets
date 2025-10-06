// lazyload-fallback.js — v1.0
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('img:not([loading])').forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      img.setAttribute("loading", "lazy");
      console.log("Deferred offscreen image:", img.src);
    }
  });
});


