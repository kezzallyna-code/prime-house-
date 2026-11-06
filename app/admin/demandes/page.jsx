'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="relative w-full">
<div className="absolute -top-10 right-24 w-96 h-96 bg-secondary-fixed/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
<div className="absolute top-48 left-12 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

<section className="flex flex-col gap-6 mb-8">

<div className="flex flex-wrap items-center justify-between gap-4">
<nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
<span className="hover:text-primary transition-colors">Administration</span>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span className="hover:text-primary transition-colors">Leads &amp; Relations</span>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span className="text-secondary font-semibold">Demandes &amp; Visites</span>
</nav>
<div className="flex items-center gap-3">

<div className="flex items-center bg-surface-container-lowest px-3 py-2 rounded shadow-sm text-on-surface">
<span className="material-symbols-outlined text-[18px] text-secondary mr-2">calendar_today</span>
<select className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer pr-2">
<option value="month">Ce mois-ci (Octobre)</option>
<option  value="week">7 derniers jours</option>
<option value="quarter">Trimestre en cours</option>
</select>
</div>

<button className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded shadow-sm hover:bg-surface-container transition-all group font-label-md text-label-md" id="refreshBtn" >
<span className="material-symbols-outlined text-[18px] text-secondary group-hover:rotate-180 transition-transform duration-500" id="refreshIcon">sync</span>
<span>Actualiser</span>
</button>

<button className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded shadow-md hover:bg-surface-container-highest hover:text-on-surface transition-all font-label-md text-label-md">
<span className="material-symbols-outlined text-[18px] text-secondary-fixed">file_download</span>
<span>Exporter Leads (CSV)</span>
</button>
</div>
</div>

<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<div className="flex items-center gap-2.5 mb-1.5">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim ring-4 ring-secondary-fixed/20 animate-pulse"></span>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Flux Direct • Conciergerie Privée</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestion des Demandes &amp; Visites</h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
            Suivi centralisé des prises de contact, demandes de visites privées sécurisées et requêtes conciergerie issues du portail public et des canaux directs.
          </p>
</div>
<div className="flex items-center gap-2 bg-surface-container px-3.5 py-2 rounded-full self-start md:self-auto">
<span className="material-symbols-outlined text-[16px] text-secondary">database</span>
<span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wide">Sync Supabase : <strong className="text-on-surface font-bold">inquiries (DZ-Node)</strong></span>
</div>
</div>
</section>

<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

<div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Total Enregistré</span>
<span className="font-currency-display text-currency-display text-on-surface mt-2 font-bold tracking-tight">38</span>
</div>
<div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">inbox</span>
</div>
</div>
<div className="flex items-center gap-2 mt-4 pt-3 bg-surface-container-low px-3 py-1.5 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
<span className="font-body-sm text-body-sm text-on-surface-variant"><strong className="text-on-surface font-semibold">+14%</strong> vs mois précédent</span>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Nouvelles Requêtes</span>
<div className="flex items-baseline gap-2 mt-2">
<span className="font-currency-display text-currency-display text-on-surface font-bold">8</span>
<span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-semibold animate-pulse">Action requise</span>
</div>
</div>
<div className="w-11 h-11 rounded bg-secondary-fixed/30 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[22px]">notifications_active</span>
</div>
</div>
<div className="flex items-center gap-2 mt-4 pt-3 bg-secondary-fixed/10 px-3 py-1.5 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Délai moyen de prise en charge : <strong className="text-on-surface font-semibold">22 min</strong></span>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Visites Programmées</span>
<span className="font-currency-display text-currency-display text-on-surface mt-2 font-bold tracking-tight">12</span>
</div>
<div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">event_available</span>
</div>
</div>
<div className="flex items-center gap-2 mt-4 pt-3 bg-surface-container-low px-3 py-1.5 rounded">
<span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Protocole d'escorte &amp; identités validés</span>
</div>
</div>

