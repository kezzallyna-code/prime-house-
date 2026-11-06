'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="w-full flex flex-col gap-6 mb-8">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
<div className="flex flex-col gap-1">

<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Administration</span>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
<span className="font-label-sm text-label-sm text-outline uppercase tracking-widest">Taxonomie &amp; Config</span>
<span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
<span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-widest">Catégories &amp; Wilayas</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-primary-container tracking-tight">
          Catégories, Wilayas &amp; Paramètres de Recherche
        </h1>
<p className="font-body-md text-body-md text-on-surface-variant max-w-4xl">
          Administrez les critères de recherche du site public, les 58 Wilayas algériennes couvertes, les typologies d'architecture et les équipements certifiés.
        </p>
</div>

<div className="flex items-center gap-3 self-start lg:self-center shrink-0">
<button className="px-4 py-2.5 rounded bg-surface-container-lowest text-primary-container shadow-sm hover:shadow-md hover:bg-surface-container-low transition-all font-label-md text-label-md flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-secondary text-[18px]">add_circle</span>
<span>+ Nouvelle Catégorie</span>
</button>
<button className="px-5 py-2.5 rounded bg-secondary text-on-secondary shadow-md hover:bg-secondary-fixed-dim hover:-translate-y-0.5 transition-all font-label-md text-label-md flex items-center gap-2 font-semibold" type="button">
<span className="material-symbols-outlined text-[18px]">add_location_alt</span>
<span>+ Ajouter un Secteur / Wilaya</span>
</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
<div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[24px]">map</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Territoires Actifs</span>
<span className="font-headline-sm text-headline-sm text-primary-container font-semibold">14 <span className="font-body-sm text-body-sm text-outline font-normal">/ 58 Wilayas</span></span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[24px]">holiday_village</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Communes Enregistrées</span>
<span className="font-headline-sm text-headline-sm text-primary-container font-semibold">48 <span className="font-body-sm text-body-sm text-secondary font-medium">Prestige DZ</span></span>
</div>
</div>
<div className="bg-surface-container-lowest rounded-lg p-4 shadow-sm flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-secondary text-[24px]">apartment</span>
</div>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Typologies Publiées</span>
<span className="font-headline-sm text-headline-sm text-primary-container font-semibold">5 <span className="font-body-sm text-body-sm text-outline font-normal">Catégories mères</span></span>
</div>
</div>
<div className="bg-primary-container text-surface-container-lowest rounded-lg p-4 shadow-sm flex items-center justify-between">
<div className="flex flex-col min-w-0">
<div className="flex items-center gap-1.5 mb-1">
<span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
<span className="font-label-sm text-label-sm text-tertiary-fixed tracking-wider uppercase">Supabase Sync</span>
</div>
<span className="font-body-sm text-body-sm text-surface-dim font-mono">FK Check: 100% Intact</span>
</div>
<span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
</div>
</div>
</div>

<div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-7 flex flex-col gap-6">
<div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm">

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5">
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-lg text-title-lg text-primary-container font-semibold">Découpage &amp; Wilayas Stratégiques</span>
<span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold">Algeria Hub</span>
</div>
<span className="font-body-sm text-body-sm text-outline">Arborescence géoréférencée pour les filtres publics</span>
</div>
<div className="relative w-full sm:w-64">
<span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">search</span>
<input className="w-full pl-9 pr-3 py-1.5 rounded bg-surface text-on-surface placeholder-outline text-body-sm font-body-sm focus:outline-none focus:bg-surface-container-low transition-colors" placeholder="Rechercher wilaya, commune..." type="text"/>
</div>
</div>

<div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4">
<button className="px-3.5 py-1.5 rounded-full bg-primary-container text-surface-container-lowest font-label-sm text-label-sm tracking-wide shrink-0 font-medium">
            Toutes (58)
          </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm tracking-wide shrink-0">
            Pôles Métropolitains Actifs (14)
          </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm tracking-wide shrink-0">
            Littoral Méditerranéen
          </button>
<button className="px-3.5 py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm tracking-wide shrink-0">
            En cours d'ouverture
          </button>
</div>

<div className="flex flex-col gap-4">

<div className="rounded-lg bg-surface-container-low p-4 transition-all">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center justify-center font-bold">
                  16
                </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Alger (الجزائر العاصمة)</span>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold tracking-wider">PRESTIGE PRIME</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Secteur Diplomatique, Baie d'Alger &amp; Saheline</span>
