'use client';

import Link from 'next/link';
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

<style dangerouslySetInnerHTML={{ __html: `
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    .card-transition { transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
  ` }} />

<section className="w-full bg-surface-container-low px-margin md:px-margin-md lg:px-margin-lg py-space-md border-b border-surface-container">
<div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
<nav aria-label="Fil d'Ariane" className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
<a className="hover:text-secondary transition-colors" data-path="accueil" href="/">Accueil</a>
<span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
<a className="hover:text-secondary transition-colors" data-path="nos-biens" href="/biens">Nos Biens</a>
<span className="material-symbols-outlined text-xs text-outline">chevron_right</span>
<span className="text-on-surface font-semibold">Recherche &amp; Catalogue</span>
</nav>
<div className="flex items-center gap-space-sm">
<span className="inline-flex items-center gap-1.5 px-space-sm py-0.5 rounded-full bg-surface-container-lowest text-secondary font-label-sm text-label-sm shadow-sm">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
          Offres vérifiées en temps réel
        </span>
<span className="font-body-sm text-body-sm text-on-surface-variant hidden lg:inline">Barème notarié &amp; Actes authentiques garantis</span>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)] px-margin md:px-margin-md lg:px-margin-lg py-space-lg">
<div className="max-w-[1440px] mx-auto flex flex-col gap-space-md">

<div className="bg-surface-container-low p-space-xs md:p-space-sm rounded-xl shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-space-xs">

<div className="flex-1 flex items-center bg-surface-container-lowest rounded-lg px-space-md py-space-sm shadow-xs">
<span className="material-symbols-outlined text-secondary mr-space-sm text-title-lg">search</span>
<input className="w-full bg-transparent border-none text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none" placeholder="Recherche par mot-clé : Villa Hydra, Penthouse front de mer..." type="text" value="Villa moderne avec piscine"/>
</div>

<div className="flex items-center bg-surface-container-lowest rounded-lg p-1">
<button className="px-space-md py-1.5 rounded bg-primary-container text-surface font-label-md text-label-md font-semibold transition-all shadow-xs" type="button">
            Acheter
          </button>
<button className="px-space-md py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all" type="button">
            Louer
          </button>
</div>

<div className="relative min-w-[200px] flex items-center bg-surface-container-lowest rounded-lg px-space-md py-space-sm shadow-xs">
<span className="material-symbols-outlined text-outline text-title-md mr-space-xs">location_city</span>
<select className="w-full bg-transparent border-none text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer appearance-none pr-space-md">
<option value="all">Toutes les wilayas (69 wilayas)</option>
<option value="alger">16 - Alger (Wilaya)</option>
<option value="oran">31 - Oran (Wilaya)</option>
<option value="constantine">25 - Constantine</option>
<option value="annaba">23 - Annaba</option>
<option value="blida">09 - Blida</option>
<option value="boumerdes">35 - Boumerdès</option>
{ALL_WILAYAS.map((w) => (
  <option key={w.code} value={w.name.toLowerCase()}>
    {w.code} - {w.name}
  </option>
))}
</select>
<span className="material-symbols-outlined text-outline absolute right-3 pointer-events-none text-sm">expand_more</span>
</div>

<div className="relative min-w-[190px] flex items-center bg-surface-container-lowest rounded-lg px-space-md py-space-sm shadow-xs">
<span className="material-symbols-outlined text-outline text-title-md mr-space-xs">home_work</span>
<select className="w-full bg-transparent border-none text-on-surface font-body-md text-body-md focus:outline-none cursor-pointer appearance-none pr-space-md">
<option>Tous les types</option>
<option >Villas &amp; Propriétés</option>
<option>Penthouses &amp; Duplex</option>
<option>Appartements F4/F5</option>
<option>Terrains &amp; Domaines</option>
</select>
<span className="material-symbols-outlined text-outline absolute right-3 pointer-events-none text-sm">expand_more</span>
</div>

<button className="px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded-lg transition-all flex items-center justify-center gap-space-xs shadow-sm hover:shadow" type="button">
<span className="material-symbols-outlined text-title-md">tune</span>
<span>Actualiser</span>
</button>
</div>

<div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md pt-space-xs">

