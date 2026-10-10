const navbar = document.querySelector(".navbar");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");
const destinationTrack = document.querySelector(".destination-track");
const carouselButtons = document.querySelectorAll(
  ".carousel-controls [data-direction]",
);

const readPreferences = () => {
  try {
    const stored = localStorage.getItem("wanderlust-preferences");
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error("Unable to read saved travel preferences.", error);
    return null;
  }
};

const savePreferences = (preferences) => {
  try {
    localStorage.setItem("wanderlust-preferences", JSON.stringify(preferences));
  } catch (error) {
    console.error("Unable to save travel preferences.", error);
  }
};

const localDestinations = [
  {
    key: "ElNido", name: "El Nido", title: "El Nido's Hidden Lagoons & Limestone Islands", country: "Philippines", province: "Palawan",
    region: "philippines", airport: "El Nido Airport (ENI)", population: "50,494 residents",
    capital: "Puerto Princesa", cost: 890, days: 5, rating: 9.8,
    latitude: 11.1956, longitude: 119.4121, symbol: "01",
    vibe: "coast,adventure,wellness", style: "Island escape",
    description: "Limestone lagoons, small-boat mornings, and quiet coves in northern Palawan.",
  },
  {
    key: "Coron", name: "Coron", title: "Coron's Kayangan Lake & Wreck Reefs", country: "Philippines", province: "Palawan",
    region: "philippines", airport: "Francisco B. Reyes Airport (USU)", population: "65,855 residents",
    capital: "Puerto Princesa", cost: 760, days: 5, rating: 9.7,
    latitude: 11.9986, longitude: 120.2043, symbol: "02",
    vibe: "coast,adventure,nature", style: "Reefs & quiet water",
    description: "Clear-water lakes, island trails, and carefully guided reef experiences.",
  },
  {
    key: "Siargao", name: "Siargao", title: "Siargao's Surf Breaks & Mangrove Islands", country: "Philippines", province: "Surigao del Norte",
    region: "philippines", airport: "Sayak Airport (IAO)", population: "Village-based island communities",
    capital: "Surigao City", cost: 680, days: 6, rating: 9.6,
    latitude: 9.8482, longitude: 126.0458, symbol: "03",
    vibe: "coast,adventure,food", style: "Island rhythm",
    description: "Mangrove waterways, surf-town mornings, and unhurried island roads.",
  },
  {
    key: "Banaue", name: "Banaue", title: "Banaue Rice Terraces & Ifugao Trails", country: "Philippines", province: "Ifugao",
    region: "philippines", airport: "Cauayan Airport (CYZ)", population: "20,652 residents",
    capital: "Lagawe", cost: 540, days: 4, rating: 9.5,
    latitude: 16.9131, longitude: 121.0598, symbol: "04",
    vibe: "culture,nature,adventure", style: "Highland heritage",
    description: "Mountain paths and living rice-terrace landscapes shaped by generations of Ifugao stewardship.",
  },
  {
    key: "Batanes", name: "Batanes", title: "Batanes' Wind-Carved Headlands & Stone Villages", country: "Philippines", province: "Batanes",
    region: "philippines", airport: "Basco Airport (BSO)", population: "18,831 residents",
    capital: "Basco", cost: 980, days: 5, rating: 9.7,
    latitude: 20.4487, longitude: 121.9702, symbol: "05",
    vibe: "nature,culture,slow", style: "Far-north stillness",
    description: "Open headlands, stone villages, and a gentle introduction to Ivatan culture.",
  },
  {
    key: "Cebu", name: "Cebu", title: "Cebu's Heritage Streets & Island Waterfalls", country: "Philippines", province: "Central Visayas",
    region: "philippines", airport: "Mactan–Cebu International (CEB)", population: "3.3 million residents",
    capital: "Cebu City", cost: 720, days: 5, rating: 9.3,
    latitude: 10.3157, longitude: 123.8854, symbol: "06",
    vibe: "culture,food,coast", style: "City & sea",
    description: "A layered city base for heritage walks, local kitchens, and coastal day trips.",
  },
  {
    key: "Bohol", name: "Bohol", title: "Bohol's Chocolate Hills & Loboc River", country: "Philippines", province: "Central Visayas",
    region: "philippines", airport: "Bohol–Panglao International (TAG)", population: "1.39 million residents",
    capital: "Tagbilaran", cost: 810, days: 5, rating: 9.4,
    latitude: 9.8500, longitude: 124.1435, symbol: "07",
    vibe: "nature,coast,slow", style: "Island nature",
    description: "Countryside lanes, protected river habitats, and low-key Panglao mornings.",
  },
  {
    key: "Camiguin", name: "Camiguin", title: "Camiguin's Volcano Trails & Hot Springs", country: "Philippines", province: "Camiguin",
    region: "philippines", airport: "Camiguin Airport (CGM)", population: "92,808 residents",
    capital: "Mambajao", cost: 620, days: 4, rating: 9.3,
    latitude: 9.1732, longitude: 124.7299, symbol: "08",
    vibe: "nature,wellness,adventure", style: "Volcanic island",
    description: "Hot springs, forested volcanic slopes, and a small-island pace.",
  },
  {
    key: "Dumaguete", name: "Dumaguete", title: "Dumaguete's Seafront & Apo Island Reefs", country: "Philippines", province: "Negros Oriental",
    region: "philippines", airport: "Sibulan Airport (DGT)", population: "134,103 residents",
    capital: "Dumaguete", cost: 590, days: 4, rating: 9.2,
    latitude: 9.3068, longitude: 123.3054, symbol: "09",
    vibe: "food,culture,coast", style: "Easygoing city",
    description: "Walkable seaside streets, a lively food culture, and thoughtful day trips.",
  },
];

const distanceInKm = (latitude, longitude, place) => {
  const radians = (degrees) => (degrees * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const latDelta = radians(place.latitude - latitude);
  const lonDelta = radians(place.longitude - longitude);
  const haversine =
    Math.sin(latDelta / 2) ** 2 +
    Math.cos(radians(latitude)) *
      Math.cos(radians(place.latitude)) *
      Math.sin(lonDelta / 2) ** 2;
  const normalizedHaversine = Math.min(1, Math.max(0, haversine));
  return (
    earthRadiusKm *
    2 *
    Math.atan2(
      Math.sqrt(normalizedHaversine),
      Math.sqrt(1 - normalizedHaversine),
    )
  );
};

const closeNavigation = () => {
  if (!menuToggle || !navigation) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("is-open");
};

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu",
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNavigation();
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavigation();
    document.querySelector(".flight-dialog[open]")?.close();
  }
});

const realmButtons = [...document.querySelectorAll("[data-realm].toggle-btn")];
const realmFeedback = document.querySelector("#realm-feedback");
const startExploring = document.querySelector("#start-exploring");
const featuredTrack = document.querySelector(".destination-track");
const featuredHeading = document.querySelector("#featured-heading");
const locationDialog = document.querySelector("#location-dialog");
const locationStatus = document.querySelector("#location-status");
const locationButton = document.querySelector("#use-location");
const skipLocationButton = document.querySelector("#skip-location");
const urlParams = new URLSearchParams(window.location.search);
const initialRealm =
  urlParams.get("realm") ||
  readPreferences()?.realm ||
  (realmButtons.length ? realmButtons[0].dataset.realm : "international");
let currentRealm = initialRealm === "international" ? "international" : "local";
let nearestLocalPlace = null;

const makeLocalFeaturedCard = (place, index) => {
  const card = document.createElement("article");
  const art = document.createElement("div");
  const body = document.createElement("div");
  const meta = document.createElement("div");
  const location = document.createElement("span");
  const rating = document.createElement("span");
  const heading = document.createElement("h3");
  const link = document.createElement("a");
  card.className = "dest-card";
  card.dataset.realm = "local";
  card.dataset.place = place.key;
  card.dataset.match = String(index + 1);
  art.className = `card-img destination-art destination-art-${(index % 5) + 1}`;
  art.setAttribute("aria-hidden", "true");
  art.textContent = place.symbol;
  meta.className = "card-meta";
  location.className = "location";
  location.textContent = `${place.name}, ${place.province}`;
  rating.className = "rating";
  rating.textContent = `${place.rating.toFixed(1)}/10`;
  body.className = "card-content";
  heading.append(link);
  link.textContent = place.name;
  link.href = `./destination.html?place=${encodeURIComponent(place.key)}`;
  link.setAttribute("aria-label", `Open the ${place.name} destination guide`);
  meta.append(location, rating);
  body.append(meta, heading);
  card.append(art, body);
  return card;
};

