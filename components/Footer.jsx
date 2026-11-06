'use client';

import { useState } from 'react';
import Link from 'next/link';
import WhatsAppIcon from './WhatsAppIcon';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-4px_24px_rgba(17,28,44,0.03)]">
      <div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-lg">
        {/* Newsletter Section */}
        <div className="bg-surface-container-low rounded-xl p-space-lg md:p-space-xl mb-space-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg">
          <div className="max-w-xl text-center lg:text-left">
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
              Collections Privées &amp; Off-Market
            </span>
            <h3 className="font-headline-md text-headline-md text-on-surface mt-space-xs font-semibold">
              Recevez nos opportunités exclusives en avant-première
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
              Inscrivez-vous pour accéder à nos résidences prestigieuses à Alger, Oran et Constantine avant leur diffusion publique.
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-space-sm items-center">
            <div className="relative w-full sm:w-80">
              <input
                className="w-full px-space-md py-space-sm rounded bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-[0_1px_4px_rgba(0,0,0,0.04)] focus:outline-none"
                placeholder="Votre adresse email d'exception..."
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="w-full sm:w-auto px-space-lg py-space-sm bg-primary-container text-surface rounded font-label-lg text-label-lg hover:bg-on-surface transition-colors whitespace-nowrap"
              type="submit"
            >
              {subscribed ? 'Bienvenue au Cercle' : 'Rejoindre le Cercle'}
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter-lg pb-space-xl">
          <div className="lg:col-span-2 flex flex-col gap-space-md pr-0 lg:pr-gutter">
            <div className="flex items-center gap-space-sm">
              <img
                alt="Prime House Logo"
                className="h-9 w-auto object-contain"
                style={{ height: '36px', width: 'auto' }}
                src="/assets/logo-p-transparent.png"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface uppercase font-bold tracking-tight">
                PRIME HOUSE
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Agence immobilière d'excellence en Algérie. Vente, location et gestion de biens de prestige à Alger, Oran et sur tout le territoire national.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs">
              <a
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-title-md">photo_camera</span>
              </a>
              <a
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-title-md">work</span>
              </a>
              <a
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all"
                href="#"
              >
                <span className="material-symbols-outlined text-title-md">public</span>
              </a>
              <a
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:text-secondary hover:bg-surface-container transition-all"
                href="https://wa.me/213560123456"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
              Nos Biens
            </h4>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?type=appartement">Appartements de luxe</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?type=villa">Villas d'architecte</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?type=terrain">Terrains constructibles</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?type=penthouse">Penthouses d'exception</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?type=commercial">Propriétés commerciales</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
              Villes Prestigieuses
            </h4>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?wilaya=Alger">Alger - Hydra &amp; El Biar</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?wilaya=Oran">Oran - Front de Mer</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?wilaya=Constantine">Constantine - Belle Vue</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?wilaya=Annaba">Annaba - Séraïdi</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/biens?wilaya=B%C3%A9ja%C3%AFa">Béjaïa - Littoral</Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-space-sm">
            <h4 className="font-title-md text-title-md text-on-surface uppercase tracking-wider font-semibold">
              Prime House
            </h4>
            <ul className="flex flex-col gap-space-xs">
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/a-propos">L'Agence &amp; Philosophie</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/contact">Nos Conseillers Privés</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/deposer-annonce">Déposer un bien</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/a-propos">Guide de l'acquéreur</Link>
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors">
                <Link href="/admin">Console d'Administration</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Sub-bar */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md text-on-surface-variant font-body-sm text-body-sm border-t border-surface-container-high/60">
          <div className="flex flex-col sm:flex-row items-center gap-space-md text-center sm:text-left">
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
              Boulevard du 11 Décembre, El Biar, Alger
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-label-md text-secondary">call</span>
              +213 (0) 23 45 67 89
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-label-md text-secondary">mail</span>
              contact@primehouse-dz.com
            </span>
          </div>
          <div className="text-center md:text-right font-label-sm text-label-sm">
            © 2026 Prime House Immobilier. Agréé par le Ministère de l'Habitat. Prix exprimés en Dinars Algériens (DA).
          </div>
        </div>
      </div>
    </footer>
  );
}