<div className="flex flex-wrap items-center gap-space-sm">
<div className="flex items-center gap-2 pr-space-sm border-r border-surface-container">
<span className="font-headline-sm text-headline-sm text-on-surface font-semibold tracking-tight">48</span>
<span className="font-body-sm text-body-sm text-on-surface-variant font-medium">biens de prestige trouvés</span>
</div>

<div className="flex flex-wrap items-center gap-1.5" id="activeFilterTags">
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary">location_on</span>
              Alger (Wilaya)
              <button className="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
</span>
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary">sell</span>
              Vente
              <button className="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
</span>
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary">bed</span>
              Min. 3 chambres
              <button className="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
</span>
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary">pool</span>
              Piscine
              <button className="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
</span>
<button className="font-label-sm text-label-sm text-secondary hover:underline ml-1" type="button">
              Tout effacer
            </button>
</div>
</div>

<div className="flex items-center gap-space-sm w-full lg:w-auto justify-between lg:justify-end">

<div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span className="font-label-sm text-label-sm text-on-surface-variant hidden sm:inline">Trier par :</span>
<select className="bg-transparent border-none text-on-surface font-label-md text-label-md font-semibold focus:outline-none cursor-pointer pr-space-sm">
<option >Prix : Décroissant</option>
<option>Prix : Croissant</option>
<option>Plus récents</option>
<option>Surface : Décroissante</option>
<option>Exclusivités Prime House</option>
</select>
</div>

<div className="flex items-center bg-surface-container-low p-1 rounded-lg">
<button className="p-1.5 rounded bg-surface-container-lowest text-on-surface shadow-xs transition-colors" title="Vue Grille" type="button">
<span className="material-symbols-outlined text-title-md block">grid_view</span>
</button>
<button className="p-1.5 rounded text-on-surface-variant hover:text-on-surface transition-colors" title="Vue Liste" type="button">
<span className="material-symbols-outlined text-title-md block">view_list</span>
</button>
<button className="p-1.5 rounded text-on-surface-variant hover:text-on-surface transition-colors" title="Vue Carte Interactive" type="button">
<span className="material-symbols-outlined text-title-md block">map</span>
</button>
</div>
</div>
</div>
</div>
</section>

<div className="w-full px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-start gap-gutter-lg">

<aside className="w-full lg:w-[320px] shrink-0 lg:sticky lg:top-24 space-y-space-md">
<form className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_24px_-2px_rgba(7,20,38,0.05)] border border-surface-container flex flex-col gap-space-lg">

<div className="flex items-center justify-between pb-space-xs border-b border-surface-container-low">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-title-lg">tune</span>
<h2 className="font-title-lg text-title-lg text-on-surface font-bold">Filtres Experts</h2>
</div>
<button className="font-label-sm text-label-sm text-on-surface-variant hover:text-secondary transition-colors underline" type="reset">
              Réinitialiser
            </button>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Mode de transaction</label>
<div className="grid grid-cols-2 p-1 bg-surface-container-low rounded-lg gap-1">
<label className="flex items-center justify-center py-2 px-space-sm rounded cursor-pointer transition-all bg-primary-container text-surface shadow-xs font-label-md text-label-md font-semibold">
<input checked="" className="sr-only" name="sidebar_transaction" type="radio" value="vente"/>
                Acheter
              </label>
<label className="flex items-center justify-center py-2 px-space-sm rounded cursor-pointer transition-all hover:bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md font-medium">
<input className="sr-only" name="sidebar_transaction" type="radio" value="location"/>
                Louer
              </label>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Type de Bien</label>