if (featuredTrack) {
  localDestinations.forEach((place, index) =>
    featuredTrack.append(makeLocalFeaturedCard(place, index)),
  );

  featuredTrack.querySelectorAll(".dest-card").forEach((card) => {
    const titleLink = card.querySelector("h3 a");
    if (titleLink && !titleLink.getAttribute("aria-label")) {
      titleLink.setAttribute(
        "aria-label",
        `View ${card.querySelector(".location")?.textContent || card.dataset.place || "destination"} travel guide`,
      );
    }
  });

}

const updateRealm = (realm, options = {}) => {
  currentRealm = realm === "international" ? "international" : "local";
  const isLocal = currentRealm === "local";

  realmButtons.forEach((button) => {
    const isSelected = button.dataset.realm === currentRealm;
    button.classList.toggle("active", isSelected);
    button.classList.toggle("inactive", !isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
  });

  if (featuredTrack) {
    featuredTrack.querySelectorAll(".dest-card").forEach((card) => {
      card.hidden = card.dataset.realm !== currentRealm;
    });
    if (nearestLocalPlace && isLocal) {
      const nearestCard = [
        ...featuredTrack.querySelectorAll(".dest-card[data-place]"),
      ].find((card) => card.dataset.place === nearestLocalPlace.place.key);
      if (nearestCard) featuredTrack.prepend(nearestCard);
    }
    featuredTrack.scrollLeft = 0;
  }

  if (featuredHeading) {
    featuredHeading.textContent = isLocal
      ? "Top 10 Philippine escapes"
      : "Top 10 journeys abroad";
  }
  if (startExploring) {
    startExploring.textContent = isLocal
      ? "Explore Philippine escapes"
      : "Explore international journeys";
    startExploring.href = `./explore.html?realm=${currentRealm}`;
  }
  if (realmFeedback) {
    realmFeedback.textContent =
      options.message ||
      (isLocal
        ? "Thoughtful getaways across the Philippines. Your location is optional."
        : "Journeys further afield, curated around your travel style.");
  }
  if (realmButtons.length) {
    savePreferences({
      ...(readPreferences() || {}),
      realm: currentRealm,
    });
    updateCarouselButtons();
  }
};

realmButtons.forEach((button) => {
  button.addEventListener("click", () => updateRealm(button.dataset.realm));
});

const dismissLocationPrompt = () => {
  try {
    sessionStorage.setItem("wanderlust-location-prompt-dismissed", "true");
  } catch (error) {
    console.error("Unable to remember that the location prompt was dismissed.", error);
  }
  if (locationDialog?.open) locationDialog.close();
};

if (locationDialog && realmButtons.length) {
  let promptDismissed = false;
  try {
    promptDismissed =
      sessionStorage.getItem("wanderlust-location-prompt-dismissed") === "true";
  } catch (error) {
    console.error("Unable to check the location prompt state.", error);
  }

  if (!promptDismissed && typeof locationDialog.showModal === "function") {
    locationDialog.showModal();
  } else if (!promptDismissed) {
    console.error("This browser does not support the secure location-permission dialog.");
  }

  skipLocationButton?.addEventListener("click", dismissLocationPrompt);
  locationDialog.addEventListener("cancel", dismissLocationPrompt);
}

locationButton?.addEventListener("click", () => {
  if (!window.isSecureContext || !navigator.geolocation) {
    if (locationStatus) {
      locationStatus.textContent =
        "Location isn't available here. Continue without it and choose local or international below.";
    }
    return;
  }

  locationButton.disabled = true;
  locationButton.textContent = "Finding nearby escapes…";
  if (locationStatus) {
    locationStatus.textContent =
      "Waiting for your browser's permission. Your location isn't sent anywhere.";
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (
        !Number.isFinite(latitude) ||
        !Number.isFinite(longitude) ||
        Math.abs(latitude) > 90 ||
        Math.abs(longitude) > 180
      ) {
        locationButton.disabled = false;
        locationButton.innerHTML = 'Use my location <span aria-hidden="true">→</span>';
        if (locationStatus) {
          locationStatus.textContent =
            "The browser returned an invalid location. You can choose a region manually.";
        }
        return;
      }

      nearestLocalPlace = [...localDestinations]
        .map((place) => ({
          place,
          distance: distanceInKm(latitude, longitude, place),
        }))
        .sort((a, b) => a.distance - b.distance)[0];
      const isNearLocalJourney =
        nearestLocalPlace && nearestLocalPlace.distance <= 650;
      const realm = isNearLocalJourney ? "local" : "international";
      const message = isNearLocalJourney
        ? `Nearest curated escape: ${nearestLocalPlace.place.name}, about ${Math.round(nearestLocalPlace.distance)} km away. Exact coordinates are not saved.`
        : "Showing international journeys. Your exact coordinates are not saved.";
      updateRealm(realm, { message });
      dismissLocationPrompt();
    },
    (error) => {
      locationButton.disabled = false;
      locationButton.innerHTML = 'Use my location <span aria-hidden="true">→</span>';
      if (locationStatus) {
        locationStatus.textContent =
          error.code === 1
            ? "Location access was declined. Nothing was saved—choose a region below instead."
            : "We couldn't get a location fix. Nothing was saved—try again or choose a region below.";
      }
    },
    {
      enableHighAccuracy: false,
      maximumAge: 0,
      timeout: 10000,
    },
  );
});

const updateCarouselButtons = () => {
  if (!destinationTrack) return;
  const maxScroll = destinationTrack.scrollWidth - destinationTrack.clientWidth;
  const atStart = destinationTrack.scrollLeft <= 1;
  const atEnd = destinationTrack.scrollLeft >= maxScroll - 1;

  carouselButtons.forEach((button) => {
    const direction = Number(button.dataset.direction);
    button.disabled = direction < 0 ? atStart : atEnd;
  });
};

if (realmButtons.length) updateRealm(currentRealm);

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!destinationTrack) return;
    const firstCard = destinationTrack.querySelector(".dest-card:not([hidden])");
    if (!firstCard) return;
    const gap = Number.parseFloat(
      getComputedStyle(destinationTrack).columnGap,
    ) || 0;
    const distance = firstCard.getBoundingClientRect().width + gap;
    const cardsPerPage = Math.max(
      1,
      Math.floor(destinationTrack.clientWidth / distance),
    );
    destinationTrack.scrollBy({
      left: distance * Number(button.dataset.direction) * cardsPerPage,
      behavior: "smooth",
    });
  });
});

if (destinationTrack) {
  destinationTrack.addEventListener("scroll", updateCarouselButtons, {
    passive: true,
  });
  window.addEventListener("resize", updateCarouselButtons);
  updateCarouselButtons();
}

if (navbar) {
  window.addEventListener(
    "scroll",
    () => navbar.classList.toggle("is-scrolled", window.scrollY > 10),
    { passive: true },
  );
}

const preferenceCards = [...document.querySelectorAll(".preference-card")];
const mapPins = [...document.querySelectorAll(".map-pin")];
const preferenceStatus = document.querySelector("#preference-status");
const mapSummary = document.querySelector("#map-summary");

const selectedStyles = () =>
  preferenceCards
    .filter((card) => card.getAttribute("aria-pressed") === "true")
    .map((card) => card.dataset.preference);

const updatePreferenceSummary = () => {
  const selected = selectedStyles();
  if (preferenceStatus) {
    const regionCount = mapPins.filter(
      (pin) => pin.dataset.state !== "neutral",
    ).length;
    preferenceStatus.textContent =
      selected.length || regionCount
        ? `${selected.length} interests and ${regionCount} region ${regionCount === 1 ? "choice" : "choices"} selected.`
        : "No interests selected. Choose a region or interest to personalize matches, or explore everything.";
  }

  if (mapSummary) {
    const preferred = mapPins
      .filter((pin) => pin.dataset.state === "prefer")
      .map((pin) => pin.dataset.mapRegion);
    const avoided = mapPins
      .filter((pin) => pin.dataset.state === "avoid")
      .map((pin) => pin.dataset.mapRegion);
    const formatRegions = (regions) =>
      regions
        .map((region) =>
          mapPins.find((pin) => pin.dataset.mapRegion === region)
            ?.querySelector(".map-pin-label")?.textContent,
        )
        .filter(Boolean)
        .join(", ");
    const parts = [];
    if (preferred.length) parts.push(`Prefer: ${formatRegions(preferred)}`);
    if (avoided.length) parts.push(`Avoid: ${formatRegions(avoided)}`);
    mapSummary.textContent = parts.length
      ? parts.join(" · ")
      : "No region preferences yet. All regions are included.";
  }
};

