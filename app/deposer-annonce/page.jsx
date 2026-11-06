'use client';

import { Suspense, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer, { showToast } from '@/components/Toast';
import { primeStorage } from '@/lib/storage';
import { ALL_WILAYAS } from '@/lib/data';

function PageContent() {
  useEffect(() => {
    // Synchronize favorite icons on mount
    const favs = primeStorage.getFavorites();
    favs.forEach(id => {
      const btns = document.querySelectorAll(`[data-fav-id="${id}"]`);
      btns.forEach(btn => {
        const icon = btn.querySelector('.material-symbols-outlined') || btn;
        icon.textContent = 'favorite';
        btn.classList.add('text-error');
      });
    });

    const handleFavClick = (e) => {
      const btn = e.target.closest('[data-fav-id]');
      if (!btn) return;
      e.preventDefault();
      const id = btn.getAttribute('data-fav-id');
      const added = primeStorage.toggleFavorite(id);
      const icon = btn.querySelector('.material-symbols-outlined') || btn;
      if (added) {
        icon.textContent = 'favorite';
        btn.classList.add('text-error');
        showToast('Propriété ajoutée à vos favoris', 'success');
      } else {
        icon.textContent = 'favorite_border';
        btn.classList.remove('text-error');
        showToast('Propriété retirée de vos favoris', 'info');
      }
    };

    document.addEventListener('click', handleFavClick);
    return () => document.removeEventListener('click', handleFavClick);
  }, []);

  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
<div className="relative w-full overflow-hidden bg-primary-container text-surface">
<div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-surface-variant/5 blur-2xl pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg pb-space-xl relative z-10">
<nav aria-label="Fil d'Ariane" className="flex items-center gap-space-xs text-on-primary-container font-label-sm text-label-sm tracking-widest uppercase mb-space-md">
<a className="hover:text-surface transition-colors" href="/">Accueil</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="hover:text-surface transition-colors">Espace Propriétaire</span>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-secondary-fixed font-semibold">Déposer une annonce</span>
</nav>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
<div className="lg:col-span-8 flex flex-col gap-space-xs">
<span className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-secondary-fixed font-label-md text-label-md tracking-widest uppercase w-fit">
<span className="material-symbols-outlined text-sm">verified_user</span> Mandat &amp; Diffusion Sécurisée
          </span>
<h1 className="font-headline-xl text-headline-xl text-surface font-semibold tracking-tight mt-space-xs">
            Déposer votre bien d’exception
          </h1>
<p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mt-space-xs leading-relaxed">
            Confiez la vente ou la location de votre patrimoine aux experts Prime House. Diffusion ciblée auprès d'une clientèle qualifiée et sécurisation juridique complète sous contrôle notarié.
          </p>
</div>
<div className="lg:col-span-4 flex lg:justify-end">
<div className="bg-surface-container-lowest/10 backdrop-blur-md p-space-md rounded-xl flex items-center gap-space-md w-full sm:w-auto shadow-sm">
<div className="w-12 h-12 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-headline-sm">gavel</span>
</div>
<div>
<p className="font-label-sm text-label-sm uppercase tracking-wider text-secondary-fixed font-semibold">Cellule Notariée</p>
<p className="font-body-sm text-body-sm text-surface font-medium">Contrôle de conformité sous 24h</p>
</div>
</div>
</div>
</div>
</div>
</div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg -mt-6 relative z-20 w-full mb-space-xl">
<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-sm sm:p-space-md overflow-x-auto">
<div className="flex items-center justify-between min-w-[680px]">
<div className="flex items-center gap-space-sm group cursor-pointer">
<span className="w-8 h-8 rounded-full bg-primary-container text-surface flex items-center justify-center font-label-md text-label-md font-bold">1</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Typologie</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">Type &amp; Mandat</span>
</div>
</div>
<div className="h-0.5 flex-1 mx-space-sm bg-surface-container-high"></div>
<div className="flex items-center gap-space-sm group cursor-pointer">
<span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-semibold">2</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-medium text-on-surface-variant">Localisation</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Wilaya &amp; Valeur</span>
</div>
</div>
<div className="h-0.5 flex-1 mx-space-sm bg-surface-container-high"></div>
<div className="flex items-center gap-space-sm group cursor-pointer">
<span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-semibold">3</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-medium text-on-surface-variant">Prestations</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Surfaces &amp; Équipements</span>
</div>
</div>
<div className="h-0.5 flex-1 mx-space-sm bg-surface-container-high"></div>
<div className="flex items-center gap-space-sm group cursor-pointer">
<span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-semibold">4</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-medium text-on-surface-variant">Galerie &amp; Actes</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Visuels &amp; Livret</span>
</div>
</div>
<div className="h-0.5 flex-1 mx-space-sm bg-surface-container-high"></div>
<div className="flex items-center gap-space-sm group cursor-pointer">
<span className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-label-md text-label-md font-semibold">5</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-medium text-on-surface-variant">Validation</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Coordonnées</span>
</div>
</div>
</div>
</div>
</div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pb-space-xl w-full">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
<form className="lg:col-span-8 flex flex-col gap-space-lg" id="submission-form">
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">01</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Nature de la Transaction &amp; Typologie</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Définissez le cadre commercial de votre bien de prestige</p>
</div>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Requis</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Mode de transaction</label>
<div className="grid grid-cols-2 gap-space-md" role="radiogroup">
<label className="relative flex items-center justify-center gap-space-sm p-space-md rounded-lg cursor-pointer bg-primary-container text-surface shadow-sm font-label-lg text-label-lg tracking-wide transition-all">
<input checked="" className="sr-only" name="transaction_type" type="radio" value="vente"/>
<span className="material-symbols-outlined text-secondary-fixed">real_estate_agent</span>
<span>À VENDRE</span>
</label>
<label className="relative flex items-center justify-center gap-space-sm p-space-md rounded-lg cursor-pointer bg-surface-container-low text-on-surface hover:bg-surface-container transition-all font-label-lg text-label-lg tracking-wide">
<input className="sr-only" name="transaction_type" type="radio" value="location"/>
<span className="material-symbols-outlined">key</span>
<span>À LOUER</span>
</label>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Catégorie architecturale</label>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-space-sm">
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex flex-col gap-space-xs relative group shadow-sm">
<input checked="" className="sr-only" name="property_type" type="radio" value="duplex"/>
<span className="material-symbols-outlined text-headline-md text-secondary">apartment</span>
<span className="font-title-md text-title-md font-semibold text-on-surface mt-space-xs">Appartement / Duplex</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Penthouse, triplex de maître</span>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex flex-col gap-space-xs relative group shadow-sm">
<input className="sr-only" name="property_type" type="radio" value="villa"/>
<span className="material-symbols-outlined text-headline-md text-secondary">villa</span>
<span className="font-title-md text-title-md font-semibold text-on-surface mt-space-xs">Villa d'Architecte</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Demeure contemporaine, vue mer</span>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex flex-col gap-space-xs relative group shadow-sm">
<input className="sr-only" name="property_type" type="radio" value="riad"/>
<span className="material-symbols-outlined text-headline-md text-secondary">home_pin</span>
<span className="font-title-md text-title-md font-semibold text-on-surface mt-space-xs">Maison / Riad</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Style néo-mauresque, patio</span>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex flex-col gap-space-xs relative group shadow-sm">
<input className="sr-only" name="property_type" type="radio" value="terrain"/>
<span className="material-symbols-outlined text-headline-md text-secondary">landscape</span>
<span className="font-title-md text-title-md font-semibold text-on-surface mt-space-xs">Terrain constructible</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Parcelle viabilisée, investissement</span>
</label>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">02</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Présentation &amp; Statut du Mandat</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Rédigez une accroche valorisante pour attirer des acquéreurs de premier ordre</p>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Titre de l'annonce d'exception *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-all" placeholder="Ex: Somptueuse Villa Contemporaine avec Piscine à Débordement - Hydra" required="" type="text"/>
</div>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface font-semibold">Description détaillée de la propriété *</label>
<span className="font-label-sm text-label-sm text-on-surface-variant">Minimum 150 caractères</span>
</div>
<textarea className="w-full p-space-md rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:bg-surface-container-low transition-all" placeholder="Décrivez les atouts majeurs : finitions marbre, orientations lumineuses, sécurité diplomatique, dépendances pour le personnel..." required="" rows="5"></textarea>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Régime de commercialisation</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex items-start gap-space-sm">
<input checked="" className="mt-1" name="mandat_type" type="radio" value="exclusif"/>
<div>
<div className="flex items-center gap-space-xs">
<span className="font-title-md text-title-md font-semibold text-on-surface">Mandat Exclusif Prime House</span>
<span className="px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">Privilège</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Visite virtuelle 3D offerte, parution prioritaire au Cercle Privé et shooting architectural pro.</p>
</div>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex items-start gap-space-sm">
<input className="mt-1" name="mandat_type" type="radio" value="simple"/>
<div>
<span className="font-title-md text-title-md font-semibold text-on-surface">Mandat Simple de Diffusion</span>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Publication au catalogue national après validation par nos courtiers partenaires.</p>
</div>
</label>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">03</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Localisation Stratégique en Algérie</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">L'adresse exacte restera strictement confidentielle jusqu'à accord de visite</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Wilaya *</label>
<select className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" required="">
{ALL_WILAYAS.map((w) => (
  <option key={`depot-wilaya-${w.code}`} value={w.code}>
    {w.code} - {w.name}
  </option>
))}
</select>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Commune ou Quartier de prestige *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none" placeholder="Ex: Hydra, El Biar, Sidi Yahia, Ain El Turk..." required="" type="text"/>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Repère cadastral ou proximité notable</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none" placeholder="Ex: À 2 minutes des représentations diplomatiques, angle Boulevard du 11 Décembre..." type="text"/>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
<span className="material-symbols-outlined text-sm text-secondary">lock</span>
              Ces repères sont réservés à l'usage interne de vérification cadastrale.
            </span>
</div>
<div className="w-full h-44 rounded-xl overflow-hidden relative shadow-sm" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAZyR9Vax98krICr6tAXrKZpXzgfB0YKzznT2zBW-7hy2Pzj2Y7kHVCpYSPqcq1XrCquv1f9PqlZQJuUPy72AGEFKe5bVPqHosC2E_bH55FNsD2bfNELiKoKnT18Oe51e9iH6HEwa0E1hQwjjSijnTv2UR9Jgvn5R-4XgMAUrlOL_Vzs7XHn5eteVJispaJ_C5v4lQYTew06ax2adBcxBRRsxOXYx-KFyfOSTrLP5gmAhKzQU0zD-w')" }}>
<div className="absolute inset-0 bg-primary-container/40 backdrop-blur-[1px] flex items-center justify-center p-space-md text-center">
<div className="bg-surface-container-lowest/90 backdrop-blur-md px-space-lg py-space-sm rounded-lg shadow-sm flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary">pin_drop</span>
<span className="font-label-md text-label-md text-on-surface font-semibold uppercase tracking-wider">Périmètre confidentiel actif : Alger &amp; Rayon métropolitain</span>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">04</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Conditions Financières &amp; Facilités</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Valeur nette en Dinars Algériens (DA)</p>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Prix de présentation souhaité (DA) *</label>
<div className="relative">
<input className="w-full pl-space-md pr-16 py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-currency-display text-currency-display font-bold shadow-sm focus:outline-none" placeholder="185 000 000" required="" type="text"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-md text-label-md text-secondary font-bold">DA</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Exprimé en Dinars Algériens (net vendeur)</span>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Charges mensuelles estimées (Optionnel)</label>
<div className="relative">
<input className="w-full pl-space-md pr-16 py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="35 000" type="text"/>
<span className="absolute right-4 top-1/2 -translate-y-1/2 font-label-md text-label-md text-outline font-semibold">DA / mois</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Entretien parties communes, gardiennage</span>
</div>
</div>
<div className="p-space-md rounded-lg bg-surface-container-low flex items-center justify-between flex-wrap gap-space-sm">
<div className="flex items-center gap-space-sm">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" id="credit_eligibility" type="checkbox"/>
<label className="font-label-lg text-label-lg text-on-surface font-medium cursor-pointer" htmlFor="credit_eligibility">
                Propriété éligible au financement bancaire / Crédit islamique
              </label>
</div>
<span className="font-label-sm text-label-sm px-space-sm py-space-xs rounded bg-surface-container-lowest text-on-surface-variant font-semibold">
              Livret Foncier Disponible
            </span>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">05</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Spécifications Architecturales &amp; Volumes</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Données physiques certifiées</p>
</div>
</div>
<div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Surface Totale (m²) *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="620" required="" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Surface Habitable (m²)</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="450" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Nombre de Pièces *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="8" required="" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Suites / Chambres *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="5" required="" type="number"/>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Salles de bain &amp; d'eau</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="4" type="number"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Étage / Niveau</label>
<select className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none">
<option>Rez-de-chaussée + 2 (R+2)</option>
<option>Rez-de-chaussée + 1 (R+1)</option>
<option>R+3 avec ascenseur</option>
<option>Dernier étage / Penthouse</option>
<option>Plain-pied</option>
</select>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Capacité Stationnement</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="Garage fermé 3 véhicules" type="text"/>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">06</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Équipements de Standing &amp; Autonomie</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Cochez les aménagements exclusifs renforçant l'attractivité du bien</p>
</div>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-md">
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input checked="" className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">water_drop</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Bâche à eau &amp; surpresseur</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input checked="" className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">power</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Groupe électrogène</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input checked="" className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">pool</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Piscine chauffée / miroir</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">mode_fan</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Climatisation VRV centralisée</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">smart_toy</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Domotique intégrée (Lutron/KNX)</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input checked="" className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">shield</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Guérite &amp; Gardiennage 24/7</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">tsunami</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Vue panoramique mer / baie</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">weekend</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Mobilier haute couture italien</span>
</div>
</label>
<label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
<input className="w-5 h-5 rounded cursor-pointer accent-secondary" type="checkbox"/>
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">spa</span>
<span className="font-body-sm text-body-sm font-semibold text-on-surface">Espace Hammam / Sauna</span>
</div>
</label>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">07</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Galerie Photographique &amp; Documents Notariés</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Photos d'architecture haute résolution et preuves de propriété</p>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Photographies du bien (Minimum 5 visuels requis) *</label>
<div className="bg-surface-container-low rounded-xl p-space-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container transition-all">
<div className="w-16 h-16 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm mb-space-sm">
<span className="material-symbols-outlined text-headline-md">add_photo_alternate</span>
</div>
<p className="font-title-md text-title-md text-on-surface font-semibold">Glissez et déposez vos photographies ici</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-md">Formats acceptés : JPG, WEBP, PNG haute définition jusqu'à 25 Mo par fichier. Ratio recommandé 16:9.</p>
<button className="mt-space-md px-space-lg py-space-sm rounded-lg bg-primary-container text-surface font-label-md text-label-md uppercase tracking-wider font-semibold hover:bg-on-surface transition-colors shadow-sm" type="button">
                Parcourir les fichiers
              </button>
</div>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
<div className="relative h-28 rounded-lg overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Luxurious architectural villa facade in Algiers with white cantilever walls, Mediterranean palm trees and sunny afternoon sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwWRp5f1Koi2n--IU1oflP7Ju8M8FTjFPoWpLEZve0BUEcVZJ-Fwc7IaW8-qSG1jKTN5opzndEATW_6FWstiYayGsJhqNf7CQ0dJck9YjeW7YpH0DN-FACVWJddkYrIXZ4tj8e4QwxRU8vCEDO0w2ExMg2Tseegq6IiUXUHh2V7iUQORS2wlAstrVdFP8fP7Oqn6makGH5LCv-F_f7z4GyzxPF4gMV4chqUqwi0BjTVtWg8F-B0BI"/>
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary-container/80 text-surface text-label-sm font-semibold">Façade</span>
<button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary-container/70 text-surface flex items-center justify-center hover:bg-error transition-colors" type="button">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<div className="relative h-28 rounded-lg overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Expansive luxury living room with double-height ceiling, Italian marble flooring, beige designer sofas and sea view floor-to-ceiling windows." src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-sCv_QKG3wfBrjUDYEpcdX73gxk5nT-iKOqFCUZIei21Gm7TS9Ajcek8FryPtSIKVk9XW7JZiObf7mMk3BfVn74GffNcq-6rj_4F31u_AGsTNjdFGq9Ps0YmuNBo6sXlsctsh73zto7x8GGnMwjcR48B2HpvBh-e-1KLc4zvbfJh0lcpYnM55mvQPpdpVSb4VIamb7iAXpbhHr3s0C8lPvywt6x3uEPCaFw1s3VVXCGhsLN88BW4"/>
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary-container/80 text-surface text-label-sm font-semibold">Séjour</span>
<button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary-container/70 text-surface flex items-center justify-center hover:bg-error transition-colors" type="button">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<div className="relative h-28 rounded-lg overflow-hidden shadow-sm group">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-alt="Modern private infinity pool with turquoise water overlooking the Bay of Algiers and green coastal hills at twilight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAus7wtJuyJ-IuPxH1e0aoU8B7Q4zgL9sXKBQZfhx5se9m56NGgRJWk5o1_705CKZUoRWMq0TIF44FeQfUAWHvlUAdTrAT-gXPLdOS2-n6S-wLKnEs4JPAMiyJVwFKYLWYq36KXGGu34zICXlTwOa3KWhVh2BMgYXS5fa81Ai2fkZRUNJcl_iBxGmQTp_MjeLxYseL1c9jXw7IggKJyLJxPLaBMFhAnPI5WVtmaaBVjP_rnFXqPIA8"/>
<span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-primary-container/80 text-surface text-label-sm font-semibold">Piscine</span>
<button className="absolute top-1 right-1 w-6 h-6 rounded-full bg-primary-container/70 text-surface flex items-center justify-center hover:bg-error transition-colors" type="button">
<span className="material-symbols-outlined text-xs">close</span>
</button>
</div>
<div className="h-28 rounded-lg bg-surface-container flex flex-col items-center justify-center text-center p-space-xs cursor-pointer hover:bg-surface-variant transition-colors">
<span className="material-symbols-outlined text-secondary">add_circle</span>
<span className="font-label-sm text-label-sm text-on-surface font-semibold mt-1">+2 photos requises</span>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-low flex flex-col gap-space-md">
<div className="flex items-start justify-between">
<div>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Pièces Justificatives (Accréditation Rapide)</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">L'ajout de l'acte notarié ou du livret foncier accélère la mise en ligne sous 12h</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold uppercase">Confidentiel</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary">description</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Acte Notarié Déposé</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">PDF jusqu'à 15 Mo</span>
</div>
</div>
<button className="font-label-md text-label-md text-secondary font-bold hover:underline" type="button">Ajouter</button>
</div>
<div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary">menu_book</span>
<div className="flex flex-col">
<span className="font-label-md text-label-md text-on-surface font-semibold">Livret Foncier Individuel</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Scan couleur ou PDF</span>
</div>
</div>
<button className="font-label-md text-label-md text-secondary font-bold hover:underline" type="button">Ajouter</button>
</div>
</div>
</div>
</section>
<section className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm flex flex-col gap-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary-container font-headline-sm">08</span>
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">Coordonnées de l'Annonceur Privé</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Interlocuteur direct pour les visites et les offres d'acquisition</p>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Vous êtes :</label>
<div className="grid grid-cols-2 gap-space-md">
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex items-center gap-space-sm">
<input checked="" className="accent-secondary" name="seller_status" type="radio" value="particulier"/>
<span className="font-title-md text-title-md text-on-surface font-semibold">Propriétaire Particulier</span>
</label>
<label className="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-all flex items-center gap-space-sm">
<input className="accent-secondary" name="seller_status" type="radio" value="agence"/>
<span className="font-title-md text-title-md text-on-surface font-semibold">Agence Immobilière Agréée</span>
</label>
</div>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Nom &amp; Prénom *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="Dr. Karim Benali" required="" type="text"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Téléphone (+213) *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="+213 550 12 34 56" required="" type="tel"/>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface font-semibold">Courriel direct *</label>
<input className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none" placeholder="k.benali@prestige-invest.dz" required="" type="email"/>
</div>
</div>
<div className="flex items-start gap-space-sm mt-space-xs">
<input className="mt-1 w-5 h-5 rounded cursor-pointer accent-secondary" id="privacy_agree" required="" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="privacy_agree">
              J'autorise Prime House à effectuer les démarches préalables de qualification et atteste sur l'honneur être en pleine possession des droits d'aliénation ou de bail sur ce bien immobilier.
            </label>
</div>
</section>
<div className="flex flex-col sm:flex-row items-center justify-end gap-space-md pt-space-md">
<button className="w-full sm:w-auto px-space-xl py-space-md rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold hover:bg-surface-variant transition-all" type="button">
            Aperçu de l'annonce
          </button>
<button className="w-full sm:w-auto px-space-xl py-space-md rounded-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg font-bold tracking-wide transition-all shadow-md flex items-center justify-center gap-space-sm hover:-translate-y-0.5" type="submit">
<span className="material-symbols-outlined text-title-md">verified</span>
<span>Soumettre pour modération</span>
</button>
</div>
</form>
<aside className="lg:col-span-4 flex flex-col gap-space-lg sticky top-24">
<div className="bg-primary-container text-surface rounded-xl p-space-lg shadow-xl relative overflow-hidden">
<div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-container/10 pointer-events-none"></div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/15 text-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest font-semibold inline-block mb-space-sm">
            Engagement Prime House
          </span>
<h3 className="font-headline-md text-headline-md font-semibold leading-tight">Diffusion Sélective &amp; Clientes Qualifiées</h3>
<div className="flex flex-col gap-space-md mt-space-md">
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary-fixed mt-1">workspace_premium</span>
<div>
<p className="font-title-md text-title-md font-semibold text-surface">Cercle Privé Off-Market</p>
<p className="font-body-sm text-body-sm text-on-primary-container mt-0.5">Présentation prioritaire aux ambassades, directeurs généraux et investisseurs certifiés.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary-fixed mt-1">security</span>
<div>
<p className="font-title-md text-title-md font-semibold text-surface">Filtrage Pré-visite Rigoureux</p>
<p className="font-body-sm text-body-sm text-on-primary-container mt-0.5">Vérification de la solvabilité financière avant toute inspection sur site.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary-fixed mt-1">balance</span>
<div>
<p className="font-title-md text-title-md font-semibold text-surface">Accompagnement Notarié</p>
<p className="font-body-sm text-body-sm text-on-primary-container mt-0.5">Rédaction du compromis et enregistrement auprès des bureaux de la Conservation Foncière.</p>
</div>
</div>
</div>
<div className="mt-space-lg pt-space-md bg-surface-container-lowest/5 rounded-lg p-space-md">
<p className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Conseiller Référent Vente</p>
<div className="flex items-center gap-space-sm mt-space-sm">
<img className="w-12 h-12 rounded-full object-cover shadow-sm" data-alt="Portrait of an experienced Algerian luxury real estate director in formal suit inside a sunlit marble office." src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4PWuk7ptAb2qbn7d-x7HdDNJPj945UX8y6FxsJCaCSfiw8r_H0FWisrmO2oMxXT-BPjNTVtdCHTVvyplw6QBjvJJsiRzrNpLosa-PCjNz2MZNHlmg_5qETwhUIidtnZCyuVhvnv9B5ulyA8gzOPnjBMvyvbm7tsk8WvFWlQC4WOrjmmKFcmTA3b0PARScmGJph9E8JBClA53ZIyc6xnLkHMGv6N1AySmPe0bSD2iNE9bID5Jwnt8"/>
<div>
<p className="font-title-md text-title-md font-bold text-surface">Yacine Mebarki</p>
<p className="font-body-sm text-body-sm text-on-primary-container">Directeur des Mandats Privés</p>
</div>
</div>
<a className="mt-space-md w-full py-space-xs rounded bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-space-xs transition-colors" href="tel:+21323456789">
<span className="material-symbols-outlined text-sm">phone_in_talk</span>
<span>Ligne Directe +213 (0) 23 45 67 89</span>
</a>
</div>
</div>
<div className="bg-surface-container-low rounded-xl p-space-lg shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center gap-space-xs text-secondary font-semibold">
<span className="material-symbols-outlined">schedule</span>
<span className="font-label-md text-label-md uppercase tracking-wider">Délai moyen d'approbation</span>
</div>
<p className="font-headline-sm text-headline-sm text-on-surface font-bold">Sous 24 heures ouvrées</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Chaque dossier est inspecté physiquement par nos délégués régionaux sur Alger, Oran et Constantine pour vérifier l'exactitude des commodités déclarées.
          </p>
</div>
</aside>
</div>
</div>
<div className="fixed inset-0 z-50 bg-primary-container/80 backdrop-blur-md hidden items-center justify-center p-margin" id="success-modal">
<div className="bg-surface-container-lowest rounded-xl max-w-lg w-full p-space-xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden animate-in fade-in zoom-in duration-200">
<div className="w-20 h-20 rounded-full bg-secondary-container/20 text-secondary flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-display-mobile">verified_user</span>
</div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold mb-space-xs">Dépôt Enregistré</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Votre annonce est en cours de modération</h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-sm leading-relaxed">
        Votre bien a été transmis avec succès à notre cellule juridique. Conformément à nos engagements de prestige, un contrôle notarié sera finalisé sous 24h avant sa publication officielle sur nos canaux exclusifs.
      </p>
<div className="w-full bg-surface-container-low p-space-md rounded-lg my-space-md text-left flex flex-col gap-space-xs">
<div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
<span>Numéro de dossier :</span>
<span className="font-bold text-secondary">PH-DZ-2025-8941</span>
</div>
<div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
<span>Juriste instructeur :</span>
<span className="font-semibold">Me. L. Chahed (Cour d'Alger)</span>
</div>
</div>
<button className="w-full py-space-md bg-primary-container text-surface hover:bg-on-surface font-label-lg text-label-lg font-bold rounded-lg transition-colors" id="close-modal-btn" type="button">
        Retour à l'espace propriétaire
      </button>
</div>
</div>

</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function deposer_annoncePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
