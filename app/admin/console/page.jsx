'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">
<div className="px-space-md lg:px-space-xl py-space-md bg-surface-container-low shadow-sm">
<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-lg bg-primary-container text-surface flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-title-lg">shield_with_house</span>
</div>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-headline-sm text-headline-sm text-on-surface">Portail Back-Office • Direction Générale Algérie</span>
<span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container tracking-wider uppercase font-bold">Accrédité</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Conformité juridique foncière, validation des actes notariés &amp; contrôle des mandats d'élite</p>
</div>
</div>
<div className="flex items-center gap-space-sm flex-wrap">
<div className="flex items-center bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm gap-space-xs">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-container animate-ping"></span>
<span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wider font-bold">Mode Super-Admin Actif</span>
</div>
<button className="relative p-2.5 rounded-lg bg-surface-container-lowest text-on-surface-variant hover:text-on-surface shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">notifications</span>
<span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-error text-on-error font-label-sm text-[10px] rounded-full font-bold">12</span>
</button>
<div className="flex items-center gap-space-sm bg-surface-container-lowest px-3 py-1.5 rounded-lg shadow-sm">
<img className="w-8 h-8 rounded-full object-cover shadow-sm" data-alt="Portrait professionnel de Amine Zerrouki, cadre supérieur en costume sombre d'affaires bleu marine, regard serein et confiant, arrière-plan de cabinet d'architecture moderne avec éclairage doux et chaleureux." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyc-w0ltEyRmXx7j4uWaXjt_lhwsY_Z9-RtHangFMpwv9RSh2uYzsxRGBODgpbe_OagMixoWu9Wvg7FIzDsYbegjvB0op69XCbqWBwNpasTUPyCNBqOgetC3FoEKdXD-iAne_y_55xgR9kEJBBBCMNAPeHWqPCwTwXiTB0uPWvraNy3wsCArv5Zxv-YH-pXmmQ9f64pEs1RzRbj7cLJ_iTqQIzLzvZfRPqEcJPxZ345hBASs9ISM0"/>
<div className="hidden sm:flex flex-col text-left">
<span className="font-label-md text-label-md text-on-surface font-bold leading-tight">Amine Zerrouki</span>
<span className="font-label-sm text-[10px] text-secondary font-semibold uppercase tracking-wider">Directeur Modération &amp; Conformité</span>
</div>
</div>
</div>
</div>
</div>
<div className="px-space-md lg:px-space-xl py-space-lg max-w-[1440px] mx-auto w-full flex flex-col gap-space-xl">
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
<div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-surface-container-low group-hover:scale-125 transition-all"></div>
<div className="flex items-start justify-between relative z-10">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Parc Actif sous Mandat</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">482</span>
</div>
<span className="p-2 rounded-lg bg-surface-container text-primary-container material-symbols-outlined text-title-lg">apartment</span>
</div>
<div className="mt-4 flex items-center gap-space-xs relative z-10">
<span className="flex items-center font-label-sm text-label-sm text-secondary font-bold">
<span className="material-symbols-outlined text-sm">trending_up</span> +18.4%
          </span>