const savedPreferences = readPreferences();
if (preferenceCards.length && savedPreferences?.styles) {
  preferenceCards.forEach((card) => {
    const isSelected = savedPreferences.styles.includes(card.dataset.preference);
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-pressed", String(isSelected));
    const mark = card.querySelector(".preference-mark");
    if (mark) mark.textContent = isSelected ? "✓" : "+";
  });
}

if (mapPins.length && savedPreferences?.map) {
  mapPins.forEach((pin) => {
    const state = savedPreferences.map[pin.dataset.mapRegion];
    if (!["neutral", "prefer", "avoid"].includes(state)) return;
    pin.dataset.state = state;
  });
}

const renderMapPin = (pin) => {
  const state = pin.dataset.state || "neutral";
  const label = pin.querySelector(".map-pin-label")?.textContent || pin.dataset.mapRegion;
  const stateLabel = {
    neutral: "no preference",
    prefer: "preferred",
    avoid: "avoided",
  }[state];
  const nextAction = {
    neutral: "prefer this region",
    prefer: "avoid this region",
    avoid: "remove this preference",
  }[state];
  pin.setAttribute("aria-pressed", String(state !== "neutral"));
  pin.setAttribute("aria-label", `${label}: ${stateLabel}. Click to ${nextAction}.`);
  const marker = pin.querySelector('[aria-hidden="true"]');
  if (marker) marker.textContent = { neutral: "·", prefer: "✓", avoid: "×" }[state];
  pin.title = `${label}: ${stateLabel}`;
};

const updateMapPin = (pin) => {
  const states = ["neutral", "prefer", "avoid"];
  const state = pin.dataset.state || "neutral";
  pin.dataset.state = states[(states.indexOf(state) + 1) % states.length];
  renderMapPin(pin);
};

mapPins.forEach((pin) => {
  renderMapPin(pin);
});

preferenceCards.forEach((card) => {
  card.addEventListener("click", () => {
    const isSelected = card.getAttribute("aria-pressed") !== "true";
    card.setAttribute("aria-pressed", String(isSelected));
    card.classList.toggle("is-selected", isSelected);
    const mark = card.querySelector(".preference-mark");
    if (mark) mark.textContent = isSelected ? "✓" : "+";
    savePreferences({
      ...(readPreferences() || {}),
      styles: selectedStyles(),
      map: Object.fromEntries(
        mapPins.map((pin) => [pin.dataset.mapRegion, pin.dataset.state]),
      ),
    });
    updatePreferenceSummary();
  });
});

mapPins.forEach((pin) => {
  pin.addEventListener("click", () => {
    updateMapPin(pin);
    savePreferences({
      ...(readPreferences() || {}),
      map: Object.fromEntries(
        mapPins.map((mapPin) => [mapPin.dataset.mapRegion, mapPin.dataset.state]),
      ),
    });
    updatePreferenceSummary();
  });
});

const applyPreferences = document.querySelector("#apply-preferences");
if (applyPreferences) {
  applyPreferences.addEventListener("click", () => {
    const styles = selectedStyles();
    const realm = readPreferences()?.realm;
    const preferred = mapPins
      .filter((pin) => pin.dataset.state === "prefer")
      .map((pin) => pin.dataset.mapRegion);
    const avoided = mapPins
      .filter((pin) => pin.dataset.state === "avoid")
      .map((pin) => pin.dataset.mapRegion);
    const query = new URLSearchParams();
    if (styles.length) query.set("style", styles.join(","));
    if (realm === "local" || realm === "international") query.set("realm", realm);
    if (preferred.length) query.set("prefer", preferred.join(","));
    if (avoided.length) query.set("avoid", avoided.join(","));
    savePreferences({
      ...(readPreferences() || {}),
      styles,
      map: Object.fromEntries(
        mapPins.map((pin) => [pin.dataset.mapRegion, pin.dataset.state]),
      ),
    });
    applyPreferences.href = `./explore.html${query.size ? `?${query}` : ""}`;
  });
}
updatePreferenceSummary();

