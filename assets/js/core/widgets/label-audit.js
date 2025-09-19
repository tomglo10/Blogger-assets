(function () {
  const labelUsage = {};
  const labelMap = {};
  const audit = {
    grouped: {},
    orphaned: [],
    misformatted: [],
    mergeCandidates: []
  };
  const normalizedLabels = {};

  const container = document.getElementById('labelManagerWidget');
  const modeSelector = document.getElementById('labelMode');
  if (!container || !modeSelector) return;

  // Scan labels
  document.querySelectorAll('.post-labels a').forEach(link => {
    const raw = decodeURIComponent(link.href.split('/search/label/')[1] || '');
    if (!raw) return;

    labelUsage[raw] = (labelUsage[raw] || 0) + 1;

    const [main, ...rest] = raw.split('|');
    const sub = rest.join('|');
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

    const [main, ...rest] = label.split('|');
    const sub = rest.join('|');
    if (!audit.grouped[main]) audit.grouped[main] = [];
    if (sub) audit.grouped[main].push({ sub, count });
  });

  // Mode descriptions
  const descriptions = {
    menu: '📁 Browse labels grouped by category.',
    audit: '🧪 View label usage grouped by parent.',
    cleanup: '🧹 Suggestions for merging, removing, or fixing labels.'
  };

  // Render function
  function render(mode) {
    container.innerHTML = '';
    const fragment = document.createDocumentFragment();

    const heading = document.createElement('h3');
    heading.textContent = descriptions[mode] || 'Label Manager';
    fragment.appendChild(heading);

    if (mode === 'menu') {
      Object.entries(labelMap).forEach(([main, subs]) => {
        const section = document.createElement('details');
        section.setAttribute('role', 'group');

        const summary = document.createElement('summary');
        summary.textContent = main;
        summary.setAttribute('aria-label', `Label group: ${main}`);
        section.appendChild(summary);

        subs.forEach(sub => {
          const link = document.createElement('a');
          link.href = `/search/label/${encodeURIComponent(main + '|' + sub)}`;
          link.textContent = sub;
          link.style.display = 'block';
          section.appendChild(link);
        });

        fragment.appendChild(section);
      });
    }

    if (mode === 'audit') {
      Object.entries(audit.grouped).forEach(([main, subs]) => {
        const section = document.createElement('details');
        section.setAttribute('role', 'group');

        const summary = document.createElement('summary');
        summary.textContent = `${main} (${subs.length})`;
        summary.setAttribute('aria-label', `Audit group: ${main}`);
        section.appendChild(summary);

        subs.forEach(({ sub, count }) => {
          const item = document.createElement('div');
          item.textContent = `↳ ${sub} (${count})`;
          section.appendChild(item);
        });

        fragment.appendChild(section);
      });
    }

    if (mode === 'cleanup') {
      if (audit.mergeCandidates.length) {
        const mergeHeader = document.createElement('h4');
        mergeHeader.textContent = '🔁 Merge Candidates';
        fragment.appendChild(mergeHeader);

        const ul = document.createElement('ul');
        audit.mergeCandidates.forEach(([a, b]) => {
          const li = document.createElement('li');
          li.innerHTML = `Merge <strong>${a}</strong> into <strong>${b}</strong>`;
          ul.appendChild(li);
        });
        fragment.appendChild(ul);
      }

      if (audit.orphaned.length) {
        const orphanHeader = document.createElement('h4');
        orphanHeader.textContent = '🚫 Orphaned Labels';
        fragment.appendChild(orphanHeader);

        const ul = document.createElement('ul');
        audit.orphaned.forEach(label => {
          const li = document.createElement('li');
          li.innerHTML = `Remove unused label: <strong>${label}</strong>`;
          ul.appendChild(li);
        });
        fragment.appendChild(ul);
      }

      if (audit.misformatted.length) {
        const misformatHeader = document.createElement('h4');
        misformatHeader.textContent = '⚠️ Misformatted Labels';
        fragment.appendChild(misformatHeader);

        const ul = document.createElement('ul');
        audit.misformatted.forEach(label => {
          const li = document.createElement('li');
          li.innerHTML = `Fix formatting: <strong>${label}</strong>`;
          ul.appendChild(li);
        });
        fragment.appendChild(ul);
      }
    }

    container.appendChild(fragment);
  }

  // Initial render
  render(modeSelector.value);

  // Mode change listener
  modeSelector.addEventListener('change', () => {
    render(modeSelector.value);
  });
})();

