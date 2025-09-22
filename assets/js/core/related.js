(function () {
  const container = document.getElementById("related-posts-container");
  if (!container) return;

  const relatedPosts = [
    {
      title: "Understanding Semantic SEO",
      url: "https://aginghealth.website/semantic-seo",
      thumb: "https://cdn.aginghealth.website/thumbs/semantic-seo.jpg"
    },
    {
      title: "Modularizing Blogger Widgets",
      url: "https://aginghealth.website/modular-widgets",
      thumb: "https://cdn.aginghealth.website/thumbs/modular-widgets.jpg"
    }
    // Add more posts here or inject dynamically
  ];

  relatedPosts.forEach(post => {
    const wrapper = document.createElement("div");
    wrapper.className = "related-post";
    wrapper.style.cssText = "float:left;padding:5px;padding-right:13px;";

    const link = document.createElement("a");
    link.href = post.url;
    link.style.textDecoration = "none";

    const img = document.createElement("img");
    img.src = post.thumb;
    img.alt = post.title;
    img.style.cssText = "width:166px;height:115px;";

    const title = document.createElement("div");
    title.textContent = post.title.length > 35 ? post.title.substring(0, 35) + "..." : post.title;
    title.style.cssText = "width:166px;padding-left:3px;height:65px;font-size:14px;line-height:25px;";

    link.appendChild(img);
    link.appendChild(title);
    wrapper.appendChild(link);
    container.appendChild(wrapper);
  });
})();