const destinationGrid = document.querySelector("#destination-grid");
if (destinationGrid) {
  const createLocalExploreCard = (place, index) => {
    const card = document.createElement("article");
    const imageLink = document.createElement("a");
    const illustration = document.createElement("span");
    const label = document.createElement("span");
    const arrow = document.createElement("span");
    const body = document.createElement("div");
    const meta = document.createElement("div");
    const location = document.createElement("span");
    const rating = document.createElement("span");
    const heading = document.createElement("h3");
    const summary = document.createElement("p");
    const bottom = document.createElement("div");
    const price = document.createElement("span");
    const amount = document.createElement("strong");
    const guideLink = document.createElement("a");
    const artIndex = (index % 5) + 1;
    const detailHref = `./destination.html?place=${encodeURIComponent(place.key)}`;

    card.className = "explore-card";
    Object.assign(card.dataset, {
      name: `${place.name} ${place.province} Philippines`,
      region: place.region,
      realm: "local",
      mapRegion: "philippines",
      vibe: place.vibe,
      cost: String(place.cost),
      days: String(place.days),
      rating: String(place.rating),
      match: String(index + 1),
    });
    imageLink.className = `explore-image local-art local-art-${artIndex}`;
    imageLink.href = detailHref;
    imageLink.setAttribute("aria-label", `Explore ${place.name}, ${place.province}`);
    illustration.className = "local-art-symbol";
    illustration.setAttribute("aria-hidden", "true");
    illustration.textContent = place.symbol;
    label.className = "image-label";
    label.textContent = place.style;
    arrow.className = "image-open";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↗";
    imageLink.append(illustration, label, arrow);

    body.className = "explore-card-body";
    meta.className = "card-meta";
    location.className = "location";
    location.textContent = `${place.name}, ${place.province}`;
    rating.className = "rating";
    rating.textContent = `${place.rating.toFixed(1)} / 10`;
    meta.append(location, rating);
    heading.textContent = place.title;
    summary.textContent = place.description;
    bottom.className = "card-bottom";
    price.append("From ", amount);
    amount.textContent = `$${place.cost.toLocaleString("en-US")}`;
    guideLink.href = detailHref;
    guideLink.append(
      "View place guide ",
      Object.assign(document.createElement("span"), {
        textContent: "→",
        ariaHidden: "true",
      }),
    );
    bottom.append(price, guideLink);
    body.append(meta, heading, summary, bottom);
    card.append(imageLink, body);
    return card;
  };

  localDestinations.forEach((place, index) =>
    destinationGrid.append(createLocalExploreCard(place, index)),
  );
  const cards = [...destinationGrid.querySelectorAll(".explore-card")];
  const search = document.querySelector("#destination-search");
  const filterButtons = [...document.querySelectorAll("[data-filter]")];
  const sort = document.querySelector("#destination-sort");
  const budget = document.querySelector("#budget-filter");
  const length = document.querySelector("#length-filter");
  const count = document.querySelector("#destination-count");
  const empty = document.querySelector("#destination-empty");
  const params = new URLSearchParams(window.location.search);
  const activeFilters = new Set();
  let activeRealm = params.get("realm") || "all";
  let activeRegion = params.get("region") || "";
  let activeStyles = params.get("style") ? params.get("style").split(",") : [];
  let preferredRegions = params.get("prefer") ? params.get("prefer").split(",") : [];
  let avoidedRegions = params.get("avoid") ? params.get("avoid").split(",") : [];
  const savedVibes = {
    "mountain-retreats": ["nature", "adventure"],
    "cultural-cities": ["culture"],
    "sandy-beaches": ["coast"],
    "tropical-humidity": ["nature", "coast"],
    "desert-landscapes": ["desert"],
    "coastal-cliffs": ["coast"],
    "food-culture": ["food"],
    "wildlife-nature": ["nature"],
    "easy-pace": ["wellness"],
    "active-adventure": ["adventure"],
  };

  if (!activeStyles.length && params.has("region")) {
    const normalizedRegion = activeRegion.toLowerCase();
    activeRegion = normalizedRegion.includes("asia")
      ? "asia"
      : normalizedRegion.includes("patagonia")
        ? "south-america"
        : normalizedRegion.includes("mediterranean")
          ? "mediterranean"
          : normalizedRegion.includes("nordic")
            ? "nordics"
            : normalizedRegion.includes("coast")
              ? "mediterranean"
              : normalizedRegion;
  }

  const renderDestinations = () => {
    const query = (search?.value || "").trim().toLowerCase();
    const matched = cards.filter((card) => {
      const matchesText =
        `${card.dataset.name} ${card.dataset.vibe} ${card.dataset.region} ${card.textContent}`.toLowerCase().includes(query);
      const cardVibes = card.dataset.vibe.split(",");
      const matchesFilter = [...activeFilters].every((filter) =>
        cardVibes.includes(filter),
      );
      const matchesRealm =
        activeRealm === "all" || card.dataset.realm === activeRealm;
      const matchesRegion =
        !activeRegion || card.dataset.region === activeRegion;
      const matchingVibes = activeStyles.flatMap(
        (style) => savedVibes[style] || [],
      );
      const matchesStyles =
        !activeStyles.length ||
        matchingVibes.some((vibe) => cardVibes.includes(vibe));
      const mapRegion = card.dataset.mapRegion || (
        ["north-america", "south-america"].includes(card.dataset.region)
          ? "americas"
          : ["europe", "mediterranean", "nordics"].includes(card.dataset.region)
            ? "europe"
            : card.dataset.region
      );
      const avoidsSelectedRegion = avoidedRegions.includes(mapRegion);
      const matchesBudget =
        !budget?.value ||
        budget.value === "any" ||
        Number(card.dataset.cost) <= Number(budget.value);
      const days = Number(card.dataset.days);
      const matchesLength =
        !length?.value ||
        length.value === "any" ||
        (length.value === "short" && days >= 4 && days <= 6) ||
        (length.value === "week" && days >= 7 && days <= 10) ||
        (length.value === "long" && days >= 11);
      return (
        matchesText &&
        matchesFilter &&
        matchesRealm &&
        matchesRegion &&
        matchesStyles &&
        !avoidsSelectedRegion &&
        matchesBudget &&
        matchesLength
      );
    });

    cards.forEach((card) => {
      card.hidden = !matched.includes(card);
    });
    if (count) {
      count.textContent = `${matched.length} ${matched.length === 1 ? "destination" : "destinations"}`;
    }
    if (empty) empty.hidden = matched.length > 0;

    if (sort?.value === "name") {
      matched.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
    } else if (sort?.value === "cost") {
      matched.sort((a, b) => Number(a.dataset.cost) - Number(b.dataset.cost));
    } else if (sort?.value === "rating") {
      matched.sort((a, b) => Number(b.dataset.rating) - Number(a.dataset.rating));
    } else {
      const relevance = (card) => {
        const cardVibes = card.dataset.vibe.split(",");
        const styleScore = activeStyles.reduce(
          (score, style) =>
            score + (savedVibes[style] || []).some((vibe) => cardVibes.includes(vibe)),
          0,
        );
        const mapRegion = card.dataset.mapRegion || (
          ["north-america", "south-america"].includes(card.dataset.region)
            ? "americas"
            : ["europe", "mediterranean", "nordics"].includes(card.dataset.region)
              ? "europe"
              : card.dataset.region
        );
        return styleScore + (preferredRegions.includes(mapRegion) ? 2 : 0);
      };
      matched.sort(
        (a, b) =>
          relevance(b) - relevance(a) ||
          Number(a.dataset.match) - Number(b.dataset.match),
      );
    }
    matched.forEach((card) => destinationGrid.append(card));
    if (count && (preferredRegions.length || avoidedRegions.length)) {
      count.textContent += " · map choices applied";
    }
  };

  search?.addEventListener("input", renderDestinations);
  sort?.addEventListener("change", renderDestinations);
  budget?.addEventListener("change", renderDestinations);
  length?.addEventListener("change", renderDestinations);
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      if (filter === "all") {
        activeFilters.clear();
        activeRealm = "all";
        activeRegion = "";
        activeStyles = [];
        preferredRegions = [];
        avoidedRegions = [];
        if (search) search.value = "";
        if (budget) budget.value = "any";
        if (length) length.value = "any";
      } else if (filter.startsWith("realm-")) {
        activeFilters.clear();
        activeRegion = "";
        activeStyles = [];
        activeRealm = activeRealm === filter.slice(6) ? "all" : filter.slice(6);
      } else {
        activeRegion = "";
        activeStyles = [];
        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
        } else {
          activeFilters.add(filter);
        }
        activeRealm = "all";
      }
      filterButtons.forEach((filterButton) => {
        const value = filterButton.dataset.filter;
        const isSelected =
          value === "all"
            ? activeRealm === "all" &&
              activeFilters.size === 0 &&
              !activeRegion &&
              activeStyles.length === 0 &&
              preferredRegions.length === 0 &&
              avoidedRegions.length === 0
            : value.startsWith("realm-")
              ? activeRealm === value.slice(6)
              : activeFilters.has(value);
        filterButton.classList.toggle("is-selected", isSelected);
        filterButton.setAttribute("aria-pressed", String(isSelected));
        const indicator = filterButton.querySelector("span");
        if (indicator) indicator.textContent = isSelected ? "✓" : "＋";
      });
      renderDestinations();
    });
  });

  filterButtons.forEach((button) => {
    const filter = button.dataset.filter;
    const isSelected =
      filter === "all"
        ? activeRealm === "all" &&
          activeStyles.length === 0 &&
          preferredRegions.length === 0 &&
          avoidedRegions.length === 0
        : filter.startsWith("realm-")
          ? activeRealm === filter.slice(6)
          : false;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    const indicator = button.querySelector("span");
    if (indicator) indicator.textContent = isSelected ? "✓" : "＋";
  });
  renderDestinations();
}

let destinationContext = null;

document.querySelectorAll("[data-month]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-month]").forEach((month) => {
      month.classList.toggle("is-active", month === button);
      month.setAttribute("aria-pressed", String(month === button));
    });
    const note = document.querySelector("#season-note");
    if (!note) return;
    const month = button.dataset.month;
    const japanNotes = {
      Jan: "✦ Crisp winter air (0°C – 10°C) · Snow country and quiet hot springs.",
      Feb: "✦ Peak powder season (0°C – 8°C) · Winter festivals across the north.",
      Mar: "✦ Early spring (7°C – 15°C) · Plum blossoms and warming afternoons.",
      Apr: "✦ Cherry blossoms (10°C – 18°C) · Spring color at its finest.",
      May: "✦ Fresh green season (15°C – 23°C) · Clear skies and gentle warmth.",
      Jun: "✦ Rainy season (18°C – 26°C) · Lush gardens and fewer crowds.",
      Jul: "✦ Summer festivals (23°C – 31°C) · Fireworks, matsuri, and long evenings.",
      Aug: "✦ Summer celebrations (24°C – 32°C) · Island escapes and mountain air.",
      Sep: "✦ Early autumn (20°C – 28°C) · A quieter transition into fall.",
      Oct: "✦ Autumn foliage (15°C – 22°C) · Brilliant color and comfortable days.",
      Nov: "✦ Peak fall color (9°C – 17°C) · Maple leaves and clear mountain views.",
      Dec: "✦ Winter illuminations (3°C – 12°C) · Festive city nights and onsens.",
    };
    const seasonDescriptions = {
      winter: "Winter is quieter; check local opening times and conditions.",
      spring: "Spring brings milder days and a fresh start to the trails.",
      summer: "Summer offers longer days for exploring outdoors.",
      autumn: "Autumn brings cooler air and beautiful changing landscapes.",
    };
    const northSeasons = {
      Jan: "winter",
      Feb: "winter",
      Mar: "spring",
      Apr: "spring",
      May: "spring",
      Jun: "summer",
      Jul: "summer",
      Aug: "summer",
      Sep: "autumn",
      Oct: "autumn",
      Nov: "autumn",
      Dec: "winter",
    };
    const southSeasons = {
      Jan: "summer",
      Feb: "summer",
      Mar: "autumn",
      Apr: "autumn",
      May: "autumn",
      Jun: "winter",
      Jul: "winter",
      Aug: "winter",
      Sep: "spring",
      Oct: "spring",
      Nov: "spring",
      Dec: "summer",
    };
    const season = destinationContext?.hemisphere === "south"
      ? southSeasons[month]
      : northSeasons[month];
    const noteText = destinationContext?.name === "Japan"
      ? japanNotes[month]
      : destinationContext?.hemisphere === "tropical"
        ? `${month} · Tropical conditions vary locally; check rainfall and sea conditions for your exact route.`
        : `${month} · ${seasonDescriptions[season]}`;
    note.textContent = noteText;
  });
});

