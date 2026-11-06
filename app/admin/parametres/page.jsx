'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="fixed top-24 right-8 z-50 transform translate-y-[-120%] opacity-0 transition-all duration-500 ease-out flex items-center gap-3.5 bg-primary text-on-primary px-5 py-3.5 rounded-lg shadow-xl pointer-events-none" id="saveToast">
<div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[18px]">verified</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-surface-container-lowest leading-tight">Sauvegarde validée</span>
<span className="font-body-sm text-body-sm text-surface-container-highest">Paramètres enregistrés avec succès. Le portail public est à jour.</span>
</div>
<button className="ml-2 text-surface-variant hover:text-surface-container-lowest transition-colors pointer-events-auto" >
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>

<div className="flex flex-col gap-3 mb-8">
<div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
<span>Administration</span>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
<span>Taxonomie &amp; Config</span>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
<span className="text-secondary font-semibold">Paramètres du site</span>
</div>
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
<div className="flex flex-col max-w-3xl">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Paramètres Généraux &amp; Identité de l'Agence</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
          Gouvernance de la marque <span className="text-secondary font-semibold">PRIME HOUSE</span>, identité visuelle du portail, coordonnées officielles des chancelleries d'Alger et d'Oran, passerelles VIP et intégration cache.
        </p>
</div>

<div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-lg shadow-sm self-start lg:self-auto">
<div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">État Synchronisation</span>
<span className="font-title-md text-title-md text-on-surface">Edge Cache Actif • CDN DZ</span>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-1.5 shadow-sm mb-8 flex flex-wrap gap-1.5 items-center">
<button className="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all bg-primary text-on-primary shadow-sm" id="btn-tab-identity"  type="button">
<span className="material-symbols-outlined text-[18px]">storefront</span>
<span>Identité &amp; Vitrine</span>
</button>
<button className="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface" id="btn-tab-contacts"  type="button">
<span className="material-symbols-outlined text-[18px]">domain</span>
<span>Coordonnées &amp; Sièges</span>
</button>
<button className="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface" id="btn-tab-vip"  type="button">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span>Conciergerie &amp; WhatsApp</span>
</button>
<button className="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface" id="btn-tab-social"  type="button">
<span className="material-symbols-outlined text-[18px]">share</span>
<span>Réseaux &amp; Médias</span>
</button>
<button className="tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface" id="btn-tab-system"  type="button">
<span className="material-symbols-outlined text-[18px]">dns</span>
<span>Intégration &amp; Sécurité API</span>
</button>
</div>

<form className="flex flex-col gap-10 pb-28" id="settingsForm" >

<div className="tab-panel flex flex-col gap-8" id="tab-identity">

<div className="flex items-center justify-between pb-4">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section I</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Informations de la Marque &amp; Vitrine Publique</h2>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Indexation SEO &amp; En-tête</span>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between">
<span>Nom Officiel du Portail</span>
<span className="font-label-sm text-label-sm text-outline normal-case">Titre de la fenêtre browser</span>
</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline">verified</span>
<input className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="text" value="Prime House — Prestige Immobilier en Algérie"/>
</div>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between">
<span>Slogan de Prestige (Hero &amp; Metadata)</span>
<span className="font-label-sm text-label-sm text-outline normal-case">Sous-titre visible en vitrine</span>
</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline">auto_awesome</span>
<input className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="text" value="L'Excellence Foncière &amp; Immobilière en Algérie"/>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Description Publique (Français)</label>
<span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-bold">FR</span>
</div>
<textarea className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" rows="4">Première maison de courtage d'actifs d'exception et de résidences privées en Algérie. Mandats exclusifs, parcs diplomatiques et gestion de patrimoine confidentielle.</textarea>
</div>
<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Description Publique (العربية)</label>
<span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-bold">AR</span>
</div>
<textarea className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" dir="rtl" rows="4">الوكالة الرائدة في تسويق العقارات الفاخرة، القصور والفيلات الدبلوماسية في الجزائر العاصمة، وهران، وأرقى الوجهات الوطنية. خدمات وساطة راقية واستشارات استثمارية حصرية.</textarea>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">payments</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Devise de Référence</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Affichage standardisé</span>
</div>
</div>
<div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between">
<div className="flex flex-col">
<span className="font-currency-display text-currency-display text-on-surface">Dinar Algérien</span>
<span className="font-body-sm text-body-sm text-outline">Code ISO : DZD • Symbole : DA</span>
</div>
<span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">PAR DÉFAUT</span>
</div>
<div className="flex items-center justify-between pt-2">
<span className="font-body-sm text-body-sm text-on-surface-variant">Convertisseur Diaspora (EUR/USD)</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-5">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Actifs Graphiques Officiels</span>

