/* =========================================================
   WANDERLUST DESTINATION DATA
   Each country has "tags" that match the vibe cards on the
   Preferences page:
   beaches · mountains · tropical · cultural · desert · cliffs
   To add a country, copy one block and change the values.
========================================================= */

const VIBES = {
  beaches: "Sandy Beaches",
  mountains: "Mountain Retreats",
  tropical: "Tropical Humidity",
  cultural: "Cultural Cities",
  desert: "Desert Landscapes",
  cliffs: "Coastal Cliffs",
};

const DESTINATIONS = [
  {
    id: "japan",
    name: "JAPAN",
    tagline: "Mount Fuji, Cultural Heritage & Scenic Alpine Landscapes",
    region: "Kyoto & Hakone",
    eyebrow: "Land of the Rising Sun",
    tags: ["mountains", "cultural"],
    image:
      "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_863/activities/fifiq1ejesazl85tt8ae/SpaciousIndependentSeatBus%E3%83%BBDepartingfromTokyo:MountFujiKawaguchikoScenicDayTrip(IncludesKobeBeefShabu-shabuLunch).jpg",
    rating: "9.8",
    price: "$1,489",
    badge: "Cherry Blossom: Apr",
    airport: "Tokyo Haneda (HND)",
    description:
      "A refined harmony of ancient tradition and quiet modernity — mountain shrines, mossy gardens, and some of the most precise hospitality on Earth.",
    facts: {
      Population: "124 Million",
      Language: "Japanese",
      Currency: "Japanese Yen (¥)",
      "Time Zone": "JST (UTC +9)",
      Capital: "Tokyo",
    },
    peakMonths: [3, 9, 10],
    seasons: [
      { label: "Cherry Blossom", cls: "s-spring", months: 3 },
      { label: "Hot & Humid", cls: "s-summer", months: 3 },
      { label: "Autumn Foliage", cls: "s-autumn", months: 3 },
      { label: "Snow & Onsen", cls: "s-winter", months: 3 },
    ],
    seasonNote: "Expect larger crowds in early April and mid-November.",
    bestSeason: "Spring & Autumn",
    donts: [
      ["No Tipping", "It can be seen as rude — great service is the norm."],
      ["No Shoes Indoors", "Remove them in homes, temples and ryokans."],
      ["No Eating While Walking", "Finish snacks where you bought them."],
      ["Mind Your Chopsticks", "Never stand them upright in rice."],
    ],
    experiences: [
      [
        "Temple Meditation in Kyoto",
        "Half-day · Private monk-led session",
        "$85",
        ["Ryōan-ji", "Zen"],
      ],
      [
        "Tsukiji Outer Market Tour",
        "Morning · Small group, 6 guests max",
        "$60",
        ["Tsukiji fish market", "Tsukiji"],
      ],
      [
        "Onsen Stay in Hakone",
        "Overnight · Ryokan with kaiseki dinner",
        "$210",
        ["Ryokan", "Onsen"],
      ],
    ],
    transport: [
      ["JR Rail Pass", "Unlimited bullet trains for 7, 14 or 21 days."],
      [
        "IC Cards (Suica)",
        "Tap-to-pay for metro, buses and convenience stores.",
      ],
      ["Walking", "Kyoto and Tokyo neighbourhoods are best on foot."],
    ],
  },

  {
    id: "switzerland",
    name: "SWITZERLAND",
    tagline: "Alpine Meadows & Timeless Villages",
    region: "Grindelwald & Zermatt",
    eyebrow: "Heart of the Alps",
    tags: ["mountains"],
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1400&auto=format&fit=crop",
    rating: "9.7",
    price: "$2,150",
    badge: "Clear Skies: Jul–Sep",
    airport: "Zurich (ZRH)",
    description:
      "Glacier-fed lakes, car-free mountain villages and railways that climb straight into the clouds.",
    facts: {
      Population: "8.9 Million",
      Language: "German, French, Italian",
      Currency: "Swiss Franc (CHF)",
      "Time Zone": "CET (UTC +1)",
      Capital: "Bern",
    },
    peakMonths: [6, 7, 8],
    seasons: [
      { label: "Ski Season", cls: "s-winter", months: 3 },
      { label: "Spring Melt", cls: "s-spring", months: 3 },
      { label: "Alpine Summer", cls: "s-summer", months: 3 },
      { label: "Golden Autumn", cls: "s-autumn", months: 3 },
    ],
    seasonNote: "Some high passes stay closed until June.",
    bestSeason: "Summer",
    donts: [
      ["Don't Be Late", "Punctuality is taken seriously, trains included."],
      ["No Noise on Sundays", "Quiet hours are a real rule in many towns."],
      ["Don't Skip Recycling", "Sorting waste is expected everywhere."],
      ["Don't Wander Off Trail", "Mountain weather changes fast."],
    ],
    experiences: [
      [
        "Gornergrat Sunrise Railway",
        "Early morning · Matterhorn views",
        "$140",
        ["Gornergrat Railway", "Gornergrat"],
      ],
      [
        "Grindelwald First Cliff Walk",
        "Half-day · Guided hike",
        "$95",
        ["Grindelwald First", "First (Grindelwald)", "Grindelwald"],
      ],
      [
        "Lake Brienz Boat Cruise",
        "Afternoon · Scenic cruise",
        "$55",
        ["Lake Brienz"],
      ],
    ],
    transport: [
      ["Swiss Travel Pass", "Trains, buses, boats and most museums."],
      ["Mountain Railways", "Cogwheel trains reach the highest viewpoints."],
      ["Postbus", "Yellow buses connect even tiny villages."],
    ],
  },

  {
    id: "norway",
    name: "NORWAY",
    tagline: "Fjord Valleys & Northern Light Trails",
    region: "Lofoten & Tromsø",
    eyebrow: "Land of the Midnight Sun",
    tags: ["mountains", "cliffs"],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Fiordo_de_Geiranger_desde_Flydalsjuvet%2C_Noruega%2C_2019-09-07%2C_DD_61.jpg?width=1600",
    rating: "9.5",
    price: "$1,820",
    badge: "Aurora: Oct–Mar",
    airport: "Oslo (OSL)",
    description:
      "Sheer fjord walls, fishing villages on stilts and skies that glow green all winter long.",
    facts: {
      Population: "5.6 Million",
      Language: "Norwegian",
      Currency: "Norwegian Krone (NOK)",
      "Time Zone": "CET (UTC +1)",
      Capital: "Oslo",
    },
    peakMonths: [1, 5, 6],
    seasons: [
      { label: "Aurora Season", cls: "s-winter", months: 3 },
      { label: "Thaw", cls: "s-spring", months: 2 },
      { label: "Midnight Sun", cls: "s-summer", months: 3 },
      { label: "Autumn", cls: "s-autumn", months: 2 },
      { label: "Polar Night", cls: "s-winter", months: 2 },
    ],
    seasonNote: "Summer for hiking, deep winter for the northern lights.",
    bestSeason: "Summer & Winter",
    donts: [
      [
        "Don't Ignore Allemannsretten",
        "You may roam freely — but leave no trace.",
      ],
      ["Don't Underdress", "Layers matter, even in summer."],
      ["Don't Expect Late Shops", "Many close early and on Sundays."],
      ["Don't Drive Fast", "Fines are steep and roads are narrow."],
    ],
    experiences: [
      [
        "Northern Lights Chase",
        "Night · Small group with photographer",
        "$160",
        ["Aurora"],
      ],
      [
        "Geirangerfjord Kayak",
        "Half-day · Guided paddle",
        "$120",
        ["Geirangerfjord"],
      ],
      [
        "Reinebringen Hike",
        "Morning · Lofoten summit trail",
        "$70",
        ["Reinebringen", "Reine, Norway"],
      ],
    ],
    transport: [
      ["Hurtigruten Ferry", "Coastal voyage stopping at fjord towns."],
      ["Regional Trains", "The Bergen Line is a destination in itself."],
      ["Car Rental", "Best way to explore Lofoten at your own pace."],
    ],
  },

  {
    id: "peru",
    name: "PERU",
    tagline: "Andean Highlands & Ancient Civilizations",
    region: "Cusco & Sacred Valley",
    eyebrow: "Empire of the Andes",
    tags: ["mountains", "cultural", "desert"],
    image:
      "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1400&auto=format&fit=crop",
    rating: "9.4",
    price: "$1,975",
    badge: "Dry Season: May–Sep",
    airport: "Lima (LIM)",
    description:
      "Inca citadels in the clouds, desert oases on the coast, and living traditions woven into every market.",
    facts: {
      Population: "34 Million",
      Language: "Spanish, Quechua",
      Currency: "Peruvian Sol (PEN)",
      "Time Zone": "PET (UTC −5)",
      Capital: "Lima",
    },
    peakMonths: [5, 6, 7],
    seasons: [
      { label: "Wet Season", cls: "s-summer", months: 4 },
      { label: "Dry Season", cls: "s-spring", months: 5 },
      { label: "Shoulder", cls: "s-autumn", months: 3 },
    ],
    seasonNote: "The Inca Trail closes every February for maintenance.",
    bestSeason: "May – September",
    donts: [
      ["Don't Rush the Altitude", "Give yourself two days in Cusco to adjust."],
      ["Don't Drink Tap Water", "Stick to bottled or filtered."],
      ["Don't Photograph Without Asking", "Always ask locals first."],
      ["Don't Flush Paper", "Use the bin — pipes are narrow."],
    ],
    experiences: [
      [
        "Machu Picchu at Dawn",
        "Full day · Guided entry",
        "$190",
        ["Machu Picchu"],
      ],
      [
        "Sacred Valley Weaving Visit",
        "Half-day · Community cooperative",
        "$65",
        ["Andean textiles", "Chinchero", "Sacred Valley"],
      ],
      [
        "Huacachina Dune Ride",
        "Sunset · Sandboarding included",
        "$45",
        ["Huacachina"],
      ],
    ],
    transport: [
      ["PeruRail", "Scenic trains from Cusco to Aguas Calientes."],
      ["Domestic Flights", "Save days between Lima and Cusco."],
      ["Colectivos", "Shared vans between valley towns."],
    ],
  },

  {
    id: "italy",
    name: "ITALY",
    tagline: "Lemon-Scented Cliffs & Renaissance Cities",
    region: "Amalfi Coast & Florence",
    eyebrow: "La Dolce Vita",
    tags: ["cliffs", "cultural", "beaches"],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Positano_%28Italy%29_04.jpg?width=1600",
    rating: "9.4",
    price: "$1,690",
    badge: "Mild: May–Jun",
    airport: "Rome Fiumicino (FCO)",
    description:
      "Pastel villages tumbling down sea cliffs, and cities where every corner holds a masterpiece.",
    facts: {
      Population: "59 Million",
      Language: "Italian",
      Currency: "Euro (€)",
      "Time Zone": "CET (UTC +1)",
      Capital: "Rome",
    },
    peakMonths: [4, 5, 8],
    seasons: [
      { label: "Quiet Winter", cls: "s-winter", months: 3 },
      { label: "Spring Bloom", cls: "s-spring", months: 3 },
      { label: "Peak Summer", cls: "s-summer", months: 3 },
      { label: "Harvest", cls: "s-autumn", months: 3 },
    ],
    seasonNote: "August is busy and many locals are on holiday.",
    bestSeason: "Late Spring & Early Autumn",
    donts: [
      ["No Cappuccino After Noon", "Locals drink espresso after meals."],
      ["Don't Sit on Monuments", "Fines apply in Rome and Venice."],
      ["Cover Up in Churches", "Shoulders and knees covered."],
      ["Don't Expect Early Dinners", "Restaurants fill from 8 pm."],
    ],
    experiences: [
      [
        "Positano Private Boat",
        "Half-day · Grottos and swimming stops",
        "$180",
        ["Positano"],
      ],
      [
        "Florence Uffizi Tour",
        "Morning · Skip-the-line with art historian",
        "$75",
        ["Uffizi"],
      ],
      [
        "Path of the Gods Hike",
        "Morning · Cliffside trail",
        "$50",
        ["Path of the Gods", "Sentiero degli Dei", "Praiano"],
      ],
    ],
    transport: [
      ["High-Speed Rail", "Rome to Florence in about 90 minutes."],
      ["Coastal Ferries", "The easiest way around Amalfi in summer."],
      ["SITA Buses", "Cheap, winding rides between cliff towns."],
    ],
  },

  {
    id: "greece",
    name: "GREECE",
    tagline: "Blue Domes, Ancient Ruins & Aegean Coves",
    region: "Santorini & Athens",
    eyebrow: "Cradle of the West",
    tags: ["beaches", "cliffs", "cultural"],
    image:
      "https://i.pinimg.com/1200x/2c/8b/18/2c8b18a95b82a7b9057733d6aca9f87d.jpg",
    rating: "9.1",
    price: "$1,580",
    badge: "Warm Seas: Jun–Sep",
    airport: "Athens (ATH)",
    description:
      "Whitewashed villages on volcanic cliffs, temples older than memory, and water bluer than you'd believe.",
    facts: {
      Population: "10.4 Million",
      Language: "Greek",
      Currency: "Euro (€)",
      "Time Zone": "EET (UTC +2)",
      Capital: "Athens",
    },
    peakMonths: [5, 8, 9],
    seasons: [
      { label: "Off Season", cls: "s-winter", months: 3 },
      { label: "Spring", cls: "s-spring", months: 2 },
      { label: "Island Summer", cls: "s-summer", months: 4 },
      { label: "Warm Autumn", cls: "s-autumn", months: 2 },
      { label: "Off Season", cls: "s-winter", months: 1 },
    ],
    seasonNote: "Many island ferries and hotels pause from November to March.",
    bestSeason: "June & September",
    donts: [
      ["Don't Flush Paper", "Old plumbing — use the bin."],
      ["No Open Palm Gestures", "The 'moutza' is an insult."],
      ["Don't Touch Ruins", "Climbing ancient sites is prohibited."],
      ["Don't Skip Siesta Hours", "Many shops close mid-afternoon."],
    ],
    experiences: [
      [
        "Caldera Sunset Sail",
        "Evening · Catamaran with dinner",
        "$150",
        ["Santorini"],
      ],
      [
        "Acropolis Early Entry",
        "Morning · Guided before the crowds",
        "$80",
        ["Acropolis of Athens"],
      ],
      [
        "Milos Beach Hopping",
        "Full day · Boat tour",
        "$110",
        ["Sarakiniko", "Milos"],
      ],
    ],
    transport: [
      ["Island Ferries", "Fast and slow boats link the Cyclades."],
      ["Athens Metro", "Clean, quick, and runs to the airport."],
      ["ATV Rental", "Popular for reaching hidden beaches."],
    ],
  },

  {
    id: "morocco",
    name: "MOROCCO",
    tagline: "Sahara Dunes & Labyrinthine Medinas",
    region: "Marrakech & Merzouga",
    eyebrow: "Gateway to the Sahara",
    tags: ["desert", "cultural"],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Mosqu%C3%A9e_de_la_Koutoubia_-_marakesh.jpg?width=1600",
    rating: "9.3",
    price: "$1,420",
    badge: "Cool Desert: Oct–Apr",
    airport: "Marrakech (RAK)",
    description:
      "Spice-scented souks, riads hidden behind plain doors, and golden dunes that glow at sunset.",
    facts: {
      Population: "37 Million",
      Language: "Arabic, Amazigh, French",
      Currency: "Moroccan Dirham (MAD)",
      "Time Zone": "UTC +1",
      Capital: "Rabat",
    },
    peakMonths: [2, 3, 9, 10],
    seasons: [
      { label: "Cool & Clear", cls: "s-winter", months: 2 },
      { label: "Spring", cls: "s-spring", months: 3 },
      { label: "Scorching", cls: "s-summer", months: 4 },
      { label: "Autumn", cls: "s-autumn", months: 3 },
    ],
    seasonNote: "Summer in the Sahara can pass 45°C.",
    bestSeason: "Spring & Autumn",
    donts: [
      ["Don't Eat With Your Left Hand", "The right hand is for food."],
      ["Don't Skip Haggling", "Bargaining is expected in souks."],
      ["Dress Modestly", "Especially outside tourist areas."],
      ["Don't Accept Unsolicited Guides", "Agree on any price first."],
    ],
    experiences: [
      [
        "Sahara Camp Overnight",
        "2 days · Camel trek to desert camp",
        "$230",
        ["Erg Chebbi", "Merzouga"],
      ],
      [
        "Medina Food Walk",
        "Evening · Street food tasting",
        "$45",
        ["Jemaa el-Fnaa"],
      ],
      [
        "Atlas Mountains Day Trip",
        "Full day · Berber villages",
        "$70",
        ["Atlas Mountains"],
      ],
    ],
    transport: [
      ["ONCF Trains", "Comfortable rail between major cities."],
      ["Petit Taxis", "Agree on the fare or ask for the meter."],
      ["Private Driver", "Best for the long Sahara route."],
    ],
  },

  {
    id: "indonesia",
    name: "INDONESIA",
    tagline: "Jungle Temples & Emerald Rice Terraces",
    region: "Bali & Nusa Penida",
    eyebrow: "Island of the Gods",
    tags: ["tropical", "beaches", "cultural"],
    image:
      "https://i.pinimg.com/1200x/90/c0/54/90c05497c0b0a9a38c4a91671c075612.jpg",
    rating: "9.0",
    price: "$980",
    badge: "Dry Season: Apr–Oct",
    airport: "Bali Denpasar (DPS)",
    description:
      "Incense drifting through jungle temples, terraced valleys, and surf breaks at the end of every road.",
    facts: {
      Population: "280 Million",
      Language: "Indonesian, Balinese",
      Currency: "Indonesian Rupiah (IDR)",
      "Time Zone": "WITA (UTC +8)",
      Capital: "Jakarta",
    },
    peakMonths: [4, 5, 8],
    seasons: [
      { label: "Rainy Season", cls: "s-winter", months: 3 },
      { label: "Dry Season", cls: "s-spring", months: 7 },
      { label: "Rainy Season", cls: "s-winter", months: 2 },
    ],
    seasonNote:
      "Nyepi (Day of Silence) closes the whole island for a day in March.",
    bestSeason: "April – October",
    donts: [
      ["Don't Step on Offerings", "Canang sari on the ground are sacred."],
      ["Cover Up at Temples", "A sarong is required — often provided."],
      ["Don't Touch Heads", "The head is considered sacred."],
      ["Don't Drink Tap Water", "Bottled or refill stations only."],
    ],
    experiences: [
      [
        "Tegallalang Sunrise Walk",
        "Morning · Rice terrace trek",
        "$40",
        ["Tegallalang", "Rice terrace"],
      ],
      [
        "Water Temple Purification",
        "Half-day · Guided ritual",
        "$55",
        ["Tirta Empul"],
      ],
      [
        "Nusa Penida Snorkel",
        "Full day · Manta ray point",
        "$95",
        ["Manta ray", "Nusa Penida"],
      ],
    ],
    transport: [
      ["Private Driver", "Affordable and the easiest way around."],
      ["Scooter Rental", "Only if you're an experienced rider."],
      ["Fast Boats", "Daily runs to the Nusa and Gili islands."],
    ],
  },

  {
    id: "philippines",
    name: "PHILIPPINES",
    tagline: "Hidden Lagoons & Limestone Islands",
    region: "Palawan & Siargao",
    eyebrow: "Pearl of the Orient Seas",
    tags: ["beaches", "tropical"],
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Island_lagoon_in_Bacuit_Bay%2C_El_Nido%2C_Palawan%2C_Philippines.jpg?width=1600",
    rating: "9.6",
    price: "$420",
    badge: "Dry Season: Dec–May",
    airport: "Puerto Princesa (PPS)",
    description:
      "Turquoise lagoons ringed by limestone cliffs, island-hopping by bangka, and some of the warmest hospitality anywhere.",
    facts: {
      Population: "114 Million",
      Language: "Filipino, English",
      Currency: "Philippine Peso (₱)",
      "Time Zone": "PHT (UTC +8)",
      Capital: "Manila",
    },
    peakMonths: [1, 2, 3, 4],
    seasons: [
      { label: "Cool & Dry", cls: "s-spring", months: 2 },
      { label: "Hot & Dry", cls: "s-summer", months: 3 },
      { label: "Typhoon Season", cls: "s-winter", months: 6 },
      { label: "Cool & Dry", cls: "s-spring", months: 1 },
    ],
    seasonNote: "Check typhoon advisories between July and October.",
    bestSeason: "December – May",
    donts: [
      ["Don't Leave Trash on Beaches", "Many islands have strict eco rules."],
      ["Don't Skip Reef-Safe Sunscreen", "Required in some marine parks."],
      [
        "Don't Refuse Food Abruptly",
        "Decline politely — hospitality runs deep.",
      ],
      ["Don't Touch Coral", "Fines apply in protected areas."],
    ],
    experiences: [
      [
        "El Nido Island Hopping",
        "Full day · Lagoons and beaches",
        "$45",
        ["El Nido, Palawan"],
      ],
      [
        "Underground River Tour",
        "Half-day · UNESCO site",
        "$50",
        ["Puerto Princesa Subterranean River National Park"],
      ],
      [
        "Siargao Surf Lesson",
        "Morning · Cloud 9 break",
        "$30",
        ["Cloud 9 (surfing)", "Siargao"],
      ],
    ],
    transport: [
      ["Domestic Flights", "The fastest way between islands."],
      ["Bangka Boats", "Traditional outriggers for island hopping."],
      ["Tricycles & Vans", "Short hops and longer land transfers."],
    ],
  },
];

