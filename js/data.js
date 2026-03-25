// TravelBook v6 — Data (rich narratives + companions + boarding passes + PDF templates)
const PX = (id, w=800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const WK = (path) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;

const IMG = {
  splash: PX(2265876),
  lisbon1: PX(5069524), lisbon2: PX(16343720),
  belem: WK('thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/800px-Torre_Bel%C3%A9m_April_2009-4a.jpg'),
  alfama: WK('thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg'),
  pena: PX(5511322), pena2: PX(9021550),
  cascais: WK('f/ff/Hell%27s_Mouth_Cascais.jpg'),
  bertrand: WK('6/65/LivrariaBertrand2.JPG'),
  comercio: WK('6/63/Lisbon_%2836211708233%29_%28cropped%29.jpg'),
  jeronimos: WK('thumb/d/d6/The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png/800px-The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png'),
  sensoji: WK('4/43/Sensoji_2023.jpg'),
  golden_gai: WK('8/8d/G2_Street_20090626_2.jpg'),
  shinjuku: WK('thumb/d/d8/Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg/800px-Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg'),
  nikko: WK('b/b5/Nikko_Toshogu_Yomeimon_Gate_2024.jpg'),
  shibuya: PX(5860950), shibuya2: WK('8/88/Shibuya_Crossing%2C_Aerial.jpg'),
  meiji: WK('8/8b/Meiji_Jingu_2023-3.jpg'),
  pyramids: PX(3522880), pyramids2: WK('thumb/e/e7/Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg/800px-Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg'),
  sphinx: WK('thumb/4/42/Sphinx_with_the_third_pyramid.jpg/800px-Sphinx_with_the_third_pyramid.jpg'),
  cairo: WK('thumb/7/71/The_Egyptian_Museum.jpg/800px-The_Egyptian_Museum.jpg'),
  karnak: WK('6/60/Temple_de_Louxor_68.jpg'),
  valley: WK('thumb/0/0c/Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg/800px-Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg'),
  philae: WK('thumb/0/0f/File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg/800px-File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg'),
  nile: WK('thumb/1/12/Nile_3rd_Cataract_Left.jpg/800px-Nile_3rd_Cataract_Left.jpg'),
  abu_simbel: WK('thumb/b/b5/Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg/800px-Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg'),
  hurghada: PX(3100361),
  khan: WK('7/74/%D8%AE%D8%A7%D9%86_%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%84%D9%8A_1.jpg')
};

// Companions with roles and gender (for face detection simulation)
const COMPANIONS = {
  raph: { name: "Raph", role: "Voyageur", gender: "M" },
  marie: { name: "Marie", role: "Conjointe", gender: "F" },
  lucas: { name: "Lucas", role: "Ami", gender: "M" },
  emma: { name: "Emma", role: "Amie", gender: "F" }
};

// Boarding passes for the Wallet
const BOARDING_PASSES = [
  {
    id: 'bp-1',
    airline: 'JAL',
    airlineFull: 'Japan Airlines',
    flight: 'JL045',
    from: 'CDG',
    fromCity: 'Paris Charles de Gaulle',
    to: 'NRT',
    toCity: 'Tokyo Narita',
    date: '8 Janv. 2026',
    dateRaw: '2026-01-08',
    time: '11:25',
    arrival: '06:45+1',
    seat: '23A',
    passenger: 'DUPONT/RAPH',
    gate: 'K42',
    boarding: '10:45',
    class: 'Economy',
    color: '#C8102E',
    voyageId: 2
  },
  {
    id: 'bp-2',
    airline: 'TAP',
    airlineFull: 'TAP Air Portugal',
    flight: 'TP435',
    from: 'TLS',
    fromCity: 'Toulouse Blagnac',
    to: 'LIS',
    toCity: 'Lisbonne Portela',
    date: '15 Mars 2026',
    dateRaw: '2026-03-15',
    time: '08:15',
    arrival: '09:30',
    seat: '12F',
    passenger: 'DUPONT/RAPH',
    gate: 'B14',
    boarding: '07:35',
    class: 'Economy',
    color: '#00965E',
    voyageId: 1
  },
  {
    id: 'bp-3',
    airline: 'MS',
    airlineFull: 'EgyptAir',
    flight: 'MS800',
    from: 'CDG',
    fromCity: 'Paris Charles de Gaulle',
    to: 'CAI',
    toCity: 'Le Caire International',
    date: '1 Fev. 2026',
    dateRaw: '2026-02-01',
    time: '14:10',
    arrival: '19:35',
    seat: '8B',
    passenger: 'DUPONT/RAPH',
    gate: 'E26',
    boarding: '13:30',
    class: 'Economy',
    color: '#002B5C',
    voyageId: 3
  }
];

// PDF Templates — formats + styles
const PDF_TEMPLATES = [
  {
    id: 'landscape-magazine',
    name: 'Magazine Paysage',
    desc: 'A4 paysage, doubles pages photos',
    format: 'a4', orientation: 'landscape',
    price: null, priceLabel: 'Gratuit',
    preview: 'linear-gradient(135deg, #1A1410 0%, #3A2A1A 100%)',
    icon: '📰'
  },
  {
    id: 'landscape-photobook',
    name: 'Livre Photo',
    desc: 'A4 paysage, photos dominantes',
    format: 'a4', orientation: 'landscape',
    price: null, priceLabel: 'Gratuit',
    preview: 'linear-gradient(135deg, #FAF7F2 0%, #E8D9C0 100%)',
    icon: '📷'
  },
  {
    id: 'a5-elegant',
    name: 'A5 Elegant',
    desc: 'A5 portrait, mise en page classique',
    format: 'a5', orientation: 'portrait',
    price: null, priceLabel: 'Gratuit',
    preview: 'linear-gradient(135deg, #F5F0E8 0%, #E0D8CC 100%)',
    icon: '📖'
  },
  {
    id: 'landscape-premium',
    name: 'Premium Voyage',
    desc: 'A4 paysage, design luxe noir & or',
    format: 'a4', orientation: 'landscape',
    price: 4.99, priceLabel: '4,99 EUR',
    preview: 'linear-gradient(135deg, #0D0A08 0%, #1A1410 100%)',
    icon: '✨'
  },
  {
    id: 'a5-carnet',
    name: 'Carnet de Route',
    desc: 'A5 portrait, esprit journal intime',
    format: 'a5', orientation: 'portrait',
    price: 2.99, priceLabel: '2,99 EUR',
    preview: 'linear-gradient(135deg, #E8D9C0 0%, #C8864A 100%)',
    icon: '📝'
  },
  {
    id: 'square',
    name: 'Carre Instagram',
    desc: '21x21cm, ideal pour impression',
    format: [210,210], orientation: 'portrait',
    price: 4.99, priceLabel: '4,99 EUR',
    preview: 'linear-gradient(135deg, #E8E0D4 0%, #C4B8A8 100%)',
    icon: '⬜'
  }
];

// Citations celebres par lieu (pour le PDF)
const QUOTES = {
  "Portugal": [
    {text: "Lisbonne est une ville qui garde les yeux ouverts sur la mer, comme si elle attendait encore le retour de ses navigateurs.", attr: "Jose Saramago"},
    {text: "Le Fado n'est pas triste, il est la nostalgie d'un bonheur qu'on vit encore.", attr: "Amalia Rodrigues"},
    {text: "Voyager, c'est decouvrir que tout le monde a tort.", attr: "Aldous Huxley"}
  ],
  "Japon": [
    {text: "Le Japon est le pays ou la tradition et la modernite dansent un tango permanent.", attr: "Amelie Nothomb"},
    {text: "A Tokyo, le silence est un luxe que l'on s'offre entre deux tempetes de neons.", attr: "Haruki Murakami"},
    {text: "Chaque temple raconte mille ans d'histoire dans un murmure.", attr: "Proverbe japonais"}
  ],
  "Egypte": [
    {text: "L'Egypte est un don du Nil.", attr: "Herodote"},
    {text: "Devant les pyramides, on comprend que l'homme a toujours reve plus grand que lui.", attr: "Victor Hugo"},
    {text: "Le desert enseigne la patience et l'emerveillement.", attr: "Antoine de Saint-Exupery"}
  ]
};

// Couleurs d'ambiance par pays (pour les fonds du PDF)
const COUNTRY_COLORS = {
  "Portugal": {bg: [245,228,200], accent: [180,120,60], dark: [60,40,20]},
  "Japon": {bg: [220,210,220], accent: [180,50,50], dark: [40,20,30]},
  "Egypte": {bg: [245,235,210], accent: [200,160,80], dark: [80,60,30]}
};

const VOYAGES = [
  {
    id:1, name:"Lisbonne", country:"Portugal", dates:"15-20 Mars 2026", days:6,
    companions:["Marie"], stats:{photos:247,lieux:6,mots:4800,temp:"22 C"},
    badge:"ok", cover:IMG.lisbon1, style:"Poetique",
    chapters:[
      { day:"Jour 1", title:"Belem, ou le temps s'arrete",
        pexelsQuery:"belem tower lisbon sunset",
        place:{name:"Tour de Belem",rating:4.6,reviews:42831,address:"Belem, Lisbonne",duration:"2h15"},
        faces:["raph","marie"],
        text:"Le soleil du matin caressait les pierres seculaires de la Tour de Belem quand nous avons pose le pied sur le parvis. Marie a leve les yeux vers les tourelles ouvragees, et dans son regard, j'ai vu cette lumiere que seuls les departs reveillent. Le Tage murmurait a nos pieds, portant avec lui des siecles de departs et de retrouvailles. Sur la premiere photo, on nous voit tous les deux devant la tour, Marie souriante, les cheveux dans le vent. Raph tient la carte du quartier de Belem, perdu comme toujours. On a ensuite visite le monastere des Jeronimos, chef-d'oeuvre du style manuelien, ou Marie est restee figee devant les voutes du cloitre. La lumiere filtrait a travers les arcs comme une dentelle de pierre. En milieu d'apres-midi, on s'est installe a la terrasse du cafe historique pour deguster les fameux pasteis de nata, encore tiedes. Marie a dit que c'etait le meilleur dessert de sa vie.",
        photos:[{url:IMG.belem,on:1},{url:IMG.jeronimos,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon2,on:0}]
      },
      { day:"Jour 2", title:"Alfama et les larmes du Fado",
        pexelsQuery:"alfama lisbon narrow streets tram",
        place:{name:"Alfama",rating:4.5,reviews:12453,address:"Alfama, Lisbonne",duration:"4h"},
        faces:["raph","marie"],
        text:"Nous nous sommes perdus dans les ruelles d'Alfama comme on se perd dans un reve dont on ne veut pas se reveiller. Chaque escalier grimpait vers un nouveau panorama, chaque azulejo racontait une histoire differente. Marie photographiait tout : les facades delavees, les chats endormis sur les rebords de fenetres, le linge colore suspendu entre les maisons. Sur une photo, on la voit accoudee a un balcon, le regard perdu vers le Tage qui scintille en contrebas. Raph a achete un petit azulejo peint a la main chez un artisan du quartier. Le soir, dans un petit bar ou la voix d'une fadiste emplissait l'espace, Marie a serre ma main. Le Fado, c'est la nostalgie d'un bonheur qu'on vit encore. On a partage une bouteille de vinho verde en ecoutant la musique, et le temps s'est arrete.",
        photos:[{url:IMG.alfama,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon1,on:0},{url:IMG.lisbon2,on:0}]
      },
      { day:"Jour 3", title:"Sintra, le palais des reves",
        pexelsQuery:"pena palace sintra colorful castle",
        place:{name:"Palais de Pena",rating:4.5,reviews:58320,address:"Sintra, Portugal",duration:"3h30"},
        faces:["raph","marie"],
        text:"Sintra nous a accueillis dans une brume feerique, comme si la ville avait decide de jouer les contes de fees. Le Palais de Pena, perche sur sa colline, explosait de couleurs : ocre, rouge, bleu, un chateau sorti d'un reve d'enfant. Marie courait entre les terrasses, photographiant chaque angle, chaque detail. Sur le selfie qu'on a pris sur la terrasse de la Reine, on voit toute la vallee de Sintra en arriere-plan, noyee dans la brume matinale. Raph essayait de comprendre le plan du palais, sans succes. On a aussi explore les jardins luxuriants qui entourent le palais, avec leurs grottes secretes et leurs fontaines cachees. Marie a trouve un banc cache sous un immense sequoia et on y est reste une bonne demi-heure, juste a ecouter le silence.",
        photos:[{url:IMG.pena,on:1},{url:IMG.pena2,on:1},{url:IMG.lisbon1,on:0}]
      },
      { day:"Jour 4", title:"Cascais, le souffle de l'ocean",
        pexelsQuery:"cascais portugal ocean cliffs waves",
        place:{name:"Boca do Inferno",rating:4.3,reviews:8742,address:"Cascais, Portugal",duration:"1h45"},
        faces:["raph","marie"],
        text:"L'ocean Atlantique grondait a la Boca do Inferno, crachant son ecume vers le ciel avec une fureur magnifique. Marie est restee fascinee au bord de la falaise, les yeux fermes, le visage offert aux embruns. Raph la photographiait en contre-jour, silhouette decoupee sur le bleu profond de l'ocean. On est ensuite descendu vers la plage de Cascais, ou les vagues venaient mourir sur le sable dore. On a mange un poulpe grille dans un petit restaurant de pecheurs, les pieds presque dans l'eau. Marie a dit que ce poulpe etait meilleur que celui de n'importe quel restaurant parisien. Cascais, avec ses ruelles pastel et ses glaciers artisanaux, nous a offert la douceur apres la tempete.",
        photos:[{url:IMG.cascais,on:1},{url:IMG.lisbon2,on:0},{url:IMG.comercio,on:0}]
      },
      { day:"Jour 5", title:"Chiado, l'ame litteraire",
        pexelsQuery:"chiado lisbon bookstore cafe",
        place:{name:"Librairie Bertrand",rating:4.4,reviews:5621,address:"Chiado, Lisbonne",duration:"2h"},
        faces:["raph","marie"],
        text:"Au Chiado, nous avons marche dans les pas de Pessoa. La librairie Bertrand, la plus ancienne du monde encore en activite, sentait le papier et les promesses. Marie a choisi un recueil de poesie portugaise, et nous avons lu ensemble dans un cafe ou le temps semblait suspendu entre deux gorgees de galao. Sur une photo, Marie est plongee dans son livre, le soleil eclairant les pages par la fenetre du cafe. Raph feuilletait un guide de Lisbonne, annotant les endroits a revisiter un jour. On a flane dans les rues du Chiado, s'arretant devant les vitrines des ceramistes, les galeries d'art contemporain, et la statue de Fernando Pessoa assise a la terrasse du cafe A Brasileira.",
        photos:[{url:IMG.bertrand,on:1},{url:IMG.comercio,on:1},{url:IMG.alfama,on:0}]
      },
      { day:"Jour 6", title:"Le dernier miradouro",
        pexelsQuery:"lisbon rooftops sunset panorama viewpoint",
        place:{name:"Miradouro da Graca",rating:4.7,reviews:15230,address:"Graca, Lisbonne",duration:"1h30"},
        faces:["raph","marie"],
        text:"Pour notre dernier soir, nous sommes montes au Miradouro da Graca. Lisbonne s'etalait sous nos yeux, un patchwork de toits orange, de facades delavees et de lumieres naissantes. Marie a pose sa tete sur mon epaule. En bas, un tram jaune grimpait la colline, et j'ai su que cette ville ne nous quitterait jamais vraiment. Sur la derniere photo du voyage, on voit nos deux silhouettes decoupees sur le coucher de soleil lisboete, le pont du 25 Avril en arriere-plan. Raph tenait Marie par la taille, et on souriait comme des enfants. On a ouvert une bouteille de porto pour feter notre dernier soir, en se promettant de revenir. Lisbonne est une ville qui vous adopte et qui ne vous laisse jamais vraiment partir.",
        photos:[{url:IMG.alfama,on:1},{url:IMG.lisbon1,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon2,on:0}]
      }
    ]
  },
  {
    id:2, name:"Tokyo", country:"Japon", dates:"8-11 Janv. 2026", days:4,
    companions:["Lucas","Emma"], stats:{photos:183,lieux:8,mots:3200,temp:"4 C"},
    badge:"pdf", cover:IMG.sensoji, style:"Journalistique",
    chapters:[
      { day:"Jour 1", title:"Asakusa : le choc des mondes",
        pexelsQuery:"sensoji temple tokyo red gate lantern",
        place:{name:"Senso-ji",rating:4.5,reviews:72456,address:"Asakusa, Tokyo",duration:"2h30"},
        faces:["raph","lucas","emma"],
        text:"Arrivee a Asakusa a 7h du matin, decalage horaire oblige. Le temple Senso-ji emergeait de la brume matinale, sa porte Kaminarimon drapee de rouge et de lanternes massives. Lucas, d'ordinaire reserve, s'est arrete net devant la porte. Emma a immediatement sorti son appareil photo. Le contraste avec les gratte-ciels visibles a l'horizon resume tout Tokyo : un pied dans la tradition, l'autre dans le futur. Sur la photo de groupe devant le temple, on voit Raph au centre, Lucas a gauche avec son bonnet noir, et Emma a droite, sourire jusqu'aux oreilles. On a remonte la Nakamise-dori, l'allee marchande qui mene au temple, ou Emma s'est arretee a chaque stand de mochi et de sensu. Lucas a achete un omamori porte-bonheur. On a ensuite traverse le fleuve Sumida pour admirer la Tokyo Skytree, avant de dejeuner dans un petit restaurant de ramen ou le patron ne parlait pas un mot d'anglais. Les meilleurs ramen de notre vie.",
        photos:[{url:IMG.sensoji,on:1},{url:IMG.meiji,on:1},{url:IMG.shinjuku,on:0}]
      },
      { day:"Jour 2", title:"Golden Gai : 200 bars, 6 places",
        pexelsQuery:"shinjuku golden gai tokyo neon alley night bars",
        place:{name:"Golden Gai",rating:4.3,reviews:18230,address:"Shinjuku, Tokyo",duration:"3h"},
        faces:["raph","lucas","emma"],
        text:"Shinjuku de nuit est un assaut sensoriel : neons, musique, foule compacte. Mais c'est dans les ruelles du Golden Gai, six allees etroites hebergeant plus de 200 bars microscopiques, que la soiree a bascule. Nous avons pousse la porte d'un bar de 6 places. Le patron, un ancien jazzman, nous a servi un whisky japonais en racontant ses annees a New York. Lucas et Emma etaient captives. Sur une photo prise dans ce minuscule bar, on voit Lucas accude au comptoir en bois, eclaire par une guirlande de lampions, en grande discussion avec le patron. Emma filmait la scene en riant. Raph testait son troisieme whisky. On a ensuite arpente trois autres bars, chacun avec sa propre ambiance : un bar de jazz, un bar a sake et un bar dedie aux mangas des annees 80. Emma a declare que c'etait la meilleure soiree de sa vie.",
        photos:[{url:IMG.golden_gai,on:1},{url:IMG.shinjuku,on:1},{url:IMG.shibuya,on:0}]
      },
      { day:"Jour 3", title:"Nikko sous la neige",
        pexelsQuery:"nikko toshogu shrine japan snow winter temple",
        place:{name:"Toshogu Shrine",rating:4.7,reviews:9872,address:"Nikko, Japon",duration:"4h"},
        faces:["raph","lucas","emma"],
        text:"Excursion a Nikko, 2h de train au nord. La neige recouvrait tout. Le sanctuaire Toshogu, classe UNESCO, est un festival de sculptures dorees et de boiseries laquees, excessif, magnifique, presque trop. Les singes ne rien voir, ne rien entendre, ne rien dire sont plus petits qu'on ne l'imagine. Emma a glisse sur un escalier verglace, plus de peur que de mal, Lucas l'a rattrapee juste a temps. La photo d'Emma surprise en plein derapage, bras en l'air, est devenue l'image iconique du voyage. Raph photographiait les details architecturaux, fascine par les couleurs eclatantes des sculptures sous la neige blanche. On a dejeune dans un ryokan traditionnel, assis sur des tatamis, devant un repas kaiseki d'une beaute presque trop parfaite pour etre mange. Le retour en Shinkansen, Tokyo illumine au loin, restera grave dans nos memoires. Lucas dormait, Emma relisait ses photos, Raph regardait par la fenetre.",
        photos:[{url:IMG.nikko,on:1},{url:IMG.meiji,on:0},{url:IMG.sensoji,on:0}]
      },
      { day:"Jour 4", title:"Shibuya : le pouls de la capitale",
        pexelsQuery:"shibuya crossing tokyo crowd night neon",
        place:{name:"Shibuya Crossing",rating:4.4,reviews:45623,address:"Shibuya, Tokyo",duration:"1h"},
        faces:["raph","lucas","emma"],
        text:"Dernier jour. Le carrefour de Shibuya est exactement ce qu'on imagine et pourtant rien ne prepare au choc de le vivre. 3 000 personnes traversent a chaque feu vert dans une choregraphie improbable. Lucas a filme au ralenti depuis le Starbucks en surplomb, captant ce ballet humain. Sur la video, on repere Emma dans la foule grace a son bonnet rouge. Raph l'a photographiee en plein milieu du carrefour, entouree de centaines d'inconnus, le sourire aux levres. On a ensuite explore le quartier de Harajuku, ou les adolescents en cosplay cotoyaient des seniors faisant du tai-chi dans le parc Yoyogi. On a fini la journee au Meiji-jingu, le grand sanctuaire shinto cache dans une foret de 70 hectares en plein coeur de Tokyo. Le silence y etait assourdissant apres le chaos de Shibuya. Tokyo ne choisit pas entre ses epoques : elle les empile. Au diner d'adieu, Lucas a leve son verre : A la prochaine aventure.",
        photos:[{url:IMG.shibuya,on:1},{url:IMG.shibuya2,on:1},{url:IMG.shinjuku,on:1},{url:IMG.golden_gai,on:0}]
      }
    ]
  },
  {
    id:3, name:"Egypte", country:"Egypte", dates:"1-10 Fev. 2026", days:10,
    companions:["Marie"], stats:{photos:412,lieux:12,mots:8100,temp:"29 C"},
    badge:"ok", cover:IMG.pyramids, style:"Poetique",
    chapters:[
      { day:"Jour 1", title:"Le Caire, le vertige des sens",
        pexelsQuery:"cairo egypt museum tahrir square",
        place:{name:"Musee egyptien",rating:4.3,reviews:31250,address:"Place Tahrir, Le Caire",duration:"3h"},
        faces:["raph","marie"],
        text:"Le Caire vous saisit a la gorge des la sortie de l'aeroport : le bruit, la chaleur, l'humanite partout. Le Musee egyptien, sur la place Tahrir, est un labyrinthe de merveilles mal eclairees et d'etiquettes jaunies. Marie s'est arretee devant le masque de Toutankhamon, et le temps s'est fige. Sur la photo, on voit son visage eclaire par le reflet dore du masque, les yeux brillants d'emotion. Raph s'est perdu trois fois dans les couloirs du musee, emerveille par chaque salle. On a vu des sarcophages, des momies royales, des bijoux vieux de 3 500 ans. A la sortie, un vendeur de jus de canne a sucre nous a offert un verre. Marie a dit que c'etait le meilleur jus de sa vie. Dehors, les klaxons reprenaient leur symphonie chaotique, mais nous etions ailleurs, perdus entre les siecles.",
        photos:[{url:IMG.cairo,on:1},{url:IMG.khan,on:1},{url:IMG.pyramids,on:0}]
      },
      { day:"Jour 2-3", title:"Gizeh : face a l'eternite",
        pexelsQuery:"pyramids giza egypt sphinx desert camel",
        place:{name:"Pyramides de Gizeh",rating:4.7,reviews:89453,address:"Gizeh, Egypte",duration:"5h"},
        faces:["raph","marie"],
        text:"Rien ne prepare a l'echelle des pyramides. On les a vues mille fois en photo, et pourtant, devant elles, on redevient tout petit. Le Sphinx souriait de son sourire enigmatique sous le soleil de plomb. Marie a pleure de vraies larmes de beaute pure. Sur notre plus belle photo du voyage, on voit Marie et Raph devant la grande pyramide de Kheops, minuscules face a cette montagne de pierre. Un chamelier nous a propose une balade, Marie a accepte immediatement. La photo de Marie sur le chameau, le soleil couchant derriere les pyramides, est digne d'un magazine. Le lendemain, Saqqara et la pyramide a degres. Plus ancienne, moins spectaculaire peut-etre, mais c'est ici que tout a commence. La premiere pierre posee vers l'eternite. On a explore le site pendant des heures, presque seuls, loin des foules de Gizeh.",
        photos:[{url:IMG.pyramids,on:1},{url:IMG.sphinx,on:1},{url:IMG.pyramids2,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 4-5", title:"Louxor, la cite des dieux",
        pexelsQuery:"karnak temple luxor egypt columns ancient",
        place:{name:"Temple de Karnak",rating:4.8,reviews:22340,address:"Louxor, Egypte",duration:"4h"},
        faces:["raph","marie"],
        text:"Le vol interieur vers Louxor a revele le Nil dans toute sa majeste, un ruban vert dans un ocean de sable. Le temple de Karnak est une foret de colonnes qui defient l'imagination. Chaque pierre porte des hieroglyphes vieux de trois millenaires. Marie marchait entre les colonnes geantes, la tete renversee, essayant de comprendre l'echelle de ce lieu. Sur une photo, Raph est minuscule au pied d'une colonne de 23 metres, ce qui donne une idee de la demesure. La Vallee des Rois, de l'autre cote du fleuve, nous a plonges dans l'obscurite solennelle des tombeaux royaux. L'echo de nos pas resonnait comme un murmure sacre. On est descendu dans le tombeau de Ramses VI, et les peintures murales, intactes depuis 3 000 ans, nous ont coupe le souffle.",
        photos:[{url:IMG.karnak,on:1},{url:IMG.valley,on:1},{url:IMG.nile,on:1},{url:IMG.philae,on:0}]
      },
      { day:"Jour 6", title:"Assouan, la douceur du Sud",
        pexelsQuery:"aswan nile felucca egypt temple island",
        place:{name:"Temple de Philae",rating:4.6,reviews:11230,address:"Assouan, Egypte",duration:"2h30"},
        faces:["raph","marie"],
        text:"Assouan est une parenthese de douceur dans un voyage d'intensite. Les felouques glissent sur le Nil avec une grace intemporelle. Le temple de Philae, rescape des eaux lors de la construction du barrage, trone sur son ile comme un joyau oublie. Sur la photo prise depuis la felouque, on voit le temple emerge des eaux, baigne dans la lumiere doree de fin d'apres-midi. Marie a achete un foulard nubien sur le marche, et le vendeur nous a offert le the a la menthe. Raph a negocie un bracelet en argent pendant vingt minutes pour economiser deux euros. Marie rigolait.",
        photos:[{url:IMG.philae,on:1},{url:IMG.nile,on:1},{url:IMG.karnak,on:0}]
      },
      { day:"Jour 7", title:"Abou Simbel : le lever du roi",
        pexelsQuery:"abu simbel temple egypt ramses statues",
        place:{name:"Temple d'Abou Simbel",rating:4.9,reviews:15670,address:"Abou Simbel, Egypte",duration:"3h"},
        faces:["raph","marie"],
        text:"Reveil a 3h du matin pour le convoi vers Abou Simbel. Trois heures de desert dans la nuit, Marie dormait contre mon epaule. Puis soudain, les colosses de Ramses II apparaissent dans la lumiere de l'aube. Le spectacle est irreel. Ces statues de 20 metres, deplacees pierre par pierre pour echapper a la montee des eaux, sont un hymne a la demesure humaine. Marie et moi sommes restes muets, main dans la main, devant cette merveille. Raph a pris des dizaines de photos sous tous les angles, essayant de capturer l'impossible. La plus belle montre Marie debout devant l'entree du temple, silhouette minuscule entre les jambes du colosse.",
        photos:[{url:IMG.abu_simbel,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 8-9", title:"Hurghada : le bleu infini",
        pexelsQuery:"red sea coral reef snorkeling underwater fish",
        place:{name:"Recif corallien Giftun",rating:4.5,reviews:8920,address:"Hurghada, Mer Rouge",duration:"6h"},
        faces:["raph","marie"],
        text:"Changement radical de decor. La Mer Rouge est un aquarium geant : poissons-clowns, raies manta, coraux fluorescents. La plongee avec masque et tuba a Giftun Island a ete un eblouissement. Sous l'eau, le silence est total, et la beaute si dense qu'on en oublie de respirer. Marie nageait comme une sirene au milieu des poissons multicolores. Raph essayait de prendre des photos sous-marines avec son telephone dans son etui etanche, avec un succes mitige. Le soir, sur la plage, le coucher de soleil a embrase la mer d'or et de pourpre. On est reste jusqu'a ce que les etoiles apparaissent. Marie a dit : Je crois que c'est le plus bel endroit ou j'ai jamais ete.",
        photos:[{url:IMG.hurghada,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 10", title:"Le Caire, les adieux",
        pexelsQuery:"khan el khalili cairo bazaar market spices",
        place:{name:"Khan el-Khalili",rating:4.2,reviews:18450,address:"Le Caire, Egypte",duration:"2h"},
        faces:["raph","marie"],
        text:"Dernier jour au Caire. Le souk de Khan el-Khalili est un labyrinthe parfume d'epices et de cuir. Nous avons negocie un plateau en cuivre que nous n'accrocherons probablement jamais. Marie a dit : Ce n'est pas l'objet qui compte, c'est le souvenir de l'avoir choisi ensemble. Sur la derniere photo du voyage, on voit nos deux mains enlacees tenant le plateau, avec les lumieres du souk en arriere-plan. L'Egypte ne se visite pas, elle se vit. Et elle ne vous quitte jamais. Dans le taxi vers l'aeroport, Marie relisait les notes qu'elle avait prises chaque soir. Dix jours, deux mille ans d'histoire, et un million de souvenirs.",
        photos:[{url:IMG.khan,on:1},{url:IMG.cairo,on:1},{url:IMG.pyramids,on:0},{url:IMG.sphinx,on:0}]
      }
    ]
  }
];

const SWIPE_PLACES = [
  {name:"Tour de Belem",rating:4.6,reviews:42831,address:"Belem, Lisbonne",duration:"2h15",img:IMG.belem},
  {name:"Alfama",rating:4.5,reviews:12453,address:"Alfama, Lisbonne",duration:"4h",img:IMG.alfama},
  {name:"Palais de Pena",rating:4.5,reviews:58320,address:"Sintra, Portugal",duration:"3h30",img:IMG.pena},
  {name:"Boca do Inferno",rating:4.3,reviews:8742,address:"Cascais, Portugal",duration:"1h45",img:IMG.cascais},
  {name:"Miradouro da Graca",rating:4.7,reviews:15230,address:"Graca, Lisbonne",duration:"1h30",img:IMG.alfama}
];

const MAP_COUNTRIES={"PT":{name:"Portugal",lat:39.4,lon:-8.2,visited:1},"JP":{name:"Japon",lat:36.2,lon:138.3,visited:1},"EG":{name:"Egypte",lat:26.8,lon:30.8,visited:1,recent:1}};
const MAP_ROUTES={"PT":{from:[1.44,43.6],to:[-8.2,39.4]},"JP":{from:[1.44,43.6],to:[138.3,36.2]},"EG":{from:[1.44,43.6],to:[30.8,26.8]}};
const COUNTRY_CODES_NUM={"PT":"620","JP":"392","EG":"818","FR":"250"};