const destinationDetails = {
  Japan: {
    name: "Japan",
    kicker: "LAND OF THE RISING SUN",
    image: "./KYOTO,%20JAPAN.jpg",
    alt: "Autumn leaves and a pagoda looking toward Mount Fuji in Japan",
    description: "An elegant fusion of timeless traditions, striking natural landscapes, and hyper-modern urban rhythm.",
    price: "$2,450",
    population: "125.7 Million",
    language: "Japanese (Nihongo)",
    currency: "Japanese Yen (¥)",
    timezone: "JST (UTC +9)",
    capital: "Tokyo",
    airport: "Tokyo Haneda, Japan (HND)",
    seasonTag: "SPRING & AUTUMN PEAK",
    hemisphere: "north",
    story: "Begin with a quiet morning beneath Kyoto's temple eaves. Follow the rail north through cedar forests and hot-spring towns. End somewhere bright and sleepless, with the city still unfolding around you. Our local guides make room for both the iconic and the unexpectedly personal.",
    rules: [
      ["No tipping", "Service charges are generally included; a sincere thank-you is welcome."],
      ["Shoes off indoors", "Follow your host's lead at homes, ryokan, and some restaurants."],
      ["Keep public spaces calm", "Use a quiet voice and keep phone calls off crowded trains."],
      ["Use chopsticks thoughtfully", "Avoid pointing with them or leaving them standing in rice."],
      ["Respect local customs", "Check etiquette before visiting shrines, baths, and temples."],
    ],
    experiences: [
      ["Temple Meditation in Kyoto", "Private access to a Buddhist temple at dawn", "4 hours · guide, tea, transfer", "$140", "./KYOTO,%20JAPAN.jpg"],
      ["Tsukiji Fish Market Tour", "Led by a licensed sushi master guide", "3 hours · guide, tastings", "$110", "./TOKYO,%20JAPAN.jpg"],
      ["Onsen Bathing in Hakone", "Private hot spring overlooking Mt. Fuji", "Full day · guide, transfers", "$120", "./DOLOMITES,%20ITALY.jpg"],
    ],
    transit: [
      ["Rail travel", "Shinkansen and regional trains connect the major cities."],
      ["Local transit", "IC cards make city trains and buses easy to use."],
      ["Walking", "Compact neighborhoods are best explored on foot."],
    ],
  },
  Patagonia: {
    name: "Patagonia, Chile",
    kicker: "AT THE EDGE OF THE WORLD",
    image: "./PATAGONIA,%20CHILE.jpg",
    alt: "Snow-capped Patagonian peaks above a blue glacial lake",
    description: "A vast southern wilderness of granite spires, glacial water, and trails that make the rest of the world feel far away.",
    price: "$2,180",
    population: "Chile · 19.8 Million",
    language: "Spanish",
    currency: "Chilean Peso (CLP)",
    timezone: "CLT / CLST",
    capital: "Santiago",
    airport: "Punta Arenas (PUQ)",
    seasonTag: "NOVEMBER – MARCH",
    hemisphere: "south",
    story: "Follow the wind through the southern Andes, where granite towers rise over glacial lakes and the trails open into enormous skies. A local guide helps shape the pace around the weather, the season, and the kind of wild you came to find.",
    rules: [["Stay on marked trails", "Fragile alpine terrain takes a long time to recover."], ["Pack out everything", "Leave no trace in protected wilderness."], ["Plan for changing weather", "Wind and rain can arrive quickly in the south."]],
    experiences: [["Torres del Paine day trek", "A guided route through the park's granite country", "Full day · guide, park entry", "$220", "./PATAGONIA,%20CHILE.jpg"], ["Glacier viewpoint walk", "A gentle trail with a local naturalist", "5 hours · guide, transfer", "$165", "./PATAGONIA,%20CHILE.jpg"], ["Estancia lunch & stories", "Meet a family on a working Patagonian ranch", "Half day · lunch, transfer", "$130", "./PATAGONIA,%20CHILE.jpg"]],
    transit: [["Park transfers", "Pre-booked shuttles connect gateways and trailheads."], ["Regional flights", "Seasonal routes save long overland travel days."], ["Road travel", "Allow extra time for remote, weather-exposed roads."]],
  },
  Amalfi: {
    name: "Amalfi Coast, Italy",
    kicker: "THE MEDITERRANEAN, SLOWLY",
    image: "./AMALFI%20COAST,%20ITALY.jpg",
    alt: "Colorful homes on Italy's Amalfi Coast above the sea",
    description: "Sunlit cliffside villages, lemon-scented gardens, and the particular pleasure of letting the coast set the pace.",
    price: "$1,820",
    population: "Italy · 58.9 Million",
    language: "Italian",
    currency: "Euro (€)",
    timezone: "Central European Time",
    capital: "Rome",
    airport: "Naples International (NAP)",
    seasonTag: "APRIL – JUNE · SEPTEMBER",
    hemisphere: "north",
    story: "Take the slow road between cliffside villages, pausing for a garden lunch or a swim below the terraces. Our local hosts make the coast feel more personal than postcard-perfect, with time for small discoveries between the famous views.",
    rules: [["Dress thoughtfully", "Cover shoulders at religious sites and follow posted guidance."], ["Leave the beach as you found it", "Respect local access and protected coastline."], ["Let the village set the pace", "Keep noise low in residential lanes, especially at night."]],
    experiences: [["Coastal path with a local", "Walk a quiet stretch above the sea", "Half day · guide, picnic", "$155", "./AMALFI%20COAST,%20ITALY.jpg"], ["Lemon grove & cucina", "A family-hosted tasting among the terraces", "3 hours · tasting, lunch", "$120", "./AMALFI%20COAST,%20ITALY.jpg"], ["Private boat at golden hour", "A small-boat view of the coastline", "4 hours · skipper, refreshments", "$280", "./SANTORINI,%20GREECE.jpg"]],
    transit: [["Ferries", "Seasonal services connect the main coastal towns."], ["Local buses", "Scenic, frequent in season, and often busy."], ["Private transfers", "Pre-booked cars help with luggage and hilltop stays."]],
  },
  Cappadocia: {
    name: "Cappadocia, Türkiye",
    kicker: "LANDSCAPES FROM ANOTHER TIME",
    image: "./CAPPOCADIA,%20TURKEY.jpg",
    alt: "Hot-air balloons float over Cappadocia's rock formations",
    description: "Wind-carved valleys, cave dwellings, and early-morning skies made for a journey that feels beautifully unhurried.",
    price: "$1,360",
    population: "Türkiye · 85 Million",
    language: "Turkish",
    currency: "Turkish Lira (₺)",
    timezone: "TRT (UTC +3)",
    capital: "Ankara",
    airport: "Kayseri Airport (ASR)",
    seasonTag: "APRIL – JUNE · SEPTEMBER",
    hemisphere: "north",
    story: "Walk the rose-colored valleys before the day warms, then return to a cave-suite terrace as balloons rise into the sky. With a local guide, the extraordinary landscape opens into stories of craft, migration, and daily life.",
    rules: [["Ask before photographing", "Especially when people are in the frame."], ["Respect historic sites", "Do not climb or mark fragile rock formations."], ["Dress for the season", "Temperatures shift between sunny days and cool evenings."]],
    experiences: [["Valley trails at first light", "A guided walk through the sculpted landscape", "4 hours · guide, transfer", "$95", "./CAPPOCADIA,%20TURKEY.jpg"], ["Underground city visit", "Explore the region's layered history with an expert", "Half day · guide, entry", "$115", "./CAPPOCADIA,%20TURKEY.jpg"], ["Balloon flight at sunrise", "A licensed operator and weather-dependent departure", "3 hours · flight, breakfast", "$260", "./CAPPOCADIA,%20TURKEY.jpg"]],
    transit: [["Local transfers", "Pre-arranged drivers link towns and trailheads."], ["Regional flights", "Kayseri and Nevşehir connect to Istanbul."], ["Walking", "Many valleys begin close to village centers."]],
  },
  Santorini: {
    name: "Santorini, Greece",
    kicker: "ISLAND TIME, REIMAGINED",
    image: "./SANTORINI,%20GREECE.jpg",
    alt: "White island homes above the Aegean Sea in Santorini",
    description: "Volcanic shores, whitewashed lanes, and long evenings that ask for nothing more than a table by the water.",
    price: "$1,610",
    population: "Greece · 10.4 Million",
    language: "Greek",
    currency: "Euro (€)",
    timezone: "Eastern European Time",
    capital: "Athens",
    airport: "Santorini Airport (JTR)",
    seasonTag: "MAY – JUNE · SEPTEMBER",
    hemisphere: "north",
    story: "Beyond the familiar sunset, Santorini reveals quiet vineyard paths, volcanic beaches, and small villages where the afternoon stretches on. Explore with care and leave enough room in the day to follow your curiosity.",
    rules: [["Keep village lanes clear", "Leave room for residents and service vehicles."], ["Respect private spaces", "Ask before photographing homes or residents."], ["Use water thoughtfully", "Island resources are limited, especially in summer."]],
    experiences: [["Caldera footpath walk", "A guided route between villages above the sea", "4 hours · guide, water", "$120", "./SANTORINI,%20GREECE.jpg"], ["Volcanic wine tasting", "Visit a small local winery", "3 hours · tasting, transfer", "$145", "./SANTORINI,%20GREECE.jpg"], ["Quiet cove by boat", "A small-group sail along the southern coast", "Half day · skipper, lunch", "$210", "./AMALFI%20COAST,%20ITALY.jpg"]],
    transit: [["Local buses", "Connect major villages and the island's port."], ["Taxis & transfers", "Reserve ahead during busy travel periods."], ["Ferries", "Schedules change seasonally; confirm before travel."]],
  },
  Bali: {
    name: "Bali, Indonesia",
    kicker: "A SOFTER KIND OF ESCAPE",
    image: "./BALI,%20INDONESIA.jpg",
    alt: "Turquoise cove framed by tropical cliffs in Bali",
    description: "A richly layered island of green terraces, temple ceremonies, and saltwater mornings that find their own rhythm.",
    price: "$1,240",
    population: "Indonesia · 280 Million",
    language: "Indonesian (Bahasa Indonesia)",
    currency: "Indonesian Rupiah (Rp)",
    timezone: "WITA (UTC +8)",
    capital: "Jakarta",
    airport: "Denpasar Airport (DPS)",
    seasonTag: "MAY – OCTOBER",
    hemisphere: "tropical",
    story: "Meet the island beyond the busy beach roads: a dawn walk through the rice terraces, a family-run kitchen, a ceremony approached with respect. We make time for thoughtful visits and the quieter corners between them.",
    rules: [["Dress respectfully at temples", "Wear a sarong and follow local visitor guidance."], ["Ask before entering a ceremony", "Some spaces and rituals are for worshippers only."], ["Choose responsible wildlife visits", "Avoid attractions that handle or confine wild animals."]],
    experiences: [["Rice terrace walk", "A local farmer shares the rhythms of the fields", "3 hours · guide, breakfast", "$85", "./BALI,%20INDONESIA.jpg"], ["Balinese cooking at home", "Shop and cook with a family host", "4 hours · market, meal", "$95", "./BALI,%20INDONESIA.jpg"], ["Coastline by outrigger", "A small-group morning on the water", "Half day · boat, guide", "$130", "./PALAWAN,%20PHILIPPINES.jpg"]],
    transit: [["Private drivers", "A practical way to link Bali's spread-out regions."], ["Ride-hailing", "Available in many areas; local access rules vary."], ["Walking", "Village lanes can be narrow; take care after dark."]],
  },
  Norway: {
    name: "Tromsø, Norway",
    aliases: ["Norway", "Tromsø"],
    kicker: "ABOVE THE ARCTIC CIRCLE",
    image: "./TROMS%C3%98,%20NORWAY.jpg",
    alt: "Arctic Norway's broad landscape beneath a northern sky",
    description: "Fjord-side stillness, salt-air saunas, and clear northern nights in a place where nature always leads.",
    price: "$2,040",
    population: "Norway · 5.6 Million",
    language: "Norwegian",
    currency: "Norwegian Krone (kr)",
    timezone: "Central European Time",
    capital: "Oslo",
    airport: "Tromsø Airport (TOS)",
    seasonTag: "SEPTEMBER – MARCH",
    hemisphere: "north",
    story: "Let the light set the itinerary: long summer evenings along the water or winter skies watched with a local guide. Keep the plan flexible, dress for changing conditions, and give the Arctic plenty of space.",
    rules: [["Respect nature and wildlife", "Observe animals from a safe, responsible distance."], ["Follow outdoor access guidance", "Leave gates, trails, and campsites as you find them."], ["Plan for weather and light", "Conditions can shift quickly in the Arctic."]],
    experiences: [["Fjord and island day", "A small-group journey through coastal scenery", "6 hours · guide, lunch", "$190", "./TROMS%C3%98,%20NORWAY.jpg"], ["Northern lights by minibus", "A flexible evening with a local guide", "5 hours · guide, warm drinks", "$160", "./TROMS%C3%98,%20NORWAY.jpg"], ["Sauna by the sea", "A restorative visit to a local floating sauna", "2 hours · entry, towel", "$75", "./TROMS%C3%98,%20NORWAY.jpg"]],
    transit: [["City buses", "Reach the main neighborhoods and local sights."], ["Regional flights", "Useful for longer distances across northern Norway."], ["Guided transfers", "Recommended for remote winter excursions."]],
  },
  Marrakech: {
    name: "Marrakech, Morocco",
    kicker: "A CITY MADE OF STORIES",
    image: "./MARRAKECH,%20MOROCCO.jpg",
    alt: "Warm desert light near Marrakech",
    description: "Courtyard riads, fragrant markets, and the shifting colors of the desert—best experienced with time and a trusted local guide.",
    price: "$1,520",
    population: "Morocco · 38 Million",
    language: "Arabic & Amazigh",
    currency: "Moroccan Dirham (د.م.)",
    timezone: "Western European Time",
    capital: "Rabat",
    airport: "Marrakech Airport (RAK)",
    seasonTag: "MARCH – MAY · OCTOBER",
    hemisphere: "north",
    story: "Follow a local guide into the medina's tucked-away courtyards, then leave the city for a change of pace beneath wide desert skies. Thoughtful introductions turn a first visit into something more grounded and personal.",
    rules: [["Ask before taking portraits", "Respect privacy, especially in busy public spaces."], ["Dress with cultural awareness", "Light, modest clothing is a considerate choice."], ["Agree on prices clearly", "Confirm costs before a service or purchase begins."]],
    experiences: [["Medina with an artisan", "Meet makers in their neighborhood workshops", "Half day · guide, tastings", "$90", "./MARRAKECH,%20MOROCCO.jpg"], ["Atlas foothills by road", "A locally hosted day outside the city", "Full day · driver, lunch", "$180", "./MARRAKECH,%20MOROCCO.jpg"], ["Courtyard cooking class", "Prepare a shared meal with a local cook", "4 hours · ingredients, dinner", "$105", "./MARRAKECH,%20MOROCCO.jpg"]],
    transit: [["Walking", "The medina is easiest to explore on foot with a guide."], ["Taxis", "Agree on the fare before starting the ride."], ["Private drivers", "Useful for day trips beyond the city."]],
  },
  Dolomites: {
    name: "Dolomites, Italy",
    kicker: "THE ALPS, AT YOUR OWN PACE",
    image: "./DOLOMITES,%20ITALY.jpg",
    alt: "A green mountain meadow and dramatic peaks in the Dolomites",
    description: "High meadow trails, quiet mountain lodges, and pale limestone peaks that change color as the day goes on.",
    price: "$1,780",
    population: "Italy · 58.9 Million",
    language: "Italian & German",
    currency: "Euro (€)",
    timezone: "Central European Time",
    capital: "Rome",
    airport: "Venice Marco Polo (VCE)",
    seasonTag: "JUNE – SEPTEMBER",
    hemisphere: "north",
    story: "Move between high meadows, family-run rifugi, and villages shaped by mountain life. A regional guide helps match each walk to your experience, the weather, and the season's trail conditions.",
    rules: [["Stay on marked paths", "Protect alpine plants and fragile trail edges."], ["Check trail conditions", "Mountain weather changes quickly; plan with local advice."], ["Respect quiet hours", "Rifugi and small villages are working communities."]],
    experiences: [["Alpine meadow walk", "A moderate trail with a mountain guide", "5 hours · guide, lunch", "$145", "./DOLOMITES,%20ITALY.jpg"], ["Rifugio-to-rifugio day", "A scenic route with a local mountain host", "Full day · guide, hut lunch", "$210", "./DOLOMITES,%20ITALY.jpg"], ["Ladin food & craft", "A village visit centered on local traditions", "Half day · host, tasting", "$110", "./DOLOMITES,%20ITALY.jpg"]],
    transit: [["Regional trains", "Connect valley gateways and nearby cities."], ["Local buses", "Seasonal routes serve many trailheads."], ["Mountain lifts", "Operating dates and hours vary by season."]],
  },
  Palawan: {
    name: "Palawan, Philippines",
    kicker: "ISLANDS THAT INVITE YOU TO SLOW DOWN",
    image: "./PALAWAN,%20PHILIPPINES.jpg",
    alt: "A hidden cove and turquoise water in Palawan",
    description: "Limestone islands, clear-water lagoons, and the kind of beach day that stretches gently into the next.",
    price: "$1,340",
    population: "Philippines · 117 Million",
    language: "Filipino & English",
    currency: "Philippine Peso (₱)",
    timezone: "PHT (UTC +8)",
    capital: "Manila",
    airport: "Puerto Princesa Airport (PPS)",
    seasonTag: "DECEMBER – MAY",
    hemisphere: "north",
    story: "Explore the islands with a small local crew, moving gently between lagoons, coastal villages, and unhurried mornings. We favor responsible operators and leave space for weather, tides, and the communities who call these shores home.",
    rules: [["Protect marine life", "Use reef-safe products and never touch coral."], ["Respect local access", "Follow community and park guidance at each site."], ["Leave no trace", "Carry out litter and keep wildlife undisturbed."]],
    experiences: [["Small-group lagoon boat", "A locally operated day on the water", "Full day · guide, lunch, permits", "$145", "./PALAWAN,%20PHILIPPINES.jpg"], ["Village food walk", "Taste regional dishes with a local host", "3 hours · guide, tastings", "$70", "./PALAWAN,%20PHILIPPINES.jpg"], ["Island cove snorkel", "A guided swim at a protected reef", "Half day · gear, boat", "$95", "./PALAWAN,%20PHILIPPINES.jpg"]],
    transit: [["Regional flights", "Routes link Puerto Princesa, El Nido, and Manila."], ["Boat transfers", "Schedules depend on weather and sea conditions."], ["Local vans", "Shared transfers are common between towns."]],
  },
  Yukon: {
    name: "Yukon, Canada",
    kicker: "THE WILD, WIDE NORTH",
    image: "./YUKON,%20CANADA.avif",
    alt: "Remote mountain wilderness in Canada's Yukon",
    description: "Open horizons, quiet mountain country, and long golden evenings at the edge of the everyday map.",
    price: "$2,480",
    population: "Territory · 46,000",
    language: "English & French",
    currency: "Canadian Dollar (C$)",
    timezone: "Mountain Time",
    capital: "Whitehorse",
    airport: "Whitehorse Airport (YXY)",
    seasonTag: "JUNE – SEPTEMBER",
    hemisphere: "north",
    story: "In the Yukon, distance is part of the experience. Travel with local knowledge, leave room for the road, and let the long light draw you toward quiet lakes, mountain trails, and welcoming northern communities.",
    rules: [["Give wildlife room", "Follow local guidance and never approach wild animals."], ["Prepare for remote travel", "Share plans and carry suitable supplies."], ["Respect Indigenous communities", "Learn local protocols before visiting culturally significant places."]],
    experiences: [["Kluane mountain day", "A guided outing shaped around trail conditions", "Full day · guide, transfer", "$260", "./YUKON,%20CANADA.avif"], ["Whitehorse river stories", "A local-led walk through the territory's history", "3 hours · guide, tasting", "$85", "./YUKON,%20CANADA.avif"], ["Northern sky evening", "A small-group night outside the city", "5 hours · guide, warm drinks", "$175", "./TROMS%C3%98,%20NORWAY.jpg"]],
    transit: [["Rental vehicles", "Best for flexible travel; check road conditions first."], ["Regional flights", "Useful for distant communities and remote lodges."], ["Local operators", "Guided transfers simplify wilderness excursions."]],
  },
};