<span className="font-body-sm text-body-sm text-on-surface-variant">ce mois • 48 wilayas</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
<div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-error-container/40 group-hover:scale-125 transition-all"></div>
<div className="flex items-start justify-between relative z-10">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Dossiers Prioritaires</span>
<span className="font-currency-display text-currency-display text-error mt-1">09</span>
</div>
<span className="p-2 rounded-lg bg-error-container text-on-error-container material-symbols-outlined text-title-lg">pending_actions</span>
</div>
<div className="mt-4 flex items-center justify-between relative z-10">
<span className="font-label-sm text-label-sm text-error font-bold">Délai moyen: 4h 12m</span>
<span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface">6 Notariés</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
<div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-surface-container-low group-hover:scale-125 transition-all"></div>
<div className="flex items-start justify-between relative z-10">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Comptes &amp; Agences</span>
<span className="font-currency-display text-currency-display text-on-surface mt-1">1 240</span>
</div>
<span className="p-2 rounded-lg bg-surface-container text-primary-container material-symbols-outlined text-title-lg">badge</span>
</div>
<div className="mt-4 flex items-center gap-space-xs relative z-10">
<span className="font-label-sm text-label-sm text-secondary font-bold">42 Agences agréées</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">• 100% KYC validé</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-primary-container text-surface shadow-md flex flex-col justify-between relative overflow-hidden group hover:shadow-xl transition-all">
<div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-on-primary-container/20 group-hover:scale-125 transition-all"></div>
<div className="flex items-start justify-between relative z-10">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary-container uppercase tracking-wider font-semibold">Volume Marché Régulé</span>
<span className="font-currency-display text-currency-display text-surface mt-1">18.4 <span className="text-secondary-container text-headline-sm">Mrd DA</span></span>
</div>
<span className="p-2 rounded-lg bg-surface-container-lowest/10 text-secondary-container material-symbols-outlined text-title-lg">payments</span>
</div>
<div className="mt-4 flex items-center justify-between relative z-10">
<span className="font-body-sm text-body-sm text-surface-variant">Estimations &amp; Sous-seing</span>
<span className="font-label-sm text-label-sm text-secondary-container font-semibold">• 99.4% certifié</span>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-space-md rounded-xl shadow-md flex flex-col gap-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
<div className="flex items-center gap-space-sm flex-wrap">
<div className="flex items-center bg-surface-container-low px-3 py-2 rounded-lg w-full sm:w-72">
<span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
<input className="bg-transparent border-0 outline-none w-full font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant" id="adminSearch" placeholder="Réf annonce, wilaya, nom du propriétaire..." type="text"/>
</div>
<div className="relative">
<select className="bg-surface-container-low text-on-surface font-body-sm text-body-sm py-2 px-3 rounded-lg appearance-none pr-8 cursor-pointer outline-none" id="wilayaFilter">
<option value="all">Toutes Wilayas (Algérie)</option>
<option value="alger">16 - Alger (Hydra, El Biar, Zéralda)</option>
<option value="oran">31 - Oran (Akid Lotfi, Canastel)</option>
<option value="constantine">25 - Constantine (Bellevue)</option>
<option value="blida">09 - Blida (Joinville, Ouled Yaich)</option>
<option value="annaba">23 - Annaba (Séraïdi, Chapuis)</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none text-title-md">expand_more</span>
</div>
<div className="relative">
<select className="bg-surface-container-low text-on-surface font-body-sm text-body-sm py-2 px-3 rounded-lg appearance-none pr-8 cursor-pointer outline-none" id="typeFilter">
<option value="all">Type de Transaction</option>
<option value="vente">Vente Définitive</option>
<option value="location">Location Résidentielle Prestige</option>
<option value="commercial">Bail Commercial &amp; Ambassade</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none text-title-md">expand_more</span>
</div>
<div className="relative">
<select className="bg-surface-container-low text-on-surface font-body-sm text-body-sm py-2 px-3 rounded-lg appearance-none pr-8 cursor-pointer outline-none" id="docFilter">
<option value="all">Conformité Juridique</option>
<option value="complet">Dossier Complet (Acte + Livret)</option>
<option value="partiel">En attente de Certificat Négatif</option>
<option value="incomplet">Pièces manquantes</option>
</select>
<span className="material-symbols-outlined absolute right-2 top-2.5 text-on-surface-variant pointer-events-none text-title-md">expand_more</span>
</div>
</div>
<div className="flex items-center gap-space-xs self-end lg:self-auto">
<button className="px-3 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md flex items-center gap-1 hover:bg-surface-container-high transition-all" type="button">
<span className="material-symbols-outlined text-sm">download</span> Exporter Registre
          </button>
<button className="px-3 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md flex items-center gap-1 shadow-sm hover:opacity-95 transition-all" type="button">
<span className="material-symbols-outlined text-sm">refresh</span> Actualiser (9)
          </button>