</div>
</div>
<div className="flex items-center gap-2 self-end sm:self-center">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md font-bold shadow-sm">
                  84 mandats actifs
                </span>
<button className="w-8 h-8 rounded bg-surface-container-lowest text-outline hover:text-primary-container flex items-center justify-center shadow-sm transition-colors" title="Éditer la zone">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>

<div className="pt-3 flex flex-col gap-2.5">
<div className="flex items-center justify-between">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Communes &amp; Quartiers Gérés (7 actifs)</span>
<button className="font-label-sm text-label-sm text-secondary hover:underline flex items-center gap-1 font-semibold" type="button">
<span className="material-symbols-outlined text-[14px]">add</span>
<span>Ajouter un quartier de prestige</span>
</button>
</div>
<div className="flex flex-wrap gap-2">

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Hydra (Ambassades / Paradou)</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">El Biar (Saint-Raphaël)</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Chéraga (Djenane Achabou)</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Sidi Yahia</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Poirson / Colonne Voirol</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Ben Aknoun (Val d'Hydra)</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>

<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-medium">Zéralda (Front de Mer)</span>
<button className="text-outline hover:text-error ml-1 flex items-center" title="Désactiver"><span className="material-symbols-outlined text-[14px]">cancel</span></button>
</div>
</div>
</div>

<div className="mt-4 pt-3 flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-4">
<span className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
<span>Visible sur les sélecteurs publics</span>
</span>
<span className="flex items-center gap-1 text-outline">
<span className="material-symbols-outlined text-[16px]">pin_drop</span>
<span>Lat: 36.7538° N, Lon: 3.0588° E</span>
</span>
</div>
<div className="flex items-center gap-2">
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
                  Définir repères fonciers
                </button>
</div>
</div>
</div>

<div className="rounded-lg bg-surface-container-low p-4 transition-all">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center justify-center font-bold">
                  31
                </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Oran (وهران الباهية)</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">LITTORAL OUEST</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Front de mer, Falaises &amp; Pôles d'affaires</span>
</div>
</div>
<div className="flex items-center gap-2 self-end sm:self-center">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md font-bold shadow-sm">
                  32 mandats actifs
                </span>
<button className="w-8 h-8 rounded bg-surface-container-lowest text-outline hover:text-primary-container flex items-center justify-center shadow-sm transition-colors" title="Éditer la zone">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
<div className="pt-3 flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Secteurs Gérés (5 actifs)</span>
<div className="flex flex-wrap gap-2">
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Front de Mer (Boulevard ALN)</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Canastel (Villas de Falaise)</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Akid Lotfi</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Millénium</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Courbet</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-body-sm font-body-sm">
<span className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
<span>Filtre public actif</span>
</span>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
                Définir repères fonciers
              </button>
</div>
</div>

<div className="rounded-lg bg-surface-container-low p-4 transition-all">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center justify-center font-bold">
                  35
                </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Boumerdès (بومرداس)</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">CÔTE EST</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Villas balnéaires, résidences secondaires sécurisées</span>
</div>
</div>
<div className="flex items-center gap-2 self-end sm:self-center">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md font-bold shadow-sm">
                  12 mandats actifs
                </span>
<button className="w-8 h-8 rounded bg-surface-container-lowest text-outline hover:text-primary-container flex items-center justify-center shadow-sm transition-colors" title="Éditer la zone">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
<div className="pt-3 flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Secteurs Côtiers</span>
<div className="flex flex-wrap gap-2">
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Front de Mer (Rocher Noir)</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Corso Résidentiel</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Cap Djinet (Plein Bord Mer)</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-body-sm font-body-sm">
<span className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
<span>Filtre public actif</span>
</span>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
                Définir repères fonciers
              </button>
</div>
</div>

<div className="rounded-lg bg-surface-container-low p-4 transition-all">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3">
<div className="flex items-center gap-3">
<span className="w-8 h-8 rounded bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center justify-center font-bold">
                  09
                </span>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Blida (البليدة)</span>
<span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold tracking-wider">MITIDJA &amp; HAUTEURS</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Domaines arborés, vergers et résidences de standing</span>
</div>
</div>
<div className="flex items-center gap-2 self-end sm:self-center">
<span className="px-2.5 py-1 rounded-full bg-surface-container-lowest text-secondary font-label-md text-label-md font-bold shadow-sm">
                  8 mandats actifs
                </span>
