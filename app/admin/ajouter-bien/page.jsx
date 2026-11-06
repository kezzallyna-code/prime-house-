'use client';

import { Suspense } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer from '@/components/Toast';

function AdminContent() {
  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="sticky top-20 z-30 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm -mx-8 px-8 py-4 mb-8">
<div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex flex-col">
<div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
<span>Administration</span>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span>Parc Immobilier</span>
<span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
<span className="text-secondary font-bold">Nouveau Mandat d'Édition</span>
</div>
<div className="flex items-center gap-3 mt-1">
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Fiche d'Édition &amp; Publication</h1>
<span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">Brouillon #PH-ALG-2025-092</span>
</div>
</div>

<div className="flex items-center gap-3 self-end md:self-auto">
<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
<span>Aperçu public</span>
</button>
<button className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors font-label-md text-label-md" type="button">
<span className="material-symbols-outlined text-[18px]">save</span>
<span>Enregistrer brouillon</span>
</button>
<button className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm font-label-md text-label-md" type="button">
<span className="material-symbols-outlined text-[18px]" style={{ "fontVariationSettings": "'FILL' 1" }}>check_circle</span>
<span>Valider &amp; Mettre en ligne</span>
</button>
</div>
</div>
</div>
<div className="grid grid-cols-12 gap-8 items-start">

<div className="hidden lg:flex lg:col-span-3 flex-col gap-2 sticky top-44">
<div className="p-5 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-outline">Structure Fiche</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">65% Complété</span>
</div>

<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ "width": "65%" }}></div>
</div>
<nav className="flex flex-col gap-1 text-on-surface-variant font-body-sm text-body-sm">
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors text-on-surface font-semibold bg-surface-container-low" href="#section-general">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> 1. Informations Générales</span>
<span className="material-symbols-outlined text-[16px] text-secondary" style={{ "fontVariationSettings": "'FILL' 1" }}>check_circle</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-financial">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 2. Conditions Financières</span>
<span className="material-symbols-outlined text-[16px] text-secondary" style={{ "fontVariationSettings": "'FILL' 1" }}>check_circle</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-location">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 3. Localisation &amp; Cadastre</span>
<span className="material-symbols-outlined text-[16px] text-secondary" style={{ "fontVariationSettings": "'FILL' 1" }}>check_circle</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-physical">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 4. Surfaces &amp; Structure</span>
<span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-amenities">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 5. Équipements de Standing</span>
<span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-description">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 6. Atouts &amp; Descriptif</span>
<span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-media">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 7. Galerie Haute Définition</span>
<span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
</a>
<a className="flex items-center justify-between p-2 rounded hover:bg-surface-container transition-colors" href="#section-legal">
<span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-outline"></span> 8. Conformité Juridique</span>
<span className="material-symbols-outlined text-[16px] text-outline">radio_button_unchecked</span>
</a>
</nav>
<div className="p-3.5 rounded-lg bg-surface-container-low flex flex-col gap-2 mt-2">
<div className="flex items-center gap-2 text-on-surface font-title-md text-title-md">
<span className="material-symbols-outlined text-secondary text-[20px]">verified</span>
<span>Mandat Exclusif</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Les mandats vérifiés bénéficient d'un boost de visibilité auprès des acquéreurs de la diaspora et délégations consulaires.
          </p>
</div>
</div>
</div>

