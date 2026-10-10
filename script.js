/* =========================
   MOBILE NAVIGATION
========================= */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
  menuButton.addEventListener("click", function () {
    navigation.classList.toggle("is-open");
  });

  /* Close menu when a link is clicked */
  document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
      navigation.classList.remove("is-open");
    });
  });
}

/* =========================
   DESTINATION CAROUSEL (Home)
========================= */

const track = document.querySelector(".destination-track");
const cards = document.querySelectorAll(".dest-card");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");

if (track && previousButton && nextButton && cards.length) {
  function updateButtons() {
    previousButton.disabled = track.scrollLeft <= 0;
    nextButton.disabled =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  nextButton.addEventListener("click", function () {
    track.scrollLeft += cards[0].offsetWidth + 20;
    updateButtons();
  });

  previousButton.addEventListener("click", function () {
    track.scrollLeft -= cards[0].offsetWidth + 20;
    updateButtons();
  });

  track.addEventListener("scroll", updateButtons);
  updateButtons();
}

/* =========================
   VIBE CARDS (Preferences)
   Click to switch between Must-have ✓ and Dealbreaker ✕
========================= */

document.querySelectorAll(".vibe-card").forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("selected");
    const icon = card.querySelector(".vibe-toggle");
    if (icon) {
      icon.textContent = card.classList.contains("selected") ? "✓" : "✕";
    }
  });
});

/* =========================
   NAVBAR SCROLL EFFECT
========================= */

const navbar = document.querySelector(".navbar");

if (navbar) {
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("is-scrolled", window.scrollY > 10);
  });
}

/* =========================================================
   PREFERENCE-DRIVEN PAGES
   Needs data.js (DESTINATIONS, VIBES, getPrefs, savePrefs,
   rankDestinations) loaded before this file.
========================================================= */

const hasData = typeof DESTINATIONS !== "undefined";

/* ---------- PREFERENCES: load + save choices ---------- */

const vibeCards = document.querySelectorAll(".vibe-card[data-vibe]");

if (hasData && vibeCards.length) {
  const saved = getPrefs();

  vibeCards.forEach(function (card) {
    const on = saved.includes(card.dataset.vibe);
    card.classList.toggle("selected", on);
    card.querySelector(".vibe-toggle").textContent = on ? "✓" : "✕";
  });

  const applyButton = document.querySelector("#apply-prefs");

  applyButton.addEventListener("click", function () {
    const chosen = Array.from(
      document.querySelectorAll(".vibe-card.selected"),
    ).map((card) => card.dataset.vibe);
    savePrefs(chosen);
  });
}

/* ---------- EXPLORE: ranked country cards ---------- */

const countryGrid = document.querySelector("#country-grid");

if (hasData && countryGrid) {
  const prefs = getPrefs();
  const ranked = rankDestinations(prefs);

  // Profile pills
  const pills = document.querySelector("#pref-pills");
  pills.innerHTML = Object.entries(VIBES)
    .map(([key, label]) =>
      prefs.includes(key)
        ? `<span class="pill">${label}</span>`
        : `<span class="pill muted-pill">${label} (Eclipsed)</span>`,
    )
    .join("");

  const top = ranked.slice(0, 6);
  const wildcard = ranked[6];

  document.querySelector("#match-count").textContent =
    `Showing your ${top.length} strongest matches out of ${DESTINATIONS.length} destinations.`;

  function cardHTML(d) {
    const matched = d.tags
      .filter((t) => prefs.includes(t))
      .map((t) => VIBES[t]);
    const clashes = d.tags
      .filter((t) => !prefs.includes(t))
      .map((t) => VIBES[t]);
    const lines = [
      ...matched.map((v) => `<li>${v}</li>`),
      ...clashes.map((v) => `<li class="clash">Includes ${v}</li>`),
    ].join("");

    return `
            <article class="country-card">
                <div class="card-img" style="background-image: url('${d.image}');">
                    <span class="badge left">${d.match}% Match</span>
                    <span class="badge right">${d.badge}</span>
                </div>
                <div class="country-body">
                    <span class="location" style="font-size: .6rem; font-weight: 600;">${d.region.toUpperCase()}</span>
                    <h3>${d.name} — <em>${d.tagline}</em></h3>
                    <ul class="check-list">${lines}</ul>
                    <div class="country-foot">
                        <div>
                            <span class="price-label">Flights + Stay</span>
                            <span class="price">From ${d.price}</span>
                        </div>
                        <a href="destination.html?country=${d.id}" class="btn btn-coral btn-sm">Explore Destination →</a>
                    </div>
                </div>
            </article>`;
  }

  function renderGrid(list) {
    countryGrid.innerHTML = list.map(cardHTML).join("");
  }

  renderGrid(top);

  // Sorting
  const toNumber = (p) => parseFloat(p.replace(/[^0-9.]/g, ""));
  document
    .querySelector("#sort-select")
    .addEventListener("change", function (e) {
      const list = [...top];
      if (e.target.value.includes("Price"))
        list.sort((a, b) => toNumber(a.price) - toNumber(b.price));
      renderGrid(list);
    });

  // Wildcard
  const wildBox = document.querySelector("#wildcard");
  if (wildcard) {
    wildBox.innerHTML = `
            <div class="wildcard-img" style="background-image: url('${wildcard.image}');"></div>
            <div class="wildcard-body">
                <span class="eyebrow"><span class="eyebrow-dot"></span>Off the Radar</span>
                <h2>The Wildcard Match <span class="pill" style="vertical-align: middle;">${wildcard.match}% Match</span></h2>
                <h3>${wildcard.name} — ${wildcard.tagline}</h3>
                <p class="muted" style="color: #a5adbd;">${wildcard.description}</p>
                <a href="destination.html?country=${wildcard.id}" class="btn btn-coral">View the Logic →</a>
            </div>`;
  } else {
    wildBox.style.display = "none";
  }
}