</div>
</div>
</div>
<div className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="font-headline-md text-headline-md text-on-surface">File de Modération Active</span>
<span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">9 à examiner</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Protocole d'authentification foncière notariée art. 793 CC Algérien</span>
</div>
<div className="flex flex-col gap-space-md" id="moderationQueue">
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col xl:flex-row gap-space-lg items-start xl:items-center justify-between transition-all hover:shadow-xl">
<div className="flex flex-col sm:flex-row gap-space-md items-start sm:items-center w-full xl:w-7/12">
<div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Élégante villa coloniale rénovée à El Biar Alger, façade blanchie à la chaux, hauts plafonds, volets en bois patiné, jardin méditerranéen avec palmiers et bougainvilliers sous un soleil lumineux." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDj9V4kb8-kDV-pP1Pd4AARAyFITDuNo_mxa86K85AEM8rcwCg0R830BvW1sBGYyJDoNa38A9NRMrG7m6xAi5vrhPwKHbQunCUFtxWNpeiwq_lWezHp1pqeMFUUZbjfZmgMUfOEopHF5KifF7uJsF2ckf4rQRLRwC4QHFWhBQ25w3Zzs103V6ib-Ew-dHDYSdOHuyOWhSqZdATnn4XkCxg5OFMZd9-ZmwDZ2q7d4zV_snZSajq8Yfg"/>
<span className="absolute top-2 left-2 px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-lowest text-primary font-bold shadow-sm">Vente</span>
<span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-label-sm font-label-sm bg-primary-container text-surface-container-lowest font-mono">PH-ALG-1602</span>
</div>
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Hydra / El Biar • Alger (16)</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-secondary-container/40 text-on-secondary-container font-semibold">Mandat Exclusif</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Maison Coloniale d'Exception • 650 m²</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">8 Pièces, Jardin d'hiver, Dépendance diplomatique, Garage 4 véhicules.</p>
<div className="flex items-center gap-4 mt-2 text-on-surface-variant text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-secondary">person</span>
<span className="font-semibold text-on-surface">Reda Bouras</span>
<span className="text-xs bg-surface-container px-1.5 py-0.2 rounded text-on-surface-variant">Particulier Propriétaire</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-on-surface-variant">call</span>
<span className="font-mono text-body-sm">+213 (0) 550 24 11 89</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between w-full xl:w-auto gap-space-md">
<div className="flex flex-col xl:items-end">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prix de Présentation</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">245 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
</div>
<div className="flex items-center gap-2 flex-wrap">
<a className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" href="#" title="Télécharger l'acte authentique et le livret foncier">
<span className="material-symbols-outlined text-secondary text-base">verified_user</span>
<span>Acte Notarié + LF (PDF)</span>
</a>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"  type="button">
                Examiner Pièces
              </button>
</div>
<div className="flex items-center gap-space-xs w-full sm:w-auto">
<button className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md font-bold shadow-sm transition-all flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-base">check_circle</span> Valider &amp; Publier
              </button>
<button className="p-2 rounded-lg bg-error-container hover:bg-error/20 text-on-error-container transition-all"  title="Rejeter ou demander des pièces complémentaires" type="button">
<span className="material-symbols-outlined text-title-md">cancel</span>
</button>
<button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all" title="Mettre en avant sur la page d'accueil (Hero / Featured)" type="button">
<span className="material-symbols-outlined text-title-md">star</span>
</button>
</div>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col xl:flex-row gap-space-lg items-start xl:items-center justify-between transition-all hover:shadow-xl">
<div className="flex flex-col sm:flex-row gap-space-md items-start sm:items-center w-full xl:w-7/12">
<div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Penthouse moderne luxueux en duplex dominant la baie d'Oran en Algérie, baies vitrées panoramiques, terrasse avec piscine à débordement donnant sur le port d'Oran et le mont Murdjadjo." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHXQXcK4R6L6L9IyhBZGdLotfpqG7EZG7SYa5Z4MI1fXARDDkdecUjMldRNpoeX_dE-uZcWgjuOkQk8lnG-6LVz1X3FNIWBtqpQetHLFhE3Qb7bD31SZBZdJd7z6mgCGzjPtn8sQR7WCqQpttGSI87sigoCVB1xCnQz1j1lCuTOUcertzoYzMVuDxN3_P2LpQqVzomkgI-AUoqAyynQS_e7ehDYfDztrMaNmmjSGjW7C5y_Posp6Q"/>
<span className="absolute top-2 left-2 px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-container-lowest text-primary font-bold shadow-sm">Vente</span>
<span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-label-sm font-label-sm bg-primary-container text-surface-container-lowest font-mono">PH-ORN-3108</span>
</div>
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Canastel • Oran (31)</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-surface-container text-on-surface font-semibold">Attestation Foncier Négatif</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Penthouse Vue Baie • Terrasses 420 m²</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Triplex de standing, ascenseur privatif codé, domotique intégrale.</p>
<div className="flex items-center gap-4 mt-2 text-on-surface-variant text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-secondary">verified</span>
<span className="font-semibold text-on-surface">Agence El Bahia Prestige</span>
<span className="text-xs bg-secondary-container/40 text-on-secondary-container px-1.5 py-0.2 rounded font-semibold">Agent Certifié #AG-88</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-on-surface-variant">call</span>
<span className="font-mono text-body-sm">+213 (0) 41 83 90 20</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between w-full xl:w-auto gap-space-md">
<div className="flex flex-col xl:items-end">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prix de Présentation</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">118 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
</div>
<div className="flex items-center gap-2 flex-wrap">
<a className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" href="#">
<span className="material-symbols-outlined text-secondary text-base">description</span>
<span>Acte dans l'Indivision (PDF)</span>
</a>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"  type="button">
                Examiner Pièces
              </button>
