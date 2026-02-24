(() => {
  const data = window.PORTFOLIO;
  if (!data) {
    console.error("PORTFOLIO data not found. Make sure data.js loads before app.js");
    return;
  }

  // Helpers
  const $ = (sel) => document.querySelector(sel);

  function safeText(s) {
    return (s ?? "").toString();
  }

  function fmtDate(iso) {
    if (!iso) return "";
    try {
      const d = new Date(iso);
      return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
    } catch {
      return iso;
    }
  }

  function embedHTML(item) {
    const id = item.embedId;
    if (!id) return "";
    if (item.type === "vimeo") {
      return `<iframe src="https://player.vimeo.com/video/${id}?title=0&byline=0&portrait=0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }
    // default youtube
    return `<iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${safeText(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }

  // Populate header links
  $("#link-reel").href = data.person.links.reel || "#";
  $("#link-youtube").href = data.person.links.youtube || "#";
  $("#link-vimeo").href = data.person.links.vimeo || "#";
  $("#link-linkedin").href = data.person.links.linkedin || "#";

  // About + focus/tools
  $("#about-text").textContent = data.person.about;
  const focusList = $("#focus-list");
  data.person.focus.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    focusList.appendChild(li);
  });

  const toolsList = $("#tools-list");
  data.person.tools.forEach((x) => {
    const li = document.createElement("li");
    li.textContent = x;
    toolsList.appendChild(li);
  });

  // Contact
  const emailLink = $("#email-link");
  emailLink.textContent = data.person.email;
  emailLink.href = `mailto:${data.person.email}`;

  // Featured video
  const featured = data.videos.find(v => v.id === data.featuredVideoId) || data.videos[0];
  if (featured) {
    $("#featured-title").textContent = featured.title;
    $("#featured-desc").textContent = `${featured.year} • ${featured.role} — ${featured.description}`;
    $("#featured-embed").innerHTML = embedHTML(featured);
  }

  // Video grid
  const grid = $("#video-grid");
  data.videos.forEach((v) => {
    const card = document.createElement("a");
    card.className = "card";
    card.href = "#";
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `Open video: ${v.title}`);

    card.innerHTML = `
      <div class="embed-wrap">${embedHTML(v)}</div>
      <h3>${safeText(v.title)}</h3>
      <p>${safeText(v.year)} • ${safeText(v.role)}</p>
      <div class="pills">${(v.tags || []).map(t => `<span class="pill">${safeText(t)}</span>`).join("")}</div>
    `;

    // Clicking a card sets featured video (nice simple interaction)
    card.addEventListener("click", (e) => {
      e.preventDefault();
      $("#featured-title").textContent = v.title;
      $("#featured-desc").textContent = `${v.year} • ${v.role} — ${v.description}`;
      $("#featured-embed").innerHTML = embedHTML(v);
      window.location.hash = "#top";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    grid.appendChild(card);
  });

  // Journalism: build tag dropdown + render list
  const allTags = new Set();
  data.articles.forEach(a => (a.tags || []).forEach(t => allTags.add(t)));
  const tagFilter = $("#tagFilter");
  [...allTags].sort((a,b) => a.localeCompare(b)).forEach((t) => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    tagFilter.appendChild(opt);
  });

  const articlesEl = $("#articles");
  const searchEl = $("#search");

  function matches(article, q, tag) {
    const text = `${article.title} ${article.outlet} ${(article.tags || []).join(" ")}`.toLowerCase();
    const okQ = !q || text.includes(q);
    const okTag = tag === "all" || (article.tags || []).includes(tag);
    return okQ && okTag;
  }

  function renderArticles() {
    const q = (searchEl.value || "").trim().toLowerCase();
    const tag = tagFilter.value;

    const filtered = data.articles
      .slice()
      .sort((a,b) => (b.date || "").localeCompare(a.date || "")) // newest first
      .filter(a => matches(a, q, tag));

    articlesEl.innerHTML = "";
    if (filtered.length === 0) {
      const empty = document.createElement("div");
      empty.className = "card";
      empty.textContent = "No matches. Try a different search or tag.";
      articlesEl.appendChild(empty);
      return;
    }

    filtered.forEach((a) => {
      const row = document.createElement("a");
      row.className = "article";
      row.href = a.url;
      row.target = "_blank";
      row.rel = "noreferrer noopener";

      const tags = (a.tags || []).slice(0, 3).map(t => `<span class="pill">${safeText(t)}</span>`).join("");

      row.innerHTML = `
        <div>
          <h3>${safeText(a.title)}</h3>
          <p class="meta">${fmtDate(a.date)} • ${safeText(a.outlet)}</p>
          <div class="pills">${tags}</div>
        </div>
        <div class="right">
          <span class="outlet">Read →</span>
        </div>
      `;
      articlesEl.appendChild(row);
    });
  }

  searchEl.addEventListener("input", renderArticles);
  tagFilter.addEventListener("change", renderArticles);
  renderArticles();

  // Footer year
  $("#year").textContent = new Date().getFullYear();
})();