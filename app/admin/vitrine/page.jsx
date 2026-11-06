'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
<div className="flex flex-col gap-2">
<nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
<span className="hover:text-primary transition-colors cursor-pointer">Administration</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="hover:text-primary transition-colors cursor-pointer">Gestion du Parc</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-secondary font-bold">Biens à la Une &amp; Vitrine</span>
</nav>
<div className="flex items-center gap-3 mt-1">
<h1 className="font-headline-lg text-headline-lg text-on-surface">Biens à la Une &amp; Sélection Vitrine</h1>
<span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider">Édition Active</span>
</div>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
        Contrôlez l'ordonnancement, la mise en vedette sur la page d'accueil publique et les bannières prestigieuses de Prime House.
      </p>
</div>

<div className="flex items-center gap-3 shrink-0">
<button className="px-4 py-2.5 rounded bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-2 hover:bg-surface-variant transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
<span>Filtrer les Slots</span>
</button>
<button className="px-5 py-2.5 rounded bg-secondary text-on-secondary font-label-md text-label-md flex items-center gap-2.5 hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all shadow-md transform hover:-translate-y-0.5"  type="button">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
<span>+ Ajouter un bien à la sélection vitrine</span>
</button>
</div>
</div>

<div className="relative overflow-hidden rounded-xl bg-primary-container text-surface-container-lowest p-6 mb-10 shadow-lg">
<div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
<div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
<div className="flex items-start gap-4">
<div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center shrink-0 text-secondary-fixed">
<span className="material-symbols-outlined text-[28px]">published_with_changes</span>
</div>
<div className="flex flex-col gap-1">
<div className="flex items-center gap-2.5">
<span className="font-title-lg text-title-lg text-surface-container-lowest">Synchronisation en Direct Active</span>
<span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
<span className="px-2 py-0.5 rounded bg-surface-container-lowest/15 font-label-sm text-label-sm text-secondary-fixed uppercase">Vue publique : `featured_properties`</span>
</div>
<p className="font-body-md text-body-md text-surface-container-highest max-w-4xl">
<strong>6 biens</strong> sont actuellement affichés en page d'accueil publique. Toute modification de position ou de statut se répercute instantanément sur le site public via le cache Edge Supabase.
          </p>
</div>
</div>
<div className="flex items-center gap-4 border-l-0 md:border-l border-surface-container-lowest/10 pl-0 md:pl-6">
<div className="flex flex-col text-left md:text-right">
<span className="font-label-sm text-label-sm text-surface-container-highest uppercase tracking-widest">Dernière Mise à Jour</span>
<span className="font-title-md text-title-md text-secondary-fixed">Aujourd'hui, 11:42:08</span>
</div>
<button className="w-10 h-10 rounded bg-surface-container-lowest/10 flex items-center justify-center text-surface-container-lowest hover:bg-secondary hover:text-on-secondary transition-colors"  title="Actualiser la passerelle" type="button">
<span className="material-symbols-outlined text-[20px]" id="refresh-icon">autorenew</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col gap-6 mb-12">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Sélection Actuelle en Page d'Accueil</h2>
<span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-bold">6 Emplacements Définis</span>
</div>
<div className="flex items-center gap-2">
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-high transition-colors flex items-center gap-1.5"  type="button">
<span className="material-symbols-outlined text-[16px]">restart_alt</span>
<span>Rétablir l'ordre</span>
</button>
</div>
</div>

<div className="flex flex-col gap-4" id="featured-list">

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="1">
<div className="flex items-start md:items-center gap-5">

<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Glisser pour réorganiser">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">1</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-outline/40 flex items-center justify-center cursor-not-allowed" disabled="" type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>

<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxurious modern minimalist private villa in Hydra, Algiers with a turquoise infinity swimming pool, pale limestone architecture, floor-to-ceiling glass windows at sunset with Mediterranean dusk ambiance, warm amber interior glow, architectural photography high resolution." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bKsGPaeW8-X3XC8DoI9DT6EKwaAzgKLHCx422LwMp6VqohaRxtThvKprkfDbFmMTOsN41xJiEh69fs9dLQA-J-GFxBfJ_R7NSL6D6LCS4xeA7EIwDsCsmCbbHLENq1i4n2P6WaZ9C88UlEDrfxoNJflVVYTDZsay6cxmG3UuAggEvlO2eV2UkYwQKlGwvuyCFiLPJ0SD4n7iYI8u3f02gEdyjiM9vxBCPxUCSAWPIb3i1Au-Hs"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              À Vendre
            </div>
