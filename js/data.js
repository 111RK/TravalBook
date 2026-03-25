// ============================================
// TravelBook — Demo Data with real images
// ============================================

const IMG = {
  // Lisbonne
  lisbon_cover: 'https://images.unsplash.com/photo-1697633533011-8be9343ef38a?w=800&fit=crop&q=80',
  belem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/800px-Torre_Bel%C3%A9m_April_2009-4a.jpg',
  alfama: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg',
  pena: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg/800px-Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg',
  cascais: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Hell%27s_Mouth_Cascais.jpg',
  bertrand: 'https://upload.wikimedia.org/wikipedia/commons/6/65/LivrariaBertrand2.JPG',
  miradouro: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg',
  comercio: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Lisbon_%2836211708233%29_%28cropped%29.jpg',
  jeronimos: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png/800px-The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png',

  // Tokyo
  sensoji: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Sensoji_2023.jpg',
  golden_gai: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/G2_Street_20090626_2.jpg',
  nikko: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Nikko_Toshogu_Yomeimon_Gate_2024.jpg',
  shibuya: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg',
  shinjuku: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg/800px-Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg',
  meiji: 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Meiji_Jingu_2023-3.jpg',

  // Egypte
  cairo_museum: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/The_Egyptian_Museum.jpg/800px-The_Egyptian_Museum.jpg',
  pyramids: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg/800px-Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg',
  sphinx: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sphinx_with_the_third_pyramid.jpg/800px-Sphinx_with_the_third_pyramid.jpg',
  karnak: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Temple_de_Louxor_68.jpg',
  valley_kings: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg/800px-Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg',
  philae: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg/800px-File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg',
  nile: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Nile_3rd_Cataract_Left.jpg/800px-Nile_3rd_Cataract_Left.jpg',
  abu_simbel: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg/800px-Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg',
  hurghada: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Hurghada_Hotels_R03.jpg/800px-Hurghada_Hotels_R03.jpg',
  khan: 'https://upload.wikimedia.org/wikipedia/commons/7/74/%D8%AE%D8%A7%D9%86_%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%84%D9%8A_1.jpg'
};