<div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
<div className="flex items-start justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Conversion Lead / Visite</span>
<div className="flex items-baseline gap-1 mt-2">
<span className="font-currency-display text-currency-display text-on-surface font-bold">64</span>
<span className="font-title-lg text-title-lg text-secondary font-bold">%</span>
</div>
</div>
<div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[22px]">auto_graph</span>
</div>
</div>

<div className="flex items-center justify-between gap-3 mt-4 pt-2">
<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ "width": "64%" }}></div>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold whitespace-nowrap">Haut panier</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-5 rounded shadow-sm mb-6 flex flex-col gap-4">

<div className="grid grid-cols-1 md:grid-cols-12 gap-4">

<div className="md:col-span-5 relative flex items-center">
<span className="material-symbols-outlined text-[20px] text-outline absolute left-3.5 pointer-events-none">search</span>
<input className="w-full bg-surface pl-10 pr-4 py-2.5 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors" id="searchInput" onkeyup="filterTableSearch()" placeholder="Rechercher par nom, tél (+213), email, réf bien (PH-ALG)..." type="text"/>
</div>

<div className="md:col-span-2">
<div className="relative bg-surface rounded">
<select className="w-full bg-transparent px-3 py-2.5 font-label-md text-label-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="">Type : Tous</option>
<option value="visite">Visite Privée</option>
<option value="tarif">Renseignement Tarifaire</option>
<option value="offre">Offre d'Achat</option>
<option value="location">Dossier Location</option>
</select>
<span className="material-symbols-outlined text-[18px] text-outline absolute right-2.5 top-3 pointer-events-none">expand_more</span>
</div>
</div>

<div className="md:col-span-3">
<div className="relative bg-surface rounded">
<select className="w-full bg-transparent px-3 py-2.5 font-label-md text-label-md text-on-surface focus:outline-none appearance-none cursor-pointer truncate">
<option value="">Propriété : Toutes</option>
<option value="104">Villa Contemporaine — Hydra (PH-ALG-104)</option>
<option value="208">Penthouse Belvédère — El Biar (PH-ALG-208)</option>
<option value="315">Domaine Panoramique — Tipaza (PH-TIP-315)</option>
<option value="412">Manoir Colonial Rénové — Poirson (PH-ALG-412)</option>
</select>
<span className="material-symbols-outlined text-[18px] text-outline absolute right-2.5 top-3 pointer-events-none">expand_more</span>
</div>
</div>

<div className="md:col-span-2">
<div className="relative bg-surface rounded">
<select className="w-full bg-transparent px-3 py-2.5 font-label-md text-label-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="">Canal : Tous</option>
<option value="web">Formulaire Fiche Bien</option>
<option value="concierge">Conciergerie Directe</option>
<option value="whatsapp">WhatsApp Business</option>
<option value="private">Club Diaspora VIP</option>
</select>
<span className="material-symbols-outlined text-[18px] text-outline absolute right-2.5 top-3 pointer-events-none">expand_more</span>
</div>
</div>
</div>

<div className="flex items-center gap-2 overflow-x-auto pt-2">
<button className="status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-primary text-on-primary font-bold shadow-sm transition-all whitespace-nowrap" >
<span>Tous</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-on-primary text-[11px]">38</span>
</button>
<button className="status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-surface text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" >
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Nouveau</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">8</span>
</button>
<button className="status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-surface text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" >
<span className="w-2 h-2 rounded-full bg-outline"></span>
<span>Contacté</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">18</span>
</button>
<button className="status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-surface text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" >
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span>Visite Programmée</span>
<span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px]">7</span>
</button>
<button className="status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-surface text-on-surface hover:bg-surface-container transition-all whitespace-nowrap" >
<span className="w-2 h-2 rounded-full bg-outline-variant"></span>
<span>Clôturé / Traité</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">5</span>
</button>
</div>
</section>

<div className="relative bg-surface-container-lowest rounded shadow-sm overflow-hidden mb-12">

