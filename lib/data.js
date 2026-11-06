/**
 * Prime House - Real Estate Data for Algeria
 * High-end luxury properties, categories, and wilayas
 */

export const PRIME_WILAYAS = [
  { code: '16', name: 'Alger', name_ar: 'الجزائر العاصمة', communes: ['Hydra', 'El Biar', 'Sidi Fredj', 'Staouéli', 'Chéraga', 'Poirson', 'Ben Aknoun', 'El Mouradia', 'Golf'] },
  { code: '31', name: 'Oran', name_ar: 'وهران', communes: ['Miramar', 'Canastel', 'Akid Lotfi', 'Front de Mer', 'Belgaïd', 'Es Sénia'] },
  { code: '25', name: 'Constantine', name_ar: 'قسنطينة', communes: ['Belle Vue', 'Sidi Mabrouk', 'Ali Mendjeli', 'Zouaghi'] },
  { code: '23', name: 'Annaba', name_ar: 'عنابة', communes: ['Séraïdi', 'Chapuis', 'Saint-Cloud', 'Val Mascort'] },
  { code: '06', name: 'Béjaïa', name_ar: 'بجاية', communes: ['Cap Carbon', 'Tichy', 'Aokas', 'Boulimat'] }
];

export const PRIME_CATEGORIES = [
  { id: 'villa', label: "Villa d'architecte", label_ar: 'فيلا معمارية', icon: 'villa', count: 48 },
  { id: 'penthouse', label: 'Penthouse & Duplex', label_ar: 'بنتهاوس ودوبلكس', icon: 'apartment', count: 32 },
  { id: 'appartement', label: 'Appartement Haut Standing', label_ar: 'شقة فاخرة', icon: 'domain', count: 45 },
  { id: 'terrain', label: 'Terrain Constructible', label_ar: 'أرض للبناء', icon: 'landscape', count: 14 },
  { id: 'commercial', label: 'Bureaux & Diplomatie', label_ar: 'مكاتب ومقرات دبلوماسية', icon: 'business_center', count: 9 }
];

export const DEFAULT_PROPERTIES = [
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
      'Terrasse paysagère 120 m² avec jacuzzi',
      'Ascenseur privatif avec accès direct par code',
      'Domotique intégrée (éclairage & stores)',
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
    id: 'ph-alg-310',
    ref: 'PH-ALG-310',
    title: 'Duplex de prestige avec jardin suspendu & triple salon de réception',
    title_ar: 'دوبلكس راقٍ مع حديقة معلقة وصالون استقبال ثلاثي — حيدرة',
    tagline: 'L’élégance d’un hôtel particulier au cœur d’Hydra',
    description: "Conçu pour les réceptions de haut niveau, ce duplex de 450 m² habitables dispose d'une hauteur sous plafond de 3,60 mètres, de moulures artisanales et d'un patio végétalisé de 80 m².",
    description_ar: "صُمم لاستقبال كبار الشخصيات بمساحة 450 م² وارتفاع أسقف 3.60 متر، مع حديقة داخلية خاصة 80 م² في قلب حيدرة.",
    price: 115000000,
    priceFormatted: '115 000 000 DA',
    pricePerM2: '255 556 DA / m²',
    type: 'penthouse',
    status: 'vente',
    isExclusive: false,
    isFeatured: true,
    legalStatus: 'Acte notarié & Livret foncier',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'Hydra',
    address: 'Chemin Mackley, Hydra, Alger',
    bedrooms: 5,
    bathrooms: 4,
    surface: 450,
    landSurface: 80,
    livingRooms: 3,
    garages: 2,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I'
    ],
    features: [
      'Jardin d’hiver suspendu',
      'Cheminée centrale au bioéthanol',
      'Suite diplomatique indépendante',
      'Cave à vin climatisée'
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
    id: 'ph-loc-108',
    ref: 'PH-LOC-108',
    title: 'Hôtel particulier pour ambassade ou siège diplomatique à El Mouradia',
    title_ar: 'قصر فخم مخصص للسفارات والبعثات الدبلوماسية — المرادية',
    tagline: 'Sécurité maximale, guérite blindée et normes internationales',
    description: "Demeure d'exception de 850 m² bâtis sur 1 500 m² de terrain boisé. Conçue pour abriter une chancellerie ou la résidence d'un ambassadeur. Système de filtrage sécurisé, salle de crise, salons d'apparat.",
    description_ar: "قصر دبلوماسي استثنائي بمساحة 850 م² على أرض 1500 م² في المرادية، مجهز بكافة المعايير الأمنية الدولية وغرف اجتماعات وصالونات استقبال فسيحة.",
    price: 1800000,
    priceFormatted: '1 800 000 DA / mois',
    pricePerM2: '2 117 DA / m²',
    type: 'commercial',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail commercial ou diplomatique longue durée',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'El Mouradia',
    address: 'Quartier des Ministères, El Mouradia, Alger',
    bedrooms: 8,
    bathrooms: 6,
    surface: 850,
    landSurface: 1500,
    livingRooms: 4,
    garages: 6,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU'
    ],
    features: [
      'Guérite de sécurité pare-balles',
      'Générateur automatique 100 kVA',
      'Parc paysager clos de murs de 3,50m',
      'Fibre optique dédiée & baie de brassage'
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
    id: 'ph-loc-302',
    ref: 'PH-LOC-302',
    title: 'Villa contemporaine meublée avec piscine à débordement à Poirson',
    title_ar: 'فيلا مؤثثة بالكامل مع مسبح خاص بنظام تدفق لا متناهي — بوارسون',
    tagline: 'Location haut de gamme meublée par un designer italien',
    description: "Écrin de verdure au calme absolu dans le quartier très recherché de Poirson (El Biar). Villa moderne de 500 m² habitables sur terrain de 800 m², décorée et meublée avec raffinement.",
    description_ar: "فيلا فخمة مفروشة بأرقى الأثاث الإيطالي بمساحة 500 م² مع مسبح خاص وحديقة هادئة في حي بوارسون الراقي بالأبيار.",
    price: 950000,
    priceFormatted: '950 000 DA / mois',
    pricePerM2: '1 900 DA / m²',
    type: 'villa',
    status: 'location',
    isExclusive: true,
    isFeatured: true,
    legalStatus: 'Bail résidentiel meublé',
    wilaya: 'Alger',
    wilayaCode: '16',
    commune: 'El Biar',
    address: 'Quartier Poirson, El Biar, Alger',
    bedrooms: 5,
    bathrooms: 4,
    surface: 500,
    landSurface: 800,
    livingRooms: 2,
    garages: 3,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
    ],
    features: [
      'Mobilier de marque Poliform & Minotti',
      'Piscine extérieure chauffée',
      'Système d’alarme avec télésurveillance',
      'Chambre de service et buanderie équipée'
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

