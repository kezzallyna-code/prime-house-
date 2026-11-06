'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';
import { ALL_WILAYAS } from '@/lib/data';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="relative w-full mb-8">
<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-surface-variant/40">
<div className="flex flex-col gap-2 max-w-3xl">
<div className="flex items-center gap-3">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm tracking-wider uppercase font-semibold">Parc Prestige Algérie</span>
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">16 Wilayas Couvertes</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestion du Parc Immobilier</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Contrôlez, filtrez et administrez l'ensemble des mandats exclusifs de vente et de location sur le territoire national avec validation cadastrale et suivi notarié.
        </p>
</div>
<div className="flex flex-wrap items-center gap-3">

<div className="relative" id="bulk-menu-container">
<button className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md" id="bulk-menu-btn" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
<span>Actions groupées</span>
<span className="material-symbols-outlined text-[16px] text-outline">arrow_drop_down</span>
</button>
<div className="hidden absolute right-0 mt-2 w-56 rounded-xl bg-surface-container-lowest shadow-2xl p-2 z-30 ring-1 ring-black/5" id="bulk-dropdown">
<button className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">publish</span>
<span>Publier la sélection</span>
</button>
<button className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-on-surface-variant">unpublished</span>
<span>Dépublier la sélection</span>
</button>
<button className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
<span>Exporter en CSV / Excel</span>
</button>
<div className="h-px bg-surface-variant/40 my-1"></div>
<button className="w-full text-left px-3 py-2 rounded-lg text-error hover:bg-error-container/30 transition-colors font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[18px] text-error">delete</span>
<span>Archiver la sélection</span>
</button>
</div>
</div>

<a className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-secondary text-surface-container-lowest font-label-md text-label-md uppercase tracking-wide hover:brightness-105 active:scale-[0.99] transition-all shadow-md" href="#">
<span className="material-symbols-outlined text-[18px]">add</span>
<span>Ajouter un bien</span>
</a>
</div>
</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Actifs en vitrine</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">128</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">trending_up</span> +8 ce mois
          </span>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">verified</span>
</div>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">En Vérification</span>
<span className="font-currency-display text-currency-display text-secondary mt-1">14</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Dossiers fonciers DZ</span>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">hourglass_top</span>
</div>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Valeur Mandats Vente</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">4.82 <span className="font-label-sm text-label-sm text-secondary font-bold">Mrd DA</span></span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Alger, Oran, Annaba</span>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">account_balance</span>
</div>
</div>
<div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Consultations / 30j</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">64.2k</span>
<span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">group</span> 420 leads qualifiés
          </span>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">visibility</span>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-4 mb-6">

<div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-2 rounded-xl shadow-sm">
<nav className="flex flex-wrap items-center gap-1">
<button className="px-4 py-2 rounded-lg bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all" type="button">
<span>Tous</span>
<span className="px-2 py-0.5 rounded-full bg-secondary text-surface-container-lowest font-label-sm text-label-sm">148</span>
</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all" type="button">
<span>Publiés en ligne</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">128</span>
</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all" type="button">
<span>En modération</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">14</span>
</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all" type="button">
<span>Brouillons</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">4</span>
</button>
<button className="px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all" type="button">
<span>Dépubliés / Archivés</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">2</span>
</button>
</nav>

<div className="relative w-full md:w-80">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">search</span>
<input className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="Réf (ex: PH-ALG), titre, wilaya, propriétaire..." type="text"/>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
<div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">

<div className="relative">
<select className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option>Toutes transactions</option>
<option>À Vendre (Cession définitive)</option>
<option>À Louer (Bail prestige)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
</div>

<div className="relative">
<select className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option>Toutes catégories</option>
<option>Villa &amp; Propriété</option>
<option>Duplex &amp; Penthouse</option>
<option>Appartement Haut Standing</option>
<option>Demeure Historique</option>
<option>Terrain Viabilisé</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
</div>