<div className="px-6 py-4 bg-surface-container-low flex items-center justify-between text-on-surface">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Dossiers actifs :</span>
<span className="font-label-md text-label-md text-secondary font-bold" id="activeCountLabel">38 pistes identifiées</span>
</div>
<div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
<span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary"></span> Ordre chrono descendant</span>
<span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">lock</span> Chiffrement RGPD / DZ Law</span>
</div>
</div>
<div className="overflow-x-auto">
<table className="w-full text-left" id="leadsTable">
<thead>
<tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
<th className="py-3.5 px-6 font-semibold" scope="col">Demandeur &amp; Profil</th>
<th className="py-3.5 px-6 font-semibold" scope="col">Bien Rattaché</th>
<th className="py-3.5 px-6 font-semibold" scope="col">Message &amp; Attentes</th>
<th className="py-3.5 px-6 font-semibold" scope="col">Statut Dossier</th>
<th className="py-3.5 px-6 text-right font-semibold" scope="col">Actions Immédiates</th>
</tr>
</thead>
<tbody className="divide-y divide-transparent font-body-sm text-body-sm text-on-surface">

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" >

<td className="py-5 px-6 align-top">
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-bold">Malek Ziani</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wide">Investisseur Diaspora (UK)</span>
</div>
<div className="flex flex-col text-on-surface-variant gap-0.5">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
<span className="material-symbols-outlined text-[14px] text-secondary">phone</span>
<span>+213 550 49 82 11</span>
</div>
<span className="text-on-surface-variant text-[12px]">m.ziani.holdings@london.co.uk</span>
</div>
<span className="font-label-sm text-label-sm text-outline mt-1 flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">verified</span> Pièce d'identité reçue
                  </span>
</div>
</td>

<td className="py-5 px-6 align-top max-w-[260px]">
<div className="flex gap-3">
<div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Villa Hydra" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Architecture contemporaine haut de gamme d'une somptueuse villa à Hydra Alger, grandes baies vitrées donnant sur une piscine privée à débordement, lumière méditerranéenne dorée naturelle, luxe minimaliste discret." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoKIDmKuPF_FWI1cdOAybvpwYgcSm8X3a3RW1HAiFaFnJgH05AboKERZKWRcnT_yEmOcjN3QC3NRR6TEZV1wkcHCF9v0YCNxA0ITbLlXA7WUPOpj8s-wCo51RjWXPAyLEmSmjUjelr4yzD7WvVEP5xo-DCeVZRQx8jTy-yAq7kHix13VyL4eZHaC-u7AvrYXoQp_bdlpxP7uXkmQFQTPCw5iltzArrc9gSZk1TPUxLxtJ4Ug51QoU"/>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">PH-ALG-104</span>
<span className="font-title-md text-title-md text-on-surface leading-tight line-clamp-1">Villa Contemporaine d'Exception</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Hydra • Ambassades</span>
<span className="font-currency-display text-[15px] font-bold text-on-surface mt-1">165 000 000 <span className="text-secondary font-label-sm">DA</span></span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top max-w-xs">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-[14px]">schedule</span>
<span>Aujourd'hui à 11:24</span>
<span className="text-outline">• Source Fiche Web</span>
</div>
<p className="text-on-surface-variant line-clamp-2 italic">
                    « Souhaite visiter ce samedi matin avec mon architecte conseil. Acquisition pour installation familiale directe. Financement comptant disponible sans crédit bancaire. »
                  </p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded bg-surface text-on-surface-variant text-[11px] font-medium">Samedi 10:30 souhaité</span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed/30 text-on-secondary-fixed text-[11px] font-bold">Comptant</span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top" >
<div className="relative inline-block w-44">
<select className="w-full bg-secondary-fixed/40 text-on-secondary-fixed font-label-md text-label-md px-3 py-2 rounded appearance-none font-bold cursor-pointer focus:outline-none" onchange="updateLeadStatusColor(this)">
<option  value="new">★ Nouveau [Action]</option>
<option value="contacted">Contacté</option>
<option value="scheduled">Visite Programmée</option>
<option value="closed">Clôturé / Traité</option>
</select>
<span className="material-symbols-outlined text-[16px] text-on-secondary-fixed absolute right-2.5 top-2.5 pointer-events-none">arrow_drop_down</span>
</div>
<div className="font-label-sm text-label-sm text-outline mt-1.5">Assigné : Karim Benali</div>
</td>

