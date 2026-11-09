'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { applyLanguage, getCurrentLanguage } from '@/lib/i18n';

export default function MobileDrawer({ isOpen, onClose, favCount }) {
  const [currentLang, setCurrentLang] = useState('fr');

  useEffect(() => {
    setCurrentLang(getCurrentLanguage());
    const handleLangChange = (e) => {
      if (e?.detail?.lang) setCurrentLang(e.detail.lang);
    };
    window.addEventListener('prime:language-changed', handleLangChange);
    return () => window.removeEventListener('prime:language-changed', handleLangChange);
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-drawer"
      className="fixed inset-0 z-50 bg-primary-container/95 backdrop-blur-xl flex flex-col p-6 text-surface overflow-y-auto"
    >
      <div className="flex items-center justify-between pb-6 border-b border-surface-container-highest/20">
        <Link href="/" onClick={onClose} className="flex items-center gap-2">
          <img
            alt="Prime House"
            className="h-8 w-auto object-contain"
            style={{ height: '32px', width: 'auto' }}
            src="/assets/logo-p-transparent.png"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm font-bold tracking-tight uppercase text-surface">
              PRIME HOUSE
            </span>
            <span className="font-label-sm text-[10px] text-secondary-fixed tracking-widest uppercase">
              Algeria Luxury Estate
            </span>
          </div>
        </Link>
        <button
          className="w-10 h-10 rounded-full bg-surface-container-lowest/10 flex items-center justify-center text-surface hover:text-secondary-fixed text-xl transition-colors"
          onClick={onClose}
          type="button"
          aria-label="Fermer le menu"
        >
          ✕
        </button>
      </div>

      <div className="pt-4 flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-surface-variant font-medium">Langue / اللغة :</span>
        <div className="flex items-center gap-1 p-1 bg-surface-container-lowest/10 rounded-full border border-surface-container-highest/20">
          <button
            onClick={() => applyLanguage('fr', true)}
            type="button"
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              currentLang === 'fr'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-surface hover:text-secondary-fixed'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => applyLanguage('ar', true)}
            type="button"
            className={`px-3 py-1 rounded-full text-xs transition-all ${
              currentLang === 'ar'
                ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                : 'text-surface hover:text-secondary-fixed'
            }`}
          >
            العربية
          </button>
        </div>
      </div>

      <nav className="flex flex-col gap-2 py-6 text-base font-medium">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">home</span>
          <span>Accueil</span>
        </Link>
        <Link
          href="/biens?mode=vente"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">sell</span>
          <span>Acheter (Vente)</span>
        </Link>
        <Link
          href="/louer"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">key</span>
          <span>Louer (Locations de Prestige)</span>
        </Link>
        <Link
          href="/biens"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">domain</span>
          <span>Nos Biens (Tout le catalogue)</span>
        </Link>
        <Link
          href="/deposer-annonce"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary-container/20 text-secondary-fixed hover:bg-secondary-container/30 transition-colors font-semibold"
        >
          <span className="material-symbols-outlined">add_business</span>
          <span>Déposer une annonce</span>
        </Link>
        <Link
          href="/a-propos"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">info</span>
          <span>À Propos de Prime House</span>
        </Link>
        <Link
          href="/contact"
          onClick={onClose}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors"
        >
          <span className="material-symbols-outlined text-secondary-fixed">support_agent</span>
          <span>Contact & Conciergerie</span>
        </Link>

        <div className="pt-4 mt-2 border-t border-surface-container-highest/20 flex flex-col gap-2">
          <Link
            href="/admin"
            onClick={onClose}
            className="text-sm text-surface-variant hover:text-secondary-fixed flex items-center gap-3 px-3 py-2"
          >
            <span className="material-symbols-outlined text-base">admin_panel_settings</span>
            <span>Console d'Administration</span>
          </Link>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-surface-container-highest/20 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-surface-variant">
          <span>Conciergerie Privée :</span>
          <a
            href="tel:+213560123456"
            className="text-secondary-fixed font-semibold hover:underline"
          >
            +213 (0) 560 12 34 56
          </a>
        </div>
      </div>
    </div>
  );
}