<div className="relative">
<select className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option value="all">Toutes les wilayas (69 wilayas)</option>
<option value="16">16 — Alger (Hydra, Poirson, El Biar...)</option>
<option value="31">31 — Oran (Canastel, Akid Lotfi...)</option>
<option value="09">09 — Blida (Chréa, Centre...)</option>
<option value="35">35 — Boumerdès (Corso, Zemmouri...)</option>
<option value="25">25 — Constantine</option>
{ALL_WILAYAS.map((w) => (
  <option key={`admin-biens-wilaya-${w.code}`} value={w.code}>
    {w.code} — {w.name}
  </option>
))}
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
</div>

<div className="relative">
<select className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer">
<option>Tous les prix (DA)</option>
<option>&lt; 50 000 000 DA</option>
<option>50M - 120 000 000 DA</option>
<option>120M - 250 000 000 DA</option>
<option>&gt; 250 000 000 DA</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">unfold_more</span>
</div>
</div>

<div className="flex items-center justify-between sm:justify-end gap-3 w-full xl:w-auto">
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden sm:inline">Tri:</span>
<div className="relative">
<select className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md outline-none cursor-pointer">
<option>Plus récents d'abord</option>
<option>Prix : Décroissant</option>
<option>Prix : Croissant</option>
<option>Plus consultés (Vues)</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">swap_vert</span>
</div>
</div>
<button className="px-3 py-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors font-label-sm text-label-sm flex items-center gap-1.5 uppercase" type="button">
<span className="material-symbols-outlined text-[16px]">restart_alt</span>
<span>Réinitialiser</span>
</button>
</div>
</div>

<div className="flex flex-wrap items-center gap-2 px-1">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider mr-1">Filtres actifs:</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span>Wilaya: 16 - Alger</span>
<button className="hover:text-error transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span>Catégorie: Résidentiel Prestige</span>
<button className="hover:text-error transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
<span>À la Une uniquement</span>
<button className="hover:text-error transition-colors"><span className="material-symbols-outlined text-[14px]">close</span></button>
</span>
</div>
</div>