<span className="font-label-sm text-label-sm text-outline">5 catégories</span>
</div>
<div className="space-y-2">
<label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
<div className="flex items-center gap-space-sm">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface font-medium group-hover:text-primary-container">Villas d'Architecte</span>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">18</span>
</label>
<label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
<div className="flex items-center gap-space-sm">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface font-medium group-hover:text-primary-container">Appartements de Maître</span>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">15</span>
</label>
<label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
<div className="flex items-center gap-space-sm">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface font-medium group-hover:text-primary-container">Duplex &amp; Penthouses</span>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">8</span>
</label>
<label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
<div className="flex items-center gap-space-sm">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface font-medium group-hover:text-primary-container">Terrains d'Exception</span>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">5</span>
</label>
<label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-container-low cursor-pointer transition-colors group">
<div className="flex items-center gap-space-sm">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface font-medium group-hover:text-primary-container">Locaux &amp; Sièges Corporate</span>
</div>
<span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-semibold">2</span>
</label>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Wilaya &amp; Commune</label>
<div className="relative">
<select className="w-full bg-surface-container-low rounded-lg px-space-md py-2.5 text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none cursor-pointer">
<option value="all">Toutes les wilayas (69)</option>
<option value="alger">16 - Alger (32 biens)</option>
<option value="oran">31 - Oran (9 biens)</option>
<option value="boumerdes">35 - Boumerdès (4 biens)</option>
<option value="blida">09 - Blida (3 biens)</option>
<option value="annaba">23 - Annaba (2 biens)</option>
<option value="setif">19 - Sétif (2 biens)</option>
{ALL_WILAYAS.map((w) => (
  <option key={`sidebar-${w.code}`} value={w.name.toLowerCase()}>
    {w.code} - {w.name}
  </option>
))}
</select>
<span className="material-symbols-outlined text-outline absolute right-3 top-2.5 pointer-events-none text-sm">unfold_more</span>
</div>

<div className="relative">
<select className="w-full bg-surface-container-lowest border border-surface-container rounded-lg px-space-md py-2.5 text-on-surface font-body-sm text-body-sm focus:outline-none appearance-none cursor-pointer">
<option value="">Toutes les communes d'Alger</option>
<option  value="hydra">Hydra (Résidences diplomatiques)</option>
<option value="elbiar">El Biar (Quartier des Ministères)</option>
<option value="delyibrahim">Dely Ibrahim &amp; Chéraga</option>
<option value="benaknoun">Ben Aknoun</option>
<option value="kouba">Kouba &amp; Golfe</option>
<option value="aintaya">Aïn Taya (Front de Mer)</option>
</select>
<span className="material-symbols-outlined text-outline absolute right-3 top-2.5 pointer-events-none text-sm">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Fourchette de Prix (DA)</label>
<span className="font-label-sm text-label-sm text-secondary font-bold">Dinar Algérien</span>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<div className="bg-surface-container-low p-2 rounded-lg">
<span className="block font-label-sm text-label-sm text-outline">Min</span>
<input className="w-full bg-transparent border-none text-on-surface font-title-md text-title-md font-semibold focus:outline-none" type="text" value="35 000 000 DA"/>
</div>
<div className="bg-surface-container-low p-2 rounded-lg">
<span className="block font-label-sm text-label-sm text-outline">Max</span>
<input className="w-full bg-transparent border-none text-on-surface font-title-md text-title-md font-semibold focus:outline-none" type="text" value="250 000 000 DA"/>
</div>
</div>

<div className="relative pt-2 pb-1">
<div className="w-full h-1.5 bg-surface-container rounded-full relative">
<div className="absolute left-[15%] right-[10%] h-full bg-secondary-container rounded-full"></div>
<div className="absolute left-[15%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-surface-container-lowest shadow-md border-2 border-secondary cursor-grab"></div>
<div className="absolute right-[10%] top-1/2 -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-surface-container-lowest shadow-md border-2 border-secondary cursor-grab"></div>
</div>
</div>
<div className="flex justify-between font-label-sm text-label-sm text-outline">
<span>10M DA</span>
<span>250M+ DA</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Nombre de Chambres</label>
<div className="grid grid-cols-5 gap-1.5">
<button className="py-2 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors" type="button">1</button>
<button className="py-2 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors" type="button">2</button>
<button className="py-2 rounded-lg bg-primary-container text-surface font-label-md text-label-md font-bold shadow-xs" type="button">3</button>
<button className="py-2 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors" type="button">4</button>
<button className="py-2 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors" type="button">5+</button>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Superficie Habitable (m²)</label>
<span className="font-label-sm text-label-sm text-on-surface-variant">180m² à 850m²</span>
</div>
<div className="grid grid-cols-2 gap-2">
<div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span className="font-body-sm text-body-sm text-outline mr-2">Min</span>
<input className="w-full bg-transparent border-none text-on-surface font-body-md text-body-md font-semibold focus:outline-none" type="number" value="180"/>
<span className="text-xs text-outline font-medium">m²</span>
</div>
<div className="flex items-center bg-surface-container-low px-space-sm py-1.5 rounded-lg">
<span className="font-body-sm text-body-sm text-outline mr-2">Max</span>
<input className="w-full bg-transparent border-none text-on-surface font-body-md text-body-md font-semibold focus:outline-none" type="number" value="850"/>
<span className="text-xs text-outline font-medium">m²</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-sm">
<label className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider font-semibold">Prestations Exclusives</label>
<div className="space-y-2">
<label className="flex items-center gap-space-sm cursor-pointer group">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Piscine privée (Int./Ext.)</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Vue Mer panoramique</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Jardin paysager &amp; Terrasse</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Ascenseur privatif</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Garage sécurisé (2+ véhicules)</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Groupe électrogène &amp; Bâche à eau</span>
</label>
<label className="flex items-center gap-space-sm cursor-pointer group">
<input className="w-4 h-4 rounded text-secondary focus:ring-0 accent-secondary" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-secondary transition-colors">Domotique intégrée &amp; Surveillance</span>
</label>
</div>
</div>

