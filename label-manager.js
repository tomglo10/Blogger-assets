<script>
(function() {
  const labelUsage = {};
  const labelMap = {};
  const audit = {
    grouped: {},
    orphaned: [],
    misformatted: [],
    mergeCandidates: []
  };
  const normalizedLabels = {};

  // Scan labels
  document.querySelectorAll('.post-labels a').forEach(link => {
    const raw = decodeURIComponent(link.href.split('/search/label/')[1]);
    labelUsage[raw] = (labelUsage[raw] || 0) + 1;

    const [main, sub] = raw.split('|');
    if (!labelMap[main]) labelMap[main] = [];
    if (sub) labelMap[main].push(sub);
  });

  // Audit labels
  Object.entries(labelUsage).forEach(([label, count]) => {
    const normalized = label.trim().replace(/\s+/g, ' ').toLowerCase();

    if (normalizedLabels[normalized]) {
      audit.mergeCandidates.push([label, normalizedLabels[normalized]]);
    } else {
      normalizedLabels[normalized] = label;
    }

    if (count === 0) audit.orphaned.push(label);
    if (!label.includes('|') && label.split(' ').length > 3) {
      audit.misformatted.push(label);
    }

    const [main, sub] = label.split('|');
    if (!audit.grouped[main]) audit.grouped[main] = [];
    if (sub) audit.grouped[main].push({ sub, count });
  });

  // Render function
  const container = document.getElementById('labelManagerWidget');
  const modeSelector = document.getElementById('labelMode');

  function render(mode) {
    container.innerHTML = '';

    if (mode === 'menu') {
      container.innerHTML = `<h3>📁 Label Menu</h3>`;
      Object.entries(labelMap).forEach(([main, subs]) => {
        const section = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = main;
        section.appendChild(summary);

        subs.forEach(sub => {
          const link = document.createElement('a');
          link.href = `/search/label/${encodeURIComponent(main + '|' + sub)}`;
          link.textContent = sub;
          link.style.display = 'block';
          section.appendChild(link);
        });

        container.appendChild(section);
      });
    }

    if (mode === 'audit') {
      container.innerHTML = `<h3>🧪 Label Audit</h3>`;
      Object.entries(audit.grouped).forEach(([main, subs]) => {
        const section = document.createElement('details');
        const summary = document.createElement('summary');
        summary.textContent = `${main} (${subs.length})`;
        section.appendChild(summary);

        subs.forEach(({ sub, count }) => {
          const item = document.createElement('div');
          item.textContent = `↳ ${sub} (${count})`;
          section.appendChild(item);
        });

        container.appendChild(section);
      });
    }

    if (mode === 'cleanup') {
      container.innerHTML = `<h3>🧹 Cleanup Suggestions</h3>`;

      if (audit.mergeCandidates.length) {
        const mergeList = audit.mergeCandidates.map(
          ([a, b]) => `<li>Merge <strong>${a}</strong> into <strong>${b}</strong></li>`
        ).join('');
        container.innerHTML += `<h4>🔁 Merge Candidates</h4><ul>${mergeList}</ul>`;
      }

      if (audit.orphaned.length) {
        const orphanList = audit.orphaned.map(
          l => `<li>Remove unused label: <strong>${l}</strong></li>`
        ).join('');
        container.innerHTML += `<h4>🚫 Orphaned Labels</h4><ul>${orphanList}</ul>`;
      }

      if (audit.misformatted.length) {
        const misformatList = audit.misformatted.map(
          l => `<li>Fix formatting: <strong>${l}</strong></li>`
        ).join('');
        container.innerHTML += `<h4>⚠️ Misformatted Labels</h4><ul>${misformatList}</ul>`;
      }
    }
  }

  // Initial render
  render(modeSelector.value);

  // Toggle listener
  modeSelector.addEventListener('change', () => {
    render(modeSelector.value);
  });
})();
</script>

