'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8">
<div className="flex flex-col max-w-2xl">
<div className="flex items-center gap-2 mb-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Console d'Exploitation Nationale</span>
<span className="text-surface-variant font-label-sm">•</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger Centre, DZ</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Tableau de Bord — Console d'Administration
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
        Supervision globale du parc immobilier, flux de modération foncière et traitement des demandes acquéreurs en Algérie.
      </p>
</div>
<div className="flex flex-wrap items-center gap-3">

<div className="flex items-center gap-2 px-3 py-2 rounded bg-surface-container-low shadow-sm">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed-dim opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Supabase DB connectée <strong className="text-on-surface font-semibold">(v15.2)</strong></span>
</div>

<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-all duration-200 font-label-md text-label-md shadow-sm" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
<span>Exporter le registre (CSV/PDF)</span>
</button>

<a className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary hover:bg-secondary-fixed-dim text-on-secondary hover:text-on-secondary-fixed transition-all duration-200 font-label-lg text-label-lg shadow-md shadow-secondary/20 transform hover:-translate-y-0.5" data-path="ajouter-un-bien" href="/admin/ajouter-bien">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
<span>Ajouter un bien</span>
</a>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Total des Biens en Base</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">148</span>
<span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full font-bold">+12 ce mois</span>
</div>
<div className="mt-4 pt-3 bg-surface-container-low rounded p-2.5 flex items-center justify-between font-label-sm text-label-sm">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="text-on-surface font-semibold">94 Ventes</span>
<span className="text-on-surface-variant">(63.5%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-on-surface font-semibold">54 Locations</span>
<span className="text-on-surface-variant">(36.5%)</span>
</div>
</div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden flex">
<div className="bg-primary-container h-full" style={{ "width": "63.5%" }}></div>
<div className="bg-secondary h-full" style={{ "width": "36.5%" }}></div>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Biens Actifs Publiés</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">public</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">128</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">en ligne</span>
</div>
<div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-high text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
<span className="font-label-sm text-label-sm truncate font-semibold">Visibilité 100% sur le site public</span>
</div>
</div>
<div className="flex items-center justify-between pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span>Taux de conversion vue/contact</span>
<span className="font-bold text-on-surface">4.8%</span>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">En Attente d'Approbation</span>
<div className="w-9 h-9 rounded bg-error-container text-on-error-container flex items-center justify-center animate-pulse">
<span className="material-symbols-outlined text-[20px]">gavel</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-error">14</span>
<span className="font-body-sm text-body-sm text-error font-medium">dossiers fonciers</span>
</div>
<div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded bg-error-container text-on-error-container">
<span className="material-symbols-outlined text-[16px]">priority_high</span>
<span className="font-label-sm text-label-sm font-semibold truncate">Action requise sous 24h</span>
</div>
</div>
<div className="flex items-center gap-2 pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">description</span>
<span className="truncate">Actes notariés &amp; livrets en vérif</span>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Nouvelles Demandes &amp; Visites</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">38</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">requêtes</span>
</div>
<div className="mt-4 flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-low">
<span className="font-label-sm text-label-sm text-on-surface font-semibold">8 non traitées aujourd'hui</span>
<span className="w-2 h-2 rounded-full bg-error"></span>
</div>
</div>
<div className="flex items-center justify-between pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span>Canal dominant : WhatsApp DZ</span>
<span className="font-bold text-secondary">71%</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
<div className="p-4 rounded bg-primary-container text-surface-container-lowest flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[26px]">account_balance</span>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest">Volume Valeur Portefeuille Géré</span>
<div className="flex items-baseline gap-1.5 mt-0.5">
<span className="font-currency-display text-currency-display text-secondary-fixed">24.8</span>
<span className="font-title-md text-title-md text-surface-container-lowest">Milliards DA</span>
</div>
</div>
</div>
<div className="hidden sm:flex flex-col text-right">
<span className="font-label-sm text-label-sm text-surface-container-highest">Évaluation Algérie 2025</span>
<span className="font-body-sm text-body-sm text-secondary-fixed">+8.4% vs T4 2024</span>
</div>
</div>
<div className="p-4 rounded bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[26px]">map</span>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Wilayas Actives Couvertes</span>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">14 Wilayas</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(Alger, Oran, Blida, Boumerdès, Tipaza...)</span>
</div>
</div>
</div>
<a className="hidden sm:flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline" href="#">
<span>Cartographie</span>
<span className="material-symbols-outlined text-[16px]">north_east</span>
</a>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-8 flex flex-col gap-5">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Biens Récemment Ajoutés &amp; Soumis</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Suivi en temps réel des transactions, dossiers d'annonces et statuts d'approbation</p>
</div>

<div className="inline-flex rounded bg-surface-container p-1 gap-1">
<button className="px-3 py-1.5 rounded font-label-md text-label-md bg-surface-container-lowest text-on-surface shadow-sm font-semibold transition-all" type="button">Tous (148)</button>
<button className="px-3 py-1.5 rounded font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">En attente (14)</button>
<button className="px-3 py-1.5 rounded font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-all" type="button">Publiés (128)</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
<th className="py-3 px-4 rounded-l">Bien &amp; Référence</th>
<th className="py-3 px-3">Type / Mandat</th>
<th className="py-3 px-3">Prix Actuel</th>
<th className="py-3 px-3">Localisation</th>
<th className="py-3 px-3">Statut</th>
<th className="py-3 px-4 text-right rounded-r">Actions</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y divide-surface-container-high/40">

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-3.5 px-4 flex items-center gap-3">
<div className="w-14 h-12 rounded bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Luxurious modern villa exterior in Hydra Algiers with private swimming pool, palm trees, architectural limestone facade, bright Mediterranean daylight, golden hour reflections." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJdUJNFHFdrmdMGZr5rRpYjpaUgWlsoh1TcbcCrnhjAAso39bdhR_HGRPJyRhGFWezJXFq27mfsK7VHxyAxLDT6Jg-DxJLero2fXkvSvQFFi-d-Moiemwcx3lbda7pB43X8Pkji0bYxLPrSq5BeaMj74xVdVus83U85eDdmw2F65bpTdE-mcdZmFr8L34CPfXqQ8x_VptTn7T8SprQxIMlkdDMCWgTqIEtpcznvVQOe34vBnRANNI"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface font-semibold truncate">Villa d'Architecte avec Piscine</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">REF: PH-ALG-104 • 650 m²</span>
</div>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Villa</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">Vente Exclusive</span>
</div>
</td>
<td className="py-3.5 px-3 whitespace-nowrap">
<span className="font-label-lg text-label-lg font-bold text-on-surface">165 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-0.5">DA</span>
</td>
<td className="py-3.5 px-3">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
<span className="font-medium">Hydra, Alger</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>Publié</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Examiner" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Modifier" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-3.5 px-4 flex items-center gap-3">
<div className="w-14 h-12 rounded bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="High-end duplex living room interior in El Biar Algiers with panoramic bay view, luxury minimalist Italian furniture, marble floors, warm ambient lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNWNnt1QYF392ZdXIZv2JyYOOC1CKVSeeR6-lXZpXFjruoBgiUe5k8efxtzIo656O-tl4WvI2br2rBNcxtposN0Q6SBT-QiMdlFtrlWE7mRaCvDQn92d5Z2YzAKkevF_jAH9Tgqrp0-o526kvhKtue7lUv8USa4hIT0QGCemCiarcpPR4x1Bg6CwWohniF8v7REe-8qg9fB0eZKIq1X9oMPSmIaXvpxRkWQ_WfvX2oNzLozPg_Kb4"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface font-semibold truncate">Duplex de Maître Belvédère</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">REF: PH-LOC-088 • 290 m²</span>
</div>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Duplex</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Location</span>
</div>
</td>
<td className="py-3.5 px-3 whitespace-nowrap">
<span className="font-label-lg text-label-lg font-bold text-on-surface">450 000</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">DA/mois</span>
</td>
<td className="py-3.5 px-3">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
<span className="font-medium">El Biar, Alger</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>Publié</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Examiner" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Modifier" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-3.5 px-4 flex items-center gap-3">
<div className="w-14 h-12 rounded bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Exclusive luxury seaside penthouse in Canastel Oran overlooking the Mediterranean sea, large glass balcony with panoramic ocean horizon, refined exterior architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbZXPoI9G6eXajBebcvPqzhnEB0ejRn1lQR7t4Rp_2KPRxvBq7wUprEGKtiXIY1VAAuwjDgp1F62RMhGH_v_Eyxmoiq2uUG794Di-Fjd04Iy0EM7p3-V0pvt0QSd0FjXArtrS9-BuDZNBoMpwKRVAUmiY5xVkJs9L82DGXiyLwpeEpBBEC8udKgVsKHlpubrFo5vu-7AisZPQbdqIXwtX3nIRAb3S9H5_Kpc56xTQC7uXI9CTuh5E"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface font-semibold truncate">Penthouse Front de Mer</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">REF: PH-ORN-019 • 410 m²</span>
</div>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Penthouse</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">Vente Prestige</span>
</div>
</td>
<td className="py-3.5 px-3 whitespace-nowrap">
<span className="font-label-lg text-label-lg font-bold text-on-surface">115 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-0.5">DA</span>
</td>
<td className="py-3.5 px-3">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
<span className="font-medium">Canastel, Oran</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span>En modération</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Examiner" type="button">
<span className="material-symbols-outlined text-[18px]">rule</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Modifier" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-3.5 px-4 flex items-center gap-3">
<div className="w-14 h-12 rounded bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Spacious residential plot of building land in Corso Boumerdes Algeria with lush olive trees, gentle slope, modern surveyor markers, calm blue sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhSjdMw_yYdH11ldDMETV8cjoVgDhEljpLixvQjh6BU-y7j5fWlk7mj996_FfFFFYnapIBsg_Hsj212Q7LovR-IVERtenf8VfrUoY66akGvzFeexv0J4hM7OV2uOIMTrjUs35FfC0oGVeta2DsZtJRJdpShtYUTOl6x41lm4WWa3HdsJlnQlSjP1WgS_mugozEL1QkLUJtM-9NFAnYkeRO5F_oH6cAhMjPFqegp2HNE4SHR9kfyco"/>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-md text-title-md text-on-surface font-semibold truncate">Terrain constructible viabilisé</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">REF: PH-BMD-041 • 1 200 m²</span>
</div>
</td>
<td className="py-3.5 px-3">
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Terrain</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Vente</span>
</div>
</td>
<td className="py-3.5 px-3 whitespace-nowrap">
<span className="font-label-lg text-label-lg font-bold text-on-surface">93 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-0.5">DA</span>
</td>
<td className="py-3.5 px-3">
<div className="flex items-center gap-1 text-on-surface">
<span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
<span className="font-medium">Corso, Boumerdès</span>
</div>
</td>
<td className="py-3.5 px-3">
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
<span>Brouillon</span>
</span>
</td>
<td className="py-3.5 px-4 text-right">
<div className="flex items-center justify-end gap-1">
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Examiner" type="button">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Modifier" type="button">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
<button className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Options" type="button">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="flex items-center justify-between pt-2">
<span className="font-body-sm text-body-sm text-on-surface-variant">Affichage de 4 biens sur 148 au registre national</span>
<a className="inline-flex items-center gap-2 font-label-lg text-label-lg text-secondary hover:text-on-surface transition-colors font-semibold" data-path="tous-les-biens" href="/admin/biens">
<span>Voir l'intégralité des 148 biens</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>
</div>

<div className="p-5 rounded-lg bg-primary-container text-surface-container-lowest shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-on-secondary flex-shrink-0">
<span className="material-symbols-outlined text-[22px]">policy</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-surface-container-lowest">Contrôle Foncier &amp; Sécurisation Notariale</h3>
<p className="font-body-sm text-body-sm text-surface-container-highest">14 dossiers en attente avec livret foncier numérisé sous protocole d'authentification.</p>
</div>
</div>
<a className="px-4 py-2 rounded bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-container-lowest font-label-md text-label-md transition-colors text-center whitespace-nowrap" data-path="biens-en-moderation" href="/admin/moderation">
          Ouvrir le sas de validation
        </a>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">history</span>
<h2 className="font-title-lg text-title-lg text-on-surface">Journal d'Activité</h2>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">Temps réel</span>
</div>
<div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-surface-container-high">

<div className="relative group">
<span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Approbation Mandat</span>
<p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                Me Yacine M. a validé la villa <strong>PH-ALG-104</strong> (Hydra).
              </p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Il y a 32 min • Alger</span>
</div>
</div>

<div className="relative group">
<span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface-container-lowest"></span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Nouvelle Demande de Visite</span>
<p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                Dr. Sofiane M. sur le Duplex <strong>PH-LOC-088</strong> via WhatsApp.
              </p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Il y a 1h • Leads Concierge</span>
</div>
</div>

<div className="relative group">
<span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim ring-4 ring-surface-container-lowest"></span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Mise à la Une</span>
<p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                Penthouse Oran (Canastel) promu en couverture homepage.
              </p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Il y a 3h • Gestion Vitrine</span>
</div>
</div>

<div className="relative group">
<span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-outline ring-4 ring-surface-container-lowest"></span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">Mise à Jour Tarifaire</span>
<p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                Prix réajusté sur Terrain Boumerdès (<strong>-5 000 000 DA</strong>).
              </p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Il y a 5h • Propriétaire Mandant</span>
</div>
</div>

<div className="relative group">
<span className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-secondary ring-4 ring-surface-container-lowest"></span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Agent Partenaire</span>
<p className="font-body-sm text-body-sm text-on-surface mt-0.5">
                Agence El Kheir Constantine en attente de vérification KYC.
              </p>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Il y a 6h • Réseau National</span>
</div>
</div>
</div>
<button className="w-full mt-6 py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface text-center font-label-md text-label-md transition-colors" type="button">
          Voir l'historique complet des logs
        </button>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-2">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">dns</span>
<h2 className="font-title-lg text-title-lg text-on-surface">Santé Système</h2>
</div>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded font-semibold">
            Opérationnel
          </span>
</div>

<div className="p-3.5 rounded bg-surface-container-low flex flex-col gap-1.5">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface font-semibold flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
              Base PostgreSQL Supabase
            </span>
<span className="text-secondary font-bold">99.98%</span>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>Latence : 34ms (Nœud Alger)</span>
<span>Cluster DZ-Nord</span>
</div>
</div>

<div className="p-3.5 rounded bg-surface-container-low flex flex-col gap-2">
<div className="flex items-center justify-between font-label-md text-label-md">
<span className="text-on-surface font-semibold flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">cloud_done</span>
              Stockage Photos CDN (WebP)
            </span>
<span className="text-on-surface font-bold">42.4%</span>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ "width": "42.4%" }}></div>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>42.4 Go / 100 Go alloués</span>
<span className="text-secondary font-semibold">Optimisation auto</span>
</div>
</div>

<div className="p-3.5 rounded bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-2.5">
<div className="w-7 h-7 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[18px]">security</span>
</div>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Sécurité RLS Active</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Row Level Security validée</span>
</div>
</div>
<span className="material-symbols-outlined text-secondary text-[20px]">check_circle</span>
</div>
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