Object.assign(
  destinationDetails,
  Object.fromEntries(
    localDestinations.map((place) => [
      place.key,
      {
        name: `${place.name}, Philippines`,
        kicker: `${place.province.toUpperCase()} · PHILIPPINES`,
        image: "./PALAWAN,%20PHILIPPINES.jpg",
        alt: "A Philippine island coastline from the Wanderlust photo collection",
        description: place.description,
        price: `$${place.cost.toLocaleString("en-US")}`,
        population: place.population,
        language: "Filipino & English",
        currency: "Philippine Peso (₱)",
        timezone: "Philippine Time (UTC +8)",
        capital: place.capital,
        airport: place.airport,
        seasonTag: "NOVEMBER – MAY · WEATHER VARIES",
        hemisphere: "tropical",
        story: `${place.description} A local-led itinerary leaves room for weather, community guidance, and small discoveries along the way.`,
        rules: [
          ["Respect community guidance", "Ask before visiting private, sacred, or culturally significant places."],
          ["Leave nature as you found it", "Carry out waste and follow local conservation advice."],
          ["Choose local hosts", "Favor locally run guides and responsible visitor experiences."],
        ],
        experiences: [
          [`${place.name} with a local guide`, "A small-group introduction shaped by local knowledge", `Half day · guide · ${place.days} day stays available`, "$85", "./PALAWAN,%20PHILIPPINES.jpg"],
          ["Local food & community", "A relaxed introduction to regional cooking and craft", "3 hours · host · tasting", "$55", "./KYOTO,%20JAPAN.jpg"],
          ["A slower day outdoors", "A low-impact route selected with local conditions in mind", "Half day · local guide", "$70", "./BALI,%20INDONESIA.jpg"],
        ],
        transit: [
          ["Regional connections", "Check the latest local schedules; services change seasonally."],
          ["Local transfers", "Confirm fares and pickup details with your accommodation."],
          ["Responsible visits", "Follow community, park, and wildlife guidance at each stop."],
        ],
      },
    ]),
  ),
);

