window.PORTFOLIO = {
  person: {
    name: "Giulio Gnash",
    email: "your@email.com",
    about:
      "Brooklyn-based video journalist and storyteller focused on documentary and character-driven reporting. I shoot, edit, and produce short-form and long-form work.",
    focus: [
      "Documentary shorts",
      "Field producing",
      "Visual journalism",
      "Interviews & vérité",
      "Editing & post"
    ],
    tools: ["Premiere Pro", "DaVinci Resolve", "After Effects", "Sony FX30", "Audio: lav + handheld", "Basic color + mix"],
    links: {
      reel: "https://example.com/reel",
      youtube: "https://youtube.com/@yourhandle",
      vimeo: "https://vimeo.com/yourhandle",
      linkedin: "https://linkedin.com/in/yourhandle"
    }
  },

  featuredVideoId: "st-james-joy",

  videos: [
    {
      id: "st-james-joy",
      title: "Saint James Joy (Doc Teaser)",
      year: 2025,
      role: "Director / Shooter / Editor",
      description: "A block party that became a ritual — and a neighborhood glue.",
      // type: "youtube" or "vimeo"
      type: "youtube",
      // for YouTube: just the video ID; for Vimeo: the numeric ID
      embedId: "dQw4w9WgXcQ",
      tags: ["documentary", "community", "nyc"]
    },
    {
      id: "field-piece",
      title: "Field Piece — Sample",
      year: 2026,
      role: "Producer / Editor",
      description: "Short reporting package built for digital.",
      type: "vimeo",
      embedId: "76979871",
      tags: ["news", "package"]
    }
  ],

  articles: [
    {
      title: "Headline of Published Story",
      outlet: "Dismal Science (CUNY Newmark)",
      date: "2026-02-20",
      url: "https://example.com/story",
      tags: ["economy", "inflation", "fed"]
    },
    {
      title: "Another Story Link",
      outlet: "Outlet Name",
      date: "2025-12-10",
      url: "https://example.com/story2",
      tags: ["city council", "nyc"]
    }
  ]
};