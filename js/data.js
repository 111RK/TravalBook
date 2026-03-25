// TravelBook — Data v3 (Pexels + Wikimedia)
const PX = (id, w=800) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
const WK = (path) => `https://upload.wikimedia.org/wikipedia/commons/${path}`;

const IMG = {
  // Splash
  splash: PX(3155666),  // beautiful travel sunset

  // Lisbonne
  lisbon1: PX(5069524), lisbon2: PX(16343720),
  belem: WK('thumb/6/65/Torre_Bel%C3%A9m_April_2009-4a.jpg/800px-Torre_Bel%C3%A9m_April_2009-4a.jpg'),
  alfama: WK('thumb/0/07/Lisbon_alfalma.jpg/800px-Lisbon_alfalma.jpg'),
  pena: PX(5511322),
  pena2: PX(9021550),
  cascais: WK('f/ff/Hell%27s_Mouth_Cascais.jpg'),
  bertrand: WK('6/65/LivrariaBertrand2.JPG'),
  comercio: WK('6/63/Lisbon_%2836211708233%29_%28cropped%29.jpg'),
  jeronimos: WK('thumb/d/d6/The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png/800px-The_Jer%C3%B3nimos_Monastery_or_Hieronymites_Monastery.png'),

  // Tokyo
  sensoji: PX(32630956),
  sensoji2: WK('4/43/Sensoji_2023.jpg'),
  golden_gai: WK('8/8d/G2_Street_20090626_2.jpg'),
  shinjuku: WK('thumb/d/d8/Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg/800px-Buildings_with_colorful_neon_street_signs_at_blue_hour%2C_Shinjuku%2C_Tokyo.jpg'),
  nikko: WK('b/b5/Nikko_Toshogu_Yomeimon_Gate_2024.jpg'),
  shibuya: PX(5860950),
  shibuya2: WK('8/88/Shibuya_Crossing%2C_Aerial.jpg'),
  meiji: WK('8/8b/Meiji_Jingu_2023-3.jpg'),

  // Egypte
  pyramids: PX(15127306),
  pyramids2: WK('thumb/e/e7/Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg/800px-Great_Pyramid_of_Giza_-_Pyramid_of_Khufu.jpg'),
  sphinx: WK('thumb/4/42/Sphinx_with_the_third_pyramid.jpg/800px-Sphinx_with_the_third_pyramid.jpg'),
  cairo: WK('thumb/7/71/The_Egyptian_Museum.jpg/800px-The_Egyptian_Museum.jpg'),
  karnak: WK('6/60/Temple_de_Louxor_68.jpg'),
  valley: WK('thumb/0/0c/Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg/800px-Luxor%2C_Tal_der_K%C3%B6nige_%281995%2C_860x605%29.jpg'),
  philae: WK('thumb/0/0f/File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg/800px-File%2C_Asu%C3%A1n%2C_Egipto%2C_2022-04-01%2C_DD_93.jpg'),
  nile: WK('thumb/1/12/Nile_3rd_Cataract_Left.jpg/800px-Nile_3rd_Cataract_Left.jpg'),
  abu_simbel: WK('thumb/b/b5/Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg/800px-Ramsis%2C_Aswan_Governorate%2C_Egypt_-_panoramio.jpg'),
  hurghada: PX(3100361),  // coral reef
  khan: WK('7/74/%D8%AE%D8%A7%D9%86_%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D9%84%D9%8A_1.jpg')
};

