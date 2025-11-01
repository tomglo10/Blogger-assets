(async function () {
  const repo = "tomglo10/Blogger-assets";
  const path = "latest.json";
  const cdnBase = "https://cdn.jsdelivr.net/gh";

  try {
    const res = await fetch(`https://raw.githubusercontent.com/${repo}/main/${path}`);
    const data = await res.json();
    const version = data.latest;

    // Inject CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${cdnBase}/${repo}@${version}/blogger-audit-kit/css/audit-overlays.css`;
    document.head.appendChild(css);

    // Inject JS
    const script = document.createElement("script");
    script.src = `${cdnBase}/${repo}@${version}/blogger-audit-kit/js/diagnostics.js`;
    document.body.appendChild(script);

    console.log("Injected versioned assets:", version);
  } catch (err) {
    console.error("Failed to load latest.json or inject assets:", err);
  }
})();