</div>
<div className="flex items-center gap-space-xs w-full sm:w-auto">
<button className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md font-bold shadow-sm transition-all flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-base">check_circle</span> Valider &amp; Publier
              </button>
<button className="p-2 rounded-lg bg-error-container hover:bg-error/20 text-on-error-container transition-all"  title="Rejeter l'annonce" type="button">
<span className="material-symbols-outlined text-title-md">cancel</span>
</button>
<button className="p-2 rounded-lg bg-primary-container text-secondary-container shadow-sm transition-all" title="Déjà sélectionné pour Carrousel Accueil" type="button">
<span className="material-symbols-outlined text-title-md">auto_awesome</span>
</button>
</div>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-md flex flex-col xl:flex-row gap-space-lg items-start xl:items-center justify-between transition-all hover:shadow-xl">
<div className="flex flex-col sm:flex-row gap-space-md items-start sm:items-center w-full xl:w-7/12">
<div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
<img className="w-full h-full object-cover" data-alt="Villa contemporaine minimaliste avec immense piscine miroir située dans une enclave privée à Zéralda Alger, architecture aux lignes pures en béton clair et pierre taillée locale, palmiers majestueux." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxttyKq17R0XZs7zcNEzIiNHE23f0gUU5flSORWRSD8pT3A0BhRPf-2Ha1yYNb3hqm7cMFSqLhvMbzvO5ylOreL5lHi8tC0CutBJXErKeThLVoyNHUcwyiZwDG1zUjM3OnfLIts2uKHXJ4i-gODob7RTGFmQdIEE3bU68I3RgBN8Cff5xwjCnLZqawZ0OFhfZ2HQzJqWHze1X1eQudNnSFATNCybFDu6FmsbeLOTTTHX8Mmr4Vk20"/>
<span className="absolute top-2 left-2 px-2 py-0.5 rounded text-label-sm font-label-sm bg-primary-container text-surface-container-lowest font-bold shadow-sm">Location</span>
<span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-label-sm font-label-sm bg-primary-container text-surface-container-lowest font-mono">PH-ALG-1674</span>
</div>
<div className="flex flex-col gap-1 min-w-0">
<div className="flex items-center gap-2 flex-wrap">
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">Zéralda • Alger Ouest (16)</span>
<span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-error-container text-on-error-container font-semibold">Pièce d'identité en cours</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface truncate">Villa d'Architecte • Domaine Sécurisé 900 m²</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">Parfait pour corps diplomatique ou multinationale, groupe électrogène industriel, forage.</p>
<div className="flex items-center gap-4 mt-2 text-on-surface-variant text-body-sm">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-secondary">person</span>
<span className="font-semibold text-on-surface">Mourad Senhadji</span>
<span className="text-xs bg-surface-container px-1.5 py-0.2 rounded text-on-surface-variant">Mandataire Familial</span>
</div>
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-base text-on-surface-variant">call</span>
<span className="font-mono text-body-sm">+213 (0) 771 95 44 02</span>
</div>
</div>
</div>
</div>
<div className="flex flex-col sm:flex-row xl:flex-col items-start sm:items-center xl:items-end justify-between w-full xl:w-auto gap-space-md">
<div className="flex flex-col xl:items-end">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Loyer Mensuel Souhaité</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">850 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA / mois</span>
</div>
</div>
<div className="flex items-center gap-2 flex-wrap">
<a className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors" href="#">
<span className="material-symbols-outlined text-error text-base">warning</span>
<span>Procuration Notariée (À vérifier)</span>
</a>
<button className="px-3 py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors"  type="button">
                Examiner Pièces
              </button>
