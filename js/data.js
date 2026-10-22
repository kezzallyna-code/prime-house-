/**
 * Prime House - Real Estate Data for Algeria
 * High-end luxury properties, categories, and wilayas
 */

const PRIME_WILAYAS = [
  { code: '16', name: 'Alger', name_ar: 'الجزائر العاصمة', communes: ['Hydra', 'El Biar', 'Sidi Fredj', 'Staouéli', 'Chéraga', 'Poirson', 'Ben Aknoun', 'El Mouradia', 'Golf'] },
  { code: '31', name: 'Oran', name_ar: 'وهران', communes: ['Miramar', 'Canastel', 'Akid Lotfi', 'Front de Mer', 'Belgaïd', 'Es Sénia'] },
  { code: '25', name: 'Constantine', name_ar: 'قسنطينة', communes: ['Belle Vue', 'Sidi Mabrouk', 'Ali Mendjeli', 'Zouaghi'] },
  { code: '23', name: 'Annaba', name_ar: 'عنابة', communes: ['Séraïdi', 'Chapuis', 'Saint-Cloud', 'Val Mascort'] },
  { code: '06', name: 'Béjaïa', name_ar: 'بجاية', communes: ['Cap Carbon', 'Tichy', 'Aokas', 'Boulimat'] }
];

const PRIME_CATEGORIES = [
  { id: 'villa', label: "Villa d'architecte", label_ar: 'فيلا معمارية', icon: 'villa', count: 48 },
  { id: 'penthouse', label: 'Penthouse & Duplex', label_ar: 'بنتهاوس ودوبلكس', icon: 'apartment', count: 32 },
  { id: 'appartement', label: 'Appartement Haut Standing', label_ar: 'شقة فاخرة', icon: 'domain', count: 45 },
  { id: 'terrain', label: 'Terrain Constructible', label_ar: 'أرض للبناء', icon: 'landscape', count: 14 },
  { id: 'commercial', label: 'Bureaux & Diplomatie', label_ar: 'مكاتب ومقرات دبلوماسية', icon: 'business_center', count: 9 }
];