<td className="py-5 px-6 align-top text-right" >
<div className="flex items-center justify-end gap-1.5">
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" href="https://wa.me/213550498211" target="_blank" title="Contacter par WhatsApp">
<span className="material-symbols-outlined text-[18px]">chat</span>
</a>
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="tel:+213550498211" title="Appeler le client">
<span className="material-symbols-outlined text-[18px]">call</span>
</a>
<button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"  title="Ouvrir dossier complet">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded bg-surface flex items-center justify-center text-outline hover:text-on-surface transition-colors" title="Plus d'actions">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" >

<td className="py-5 px-6 align-top">
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-bold">Dr. Yacine Khellaf</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container-highest text-on-primary-container font-label-sm text-label-sm font-semibold">Corporate &amp; Institutionnel</span>
</div>
<div className="flex flex-col text-on-surface-variant gap-0.5">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
<span className="material-symbols-outlined text-[14px] text-secondary">phone</span>
<span>+213 661 14 02 88</span>
</div>
<span className="text-on-surface-variant text-[12px]">y.khellaf@consortium-med.dz</span>
</div>
<span className="font-label-sm text-label-sm text-secondary mt-1 flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[13px]">verified_user</span> Client VIP Reconduit
                  </span>
</div>
</td>

<td className="py-5 px-6 align-top max-w-[260px]">
<div className="flex gap-3">
<div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Penthouse Belvédère" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Intérieur raffiné d'un duplex penthouse sur les hauteurs d'El Biar à Alger, vue panoramique sur la baie, terrasse avec solarium, finitions en marbre blanc et boiseries nobles italiennes, ambiance crépusculaire douce." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbvXnXhW33KxuzASeABTR_qj2DvX6KhbwBOZjZ8oTuwF0GCQeEdBIJaCTnQI44YxLshbWID1xLGk5bDG5se4fvCMSjSfOCt-HWBcSqYIBc_EQ_DFGGb295ZIVXQJVl3SceR2mbHV_ao1fP4LmnQbttGBwh-mHdHIGmvCkbc92MRl6kxLEy3tfp0fZUUETkzDwggc9e1qRJW4_1ow2xX_AaTJnKB1EEDq8KPLOInFB-ap2R8RcHH10"/>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">PH-ALG-208</span>
<span className="font-title-md text-title-md text-on-surface leading-tight line-clamp-1">Penthouse Belvédère &amp; Terrasse</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">El Biar • Hauteurs</span>
<span className="font-currency-display text-[15px] font-bold text-on-surface mt-1">450 000 <span className="text-secondary font-label-sm">DA/mois</span></span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top max-w-xs">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">event</span>
<span>Hier à 16:40</span>
<span className="text-outline">• Conciergerie</span>
</div>
<p className="text-on-surface-variant line-clamp-2 italic">
                    « Recherche bail 36 mois pour délégation commerciale. Besoin impératif de 3 places sécurisées en sous-sol et groupe électrogène de secours silencieux. »
                  </p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[11px] font-bold">Visite Vendredi 15h00</span>
<span className="px-2 py-0.5 rounded bg-surface text-on-surface-variant text-[11px]">Bail diplomatique</span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top" >
<div className="relative inline-block w-44">
<select className="w-full bg-primary-fixed text-on-primary-fixed font-label-md text-label-md px-3 py-2 rounded appearance-none font-bold cursor-pointer focus:outline-none" onchange="updateLeadStatusColor(this)">
<option value="new">Nouveau</option>
<option value="contacted">Contacté</option>
<option  value="scheduled">Visite Programmée</option>
<option value="closed">Clôturé / Traité</option>
</select>
<span className="material-symbols-outlined text-[16px] text-on-primary-fixed absolute right-2.5 top-2.5 pointer-events-none">arrow_drop_down</span>
</div>
<div className="font-label-sm text-label-sm text-outline mt-1.5">Assigné : Sarah Haddad</div>
</td>