</div>
<div className="flex items-center gap-space-xs w-full sm:w-auto">
<button className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md font-bold shadow-sm transition-all flex items-center justify-center gap-1.5" type="button">
<span className="material-symbols-outlined text-base">check_circle</span> Valider &amp; Publier
              </button>
<button className="p-2 rounded-lg bg-error-container hover:bg-error/20 text-on-error-container transition-all"  title="Rejeter ou demander rectification" type="button">
<span className="material-symbols-outlined text-title-md">cancel</span>
</button>
<button className="p-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface transition-all" title="Mettre en avant sur la page d'accueil" type="button">
<span className="material-symbols-outlined text-title-md">star</span>
</button>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
<div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-error text-title-lg">flag</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Signalements &amp; Alertes Fraude Foncier</h3>
</div>
<span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-error-container text-on-error-container font-bold">3 cas critiques</span>
</div>
<div className="flex flex-col gap-space-sm">
<div className="p-space-md rounded-lg bg-surface-container-low flex items-start justify-between gap-space-md">
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center flex-shrink-0 mt-0.5">
<span className="material-symbols-outlined text-base">report</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-bold">Suspicion de double mandat non consenti</span>
<span className="font-mono text-label-sm text-on-surface-variant font-bold">REF: PH-BLI-0912</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Signalé par Me Belkacemi (Notaire à Blida) : L'annonce "Terrain 1 200m² Ouled Yaïch" utilise un acte cadastral faisant l'objet d'un litige successoral en cours de cassation.
                </p>
<div className="flex items-center gap-3 mt-2 text-label-sm text-on-surface-variant">
<span>Déposé il y a 2h</span>
<span>•</span>
<span className="text-error font-semibold">Annonce mise en quarantaine automatique</span>
</div>
</div>
</div>
<div className="flex items-center gap-1">
<button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm" type="button">Dossier Judiciaire</button>
<button className="px-2.5 py-1 rounded bg-error text-on-error font-label-sm text-label-sm" type="button">Bannir Compte</button>
</div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex items-start justify-between gap-space-md">
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface flex items-center justify-center flex-shrink-0 mt-0.5">
<span className="material-symbols-outlined text-base">price_change</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-label-md text-label-md text-on-surface font-bold">Écart de prix anormal (Sous-évaluation potentielle)</span>
<span className="font-mono text-label-sm text-on-surface-variant font-bold">REF: PH-ALG-1690</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Appartement F4 à Hydra proposé à 15 000 000 DA (prix médian secteur : 55 000 000 DA). Possible tentative d'escroquerie à l'acompte bancaire.
                </p>