<button className="w-8 h-8 rounded bg-surface-container-lowest text-outline hover:text-primary-container flex items-center justify-center shadow-sm transition-colors" title="Éditer la zone">
<span className="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
</div>
<div className="pt-3 flex flex-col gap-2">
<span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">Secteurs Résidentiels</span>
<div className="flex flex-wrap gap-2">
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Atlas Blidéen / Chréa Foothills</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest shadow-sm text-on-surface font-body-sm text-body-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Ouled Yaïch (Quartier Villa)</span>
</div>
</div>
</div>
<div className="mt-4 pt-3 flex items-center justify-between text-body-sm font-body-sm">
<span className="flex items-center gap-1 text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">visibility</span>
<span>Filtre public actif</span>
</span>
<button className="px-2.5 py-1 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm">
                Définir repères fonciers
              </button>
</div>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm">
<div className="flex items-start gap-4">
<div className="w-10 h-10 rounded bg-primary-container text-secondary flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[22px]">database</span>
</div>
<div className="flex flex-col gap-2">
<div className="flex items-center gap-2">
<h3 className="font-title-md text-title-md text-primary-container font-semibold">Intégrité Référentielle Postgres &amp; Clés Étrangères</h3>
<span className="px-2 py-0.5 rounded bg-surface-container text-outline font-label-sm text-label-sm uppercase font-mono">schema: public</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
              Toutes les wilayas et communes sont reliées via des clés étrangères (<code className="bg-surface-container px-1 py-0.5 rounded text-primary-container font-mono text-[12px]">wilaya_id</code>, <code className="bg-surface-container px-1 py-0.5 rounded text-primary-container font-mono text-[12px]">commune_id</code>) garantissant qu'aucune annonce de prestige ne puisse être orpheline géographiquement. Les modifications d'alias de quartiers sont automatiquement répercutées sur les endpoints de filtrage Algolia/PostgREST.
            </p>
<div className="flex flex-wrap gap-3 pt-1">
<span className="font-label-sm text-label-sm text-outline font-mono">TABLES FK: `wilayas` • `communes` • `property_categories` • `amenities`</span>
</div>
</div>
</div>
</div>
</div>

<div className="lg:col-span-5 flex flex-col gap-6">

<div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-3">
<div className="flex flex-col">
<span className="font-title-lg text-title-lg text-primary-container font-semibold">Typologies de Biens</span>
<span className="font-body-sm text-body-sm text-outline">Catégories mères affichées sur le portail</span>
</div>
<button className="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm flex items-center gap-1.5" type="button">
<span className="material-symbols-outlined text-[16px] text-secondary">drag_handle</span>
<span>Réordonner filtres</span>
</button>
</div>

<div className="flex flex-col gap-3">

<div className="p-3.5 rounded-lg bg-surface-container-low flex items-start justify-between gap-3 group hover:bg-surface-container transition-colors">
<div className="flex items-start gap-3">
<div className="w-9 h-9 rounded bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[20px]">villa</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Villas d'Architecte &amp; Propriétés de Maître</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Actif sur les sélecteurs : <span className="font-medium text-secondary">/acheter</span> et <span className="font-medium text-secondary">/nos-biens</span></span>
<span className="font-label-sm text-label-sm text-outline mt-1 font-mono">Slug: villa-architecte • 42 biens actifs</span>
</div>
</div>
<button className="text-outline hover:text-primary-container p-1 rounded" title="Modifier la catégorie">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>

<div className="p-3.5 rounded-lg bg-surface-container-low flex items-start justify-between gap-3 group hover:bg-surface-container transition-colors">
<div className="flex items-start gap-3">
<div className="w-9 h-9 rounded bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[20px]">domain</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Appartements &amp; Duplex de Prestige</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Actif sur : <span className="font-medium text-secondary">/acheter</span>, <span className="font-medium text-secondary">/louer</span></span>
<span className="font-label-sm text-label-sm text-outline mt-1 font-mono">Slug: duplex-prestige • 58 biens actifs</span>
</div>
</div>
<button className="text-outline hover:text-primary-container p-1 rounded" title="Modifier la catégorie">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>

<div className="p-3.5 rounded-lg bg-surface-container-low flex items-start justify-between gap-3 group hover:bg-surface-container transition-colors">
<div className="flex items-start gap-3">
<div className="w-9 h-9 rounded bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[20px]">deck</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Penthouses Vue Mer &amp; Terrasses d'Exception</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Actif sur les sélections VIP &amp; bannières vedettes</span>
<span className="font-label-sm text-label-sm text-outline mt-1 font-mono">Slug: penthouses-mer • 19 biens actifs</span>
</div>
</div>
<button className="text-outline hover:text-primary-container p-1 rounded" title="Modifier la catégorie">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>