<td className="py-5 px-6 align-top text-right" >
<div className="flex items-center justify-end gap-1.5">
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" href="https://wa.me/213661140288" target="_blank" title="Contacter par WhatsApp">
<span className="material-symbols-outlined text-[18px]">chat</span>
</a>
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="tel:+213661140288" title="Appeler le client">
<span className="material-symbols-outlined text-[18px]">call</span>
</a>
<button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"  title="Ouvrir dossier complet">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded bg-surface flex items-center justify-center text-outline hover:text-on-surface transition-colors" title="Plus d'actions">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer" >

<td className="py-5 px-6 align-top">
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-bold">Amina Cherif</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Particulier Vérifié</span>
</div>
<div className="flex flex-col text-on-surface-variant gap-0.5">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
<span className="material-symbols-outlined text-[14px] text-secondary">phone</span>
<span>+213 770 91 33 05</span>
</div>
<span className="text-on-surface-variant text-[12px]">amina.cherif.dz@gmail.com</span>
</div>
<span className="font-label-sm text-label-sm text-outline mt-1">Oran Centre / En déplacement Alger</span>
</div>
</td>

<td className="py-5 px-6 align-top max-w-[260px]">
<div className="flex gap-3">
<div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Manoir Rénové" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Manoir et villa de maître néo-mauresque rénovée à Poirson El Biar, jardin d'oliviers centenaires, arcades en pierre taillée, éclairage de façade tamisé et solennel sous le ciel nocturne." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKIE3hlwioTe8-UA4uhIzq-HPLQ7dzL5LJRNyajmH-USsRGd8qprAYjwdT2uQ4prmWR-_xVtm6KGCRIl4FehGtdw2dzoD9xfmd9JeAMfd9QIUCvC-Kp0gdIvLvT1EbxMBRot2uQ3T8MAj6TT1bfx3NCnExEa8QZPZ4uUpdyovX5qYuiqMV2kXdhV60QEi2_BCmkFUYW_wE95DKZnhwvBgQZoC1hePSw5RoA0MJWdmxBQo6n40AbGA"/>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">PH-ALG-412</span>
<span className="font-title-md text-title-md text-on-surface leading-tight line-clamp-1">Manoir Néomauresque Rénové</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Poirson • Clos Privé</span>
<span className="font-currency-display text-[15px] font-bold text-on-surface mt-1">210 000 000 <span className="text-secondary font-label-sm">DA</span></span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top max-w-xs">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">chat</span>
<span>14 Octobre à 09:15</span>
<span className="text-outline">• WhatsApp Lead</span>
</div>
<p className="text-on-surface-variant line-clamp-2 italic">
                    « Souhaite connaitre l'acte de propriété (Livret Foncier et Certificat de Conformité à jour ?). Prise de contact effectuée par WhatsApp ce matin. »
                  </p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded bg-surface text-on-surface-variant text-[11px]">Dossier juridique transmis</span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top" >
<div className="relative inline-block w-44">
<select className="w-full bg-surface-container text-on-surface font-label-md text-label-md px-3 py-2 rounded appearance-none font-bold cursor-pointer focus:outline-none" onchange="updateLeadStatusColor(this)">
<option value="new">Nouveau</option>
<option  value="contacted">Contacté</option>
<option value="scheduled">Visite Programmée</option>
<option value="closed">Clôturé / Traité</option>
</select>
<span className="material-symbols-outlined text-[16px] text-on-surface absolute right-2.5 top-2.5 pointer-events-none">arrow_drop_down</span>
</div>
<div className="font-label-sm text-label-sm text-outline mt-1.5">Assigné : Karim Benali</div>
</td>