<div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8">
<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<th className="py-4 px-4 w-12 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container" id="select-all" type="checkbox"/>
</th>
<th className="py-4 px-4 min-w-[200px]">Visuel &amp; Référence</th>
<th className="py-4 px-4 min-w-[280px]">Titre &amp; Caractéristiques</th>
<th className="py-4 px-4 min-w-[160px]">Transaction / Type</th>
<th className="py-4 px-4 min-w-[170px]">Prix Présentation (DA)</th>
<th className="py-4 px-4 min-w-[180px]">Localisation</th>
<th className="py-4 px-4 min-w-[140px]">Statut</th>
<th className="py-4 px-4 min-w-[120px]">Dépôt / Maj</th>
<th className="py-4 px-4 min-w-[120px]">Performance</th>
<th className="py-4 px-4 min-w-[160px] text-right">Actions</th>
</tr>
</thead>
<tbody className="divide-y divide-surface-variant/30 text-on-surface font-body-sm text-body-sm">

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Modern luxury villa exterior in Hydra Algiers with private swimming pool, minimalist floor-to-ceiling glass windows, warm ambient Mediterranean twilight lighting, olive trees, brushed concrete and natural Algerian stone accents" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4manFZtNmKQiXyK2R_kFD-Z_fPmEYp8YlRQ5qiwqGo3rh0wC8X1USymxYiD_jf1U4mJ7fPJWdNdVZS5iP07YvkZ6b2T9yEsRS0OjSwvKSUTGhYEKcGCDYeyOKqfiUt61QjRfAEXtP_6mlZX3VW4okiBAenB9kb5qqfLgwXmnyLi008wwGOWtcBVZCoVByqCfO4yu9SnR0j2IzmQ6OuZ34_6KDdBQhdYnX-fZAai5jsXnR-8CnKjQ"/>
<span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-tertiary-fixed font-label-sm text-[10px] uppercase font-bold">Une</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-secondary font-bold">PH-ALG-104</span>
<span className="font-label-sm text-label-sm text-outline">Mandat Exclusif</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Villa Contemporaine avec Piscine à Débordement
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 620 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> 6 suites</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 7 sdb</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Vendre
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Villa d'Architecte</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">165 000 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA</span></span>
<span className="font-label-sm text-label-sm text-outline">266 129 DA / m²</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Hydra
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger (16) • Zone Résidentielle</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm font-semibold">Publié</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">18 Fév 2025</span>
<span className="text-outline font-label-sm text-label-sm">Maj hier 16:42</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">5 420 vues</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">18 demandes</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Aperçu fiche publique" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-container transition-colors" title="Retirer de la Une" type="button">
<span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"  title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Interior of a luxury modern penthouse duplex living room in Hydra Algiers with double height ceilings, designer Italian furniture, terrazzo floors and large terrace overlooking pine trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfg0Gv-5hUQna8cwztXVqppQ-3fd9TCdmqOmnF0i2WbhUxxDueKeU7ZR9bG3nOR9Tsc-5OqMuvkbYfy9ll0sJBplchtlTJh2gi_8P9t88K9T9aFeK6nOHGJ0F1EWxuv4AAFzK8k8T0cApgZfNCQHXRQz6GxDq_5dK9-aJb_5gM4E-cmJxOj8oJQSjvjHesvcqvKl3nFTpEkmb-LF6KDKjTY4I8uAd4X9g_ev6BWwLgiY1f38ZD0nQ"/>
<span className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-tertiary-fixed font-label-sm text-[10px] uppercase font-bold">Une</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-secondary font-bold">PH-ALG-219</span>
<span className="font-label-sm text-label-sm text-outline">Diplomatique</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Duplex de Prestige Belvédère &amp; Suites Boffi
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 310 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> 4 suites</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">garage</span> 2 box</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Louer
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Duplex Meublé Luxe</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">450 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA / mois</span></span>
<span className="font-label-sm text-label-sm text-outline">Caution 3 mois • Bail 1 an</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Paradou, Hydra
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger (16) • Résidence Gardée</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm font-semibold">Publié</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">14 Fév 2025</span>
<span className="text-outline font-label-sm text-label-sm">Maj 16 Fév</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">3 110 vues</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">22 demandes</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Aperçu fiche publique" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-container transition-colors" title="Retirer de la Une" type="button">
<span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>star</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"  title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High-end modern penthouse balcony overlooking the Mediterranean sea and Gulf of Oran at sunset, glass balustrade, stylish lounge chairs, warm dusk sky, luxurious coastal architectural styling" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACYjDkloywuAEsJe31C3XtRRjaAyTwWthfKoc9GZd-dsN9SY2zeTTOHpFuYZDmVbDRoZ8T5s74e-aOylTJGk4DpRA-l9mi7k5wzkVMAw9mnTKKycPpdP1LzJQaeqzPkdMlIlBqPlnB-vN5emAjK_4TLdRRuFxpYNv2KNGk9y_eTalqdWS3LWyFoFUPbjZHOUXIt6RiBFtlC7O9x-roVFVYTdGh66DuQkA2bv3fgxCT0voIkREPKck"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-secondary font-bold">PH-ORN-088</span>
<span className="font-label-sm text-label-sm text-outline">Direct Promoteur</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Penthouse Vue Panoramique Baie d'Oran
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 285 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> 3 suites</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">deck</span> Terrasse 80 m²</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Vendre
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Penthouse Dernier Étage</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">92 000 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA</span></span>
<span className="font-label-sm text-label-sm text-outline">Acte &amp; Livret Foncier</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Canastel
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Oran (31) • Front de Mer</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm font-semibold">Publié</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">11 Fév 2025</span>
<span className="text-outline font-label-sm text-label-sm">Maj 13 Fév</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">2 890 vues</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">9 demandes</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Aperçu fiche publique" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Mettre à la Une" type="button">
<span className="material-symbols-outlined text-[18px]">star</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"  title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group bg-secondary-fixed/5">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Traditional neo-Moorish luxury estate in El Biar Algiers, featuring an interior Andalusian courtyard with central marble fountain, intricate zellige ceramic tiling, carved cedar wood arches, and lush citrus trees" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmObFPju1ajc-x_f5U563cCDXuluwimOYZmWuq6FVaa2GPqrf5MrPEF1-DAZAms9rPHFkw8pRO0OkBUgr4a7oV-9SF7tIeg8Rk-J8d8JZHv9bf26k1RVLh1CeyX26vYtOjYlphNr7XRjvWv4sd56Z9-_TJNv4KJ3Z8LPTyWSYVC7fQQ8T2AKkhG3RgE98BZqxlrSGVXy7CLfYmjE_LazZV2zPrWOe2TW6MITN8FhIUX2DR_xuaoKE"/>
<span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-[10px] font-bold">Notaire</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-secondary font-bold">PH-ALG-043</span>
<span className="font-label-sm text-label-sm text-outline">Succession Directe</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Demeure Néo-Mauresque avec Patio &amp; Fontaine
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 850 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">park</span> Jardin 1200 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> 7 ch</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Vendre
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Demeure Historique</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">210 000 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA</span></span>
<span className="font-label-sm text-label-sm text-secondary">Vérification cadastrale</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Poirson, El Biar
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger (16) • Vue Baie Imprenable</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed/60 text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">En modération</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">08 Fév 2025</span>
<span className="text-outline font-label-sm text-label-sm">Notaire Chérif</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">—</span>
<span className="font-label-sm text-label-sm text-outline">En attente avis</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-container transition-colors" title="Valider &amp; Publier" type="button">
<span className="material-symbols-outlined text-[18px]">gavel</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"  title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Scenic elevated coastal residential development parcel overlooking the Mediterranean Sea in Corso Boumerdes Algeria, gentle hillside terrain with coastal pine trees and clear blue water" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaDxMYQga-XMv6cEJvf-OJcybziTW20RUN_Hlf-jkz6dBHEDJK5GkMC4dCgtkPh3iEC16ijQiW-ih30ioam6FsK3Ky93ng4e53FI7lK8QQ4mh65swWm6BqI3cfqV3f7HG0l260OSkVxx2jbTzEQsEXb2mngPgxrs6KTgE0SdGcJ2qAKmLgoju7Pb6nzjXomkI4pgjDAEAJvBgALPHvMn-C1E03bYyDZBT7Zee9CmrbeyawfUWjh6M"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-secondary font-bold">PH-BMD-012</span>
<span className="font-label-sm text-label-sm text-outline">Certificat Urba R+2</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Terrain Constructible Viabilisé Vue Mer
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 920 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">electric_meter</span> Eau / Gaz / Élec</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Vendre
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Foncier Résidentiel</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">35 000 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA</span></span>
<span className="font-label-sm text-label-sm text-outline">38 043 DA / m²</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Corso
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Boumerdès (35) • Front Littoral</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
<span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 font-label-sm text-label-sm font-semibold">Publié</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">02 Fév 2025</span>
<span className="text-outline font-label-sm text-label-sm">Maj 10 Fév</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">1 420 vues</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">11 demandes</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Aperçu fiche publique" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Mettre à la Une" type="button">
<span className="material-symbols-outlined text-[18px]">star</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container transition-colors"  title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/50 transition-colors group opacity-85">
<td className="py-4 px-4 text-center">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container item-check" type="checkbox"/>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-3">
<div className="relative w-20 h-14 rounded-lg overflow-hidden bg-surface-container flex items-center justify-center text-outline flex-shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[24px]">add_a_photo</span>
<span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-surface-container-highest text-on-surface-variant font-label-sm text-[9px] font-bold">2 / 15</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-md text-label-md text-outline font-bold">PH-ALG-331</span>
<span className="font-label-sm text-label-sm text-error">Photos Manquantes</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col min-w-0">
<a className="font-headline-sm text-headline-sm text-on-surface hover:text-secondary transition-colors line-clamp-1 leading-snug" href="#">
                  Villa de Maître avec Logement Gardien &amp; Bâche à eau
                </a>
