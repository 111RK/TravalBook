// ============================================
// TravelBook — Demo Data with real images
// ============================================

// Image sources: Wikimedia Commons (CC), Unsplash (free license)
const IMG = {
  // Lisbonne
  lisbon_cover: 'https://images.unsplash.com/photo-1697633533011-8be9343ef38a?w=800&fit=crop&q=80',
  belem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/800px-Torre_Bel%C3%A9m_April_2009-4a.jpg',
  alfama: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg',
  pena: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg/800px-Sintra_Portugal_Pal%C3%A1cio_da_Pena-01.jpg',
  cascais: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Hell%27s_Mouth_Cascais.jpg',
  bertrand: 'https://upload.wikimedia.org/wikipedia/commons/6/65/LivrariaBertrand2.JPG',
  miradouro: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg',

  // Tokyo
  sensoji: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Sensoji_2023.jpg',
  golden_gai: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/G2_Street_20090626_2.jpg',
  nikko: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Nikko_Toshogu_Yomeimon_Gate_2024.jpg',
  shibuya: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Shibuya_Crossing%2C_Aerial.jpg',

  // Egypte
  cairo_museum: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/The_Egyptian_Museum.jpg/800px-The_Egyptian_Museum.jpg',
  pyramids: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg/800px-Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg',
  karnak: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Temple_de_Louxor_68.jpg',
  philae: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg/800px-File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg',
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
        day: "Jour 1",
        title: "Bel\u00e9m, o\u00f9 le temps s'arr\u00eate",
        img: IMG.belem,
        place: { name: "Tour de Bel\u00e9m", rating: 4.6, reviews: 42831, address: "Bel\u00e9m, Lisbonne", duration: "2h15" },
        text: "Le soleil du matin caressait les pierres s\u00e9culaires de la Tour de Bel\u00e9m quand nous avons pos\u00e9 le pied sur le parvis. Marie a lev\u00e9 les yeux vers les tourelles ouvrag\u00e9es, et dans son regard, j'ai vu cette lumi\u00e8re que seuls les d\u00e9parts r\u00e9veillent. Le Tage murmurait \u00e0 nos pieds, portant avec lui des si\u00e8cles de d\u00e9parts et de retrouvailles."
      },
      {
        day: "Jour 2",
        title: "Alfama et les larmes du Fado",
        img: IMG.alfama,
        place: { name: "Alfama", rating: 4.5, reviews: 12453, address: "Alfama, Lisbonne", duration: "4h" },
        text: "Nous nous sommes perdus dans les ruelles d'Alfama comme on se perd dans un r\u00eave dont on ne veut pas se r\u00e9veiller. Chaque escalier grimpait vers un nouveau panorama, chaque azulejo racontait une histoire diff\u00e9rente. Le soir, dans un petit bar o\u00f9 la voix d'une fadiste emplissait l'espace, Marie a serr\u00e9 ma main. Le Fado, c'est la nostalgie d'un bonheur qu'on vit encore."
      },
      {
        day: "Jour 3",
        title: "Sintra, le palais des r\u00eaves",
        img: IMG.pena,
        place: { name: "Palais de Pena", rating: 4.5, reviews: 58320, address: "Sintra, Portugal", duration: "3h30" },
        text: "Sintra nous a accueillis dans une brume f\u00e9\u00e9rique, comme si la ville avait d\u00e9cid\u00e9 de jouer les contes de f\u00e9es. Le Palais de Pena, perch\u00e9 sur sa colline, explosait de couleurs \u2014 ocre, rouge, bleu \u2014 un ch\u00e2teau sorti d'un r\u00eave d'enfant. Marie courait entre les terrasses, photographiant chaque angle, chaque d\u00e9tail."
      },
      {
        day: "Jour 4",
        title: "Cascais, le souffle de l'oc\u00e9an",
        img: IMG.cascais,
        place: { name: "Boca do Inferno", rating: 4.3, reviews: 8742, address: "Cascais, Portugal", duration: "1h45" },
        text: "L'oc\u00e9an Atlantique grondait \u00e0 la Boca do Inferno, crachant son \u00e9cume vers le ciel avec une fureur magnifique. Nous sommes rest\u00e9s longtemps, hypnotis\u00e9s par cette danse \u00e9ternelle entre la roche et la mer. Cascais, avec ses ruelles pastel et ses glaciers artisanaux, nous a offert la douceur apr\u00e8s la temp\u00eate."
      },
      {
        day: "Jour 5",
        title: "Chiado, l'\u00e2me litt\u00e9raire",
        img: IMG.bertrand,
        place: { name: "Librairie Bertrand", rating: 4.4, reviews: 5621, address: "Chiado, Lisbonne", duration: "2h" },
        text: "Au Chiado, nous avons march\u00e9 dans les pas de Pessoa. La librairie Bertrand, la plus ancienne du monde encore en activit\u00e9, sentait le papier et les promesses. Marie a choisi un recueil de po\u00e9sie portugaise, et nous avons lu ensemble dans un caf\u00e9 o\u00f9 le temps semblait suspendu entre deux gorg\u00e9es de gal\u00e3o."
      },
      {
        day: "Jour 6",
        title: "Le dernier miradouro",
        img: IMG.miradouro,
        place: { name: "Miradouro da Gra\u00e7a", rating: 4.7, reviews: 15230, address: "Gra\u00e7a, Lisbonne", duration: "1h30" },
        text: "Pour notre dernier soir, nous sommes mont\u00e9s au Miradouro da Gra\u00e7a. Lisbonne s'\u00e9talait sous nos yeux, un patchwork de toits orange, de fa\u00e7ades d\u00e9lav\u00e9es et de lumi\u00e8res naissantes. Marie a pos\u00e9 sa t\u00eate sur mon \u00e9paule. En bas, un tram jaune grimpait la colline, et j'ai su que cette ville ne nous quitterait jamais vraiment."
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
        day: "Jour 1",
        title: "Asakusa : le choc des mondes",
        img: IMG.sensoji,
        place: { name: "Sens\u014d-ji", rating: 4.5, reviews: 72456, address: "Asakusa, Tokyo", duration: "2h30" },
        text: "Arriv\u00e9e \u00e0 Asakusa \u00e0 7h du matin, d\u00e9calage horaire oblige. Le temple Sens\u014d-ji \u00e9mergeait de la brume matinale, sa porte Kaminarimon drap\u00e9e de rouge et de lanternes massives. Lucas, d'ordinaire r\u00e9serv\u00e9, s'est arr\u00eat\u00e9 net. Le contraste avec les gratte-ciels visibles \u00e0 l'horizon r\u00e9sume tout Tokyo : un pied dans la tradition, l'autre dans le futur."
      },
      {
        day: "Jour 2",
        title: "Golden Gai : 200 bars, 6 places assises",
        img: IMG.golden_gai,
        place: { name: "Golden Gai", rating: 4.3, reviews: 18230, address: "Shinjuku, Tokyo", duration: "3h" },
        text: "Shinjuku de nuit est un assaut sensoriel : n\u00e9ons, musique, foule compacte. Mais c'est dans les ruelles du Golden Gai, six all\u00e9es \u00e9troites h\u00e9bergeant plus de 200 bars microscopiques, que la soir\u00e9e a bascul\u00e9. Nous avons pouss\u00e9 la porte d'un bar de 6 places. Le patron, un ancien jazzman, nous a servi un whisky japonais en racontant ses ann\u00e9es \u00e0 New York."
      },
      {
        day: "Jour 3",
        title: "Nikk\u014d sous la neige",
        img: IMG.nikko,
        place: { name: "T\u014dsh\u014dg\u016b Shrine", rating: 4.7, reviews: 9872, address: "Nikk\u014d, Japon", duration: "4h" },
        text: "Excursion \u00e0 Nikk\u014d, 2h de train au nord. La neige recouvrait tout. Le sanctuaire T\u014dsh\u014dg\u016b, class\u00e9 UNESCO, est un festival de sculptures dor\u00e9es et de boiseries laqu\u00e9es \u2014 excessif, magnifique, presque trop. Les singes \u00abne rien voir, ne rien entendre, ne rien dire\u00bb sont plus petits qu'on ne l'imagine."
      },
      {
        day: "Jour 4",
        title: "Shibuya : le pouls de la capitale",
        img: IMG.shibuya,
        place: { name: "Shibuya Crossing", rating: 4.4, reviews: 45623, address: "Shibuya, Tokyo", duration: "1h" },
        text: "Dernier jour. Le carrefour de Shibuya est exactement ce qu'on imagine et pourtant rien ne pr\u00e9pare au choc de le vivre. 3 000 personnes traversent \u00e0 chaque feu vert dans une chor\u00e9graphie improbable. Lucas a film\u00e9 au ralenti depuis le Starbucks en surplomb. Tokyo ne choisit pas entre ses \u00e9poques : elle les empile."
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
        day: "Jour 1",
        title: "Le Caire, le vertige des sens",
        img: IMG.cairo_museum,
        place: { name: "Mus\u00e9e \u00e9gyptien", rating: 4.3, reviews: 31250, address: "Place Tahrir, Le Caire", duration: "3h" },
        text: "Le Caire vous saisit \u00e0 la gorge d\u00e8s la sortie de l'a\u00e9roport : le bruit, la chaleur, l'humanit\u00e9 partout. Le Mus\u00e9e \u00e9gyptien, sur la place Tahrir, est un labyrinthe de merveilles. Marie s'est arr\u00eat\u00e9e devant le masque de Toutankhamon, et le temps s'est fig\u00e9."
      },
      {
        day: "Jour 2-3",
        title: "Gizeh : face \u00e0 l'\u00e9ternit\u00e9",
        img: IMG.pyramids,
        place: { name: "Pyramides de Gizeh", rating: 4.7, reviews: 89453, address: "Gizeh, \u00c9gypte", duration: "5h" },
        text: "Rien ne pr\u00e9pare \u00e0 l'\u00e9chelle des pyramides. On les a vues mille fois en photo, et pourtant, devant elles, on redevient tout petit. Le Sphinx souriait de son sourire \u00e9nigmatique sous le soleil de plomb. Marie a pleur\u00e9 \u2014 des larmes de beaut\u00e9 pure."
      },
      {
        day: "Jour 4-5",
        title: "Louxor, la cit\u00e9 des dieux",
        img: IMG.karnak,
        place: { name: "Temple de Karnak", rating: 4.8, reviews: 22340, address: "Louxor, \u00c9gypte", duration: "4h" },
        text: "Le vol int\u00e9rieur vers Louxor a r\u00e9v\u00e9l\u00e9 le Nil dans toute sa majest\u00e9 \u2014 un ruban vert dans un oc\u00e9an de sable. Le temple de Karnak est une for\u00eat de colonnes qui d\u00e9fient l'imagination. Chaque pierre porte des hi\u00e9roglyphes vieux de trois mill\u00e9naires."
      },
      {
        day: "Jour 6",
        title: "Assouan, la douceur du Sud",
        img: IMG.philae,
        place: { name: "Temple de Philae", rating: 4.6, reviews: 11230, address: "Assouan, \u00c9gypte", duration: "2h30" },
        text: "Assouan est une parenth\u00e8se de douceur dans un voyage d'intensit\u00e9. Les felouques glissent sur le Nil avec une gr\u00e2ce intemporelle. Le temple de Philae, rescap\u00e9 des eaux lors de la construction du barrage, tr\u00f4ne sur son \u00eele comme un joyau oubli\u00e9."
      },
      {
        day: "Jour 7",
        title: "Abou Simbel : le lever du roi",
        img: IMG.abu_simbel,
        place: { name: "Temple d'Abou Simbel", rating: 4.9, reviews: 15670, address: "Abou Simbel, \u00c9gypte", duration: "3h" },
        text: "R\u00e9veil \u00e0 3h du matin pour le convoi vers Abou Simbel. Trois heures de d\u00e9sert dans la nuit, puis soudain, les colosses de Rams\u00e8s II apparaissent dans la lumi\u00e8re de l'aube. Le spectacle est irr\u00e9el. Ces statues de 20 m\u00e8tres sont un hymne \u00e0 la d\u00e9mesure humaine."
      },
      {
        day: "Jour 8-9",
        title: "Hurghada : le bleu infini",
        img: IMG.hurghada,
        place: { name: "R\u00e9cif corallien Giftun", rating: 4.5, reviews: 8920, address: "Hurghada, Mer Rouge", duration: "6h" },
        text: "Changement radical de d\u00e9cor. La Mer Rouge est un aquarium g\u00e9ant : poissons-clowns, raies manta, coraux fluorescents. Sous l'eau, le silence est total, et la beaut\u00e9 si dense qu'on en oublie de respirer."
      },
      {
        day: "Jour 10",
        title: "Le Caire, les adieux",
        img: IMG.khan,
        place: { name: "Khan el-Khalili", rating: 4.2, reviews: 18450, address: "Le Caire, \u00c9gypte", duration: "2h" },
        text: "Dernier jour au Caire. Le souk de Khan el-Khalili est un labyrinthe parfum\u00e9 d'\u00e9pices et de cuir. Marie a dit : \u00abCe n'est pas l'objet qui compte, c'est le souvenir de l'avoir choisi ensemble.\u00bb L'\u00c9gypte ne se visite pas, elle se vit."
      }
    ]
  }
];

// Swipe demo places (Lisbonne)
const SWIPE_PLACES = [
  { name: "Tour de Bel\u00e9m", rating: 4.6, reviews: 42831, address: "Bel\u00e9m, Lisbonne", duration: "2h15", img: IMG.belem },
  { name: "Alfama", rating: 4.5, reviews: 12453, address: "Alfama, Lisbonne", duration: "4h", img: IMG.alfama },
  { name: "Palais de Pena", rating: 4.5, reviews: 58320, address: "Sintra, Portugal", duration: "3h30", img: IMG.pena },
  { name: "Boca do Inferno", rating: 4.3, reviews: 8742, address: "Cascais, Portugal", duration: "1h45", img: IMG.cascais },
  { name: "Miradouro da Gra\u00e7a", rating: 4.7, reviews: 15230, address: "Gra\u00e7a, Lisbonne", duration: "1h30", img: IMG.miradouro }
];

// Map data
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

const COUNTRY_CODES_NUM = {
  "PT": "620",
  "JP": "392",
  "EG": "818",
  "FR": "250"
};
