(function () {
  const container = document.getElementById("random-posts");
  const maxPosts = 5;
  const chars = 60;
  const commentsLabel = "Comments";
  const commentsDisabled = "Comments Disabled";
  const fallbackThumb = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhzEwCXFp0mZdMngrTXvXKegcFSJU0RYGh0RzM3Ty0q-QZGAhH3cXe5dtbwV0-izVpqpIBMiAB92Ctof_4Ifj3G6LtOu7E3n_4Scr-WPgJyk28P4mxs7_nxjx-7J75Maci780NwKSq7CLA/s1600/no_thumb.png";

  function fetchTotalPosts() {
    const url = "/feeds/posts/default?alt=json-in-script&max-results=0&callback=?";
    return new Promise((resolve) => {
      window.randomposts = function (data) {
        resolve(data.feed.openSearch$totalResults.$t);
      };
      const script = document.createElement("script");
      script.src = url.replace("callback=?", "callback=randomposts");
      document.body.appendChild(script);
    });
  }

  function fetchPost(index) {
    const url = `/feeds/posts/default?alt=json-in-script&start-index=${index}&max-results=1&callback=?`;
    return new Promise((resolve) => {
      window.random_posts = function (data) {
        resolve(data.feed.entry[0]);
      };
      const script = document.createElement("script");
      script.src = url.replace("callback=?", "callback=random_posts");
      document.body.appendChild(script);
    });
  }

  function sanitize(text) {
    return text.replace(/<[^>]*>/g, "").substring(0, chars).split(" ").slice(0, -1).join(" ") + "…";
  }

  function renderPost(entry, isFirst) {
    const title = entry.title.$t;
    const link = entry.link.find(l => l.rel === "alternate").href;
    const date = entry.published.$t;
    const commentCount = entry.thr$total ? entry.thr$total.$t + " " + commentsLabel : commentsDisabled;
    const thumb = entry.media$thumbnail ? entry.media$thumbnail.url : fallbackThumb;
    const summary = entry.content?.$t || entry.summary?.$t || "";

    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${thumb}" alt="${title}" ${isFirst ? "" : 'loading="lazy"'} width="100" height="75" style="float:left; margin-right:10px; padding:3px; background:#F5F5F5;">
      <div><a href="${link}" rel="nofollow">${title}</a></div>
      <span>${date.substring(8,10)}.${date.substring(5,7)}.${date.substring(0,4)} - ${commentCount}</span>
      <span class="random-summary">${sanitize(summary)}</span>
      <div style="clear:both"></div>
    `;
    container.appendChild(li);
  }

  async function init() {
    const total = await fetchTotalPosts();
    const usedIndexes = new Set();
    while (usedIndexes.size < maxPosts) {
      usedIndexes.add(1 + Math.floor(Math.random() * total));
    }

    let count = 0;
    for (const index of usedIndexes) {
      const entry = await fetchPost(index);
      renderPost(entry, count === 0);
      count++;
    }
  }

  init();
})();