<div className="flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-outline">Emblème Principal (Format SVG vectoriel)</span>
<div className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-12 h-12 rounded bg-primary-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[26px]">domain</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">prime-house-gold.svg</span>
<span className="font-label-sm text-label-sm text-outline">Vectoriel haute définition • 42 KB</span>
</div>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm" type="button">
                  Remplacer
                </button>
</div>
</div>

<div className="flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-outline">Favicon &amp; App Icon (PNG 512x512)</span>
<div className="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-secondary flex items-center justify-center text-on-secondary">
<span className="font-label-md text-label-md font-bold">PH</span>
</div>
<div className="flex flex-col">
<span className="font-body-sm text-body-sm text-on-surface font-semibold">favicon-prestige-dark.png</span>
<span className="font-label-sm text-label-sm text-outline">32x32 / 180x180 Retina</span>
</div>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm" type="button">
                  Changer
                </button>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="tab-panel flex flex-col gap-8" id="tab-contacts">

<div className="flex items-center justify-between pb-4">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section II</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Sièges Centraux &amp; Mentions Réglementaires</h2>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Agrément Ministériel Conforme</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

<div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary-container text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">location_city</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Siège Social &amp; Direction Générale</span>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide">Wilaya d'Alger (16)</span>
</div>
</div>
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Adresse Postale &amp; Cadastrale</label>
<div className="relative">
<span className="absolute left-4 top-3 material-symbols-outlined text-[20px] text-outline">pin_drop</span>
<textarea className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-2.5 rounded-lg font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" rows="2">Boulevard du 11 Décembre 1960, Résidence Les Pins, Val d'Hydra / El Biar, 16000 Alger</textarea>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Ligne Fixe Standard</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">call</span>
<input className="w-full bg-surface-container-low text-on-surface pl-10 pr-3 py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="text" value="+213 (0) 23 45 67 89"/>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Email de Chancellerie</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">mail</span>
<input className="w-full bg-surface-container-low text-on-surface pl-10 pr-3 py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="email" value="direction@primehouse-dz.com"/>
</div>
</div>
</div>

<div className="w-full h-36 rounded-lg bg-cover bg-center relative overflow-hidden flex items-end p-3 shadow-inner" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBil_lpxwjvh4M6ykgH7AgZf6W2pEBubsGTpJKcC98auchKVoylLFKZ8ByGPhrfb8QJhOw3c4Bss3DEzpX9F8GvTjoWaltQddxgJvnNQKNFrLoXWnGbFJr8mEPNYdTde1VgsaauxMe6PBJtUFc7e7TjWluBgpIm30eFt0PkPeiRZ0WPw129GZZ_wjPofE8M674-CdOJsLEP61GeiAlXBB3JtGCynSfD0EzKOEgbTlm1gTj1Jtdz0H8')" }}>
<div className="bg-primary/80 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-2 text-on-primary">
<span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
<span className="font-label-sm text-label-sm">Coordonnées GPS Fixées • 36.7441° N, 3.0298° E</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container text-on-surface flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">apartment</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Antenne Ouest &amp; Affaires Maritimes</span>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide">Wilaya d'Oran (31)</span>
</div>
</div>
<span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Adresse Postale Oran</label>
<div className="relative">
<span className="absolute left-4 top-3 material-symbols-outlined text-[20px] text-outline">pin_drop</span>
<textarea className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-2.5 rounded-lg font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" rows="2">Boulevard Front de Mer, Tour Bahia Center, 14ème Étage, 31000 Oran</textarea>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Ligne Directe Oran</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">call</span>
<input className="w-full bg-surface-container-low text-on-surface pl-10 pr-3 py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="text" value="+213 (0) 41 89 12 34"/>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Email Régional</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[18px] text-outline">mail</span>
<input className="w-full bg-surface-container-low text-on-surface pl-10 pr-3 py-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="email" value="oran@primehouse-dz.com"/>
</div>
</div>
</div>