<div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-lg">
<span className="font-body-sm text-body-sm text-on-surface font-medium">Meublé haut standing</span>
<label className="relative inline-flex items-center cursor-pointer">
<input className="sr-only peer" type="checkbox"/>
<div className="w-9 h-5 bg-surface-container peer-focus:outline-none rounded-full peer peer-defaultChecked:after:translate-x-full peer-defaultChecked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-defaultChecked:bg-secondary"></div>
</label>
</div>

<div className="pt-space-xs flex flex-col gap-2">
<button className="w-full py-space-sm px-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg font-bold rounded-lg shadow-sm hover:shadow transition-all text-center" type="submit">
              Appliquer les 4 filtres
            </button>
<p className="text-center font-label-sm text-label-sm text-outline">Mise à jour instantanée du catalogue</p>
</div>
</form>

<div className="bg-primary-container text-surface rounded-xl p-space-md shadow-md flex flex-col gap-space-sm">
<div className="flex items-center gap-space-sm">
<img alt="Conseiller Privé Prime House" className="w-12 h-12 rounded-full object-cover ring-2 ring-secondary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDsB1-iK-K1pXg03t_Ww7f4R2jH2U2196e_4D7q6kG4sD9N8j8X4S"/>
<div>
<h4 className="font-title-md text-title-md text-surface font-semibold leading-tight">Yacine Bensalem</h4>
<p className="font-label-sm text-label-sm text-primary-fixed-dim">Responsable Biens Off-Market</p>
</div>
</div>
<p className="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
            Vous ne trouvez pas votre bien idéal ? Nos mandats confidentiels à Hydra et El Biar ne sont pas tous publiés en ligne.
          </p>
<a className="inline-flex items-center justify-center gap-2 px-space-md py-2 bg-surface-container-lowest text-on-surface hover:bg-secondary-container hover:text-on-secondary-container font-label-sm text-label-sm font-bold rounded transition-colors" href="#">
<span className="material-symbols-outlined text-sm text-secondary">chat</span>
            Demande de recherche sur-mesure
          </a>
</div>
</aside>

<main className="flex-1 flex flex-col gap-gutter">

<div id="properties-grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-gutter">

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">

<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Luxurious architectural villa in Hydra Algiers with private swimming pool, marble patio, lush palm garden, Mediterranean golden hour sunlight, minimalist luxury villa with clean geometric lines, large glass walls, Algerian prestige real estate." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIA34DB9pkBDBPhuC8ZyALptTgO2a7A6QSzAf47H8KmJ3dXlCEcNt0fjLgMeIyF2OwSOUWF6-uwGESVy0qMPK1OCRhAuXFeHTETfw2PiZlUMwZAfpP8pHnlD76oFcCGOalNmmTCm0EQISWQH0CAXd4s2Kx8y9eFu_YyzfIKge__6iTAdCBawieZpi3Q34EsLVMLH0HNQcqJbIAA3g0B3r_mKxfIWStnn4diZxQpT-Y4T21OZH1GnM"/>

<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  VENTE EXCLUSIVE
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span>
                  Acte notarié &amp; Livret foncier
                </span>
</div>

<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>

<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">

<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    Hydra • Alger
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-ALG-402</span>
</div>

<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Villa d'architecte avec piscine &amp; spa privatif
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Propriété d'exception située dans une impasse sécurisée d'Hydra. Matériaux nobles, marbre de Carrare, domotique complète et grand jardin paysager sans vis-à-vis.
                </p>
