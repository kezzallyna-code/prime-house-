'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">



<div className="flex flex-col gap-2 mb-8">
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
<span>Administration</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span>Gestion du Parc</span>
<span className="material-symbols-outlined text-[14px]">chevron_right</span>
<span className="text-secondary font-bold">Biens en modération</span>
</div>
<div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
<div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
          Biens en Modération &amp; Audit Foncier
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
          Contrôle de conformité notariale, authenticité des livrets fonciers, négativité hypothécaire et vérification cadastrale avant certification et diffusion sur l’écrin public Prime House.
        </p>
</div>
<div className="flex items-center gap-3 shrink-0">
<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
<span>Protocole d'audit DZ</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-primary text-on-primary hover:bg-inverse-surface font-label-md text-label-md uppercase tracking-wider transition-all shadow-md" >
<span className="material-symbols-outlined text-[18px]">sync</span>
<span>Actualiser le flux</span>
</button>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">En attente d'arbitrage</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-currency-display text-currency-display text-on-surface">05</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Dossiers prioritaires</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">3 particuliers • 2 agences agréées</span>
</div>
<div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">hourglass_top</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Approuvés (7 derniers jours)</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-currency-display text-currency-display text-on-surface">14</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">+18% vs S-1</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Valeur foncière : 1,42 Mrd DA</span>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">task_alt</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Rejets pour non-conformité</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-currency-display text-currency-display text-error">01</span>
<span className="font-label-sm text-label-sm text-error font-medium">Litige foncier avéré</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Motif : Défaut de certificat d'urbanisme</span>
</div>
<div className="w-12 h-12 rounded-xl bg-error-container/60 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">gavel</span>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">Délai moyen d'instruction</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-currency-display text-currency-display text-on-surface">14h</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Cible : &lt; 24h</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-1">Algorithme d'OCR Cadastral activé</span>
</div>
<div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<span className="material-symbols-outlined text-[26px]">speed</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">

<div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start">
<button className="px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider bg-surface-container-lowest text-on-surface shadow-xs transition-all" id="tab-all" >
        Tous en attente (5)
      </button>
<button className="px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" id="tab-particulier" >
        Particuliers (3)
      </button>
<button className="px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-all" id="tab-agence" >
        Agences Partenaires (2)
      </button>
</div>

<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
<div className="relative min-w-[280px]">
<span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
<input className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2.5 font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all" id="searchInput" onkeyup="searchCards()" placeholder="Référence, Wilaya, Mandant, Propriétaire..." type="text"/>
</div>
<div className="flex items-center gap-2">
<div className="relative inline-block text-left">
<select className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md py-2.5 pl-3.5 pr-8 rounded-lg focus:outline-none focus:bg-surface-container-lowest cursor-pointer">
<option>Tri : Date de soumission (Plus récent)</option>
<option>Tri : Prix décroissant (DA)</option>
<option>Tri : Score de complétude juridique</option>
<option>Tri : Urgence de publication</option>
</select>
<span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">arrow_drop_down</span>
</div>
<button className="p-2.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors" title="Affichage compact">
<span className="material-symbols-outlined text-[20px]">view_agenda</span>
</button>
</div>
</div>
</div>

<div className="flex flex-col gap-5" id="moderationList">

<div className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative" data-search="villa contemporaine bel air hydra alger salim khelifi 185000000 PRM-DZ-0418" data-type="particulier">

<div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
<div className="w-full h-full bg-cover bg-center" data-alt="Luxurious modern minimalist architectural villa in Hydra Algiers with serene Mediterranean reflection pool, manicured palm trees, travertine marble facade, bright midday golden sunlight, crisp architectural photography" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAf2SooycYthkLLutMdqGNaYxdSbUuCWQycfn0sg8pqlKlBCFjcKVkKW4F_mHoQFQc19bCVxupDTaFV6m87pJjtaEcEYuwhh4SuDWyndqRXpKDjrTJH31f_yvjn2V2MKUjmJBrQK8SAiZRrxH1tyDp-ThrosEJ0wZL3f2vUufCbVWrr7fzZf9UQL_bvkUgBJxnLLAc3r5rt7bFVIZMDl7t6F21mkzq9YYvOBIseI4ymRyj8kGsQ0tA')" }}>
</div>
<div className="absolute top-3 left-3 flex flex-col gap-1.5">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
            Vente Exclusive
          </span>