/* ---------- DESTINATION: one country in full ---------- */

const destinationView = document.querySelector("#destination-view");

if (hasData && destinationView) {
  const prefs = getPrefs();
  const ranked = rankDestinations(prefs);

  // ?country=japan picks a specific one, otherwise show the top match
  const requested = new URLSearchParams(location.search).get("country");
  const d = ranked.find((x) => x.id === requested) || ranked[0];

  document.title = `${d.name.charAt(0) + d.name.slice(1).toLowerCase()} | Wanderlust`;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthRow = months
    .map(
      (m, i) =>
        `<span class="${d.peakMonths.includes(i) ? "peak" : ""}">${m}</span>`,
    )
    .join("");

  const seasonCols = d.seasons.map((s) => `${s.months}fr`).join(" ");
  const seasonBars = d.seasons
    .map((s) => `<div class="${s.cls}">${s.label}</div>`)
    .join("");

  const facts = Object.entries(d.facts)
    .map(
      ([k, v]) =>
        `<div class="fact-row"><span>${k}</span><span>${v}</span></div>`,
    )
    .join("");

  const donts = d.donts
    .map(
      ([t, s]) => `<li><div><strong>${t}</strong><span>${s}</span></div></li>`,
    )
    .join("");

  // Each experience lists Wikipedia article titles; the lead photo of the first
  // one that has an image is used. The destination photo shows until it loads.
  const experiences = d.experiences
    .map(
      ([t, s, p, wiki]) => `
        <div class="exp-item">
            <div class="exp-thumb" data-wiki='${JSON.stringify(wiki || []).replace(/'/g, "&#39;")}' style="background-image: url('${d.image}');"></div>
            <div><h4>${t}</h4><p>${s}</p></div>
            <span class="price">${p}</span>
        </div>`,
    )
    .join("");

  const transport = d.transport
    .map(
      ([t, s]) =>
        `<li style="display: block;"><strong>${t}</strong><span>${s}</span></li>`,
    )
    .join("");

  const matchedVibes = d.tags
    .filter((t) => prefs.includes(t))
    .map((t) => VIBES[t]);
  const whyLine = matchedVibes.length
    ? `Matches your love of ${matchedVibes.join(", ").toLowerCase()}.`
    : `A curveball pick — outside your usual vibes.`;

  const otherPicks = ranked
    .filter((x) => x.id !== d.id)
    .slice(0, 3)
    .map(
      (x) =>
        `<a href="destination.html?country=${x.id}" class="pill">${x.name.charAt(0) + x.name.slice(1).toLowerCase()} · ${x.match}%</a>`,
    )
    .join("");

  destinationView.innerHTML = `
        <div class="dest-hero" style="background-image: linear-gradient(transparent 35%, rgba(8, 17, 34, .85)), url('${d.image}');">
            <span class="badge left">★ ${d.rating} Concierge</span>
            <span class="badge right">${d.match}% Profile Match</span>
            <span class="eyebrow"><span class="eyebrow-dot"></span>${d.eyebrow}</span>
            <h1>${d.name}</h1>
            <p style="max-width: 520px; font-size: .85rem;">${d.description}</p>
            <p style="margin: 0; font-size: .75rem; color: #f3c9a8;">${whyLine}</p>
        </div>

        <aside class="card-white panel">
            <span class="eyebrow"><span class="eyebrow-dot"></span>At a Glance</span>
            <h3>Destination Facts</h3>
            ${facts}
            <p class="muted" style="margin: 16px 0 8px; font-size: .65rem; text-transform: uppercase;">Other strong matches</p>
            <div style="display: flex; flex-wrap: wrap; gap: 8px;">${otherPicks}</div>
        </aside>

        <div class="card-white panel">
            <div class="split-header" style="margin-bottom: 0; align-items: flex-start;">
                <div>
                    <span class="eyebrow"><span class="eyebrow-dot"></span>Climate Guide</span>
                    <h3>Optimal Seasons to Visit</h3>
                </div>
                <span class="rating" style="font-size: .62rem; font-weight: 600;">Best: ${d.bestSeason}</span>
            </div>
            <div class="season-months">${monthRow}</div>
            <div class="season-bars" style="grid-template-columns: ${seasonCols};">${seasonBars}</div>
            <p class="muted" style="margin: 14px 0 0; font-size: .7rem;">● Peak months highlighted · ${d.seasonNote}</p>
        </div>

        <aside class="card-white panel">
            <span class="eyebrow"><span class="eyebrow-dot"></span>Cultural Etiquette</span>
            <h3>What NOT to do in ${d.name.charAt(0) + d.name.slice(1).toLowerCase()}</h3>
            <ul class="dont-list">${donts}</ul>
        </aside>

        <div class="card-white panel">
            <span class="eyebrow"><span class="eyebrow-dot"></span>Handpicked</span>
            <h3>Curated Top Experiences</h3>
            ${experiences}
        </div>

        <div>
            <aside class="card-white panel">
                <span class="eyebrow"><span class="eyebrow-dot"></span>Transport Guide</span>
                <h3>Getting Around</h3>
                <ul class="dont-list">${transport}</ul>
            </aside>

            <div class="ready-card">
                <div>
                    <h3>Ready to design your customized route?</h3>
                    Select dates and we'll match the best airline options.
                </div>
                <a href="booking.html?country=${d.id}" class="round-btn" aria-label="Go to booking">→</a>
            </div>
        </div>`;

  // Point the navbar "Book now" button at this country too
  const navBook = document.querySelector(".nav-button");
  if (navBook) navBook.href = `booking.html?country=${d.id}`;

  // Sharpen the hero photo. Some saved images are only 736px wide, which looks
  // soft when stretched across the hero, so try larger copies of the same photo
  // (Pinterest keeps several sizes) and keep the original if none load.
  const heroBox = document.querySelector(".dest-hero");

  if (heroBox && d.image.includes("i.pinimg.com/")) {
    const candidates = ["1200x", "originals"]
      .map((size) =>
        d.image.replace(/i\.pinimg\.com\/[^/]+\//, `i.pinimg.com/${size}/`),
      )
      .filter((url) => url !== d.image);

    (function tryNext(index) {
      if (index >= candidates.length) return;
      const probe = new Image();
      probe.onload = function () {
        heroBox.style.backgroundImage = `linear-gradient(transparent 35%, rgba(8, 17, 34, .85)), url('${candidates[index]}')`;
      };
      probe.onerror = function () {
        tryNext(index + 1);
      };
      probe.src = candidates[index];
    })(0);
  }

  // Swap each experience thumbnail for a photo that matches its caption.
  // One request asks Wikipedia for the lead photo of every article we need.
  async function loadExperiencePhotos() {
    const thumbs = Array.from(
      document.querySelectorAll(".exp-thumb[data-wiki]"),
    );
    const titleLists = thumbs.map((thumb) => JSON.parse(thumb.dataset.wiki));
    const allTitles = Array.from(new Set(titleLists.flat()));
    if (!allTitles.length) return;

    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*" +
      "&redirects=1&prop=pageimages&piprop=thumbnail&pithumbsize=400" +
      "&titles=" +
      encodeURIComponent(allTitles.join("|"));

    let data;
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (error) {
      console.warn("Experience photos could not be loaded:", error);
      return;
    }

    const query = data.query || {};

    // Titles can be tidied up or redirected by Wikipedia; follow them to the final page
    const alias = {};
    (query.normalized || []).forEach((item) => {
      alias[item.from] = item.to;
    });
    (query.redirects || []).forEach((item) => {
      alias[item.from] = item.to;
    });
    const resolve = function (title) {
      let current = title;
      for (let i = 0; i < 3 && alias[current]; i++) current = alias[current];
      return current;
    };

    const photoByTitle = {};
    Object.values(query.pages || {}).forEach(function (page) {
      if (page.thumbnail) photoByTitle[page.title] = page.thumbnail.source;
    });

    thumbs.forEach(function (thumb, index) {
      for (const title of titleLists[index]) {
        const photo = photoByTitle[resolve(title)];
        if (photo) {
          thumb.style.backgroundImage = `url('${photo}')`;
          return;
        }
      }
      console.warn("No photo found for:", titleLists[index].join(" / "));
    });
  }

  loadExperiencePhotos();
}

/* ---------- BOOKING: fill destination airport ---------- */

const toField = document.querySelector("#to");

if (hasData && toField) {
  const id = new URLSearchParams(location.search).get("country");
  const d =
    DESTINATIONS.find((x) => x.id === id) || rankDestinations(getPrefs())[0];
  toField.textContent = d.airport;
}