<div className="col-span-12 lg:col-span-9 flex flex-col gap-8 pb-16">

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-general">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">domain</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">1. Informations Générales &amp; Typologie</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Identification principale de l'actif immobilier pour le catalogue.</p>
</div>
</div>
<span className="px-3 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm tracking-widest uppercase">Obligatoire</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="flex flex-col gap-2 col-span-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Type de Transaction</label>
<div className="grid grid-cols-2 gap-3 max-w-md">
<label className="relative flex items-center justify-center p-3.5 rounded-lg bg-surface-container-low cursor-pointer transition-all hover:bg-surface-container has-[:defaultChecked]:bg-primary-container has-[:defaultChecked]:text-on-primary">
<input checked="" className="sr-only" name="transaction_type" type="radio" value="vente"/>
<span className="flex items-center gap-2 font-title-md text-title-md">
<span className="material-symbols-outlined text-[20px]">sell</span>
<span>À Vendre</span>
</span>
</label>
<label className="relative flex items-center justify-center p-3.5 rounded-lg bg-surface-container-low cursor-pointer transition-all hover:bg-surface-container has-[:defaultChecked]:bg-primary-container has-[:defaultChecked]:text-on-primary">
<input className="sr-only" name="transaction_type" type="radio" value="location"/>
<span className="flex items-center gap-2 font-title-md text-title-md">
<span className="material-symbols-outlined text-[20px]">key</span>
<span>À Louer</span>
</span>
</label>
</div>
</div>

<div className="flex flex-col gap-2 col-span-2">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Titre de l'Annonce (Français)</label>
<span className="font-label-sm text-label-sm text-outline">74 / 120 caractères</span>
</div>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all placeholder:text-outline" type="text" value="Villa Contemporaine d'Exception avec Piscine à Débordement — Hydra"/>
</div>

<div className="flex flex-col gap-2 col-span-2">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-2">
<span>Titre de l'Annonce (Arabe optionnel)</span>
<span className="text-secondary font-label-sm text-label-sm">عنوان الإعلان</span>
</label>
<span className="font-label-sm text-label-sm text-outline">Recommandé pour visibilité GCC &amp; Local</span>
</div>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all placeholder:text-outline text-right" dir="rtl" placeholder="فيلا عصرية فاخرة مع مسبح بانورامي — حيدرة، الجزائر العاصمة" type="text"/>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Catégorie du Bien</label>
<div className="relative">
<select className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all appearance-none cursor-pointer" id="property-type-selector">
<option  value="villa">Villa Prestige &amp; Domaine</option>
<option value="appartement">Appartement Grand Standing</option>
<option value="duplex">Duplex &amp; Penthouse Panoramique</option>
<option value="riad">Maison de Maître &amp; Riad</option>
<option value="terrain">Terrain constructible résidentiel</option>
<option value="commercial">Propriété Commerciale &amp; Siège</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Référence Mandat Interne</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container text-on-surface-variant font-label-lg text-label-lg tracking-wider cursor-not-allowed select-all" readOnly="" type="text" value="PH-ALG-2025-092"/>
<span className="material-symbols-outlined absolute right-3 text-secondary text-[20px]">lock</span>
</div>
</div>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-financial">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">payments</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">2. Conditions Financières &amp; Monétaires</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Tarification en Dinars Algériens (DZD) et garanties locatives.</p>
</div>
</div>
<span className="px-3 py-1 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">DZD Monnaie</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

<div className="flex flex-col gap-2 col-span-2 md:col-span-1">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Prix de Présentation (ou Loyer)</label>
<div className="relative flex items-center">
<input className="w-full pl-4 pr-16 py-3 rounded bg-surface-container-low text-on-surface font-currency-display text-currency-display focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all" type="text" value="165 000 000"/>
<span className="absolute right-4 font-currency-display text-currency-display text-secondary">DA</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Équivalent approx : ~1 140 000 € (Taux de chancellerie)</span>
</div>

<div className="flex flex-col gap-2 col-span-2 md:col-span-1">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Charges Copropriété / Maintenance Estimées</label>
<div className="relative flex items-center">
<input className="w-full pl-4 pr-16 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all" placeholder="ex: 45 000" type="text"/>
<span className="absolute right-4 font-label-md text-label-md text-outline">DA / mois</span>
</div>
<span className="font-label-sm text-label-sm text-outline">Gardiennage, entretien piscine, groupe électrogène</span>
</div>

<div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Prix Négociable</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Indique si le mandant accepte les offres structurées d'investisseurs qualifiés.</p>
</div>
<div className="p-4 rounded-lg bg-surface-container-low flex flex-col gap-3">
<div className="flex items-center justify-between">
<span className="font-title-md text-title-md text-on-surface">Éligible Crédit &amp; Finance Islamique</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Dossier foncier assaini prêt pour Mourabaha bancaire en Algérie (Al Baraka, Badr, BNA).</p>
</div>