<span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Réf: PRM-DZ-0418
          </span>
</div>
<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px] text-secondary-container">photo_library</span>
<span>14 clichés HD</span>
</div>
</div>

<div className="flex-1 flex flex-col justify-between">
<div>

<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">HYDRA • VAL D'HYDRA, ALGER (16)</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Soumis il y a 4 heures</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Villa Contemporaine Bel Air &amp; Piscine à Débordement
              </h2>
</div>
<div className="text-left lg:text-right">
<span className="font-currency-display text-currency-display text-on-surface">185 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">DA</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">Honoraires agence inclus (1%)</span>
</div>
</div>

<div className="flex flex-wrap items-center gap-3 mt-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">crop_free</span>
<span>750 m² terrain (520 m² bâtis)</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span>
<span>6 Suites royales</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">garage</span>
<span>Garage sous-sol 4 V.</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Score dossier : 95%</span>
</span>
</div>

<div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-sm">
                SK
              </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">M. Salim Khelifi</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Particulier propriétaire direct • +213 (0) 550 42 ** **</span>
</div>
</div>

<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">description</span>
<span>Acte de propriété (Indivision levée)</span>
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
<span>Livret Foncier 2021</span>
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-fixed/20 text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase font-bold">
<span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
<span>Examen notarial : En cours</span>
</div>
</div>
</div>
</div>

<div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Inspecter le dossier</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Demander compléments</span>
</button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">close</span>
<span>Refuser</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md uppercase tracking-wider shadow-sm" >
<span className="material-symbols-outlined text-[18px]">gavel</span>
<span>Approuver &amp; Publier</span>
</button>
</div>
</div>
</div>
</div>

<div className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative" data-search="duplex vue mer panoramique canastel oran oran prestige immo 78000000 PRM-DZ-0419" data-type="agence">

<div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
<div className="w-full h-full bg-cover bg-center" data-alt="High-end duplex penthouse interior with floor to ceiling glass windows overlooking the Mediterranean bay in Canastel Oran, refined Italian furniture, warm wooden ceilings, sunset golden hour light, high luxury magazine finish" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCn9J75-eW0HGXTk8jzgNMRK0YVx1acxPz1s0J3dkmKCkSvaaMCxs7F3JDlCMtHsb29XbLkImamtxjqlJ5_qg5ZxMSTtIJplXVxnacF3FGuNxN9S6XebT87oFj0REeprORm98lAUdYm5qazb2xLcp3jrzfIxctSla87DfHlOXLtO4Yqa0aCXL_aZuvLhvyDdUw_Cho7dui3qNco6nsb0Knw17x73ySRgh9y1Lw4bphNlEDaiz6kObM')" }}>
</div>
<div className="absolute top-3 left-3 flex flex-col gap-1.5">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
            Vente Résidentielle
          </span>
<span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Réf: PRM-DZ-0419
          </span>
</div>
<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px] text-secondary-container">photo_library</span>
<span>09 clichés HD</span>
</div>
</div>

<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">CANASTEL • CORNICHE EST, ORAN (31)</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Soumis il y a 8 heures</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Duplex Vue Mer Panoramique &amp; Terrasse Tropézienne
              </h2>
</div>
<div className="text-left lg:text-right">
<span className="font-currency-display text-currency-display text-on-surface">78 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">DA</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">Mandat exclusif Agence Partenaire</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 mt-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">crop_free</span>
<span>320 m² en duplex (R+8 &amp; R+9)</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span>
<span>4 Chambres dont 2 Masters</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">water</span>
<span>Front de mer 1ère ligne</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-error-container text-error font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-[16px]">warning</span>
<span>Pièce manquante : Livret Foncier</span>
</span>
</div>

<div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm">
                OP
              </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Agence Oran Prestige Immo</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Agrément Min. Habitat N°31/2019 • Agent Référent : M. Amine Dahmane</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Acte notarié numérisé</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-error-container text-error font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">cancel</span>