const destinationPage = document.querySelector(".destination-page");
if (destinationPage) {
  const requestedPlace =
    new URLSearchParams(window.location.search).get("place") || "Japan";
  const normalizedPlace = requestedPlace.toLowerCase();
  const destination = Object.values(destinationDetails).find(
    (item) =>
      item.name.toLowerCase() === normalizedPlace ||
      item.name.toLowerCase().startsWith(normalizedPlace) ||
      item.aliases?.some((alias) => alias.toLowerCase() === normalizedPlace),
  ) || destinationDetails[
    Object.keys(destinationDetails).find(
      (key) => key.toLowerCase() === normalizedPlace,
    )
  ] || destinationDetails.Japan;
  const destinationPicker = document.querySelector("#destination-picker");
  if (destinationPicker) {
    destinationPicker.value =
      Object.keys(destinationDetails).find(
        (key) => destinationDetails[key] === destination,
      ) || "Japan";
    destinationPicker.addEventListener("change", () => {
      window.location.assign(
        `./destination.html?place=${encodeURIComponent(destinationPicker.value)}`,
      );
    });
  }
  destinationContext = destination;

  const setDestinationText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value;
  };
  const image = document.querySelector("#destination-image");
  if (image) {
    image.src = destination.image;
    image.alt = destination.alt;
  }
  setDestinationText("#destination-kicker", destination.kicker);
  setDestinationText("#destination-name", destination.name);
  setDestinationText("#destination-description", destination.description);
  setDestinationText("#destination-price", `FROM ${destination.price} / PP`);
  setDestinationText("#destination-population", destination.population);
  setDestinationText("#destination-language", destination.language);
  setDestinationText("#destination-currency", destination.currency);
  setDestinationText("#destination-timezone", destination.timezone);
  setDestinationText("#destination-capital", destination.capital);
  setDestinationText("#destination-respect-title", `Travel well in ${destination.name}`);
  setDestinationText("#destination-transit-title", `Getting around ${destination.name}`);
  setDestinationText("#destination-story-title", `Take the long way through ${destination.name}.`);
  setDestinationText("#destination-story-copy", destination.story);
  setDestinationText(".season-tag", destination.seasonTag);

  const flightHref = `./airlines.html?destination=${encodeURIComponent(destination.airport)}`;
  ["#destination-flights-link", "#destination-concierge-link"].forEach(
    (selector) => {
      const link = document.querySelector(selector);
      if (link) link.href = flightHref;
    },
  );

  const rules = document.querySelector("#destination-rules");
  if (rules) {
    rules.replaceChildren(
      ...destination.rules.map(([title, description], index) => {
        const item = document.createElement("li");
        const icon = document.createElement("span");
        const text = document.createElement("div");
        const heading = document.createElement("strong");
        const detail = document.createElement("small");
        icon.textContent = ["⌖", "⌁", "◉", "♧", "♬"][index % 5];
        heading.textContent = title;
        detail.textContent = description;
        text.append(heading, detail);
        item.append(icon, text);
        return item;
      }),
    );
  }

  const experiences = document.querySelector("#destination-experiences");
  if (experiences) {
    experiences.replaceChildren(
      ...destination.experiences.map(
        ([title, description, details, price, source]) => {
          const row = document.createElement("article");
          const imageElement = document.createElement("img");
          const text = document.createElement("span");
          const name = document.createElement("strong");
          const summary = document.createElement("small");
          const meta = document.createElement("small");
          const amount = document.createElement("b");
          row.className = "experience-row";
          imageElement.src = source;
          imageElement.alt = "";
          imageElement.loading = "lazy";
          name.textContent = title;
          summary.textContent = description;
          meta.textContent = `◷ ${details}`;
          amount.textContent = price;
          text.append(name, summary, meta);
          row.append(imageElement, text, amount);
          return row;
        },
      ),
    );
  }

  const transit = document.querySelector("#destination-transit");
  if (transit) {
    transit.replaceChildren(
      ...destination.transit.map(([label, details]) => {
        const item = document.createElement("li");
        const heading = document.createElement("strong");
        heading.textContent = `${label}: `;
        item.append(heading, document.createTextNode(details));
        return item;
      }),
    );
  }
  document.title = `${destination.name} — Destination guide | Wanderlust`;
  document.querySelector(".month-row [data-month='Apr']")?.click();
}