const VOYAGES = [
  {
    id: 1,
    name: "Lisbonne",
    country: "Portugal",
    countryCode: "PT",
    dates: "15 - 20 Mars 2026",
    days: 6,
    style: "poetique",
    companions: ["Marie"],
    stats: { photos: 247, lieux: 6, mots: 4800, temp: "22\u00b0C" },
    badge: "ready",
    coverImg: IMG.lisbon_cover,
    chapters: [
      {
        day: "Jour 1", title: "Bel\u00e9m, o\u00f9 le temps s'arr\u00eate",
        place: { name: "Tour de Bel\u00e9m", rating: 4.6, reviews: 42831, address: "Bel\u00e9m, Lisbonne", duration: "2h15" },
        text: "Le soleil du matin caressait les pierres s\u00e9culaires de la Tour de Bel\u00e9m quand nous avons pos\u00e9 le pied sur le parvis. Marie a lev\u00e9 les yeux vers les tourelles ouvrag\u00e9es, et dans son regard, j'ai vu cette lumi\u00e8re que seuls les d\u00e9parts r\u00e9veillent. Le Tage murmurait \u00e0 nos pieds, portant avec lui des si\u00e8cles de d\u00e9parts et de retrouvailles.",
        photos: [
          { url: IMG.belem, selected: true },
          { url: IMG.jeronimos, selected: true },
          { url: IMG.comercio, selected: true },
          { url: IMG.lisbon_cover, selected: false }
        ]
      },
      {
        day: "Jour 2", title: "Alfama et les larmes du Fado",
        place: { name: "Alfama", rating: 4.5, reviews: 12453, address: "Alfama, Lisbonne", duration: "4h" },
        text: "Nous nous sommes perdus dans les ruelles d'Alfama comme on se perd dans un r\u00eave dont on ne veut pas se r\u00e9veiller. Chaque escalier grimpait vers un nouveau panorama, chaque azulejo racontait une histoire diff\u00e9rente. Le soir, dans un petit bar o\u00f9 la voix d'une fadiste emplissait l'espace, Marie a serr\u00e9 ma main.",
        photos: [
          { url: IMG.alfama, selected: true },
          { url: IMG.comercio, selected: true },
          { url: IMG.lisbon_cover, selected: false },
          { url: IMG.miradouro, selected: false }
        ]
      },
      {
        day: "Jour 3", title: "Sintra, le palais des r\u00eaves",
        place: { name: "Palais de Pena", rating: 4.5, reviews: 58320, address: "Sintra, Portugal", duration: "3h30" },
        text: "Sintra nous a accueillis dans une brume f\u00e9\u00e9rique, comme si la ville avait d\u00e9cid\u00e9 de jouer les contes de f\u00e9es. Le Palais de Pena, perch\u00e9 sur sa colline, explosait de couleurs \u2014 ocre, rouge, bleu \u2014 un ch\u00e2teau sorti d'un r\u00eave d'enfant.",
        photos: [
          { url: IMG.pena, selected: true },
          { url: IMG.lisbon_cover, selected: true },
          { url: IMG.jeronimos, selected: false }
        ]
      },
      {
        day: "Jour 4", title: "Cascais, le souffle de l'oc\u00e9an",
        place: { name: "Boca do Inferno", rating: 4.3, reviews: 8742, address: "Cascais, Portugal", duration: "1h45" },
        text: "L'oc\u00e9an Atlantique grondait \u00e0 la Boca do Inferno, crachant son \u00e9cume vers le ciel avec une fureur magnifique. Cascais, avec ses ruelles pastel et ses glaciers artisanaux, nous a offert la douceur apr\u00e8s la temp\u00eate.",
        photos: [
          { url: IMG.cascais, selected: true },
          { url: IMG.lisbon_cover, selected: false },
          { url: IMG.comercio, selected: false }
        ]
      },
      {
        day: "Jour 5", title: "Chiado, l'\u00e2me litt\u00e9raire",
        place: { name: "Librairie Bertrand", rating: 4.4, reviews: 5621, address: "Chiado, Lisbonne", duration: "2h" },
        text: "Au Chiado, nous avons march\u00e9 dans les pas de Pessoa. La librairie Bertrand, la plus ancienne du monde encore en activit\u00e9, sentait le papier et les promesses.",
        photos: [
          { url: IMG.bertrand, selected: true },
          { url: IMG.comercio, selected: true },
          { url: IMG.alfama, selected: false }
        ]
      },
      {
        day: "Jour 6", title: "Le dernier miradouro",
        place: { name: "Miradouro da Gra\u00e7a", rating: 4.7, reviews: 15230, address: "Gra\u00e7a, Lisbonne", duration: "1h30" },
        text: "Pour notre dernier soir, nous sommes mont\u00e9s au Miradouro da Gra\u00e7a. Lisbonne s'\u00e9talait sous nos yeux, un patchwork de toits orange, de fa\u00e7ades d\u00e9lav\u00e9es et de lumi\u00e8res naissantes.",
        photos: [
          { url: IMG.miradouro, selected: true },
          { url: IMG.comercio, selected: true },
          { url: IMG.lisbon_cover, selected: true },
          { url: IMG.alfama, selected: false }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Tokyo",
    country: "Japon",
    countryCode: "JP",
    dates: "8 - 11 Janvier 2026",
    days: 4,
    style: "journalistique",
    companions: ["Lucas", "Emma"],
    stats: { photos: 183, lieux: 8, mots: 3200, temp: "4\u00b0C" },
    badge: "pdf",
    coverImg: IMG.sensoji,
    chapters: [
      {
        day: "Jour 1", title: "Asakusa : le choc des mondes",
        place: { name: "Sens\u014d-ji", rating: 4.5, reviews: 72456, address: "Asakusa, Tokyo", duration: "2h30" },
        text: "Arriv\u00e9e \u00e0 Asakusa \u00e0 7h du matin, d\u00e9calage horaire oblige. Le temple Sens\u014d-ji \u00e9mergeait de la brume matinale, sa porte Kaminarimon drap\u00e9e de rouge et de lanternes massives.",
        photos: [
          { url: IMG.sensoji, selected: true },
          { url: IMG.meiji, selected: true },
          { url: IMG.shinjuku, selected: false }
        ]
      },
      {
        day: "Jour 2", title: "Golden Gai : 200 bars, 6 places",
        place: { name: "Golden Gai", rating: 4.3, reviews: 18230, address: "Shinjuku, Tokyo", duration: "3h" },
        text: "Shinjuku de nuit est un assaut sensoriel : n\u00e9ons, musique, foule compacte. Nous avons pouss\u00e9 la porte d'un bar de 6 places. Le patron, un ancien jazzman, nous a servi un whisky japonais.",
        photos: [
          { url: IMG.golden_gai, selected: true },
          { url: IMG.shinjuku, selected: true },
          { url: IMG.shibuya, selected: false },
          { url: IMG.sensoji, selected: false }
        ]
      },
      {
        day: "Jour 3", title: "Nikk\u014d sous la neige",
        place: { name: "T\u014dsh\u014dg\u016b Shrine", rating: 4.7, reviews: 9872, address: "Nikk\u014d, Japon", duration: "4h" },
        text: "Excursion \u00e0 Nikk\u014d, 2h de train au nord. La neige recouvrait tout. Le sanctuaire T\u014dsh\u014dg\u016b, class\u00e9 UNESCO, est un festival de sculptures dor\u00e9es et de boiseries laqu\u00e9es.",
        photos: [
          { url: IMG.nikko, selected: true },
          { url: IMG.meiji, selected: false },
          { url: IMG.sensoji, selected: false }
        ]
      },
      {
        day: "Jour 4", title: "Shibuya : le pouls de la capitale",
        place: { name: "Shibuya Crossing", rating: 4.4, reviews: 45623, address: "Shibuya, Tokyo", duration: "1h" },
        text: "Le carrefour de Shibuya est exactement ce qu'on imagine et pourtant rien ne pr\u00e9pare au choc de le vivre. 3 000 personnes traversent \u00e0 chaque feu vert.",
        photos: [
          { url: IMG.shibuya, selected: true },
          { url: IMG.shinjuku, selected: true },
          { url: IMG.meiji, selected: true },
          { url: IMG.golden_gai, selected: false }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "\u00c9gypte & Mer Rouge",
    country: "\u00c9gypte",
    countryCode: "EG",
    dates: "1 - 10 F\u00e9vrier 2026",
    days: 10,
    style: "poetique",
    companions: ["Marie"],
    stats: { photos: 412, lieux: 12, mots: 8100, temp: "29\u00b0C" },
    badge: "ready",
    coverImg: IMG.pyramids,
    chapters: [
      {
        day: "Jour 1", title: "Le Caire, le vertige des sens",
        place: { name: "Mus\u00e9e \u00e9gyptien", rating: 4.3, reviews: 31250, address: "Place Tahrir, Le Caire", duration: "3h" },
        text: "Le Caire vous saisit \u00e0 la gorge d\u00e8s la sortie de l'a\u00e9roport. Le Mus\u00e9e \u00e9gyptien, sur la place Tahrir, est un labyrinthe de merveilles. Marie s'est arr\u00eat\u00e9e devant le masque de Toutankhamon.",
        photos: [
          { url: IMG.cairo_museum, selected: true },
          { url: IMG.khan, selected: true },
          { url: IMG.pyramids, selected: false }
        ]
      },
      {
        day: "Jour 2-3", title: "Gizeh : face \u00e0 l'\u00e9ternit\u00e9",
        place: { name: "Pyramides de Gizeh", rating: 4.7, reviews: 89453, address: "Gizeh, \u00c9gypte", duration: "5h" },
        text: "Rien ne pr\u00e9pare \u00e0 l'\u00e9chelle des pyramides. On les a vues mille fois en photo, et pourtant, devant elles, on redevient tout petit. Le Sphinx souriait de son sourire \u00e9nigmatique.",
        photos: [
          { url: IMG.pyramids, selected: true },
          { url: IMG.sphinx, selected: true },
          { url: IMG.cairo_museum, selected: false },
          { url: IMG.nile, selected: false }
        ]
      },
      {
        day: "Jour 4-5", title: "Louxor, la cit\u00e9 des dieux",
        place: { name: "Temple de Karnak", rating: 4.8, reviews: 22340, address: "Louxor, \u00c9gypte", duration: "4h" },
        text: "Le temple de Karnak est une for\u00eat de colonnes qui d\u00e9fient l'imagination. Chaque pierre porte des hi\u00e9roglyphes vieux de trois mill\u00e9naires.",
        photos: [
          { url: IMG.karnak, selected: true },
          { url: IMG.valley_kings, selected: true },
          { url: IMG.nile, selected: true },
          { url: IMG.philae, selected: false }
        ]
      },
      {
        day: "Jour 6", title: "Assouan, la douceur du Sud",
        place: { name: "Temple de Philae", rating: 4.6, reviews: 11230, address: "Assouan, \u00c9gypte", duration: "2h30" },
        text: "Les felouques glissent sur le Nil avec une gr\u00e2ce intemporelle. Le temple de Philae tr\u00f4ne sur son \u00eele comme un joyau oubli\u00e9.",
        photos: [
          { url: IMG.philae, selected: true },
          { url: IMG.nile, selected: true },
          { url: IMG.karnak, selected: false }
        ]
      },
      {
        day: "Jour 7", title: "Abou Simbel : le lever du roi",
        place: { name: "Temple d'Abou Simbel", rating: 4.9, reviews: 15670, address: "Abou Simbel, \u00c9gypte", duration: "3h" },
        text: "R\u00e9veil \u00e0 3h du matin pour le convoi vers Abou Simbel. Les colosses de Rams\u00e8s II apparaissent dans la lumi\u00e8re de l'aube. Le spectacle est irr\u00e9el.",
        photos: [
          { url: IMG.abu_simbel, selected: true },
          { url: IMG.nile, selected: false },
          { url: IMG.pyramids, selected: false }
        ]
      },
      {
        day: "Jour 8-9", title: "Hurghada : le bleu infini",
        place: { name: "R\u00e9cif corallien Giftun", rating: 4.5, reviews: 8920, address: "Hurghada, Mer Rouge", duration: "6h" },
        text: "La Mer Rouge est un aquarium g\u00e9ant : poissons-clowns, raies manta, coraux fluorescents. Sous l'eau, le silence est total.",
        photos: [
          { url: IMG.hurghada, selected: true },
          { url: IMG.nile, selected: false }
        ]
      },
      {
        day: "Jour 10", title: "Le Caire, les adieux",
        place: { name: "Khan el-Khalili", rating: 4.2, reviews: 18450, address: "Le Caire, \u00c9gypte", duration: "2h" },
        text: "Le souk de Khan el-Khalili est un labyrinthe parfum\u00e9 d'\u00e9pices et de cuir. L'\u00c9gypte ne se visite pas, elle se vit.",
        photos: [
          { url: IMG.khan, selected: true },
          { url: IMG.cairo_museum, selected: true },
          { url: IMG.pyramids, selected: false },
          { url: IMG.sphinx, selected: false }
        ]
      }
    ]
  }
];

const SWIPE_PLACES = [
  { name: "Tour de Bel\u00e9m", rating: 4.6, reviews: 42831, address: "Bel\u00e9m, Lisbonne", duration: "2h15", img: IMG.belem },
  { name: "Alfama", rating: 4.5, reviews: 12453, address: "Alfama, Lisbonne", duration: "4h", img: IMG.alfama },
  { name: "Palais de Pena", rating: 4.5, reviews: 58320, address: "Sintra, Portugal", duration: "3h30", img: IMG.pena },
  { name: "Boca do Inferno", rating: 4.3, reviews: 8742, address: "Cascais, Portugal", duration: "1h45", img: IMG.cascais },
  { name: "Miradouro da Gra\u00e7a", rating: 4.7, reviews: 15230, address: "Gra\u00e7a, Lisbonne", duration: "1h30", img: IMG.miradouro }
];

const MAP_COUNTRIES = {
  "PT": { name: "Portugal", lat: 39.4, lon: -8.2, visited: true },
  "JP": { name: "Japon", lat: 36.2, lon: 138.3, visited: true },
  "EG": { name: "\u00c9gypte", lat: 26.8, lon: 30.8, visited: true, recent: true }
};

const MAP_ROUTES = {
  "PT": { from: [1.44, 43.6], to: [-8.2, 39.4] },
  "JP": { from: [1.44, 43.6], to: [138.3, 36.2] },
  "EG": { from: [1.44, 43.6], to: [30.8, 26.8] }
};

const COUNTRY_CODES_NUM = { "PT": "620", "JP": "392", "EG": "818", "FR": "250" };