<span>Livret Foncier manquant (Non fourni)</span>
</div>
</div>
</div>
</div>
<div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Inspecter le dossier</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">notification_important</span>
<span>Relancer pour livret foncier</span>
</button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">close</span>
<span>Refuser</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-surface-container text-on-surface-variant opacity-60 cursor-not-allowed font-label-md text-label-md uppercase tracking-wider" disabled="" title="Document obligatoire manquant">
<span className="material-symbols-outlined text-[18px]">lock</span>
<span>Validation Bloquée</span>
</button>
</div>
</div>
</div>
</div>

<div className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative" data-search="propriete de maitre verger blida atlas mezerreg foncier 120000000 PRM-DZ-0420" data-type="agence">
<div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
<div className="w-full h-full bg-cover bg-center" data-alt="Colonial style luxury master mansion with expansive citrus orchard estate at the foothills of Mount Chréa in Blida, majestic cedar trees, warm Algerian afternoon sun, cobblestone driveways and vintage fountain" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9bx5GJvI1baT6FqB2z6-Elmw6sn2lLZRE4rCcuMIPI-KYrZTd0ZrIBPGzp6NRJtoenhUg2zIDNhqsPzJPJqG_oiPYcCuz7KTSwzXji1NtOCCWO7LNBzK1O1ejsqkH5NyVTA7tZCRzxPLIdJH_EJATvzatkrJptJU6j4eg6Sikd69ntALZ9Ot0BpMSFCYVi-59h_MHUgOEyS8__WtXh0Q5tk9F-vaKNpHpucq6YDeeCHXctDe0YQ8')" }}>
</div>
<div className="absolute top-3 left-3 flex flex-col gap-1.5">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
            Domaine &amp; Verger
          </span>
<span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Réf: PRM-DZ-0420
          </span>
</div>
<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px] text-secondary-container">photo_library</span>
<span>22 clichés HD</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">BLIDA ATLAS • CONTREFORTS DU CHRÉA (09)</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Soumis il y a 12 heures</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Propriété de Maître avec Verger d'Agrumes &amp; Maison de Gardien
              </h2>
</div>
<div className="text-left lg:text-right">
<span className="font-currency-display text-currency-display text-on-surface">120 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">DA</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">Mandat exclusif notarié</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 mt-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">nature_people</span>
<span>12 400 m² terrain arboré</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">house</span>
<span>680 m² bâti habitable</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">water_drop</span>
<span>Forage privé &amp; Bassin d'irrigation</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Dossier 100% Conforme</span>
</span>
</div>
<div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm">
                MF
              </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Mezerreg Foncier &amp; Investissement</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mandant Notarial : Étude Maître Boudiaf (Blida)</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Acte notarié individuel</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Livret foncier apuré</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Certificat de conformité urbanisme</span>
</div>
</div>
</div>
</div>
<div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Inspecter le dossier</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Compléments</span>
</button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">close</span>
<span>Refuser</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md uppercase tracking-wider shadow-sm" >
<span className="material-symbols-outlined text-[18px]">gavel</span>
<span>Approuver &amp; Publier</span>
</button>
</div>
</div>
</div>
</div>

<div className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative" data-search="penthouse front de mer chenoua tipaza particulier expatrie 380000 PRM-DZ-0421" data-type="particulier">
<div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
<div className="w-full h-full bg-cover bg-center" data-alt="Stunning oceanfront terrace of a luxury penthouse overlooking the turquoise sea and dramatic cliffs of Mont Chenoua in Tipaza Algeria, teak outdoor lounge furniture, bright Mediterranean summer noon" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAorGDtbldFtxSlvEq2fIZf9frUspT-7EbPkyihP2-ZcuA4x5ixVfyJXo1yV2xekhiHc6-oYK0UXaonTUmpDVE9ni_reBs1zs980AjlG-1XhOwAkzmmr0Glmxj2y7GegMd6f7NdjvxBHqwKSTxEqD7Kq9i9HtlF_Gn35V8s1jw64j4UT-J7iHtj3CJ_I0GUYeZ-lJ8CVRYc8-GyGDE_0jcVHQU984_0mz6zAa8p0Lb6tzJXbuJPcSo')" }}>
</div>
<div className="absolute top-3 left-3 flex flex-col gap-1.5">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
            Location Prestige
          </span>