</div>

<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">king_bed</span> 6
                  </span>
<span className="font-label-sm text-label-sm text-outline">Chambres</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">bathtub</span> 5
                  </span>
<span className="font-label-sm text-label-sm text-outline">Salles d'eau</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 620
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² habitables</span>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">165 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">266 129 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-villa-hydra">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">
<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Luxury modern penthouse terrace overlooking the Mediterranean bay in Miramar Oran Algeria, sleek glass railings, contemporary lounge furniture, sunset orange and sea-blue atmospheric lighting, modern luxury architecture." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlhkefmIk55Rzh6yaKa6VMSTyNC2QEgaHfmMXILuBAg82VYnRlZHiVt3BJhBZxXkyDe0ZOpQ_fd9uH6jL5eIhiLUZRch25bg4tXGmiwvdud0kZVTJATLf1GLv5lqAdfKDzKfoxiWzGKMgx42ob_T14OrVdFQlK7Ha2iiy-4vcmHh2QwdRJr7rlghrS3FG0_yBt9xH7_8T20QPjJBqtAQIns_zdr-oKa79QoeapalJ_HhGVxL0899I"/>
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  VENTE
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary-fixed">waves</span>
                  Plein Front de Mer
                </span>
</div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    Miramar • Oran
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-ORN-118</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Penthouse contemporain avec terrasse panoramique
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Dernier étage d'une tour résidentielle sécurisée. Vue imprenable sur la baie d'Oran et Santa Cruz. Ascenseur direct privatif et finitions italiennes haut de gamme.
                </p>
</div>
<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">king_bed</span> 4
                  </span>
<span className="font-label-sm text-label-sm text-outline">Chambres</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">bathtub</span> 3
                  </span>
<span className="font-label-sm text-label-sm text-outline">Salles d'eau</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 380
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² (dont 90m² terr.)</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">92 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">242 105 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-detail?id=ph-ora-205">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">
<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Stately luxury interior duplex apartment in El Biar Algiers, high ceilings, classical moldings blended with sleek modern furniture, warm wooden parquet, chandeliers, spacious living room, golden architectural luxury aesthetics." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXSpL9WVfExDNxFhu0dRld7rDmM8WqYz8RSUgdWqpV9A7kdIZay4HjBXL9HjAFwwUGJlUwKq2kbuPKOprviSoQv4MQdc8zYi_w0pnpgLTeUCufOUWoLLl_wHwFmy67s20uwTMB56ERGjNFh0tH1TC1GrB_XKxKldJ9_mwe7RMz2n30J16Ao0Jayadknk52EBq283iQ9cWfiwrUt2iUys6X9z4i2UzRGtr6ou_l2Q5ptlxoPT2yHmc"/>
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  VENTE
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary-fixed">shield</span>
                  Zone Ambassades
                </span>
</div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    El Biar • Alger
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-ALG-209</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Duplex de maître 5 pièces quartier diplomatique
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Immeuble haussmannien entièrement réhabilité. Double séjour cathédrale, suite parentale de 45m², sécurité 24/7 et deux places de stationnement en sous-sol.
                </p>
</div>
<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">king_bed</span> 4
                  </span>
<span className="font-label-sm text-label-sm text-outline">Chambres</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">bathtub</span> 3
                  </span>
<span className="font-label-sm text-label-sm text-outline">Salles d'eau</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 310
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² habitables</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">78 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">251 612 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-duplex-hydra">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">
<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Grand contemporary private estate in Cheraga Algiers with sprawling landscaped green garden, olive trees, infinity pool, modern glass and limestone facade, bright daylight, luxurious Algerian estate." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBU47PUaHKUELciQvLJhu96mdIv1CSBQVd1p9QuJ6GoxVR8E-DEmgr9t6XmAYmlS06kuixb5f1g8agaQ8flBf79pNJ76EYulCdUkXygM683zUm1MJd8vXj3-ocT_UjYHd4DiBODTn-97akNIf2LoZ9qx4H7Lw26G1Ig48nXAFPnscQF_Vrlk07jw2KuiGfKGIfb1tG1m-MBBVQPeHKvYiusYS0GGhID7ueBdl8GSluhBJzUZKhuJxU"/>
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-xs">
                  COUP DE CŒUR
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-xs text-secondary">park</span>
                  Parc 1800m²
                </span>