<div className="p-4 rounded-lg bg-surface-container flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">Agrément Ministériel de l'Habitat &amp; Urbanisme</span>
<span className="material-symbols-outlined text-secondary text-[20px]">policy</span>
</div>
<div className="flex items-center gap-3">
<input className="bg-surface-container-lowest font-label-md text-label-md px-3 py-1.5 rounded font-mono text-on-surface w-48" type="text" value="N° 16-2025/DG-DGU"/>
<span className="font-body-sm text-body-sm text-on-surface-variant">Attestation de conformité validée pour transactions foncières nationales.</span>
</div>
</div>
</div>
</div>
</div>

<div className="tab-panel flex flex-col gap-8" id="tab-vip">

<div className="flex items-center justify-between pb-4">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section III</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Passerelles VIP &amp; Conciergerie Immobilière</h2>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Discrétion &amp; Réactivité 24/7</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">forum</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Canal WhatsApp Concierge Prioritaire</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Liaison chiffrée de bout en bout dédiée aux acquéreurs VIP</span>
</div>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Numéro Mobile Certifié Business API</label>
<div className="relative">
<span className="absolute left-4 top-1/2 -translate-y-1/2 font-title-md text-title-md text-secondary font-bold">DZ</span>
<input className="w-full bg-surface-container-low text-on-surface pl-14 pr-4 py-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all font-mono" type="text" value="+213 (0) 560 12 34 56"/>
</div>
<span className="font-label-sm text-label-sm text-outline">Actif sur le bouton flottant du site public pour les annonces &gt; 100 000 000 DA</span>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Message Automatique Pré-rempli (Deep-link WhatsApp)</label>
<textarea className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" rows="3">Bonjour Prime House, je souhaite obtenir le dossier confidentiel de présentation concernant la propriété réf : &#123;reference_bien&#125;. Merci de m'orienter vers un conseiller privé.</textarea>
<span className="font-label-sm text-label-sm text-outline">Les balises &#123;reference_bien&#125; et &#123;nom_bien&#125; sont dynamiquement injectées depuis chaque fiche bien.</span>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
<div className="flex flex-col gap-4">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Permanence &amp; SLA Conciergerie</span>
<div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Disponibilité Téléphonique</span>
<span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm">VIP 7J/7</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Ligne ouverte 08h00 - 22h00 pour consultations d'urgences notariales et visites privées par hélicoptère ou chauffeur privé.
              </p>
</div>
<div className="flex items-center justify-between pt-2">
<div className="flex flex-col">
<span className="font-body-md text-body-md text-on-surface font-semibold">Notification Push Instantanée</span>
<span className="font-body-sm text-body-sm text-outline">Alerter la direction sur chaque lead VIP</span>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
</div>
<div className="p-4 rounded-lg bg-surface-container flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[24px]">shield_person</span>
<span className="font-label-sm text-label-sm text-on-surface">Toutes les conversations conciergerie sont protégées par le secret professionnel et l'accord de confidentialité NDA systématique.</span>
</div>
</div>
</div>
</div>

<div className="tab-panel flex flex-col gap-8" id="tab-social">

<div className="flex items-center justify-between pb-4">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section IV</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Réseaux Sociaux &amp; Canaux Médias 4K</h2>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Visibilité Internationale</span>
</div>
<div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">business_center</span>
<span>LinkedIn Entreprise &amp; Investisseurs</span>
</label>
<input className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="url" value="https://linkedin.com/company/primehouse-prestige-algerie"/>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">photo_camera</span>
<span>Instagram Luxury Portfolio</span>
</label>
<input className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="url" value="https://instagram.com/primehouse.algerie"/>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">public</span>
<span>Facebook Pro &amp; Actualités Immobilières</span>
</label>
<input className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="url" value="https://facebook.com/primehouse.prestige"/>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">videocam</span>
<span>Chaîne YouTube Drone &amp; Visites 4K</span>
</label>
<input className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="url" value="https://youtube.com/@PrimeHousePrestigeImmoDZ"/>
</div>
</div>

