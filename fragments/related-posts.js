🧩 CDN Fragment: related-posts.js
Here’s the full vanilla JS module you can host via jsDelivr:
(function() {
  const containerId = 'related-posts';
  const maxPosts = 5;
  const fallbackThumb = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzEwCXFp0mZdMngrTXvXKegcFSJU0RYGh0RzM3Ty0q-QZGAhH3cXe5dtbwV0-izVpqpIBMiAB92Ctof_4Ifj3G6LtOu7E3n_4Scr-WPgJyk28P4mxs7_nxjx-7J75Maci780NwKSq7CLA/s1600/no_thumb.png';

  function getLabelFromURL() {
    const match = location.href.match(/\/label\/([^/?]+)/);
    return match ? decodeURIComponent(match[1]) : null;
  }

  function renderPost(entry) {
    const title = entry.title.$t;
    const link = entry.link.find(l => l.rel === 'alternate').href;
    const thumb = entry.media$thumbnail ? entry.media$thumbnail.url : fallbackThumb;
    const raw = entry.content?.$t || entry.summary?.$t || '';
    const text = raw.replace(/<[^>]*>/g, '').substring(0, 100);
    const summary = text.substring(0, text.lastIndexOf(' ')) + '…';

    const li = document.createElement('li');
    li.innerHTML = `
      <article>
        <img src="${thumb}" alt="${title}" loading="lazy" width="100" height="75">
        <div><a href="${link}" rel="nofollow">${title}</a></div>
        <p class="related-summary">${summary}</p>
      </article>
    `;
    document.getElementById(containerId).appendChild(li);
  }

  window.renderRelatedPosts = function(json) {
    const entries = json.feed.entry || [];
    if (!entries.length) return;

    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear any placeholder
    entries.forEach(renderPost);
  };

  function init() {
    const label = getLabelFromURL();
    if (!label) return;

    const script = document.createElement('script');
    script.src = `/feeds/posts/default/-/${encodeURIComponent(label)}?alt=json-in-script&max-results=${maxPosts}&callback=renderRelatedPosts`;
    document.body.appendChild(script);
  }

  document.addEventListener('DOMContentLoaded', init);
})();



✅ How to Use It
- Host it on GitHub
Example path:
assets/js/widgets/related-posts.js
- Load it in your Blogger template
<ul id="related-posts"></ul>
<script src="https://cdn.jsdelivr.net/gh/tomglo10/Blogger-assets@main/assets/js/widgets/related-posts.js" defer></script>
- Style it with CSS (optional)
#related-posts {
  list-style: none;
  padding: 0;
}
#related-posts li {
  margin-bottom: 15px;
  overflow: hidden;
}
.related-summary {
  font-size: 0.9em;
  color: #555;
}