<div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-primary-container text-tertiary-fixed font-label-sm text-label-sm shadow">
              Exclusivité
            </div>
</div>

<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">star</span>
                En Couverture Hero
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-ALG-104</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                Hydra, Alger (16)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Villa Contemporaine d'Exception avec Piscine Débordement</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 6 Suites</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 7 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 780 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">165 000 000 <span className="text-secondary text-sm font-label-md">DA</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Période : 01 Juin 2024 → 31 Août 2024</span>
<span>(Slot Principal #1 - 92% d'impressions)</span>
</div>
</div>
</div>

<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">

<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>

<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  title="Modifier le calendrier et la bannière" type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  title="Remplacer par un autre bien" type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  title="Retirer de la vitrine" type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="2">
<div className="flex items-start md:items-center gap-5">

<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">2</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>

<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-end penthouse duplex living room in El Biar, Algiers overlooking the Bay of Algiers, double-height ceilings, contemporary Italian marble fireplace, modern bespoke furniture, warm midday sunlight, luxury architectural editorial photograph." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQxYYQjx0lqedtmnUHcCXOdZLM0h9o-6j35-iKqA69nUEodOYdsM0UuivsWZkgawDtsAitPRqa9EOJpXp99nwuKenZFKdUk5q7Qfh4j842XZppgr2VppAMPkYwdVxPhWJVsM_AdTnmz0OtKypn-BZ8d0ut-u-7cR-0SbJZONvHYplWIPukT62fXP96lTs0gkbnCKabe48euJlA5Ix5NVZKn4t-WUahuM2f-a__WmpZnBo2I3B4o_g"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              À Vendre
            </div>
</div>

<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">view_carousel</span>
                Carrousel Prestige
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-ALG-219</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                El Biar, Alger (16)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Duplex Panoramique sur la Baie d'Alger</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 4 Chambres</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 4 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 340 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">88 000 000 <span className="text-secondary text-sm font-label-md">DA</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Période : Indéterminée (Affichage permanent)</span>
</div>
</div>
</div>

<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="3">
<div className="flex items-start md:items-center gap-5">
<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">3</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>
<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Grand luxury seaside estate villa in Tipaza, Algeria with private beach access, Mediterranean palm trees, modern whitewashed walls, large teak wooden deck terrace with infinity pool overlooking the sea, bright Mediterranean daylight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYftRY94LKHX4UQq7EbmmI0fH6cHZfAuGkY693vubitQJDd2UfXouB1JS0fZXBSDmQsDoDJsKaXBwWT9t3MQszRJ95TsMhi83Y4dhEXbhv4TCbyPNwyJ2SgXiWSGba8CZfNVGZW956CCAF9rOXi76DAAbxWFeP4bo3_obgzxWVg1cx2nZAUwhXJl1FFzL32f1zRQjt_3rlsv-4n35tinjsm5qXySUbAAnDCgwFtxs8CIdZjpsz-sA"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              À Vendre
            </div>
<div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-primary-container text-tertiary-fixed font-label-sm text-label-sm shadow">
              Exclusivité
            </div>
</div>
<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">view_carousel</span>
                Carrousel Prestige
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-TIP-088</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                Chenoua, Tipaza (42)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Propriété Pieds-dans-l'Eau avec Accès Crique Privée</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 7 Chambres</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 8 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 1 200 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">290 000 000 <span className="text-secondary text-sm font-label-md">DA</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Période : 15 Juin 2024 → 15 Septembre 2024</span>
</div>
</div>
</div>
<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="4">
<div className="flex items-start md:items-center gap-5">
<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">4</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>
<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modern luxury loft apartment in Sidi Yahia, Algiers with industrial chic design, dark wood panels, polished concrete, high designer furniture and warm architectural accent lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHAXgtxAMyXgOhaqhbjTs9jfVLV0WQyLAnBosgkMf9ZT9H0zeM1iYzG3cq68HJFBdjTscnQP4l2Qrbm-NJtlKrGQidFCSC1fE3cKh1jUkXX0Ed_E6RiGfN-cAhyOsWpiDDEf3ODUDAIApGdSSe5gQ4_rPweanC-P8E1Ihi_s8HQDNI3xthZX2tD0oLXPJ3dSQrhGuiPBgszFo_gxBYMKywjbDPWOFQdr6LX-pDLiOLdyQjLkriZws"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              Location
            </div>
</div>
<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">view_carousel</span>
                Carrousel Prestige
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-ALG-402</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                Sidi Yahia, Alger (16)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Triplex d'Ambassade avec Rooftop Paysager</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 5 Chambres</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 5 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 460 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">650 000 <span className="text-secondary text-sm font-label-md">DA /mois</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Mandat Diplomatique • Actif</span>
</div>
</div>
</div>
<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="5">
<div className="flex items-start md:items-center gap-5">
<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">5</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>
<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Modernist white villa in Annaba with lush Mediterranean garden, bougainvillea blossoms, clean geometric lines, private illuminated swimming pool at twilight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5RpvdhdlhedJ_U71_9z_YnqNvUM1OwxtCiD-RzDxLRmqYPV1EilQPwSIZ0OeqzOe2uziXuTlqzEpUK7Tjf2t84N91D_Oje6UoZ6lC5at25FsnkXRqjGqBzT-SzyuUX6d_sOuh3g-6GGkbB31D31O3LCiJfsnt5HbUhvhij1FPcLF_2yuWcXDbWNI6Oa0hqnX7ODN3JmzUsCBnP-40_fSuxDak1aUPKuxYtlsw37uBIQBLTjsg4Ns"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              À Vendre
            </div>
</div>
<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">view_carousel</span>
                Carrousel Prestige
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-ANN-015</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                Seraïdi, Annaba (23)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Manoir Perché sur la Baie de Seraïdi</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 5 Chambres</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 5 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 620 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">115 000 000 <span className="text-secondary text-sm font-label-md">DA</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Période : 01 Mai 2024 → 30 Juin 2024</span>
</div>
</div>
</div>
<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>

<div className="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="6">
<div className="flex items-start md:items-center gap-5">
<div className="flex flex-col md:flex-row items-center gap-2">
<div className="flex items-center justify-center w-8 h-8 rounded bg-surface-container text-outline cursor-grab active:cursor-grabbing hover:bg-surface-container-high hover:text-on-surface transition-colors">
<span className="material-symbols-outlined text-[20px]">drag_indicator</span>
</div>
<div className="flex flex-col items-center">
<span className="w-10 h-10 rounded-full bg-surface-container-highest text-on-surface font-headline-sm text-headline-sm flex items-center justify-center shadow-sm">6</span>
<div className="flex gap-1 mt-1.5">
<button className="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors"  type="button">
<span className="material-symbols-outlined text-[16px]">arrow_upward</span>
</button>
<button className="w-6 h-6 rounded bg-surface-container text-outline/40 flex items-center justify-center cursor-not-allowed" disabled="" type="button">
<span className="material-symbols-outlined text-[16px]">arrow_downward</span>
</button>
</div>
</div>
</div>
<div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Stunning luxury villa in Oran with views over the Santa Cruz bay, Mediterranean sunset lighting, expansive outdoor marble patio, lounge area and architectural fountain." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxLVGii7Q30rVi-jeYPPl98s6tvCXIKoOJvXh3M-5a0B0JoFn5ch1_9DdzVzWLv_xyNkBKroTu05IIWCPu-7PgHLj-iDl6cwnUTPoNIFMs1JcUo9utK7zGcNM4LKbKv1pmI4fiu4s_GUECVe8_M3fvn2Jd_XCVU452mHRVPqs0YR5fsV5MLXyDx3za5e9dogwFCPWaZTqQoGZ3i8-JAJC05urczNh8yInUYPO_M_5C5B_V-D_V7to"/>
<div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
              À Vendre
            </div>
</div>
<div className="flex flex-col gap-1.5 min-w-0">
<div className="flex items-center gap-2.5 flex-wrap">
<span className="px-2.5 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-[14px] text-secondary">view_carousel</span>
                Carrousel Prestige
              </span>
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: PH-ORN-071</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
<span className="material-symbols-outlined text-[14px]">location_on</span>
                Akid Lotfi, Oran (31)
              </span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Villa d'Architecte avec Cour Intérieure &amp; Spa</h3>
<div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span> 6 Suites</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">bathtub</span> 6 SDB</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-secondary">straighten</span> 520 m²</span>
<span>•</span>
<span className="font-currency-display text-currency-display text-on-surface font-bold">135 000 000 <span className="text-secondary text-sm font-label-md">DA</span></span>
</div>
<div className="flex items-center gap-3 text-outline font-label-sm text-label-sm pt-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_today</span> Période : Indéterminée</span>
</div>
</div>
</div>
<div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
<div className="flex items-center gap-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Actif Vitrine</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<div className="flex items-center gap-2">
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">edit_calendar</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-surface-variant transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">swap_horiz</span>
</button>
<button className="w-9 h-9 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors flex items-center justify-center"  type="button">
<span className="material-symbols-outlined text-[18px]">remove_circle_outline</span>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="flex flex-col gap-6 mb-12">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded bg-secondary-container/60 flex items-center justify-center text-on-secondary-container">
<span className="material-symbols-outlined text-[20px]">auto_awesome</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Candidats Recommandés pour la Mise en Avant</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Biens d'exception récemment approuvés à fort potentiel d'engagement acheteurs</p>
</div>
</div>
<a className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1" href="#">
<span>Consulter les 18 biens éligibles</span>
<span className="material-symbols-outlined text-[16px]">arrow_forward</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="relative aspect-[16/10] overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Dramatic sea-view penthouse terrace in Canastel, Oran with sleek glass railings, teak wood sun loungers, outdoor bar overlooking the Mediterranean Sea at golden hour, bright warm luxury ambiance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEZgeBR4vPgbqRYi7lv6ENTXj6QLdwMwfo83IXl6uOH_TpgrGFLc7T1pzCO2tXEjMRniFs_kQCPxoD-AnmIPtqyqT4kVV9We9Lqu48yVw_xyOY7C9k9-uB99kRvw6ldJ31clE1i6lTirNtoSqeAFHMHE5TMx3TEg7zZdVkKfIR_JMIM8_5lcz7KJ4m8d5PmdrRzcr6h8PyVdco0ZSZsV4o2A933wEv7DKCZTWr15dzbYt8BFVJXcM"/>
<div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-semibold">
              Canastel • Oran (31)
            </div>
<div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-bold shadow">
              Score 98/100
            </div>
</div>
<div className="p-5 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: CAND-ORN-801</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Approuvé hier</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Penthouse Front de Mer — Oran (Canastel)</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Vue imprenable à 270° sur la baie. Terrasse de 140 m² avec jacuzzi privé, ascenseur privatif et domotique intégrée.
            </p>
<div className="flex items-center justify-between pt-2">
<div className="font-currency-display text-currency-display text-on-surface font-bold">
                92 000 000 <span className="text-secondary text-sm font-label-md">DA</span>
</div>
<span className="font-body-sm text-body-sm text-outline">280 m² • 4 suites</span>
</div>
</div>
</div>
<div className="p-5 pt-0">
<button className="w-full py-2.5 rounded bg-surface-container hover:bg-secondary hover:text-on-secondary text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2"  type="button">
<span className="material-symbols-outlined text-[18px]">add_task</span>
<span>Mettre à la Une</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="relative aspect-[16/10] overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Historic neo-Moorish palace villa in Pointe Pescade, Algiers with intricate authentic arabesque zellij tilework, carved stucco arches, grand courtyard fountain surrounded by lush orange and olive trees, editorial architectural luxury." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZjF9H8xIioyQcIB6xXorof7-k8ANUyOaDLCu_uRVLtwIikVeUq5-cjn6ZKALbu4-Vlnpbuf6E8YdE8n2vdIqivkt5cn78JwRnziy3_2L9d3_cZLVh0_4ZE0bG3jdh93_ZfUA4KahKSLgRNHR5-6kDw14wwBlIcxzvW0WImVfIuyLpQu6ABRhvtSCETyLFSuizslFOd7b1rF3FKSQTkmbZIqhrxjl0BTV55djXm4dyW5UmACr44vY"/>
<div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-semibold">
              Pointe Pescade • Alger (16)
            </div>
<div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-bold shadow">
              Score 96/100
            </div>
</div>
<div className="p-5 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: CAND-ALG-990</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Exclusivité Prime</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Demeure Néo-Mauresque d'Époque</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Patrimoine d'exception entièrement restauré avec matériaux nobles, patio intérieur avec fontaine en marbre de Carrare.
            </p>
<div className="flex items-center justify-between pt-2">
<div className="font-currency-display text-currency-display text-on-surface font-bold">
                210 000 000 <span className="text-secondary text-sm font-label-md">DA</span>
</div>
<span className="font-body-sm text-body-sm text-outline">950 m² • 8 pièces</span>
</div>
</div>
</div>
<div className="p-5 pt-0">
<button className="w-full py-2.5 rounded bg-surface-container hover:bg-secondary hover:text-on-secondary text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2"  type="button">
<span className="material-symbols-outlined text-[18px]">add_task</span>
<span>Mettre à la Une</span>
</button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
<div>
<div className="relative aspect-[16/10] overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Chic modern diplomatic duplex apartment interior in Hydra Algiers with spacious living room, floor to ceiling windows, refined Scandinavian wood furniture, minimalist decor and natural morning lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm54REJZKlXQUE388Hehj9VfmzleOzh1tGqYb6M57aL-wOna2a16Uih0nxGZ7MFylEJoILD7APPWs0KQCj3bKBS1kjFriNNvtv8_g3L32A3eMPRC6eX-j9PxLxLP8l8HyKF1bkdzDnvQG0phS_dB-yn9pSx4VjwAMMWRo75wAXvZfQNgu7_7sfghiBWQQP9NXTZ--fXZ-KHY0WNKnpLHJq_YqRTgajlwX-yxkzHVKqJzzEWRLiiMQ"/>
<div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-semibold">
              Hydra • Alger (16)
            </div>
<div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm uppercase font-bold shadow">
              Score 94/100
            </div>
</div>
<div className="p-5 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: CAND-ALG-312</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Bail Prêt</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">Duplex Diplomatique Sécurisé</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
              Zone ambassades hautement sécurisée. Climatisation centralisée réversible, loge gardiennage privée et groupe électrogène.
            </p>
<div className="flex items-center justify-between pt-2">
<div className="font-currency-display text-currency-display text-on-surface font-bold">
                450 000 <span className="text-secondary text-sm font-label-md">DA /mois</span>
</div>
<span className="font-body-sm text-body-sm text-outline">310 m² • 4 suites</span>
</div>
</div>
</div>
<div className="p-5 pt-0">
<button className="w-full py-2.5 rounded bg-surface-container hover:bg-secondary hover:text-on-secondary text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2"  type="button">
<span className="material-symbols-outlined text-[18px]">add_task</span>
<span>Mettre à la Une</span>
</button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
<div className="flex items-center gap-4">
<div className="w-10 h-10 rounded bg-primary-container text-surface-container-lowest flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">database</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Schéma Supabase Actif</span>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-mono">public.properties</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
          Colonnes synchronisées : <code className="font-mono text-secondary">is_featured (boolean)</code> et <code className="font-mono text-secondary">featured_order (int4)</code> indexé par <code className="font-mono">idx_featured_order_asc</code>.
        </p>
</div>
</div>
<div className="flex items-center gap-4 w-full md:w-auto justify-end">
<span className="font-body-sm text-body-sm text-secondary font-medium hidden" id="save-status-indicator">
        ✓ Enregistré automatiquement
      </span>
<button className="w-full md:w-auto px-6 py-3 rounded bg-secondary text-on-secondary font-label-lg text-label-lg flex items-center justify-center gap-2.5 hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all shadow-md"  type="button">
<span className="material-symbols-outlined text-[20px]">save</span>
<span>Enregistrer l'ordre de la vitrine</span>
</button>
</div>
</div>

<div className="fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-sm hidden flex items-center justify-center p-4" id="add-modal">
<div className="bg-surface-container-lowest rounded-xl shadow-2xl max-w-2xl w-full p-6 flex flex-col gap-5">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5">
<span className="material-symbols-outlined text-secondary text-[24px]">playlist_add</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Ajouter un bien à la sélection vitrine</h3>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"  type="button">
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Recherchez parmi les biens immobiliers validés et actuellement actifs dans la base de données.
      </p>

<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-outline text-[20px]">search</span>
<input className="w-full pl-10 pr-4 py-2.5 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/40 placeholder:text-outline" id="property-search-input" oninput="filterModalProperties(this.value)" placeholder="Rechercher par titre, référence (ex: PH-ALG), ou wilaya..." type="text"/>
</div>

<div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1" id="modal-properties-list">
<div className="p-3 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between cursor-pointer" >
<div className="flex items-center gap-3">
<div className="w-12 h-9 rounded bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Luxury Mediterranean manor in Bouzaréah surrounded by ancient olive trees and stone walls." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoVXoqsv-JEwVVkh6irbG2MHALB6FKOiCbybGCd0vngHVKbCZv8HG2ni7HK15Xo3OiBit9N69a_meal6wCFrAaXrnR1Xg7Af5Nj6Jg2TR24z5vgJlokbyIyt5zCjVLe8whnwKpLFT3qjR_TC58M8CE6hI7nGZyTY8P8WL7PQ4uKhXh3d6ZzfCD2vWYX4SvQzB7P5-7vZTmURC4cjQavYmu9aRcx7smY9uLuc4fNEdELQV2SuQLcIk"/>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Manoir des Oliviers — Bouzaréah</span>
<span className="font-label-sm text-label-sm text-outline">RÉF: PH-ALG-550 • 140 000 000 DA</span>
</div>
</div>
<span className="material-symbols-outlined text-secondary">add_circle</span>
</div>
<div className="p-3 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between cursor-pointer" >
<div className="flex items-center gap-3">
<div className="w-12 h-9 rounded bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Classic Haussmann style high ceiling apartment in downtown Algiers with iron lace balcony." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIwr7czSNoMsp3vJ20qq-rEfD5eTH-Bq0hDP7MpcHwMHWZuNRxsMKqlM8kSo_BVr-qYHbnRVf3nCAx7xApb3CaW4CFyehfT8hTPhLcxHKaINi3FUrCAh5cFmDqSrkFfiXFDmH_n_3WtikfhiM4B4LfMoyiG9K2AC8VqifxI_0PVmvKoM2rbqdHYPjCjVINuP9iZZ0GtjfXVX8exCRAGR0u3Gk3-mg1kdA9bfDdekbcp8YocdgnYV8"/>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Appartement Haussmannien Rénové — Alger Centre</span>
<span className="font-label-sm text-label-sm text-outline">RÉF: PH-ALG-112 • 62 000 000 DA</span>
</div>
</div>
<span className="material-symbols-outlined text-secondary">add_circle</span>
</div>
<div className="p-3 rounded bg-surface-container hover:bg-surface-container-high transition-colors flex items-center justify-between cursor-pointer" >
<div className="flex items-center gap-3">
<div className="w-12 h-9 rounded bg-surface-variant overflow-hidden shrink-0">
<img className="w-full h-full object-cover" data-alt="Modern whitewashed Moorish villa in Zeralda with large swimming pool and palm trees." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkqiaoMrRNR8YnEzGUyxpglk0Sx-SLqBT7xbp3JPI26Wf19K04YiV_sKoZYK4rj0kB9vmwvkn-IuY2meK3w6V9KbpwDhkwUGUOyMpqYmsSg42HWr7HWly9334W-QN4A65Y6z-u-b4RxK3NkFc85pE4Pn8x9DreMyDRcsvnzU7hbEqP5iBccOJBiSV4HaOmhAdwqnZYlbAqsu6cJtJ2_2BGpGXK3v-1HSDXnBbKUvNKHK5jZqE79MI"/>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Villa Mauresque Moderne — Zéralda</span>
<span className="font-label-sm text-label-sm text-outline">RÉF: PH-ALG-904 • 180 000 000 DA</span>
</div>
</div>
<span className="material-symbols-outlined text-secondary">add_circle</span>
</div>
</div>
<div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
<button className="px-4 py-2 rounded bg-surface-container text-on-surface font-label-md text-label-md"  type="button">Annuler</button>
</div>
</div>
</div>

<div className="fixed bottom-8 right-8 z-50 bg-primary-container text-surface-container-lowest px-5 py-3 rounded-lg shadow-xl font-label-md text-label-md flex items-center gap-3 transform translate-y-20 opacity-0 transition-all duration-300" id="toast">
<span className="material-symbols-outlined text-secondary text-[22px]" id="toast-icon">check_circle</span>
<span id="toast-message">Ordre de la vitrine enregistré avec succès.</span>
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