const VOYAGES = [
  {
    id:1, name:"Lisbonne", country:"Portugal", dates:"15–20 Mars 2026", days:6,
    companions:["Marie"], stats:{photos:247,lieux:6,mots:4800,temp:"22°C"},
    badge:"ok", cover:IMG.lisbon1,
    chapters:[
      { day:"Jour 1", title:"Belém, où le temps s'arrête",
        place:{name:"Tour de Belém",rating:4.6,reviews:42831,address:"Belém, Lisbonne",duration:"2h15"},
        text:"Le soleil du matin caressait les pierres séculaires de la Tour de Belém quand nous avons posé le pied sur le parvis. Marie a levé les yeux vers les tourelles ouvragées, et dans son regard, j'ai vu cette lumière que seuls les départs réveillent. Le Tage murmurait à nos pieds.",
        photos:[{url:IMG.belem,on:1},{url:IMG.jeronimos,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon2,on:0}]
      },
      { day:"Jour 2", title:"Alfama et les larmes du Fado",
        place:{name:"Alfama",rating:4.5,reviews:12453,address:"Alfama, Lisbonne",duration:"4h"},
        text:"Nous nous sommes perdus dans les ruelles d'Alfama comme on se perd dans un rêve dont on ne veut pas se réveiller. Chaque azulejo racontait une histoire différente. Le soir, dans un petit bar où la voix d'une fadiste emplissait l'espace, Marie a serré ma main.",
        photos:[{url:IMG.alfama,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon1,on:0},{url:IMG.lisbon2,on:0}]
      },
      { day:"Jour 3", title:"Sintra, le palais des rêves",
        place:{name:"Palais de Pena",rating:4.5,reviews:58320,address:"Sintra, Portugal",duration:"3h30"},
        text:"Sintra nous a accueillis dans une brume féerique. Le Palais de Pena, perché sur sa colline, explosait de couleurs — ocre, rouge, bleu — un château sorti d'un rêve d'enfant. Marie courait entre les terrasses, photographiant chaque détail.",
        photos:[{url:IMG.pena,on:1},{url:IMG.pena2,on:1},{url:IMG.lisbon1,on:0}]
      },
      { day:"Jour 4", title:"Cascais, le souffle de l'océan",
        place:{name:"Boca do Inferno",rating:4.3,reviews:8742,address:"Cascais, Portugal",duration:"1h45"},
        text:"L'océan Atlantique grondait à la Boca do Inferno, crachant son écume vers le ciel. Cascais, avec ses ruelles pastel et ses glaciers artisanaux, nous a offert la douceur après la tempête.",
        photos:[{url:IMG.cascais,on:1},{url:IMG.lisbon2,on:0},{url:IMG.comercio,on:0}]
      },
      { day:"Jour 5", title:"Chiado, l'âme littéraire",
        place:{name:"Librairie Bertrand",rating:4.4,reviews:5621,address:"Chiado, Lisbonne",duration:"2h"},
        text:"Au Chiado, nous avons marché dans les pas de Pessoa. La librairie Bertrand sentait le papier et les promesses. Marie a choisi un recueil de poésie portugaise.",
        photos:[{url:IMG.bertrand,on:1},{url:IMG.comercio,on:1},{url:IMG.alfama,on:0}]
      },
      { day:"Jour 6", title:"Le dernier miradouro",
        place:{name:"Miradouro da Graça",rating:4.7,reviews:15230,address:"Graça, Lisbonne",duration:"1h30"},
        text:"Lisbonne s'étalait sous nos yeux, un patchwork de toits orange et de lumières naissantes. Marie a posé sa tête sur mon épaule. Un tram jaune grimpait la colline.",
        photos:[{url:IMG.alfama,on:1},{url:IMG.lisbon1,on:1},{url:IMG.comercio,on:1},{url:IMG.lisbon2,on:0}]
      }
    ]
  },
  {
    id:2, name:"Tokyo", country:"Japon", dates:"8–11 Janv. 2026", days:4,
    companions:["Lucas","Emma"], stats:{photos:183,lieux:8,mots:3200,temp:"4°C"},
    badge:"pdf", cover:IMG.sensoji,
    chapters:[
      { day:"Jour 1", title:"Asakusa : le choc des mondes",
        place:{name:"Sensō-ji",rating:4.5,reviews:72456,address:"Asakusa, Tokyo",duration:"2h30"},
        text:"Le temple Sensō-ji émergeait de la brume matinale, sa porte Kaminarimon drapée de rouge et de lanternes massives. Le contraste avec les gratte-ciels résume tout Tokyo : un pied dans la tradition, l'autre dans le futur.",
        photos:[{url:IMG.sensoji,on:1},{url:IMG.sensoji2,on:1},{url:IMG.meiji,on:1},{url:IMG.shinjuku,on:0}]
      },
      { day:"Jour 2", title:"Golden Gai : 200 bars, 6 places",
        place:{name:"Golden Gai",rating:4.3,reviews:18230,address:"Shinjuku, Tokyo",duration:"3h"},
        text:"Dans les ruelles du Golden Gai, nous avons poussé la porte d'un bar de 6 places. Le patron, un ancien jazzman, nous a servi un whisky japonais en racontant ses années à New York.",
        photos:[{url:IMG.golden_gai,on:1},{url:IMG.shinjuku,on:1},{url:IMG.shibuya,on:0}]
      },
      { day:"Jour 3", title:"Nikkō sous la neige",
        place:{name:"Tōshōgū Shrine",rating:4.7,reviews:9872,address:"Nikkō, Japon",duration:"4h"},
        text:"La neige recouvrait tout. Le sanctuaire Tōshōgū, classé UNESCO, est un festival de sculptures dorées — excessif, magnifique, presque trop.",
        photos:[{url:IMG.nikko,on:1},{url:IMG.meiji,on:0},{url:IMG.sensoji2,on:0}]
      },
      { day:"Jour 4", title:"Shibuya : le pouls de la capitale",
        place:{name:"Shibuya Crossing",rating:4.4,reviews:45623,address:"Shibuya, Tokyo",duration:"1h"},
        text:"3 000 personnes traversent à chaque feu vert dans une chorégraphie improbable. Tokyo ne choisit pas entre ses époques : elle les empile.",
        photos:[{url:IMG.shibuya,on:1},{url:IMG.shibuya2,on:1},{url:IMG.shinjuku,on:1},{url:IMG.golden_gai,on:0}]
      }
    ]
  },
  {
    id:3, name:"Égypte", country:"Égypte", dates:"1–10 Fév. 2026", days:10,
    companions:["Marie"], stats:{photos:412,lieux:12,mots:8100,temp:"29°C"},
    badge:"ok", cover:IMG.pyramids,
    chapters:[
      { day:"Jour 1", title:"Le Caire, le vertige des sens",
        place:{name:"Musée égyptien",rating:4.3,reviews:31250,address:"Place Tahrir, Le Caire",duration:"3h"},
        text:"Le Musée égyptien est un labyrinthe de merveilles. Marie s'est arrêtée devant le masque de Toutankhamon, et le temps s'est figé.",
        photos:[{url:IMG.cairo,on:1},{url:IMG.khan,on:1},{url:IMG.pyramids,on:0}]
      },
      { day:"Jour 2–3", title:"Gizeh : face à l'éternité",
        place:{name:"Pyramides de Gizeh",rating:4.7,reviews:89453,address:"Gizeh, Égypte",duration:"5h"},
        text:"Rien ne prépare à l'échelle des pyramides. Le Sphinx souriait de son sourire énigmatique sous le soleil de plomb. Marie a pleuré — des larmes de beauté pure.",
        photos:[{url:IMG.pyramids,on:1},{url:IMG.sphinx,on:1},{url:IMG.pyramids2,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 4–5", title:"Louxor, la cité des dieux",
        place:{name:"Temple de Karnak",rating:4.8,reviews:22340,address:"Louxor, Égypte",duration:"4h"},
        text:"Le temple de Karnak est une forêt de colonnes qui défient l'imagination. Chaque pierre porte des hiéroglyphes vieux de trois millénaires.",
        photos:[{url:IMG.karnak,on:1},{url:IMG.valley,on:1},{url:IMG.nile,on:1},{url:IMG.philae,on:0}]
      },
      { day:"Jour 6", title:"Assouan, la douceur du Sud",
        place:{name:"Temple de Philae",rating:4.6,reviews:11230,address:"Assouan, Égypte",duration:"2h30"},
        text:"Les felouques glissent sur le Nil avec une grâce intemporelle. Le temple de Philae trône sur son île comme un joyau oublié.",
        photos:[{url:IMG.philae,on:1},{url:IMG.nile,on:1},{url:IMG.karnak,on:0}]
      },
      { day:"Jour 7", title:"Abou Simbel : le lever du roi",
        place:{name:"Temple d'Abou Simbel",rating:4.9,reviews:15670,address:"Abou Simbel, Égypte",duration:"3h"},
        text:"Les colosses de Ramsès II apparaissent dans la lumière de l'aube. Le spectacle est irréel. Ces statues de 20 mètres sont un hymne à la démesure humaine.",
        photos:[{url:IMG.abu_simbel,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 8–9", title:"Hurghada : le bleu infini",
        place:{name:"Récif corallien Giftun",rating:4.5,reviews:8920,address:"Hurghada, Mer Rouge",duration:"6h"},
        text:"La Mer Rouge est un aquarium géant. Sous l'eau, le silence est total, et la beauté si dense qu'on en oublie de respirer.",
        photos:[{url:IMG.hurghada,on:1},{url:IMG.nile,on:0}]
      },
      { day:"Jour 10", title:"Le Caire, les adieux",
        place:{name:"Khan el-Khalili",rating:4.2,reviews:18450,address:"Le Caire, Égypte",duration:"2h"},
        text:"Le souk est un labyrinthe parfumé d'épices et de cuir. L'Égypte ne se visite pas, elle se vit.",
        photos:[{url:IMG.khan,on:1},{url:IMG.cairo,on:1},{url:IMG.pyramids,on:0},{url:IMG.sphinx,on:0}]
      }
    ]
  }
];

const SWIPE_PLACES = [
  {name:"Tour de Belém",rating:4.6,reviews:42831,address:"Belém, Lisbonne",duration:"2h15",img:IMG.belem},
  {name:"Alfama",rating:4.5,reviews:12453,address:"Alfama, Lisbonne",duration:"4h",img:IMG.alfama},
  {name:"Palais de Pena",rating:4.5,reviews:58320,address:"Sintra, Portugal",duration:"3h30",img:IMG.pena},
  {name:"Boca do Inferno",rating:4.3,reviews:8742,address:"Cascais, Portugal",duration:"1h45",img:IMG.cascais},
  {name:"Miradouro da Graça",rating:4.7,reviews:15230,address:"Graça, Lisbonne",duration:"1h30",img:IMG.alfama}
];

const MAP_COUNTRIES={"PT":{name:"Portugal",lat:39.4,lon:-8.2,visited:1},"JP":{name:"Japon",lat:36.2,lon:138.3,visited:1},"EG":{name:"Égypte",lat:26.8,lon:30.8,visited:1,recent:1}};
const MAP_ROUTES={"PT":{from:[1.44,43.6],to:[-8.2,39.4]},"JP":{from:[1.44,43.6],to:[138.3,36.2]},"EG":{from:[1.44,43.6],to:[30.8,26.8]}};
const COUNTRY_CODES_NUM={"PT":"620","JP":"392","EG":"818","FR":"250"};