<div className="flex items-center gap-3 text-outline mt-1 font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span> 480 m²</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">water_drop</span> Bâche 20 000L</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bed</span> 5 ch</span>
</div>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col gap-1 items-start">
<span className="px-2.5 py-0.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                  À Vendre
                </span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Villa Individuelle</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-currency-display text-title-lg text-on-surface font-bold">130 000 000 <span className="font-label-sm text-label-sm text-secondary font-semibold">DA</span></span>
<span className="font-label-sm text-label-sm text-outline">Négociable</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-title-md text-body-md text-on-surface font-medium flex items-center gap-1">
<span className="material-symbols-outlined text-[16px] text-secondary">location_on</span> Bouchaoui, Chéraga
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger (16) • Calme Absolu</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-outline"></span>
<span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">Brouillon</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="text-on-surface font-label-md text-label-md">Hier 18:20</span>
<span className="text-outline font-label-sm text-label-sm">Agent Yazid</span>
</div>
</td>
<td className="py-4 px-4">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-outline">0 vue</span>
<span className="font-label-sm text-label-sm text-outline">Non indexé</span>
</div>
</td>
<td className="py-4 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface-container transition-colors" title="Compléter la fiche" type="button">
<span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-secondary hover:bg-surface-container transition-colors" title="Éditer" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-error hover:bg-surface-container transition-colors"  title="Supprimer" type="button">
<span className="material-symbols-outlined text-[18px]">delete</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-surface-variant/40 bg-surface-container-low/40">
<div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
<span>Affichage de <strong>1 à 6</strong> sur <strong>148</strong> mandats répertoriés</span>
<span className="text-outline">•</span>
<span className="text-secondary font-label-sm text-label-sm uppercase font-semibold">128 publiés en ligne</span>
</div>
<div className="flex items-center gap-1.5">
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-outline opacity-50 cursor-not-allowed font-label-md text-label-md flex items-center gap-1" disabled="" type="button">
<span className="material-symbols-outlined text-[16px]">chevron_left</span>
<span>Précédent</span>
</button>
<div className="flex items-center gap-1">
<button className="w-8 h-8 rounded-lg bg-primary-container text-surface-container-lowest font-label-md text-label-md font-bold" type="button">1</button>
<button className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">2</button>
<button className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">3</button>
<span className="text-outline px-1">...</span>
<button className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md" type="button">25</button>
</div>
<button className="px-3 py-1.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center gap-1" type="button">
<span>Suivant</span>
<span className="material-symbols-outlined text-[16px]">chevron_right</span>
</button>
</div>
</div>
</div>