<td className="py-5 px-6 align-top text-right" >
<div className="flex items-center justify-end gap-1.5">
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" href="https://wa.me/213770913305" target="_blank" title="Contacter par WhatsApp">
<span className="material-symbols-outlined text-[18px]">chat</span>
</a>
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="tel:+213770913305" title="Appeler le client">
<span className="material-symbols-outlined text-[18px]">call</span>
</a>
<button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"  title="Ouvrir dossier complet">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded bg-surface flex items-center justify-center text-outline hover:text-on-surface transition-colors" title="Plus d'actions">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low transition-colors group cursor-pointer opacity-75 hover:opacity-100" >

<td className="py-5 px-6 align-top">
<div className="flex flex-col gap-1.5">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-on-surface font-bold">Sofiane Brahimi</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm">Promoteur Partenaire</span>
</div>
<div className="flex flex-col text-on-surface-variant gap-0.5">
<div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
<span className="material-symbols-outlined text-[14px] text-secondary">phone</span>
<span>+213 560 22 71 90</span>
</div>
<span className="text-on-surface-variant text-[12px]">s.brahimi@algeria-invest.net</span>
</div>
<span className="font-label-sm text-label-sm text-outline mt-1">Dossier finalisé chez Maître Meziani</span>
</div>
</td>

<td className="py-5 px-6 align-top max-w-[260px]">
<div className="flex gap-3">
<div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Domaine Tipaza" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Domaine résidentiel prestigieux face à la mer à Tipaza Chenoua, grand parc boisé de pins maritimes, architecture blanche épurée, piscine miroir et terrasse en tek." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvVySz9HA-gI6u0UfDKdD6zTIuOZgZVjtrY25_VS_AaycXpqtMNdL0k4Xn4b8b7qTQ8J_P87vfZBj1WzV06K5TEU0JgXqXpBnMKBRm7rHQyb9dzU1YMtmu0X_cX7eQPwmRM0UaKm8mL4pd88uXQ9dvRykz62Yj2vZumMWPhdXeTdbKVFg2NmdT7wAGsfwuIjziRGg4FPL2JIhl09gB1R2QjaIx-Fc_Llco03QwfYibp0ND2qTgeLk"/>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">PH-TIP-315</span>
<span className="font-title-md text-title-md text-on-surface leading-tight line-clamp-1">Domaine Maritime Panoramique</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Tipaza • Corniche Chenoua</span>
<span className="font-currency-display text-[15px] font-bold text-on-surface mt-1">340 000 000 <span className="text-secondary font-label-sm">DA</span></span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top max-w-xs">
<div className="flex flex-col gap-1">
<div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[14px]">done_all</span>
<span>11 Octobre</span>
<span className="text-outline">• Offre Acceptée</span>
</div>
<p className="text-on-surface-variant line-clamp-2 italic">
                    « Confirmation de transmission d'offre d'achat ferme au propriétaire. Compromis validé en séance notariale. »
                  </p>
<div className="flex items-center gap-2 mt-1">
<span className="px-2 py-0.5 rounded bg-surface-container-highest text-on-primary-container text-[11px] font-semibold">Mandat d'Exclusivité Clôturé</span>
</div>
</div>
</td>

<td className="py-5 px-6 align-top" >
<div className="relative inline-block w-44">
<select className="w-full bg-surface-container-high text-on-surface font-label-md text-label-md px-3 py-2 rounded appearance-none font-bold cursor-pointer focus:outline-none" onchange="updateLeadStatusColor(this)">
<option value="new">Nouveau</option>
<option value="contacted">Contacté</option>
<option value="scheduled">Visite Programmée</option>
<option  value="closed">✓ Clôturé / Traité</option>
</select>
<span className="material-symbols-outlined text-[16px] text-on-surface absolute right-2.5 top-2.5 pointer-events-none">arrow_drop_down</span>
</div>
<div className="font-label-sm text-label-sm text-outline mt-1.5">Assigné : Karim Benali</div>
</td>