<div className="p-3.5 rounded-lg bg-surface-container-low flex items-start justify-between gap-3 group hover:bg-surface-container transition-colors">
<div className="flex items-start gap-3">
<div className="w-9 h-9 rounded bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[20px]">landscape</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Terrains Constructibles Viabilisés &amp; Foncier R+</span>
</div>
<div className="mt-1 flex items-center gap-1.5 px-2 py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-[14px] text-secondary">info</span>
<span>Règle UI : Masque filtres chambres / salles de bain</span>
</div>
<span className="font-label-sm text-label-sm text-outline mt-1 font-mono">Slug: terrains-foncier • 11 opportunités</span>
</div>
</div>
<button className="text-outline hover:text-primary-container p-1 rounded" title="Modifier la catégorie">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>

<div className="p-3.5 rounded-lg bg-surface-container-low flex items-start justify-between gap-3 group hover:bg-surface-container transition-colors">
<div className="flex items-start gap-3">
<div className="w-9 h-9 rounded bg-surface-container-lowest flex items-center justify-center shrink-0 shadow-sm text-secondary">
<span className="material-symbols-outlined text-[20px]">corporate_fare</span>
</div>
<div className="flex flex-col">
<div className="flex items-center gap-2">
<span className="font-title-md text-title-md text-primary-container font-semibold">Propriétés Commerciales &amp; Sièges Diplomatiques</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Bureaux d'ambassade, plateaux mixtes haut standing</span>
<span className="font-label-sm text-label-sm text-outline mt-1 font-mono">Slug: diplomatique-corp • 6 mandats</span>
</div>
</div>
<button className="text-outline hover:text-primary-container p-1 rounded" title="Modifier la catégorie">
<span className="material-symbols-outlined text-[18px]">edit</span>
</button>
</div>
</div>
</div>

<div className="bg-surface-container-lowest rounded-lg p-6 shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-3">
<div className="flex flex-col">
<span className="font-title-lg text-title-lg text-primary-container font-semibold">Équipements &amp; Spécifications DZ</span>
<span className="font-body-sm text-body-sm text-outline">Tags d'autonomie et confort dans les formulaires d'annonces</span>
</div>
<span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
            Certifiés
          </span>
</div>
<div className="flex flex-col gap-2.5">

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Bâche à eau &amp; Surpresseur</span>
<span className="font-body-sm text-body-sm text-outline">Autonomie continue du réseau d'eau potable (essentiel DZ)</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">water_drop</span>
</label>

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Groupe électrogène insonorisé</span>
<span className="font-body-sm text-body-sm text-outline">Relais automatique secours réseau électrique triphasé</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">electric_bolt</span>
</label>

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Climatisation gainable VRV &amp; Chauffage sol</span>
<span className="font-body-sm text-body-sm text-outline">Système thermique réversible multizone haut rendement</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">ac_unit</span>
</label>

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Domotique KNX &amp; Câblage fibre optique</span>
<span className="font-body-sm text-body-sm text-outline">Gestion centralisée scénarios d'éclairage et rideaux</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">stream_apps</span>
</label>

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Poste de sécurité blindé &amp; Caméras 4K</span>
<span className="font-body-sm text-body-sm text-outline">Sas anti-intrusion, vidéosurveillance périmétrique</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">shield</span>
</label>

<label className="flex items-center justify-between p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<div className="flex items-center gap-3">
<div className="w-5 h-5 rounded bg-primary-container flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-[16px]">check</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-medium">Piscine à débordement / Hammam traditionnel</span>
<span className="font-body-sm text-body-sm text-outline">Espaces de détente en marbre de Thénia ou d'Italie</span>
</div>
</div>
<span className="material-symbols-outlined text-[20px] text-secondary">pool</span>
</label>
</div>
<button className="w-full mt-2 py-2 rounded bg-surface-container text-primary-container hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center justify-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">add</span>
<span>Ajouter un équipement normé</span>
</button>
</div>

<div className="bg-primary-container text-surface-container-lowest rounded-lg p-4 shadow-xl flex items-center justify-between">
<div className="flex items-center gap-3">
<span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed"></span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-surface-container-lowest font-medium">Paramètres mis à jour en direct</span>
<span className="font-body-sm text-body-sm text-surface-dim">Les critères de recherche publics sont synchronisés.</span>
</div>
</div>
<button className="px-4 py-2 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-colors font-label-md text-label-md font-semibold shrink-0">
          Publier en Production
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