<div className="hidden fixed w-48 rounded-xl bg-surface-container-lowest shadow-2xl p-1.5 z-50 ring-1 ring-black/10" id="row-context-menu">
<button className="w-full text-left px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">content_copy</span>
<span>Dupliquer le bien</span>
</button>
<button className="w-full text-left px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-on-surface-variant">pause_circle</span>
<span>Mettre en pause</span>
</button>
<button className="w-full text-left px-3 py-1.5 rounded-lg text-on-surface hover:bg-surface-container font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">share</span>
<span>Partager lien court</span>
</button>
<div className="h-px bg-surface-variant/40 my-1"></div>
<button className="w-full text-left px-3 py-1.5 rounded-lg text-error hover:bg-error-container/40 font-body-sm text-body-sm flex items-center gap-2" >
<span className="material-symbols-outlined text-[16px] text-error">delete_outline</span>
<span>Supprimer définitivement</span>
</button>
</div>

<div className="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary-container/60 backdrop-blur-sm" id="delete-modal">
<div className="w-full max-w-md rounded-2xl bg-surface-container-lowest shadow-2xl p-6 flex flex-col gap-4 ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
<div className="w-12 h-12 rounded-full bg-error-container text-error flex items-center justify-center">
<span className="material-symbols-outlined text-[24px]">warning</span>
</div>
<div className="flex flex-col gap-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Confirmer la suppression</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Êtes-vous certain de vouloir archiver ou effacer le mandat <span className="font-semibold text-secondary" id="delete-target-ref">PH-ALG-331</span> ? Cette action retirera instantanément le bien de la vitrine publique d'Alger.
        </p>
</div>
<div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">L'historique cadastral et les coordonnées notariées resteront dans les archives sécurisées.</span>
</div>
<div className="flex items-center justify-end gap-3 pt-2">
<button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-all"  type="button">
          Annuler
        </button>
<button className="px-4 py-2 rounded-lg bg-error text-on-error hover:brightness-110 font-label-md text-label-md transition-all shadow-sm"  type="button">
          Confirmer la suppression
        </button>
</div>
</div>
</div>


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