<span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Réf: PRM-DZ-0421
          </span>
</div>
<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px] text-secondary-container">photo_library</span>
<span>11 clichés HD</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">MONT CHENOUA • CORNICHE, TIPAZA (42)</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Soumis il y a 18 heures</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Penthouse Pieds dans l'Eau avec Solarium Privatif
              </h2>
</div>
<div className="text-left lg:text-right">
<span className="font-currency-display text-currency-display text-on-surface">380 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">DA / mois</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">Bail diplomatique / Corporate</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 mt-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">crop_free</span>
<span>240 m² + 80 m² terrasse panoramique</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">deck</span>
<span>Accès crique privée</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">security</span>
<span>Résidence sécurisée 24/7</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Score dossier : 90%</span>
</span>
</div>
<div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-sm">
                YM
              </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">M. Yassine Mansouri</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Particulier (Cadre Expatrié - Mandat de gestion familiale) • Dossier Paris/Alger</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Procuration notariée valide</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Titre de propriété conforme</span>
</div>
</div>
</div>
</div>
<div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Inspecter le dossier</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Compléments</span>
</button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">close</span>
<span>Refuser</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md uppercase tracking-wider shadow-sm" >
<span className="material-symbols-outlined text-[18px]">gavel</span>
<span>Approuver &amp; Publier</span>
</button>
</div>
</div>
</div>
</div>

<div className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative" data-search="terrain exception viabilise r+2 poirson el biar alger cherif boussaid 95000000 PRM-DZ-0422" data-type="particulier">
<div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
<div className="w-full h-full bg-cover bg-center" data-alt="Prime urban building parcel plot in prestigious residential neighborhood Poirson El Biar Algiers, lush surroundings with mature umbrella pines, clear blue sky, surveyed boundary markers" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDZs5eDWFzRsrdnRLaolRN4qTM4Lp3vzjkAPAGguHt8Q8B678pOe5lrnjADAhu3SbC55gsAZA00GozRY20bRN8ZKHdmp3INpN_qpOTVA6oo68oppsWfPwaxFGjf2PyBBjgGfEsoH-i9o7Hx6b39S2QHlufmimpm6s_vZ0fDntGtMX1ffoBQbd9tzEPuohZpB0A4YMhKEqkqIZI_Z-PfRpkQSn5rulxSiS51ocvGnUWKFsJAfSVikI')" }}>
</div>
<div className="absolute top-3 left-3 flex flex-col gap-1.5">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
            Foncier Urbain R+2
          </span>
<span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
            Réf: PRM-DZ-0422
          </span>
</div>
<div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
<span className="material-symbols-outlined text-[15px] text-secondary-container">photo_library</span>
<span>06 plans &amp; relevés</span>
</div>
</div>
<div className="flex-1 flex flex-col justify-between">
<div>
<div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">POIRSON • EL BIAR, ALGER (16)</span>
<span className="w-1.5 h-1.5 rounded-full bg-outline-variant"></span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Soumis il y a 22 heures</span>
</div>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                Terrain Résidentiel Viabilisé avec Vue Baie d'Alger
              </h2>
</div>
<div className="text-left lg:text-right">
<span className="font-currency-display text-currency-display text-on-surface">95 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">DA</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">158 333 DA / m²</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-3 mt-3">
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">square_foot</span>
<span>600 m² viabilisé (Eau, Gaz, Élec, Fibre)</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">architecture</span>
<span>Façade de 22 mètres linéaires</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[16px] text-secondary">approval</span>
<span>Certificat d'urbanisme R+2 délivré</span>
</span>
<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-[16px]">verified</span>
<span>Score dossier : 100%</span>
</span>
</div>
<div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-sm">
                CB
              </div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Dr. Chérif Boussaïd</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Propriétaire indivis unique • Mandataire notarié</span>