<div className="flex flex-col gap-2 col-span-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Conditions d'Honoraires &amp; Caution</label>
<div className="grid grid-cols-1 md:grid-cols-3 gap-3">
<div className="p-3 rounded bg-surface-container flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface">Honoraires Agence</span>
<span className="font-label-lg text-label-lg text-secondary">2.5% Vente</span>
</div>
<div className="p-3 rounded bg-surface-container flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface">Dépôt de Garantie</span>
<span className="font-label-lg text-label-lg text-on-surface">2 Mois loyer</span>
</div>
<div className="p-3 rounded bg-surface-container flex items-center justify-between">
<span className="font-body-sm text-body-sm text-on-surface">Avance Demandée</span>
<span className="font-label-lg text-label-lg text-on-surface">12 Mois (Bail consulaire)</span>
</div>
</div>
</div>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-location">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">location_on</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">3. Localisation &amp; Cadastre Sécurisé</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Positionnement géographique et niveau de confidentialité de l'adresse.</p>
</div>
</div>
<span className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span> Wilaya 16 (Alger)
          </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Wilaya (58 wilayas)</label>
<div className="relative">
<select className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none appearance-none">
<option  value="16">16 — Alger</option>
<option value="31">31 — Oran</option>
<option value="25">25 — Constantine</option>
<option value="09">09 — Blida</option>
<option value="42">42 — Tipaza</option>
<option value="15">15 — Tizi Ouzou</option>
<option value="23">23 — Annaba</option>
<option value="30">30 — Ouargla / Hassi Messaoud</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Commune / Daira</label>
<div className="relative">
<select className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none appearance-none">
<option  value="hydra">Hydra (حيدرة)</option>
<option value="el_biar">El Biar (الأبيار)</option>
<option value="sidi_yahia">Sidi Yahia</option>
<option value="ben_aknoun">Ben Aknoun</option>
<option value="dely_brahim">Dely Ibrahim</option>
<option value="ain_benian">Ain Benian (La Madrague)</option>
<option value="bouzareah">Bouzaréah</option>
<option value="alger_centre">Alger Centre / Telemly</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Quartier &amp; Secteur</label>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none" type="text" value="Val d'Hydra, proximité secteur diplomatique"/>
</div>

<div className="col-span-1 md:col-span-3 p-4 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Périmètre de Confidentialité Diplomatique</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">L'adresse exacte ne sera communiquée qu'après filtrage d'identité (KYC) et accord écrit.</span>
</div>
</div>
<div className="flex items-center gap-2">
<span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">Rayon flou (300m)</span>
<label className="relative inline-flex items-center cursor-pointer">
<input checked="" className="sr-only peer" type="checkbox"/>
<div className="w-11 h-6 bg-surface-variant peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface-container-lowest after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>
</div>