const DEFAULT_PROPERTIES = [
  {
    id: 'ph-alg-401',
    ref: 'PH-ALG-401',
    title: "Villa d'architecte contemporaine avec piscine & spa privatif",
    title_ar: "فيلا عصرية فخمة مع مسبح خاص وسبا — حيدرة، الجزائر العاصمة",
    tagline: 'Propriété d’exception dans une impasse sécurisée d’Hydra',
    description: "Propriété d'exception située dans le quartier résidentiel le plus exclusif d'Hydra. Érigée sur un terrain paysager de 900 m², cette villa contemporaine déploie 620 m² habitables finis avec des matériaux d'une noblesse rare : marbre de Carrare au sol, boiseries en chêne massif, baies vitrées coulissantes sans seuil s'ouvrant sur une sublime piscine à débordement chauffée.",
    description_ar: "عقار استثنائي يقع في أرقى الأحياء الدبلوماسية بحيدرة. شُيد على أرض بمساحة 900 م²، بمساحة سكنية 620 م² مجهزة برخام كرارة وخشب السنديان الفاخر ومسبح دافئ بنظام تدفق لا متناهي.",
    price: 165000000,
    priceFormatted: '165 000 000 DA',
    pricePerM2: '266 129 DA / m²',
    type: 'villa',
    status: 'vente',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Acte notarié & Livret foncier',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Hydra',
    address: 'Quartier Résidentiel des Ambassades, Hydra, Alger',
    bedrooms: 6,
    bathrooms: 5,
    surface: 620,
    landSurface: 900,
    livingRooms: 2,
    garages: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I'
    ],
    features: [
      'Piscine à débordement chauffée',
      'Spa & Hammam traditionnel',
      'Domotique KNX intégrée',
      'Groupe électrogène 60 kVA insonorisé',
      'Bâche à eau 20 000 Litres avec filtration UV',
      'Poste de garde blindé et vidéosurveillance 4K',
      'Suite parentale de 75 m² avec double dressing',
      'Climatisation gainable réversible Inverter',
      'Cuisine italienne tout équipée Miele'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-ora-205',
    ref: 'PH-ORA-205',
    title: 'Penthouse Miramar avec terrasse panoramique sur la baie d’Oran',
    title_ar: 'بنتهاوس ميرامار مع تراس بانورامي على خليج وهران',
    tagline: 'Vue mer imprenable à 270 degrés au sommet d’une résidence privée',
    description: "Perché au 14ème étage d'un immeuble ultra-moderne sécurisé de Miramar, ce penthouse exclusif offre une vue spectaculaire sur la Méditerranée et le port d'Oran. Vaste terrasse privative de 120 m² aménagée avec jacuzzi extérieur.",
    description_ar: "يقع هذا البنتهاوس الاستثنائي في الطابق الـ14 من مبنى فائق الحداثة في ميرامار، موفراً إطلالة خلابة على البحر الأبيض المتوسط وميناء وهران، مع تراس واسع 120 م² مجهز بجاكوزي خارجي.",
    price: 92000000,
    priceFormatted: '92 000 000 DA',
    pricePerM2: '242 105 DA / m²',
    type: 'penthouse',
    status: 'vente',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Acte notarié & Livret foncier individuel',
    wilaya: 'Oran',
    wilayaCode: '31',
    commune: 'Miramar',
    address: 'Front de Mer Miramar, Oran',
    bedrooms: 4,
    bathrooms: 3,
    surface: 380,
    landSurface: 0,
    livingRooms: 2,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
    ],
    features: [
      'Terrasse suspendue 120 m² vue mer',
      'Jacuzzi extérieur 6 places',
      'Ascenseur privatif à clé avec accès direct',
      '2 places de stationnement en sous-sol',
      'Sécurité 24h/24 et conciergerie privée',
      'Parquet en chêne contrecollé'
    ],
    agent: {
      name: 'Amine Khelil',
      role: 'Responsable Région Ouest',
      phone: '+213 (0) 550 98 76 54',
      email: 'amine.khelil@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-alg-308',
    ref: 'PH-ALG-308',
    title: 'Duplex de Prestige avec terrasse et vue verdoyante',
    title_ar: 'دوبلكس راقٍ مع تراس وإطلالة على المساحات الخضراء — حيدرة',
    tagline: 'Emplacement d’exception à Hydra près des représentations diplomatiques',
    description: "Sublime duplex de 340 m² occupant les deux derniers étages d'une résidence confidentielle de haut standing. Volumes généreux avec salon cathédrale baigné de lumière naturelle, finitions ultra soignées et terrasse dînatoire.",
    description_ar: "دوبلكس فاخر بمساحة 340 م² يشغل الطابقين الأخيرين من إقامة خاصة بحيدرة، مع صالون بسقف مرتفع وتشطيبات دقيقة وتراس لتناول الطعام.",
    price: 78000000,
    priceFormatted: '78 000 000 DA',
    pricePerM2: '229 411 DA / m²',
    type: 'penthouse',
    status: 'vente',
    isExclusive: true,
    isFeatured: false,
    legalStatus: 'Acte notarié & Livret foncier',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Hydra',
    address: 'Chemin Mackley, Hydra, Alger',
    bedrooms: 4,
    bathrooms: 4,
    surface: 340,
    landSurface: 0,
    livingRooms: 2,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
    ],
    features: [
      'Salon cathédrale sous 5,5m de plafond',
      'Terrasse arborée sans vis-à-vis 50 m²',
      'Cuisine équipée avec îlot central en quartz',
      'Cave à vin climatisée',
      'Box fermé pour 2 SUV'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-loc-102',
    ref: 'PH-LOC-102',
    title: 'Hôtel Particulier pour Résidence Diplomatique ou Ambassade',
    title_ar: 'قصر خاص للإقامة الدبلوماسية أو السفارات — الأبيار',
    tagline: 'Standing institutionnel hautement sécurisé à El Biar',
    description: "Propriété de grand prestige conçue pour répondre aux exigences protocolaires et de sécurité les plus strictes. Idéalement située dans le quartier diplomatique d'El Biar, cette bâtisse somptueuse offre de grands salons de réception, plusieurs bureaux d'apparat et des logements de fonction.",
    description_ar: "عقار فاخر مصمم لتلبية أعلى المتطلبات الأمنية والبروتوكولية، يقع في الحي الدبلوماسي بالأبيار ويوفر صالونات استقبال فخمة ومكاتب رسمية.",
    price: 1800000,
    priceFormatted: '1 800 000 DA / mois',
    pricePerM2: '2 250 DA / m²',
    type: 'commercial',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail diplomatique notarié',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'El Biar',
    address: 'Quartier des Ambassades, Poirson / El Biar, Alger',
    bedrooms: 8,
    bathrooms: 7,
    surface: 800,
    landSurface: 1200,
    livingRooms: 4,
    garages: 6,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
    ],
    features: [
      'Conforme aux normes de sécurité diplomatique',
      'Grand salon de réception pour 120 convives',
      'Guérite de sécurité avec sas blindé',
      'Groupe électrogène 100 kVA',
      'Stationnement privatif pour 8 véhicules de cortège'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-loc-203',
    ref: 'PH-LOC-203',
    title: 'Villa Pieds dans l’Eau avec ponton privé et vue féérique',
    title_ar: 'فيلا على الواجهة البحرية مع رصيف خاص — سيدي فرج',
    tagline: 'Emplacement balnéaire rare et préservé à Sidi Fredj',
    description: "Une opportunité unique de résider en front de mer direct dans la baie prisée de Sidi Fredj. Villa baignée de lumière avec accès privatif au littoral, piscine au sel face aux flots et terrasses multiples.",
    description_ar: "فرصة فريدة للسكن على البحر مباشرة في خليج سيدي فرج الشهير، فيلا مشرقة مع مدخل خاص للشاطئ ومسبح بالمياه المالحة وتراسات متعددة.",
    price: 850000,
    priceFormatted: '850 000 DA / mois',
    pricePerM2: '1 888 DA / m²',
    type: 'villa',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail haut standing notarié',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Sidi Fredj',
    address: 'Baie Ouest, Sidi Fredj, Alger',
    bedrooms: 5,
    bathrooms: 4,
    surface: 450,
    landSurface: 800,
    livingRooms: 2,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU'
    ],
    features: [
      'Accès direct à la mer & ponton privé',
      'Piscine à débordement eau de mer chauffée',
      'Jardin méditerranéen avec palmiers et oliviers',
      'Logement indépendant pour gardien ou personnel',
      'Mobilier de designer italien inclus'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-ora-110',
    ref: 'PH-ORA-110',
    title: 'Villa Contemporaine sur les Hauteurs de Canastel',
    title_ar: 'فيلا عصرية في أعالي كانستيل — وهران',
    tagline: 'Architecture avant-gardiste dominant la corniche oranaise',
    description: "Chef d'œuvre d'architecture moderne situé sur les collines verdoyantes de Canastel à Oran. Vue imprenable sur le coucher de soleil méditerranéen, finitions ultra luxueuses avec ascenseur vitré intérieur.",
    description_ar: "تحفة معمارية حديثة على تلال كانستيل الخضراء بوهران، إطلالة ساحرة على غروب الشمس وتشطيبات فائقة الفخامة مع مصعد زجاجي داخلي.",
    price: 135000000,
    priceFormatted: '135 000 000 DA',
    pricePerM2: '245 454 DA / m²',
    type: 'villa',
    status: 'vente',
    isExclusive: true,
    isFeatured: false,
    legalStatus: 'Acte notarié & Livret foncier',
    wilaya: 'Oran',
    wilayaCode: '31',
    commune: 'Canastel',
    address: 'Belvédère de Canastel, Oran',
    bedrooms: 5,
    bathrooms: 5,
    surface: 550,
    landSurface: 750,
    livingRooms: 2,
    garages: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I'
    ],
    features: [
      'Piscine miroir chauffée à débordement',
      'Ascenseur panoramique intérieur en verre',
      'Cuisine semi-professionnelle inox et marbre',
      'Gymnasium privé avec sauna vitré',
      'Système solaire photovoltaïque avec batteries'
    ],
    agent: {
      name: 'Amine Khelil',
      role: 'Responsable Région Ouest',
      phone: '+213 (0) 550 98 76 54',
      email: 'amine.khelil@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-loc-305',
    ref: 'PH-LOC-305',
    title: 'Duplex F5 meublé & terrasse panoramique à Hydra',
    title_ar: 'دوبلكس ف5 مؤثث مع تراس بانورامي بحيدرة',
    tagline: 'Emplacement privilégié Résidence Les Pins avec vue dégagée',
    description: "Superbe duplex haut standing de 260 m² entièrement meublé par des décorateurs de renom. Salon cathédrale, grande terrasse privative de 60 m², cuisine allemande Bulthaup toute équipée et 2 places de parking sous-sol sécurisé.",
    description_ar: "دوبلكس راقٍ بمساحة 260 م² مؤثث بالكامل من أشهر مهندسي الديكور، صالون فسيح، تراس خاص 60 م²، ومطبخ ألماني مجهز بالكامل.",
    price: 450000,
    priceFormatted: '450 000 DA / mois',
    pricePerM2: '1 730 DA / m²',
    type: 'penthouse',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail notarié longue durée',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Hydra',
    address: 'Résidence Les Pins, Hydra, Alger',
    bedrooms: 4,
    bathrooms: 3,
    surface: 260,
    landSurface: 0,
    livingRooms: 2,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCdUQnxJtUQHXHcct54yJIWJrLhtgZvV1FIGEM0p2eH7MXEapQKfc43wkKjDD7N8O54jnOYF99vSlrw6b59Uh6GJxXuvXgWSgAM2ycLKF3-nEB8nyJygBGlG5HEBkyCBCBmuvIy6-BmARycggPnTGAnQ8u3UmxEjU5jE8FiVReMCA_Yp7H19ETrc7JzSmfY8M-PCnER4Cd9GzgcITSeCKILgrP1PlstkmeDcNsZqXH15MVVYZ6info',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
    ],
    features: [
      'Entièrement meublé haut de gamme',
      'Terrasse paysagère plein sud',
      'Climatisation centrale VRV',
      'Gardiennage & vidéosurveillance 24/7'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-loc-408',
    ref: 'PH-LOC-408',
    title: 'Villa contemporaine d’architecte avec piscine à Chéraga',
    title_ar: 'فيلا معمارية عصرية مع مسبح بالشراقة',
    tagline: 'Luxe contemporain et sérénité absolue à proximité des écoles internationales',
    description: "Villa neuve d'inspiration californienne d'une surface de 500 m² habitables. Piscine miroir extérieure chauffée, grand salon de réception avec baies vitrées de 4 mètres de haut, 5 suites spacieuses et quartier ultra calme.",
    description_ar: "فيلا جديدة مستوحاة من الطراز الكاليفورني بمساحة 500 م²، مسبح مدفأ مع شلال، صالون استقبال فسيح، و5 أجنحة راقية في حي هادئ وآمن.",
    price: 600000,
    priceFormatted: '600 000 DA / mois',
    pricePerM2: '1 200 DA / m²',
    type: 'villa',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail notarié résidentiel ou corporatif',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Chéraga',
    address: 'Quartier Résidentiel Les Vergers, Chéraga, Alger',
    bedrooms: 5,
    bathrooms: 5,
    surface: 500,
    landSurface: 700,
    livingRooms: 2,
    garages: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBfmgxheHn762wkIgeIJziaBSNhuWDpdc_JKV811T94wOydyUspkqqupjr7-1HE97JfsqurMC9OplS779wqUZF7gpAZ2k-AoRnKq9iOppq4V1xr89_OgTLR2XTu9tZ6J3HvOeoiunmqK-E0GgADm48O7hZMJPhUSYv4RQFtr1tfAYqDKHz_TSnXI_TURUDBB7eWKvJMrJF1Tue58c0ZEDks34AGNAu2xODnxwnNEsKkMHBu4j1qC08',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU'
    ],
    features: [
      'Piscine miroir chauffée avec cascade',
      'Jardin arboré éclairé par domotique',
      'Hammam et espace fitness',
      'Bâche à eau 15 000L et groupe 40 kVA'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-alg-502',
    ref: 'PH-ALG-502',
    title: 'Appartement de Maître F4 avec vue imprenable sur la baie d’Alger',
    title_ar: 'شقة ملكية ف4 بإطلالة بانورامية على خليج الجزائر — الأبيار',
    tagline: 'Résidence de très grand standing sécurisée à El Biar',
    description: "Appartement de prestige de 210 m² situé au 7ème étage d'un immeuble récent de haute renommée. Vue panoramique à couper le souffle sur le port et la mer Méditerranée. Double séjour de 75 m² orné de marbre Thassos, 3 suites avec dressings privatifs.",
    description_ar: "شقة استثنائية بمساحة 210 م² في الطابق السابع بإقامة راقية بالأبيار، إطلالة ساحرة على البحر وميناء الجزائر، صالون رخامي و3 أجنحة خاصة.",
    price: 58000000,
    priceFormatted: '58 000 000 DA',
    pricePerM2: '276 190 DA / m²',
    type: 'appartement',
    status: 'vente',
    isExclusive: false,
    isFeatured: true,
    legalStatus: 'Acte notarié & Livret foncier individuel',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'El Biar',
    address: 'Boulevard Bougara, El Biar, Alger',
    bedrooms: 3,
    bathrooms: 3,
    surface: 210,
    landSurface: 0,
    livingRooms: 1,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU'
    ],
    features: [
      'Vue mer panoramique à 180°',
      'Marbre blanc Thassos poli',
      'Ascenseur privatif codé',
      'Double box fermé en sous-sol'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  },
  {
    id: 'ph-alg-601',
    ref: 'PH-ALG-601',
    title: 'Terrain résidentiel d’exception constructible à Dely Ibrahim',
    title_ar: 'أرض سكنية استثنائية صالحة للبناء بدالي إبراهيم',
    tagline: 'Parcelle rare de 1 100 m² viabilisée avec permis de construire R+2',
    description: "Opportunité foncière rarissime dans le secteur le plus coté de Dely Ibrahim. Terrain plat, viabilisé (eau, électricité, gaz, fibre), bénéficiant d'une façade de 28 mètres et d'un certificat d'urbanisme vierge de toute servitude.",
    description_ar: "فرصة عقارية نادرة في أرقى أحياء دالي إبراهيم، قطعة أرض مستوية بمساحة 1100 م² ومجهزة بكافة الشبكات وواجهة 28 متراً مع رخصة بناء.",
    price: 120000000,
    priceFormatted: '120 000 000 DA',
    pricePerM2: '109 090 DA / m²',
    type: 'terrain',
    status: 'vente',
    isExclusive: true,
    isFeatured: false,
    legalStatus: 'Acte notarié & Livret foncier individuel',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Hydra',
    address: 'Zone Résidentielle Ain Allah, Dely Ibrahim, Alger',
    bedrooms: 0,
    bathrooms: 0,
    surface: 1100,
    landSurface: 1100,
    livingRooms: 0,
    garages: 0,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU'
    ],
    features: [
      'Certificat d’urbanisme R+2 validé',
      'Façade de 28 mètres linéaires',
      'Viabilisation complète en limite de parcelle',
      'Quartier résidentiel calme et sécurisé'
    ],
    agent: {
      name: 'Yacine Bensalem',
      role: 'Directeur Département Prestige',
      phone: '+213 (0) 560 12 34 56',
      email: 'yacine.bensalem@primehouse.dz',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
    }
  }
];

if (typeof window !== 'undefined') {
  window.PRIME_WILAYAS = PRIME_WILAYAS;
  window.PRIME_CATEGORIES = PRIME_CATEGORIES;
  window.DEFAULT_PROPERTIES = DEFAULT_PROPERTIES;
}