</div>
</div>
<div className="flex flex-wrap items-center gap-2">
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Acte notarié individuel apuré</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Livret Foncier N° 16/482/EL</span>
</div>
<div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
<span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
<span>Plan de bornage géomètre expert</span>
</div>
</div>
</div>
</div>
<div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest">
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Inspecter le dossier</span>
</button>
<button className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">edit_note</span>
<span>Compléments</span>
</button>
</div>
<div className="flex items-center gap-2">
<button className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">close</span>
<span>Refuser</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md uppercase tracking-wider shadow-sm" >
<span className="material-symbols-outlined text-[18px]">gavel</span>
<span>Approuver &amp; Publier</span>
</button>
</div>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 pointer-events-none opacity-0 transition-opacity duration-300" id="auditDrawer">

<div className="absolute inset-0 bg-primary/40 backdrop-blur-sm pointer-events-auto" ></div>

<div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-surface-container-lowest shadow-2xl p-8 flex flex-col justify-between overflow-y-auto pointer-events-auto transform translate-x-full transition-transform duration-300" id="drawerContent">
<div className="flex flex-col">

<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-2">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">FEUILLE D'AUDIT JURIDIQUE &amp; FONCIER</span>
</div>
<button className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" >
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
<div className="mt-2">
<span className="font-label-md text-label-md text-secondary font-bold tracking-wider" id="drawerRef">PRM-DZ-0418</span>
<h3 className="font-headline-md text-headline-md text-on-surface" id="drawerTitle">Villa Contemporaine Bel Air</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant" id="drawerSubtitle">Hydra, Alger • Mandant : Salim Khelifi</p>
</div>

<div className="mt-6 p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Score d'intégrité du titre</span>
<span className="font-currency-display text-currency-display text-on-surface" id="drawerScore">95%</span>
</div>
<div className="flex items-center gap-1.5 text-secondary">
<span className="material-symbols-outlined text-[22px]">verified_user</span>
<span className="font-label-md text-label-md font-semibold">Titre Apuré Pré-validé</span>
</div>
</div>

<div className="mt-6 flex flex-col gap-4">
<h4 className="font-title-md text-title-md text-on-surface">Vérifications Réglementaires Algériennes</h4>

<div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">history_edu</span>
<div>
<span className="font-title-md text-title-md text-on-surface block">Acte Notarié Publié (Conservation Foncière)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Volume 142 • Numéro 89 • Alger-Centre</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">VÉRIFIÉ</span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-2">
<span>Étude Notariale : Me. A. Taleb (Hydra)</span>
<a className="text-secondary font-semibold hover:underline flex items-center gap-1 font-label-sm text-label-sm" href="#" >
<span className="material-symbols-outlined text-[16px]">file_open</span> Ouvrir la pièce (PDF)
              </a>
</div>
</div>

<div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">menu_book</span>
<div>
<span className="font-title-md text-title-md text-on-surface block">Livret Foncier (Daftar al-Iqari)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Matricule Cadastral Section 12 Îlot 04</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">CONFORME</span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-2">
<span>Date d'établissement : 14/09/2021</span>
<a className="text-secondary font-semibold hover:underline flex items-center gap-1 font-label-sm text-label-sm" href="#" >
<span className="material-symbols-outlined text-[16px]">file_open</span> Ouvrir le livret (PDF)
              </a>
</div>
</div>

<div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">search_check</span>
<div>
<span className="font-title-md text-title-md text-on-surface block">Certificat Négatif d'Hypothèque (Chahada Salbiya)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Vierge de toute charge, hypothèque ou saisie conservatoire</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">APURÉ</span>
</div>
<div className="flex items-center justify-between text-body-sm text-on-surface-variant pt-2">
<span>Délivré par Conservation Foncière il y a &lt; 30j</span>
<a className="text-secondary font-semibold hover:underline flex items-center gap-1 font-label-sm text-label-sm" href="#" >
<span className="material-symbols-outlined text-[16px]">file_open</span> Vérifier la mention
              </a>
</div>
</div>

<div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
<div className="flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">photo_camera</span>
<div>
<span className="font-title-md text-title-md text-on-surface block">Audit Visuel &amp; Standards Photographiques</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Résolution minimum 4K • Pas de filigrane tiers</span>
</div>
</div>
<span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">VALIDÉ (14/14)</span>
</div>
</div>
</div>