<div className="col-span-1 md:col-span-3 flex flex-col gap-2">
<div className="flex items-center justify-between">
<span className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Pointage Satellite / Coordonnées GPS</span>
<span className="font-label-sm text-label-sm text-secondary font-mono">36.7438° N, 3.0416° E</span>
</div>
<div className="w-full h-72 rounded-xl bg-cover bg-center relative overflow-hidden flex flex-col justify-between p-4 shadow-sm" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCEgoTe0CsYwwlVvv3NVdHwd7jw1y5Vewu8pA9xuSp2SZ14U4-Db1-E1PEXEHXO3efNzazJDcTQqU1x2kbQP8uXrs4-QSKhI3LrVcPq5mmIhqJFeSEW6Fy7kVCg62TNWqyi1_gadAsWdOiGxszvS5SyGvHqP_7ylkFNtnE5C9r-WNsMHgfhsimm9pykwUpUfKoQXv42y8q-d3ubY_MSYyDFJJHGvPQvDMCRexvv8LG4i31xOZFQ7l8')" }}>
<div className="self-start px-3 py-1.5 rounded-full bg-primary-container/85 text-surface-container-lowest backdrop-blur-md flex items-center gap-2 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-secondary text-[16px]">pin_drop</span>
<span>Hydra • Cible Calibrée</span>
</div>
<div className="self-center flex items-center justify-center">
<div className="w-14 h-14 rounded-full bg-secondary/30 flex items-center justify-center animate-pulse">
<div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary shadow-md">
<span className="material-symbols-outlined text-[18px]">home</span>
</div>
</div>
</div>
<div className="self-end px-3 py-1.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-body-sm text-body-sm shadow-sm flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-secondary">drag_pan</span>
<span>Déplacez le repère pour ajuster la parcelle</span>
</div>
</div>
</div>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-physical">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">square_foot</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">4. Caractéristiques Physiques &amp; Espaces</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Métriques d'ingénierie cadastrale et agencement des pièces.</p>
</div>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 rounded bg-secondary-fixed/30 text-on-secondary-fixed-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-[16px]">info</span>
<span>Champs conditionnels actifs</span>
</div>
</div>
<div className="p-3.5 rounded-lg bg-surface-container-high/40 text-on-surface-variant font-body-sm text-body-sm flex items-center gap-2">
<span className="material-symbols-outlined text-secondary text-[18px]">tune</span>
<span>Pour les typologies « Terrain constructible », les modules pièces et suites s'estompent automatiquement.</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Surface Terrain</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none" type="number" value="720"/>
<span className="absolute right-3 font-label-md text-label-md text-outline">m²</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Surface Habitable</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none" type="number" value="540"/>
<span className="absolute right-3 font-label-md text-label-md text-outline">m²</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Pièces Principales</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none" type="number" value="8"/>
<span className="material-symbols-outlined absolute right-3 text-outline text-[18px]">meeting_room</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Chambres / Suites</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none" type="number" value="5"/>
<span className="material-symbols-outlined absolute right-3 text-outline text-[18px]">bed</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Salles de Bains</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none" type="number" value="5"/>
<span className="material-symbols-outlined absolute right-3 text-outline text-[18px]">shower</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Étage / Niveaux</label>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none" type="text" value="R+2 avec Sous-Sol"/>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Garage Fermé</label>
<div className="relative flex items-center">
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none" type="text" value="4 Véhicules"/>
<span className="material-symbols-outlined absolute right-3 text-outline text-[18px]">directions_car</span>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Statut Mobilier</label>
<div className="relative">
<select className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none appearance-none">
<option value="unfurnished">Non meublé</option>
<option value="semi">Semi-meublé (cuisine intégrée)</option>
<option  value="furnished">Entièrement meublé de luxe</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3.5 pointer-events-none text-outline">expand_more</span>
</div>
</div>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-amenities">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">auto_awesome</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">5. Équipements Clés &amp; Autonomie Technique</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Infrastructures d'autonomie et prestations de prestige adaptées au contexte algérien.</p>
</div>
</div>
<span className="px-2.5 py-1 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-semibold">9 Équipements cochés</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">water_drop</span>
<span>Bâche à eau &amp; Surpresseur</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Capacité 15 000 Litres avec filtration UV continue</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">bolt</span>
<span>Groupe Électrogène Insonorisé</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Bascule automatique 40 kVA silencieux</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">mode_fan</span>
<span>Climatisation Gainable VRV</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Thermostat zoné indépendant par suite</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">heat_pump</span>
<span>Chauffage au Sol Intégral</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Chaudière Viessmann sous marbre Thassos</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">pool</span>
<span>Piscine à Débordement</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Bassin miroir chauffé au sel avec plage teck</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">elevator</span>
<span>Ascenseur Privatif Vitré</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Desserte R-1 à R+2 avec code d'accès</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">hub</span>
<span>Domotique KNX &amp; Fibre</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Gestion scénarii lumières et volets roulants</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">videocam</span>
<span>Poste Sécurité &amp; CCTV 4K</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Guérite blindée et 12 caméras périphériques</span>
</div>
</label>

