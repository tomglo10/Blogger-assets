(function() {
  const posts = document.querySelectorAll('.post'); // Adjust selector to match your template
  const results = [];

  function auditPost(post) {
    const title = post.querySelector('h1,h2,h3');
    const img = post.querySelector('img');
    const date = post.querySelector('time, .post-date');
    const microdata = post.querySelector('[itemscope]');
    const summary = post.querySelector('.post-summary, .entry-summary, p');

    let score = 100;
    const issues = [];

    // 🖼️ Thumbnail Health
    if (!img || img.src.includes('no_thumb.png')) {
      score -= 20;
      issues.push('Missing or fallback thumbnail');
    }
    if (!img || !img.alt || img.alt.trim() === '') {
      score -= 10;
      issues.push('Missing alt text');
    }

    // 🔄 Feed Freshness
    if (date) {
      const postDate = new Date(date.getAttribute('datetime') || date.textContent);
      const now = new Date();
      const ageDays = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));
      if (ageDays > 180) {
        score -= 15;
        issues.push(`Stale post (${ageDays} days old)`);
      }
    } else {
      score -= 10;
      issues.push('Missing post date');
    }

    // 🧠 Semantic Score
    if (!title || title.textContent.trim() === '') {
      score -= 10;
      issues.push('Missing or empty title');
    }
    if (!summary || summary.textContent.trim().length < 50) {
      score -= 10;
      issues.push('Weak or missing summary');
    }
    if (!microdata) {
      score -= 10;
      issues.push('Missing schema.org microdata');
    }

    results.push({ post, score, issues });
  }

  function renderDashboard() {
    const panel = document.createElement('div');
    panel.id = 'semantic-audit-panel';
    panel.style = `
      position: fixed;
      top: 0;
      right: 0;
      max-height: 100vh;
      overflow-y: auto;
      background: #fff;
      border-left: 2px solid #444;
      font-family: sans-serif;
      font-size: 14px;
      z-index: 9999;
      padding: 10px;
      width: 300px;
    `;
    panel.innerHTML = `<strong>Post Audit Dashboard</strong><ul>` +
      results.map((r, i) => `
        <li>
          <strong>Post ${i + 1}</strong> — Score: ${r.score}/100
          <ul>${r.issues.map(issue => `<li>${issue}</li>`).join('')}</ul>
        </li>
      `).join('') +
      `</ul>`;
    document.body.appendChild(panel);
  }

  function init() {
    posts.forEach(auditPost);
    renderDashboard();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