<div className="mt-6 flex flex-col gap-1.5">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">Note interne d'audit notarial :</label>
<textarea className="w-full bg-surface-container-low rounded-lg p-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary" id="drawerAuditNotes" placeholder="Ajouter une observation pour le collège d'arbitrage..." rows="2">Dossier rigoureusement ordonné. Indivision familiale résolue par acte de partage authentique du 12 Janvier 2023. Prêt pour publication de prestige.</textarea>
</div>

<div className="mt-4 p-4 rounded-xl bg-secondary-container/20 flex items-start gap-3">
<input checked="" className="mt-1 w-5 h-5 accent-secondary rounded cursor-pointer" id="legalCertificationCheck" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface cursor-pointer" htmlFor="legalCertificationCheck">
<strong className="font-title-md text-title-md block text-secondary">Certification de pleine conformité juridique</strong>
            J'atteste avoir procédé à la vérification dématérialisée des pièces d'identité, du titre foncier algérien et ordonne la publication immédiate avec badge "Mandat Audité".
          </label>
</div>
</div>

<div className="pt-6 mt-6 flex items-center justify-between gap-3">
<button className="px-4 py-2.5 rounded bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors" >
          Fermer l'examen
        </button>
<div className="flex items-center gap-2">
<button className="px-4 py-2.5 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-colors" >
            Rejeter le titre
          </button>
<button className="flex items-center gap-2 px-6 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim font-label-md text-label-md uppercase tracking-wider transition-all shadow-md" >
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>Valider &amp; Publier</span>
</button>
</div>
</div>
</div>
</div>

<div className="fixed inset-0 z-50 pointer-events-none opacity-0 transition-opacity duration-200 flex items-center justify-center p-4" id="rejectionModal">
<div className="absolute inset-0 bg-primary/40 backdrop-blur-sm pointer-events-auto" ></div>
<div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl p-6 pointer-events-auto flex flex-col gap-4">
<div className="flex items-center justify-between">
<div className="flex items-center gap-2.5 text-error">
<span className="material-symbols-outlined text-[24px]">gavel</span>
<span className="font-title-lg text-title-lg text-on-surface">Motif de Rejet &amp; Refus Foncier</span>
</div>
<button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high" >
<span className="material-symbols-outlined text-[18px]">close</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Sélectionnez le fondement légal du refus. Cette notification formelle sera notifiée avec cachet numérique au déposant.
      </p>
<div className="flex flex-col gap-2">
<label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
<input checked="" className="accent-secondary" name="refusal_reason" type="radio" value="livret_manquant"/>
<span>Absence du Livret Foncier apuré ou document périmé</span>
</label>
<label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
<input className="accent-secondary" name="refusal_reason" type="radio" value="indivision"/>
<span>Bien en indivision sans procuration notariée globale</span>
</label>
<label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
<input className="accent-secondary" name="refusal_reason" type="radio" value="urbanisme"/>
<span>Non-conformité de construction / Dépassement permis R+2</span>
</label>
<label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
<input className="accent-secondary" name="refusal_reason" type="radio" value="photos"/>
<span>Visuels de qualité insuffisante ou non conformes au standard de luxe</span>
</label>
</div>
<textarea className="w-full bg-surface-container-low rounded-lg p-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-error" id="rejectionCustomText" placeholder="Observations juridiques complémentaires obligatoires..." rows="2"></textarea>
<div className="flex items-center justify-end gap-3 pt-2">
<button className="px-4 py-2 rounded bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider" >
          Annuler
        </button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-error text-on-error hover:bg-on-error-container font-label-md text-label-md uppercase tracking-wider transition-all" >
<span className="material-symbols-outlined text-[18px]">report</span>
<span>Confirmer le Rejet Définitif</span>
</button>
</div>
</div>
</div>

<div className="fixed bottom-8 right-8 z-50 pointer-events-none opacity-0 translate-y-4 transition-all duration-300" id="toastMessage">
<div className="px-5 py-3.5 rounded-xl bg-primary text-on-primary shadow-2xl flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]" id="toastIcon">check_circle</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-primary" id="toastTitle">Dossier Approuvé</span>
<span className="font-body-sm text-body-sm text-surface-variant" id="toastText">Le bien a été publié sur le portail public Prime House.</span>
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