<label className="p-4 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all cursor-pointer flex items-start gap-3 has-[:defaultChecked]:bg-surface-container-high/60">
<input checked="" className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary/40" type="checkbox"/>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">spa</span>
<span>Hammam Traditionnel &amp; Sauna</span>
</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Marbre d'Italie et boiserie cèdre nordique</span>
</div>
</label>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-description">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">edit_note</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">6. Descriptif Éditorial Bilingue</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Présentation narrative pour ambassades, multinationales et investisseurs.</p>
</div>
</div>

<div className="flex items-center p-1 rounded bg-surface-container">
<button className="px-3.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface font-semibold shadow-xs" type="button">Français</button>
<button className="px-3.5 py-1 rounded font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface" type="button">العربية (Arabe)</button>
</div>
</div>

<div className="flex items-center gap-1 p-2 rounded-t bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">format_bold</span></button>
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">format_italic</span></button>
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">format_underlined</span></button>
<div className="w-px h-4 bg-outline-variant mx-1"></div>
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">format_list_bulleted</span></button>
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">format_quote</span></button>
<div className="w-px h-4 bg-outline-variant mx-1"></div>
<button className="p-1.5 rounded hover:bg-surface-container hover:text-on-surface" type="button"><span className="material-symbols-outlined text-[18px]">link</span></button>
<span className="ml-auto font-label-sm text-label-sm text-outline">Optimisé SEO Immobilier de Luxe</span>
</div>
<textarea className="w-full p-4 rounded-b bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none leading-relaxed transition-all" rows="7">Située au sein du quadrant le plus sécurisé et prisé de Hydra, cette propriété d'exception déploie une architecture contemporaine épurée, mariant baies vitrées toute hauteur et lignes méditerranéennes intemporelles. 

Développant 540 m² d'espaces habitables sur une parcelle arborée de 720 m², elle offre une triple réception baignée de lumière ouvrant de plain-pied sur une terrasse en teck et sa piscine à débordement. 