<td className="py-5 px-6 align-top text-right" >
<div className="flex items-center justify-end gap-1.5">
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors" href="https://wa.me/213560227190" target="_blank" title="Contacter par WhatsApp">
<span className="material-symbols-outlined text-[18px]">chat</span>
</a>
<a className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors" href="tel:+213560227190" title="Appeler le client">
<span className="material-symbols-outlined text-[18px]">call</span>
</a>
<button className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors"  title="Ouvrir dossier complet">
<span className="material-symbols-outlined text-[18px]">visibility</span>
</button>
<button className="w-8 h-8 rounded bg-surface flex items-center justify-center text-outline hover:text-on-surface transition-colors" title="Plus d'actions">
<span className="material-symbols-outlined text-[18px]">more_vert</span>
</button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="p-4 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
<span className="font-body-sm text-body-sm text-on-surface-variant">
          Affichage des demandes <strong className="text-on-surface">1 - 4</strong> sur <strong className="text-on-surface">38</strong> enregistrées
        </span>
<div className="flex items-center gap-1.5">
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm disabled:opacity-40" disabled="">Précédent</button>
<button className="px-3 py-1.5 rounded bg-primary text-on-primary font-label-sm text-label-sm font-bold">1</button>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">2</button>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">3</button>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">Suivant</button>
</div>
</div>
</div>
</div>

<aside className="fixed inset-y-0 right-0 w-full max-w-2xl bg-surface-container-lowest shadow-2xl z-50 transform translate-x-full transition-transform duration-300 ease-in-out flex flex-col justify-between" id="leadDrawer">

<div className="p-6 bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-on-secondary">
<span className="material-symbols-outlined text-[20px]">person_pin</span>
</div>
<div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold" id="drawerLeadRef">LEAD-DZ-0038</span>
<span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold" id="drawerBadge">Prioritaire</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface" id="drawerClientName">Malek Ziani</h2>
</div>
</div>
<button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors" >
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>

<div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

<div className="bg-surface p-4 rounded flex gap-4 items-center">
<div className="w-20 h-20 rounded overflow-hidden flex-shrink-0 bg-surface-container">
<img alt="Bien" className="w-full h-full object-cover" data-alt="Détail architectural épuré d'une villa de prestige à Alger Hydra, finitions luxueuses, perspectives géométriques et reflets de soleil sur surfaces nobles." id="drawerPropertyImg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0V3pAu-WT2l25hbUMRZFUjHmOfju2SRsNsiVXKcDMVq9T29c1lsApqeZOcPR-bTEb3kU_3r5PG4lWQO4tZkXAXELtaQgMsvQlxUa2zled7CRpXEbkUsskcOvI0yTZbxNwjZpwWZtX3Q4oPRN0NKhs4DKD14NBLsyBEVo9sVnQSBWyKpwGsOaKz4RfUX0QKSEvHSIAl1B58_mrQcD5e8w4VvfS1DhU87cRNhrKDzh9bLKaUi5hMso"/>
</div>
<div className="flex flex-col flex-1">
<span className="font-label-sm text-label-sm text-secondary font-bold" id="drawerPropertyRef">PH-ALG-104 • Vente Exclusive</span>
<span className="font-title-md text-title-md text-on-surface" id="drawerPropertyTitle">Villa Contemporaine d'Exception — Hydra</span>
<span className="font-currency-display text-[16px] text-on-surface font-bold mt-1" id="drawerPropertyPrice">165 000 000 DA</span>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary transition-colors font-label-sm text-label-sm">
          Voir fiche
        </button>
</div>

<div className="grid grid-cols-2 gap-3">
<a className="flex items-center justify-center gap-2 py-3 px-4 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md font-bold" href="https://wa.me/213550498211" id="drawerWhatsAppLink" target="_blank">
<span className="material-symbols-outlined text-[18px]">chat</span>
<span>WhatsApp Client</span>
</a>
<a className="flex items-center justify-center gap-2 py-3 px-4 rounded bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold" href="tel:+213550498211" id="drawerPhoneLink">
<span className="material-symbols-outlined text-[18px]">phone</span>
<span>Appeler (+213)</span>
</a>
</div>