<div className="mt-4 p-5 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface">
<span className="material-symbols-outlined text-[28px]">smart_display</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Production Visuelle &amp; Prises de Vues Aériennes</span>
<span className="font-body-sm text-body-sm text-outline">Toutes les capsules vidéo publiées sont hébergées sur le CDN Cloud privé avec compression HDR 60fps.</span>
</div>
</div>
<button className="whitespace-nowrap px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm" type="button">
            Vérifier les Flux
          </button>
</div>
</div>
</div>

<div className="tab-panel flex flex-col gap-8" id="tab-system">

<div className="flex items-center justify-between pb-4">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section V</span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Infrastructure Supabase &amp; Edge Sync</h2>
</div>
<span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Haute Disponibilité</span>
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
<div className="flex flex-col gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container text-secondary flex items-center justify-center">
<span className="material-symbols-outlined text-[22px]">cloud_sync</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Distribution Cache Edge &amp; Varnish</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Réseau CDN mondial &amp; PoP Alger (Algérie Télécom IXP)</span>
</div>
</div>
<p className="font-body-md text-body-md text-on-surface-variant">
              Lors de la mise à jour des coordonnées centrales ou des informations de vitrine, le cache statique Next.js / Supabase Edge peut nécessiter une purge pour actualiser immédiatement les clients sur mobile et desktop.
            </p>
</div>
<div className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline">Dernière purge manuelle effectuée</span>
<span className="font-title-md text-title-md text-on-surface" id="lastPurgeTime">Il y a 3 heures (14:32:09 GMT+1)</span>
</div>
<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-highest hover:bg-surface-tint hover:text-on-primary transition-all font-label-md text-label-md text-on-surface" id="purgeBtn"  type="button">
<span className="material-symbols-outlined text-[18px]">cached</span>
<span>Purger le cache Edge</span>
</button>
</div>
</div>

<div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Environnement Système Actif</span>
<div className="flex flex-col gap-3">
<div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
<span className="font-body-sm text-body-sm text-outline">Cluster PostgreSQL</span>
<span className="font-label-md text-label-md font-mono text-on-surface font-semibold">v15.2 Enterprise</span>
</div>
<div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
<span className="font-body-sm text-body-sm text-outline">Politiques Row Level Security</span>
<span className="font-label-md text-label-md font-mono text-secondary font-semibold">100% RLS Activé</span>
</div>
<div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
<span className="font-body-sm text-body-sm text-outline">Chiffrement Données Notariales</span>
<span className="font-label-md text-label-md font-mono text-on-surface font-semibold">AES-256 GCM</span>
</div>
</div>
<div className="flex items-center gap-2 text-outline font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">lock</span>
<span>Certificat SSL TLS 1.3 valide jusqu'en 2027</span>
</div>
</div>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
<div className="flex items-center gap-5">
<div className="w-14 h-14 rounded-full bg-primary-container text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[28px]">military_tech</span>
</div>
<div className="flex flex-col">
<span className="font-headline-sm text-headline-sm text-on-surface">Standard d'Excellence Prime House 2025</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Toute modification appliquée aux paramètres est enregistrée dans l'audit-log immuable sous la signature de Karim Benali.</span>
</div>
</div>
<div className="flex items-center gap-3">
<span className="px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">ID Session : DZ-ADMIN-8820-K</span>
</div>
</div>

<div className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest/95 backdrop-blur-xl py-4 px-8 shadow-xl z-40 flex items-center justify-between">
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-[20px]">info</span>
<span className="font-body-sm text-body-sm hidden sm:inline">Des modifications non enregistrées affecteront l'affichage public immédiatement après validation.</span>
</div>
<div className="flex items-center gap-4">
<button className="px-5 py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all font-label-md text-label-md"  type="button">
          Annuler les modifications
        </button>
<button className="flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all duration-200 shadow-md transform hover:-translate-y-0.5 font-label-md text-label-md font-bold" id="saveBtn" type="submit">
<span className="material-symbols-outlined text-[18px]">save</span>
<span>Enregistrer les paramètres</span>
</button>
</div>
</div>
</form>
</div>


      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-container" />}>
      <AdminContent />
    </Suspense>
  );
}
