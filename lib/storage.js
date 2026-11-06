/**
 * Prime House - LocalStorage State Management
 * Persistent storage for Favorites, User Listings, Inquiries, Language and Admin
 */

import { DEFAULT_PROPERTIES } from './data';
import { applyLanguage } from './i18n';

export const STORAGE_KEYS = {
  FAVORITES: 'prime_house_favorites',
  PROPERTIES: 'prime_house_properties',
  INQUIRIES: 'prime_house_inquiries',
  MODERATION: 'prime_house_moderation',
  USER: 'prime_house_user',
  LANGUAGE: 'prime_language',
  ADMIN_TOKEN: 'prime_admin_token',
  ADMIN_USER: 'prime_admin_user'
};

class StorageService {
  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }

  init() {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES)) || [];
      const storedIds = new Set(stored.map(p => p.id));
      let changed = false;

      DEFAULT_PROPERTIES.forEach(defProp => {
        if (!storedIds.has(defProp.id)) {
          stored.push(defProp);
          changed = true;
        }
      });

      if (stored.length === 0 || changed) {
        localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(stored.length > 0 ? stored : DEFAULT_PROPERTIES));
      }
    } catch {
      localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(DEFAULT_PROPERTIES));
    }

    if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(['ph-alg-401', 'ph-ora-205']));
    }

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
          status: 'nouveau'
        },
        {
          id: 'inq-102',
          date: '15/10/2026 16:45',
          name: 'Mme. Samia Khelifi',
          email: 'samia.khelifi@invest-dz.com',
          phone: '+213 (0) 661 98 76 54',
          propertyId: 'ph-ora-205',
          propertyTitle: 'Penthouse Miramar vue mer Oran',
          type: 'Offre d’achat / Négociation',
          message: 'Intéressée par ce penthouse. Pouvez-vous me confirmer la disponibilité du livret foncier individuel ?',
          status: 'en_cours'
        }
      ];
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(sampleInquiries));
    }
  }

  // --- Favorites ---
  getFavorites() {
    if (typeof window === 'undefined') return ['ph-alg-401', 'ph-ora-205'];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES)) || [];
    } catch {
      return [];
    }
  }

  isFavorite(propertyId) {
    return this.getFavorites().includes(propertyId);
  }

  toggleFavorite(propertyId) {
    if (typeof window === 'undefined') return false;
    let favs = this.getFavorites();
    let added = false;
    if (favs.includes(propertyId)) {
      favs = favs.filter(id => id !== propertyId);
      added = false;
    } else {
      favs.push(propertyId);
      added = true;
    }
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
    window.dispatchEvent(new CustomEvent('prime:favorites-changed', {
      detail: { propertyId, added, count: favs.length }
    }));
    return added;
  }

  // --- Properties ---
  getProperties() {
    if (typeof window === 'undefined') return DEFAULT_PROPERTIES;
    try {
      const p = JSON.parse(localStorage.getItem(STORAGE_KEYS.PROPERTIES));
      return Array.isArray(p) && p.length > 0 ? p : DEFAULT_PROPERTIES;
    } catch {
      return DEFAULT_PROPERTIES;
    }
  }

  getPropertyById(id) {
    const list = this.getProperties();
    return list.find(p => p.id === id || p.ref === id) || null;
  }

  addProperty(property) {
    if (typeof window === 'undefined') return property;
    const list = this.getProperties();
    const newProp = {
      ...property,
      id: property.id || `ph-prop-${Date.now()}`,
      ref: property.ref || `PH-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString()
    };
    list.unshift(newProp);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('prime:properties-changed'));
    return newProp;
  }

  updateProperty(id, data) {
    if (typeof window === 'undefined') return null;
    const list = this.getProperties();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) return null;
    list[idx] = { ...list[idx], ...data, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('prime:properties-changed'));
    return list[idx];
  }

  deleteProperty(id) {
    if (typeof window === 'undefined') return false;
    let list = this.getProperties();
    list = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('prime:properties-changed'));
    return true;
  }

  // --- Inquiries ---
  getInquiries() {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.INQUIRIES)) || [];
    } catch {
      return [];
    }
  }

  addInquiry(inquiry) {
    if (typeof window === 'undefined') return inquiry;
    const list = this.getInquiries();
    const newInq = {
      ...inquiry,
      id: inquiry.id || `inq-${Date.now()}`,
      date: inquiry.date || new Date().toLocaleString('fr-FR'),
      status: inquiry.status || 'nouveau'
    };
    list.unshift(newInq);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
    window.dispatchEvent(new CustomEvent('prime:inquiries-changed'));
    return newInq;
  }

  updateInquiryStatus(id, status) {
    if (typeof window === 'undefined') return null;
    const list = this.getInquiries();
    const item = list.find(i => i.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('prime:inquiries-changed'));
    }
    return item;
  }

  // --- Moderation ---
  getModerationList() {
    const list = this.getProperties();
    return list.filter(p => p.publication_status === 'moderation');
  }

  approveModeration(id) {
    const prop = this.getPropertyById(id);
    if (prop) {
      return this.updateProperty(prop.id, {
        publication_status: 'publie',
        updatedAt: new Date().toISOString()
      });
    }
    return null;
  }

  rejectModeration(id, reason = '', notes = '') {
    const prop = this.getPropertyById(id);
    if (prop) {
      return this.updateProperty(prop.id, {
        publication_status: 'archive',
        moderation_rejection_reason: reason,
        moderation_notes: notes,
        updatedAt: new Date().toISOString()
      });
    }
    return null;
  }

  // --- Language ---
  getLanguage() {
    if (typeof window === 'undefined') return 'fr';
    return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'fr';
  }

  setLanguage(lang) {
    if (typeof window === 'undefined') return;
    applyLanguage(lang, false);
  }

  // --- Admin User & Auth ---
  getAdminUser() {
    if (typeof window === 'undefined') return null;
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ADMIN_USER));
    } catch {
      return null;
    }
  }

  setAdminUser(user, token) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(user));
    if (token) localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, token);
  }

  clearAdminUser() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
  }
}

export const primeStorage = new StorageService();
if (typeof window !== 'undefined') {
  window.primeStorage = primeStorage;
}

