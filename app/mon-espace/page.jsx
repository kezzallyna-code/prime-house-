'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';

function PageContent() {
  return (
    <>
      <Header />
      <main className="w-full pl-64 pt-16 bg-surface min-h-screen"><div className="flex flex-col w-full">
<div className="px-space-md lg:px-space-xl py-space-lg flex flex-col gap-space-xl max-w-[1440px] mx-auto w-full">

<section className="relative overflow-hidden bg-primary-container text-surface-container-lowest rounded-xl p-space-lg lg:p-space-xl shadow-xl">
<div className="absolute -right-24 -top-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
<div className="flex flex-col gap-space-xs max-w-2xl">
<div className="flex items-center gap-space-sm flex-wrap">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed text-label-sm font-label-sm tracking-wider uppercase">
<span className="material-symbols-outlined text-[14px] text-secondary-container" style={{ "fontVariationSettings": "'FILL' 1" }}>verified</span>
              Propriétaire Particulier Vérifié (Wilaya d'Alger)
            </span>
<span className="text-primary-fixed-dim text-label-sm font-label-sm tracking-wide">ID Mandat: DZ-88429</span>
</div>
<h1 className="font-headline-lg text-headline-lg lg:text-headline-xl text-surface tracking-tight mt-1">
            Bienvenue, Karim Hadj-Ahmed
          </h1>
<p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
            Supervisez vos mandats exclusifs, examinez les flux de visites qualifiées et validez vos correspondances notariales en temps réel.
          </p>
</div>
<div className="flex items-center gap-space-md flex-shrink-0">
<button className="inline-flex items-center justify-center gap-space-sm px-space-lg py-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container rounded font-label-lg text-label-lg transition-transform hover:-translate-y-0.5 shadow-md group" >
<span className="material-symbols-outlined text-title-md transition-transform group-hover:rotate-90">add</span>
<span>Déposer une nouvelle annonce</span>
</button>
</div>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-space-md">

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Annonces Actives</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">3 <span className="text-body-sm font-body-sm text-on-surface-variant font-normal">/ 4 dépôts</span></span>
</div>
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">real_estate_agent</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="inline-flex items-center gap-1 text-on-surface font-semibold">
<span className="w-2 h-2 rounded-full bg-secondary"></span> 1 en validation notariée
          </span>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Portfolio 75%</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Vues Totales (Mois)</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">14 820</span>
</div>
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">visibility</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span className="inline-flex items-center text-on-surface font-semibold text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">arrow_upward</span> +24.8%
          </span>
<span>vs mois précédent</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Demandes de Visite</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">28</span>
</div>
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">calendar_month</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
<span className="text-on-surface font-semibold">7 non traitées</span>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Taux rép. 92%</span>
</div>
</div>

<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Favoris &amp; Alertes</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">12</span>
</div>
<div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[24px]">bookmark_heart</span>
</div>
</div>
<div className="mt-space-md pt-space-sm flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant">
<span className="font-label-sm text-label-sm text-on-surface font-semibold">3 alertes actives</span>
<span>Alger &amp; Hydra</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-lg">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Patrimoine Déposé</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-0.5">Mes Annonces Déposées</h2>
</div>

<div className="flex items-center gap-1.5 p-1 bg-surface-container-low rounded-lg overflow-x-auto">
<button className="property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold transition-all bg-primary-container text-surface shadow-sm" >
            Toutes (4)
          </button>
<button className="property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" >
            En Ligne (3)
          </button>
<button className="property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" >
            En Validation (1)
          </button>
<button className="property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all" >
            Archivées (0)
          </button>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md" id="propertiesList">

<article className="property-card bg-surface-container-low rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group" data-status="published">
<div className="flex flex-col">
<div className="relative w-full h-52 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Luxurious modern villa facade in Cheraga Algiers with private swimming pool, palm trees, architectural limestone walls, clear Mediterranean sky, high dynamic range editorial photography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl3eMst8Wsl-VwN7YPPr08qY0yZ_mcaSJwtJwsXSGRcxaDRpVoy4tTR_pusfCz47I8_kbrBhKzwy0MNn5HLHwHqztI3rXrEYBF5WgvoLhjTIOEcfs6IKCTSBbMSRLGg2LwjWoyJTn1c6v_EYU9hMHtv0jIvSJ2wQT4Wtl5fn0joofy5uKkOA8gU1-Vr7ZircdJ2nx79aQU8PCTc4T94ah4RadEyzjwWAjKA7Io9vSTq0THJdtKq48"/>
<div className="absolute top-3 left-3 flex items-center gap-2">
<span className="px-2.5 py-1 rounded bg-primary-container text-surface text-label-sm font-label-sm uppercase font-bold tracking-wider">Vente Exclusif</span>
<span className="px-2.5 py-1 rounded bg-surface-container-lowest text-secondary text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> En Ligne
                </span>
</div>
<div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface text-label-sm font-label-sm">
                Réf: DZ-CH-409
              </div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Chéraga • Alger Ouest</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                Villa Moderne Piscine &amp; Jardin
              </h3>
<div className="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant my-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">square_foot</span> 480 m²</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">king_bed</span> 6 suites</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">garage</span> 3 places</span>
</div>
<div className="pt-space-xs flex items-baseline gap-1.5">
<span className="font-currency-display text-currency-display text-on-surface font-bold">145 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase">DA</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-auto">Déposé le 12 Fév 2025</span>
</div>
</div>
</div>
<div className="p-space-md bg-surface-container flex items-center justify-between gap-space-sm">
<button className="flex items-center gap-1 px-space-sm py-1.5 rounded hover:bg-surface-container-lowest text-on-surface font-label-md text-label-md transition-colors" title="Statistiques">
<span className="material-symbols-outlined text-[18px]">query_stats</span>
<span>5 420 vues</span>
</button>
<div className="flex items-center gap-1">
<button className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors" title="Éditer le dossier">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
<button className="p-1.5 rounded hover:bg-surface-container-lowest text-error transition-colors" title="Mettre en pause">
<span className="material-symbols-outlined text-[18px]">pause_circle</span>
</button>
</div>
</div>
</article>

<article className="property-card bg-surface-container-low rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group" data-status="published">
<div className="flex flex-col">
<div className="relative w-full h-52 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Interior of an ultra luxury penthouse living room in Hydra Algiers with floor-to-ceiling panoramic glass windows overlooking green hills, contemporary marble fireplace and bespoke Italian furnishings" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0MsXTkwmsEtg1HR2zR6aoR_9tWH_hvoDQMzU8rbT2d78AgsIcLaFcG91c7afxar3Y3iRhBFoJSeXP8tq4uUeZ66BDeb9Mm9yXKJHYKzcE2zmmVkx0Qs1XL-cn4k9ely-EHOTATnAuTLfCWWUwi-_ns92n13bhOKd3LYguOPxuJQSO4pbUMoJFkRnCm1_R_qycc4C7reMWV-r8racqjdfFytbPsEjXlKdrbqpnc8rHU-qzEFSm3LI"/>
<div className="absolute top-3 left-3 flex items-center gap-2">
<span className="px-2.5 py-1 rounded bg-primary-container text-surface text-label-sm font-label-sm uppercase font-bold tracking-wider">Location Diplomatique</span>
<span className="px-2.5 py-1 rounded bg-surface-container-lowest text-secondary text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> En Ligne
                </span>
</div>
<div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface text-label-sm font-label-sm">
                Réf: DZ-HY-112
              </div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Hydra • Ambassades</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                Duplex Haut Standing F5
              </h3>
<div className="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant my-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">square_foot</span> 290 m²</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">bathtub</span> 3 SDB</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">balcony</span> Terrasse 45m²</span>
</div>
<div className="pt-space-xs flex items-baseline gap-1.5">
<span className="font-currency-display text-currency-display text-on-surface font-bold">550 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase">DA / mois</span>
<span className="font-body-sm text-body-sm text-on-surface-variant ml-auto">Déposé le 01 Fév 2025</span>
</div>
</div>
</div>
<div className="p-space-md bg-surface-container flex items-center justify-between gap-space-sm">
<button className="flex items-center gap-1 px-space-sm py-1.5 rounded hover:bg-surface-container-lowest text-on-surface font-label-md text-label-md transition-colors" title="Statistiques">
<span className="material-symbols-outlined text-[18px]">query_stats</span>
<span>7 190 vues</span>
</button>
<div className="flex items-center gap-1">
<button className="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors" title="Éditer le dossier">
<span className="material-symbols-outlined text-[18px]">edit_note</span>
</button>
<button className="p-1.5 rounded hover:bg-surface-container-lowest text-error transition-colors" title="Mettre en pause">
<span className="material-symbols-outlined text-[18px]">pause_circle</span>
</button>
</div>
</div>
</article>

<article className="property-card bg-surface-container-low rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group" data-status="pending">
<div className="flex flex-col">
<div className="relative w-full h-52 overflow-hidden bg-surface-dim">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90" data-alt="Expansive private seaside residential land plot in Boumerdes with Mediterranean coastline views, natural topography, perimeter surveying markers in elegant daylight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeS6MudxZs12VeS6qqh8eL3qT7_0DVMM0fi3gDs8beckXSrqcN2DdcH-wkK57BaZS6lMKDiF3O1WEtBJVxfed_xvJWxv7BQrAu42vRjo8RGGyVgfIze6uuayWUhDr3HcIJ8jyfADAh09iW-YtFuOvogXoDxCsSkz4PkV1Mj2alQqBcwEjO58KIZMNm0R6lMtIA5kZAlh2y2aQn_x79dJPcbelGf5qmkd301x4HNp6mMhXlOP8kgH8"/>
<div className="absolute top-3 left-3 flex items-center gap-2">
<span className="px-2.5 py-1 rounded bg-primary-container text-surface text-label-sm font-label-sm uppercase font-bold tracking-wider">Vente Foncier</span>
<span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
<span className="material-symbols-outlined text-[13px]">gavel</span> Audit Notarié
                </span>
</div>
<div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface text-label-sm font-label-sm">
                Réf: DZ-BM-704
              </div>
</div>
<div className="p-space-lg flex flex-col gap-space-sm">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Boumerdès • Front de Mer</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
                Terrain constructible viabilisé
              </h3>
<div className="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant my-1">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">terrain</span> 1 200 m²</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[18px]">description</span> Acte &amp; Livret Foncier</span>
</div>
<div className="pt-space-xs flex items-baseline gap-1.5">
<span className="font-currency-display text-currency-display text-on-surface font-bold">82 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase">DA</span>
<span className="font-body-sm text-body-sm text-secondary ml-auto font-semibold">Examen juriste (24h)</span>
</div>
</div>
</div>
<div className="p-space-md bg-surface-container flex items-center justify-between gap-space-sm">
<span className="text-body-sm font-body-sm text-on-surface-variant italic">Pièces en cours de revue</span>
<div className="flex items-center gap-1">
<button className="px-space-sm py-1 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" title="Compléter documents">
                Compléter dossier
              </button>
</div>
</div>
</article>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">

<section className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Flux Acheteurs &amp; Locataires</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Demandes &amp; Contacts Récents</h2>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm font-bold">
            7 En Attente
          </span>
</div>
<div className="flex flex-col gap-space-sm mt-space-xs">

<div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-primary-container text-surface flex items-center justify-center font-bold text-label-lg font-label-lg flex-shrink-0">
                SM
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Dr. Sofiane Mansouri</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant font-semibold">Acheteur Qualifié</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Intérêt: <strong className="text-on-surface font-medium">Villa Piscine, Chéraga</strong></span>
<span className="text-label-sm font-label-sm text-secondary font-semibold mt-0.5">Demande de visite: Samedi 1er Mars à 14h30</span>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-center">
<a className="p-2 rounded bg-surface-container-lowest hover:bg-surface text-secondary shadow-sm transition-all" href="https://wa.me/213555234567" rel="noopener noreferrer" target="_blank" title="Répondre sur WhatsApp">
<span className="material-symbols-outlined text-[20px]">chat</span>
</a>
<a className="inline-flex items-center gap-1.5 px-space-md py-2 rounded bg-primary-container text-surface hover:bg-primary transition-all font-label-md text-label-md" href="tel:+213555234567">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>+213 555 23 45 67</span>
</a>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center font-bold text-label-lg font-label-lg flex-shrink-0">
                CL
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Cabinet Legrand &amp; Associés</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant font-semibold">Bail Corporatif</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Intérêt: <strong className="text-on-surface font-medium">Duplex F5, Hydra</strong></span>
<span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">Visite sollicitée pour diplomate arrivant mi-mars</span>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-center">
<a className="p-2 rounded bg-surface-container-lowest hover:bg-surface text-secondary shadow-sm transition-all" href="https://wa.me/213661899012" rel="noopener noreferrer" target="_blank" title="Répondre sur WhatsApp">
<span className="material-symbols-outlined text-[20px]">chat</span>
</a>
<a className="inline-flex items-center gap-1.5 px-space-md py-2 rounded bg-primary-container text-surface hover:bg-primary transition-all font-label-md text-label-md" href="tel:+213661899012">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>+213 661 89 90 12</span>
</a>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
<div className="flex items-start gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary text-surface flex items-center justify-center font-bold text-label-lg font-label-lg flex-shrink-0">
                AB
              </div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface">Amine Belkacem</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-label-sm text-on-surface-variant font-semibold">Diaspora (Canada)</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Intérêt: <strong className="text-on-surface font-medium">Terrain Boumerdès</strong></span>
<span className="text-label-sm font-label-sm text-on-surface-variant mt-0.5">Demande de visioconférence et copie du certificat d'urbanisme</span>
</div>
</div>
<div className="flex items-center gap-space-xs self-end sm:self-center">
<a className="p-2 rounded bg-surface-container-lowest hover:bg-surface text-secondary shadow-sm transition-all" href="https://wa.me/213770451122" rel="noopener noreferrer" target="_blank" title="Répondre sur WhatsApp">
<span className="material-symbols-outlined text-[20px]">chat</span>
</a>
<a className="inline-flex items-center gap-1.5 px-space-md py-2 rounded bg-primary-container text-surface hover:bg-primary transition-all font-label-md text-label-md" href="tel:+213770451122">
<span className="material-symbols-outlined text-[18px]">call</span>
<span>+213 770 45 11 22</span>
</a>
</div>
</div>
</div>
</section>

<section className="lg:col-span-5 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Sélection Personnelle</span>
<h2 className="font-headline-md text-headline-md text-on-surface">Derniers Favoris</h2>
</div>
<a className="font-label-md text-label-md text-secondary hover:underline font-semibold" href="#">Voir les 12</a>
</div>
<div className="flex flex-col gap-space-md">

<div className="flex gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
<div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Prestigious apartment in El Biar Algiers panoramic terrace overlooking the bay of Algiers warm golden hour sun" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_6Yq7y1PTNEy-5TPJv05XDJyxZJZtlP4EsfKCXHNiwxn7iICMkDtqnwLiOnWFcvYbeSaiDVkaM08poimsFn6a2gcx_4F3-pmT7fwlfaKiQqgjB63k0xjLVLpgpMWHrQaQSJZrFpSUHYOdb07bzMx7KAMCyxwIidAixc86MXPoIkriOnBZ_zoAn7BgKKZKiCkPMNBEe5i3Ncc1lJUludXcEX0UkL-PEwiarRMcQIxuD60uxttYDVg"/>
</div>
<div className="flex flex-col justify-between flex-grow min-w-0">
<div className="flex flex-col">
<div className="flex items-center justify-between">
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">El Biar • Alger</span>
<button className="text-secondary hover:text-on-surface" title="Retirer des favoris">
<span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>
</div>
<h4 className="font-title-md text-title-md text-on-surface truncate">Penthouse Vue Baie d'Alger</h4>
<span className="font-currency-display text-[18px] text-on-surface font-bold mt-1">98 000 000 DA</span>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-body-sm text-[12px] text-secondary font-medium">Baisse de 5% notée</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">320 m²</span>
</div>
</div>
</div>

<div className="flex gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
<div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-dim">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform" data-alt="Colonial style luxury residence in Poirson El Mouradia Algiers with private green garden and colonnade arcade" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVO_UuKoPO9cKdHgzOEgqcjfoF3ha8ZVnqqw9q1fNwxkJgeNqAd7gTUVcTvOlJoxEdJN7ArOIvJ_k8NMuXp8ZMk4t2kFlbkbm4fDmlG5Wy4BDOamLL0wzlMAFWoDiuwIUJAo3JFZvDgX0BDx8n479NzqnFrGT0huMysr8ikk3C-OYaTk3Z8t2h9P6GFVb9pkJGpPOn7yew0YiRPqJSInMwJp2mF5eFS6NdvD6TQ84_iMec1d5SjW4"/>
</div>
<div className="flex flex-col justify-between flex-grow min-w-0">
<div className="flex flex-col">
<div className="flex items-center justify-between">
<span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">Poirson • El Mouradia</span>
<button className="text-secondary hover:text-on-surface" title="Retirer des favoris">
<span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>
</div>
<h4 className="font-title-md text-title-md text-on-surface truncate">Demeure Néo-Mauresque R+2</h4>
<span className="font-currency-display text-[18px] text-on-surface font-bold mt-1">210 000 000 DA</span>
</div>
<div className="flex items-center justify-between pt-1">
<span className="font-body-sm text-[12px] text-on-surface-variant">Prix stable</span>
<span className="font-label-sm text-[11px] text-on-surface-variant">750 m²</span>
</div>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container flex items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm">
<div className="w-9 h-9 rounded-full bg-secondary-container/40 text-on-secondary-container flex items-center justify-center flex-shrink-0">
<span className="material-symbols-outlined text-[20px]">notifications_active</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-[14px] text-on-surface">Alerte de Prix Directe</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Recevoir par SMS &amp; Email sur Alger</span>
</div>
</div>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
</div>
</section>
</div>

<section className="bg-surface-container-low rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
<div className="flex items-center gap-space-lg">
<div className="w-16 h-16 rounded-full bg-primary-container text-surface flex items-center justify-center flex-shrink-0 shadow-md">
<span className="material-symbols-outlined text-[32px] text-secondary-container">shield_with_house</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Assistance Notariale &amp; Conseil Patrimonial</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Besoin d'un contrôle de conformité foncière à Alger ?</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Nos experts juridiques partenaires vérifient vos actes de propriété, livrets fonciers et permis de lotir en 48h.</p>
</div>
</div>
<button className="inline-flex items-center gap-2 px-space-lg py-space-sm rounded bg-primary-container text-surface hover:bg-primary transition-all font-label-md text-label-md flex-shrink-0 shadow-sm">
<span className="material-symbols-outlined text-[18px]">support_agent</span>
<span>Contacter la Conciergerie</span>
</button>
</section>
</div>

<div className="fixed inset-0 z-50 bg-primary/60 backdrop-blur-sm hidden items-center justify-center p-space-md overflow-y-auto" id="depositModal">
<div className="bg-surface-container-lowest rounded-xl max-w-3xl w-full max-h-[921px] overflow-y-auto shadow-2xl flex flex-col my-auto">

<div className="p-space-lg bg-primary-container text-surface flex items-center justify-between sticky top-0 z-20">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider font-semibold">Prime House Mandat Exclusif</span>
<h3 className="font-headline-md text-headline-md text-surface">Dépôt d'une Nouvelle Annonce</h3>
</div>
<button className="p-1 rounded-full text-primary-fixed-dim hover:text-surface hover:bg-surface/10 transition-colors" >
<span className="material-symbols-outlined text-[24px]">close</span>
</button>
</div>

<form className="p-space-lg lg:p-space-xl flex flex-col gap-space-lg" >

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs md:col-span-2">
<label className="font-label-md text-label-md font-semibold text-on-surface">Titre de l'Annonce</label>
<input className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Ex: Splendide Villa d'Architecte avec Vue Mer" required="" type="text"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Type de Transaction</label>
<select className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary">
<option value="vente">Vente Définitive</option>
<option value="location">Location Résidentielle</option>
<option value="location_corp">Location Diplomatique &amp; Entreprise</option>
</select>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Typologie du Bien</label>
<select className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary">
<option value="villa">Villa Individuelle</option>
<option value="duplex">Duplex / Penthouse</option>
<option value="appartement">Appartement Haut Standing</option>
<option value="terrain">Terrain Constructible</option>
</select>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Wilaya</label>
<select className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary">
<option value="16">16 - Alger</option>
<option value="31">31 - Oran</option>
<option value="25">25 - Constantine</option>
<option value="35">35 - Boumerdès</option>
<option value="42">42 - Tipaza</option>
</select>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Commune / Quartier</label>
<input className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Ex: Hydra, Chéraga, El Biar..." required="" type="text"/>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Prix demandé (DA)</label>
<input className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Ex: 85000000" required="" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Superficie (m²)</label>
<input className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Ex: 350" required="" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Nombre de Pièces</label>
<input className="p-space-sm rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary" placeholder="Ex: 6" type="number"/>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md font-semibold text-on-surface">Photographies Architecturales (Min. 3 clichés)</label>
<div className="p-space-lg rounded-lg bg-surface-container-low flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-colors">
<span className="material-symbols-outlined text-[36px] text-secondary">add_photo_alternate</span>
<span className="font-title-md text-title-md text-on-surface mt-2">Glissez vos photographies haute définition</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Formats JPG, PNG ou WEBP acceptés (Max 15MB par fichier)</span>
</div>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low flex flex-col gap-space-sm">
<label className="flex items-start gap-space-sm cursor-pointer">
<input className="mt-1 h-4 w-4 rounded text-secondary focus:ring-secondary" required="" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">
              Je certifie disposer de <strong>l'Acte Notarié</strong> et du <strong>Livret Foncier</strong> en règle pour ce bien immobilier.
            </span>
</label>
<label className="flex items-start gap-space-sm cursor-pointer">
<input className="mt-1 h-4 w-4 rounded text-secondary focus:ring-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface">
              Le bien dispose d'un <strong>Certificat de Conformité (Loi 08-15)</strong> validé par les services de l'urbanisme.
            </span>
</label>
</div>

<div className="flex items-center justify-end gap-space-md pt-space-xs">
<button className="px-space-lg py-space-sm rounded hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors"  type="button">
            Annuler
          </button>
<button className="px-space-xl py-space-sm rounded bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg transition-transform hover:-translate-y-0.5 shadow-md" type="submit">
            Soumettre pour validation notariée
          </button>
</div>
</form>
</div>
</div>

</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