La suite parentale magistrale dispose de son double dressing sur-mesure, salle de bains en marbre Thassos et terrasse privative sans vis-à-vis. Dépendances complètes pour personnel de maison, poste de garde diplomatique aux normes et autonomie énergétique totale (groupe insonorisé et réserve d'eau de 15 000L).</textarea>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-media">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">photo_library</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">7. Galerie Photographique &amp; Médias 4K</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Intégration directe vers le bucket sécurisé Supabase Storage.</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary font-bold">6 / 20 Photos téléchargées</span>
</div>

<div className="p-8 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-all cursor-pointer flex flex-col items-center justify-center gap-3 text-center">
<div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[32px]">cloud_upload</span>
</div>
<div className="flex flex-col gap-1">
<span className="font-title-lg text-title-lg text-on-surface font-semibold">Glissez-déposez vos photographies haute définition</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Fichiers acceptés : WEBP, JPG, PNG professionnels jusqu'à 25 Mo par cliché</span>
</div>
<button className="mt-2 px-4 py-2 rounded bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors font-label-md text-label-md" type="button">
            Parcourir depuis mon ordinateur
          </button>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Architectural exterior photograph of a luxury modern white villa in Hydra, Algiers with geometric lines, olive trees, reflecting swimming pool under bright Mediterranean sunlight, elegant navy blue sky, high-end architectural digest aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0A3qdv-y71DEnbItD59Kg_QXkZKCBNvtVGP_GfPvWp2ZL6tNnq2u6zEbAM4qV4LhgYTLgQ5bUKBuC-Dyrm0TKqL5P6YHaAJZ7heSGzzoVyGoMN9eAJAwdJIdt883nGDx8lEHiTTSY_V1WF-opMOkqpW6olPQEU9eDygatmk96OnYY4_TuKIae6e4JveVNcI-VGOBff-fAxD73LER50A6fvkeuoYUcJfCFEOuPRBQ6r_D9QVir6lU"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
<span className="material-symbols-outlined text-[14px]">star</span> Couverture
                </span>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">01 • Façade Principale &amp; Piscine</span>
</div>
</div>

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Expansive open-plan living room interior of a luxury penthouse in Algiers, double-height ceilings, contemporary minimalist furniture in sand and navy tones, marble floors, panoramic floor-to-ceiling windows looking out over Mediterranean foliage." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHJ0qQ7H4-IRhSSOM5qVfuM6f8TLS2O6LvHs3Nacrr0w5zzAJzweScMtv4sDrICY-R9Cs4hfr8DKztYrH2dxymVcwez7piosb4OGKgIXJH9L9UERiENasc47YflbB84HAfBkq9KbOgzq4VI_YJ4K8_FcQm5_qYaCVQ-ydFQkXpnkd0N1zepinV04IB0p2kYiIp1w03D0QkNjKTwB_wpFy5YOggenunNt5emH8GFXUeAnA7kiLiH00"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<button className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                  Définir en couverture
                </button>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">02 • Salon Principal de Réception</span>
</div>
</div>

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Opulent master suite bedroom in a luxury Mediterranean residence, king-size bed, warm ambient lighting, discreet gold architectural trim, private balcony overlooking landscaped gardens in Algiers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA63x3h8llpqfliRkC8NQJw2zrIY_Dy8mwApLTtP8yh9yaQ8iZuf0xSETnj_qYzDvRbKusSX0ZvWUhx_h8B5eVXAd3usBcOgePhSX_89fgUtDHS6ClE8LrocncIK5UPcvUj297VtBSJy_aDdBAXvfhErL0SKfP5VGoNdXRvzTw0OwENQzhctW28nL6Kdii6r0C0yzIqV6ESCYvQi7oRktAscHkhqQhUfWJrCOwaVt_WmMG6SR_ZA_0"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<button className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                  Définir en couverture
                </button>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">03 • Master Suite &amp; Balcon</span>
</div>
</div>

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="High-specification designer kitchen featuring Italian quartz countertops, dark navy custom cabinetry, integrated luxury appliances, and warm diffused lighting in an Algerian luxury villa." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbdPS1rbGzjMIMz0TeFoogjiYFYEwInqiU5RuVg2ZRa5OIYy5TSYQy0b5cM_pGt9MLPKSfitoVIkKonR78NCir7X7YcHHq7-HnRJkw1PJc5lOEawKuVR7i7Id2DP8K1gyKYjCwXtS4Mt2WRBgBgmcRfLiwYkJyjjlYZmWf-95OSNWYDD1pEn2j6huNdfodTHRMgGPDRPUzLUPGcMaIufVVgj-zBMexjuSOGCGEd6Sqvc6p9Htmv6s"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<button className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                  Définir en couverture
                </button>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">04 • Cuisine Gastronomique Boffi</span>
</div>
</div>

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Luxury bathroom in polished Greek Thassos marble, standalone soaking bathtub, rain shower fixture in brushed brass, subtle warm lighting in a prestigious residence." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy8qnt_RrW_mVDX8dsCJZ2gJdMX1dXzRlxYQ7m24y0CYFW1RyEjsxHD03kHgqP2AX3-PtKRpxm4s3PkJ7d8_WTDNcphxGRD-QOzIcNuZQvtyKpiJOTSh58hXDGA6W6DvlN11T_ybOw0bLznKldLhNuDMy2iG1MJEpTQaJxhNFQ6bzIO1w-_e7amT0e4218eenlBU0JJJzjS7nGcz9blHO-toWcosrmDzEm4z4Vgs0msw8NcCSNl5c"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<button className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                  Définir en couverture
                </button>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">05 • Salle de Bain Marbre</span>
</div>
</div>

<div className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
<img className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Private authentic luxury hammam with vaulted ceiling, traditional Algerian zellige tilework combined with modern black marble slabs and gentle steam atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuARESn08mON9keVcsxS9dmXNYAXj5r2vGQqjCX317myeHZPLkJTarf4rBUSN2Sn0VcY2oGgd6xOL2DgDlwJl9jU9ia8_iYsJx9tyBhb-aLamUyrkBs3FeI-YQ93r7cpNyBOE5sey_a2ThL6S0EaYOpBSmeF44ZQ-KdWT7uA_0eEzCygNof573sRHB7KrvzODsy-0P5nVt3Q-PCX0-yshunAwYZv6o3718AgbOcmoxuK3cQStPBaCaA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
<div className="flex items-center justify-between">
<button className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors" type="button">
                  Définir en couverture
                </button>
<button className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors" type="button">
<span className="material-symbols-outlined text-[16px]">delete</span>
</button>
</div>
<span className="font-label-sm text-label-sm text-surface-container-lowest">06 • Espace Spa &amp; Hammam</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-3">
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">view_in_ar</span>
<span>Visite Virtuelle 3D Immersion (Matterport URL)</span>
</label>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none" placeholder="https://my.matterport.com/show/?m=primehouse-hydra92" type="url"/>
</div>
<div className="flex flex-col gap-2">
<label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center gap-1.5">
<span className="material-symbols-outlined text-secondary text-[18px]">videocam</span>
<span>Vidéo Panoramique Drone 4K (YouTube / Vimeo)</span>
</label>
<input className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none" placeholder="https://vimeo.com/primehouse/hydra-presidential-villa" type="url"/>
</div>
</div>
</section>

<section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-legal">
<div className="flex items-center justify-between pb-4">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[22px]">policy</span>
</div>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">8. Conformité Juridique &amp; Audit Foncier</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Certification des actes notariés et documents cadastraux en Algérie.</p>
</div>
</div>
<span className="px-2.5 py-1 rounded bg-secondary-fixed/40 text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">Accréditation Notariée</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
<label className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">history_edu</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Acte Notarié Individuel</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Enregistré auprès de l'étude notariée</span>
</div>
</div>
<input checked="" className="w-5 h-5 rounded text-secondary focus:ring-secondary" type="checkbox"/>
</label>
<label className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">badge</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Livret Foncier Délivré</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Conservation foncière de Bir Mourad Raïs</span>
</div>
</div>
<input checked="" className="w-5 h-5 rounded text-secondary focus:ring-secondary" type="checkbox"/>
</label>
<label className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Certificat de Conformité</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Validation urbanisme APC délivrée</span>
</div>
</div>
<input checked="" className="w-5 h-5 rounded text-secondary focus:ring-secondary" type="checkbox"/>
</label>
<label className="p-4 rounded-lg bg-surface-container-low flex items-center justify-between cursor-pointer">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-secondary text-[22px]">apartment</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Permis de Construire Conforme</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Plans d'architecte déposés</span>
</div>
</div>
<input checked="" className="w-5 h-5 rounded text-secondary focus:ring-secondary" type="checkbox"/>
</label>
</div>

<div className="p-5 rounded-lg bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-primary-container text-on-primary flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">lock_clock</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface">Coffre-fort Numérique des Titres de Propriété</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Actes stockés avec chiffrement AES-256. Strictement inaccessible au public.</span>
</div>
</div>
<button className="px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md whitespace-nowrap" type="button">
            Téléverser l'acte (PDF sécurisé)
          </button>
</div>
</section>

<div className="p-6 rounded-xl bg-primary-container text-on-primary shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
<div className="flex items-center gap-3">
<span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-surface-container-lowest">Statut : Prêt pour publication</span>
<span className="font-body-sm text-body-sm text-surface-variant">Dernière sauvegarde automatique il y a 2 minutes</span>
</div>
</div>
<div className="flex items-center gap-3 w-full sm:w-auto justify-end">
<button className="px-4 py-2.5 rounded bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-label-md text-label-md transition-colors" type="button">
            Annuler
          </button>
<button className="px-5 py-2.5 rounded bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-container-lowest font-label-md text-label-md transition-colors" type="button">
            Enregistrer en brouillon
          </button>
<button className="px-6 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md font-semibold transition-all shadow-md flex items-center gap-2" type="button">
<span className="material-symbols-outlined text-[18px]">publish</span>
<span>Publier sur Prime House</span>
</button>
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