<div className="flex flex-col gap-2">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Message &amp; Requête Initiale</span>
<div className="bg-surface p-4 rounded text-on-surface italic font-body-md text-body-md" id="drawerOriginalMessage">
          « Souhaite visiter ce samedi matin avec mon architecte conseil. Acquisition pour installation familiale directe. Financement comptant disponible sans crédit bancaire. »
        </div>
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm px-1">
<span>Reçu le 16 Octobre 2024 à 11:24</span>
<span>Adresse IP : 105.101.42.18 (Alger Telecom Fibre)</span>
</div>
</div>

<div className="bg-surface-container-low p-5 rounded flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
<span className="font-title-md text-title-md text-on-surface">Planifier la Visite Propriété</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Accord Propriétaire Requis</span>
</div>
<div className="grid grid-cols-2 gap-3">
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Date</label>
<input className="w-full bg-surface-container-lowest p-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none" type="date" value="2024-10-19"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Heure</label>
<input className="w-full bg-surface-container-lowest p-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none" type="time" value="10:30"/>
</div>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Agent accompagnateur mandaté</label>
<select className="w-full bg-surface-container-lowest p-2 rounded font-label-md text-label-md text-on-surface focus:outline-none">
<option>Karim Benali (Directeur Exécutif)</option>
<option>Sarah Haddad (Spécialiste Ambassades)</option>
<option>Lyes Mansouri (Expert Villas Poirson / Hydra)</option>
</select>
</div>
<button className="w-full py-2.5 rounded bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-all font-label-md text-label-md font-bold flex items-center justify-center gap-2" >
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>Confirmer le créneau &amp; Notifier le propriétaire</span>
</button>
</div>

<div className="flex flex-col gap-3">
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Notes Internes d'Administration</span>

<div className="flex gap-2">
<input className="flex-1 bg-surface px-3 py-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none" id="newNoteInput" placeholder="Ajouter une note confidentielle..." type="text"/>
<button className="px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md font-bold" >
            Ajouter
          </button>
</div>
<div className="flex flex-col gap-2" id="notesContainer">
<div className="p-3 bg-surface rounded flex flex-col gap-1">
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm">
<span className="font-bold text-on-surface">Karim Benali</span>
<span>Aujourd'hui à 11:35</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface">Client joint par téléphone. Très courtois, diaspora basée à Mayfair Londres. Recherche d'achat net pour résidence principale. Visite confirmée informellement.</p>
</div>
<div className="p-3 bg-surface rounded flex flex-col gap-1">
<div className="flex items-center justify-between text-outline font-label-sm text-label-sm">
<span className="font-bold text-on-surface">Système Prime House</span>
<span>Aujourd'hui à 11:24</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Lead auto-généré via formulaire d'inspection Villa Contemporaine — Hydra (ID: PH-ALG-104).</p>
</div>
</div>
</div>

<div className="bg-surface-container p-4 rounded flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm font-bold uppercase text-on-surface">Structure Table Supabase</span>
</div>
<span className="font-label-sm text-label-sm text-outline">table : public.inquiries</span>
</div>
<div className="bg-primary-container text-surface-container-highest p-3 rounded font-mono text-[11px] leading-relaxed overflow-x-auto">
<code>&#123; "id": "inq_9482f3a", "property_id": "prop_hydra_104", "client_name": "Malek Ziani", "phone": "+213550498211", "status": "new", "created_at": "2024-10-16T10:24:00Z" &#125;</code>
</div>
</div>
</div>

<div className="p-4 bg-surface-container-low flex items-center justify-between gap-3">
<button className="px-4 py-2 rounded bg-surface text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md font-semibold" >
        Fermer
      </button>
<div className="flex items-center gap-2">
<button className="px-4 py-2 rounded bg-surface-container text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-md text-label-md font-semibold">
          Classer Spam
        </button>
<button className="px-5 py-2 rounded bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-colors font-label-md text-label-md font-bold" >
          Enregistrer le statut
        </button>
</div>
</div>
</aside>

<div className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 hidden transition-opacity" id="drawerOverlay" ></div>
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
