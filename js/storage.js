/**
 * Prime House - LocalStorage State Management
 * Persistent storage for Favorites, User Listings, Inquiries and Moderation
 */

const STORAGE_KEYS = {
  FAVORITES: 'prime_house_favorites',
  PROPERTIES: 'prime_house_properties',
  INQUIRIES: 'prime_house_inquiries',
  MODERATION: 'prime_house_moderation',
  USER: 'prime_house_user'
};

class PrimeStorage {
  constructor() {
    this.init();
  }

  init() {
    // Initialize properties if empty or merge any new default properties
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES)) || [];
      if (typeof window !== 'undefined' && window.DEFAULT_PROPERTIES) {
        const storedIds = new Set(stored.map(p => p.id));
        let changed = false;
        window.DEFAULT_PROPERTIES.forEach(defProp => {
          if (!storedIds.has(defProp.id)) {
            stored.push(defProp);
            changed = true;
          }
        });
        if (stored.length === 0 || changed) {
          localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(stored.length > 0 ? stored : window.DEFAULT_PROPERTIES));
        }
      }
    } catch {
      if (typeof window !== 'undefined' && window.DEFAULT_PROPERTIES) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(window.DEFAULT_PROPERTIES));
      }
    }

    // Initialize favorites if empty
    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      // Default sample favorite to make demo immediately impressive
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['ph-alg-401', 'ph-ora-205']));
    }

    // Initialize inquiries if empty
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      const sampleInquiries = [
        {
          id: 'inq-101',
          date: '14/10/2026 11:30',
          name: 'Dr. Mehdi Slimani',
          email: 'mehdi.slimani@algerian-med.dz',
          phone: '+213 (0) 555 44 33 22',
          propertyId: 'ph-alg-401',
          propertyTitle: "Villa d'architecte contemporaine Hydra",
          type: 'Demande de visite privée',
          message: 'Bonjour, je souhaite organiser une visite discrète ce samedi à 14h pour cette propriété.',
          status: 'Nouveau'
        },
        {
          id: 'inq-102',
          date: '13/10/2026 16:45',
          name: 'Nadia Bouzid',
          email: 'nbouzid@invest-algeria.com',
          phone: '+213 (0) 661 88 99 00',
          propertyId: 'ph-loc-102',
          propertyTitle: 'Hôtel Particulier pour Résidence Diplomatique El Biar',
          type: 'Bail Diplomatique / Info',
          message: 'Nous représentons une mission diplomatique cherchant un bail pluriannuel renouvelable.',
          status: 'En cours'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(sampleInquiries));
    }

    // Initialize moderation queue if empty
    if (!localStorage.getItem(STORAGE_KEYS.MODERATION)) {
      const sampleModeration = [
        {
          id: 'mod-301',
          date: '14/10/2026',
          title: "Penthouse vue mer avec solarium privé Club des Pins",
          sellerName: 'Karim Ould-Ali',
          sellerPhone: '+213 550 11 22 33',
          sellerEmail: 'k.ouldali@gmail.com',
          wilaya: 'Alger',
          commune: 'Staouéli (Club des Pins)',
          price: 115000000,
          priceFormatted: '115 000 000 DA',
          surface: 420,
          bedrooms: 4,
          type: 'penthouse',
          status: 'vente',
          legalStatus: 'Livret foncier individuel & Acte notarié',
          moderationStatus: 'En attente',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.MODERATION, JSON.stringify(sampleModeration));
    }
  }

  // ================= FAVORITES =================
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  }

  isFavorite(propertyId) {
    const list = this.getFavorites();
    return list.includes(propertyId);
  }

  toggleFavorite(propertyId) {
    let list = this.getFavorites();
    const index = list.indexOf(propertyId);
    let added = false;
    if (index > -1) {
      list.splice(index, 1);
      added = false;
    } else {
      list.push(propertyId);
      added = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(list));
    this.emitEvent('favorites-changed', { propertyId, added, count: list.length });
    return added;
  }

  getFavoriteProperties() {
    const favIds = this.getFavorites();
    const all = this.getAllProperties();
    return all.filter(p => favIds.includes(p.id));
  }

  // ================= PROPERTIES =================
  getAllProperties() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES));
      if (stored && stored.length > 0) return stored;
    } catch (e) {}
    return (typeof window !== 'undefined' && window.DEFAULT_PROPERTIES) || [];
  }

  getPropertyById(id) {
    const all = this.getAllProperties();
    return all.find(p => p.id === id) || all[0];
  }

  saveProperty(property) {
    const all = this.getAllProperties();
    const existingIndex = all.findIndex(p => p.id === property.id);
    if (existingIndex > -1) {
      all[existingIndex] = { ...all[existingIndex], ...property };
    } else {
      all.unshift(property);
    }
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(all));
    this.emitEvent('properties-changed', { property });
    return property;
  }

  deleteProperty(id) {
    let all = this.getAllProperties();
    all = all.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(all));
    this.emitEvent('properties-changed', { deletedId: id });
  }

  // ================= INQUIRIES & VISITS =================
  getInquiries() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || [];
    } catch {
      return [];
    }
  }

  addInquiry(inquiry) {
    const all = this.getInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now(),
      date: new Date().toLocaleString('fr-FR'),
      status: 'Nouveau',
      ...inquiry
    };
    all.unshift(newInquiry);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(all));
    this.emitEvent('inquiry-added', { inquiry: newInquiry });
    return newInquiry;
  }

  updateInquiryStatus(id, newStatus) {
    const all = this.getInquiries();
    const item = all.find(i => i.id === id);
    if (item) {
      item.status = newStatus;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(all));
      this.emitEvent('inquiry-updated', { id, status: newStatus });
    }
  }

  deleteInquiry(id) {
    let all = this.getInquiries();
    all = all.filter(i => i.id !== id);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(all));
  }

  // ================= MODERATION & USER SUBMISSIONS =================
  getModerationList() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.MODERATION)) || [];
    } catch {
      return [];
    }
  }

  submitForModeration(listingData) {
    const list = this.getModerationList();
    const newMod = {
      id: 'mod-' + Date.now(),
      date: new Date().toLocaleDateString('fr-FR'),
      moderationStatus: 'En attente',
      ...listingData
    };
    list.unshift(newMod);
    localStorage.setItem(STORAGE_KEYS.MODERATION, JSON.stringify(list));
    this.emitEvent('moderation-added', { item: newMod });
    return newMod;
  }

  approveModeration(id) {
    const list = this.getModerationList();
    const item = list.find(m => m.id === id);
    if (item) {
      item.moderationStatus = 'Approuvé';
      localStorage.setItem(STORAGE_KEYS.MODERATION, JSON.stringify(list));

      // Also publish to active properties
      const newProperty = {
        id: 'ph-pub-' + Date.now(),
        ref: 'PH-USER-' + Math.floor(100 + Math.random() * 900),
        title: item.title,
        tagline: item.tagline || 'Exclusivité vérifiée Prime House',
        description: item.description || 'Bien certifié et vérifié par la modération foncière de Prime House.',
        price: Number(item.price),
        priceFormatted: Number(item.price).toLocaleString('fr-FR') + ' DA',
        pricePerM2: Math.round(Number(item.price) / (Number(item.surface) || 1)).toLocaleString('fr-FR') + ' DA / m²',
        type: item.type || 'villa',
        status: item.status || 'vente',
        isExclusive: true,
        isFeatured: false,
        legalStatus: item.legalStatus || 'Acte notarié & Livret foncier',
        wilaya: item.wilaya || 'Alger',
        commune: item.commune || 'Hydra',
        address: `${item.commune || 'Centre'}, ${item.wilaya || 'Alger'}`,
        bedrooms: Number(item.bedrooms) || 4,
        bathrooms: Number(item.bathrooms) || 3,
        surface: Number(item.surface) || 300,
        landSurface: Number(item.landSurface) || 0,
        livingRooms: 2,
        garages: 2,
        images: item.image ? [item.image] : [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM'
        ],
        features: item.features || ['Sécurité 24/7', 'Finitions haut standing', 'Bâche à eau'],
        agent: {
          name: 'Yacine Bensalem',
          role: 'Directeur Département Prestige',
          phone: '+213 (0) 560 12 34 56',
          email: 'yacine.bensalem@primehouse.dz',
          image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZqGMJ6u46ZFtKnqOYhF8zKewNKEkbWBAVIpOvuSh9Hd3I1Qc7Mruf55eX82b_90qhCIE-s_uZN3t26KsurdlGAkzm5RX96dH4piGvSR4XExzqevawTZm6YMhfRiObdFGNMDEsCApL4MYSnNavRK9ta21sRFRvo7IDWMfxfTd7gmZjXG4LNs5xQy0X8wa2w9gJqEbcACCY7hM3X8mmyxdLYcyLT0QoQ0nP6rL6Mvd4VnBO0V_4Dk0'
        }
      };
      this.saveProperty(newProperty);
      this.emitEvent('moderation-updated', { id, status: 'Approuvé' });
    }
  }

  rejectModeration(id) {
    const list = this.getModerationList();
    const item = list.find(m => m.id === id);
    if (item) {
      item.moderationStatus = 'Rejeté';
      localStorage.setItem(STORAGE_KEYS.MODERATION, JSON.stringify(list));
      this.emitEvent('moderation-updated', { id, status: 'Rejeté' });
    }
  }

  emitEvent(eventName, detail) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('prime:' + eventName, { detail }));
    }
  }
}

// Global instance
window.primeStorage = new PrimeStorage();