</div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    Chéraga • Alger Ouest
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-ALG-505</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Propriété contemporaine avec parc arboré &amp; dépendance
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Havre de tranquillité à 10 minutes des grands axes. Pavillon d'invités séparé, piscine à débordement, bâche d'eau 40 000L et garage fermé pour 4 véhicules.
                </p>
</div>
<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">king_bed</span> 7
                  </span>
<span className="font-label-sm text-label-sm text-outline">Chambres</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">bathtub</span> 6
                  </span>
<span className="font-label-sm text-label-sm text-outline">Salles d'eau</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 540
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² habitables</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">130 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">240 740 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-detail?id=ph-loc-108">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">
<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Waterfront luxury Mediterranean villa in Les Andalouses Oran Algeria with direct private beach access, azure sea view, white whitewashed modern architecture with natural stones, palm trees, sunny coastal aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1DB4bauRS9IWsAxOOR1-Sqhj9cC5VgD77doEwIH08B6DELjk4Q12aqhaNhPhy3au8cC74chw3WG-EW9YgW0Xf1PLoH9x3ZqF_z0y1bN6nweuc8u3M5pPCfEyZ-q8UYqiklgL8FcI02QupA32LLD09pknw5qDG1gLtj0KoAvmPcPylrfLbNbP_2YELZGZ-81ivvK-SjzapGxP6mJzgsHWiFbkbL2Qe5IrGjQEVtI5SqLC_1-M4iac"/>
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  VENTE EXCLUSIVE
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary-fixed">sailing</span>
                  Pieds dans l'eau
                </span>
</div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    Les Andalouses • Oran
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-ORN-077</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Villa balnéaire d'exception avec accès plage privatif
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Rare opportunité les pieds dans l'eau sur la côte oranaise. Solarium en teck, piscine miroir à débordement sur la mer et ponton privé pour embarcation de plaisance.
                </p>
</div>
<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">king_bed</span> 5
                  </span>
<span className="font-label-sm text-label-sm text-outline">Chambres</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">bathtub</span> 4
                  </span>
<span className="font-label-sm text-label-sm text-outline">Salles d'eau</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 480
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² habitables</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">120 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">250 000 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-detail?id=ph-loc-302">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col">
<div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Prime coastal residential building plot of land in Boumerdes Algeria with gentle slope, distant panoramic Mediterranean sea view, surrounded by green pines, surveyed architectural boundary, golden sunset sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgzt7ZDtSlAWbj-ppU7-dPXwQyIcgcRr6wqbR0SNqHGaBnXkDpY6NfBXF_LayGyefTvIaOVsbsNf1aXgoeASgKbHmBc6airjfpkDA79YoJThd4leVpRODsROTXvr8kwteCRS8Rzxt2MekYair4FfiR8zPVzce2hXmMNDSZA7dM2n8pL3JUHBlLVu7C2-X0Wz_QSLj4amPn2FkYgUqrGfk1731RpG9XzRJT6hyMqVv-ZAMn7T9lZYU"/>
<div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
<span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
                  VENTE TERRAIN
                </span>
<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
<span className="material-symbols-outlined text-xs text-secondary-fixed">assignment_turned_in</span>
                  Permis R+2 Validé
                </span>
</div>
<div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
<button aria-label="Ajouter aux favoris" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10">
<span className="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
<span className="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
</div>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
<div className="space-y-space-xs">
<div className="flex items-center justify-between">
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
<span className="material-symbols-outlined text-xs">pin_drop</span>
                    Corso • Boumerdès
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réf: PH-BMD-019</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
                  Terrain constructible viabilisé à 800m de la plage
                </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Parcelle de prestige entièrement viabilisée (eau, électricité, assainissement, fibre). Acte notarié individuel, certificat d'urbanisme conforme et vue mer dégagée.
                </p>
</div>
<div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">architecture</span> R+2
                  </span>
<span className="font-label-sm text-label-sm text-outline">Gabarit autorisé</span>
</div>
<div className="flex flex-col items-center border-x border-surface-container-low">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">water_drop</span> Viabilisé
                  </span>
<span className="font-label-sm text-label-sm text-outline">Réseaux prêts</span>
</div>
<div className="flex flex-col items-center">
<span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
<span className="material-symbols-outlined text-sm text-secondary">square_foot</span> 850
                  </span>