<div className="flex items-center gap-3 mt-2 text-label-sm text-on-surface-variant">
<span>Déposé par un nouveau profil particulier</span>
<span>•</span>
<span className="text-secondary font-semibold">Blocage préventif des paiements</span>
</div>
</div>
</div>
<div className="flex items-center gap-1">
<button className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm" type="button">Contacter Vendeur</button>
<button className="px-2.5 py-1 rounded bg-surface-container-lowest text-error font-label-sm text-label-sm" type="button">Rejeter Immédiatement</button>
</div>
</div>
</div>
</div>
<div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-md flex flex-col gap-space-md justify-between">
<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<h3 className="font-headline-sm text-headline-sm text-on-surface">Demandes d'Agrément Pro</h3>
<span className="material-symbols-outlined text-secondary">workspace_premium</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Agences immobilières et courtiers sollicitant le badge "Agent Prime Vérifié".</p>
<div className="flex flex-col gap-space-sm mt-2">
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap- space-sm">
<img className="w-10 h-10 rounded-lg object-cover shadow-sm mr-3" data-alt="Logo d'une prestigieuse agence immobilière algéroise avec dorures sur fond blanc immaculé." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfrZFq0X7MsP1ZqrheKnBFeQlvy4I9V57ttWMmZLdLZFWL93WPPdQztHZiIZTTB4Is8xQTgsFJTFwHfxo_aDYe1tAEUQuhS9UjCC2rvogkBAhaoHsdp9-RR-oe4ZCLuUwss5TaaRJ32kWA0VSD8FBc_YOFgLZGYfCNCZ_C6-7uXLlCnol1rUMmOBEd08uHt1b4U63KF7gRqrAOIyJ5MzdcIHPAZt2F3Y15jV58ne5QER6QxhqyYyo"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">Dar El Kheir Immobilier</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Registre Commerce • Alger Centre</span>
</div>
</div>
<button className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold" type="button">Valider KYC</button>
</div>
<div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
<div className="flex items-center gap- space-sm">
<img className="w-10 h-10 rounded-lg object-cover shadow-sm mr-3" data-alt="Emblème sobre d'un cabinet de courtage immobilier méditerranéen sur fond bleu marine et or." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjEmeBPwwEtT1Vwxowq2ZazTQB6zdF_-UUbmzWJE_038dekAbxhxrzqeApdqFgnnAyYL-NPYs2B8meZ-VU_SzXpgtqX1GpTwvlCbW8kEEMyZEttDCDAUCXPSo4CZxAfSKaDTEEMDe-5IlyxYqjW0WM3-dEYjAo1_mg0TVp1izevMuAlKDqV54y_qzGW1hY6YCUWzhFh3T4c2Jyn8V6vEj2emQ-KZlCcpkkPjQiIZwSt0eaZabSWCQ"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-bold">Constantine Luxury Estates</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Agrément Min. Habitat #4120</span>
</div>
</div>
<button className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold" type="button">Valider KYC</button>
</div>
</div>
</div>
<div className="p-space-md rounded-lg bg-primary-container text-surface flex items-center justify-between">
<div className="flex flex-col">
<span className="font-label-md text-label-md text-secondary-container font-bold">Liaison Chambre Notaires</span>
<span className="font-body-sm text-[12px] text-surface-variant">API Cadastre &amp; DGF opérationnelle</span>
</div>
<span className="material-symbols-outlined text-secondary-container text-title-lg">lan</span>
</div>
</div>
</div>
</div>
<div className="fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-sm hidden items-center justify-center p-4" id="rejectModal">
<div className="bg-surface-container-lowest max-w-lg w-full rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md relative animate-in fade-in zoom-in duration-200">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm text-error">
<span className="material-symbols-outlined text-title-lg">assignment_late</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface">Motif du Refus ou Pièces Requises</h4>
</div>
<button className="text-on-surface-variant hover:text-on-surface"  type="button">
<span className="material-symbols-outlined text-title-md">close</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
        Un rapport formel conforme aux régulations sera automatiquement transmis par SMS sécurisé et e-mail certifié au dépositaire de l'annonce <span className="font-mono font-bold text-on-surface" id="rejectRefTarget"></span>.
      </p>
