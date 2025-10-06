// semantic-audit.js — v1.0
document.addEventListener("DOMContentLoaded", () => {
  // Highlight inputs missing labels
  document.querySelectorAll('input:not([id])').forEach(input => {
    input.style.outline = '2px dashed red';
    console.warn("Unlabeled input detected:", input);
  });

  // Highlight orphaned <li> elements
  document.querySelectorAll('li').forEach(li => {
    const parent = li.parentElement;
    if (!parent || !["UL", "OL"].includes(parent.tagName)) {
      li.style.outline = '2px dashed orange';
      console.warn("Orphaned <li> detected:", li);
    }
  });

  // Inject audit badge
  const badge = document.createElement("div");
  badge.textContent = "Semantic Audit Active";
  badge.style = "position:fixed;bottom:0;right:0;background:#222;color:#fff;padding:4px;font-size:12px;z-index:9999;font-family:sans-serif;";
  document.body.appendChild(badge);
});