<span className="font-label-sm text-label-sm text-outline">m² superficie</span>
</div>
</div>
<div className="flex items-center justify-between pt-space-xs">
<div className="flex flex-col">
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold">35 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<span className="font-label-sm text-label-sm text-outline">41 176 DA / m²</span>
</div>
<Link className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1" href="/bien-detail?id=ph-alg-601">
<span>Détails</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</Link>
</div>
</div>
</article>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs flex flex-col sm:flex-row items-center justify-between gap-space-md mt-space-sm">
<div className="flex items-center gap-1">
<span className="font-body-sm text-body-sm text-on-surface-variant">Affichage de <strong>1 - 6</strong> sur 48 biens</span>
</div>
<div className="flex items-center gap-space-xs">
<button className="w-9 h-9 rounded flex items-center justify-center text-outline cursor-not-allowed bg-surface-container-low" disabled="" title="Page précédente" type="button">
<span className="material-symbols-outlined text-sm">chevron_left</span>
</button>
<button className="w-9 h-9 rounded flex items-center justify-center bg-primary-container text-surface font-label-md text-label-md font-bold" type="button">
              1
            </button>
<button className="w-9 h-9 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors" type="button">
              2
            </button>
<button className="w-9 h-9 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors" type="button">
              3
            </button>
<span className="px-1 text-outline font-label-md">...</span>
<button className="w-9 h-9 rounded flex items-center justify-center hover:bg-surface-container-low text-on-surface font-label-md text-label-md transition-colors" type="button">
              8
            </button>
<button className="w-9 h-9 rounded flex items-center justify-center hover:bg-surface-container text-on-surface transition-colors" title="Page suivante" type="button">
<span className="material-symbols-outlined text-sm">chevron_right</span>
</button>
</div>
<button className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-all" type="button">
<span className="material-symbols-outlined text-sm">sync</span>
<span>Charger plus de biens</span>
</button>
</div>

<div className="bg-gradient-to-r from-primary-container via-[#132338] to-primary-container rounded-xl p-space-lg md:p-space-xl text-surface shadow-md relative overflow-hidden">

<div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none">
<svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 400 400">
<circle cx="200" cy="200" r="180" strokeWidth="1.5"></circle>
<circle cx="200" cy="200" r="140" strokeWidth="1"></circle>
<circle cx="200" cy="200" r="100" strokeWidth="1.5"></circle>
<path d="M0,200 L400,200" strokeWidth="0.75"></path>
<path d="M200,0 L200,400" strokeWidth="0.75"></path>
</svg>
</div>
<div className="relative z-10 max-w-2xl flex flex-col gap-space-sm">
<div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed font-label-sm text-label-sm w-fit">
<span className="material-symbols-outlined text-sm">notifications_active</span>
              Alerte de Recherche Sur-Mesure
            </div>
<h3 className="font-headline-md text-headline-md text-surface font-semibold">
              Créez une alerte personnalisée pour vos critères précis
            </h3>
<p className="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
              Soyez notifié sur WhatsApp ou par email dès qu'une nouvelle villa ou penthouse correspondant à : 
              <span className="text-secondary-fixed font-semibold">"Alger • Vente • Min. 3 chambres • Piscine"</span> 
              est enregistré dans notre réseau notarié.
            </p>
<form className="flex flex-col sm:flex-row gap-space-sm pt-space-xs" >
<input className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest/10 backdrop-blur-md text-surface placeholder:text-surface-dim font-body-sm text-body-sm border-none focus:outline-none focus:ring-2 focus:ring-secondary-fixed flex-1" placeholder="Votre adresse email professionnelle ou privée..." required="" type="email"/>
<button className="px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-md text-label-md font-bold rounded-lg transition-all shadow-sm hover:shadow whitespace-nowrap flex items-center justify-center gap-2" type="submit">
<span className="material-symbols-outlined text-title-md">notifications</span>
<span>Activer l'alerte VIP</span>
</button>
</form>
<div className="flex items-center gap-space-md pt-space-xs font-label-sm text-label-sm text-primary-fixed-dim">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-secondary-fixed">lock</span>
                Confidentialité absolue
              </span>
<span>•</span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-xs text-secondary-fixed">schedule</span>
                Désinscription en 1 clic
              </span>
</div>
</div>
</div>
</main>
</div>
</div>

</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function biensPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