<div className="flex flex-col gap-space-xs">
<label className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
<input checked="" className="text-primary focus:ring-0" name="rejectReason" type="radio" value="livret"/>
<span className="font-body-sm text-body-sm text-on-surface">Livret foncier manquant, non conforme ou illisible</span>
</label>
<label className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
<input className="text-primary focus:ring-0" name="rejectReason" type="radio" value="id"/>
<span className="font-body-sm text-body-sm text-on-surface">Pièce d'identité nationale (NIN) ou procuration notariée requise</span>
</label>
<label className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
<input className="text-primary focus:ring-0" name="rejectReason" type="radio" value="photos"/>
<span className="font-body-sm text-body-sm text-on-surface">Qualité visuelle insuffisante / Filigrane d'un autre portail détecté</span>
</label>
<label className="flex items-center gap-space-xs p-2 rounded-lg bg-surface-container-low cursor-pointer hover:bg-surface-container">
<input className="text-primary focus:ring-0" name="rejectReason" type="radio" value="prix"/>
<span className="font-body-sm text-body-sm text-on-surface">Incohérence manifeste de l'évaluation tarifaire en Dinar Algérien</span>
</label>
</div>
<div className="flex flex-col gap-1">
<label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">Commentaire d'instruction interne • Note du Modérateur</label>
<textarea className="w-full bg-surface-container-low rounded-lg p-2.5 font-body-sm text-body-sm text-on-surface outline-none border-0 focus:ring-2 focus:ring-primary" placeholder="Indiquez avec précision les clauses ou documents attendus par le comité juridique..." rows="3"></textarea>
</div>
<div className="flex items-center justify-end gap-space-sm mt-2">
<button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-all"  type="button">
          Annuler
        </button>
<button className="px-4 py-2 rounded-lg bg-error text-on-error font-label-md text-label-md font-bold shadow-sm hover:opacity-95 transition-all"  type="button">
          Notifier le Dépositaire &amp; Rejeter
        </button>
</div>
</div>
</div>
<div className="fixed inset-0 z-50 bg-primary-container/60 backdrop-blur-sm hidden items-center justify-center p-4" id="reviewModal">
<div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl shadow-2xl p-space-lg flex flex-col gap-space-md relative max-h-[921px] overflow-y-auto">
<div className="flex items-center justify-between pb-2 border-b border-surface-container">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">policy</span>
<div>
<h4 className="font-headline-sm text-headline-sm text-on-surface" id="modalTitle">Examen Juridique Approfondi</h4>
<span className="font-label-sm text-label-sm text-on-surface-variant font-mono" id="modalRef">REF: PH-ALG-1602</span>
</div>
</div>
<button className="text-on-surface-variant hover:text-on-surface"  type="button">
<span className="material-symbols-outlined text-title-md">close</span>
</button>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md bg-surface-container-low p-space-md rounded-xl">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Propriétaire Déclarant</span>
<span className="font-label-md text-label-md text-on-surface font-bold" id="modalOwner">Reda Bouras</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">NIN: 1982169002340019</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Valorisation Mandat</span>
<span className="font-currency-display text-title-lg text-on-surface" id="modalPrice">245 000 000 DA</span>
<span className="font-body-sm text-[12px] text-secondary font-semibold">Taux d'honoraires Prime House : 3%</span>
</div>
</div>
<div className="flex flex-col gap-space-sm">
<span className="font-label-md text-label-md text-on-surface font-bold">Pièces Notariées Numérisées (Audit OCR)</span>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">picture_as_pdf</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Acte_Authentique_Notarie_Volume_142.pdf</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Signé par Me K. Tlemçani, Notaire à Bir Mourad Raïs • 4.8 Mo</span>
</div>
</div>
<span className="px-2 py-0.5 rounded font-label-sm text-[10px] bg-secondary-container text-on-secondary-container font-bold">Conforme</span>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">picture_as_pdf</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Livret_Foncier_Cadastre_Alger_2023.pdf</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Conservation Foncière de Chéraga • Section 04 Ilôt 18 • 2.1 Mo</span>
</div>
</div>
<span className="px-2 py-0.5 rounded font-label-sm text-[10px] bg-secondary-container text-on-secondary-container font-bold">Conforme</span>
</div>
<div className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary">fact_check</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Certificat_Negatif_Hypotheque.pdf</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Délivré le 12/01/2025 • Aucune sûreté ni gage inscrit • 1.4 Mo</span>
</div>
</div>
<span className="px-2 py-0.5 rounded font-label-sm text-[10px] bg-secondary-container text-on-secondary-container font-bold">Vierge</span>
</div>
</div>
<div className="flex items-center justify-between pt-4 border-t border-surface-container">
<span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-sm">lock</span>
          Chiffrement de bout en bout conforme loi 18-07
        </span>
<div className="flex items-center gap-space-sm">
<button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md"  type="button">Fermer</button>
<button className="px-4 py-2 rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md font-bold shadow-sm"  type="button">Valider Définitivement</button>
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
