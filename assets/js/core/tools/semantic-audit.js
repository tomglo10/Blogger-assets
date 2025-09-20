(function() {
  const issues = [];

  function logIssue(type, detail, element) {
    issues.push({ type, detail, element });
    console.warn(`[Audit] ${type}: ${detail}`, element);
  }

  function checkThumbnails() {
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src');
      const alt = img.getAttribute('alt');
      if (!src || src.includes('no_thumb.png')) {
        logIssue('Missing Thumbnail', 'Image has no valid src or uses fallback', img);
      }
      if (!alt || alt.trim() === '') {
        logIssue('Missing Alt Text', 'Image lacks alt attribute', img);
      }
    });
  }

  function checkTitles() {
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(h => {
      if (!h.textContent.trim()) {
        logIssue('Empty Title', 'Heading tag has no content', h);
      }
    });
  }

  function checkForms() {
    document.querySelectorAll('form').forEach(form => {
      const inputs = form.querySelectorAll('input,textarea,select');
      inputs.forEach(input => {
        const id = input.getAttribute('id');
        const name = input.getAttribute('name');
        const label = form.querySelector(`label[for="${id}"]`);
        if (!id || !name) {
          logIssue('Form Field Missing ID/Name', 'Input lacks id or name', input);
        }
        if (!label) {
          logIssue('Missing Label', 'No label associated with input', input);
        }
        if (!input.hasAttribute('autocomplete')) {
          logIssue('Missing Autocomplete', 'Input lacks autocomplete', input);
        }
      });
    });
  }

  function checkDeprecatedTags() {
    document.querySelectorAll('font,center,marquee,blink').forEach(el => {
      logIssue('Deprecated Tag', `Use of <${el.tagName.toLowerCase()}>`, el);
    });
  }

  function checkMicrodata() {
    const items = document.querySelectorAll('[itemscope]');
    if (!items.length) {
      logIssue('Missing Microdata', 'No itemscope elements found', document.body);
    }
  }

  function checkFeedLatency() {
    const start = performance.now();
    window.addEventListener('load', () => {
      const duration = performance.now() - start;
      if (duration > 2000) {
        logIssue('Feed Latency', `Page took ${Math.round(duration)}ms to load`, document.body);
      }
    });
  }

  function renderOverlay() {
    const overlay = document.createElement('div');
    overlay.id = 'semantic-audit-overlay';
    overlay.style = `
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      max-height: 40vh;
      overflow-y: auto;
      background: #fff;
      border-top: 2px solid #444;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 9999;
      padding: 10px;
    `;
    overlay.innerHTML = `<strong>Semantic Audit Report</strong><ul>${issues.map(i => `<li><strong>${i.type}:</strong> ${i.detail}</li>`).join('')}</ul>`;
    document.body.appendChild(overlay);
  }

  function runAudit() {
    checkThumbnails();
    checkTitles();
    checkForms();
    checkDeprecatedTags();
    checkMicrodata();
    checkFeedLatency();
    setTimeout(renderOverlay, 3000); // Delay to allow feed content to load
  }

  document.addEventListener('DOMContentLoaded', runAudit);
})();