/* =========================================================
   MATCHING LOGIC
   Must-haves (✓) earn points; dealbreakers (✕) cost points.
========================================================= */

const PREF_KEY = "wanderlustPrefs";
const DEFAULT_PREFS = ["mountains", "cultural", "desert", "cliffs"];

function getPrefs() {
  try {
    const saved = JSON.parse(localStorage.getItem(PREF_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) {}
  return DEFAULT_PREFS;
}

function savePrefs(list) {
  localStorage.setItem(PREF_KEY, JSON.stringify(list));
}

function scoreDestination(dest, prefs) {
  const mustHaves = prefs;
  const dealbreakers = Object.keys(VIBES).filter((v) => !prefs.includes(v));

  const hits = dest.tags.filter((t) => mustHaves.includes(t)).length;
  const clashes = dest.tags.filter((t) => dealbreakers.includes(t)).length;

  // How many of the country's vibes are wanted, and how many wishes it covers
  const fit = hits / dest.tags.length;
  const coverage = mustHaves.length ? hits / mustHaves.length : 0;

  let score = 55 + fit * 30 + coverage * 15 - clashes * 6;
  return Math.max(40, Math.min(99, Math.round(score)));
}

function rankDestinations(prefs) {
  return DESTINATIONS.map((d) => ({
    ...d,
    match: scoreDestination(d, prefs),
  })).sort(
    (a, b) => b.match - a.match || parseFloat(b.rating) - parseFloat(a.rating),
  );
}