const flightSearch = document.querySelector("#flight-search");
const flightDestination = document.querySelector("#flight-destination");
const flightStatus = document.querySelector("#flight-status");
const flightDepart = document.querySelector("#flight-depart");
const flightReturn = document.querySelector("#flight-return");
const airportParams = new URLSearchParams(window.location.search);

if (flightSearch) {
  const today = new Date();
  const formatDate = (date) =>
    `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const departDefault = new Date(today);
  departDefault.setDate(today.getDate() + 60);
  const returnDefault = new Date(departDefault);
  returnDefault.setDate(departDefault.getDate() + 7);

  if (flightDepart) {
    flightDepart.min = formatDate(today);
    if (!flightDepart.value) flightDepart.value = formatDate(departDefault);
  }
  if (flightReturn) {
    flightReturn.min = formatDate(today);
    if (!flightReturn.value) flightReturn.value = formatDate(returnDefault);
  }
  if (flightDestination && airportParams.has("destination")) {
    const place = airportParams.get("destination");
    flightDestination.value = place.toLowerCase().includes("tokyo")
      ? "Tokyo Haneda, Japan (HND)"
      : place;
  }

  flightSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateFlightSearch()) return;
    const formData = new FormData(flightSearch);
    const from = formData.get("origin").toString().trim();
    const to = formData.get("destination").toString().trim();
    if (flightStatus) {
      flightStatus.textContent = `Comparing curated options from ${from} to ${to} · Sample fares are indicative and subject to provider confirmation.`;
    }
    document.querySelectorAll(".airline-card").forEach((card) => {
      const route = card.querySelector(".airline-route");
      if (route) {
        const routeLabel = document.createElement("strong");
        const durationLabel = document.createElement("span");
        const duration = Number(card.dataset.duration);
        const hours = Math.floor(duration / 60);
        const minutes = String(duration % 60).padStart(2, "0");
        routeLabel.textContent = `${from} → ${to}`;
        durationLabel.textContent = `◷ ${hours}h ${minutes}m · Direct flight`;
        route.replaceChildren(routeLabel, durationLabel);
      }
    });
  });
}

const validateFlightSearch = () => {
  if (!flightSearch || !flightSearch.reportValidity()) return false;
  if (
    flightDepart?.value &&
    flightReturn?.value &&
    flightReturn.value < flightDepart.value
  ) {
    flightReturn.setCustomValidity(
      "Your return date must be the same day or after departure.",
    );
    flightReturn.reportValidity();
    flightReturn.setCustomValidity("");
    return false;
  }
  return true;
};

const airlineList = document.querySelector("#airline-list");
const flightSort = document.querySelector("#flight-sort");
if (airlineList && flightSort) {
  flightSort.addEventListener("change", () => {
    const airlineCards = [...airlineList.querySelectorAll(".airline-card")];
    const key = flightSort.value === "duration" ? "duration" : "price";
    airlineCards.sort((a, b) => {
      if (flightSort.value === "recommended") {
        return Number(a.dataset.rank) - Number(b.dataset.rank);
      }
      return Number(a.dataset[key]) - Number(b.dataset[key]);
    });
    airlineCards.forEach((card) => airlineList.append(card));
  });
}

const flightDialog = document.querySelector("#flight-dialog");
document.querySelectorAll(".airline-select").forEach((button) => {
  button.addEventListener("click", () => {
    if (!flightDialog || typeof flightDialog.showModal !== "function") {
      console.error("Flight details require a browser with dialog support.");
      return;
    }
    if (!validateFlightSearch()) return;
    const origin = document.querySelector("#flight-origin")?.value.trim();
    const destination = document
      .querySelector("#flight-destination")
      ?.value.trim();
    const passengers = document.querySelector("#flight-passengers")?.value;
    const depart = flightDepart?.value;
    const returnDate = flightReturn?.value;
    const summary = {
      airline: document.querySelector("#dialog-airline"),
      route: document.querySelector("#dialog-route"),
      fare: document.querySelector("#dialog-fare"),
      dates: document.querySelector("#dialog-dates"),
    };

    if (
      !origin ||
      !destination ||
      !passengers ||
      !depart ||
      !returnDate ||
      Object.values(summary).some((item) => !item)
    ) {
      console.error("Unable to prepare a flight request because trip details are incomplete.");
      return;
    }

    const currency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
    const fare = Number(button.dataset.fare.replaceAll(",", ""));
    summary.airline.textContent = button.dataset.airline;
    summary.route.textContent = `${origin} → ${destination} · ${passengers} passengers`;
    summary.fare.textContent = `${currency.format(fare)} / person`;
    summary.dates.textContent = `${depart} — ${returnDate}`;

    const subject = encodeURIComponent(
      `Flight quote request: ${button.dataset.airline}`,
    );
    const body = encodeURIComponent(
      `Hello Wanderlust concierge,\n\nPlease confirm availability and final pricing for:\nAirline: ${button.dataset.airline}\nRoute: ${origin} to ${destination}\nDates: ${depart} to ${returnDate}\nPassengers: ${passengers}\nIndicative fare: ${currency.format(fare)} per person\n\nThank you.`,
    );
    const requestLink = document.querySelector("#dialog-request");
    requestLink.href = `mailto:explore@wanderlustjourneys.com?subject=${subject}&body=${body}`;
    flightDialog.showModal();
  });
});

flightDialog?.addEventListener("click", (event) => {
  if (event.target === flightDialog) flightDialog.close();
});
