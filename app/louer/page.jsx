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

<section className="relative w-full -mt-20 overflow-hidden bg-primary-container">
<div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000" data-alt="Sunlit high-end contemporary penthouse living room in Algiers Hydra with floor-to-ceiling panoramic glass windows looking over Mediterranean coastline, travertine stone floors, minimalist brushed brass and white oak furniture, warm twilight ambiance, ultra luxury architectural photography" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_XLPXN9sooxsjZoCRM5fnViVtp2S-4wHRtagiNtxtu8kdFon0cb6eCSRtdcnpuFY1zogbXeiq5gsY3OnJu_WHlb8a_m3o30PkANyUCBbN01jhor5aC-aB3GB8mZv2xfkwyHpyKnhGVceYXs6R-Q-vTF91gbDIABsCOpkkwF1YuN-bhn7XU45QII8Mj64YlEF6bk3z3vEY1FKr0KjMSHMc4WB5NgVcr1_j9DSZPAW_ZtDDY8Uz3ts')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/70 to-primary-container/40"></div>
<div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="relative max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-36 pb-24 md:pb-28 flex flex-col items-center">


<h1 className="font-headline-xl text-headline-xl md:text-display text-surface text-center max-w-4xl tracking-tight leading-tight">
        Trouvez votre prochaine <span className="italic font-normal text-secondary-fixed">location de prestige</span>
</h1>
<p className="font-body-lg text-body-lg text-inverse-on-surface/80 text-center max-w-2xl mt-space-sm mb-space-xl">
        Découvrez des appartements d’architecte, villas de maître et résidences diplomatiques à louer à Alger, Oran et sur le littoral algérien.
      </p>

<div className="w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-2xl p-space-md md:p-space-lg text-on-surface">
<div className="flex items-center gap-space-sm mb-space-md pb-space-sm bg-surface-container-low/40 p-space-xs rounded-lg">
<button className="px-space-md py-space-xs rounded bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-lg text-secondary">key</span>
            Location Résidentielle
          </button>
<button className="px-space-md py-space-xs rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-lg">domain</span>
            Baux Diplomatiques &amp; Sièges
          </button>
</div>
<form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-space-md">

<div className="lg:col-span-2 flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
              Wilaya &amp; Secteur
            </label>
<div className="relative">
<select className="w-full px-space-md py-3 rounded bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="all">Toutes les wilayas (69 wilayas)</option>
<option value="alger-all">16 - Alger (Tous quartiers haut standing)</option>
<option value="hydra">16 - Alger — Hydra &amp; Sidi Yahia</option>
<option value="elbiar">16 - Alger — El Biar &amp; Poirson</option>
<option value="cheraga">16 - Alger — Chéraga &amp; Dely Ibrahim</option>
<option value="oran">31 - Oran — Canastel &amp; Akid Lotfi</option>
<option value="constantine">25 - Constantine — Belle Vue &amp; Zouaghi</option>
<option value="annaba">23 - Annaba — Séraïdi &amp; Chapuis</option>
<option value="blida">09 - Blida — Atlas &amp; Centre</option>
<option value="boumerdes">35 - Boumerdès — Front de Mer</option>
{ALL_WILAYAS.map((w) => (
  <option key={`louer-wilaya-${w.code}`} value={w.name.toLowerCase()}>
    {w.code} - {w.name}
  </option>
))}
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-secondary">villa</span>
              Type de bien
            </label>
<div className="relative">
<select className="w-full px-space-md py-3 rounded bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="all">Tous types</option>
<option  value="appartement">Appartement / Duplex</option>
<option value="villa">Villa d'Architecte</option>
<option value="studio">Studio Exécutif</option>
<option value="penthouse">Penthouse</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-secondary">payments</span>
              Budget (DA / mois)
            </label>
<div className="relative">
<select className="w-full px-space-md py-3 rounded bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="any">Tous budgets</option>
<option value="80-150">80 000 - 150 000 DA</option>
<option value="150-300">150 000 - 300 000 DA</option>
<option  value="300-600">300 000 - 600 000 DA</option>
<option value="600+">600 000 DA et +</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant flex items-center gap-1">
<span className="material-symbols-outlined text-label-md text-secondary">chair</span>
              Mobilier &amp; Pièces
            </label>
<div className="relative">
<select className="w-full px-space-md py-3 rounded bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer">
<option value="all">Indifférent</option>
<option  value="meuble">Meublé (Design)</option>
<option value="semi">Semi-meublé</option>
<option value="non">Non meublé</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
</div>
</div>

<div className="flex flex-col justify-end">
<button className="w-full h-[48px] bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded transition-all duration-200 flex items-center justify-center gap-space-xs shadow-md hover:-translate-y-0.5" type="button">
<span className="material-symbols-outlined">search</span>
<span>Rechercher</span>
</button>
</div>
</form>

<div className="mt-space-md pt-space-md flex flex-wrap items-center justify-between gap-space-sm bg-surface-container-low/20 px-space-sm rounded">
<div className="flex items-center gap-space-sm flex-wrap text-on-surface-variant font-label-sm text-label-sm">
<span className="text-secondary font-semibold">Chambres min :</span>
<button className="px-space-sm py-0.5 rounded bg-surface-container text-on-surface font-semibold">Toutes</button>
<button className="px-space-sm py-0.5 rounded hover:bg-surface-container transition-colors">1 ch</button>
<button className="px-space-sm py-0.5 rounded hover:bg-surface-container transition-colors">2 ch</button>
<button className="px-space-sm py-0.5 rounded bg-primary-container text-surface font-semibold shadow-sm">3+ ch</button>
<button className="px-space-sm py-0.5 rounded hover:bg-surface-container transition-colors">4+ ch</button>
</div>
<div className="flex items-center gap-space-md text-on-surface-variant font-body-sm text-body-sm">
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input checked="" className="w-4 h-4 accent-secondary rounded cursor-pointer" type="checkbox"/>
<span>Piscine / Terrasse</span>
</label>
<label className="flex items-center gap-space-xs cursor-pointer select-none">
<input checked="" className="w-4 h-4 accent-secondary rounded cursor-pointer" type="checkbox"/>
<span>Sécurité 24/7</span>
</label>
</div>
</div>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-md lg:px-margin-lg pt-space-xl pb-space-lg">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md pb-space-md">
<div>
<div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-widest font-semibold mb-space-xs">
<span>Mandats Vérifiés</span>
<span>•</span>
<span>Disponibilités Immédiates</span>
</div>
<div className="flex items-baseline gap-space-md flex-wrap">
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">Nos biens à louer</h2>
<span className="inline-flex items-center px-space-md py-0.5 rounded-full bg-surface-container text-secondary font-label-md text-label-md font-semibold">
            34 locations disponibles en Algérie
          </span>
</div>
</div>

<div className="flex items-center gap-space-md flex-wrap">
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<span className="material-symbols-outlined text-title-md">tune</span>
<span>Trier par :</span>
</div>
<div className="relative inline-block">
<select className="px-space-md py-space-sm pr-8 bg-surface-container-lowest rounded text-on-surface font-label-md text-label-md shadow-sm focus:outline-none appearance-none cursor-pointer">
<option value="recent">Plus récents</option>
<option value="price_asc">Loyer croissant</option>
<option  value="price_desc">Loyer décroissant</option>
<option value="surface">Superficie (m²)</option>
</select>
<span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-label-md">expand_more</span>
</div>
</div>
</div>

<div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs scrollbar-none">
<button className="px-space-md py-space-xs rounded-full bg-primary-container text-surface font-label-md text-label-md whitespace-nowrap shadow-sm flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary-fixed">check</span>
<span>Tous les biens</span>
</button>
<button className="px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm transition-colors flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">hotel</span>
<span>Meublé haut standing</span>
</button>
<button className="px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm transition-colors flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">date_range</span>
<span>Longue durée (Bail 1 an+)</span>
</button>
<button className="px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm transition-colors flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">verified_user</span>
<span>Résidence sécurisée</span>
</button>
<button className="px-space-md py-space-xs rounded-full bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md whitespace-nowrap shadow-sm transition-colors flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">wb_sunny</span>
<span>Vue dégagée / Mer</span>
</button>
</div>
</section>

<section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-md lg:px-margin-lg pb-space-xl">
<div id="rental-properties-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Modern luxury duplex penthouse interior with wide panoramic private terrace in Hydra Algiers, Mediterranean architectural design with designer marble dining table, natural sunlight, warm linen curtains and contemporary art" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdUQnxJtUQHXHcct54yJIWJrLhtgZvV1FIGEM0p2eH7MXEapQKfc43wkKjDD7N8O54jnOYF99vSlrw6b59Uh6GJxXuvXgWSgAM2ycLKF3-nEB8nyJygBGlG5HEBkyCBCBmuvIy6-BmARycggPnTGAnQ8u3UmxEjU5jE8FiVReMCA_Yp7H19ETrc7JzSmfY8M-PCnER4Cd9GzgcITSeCKILgrP1PlstkmeDcNsZqXH15MVVYZ6info"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-primary-container text-secondary-fixed font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Location Longue Durée
            </span>
</div>

<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>

<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/14</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Hydra • Alger</span>
<span className="text-outline-variant">•</span>
<span>Résidence Les Pins</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-duplex-hydra">Duplex F5 meublé &amp; terrasse panoramique</Link></h3>

<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">260 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">4 ch / 3 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-secondary truncate px-1">Meublé Luxe</span>
</div>
</div>
</div>

<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">450 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-duplex-hydra" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Architectural luxury white modern villa in Cheraga Algiers with private turquoise infinity pool, lush landscaped garden with palm trees and evening warm architectural lighting fixtures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfmgxheHn762wkIgeIJziaBSNhuWDpdc_JKV811T94wOydyUspkqqupjr7-1HE97JfsqurMC9OplS779wqUZF7gpAZ2k-AoRnKq9iOppq4V1xr89_OgTLR2XTu9tZ6J3HvOeoiunmqK-E0GgADm48O7hZMJPhUSYv4RQFtr1tfAYqDKHz_TSnXI_TURUDBB7eWKvJMrJF1Tue58c0ZEDks34AGNAu2xODnxwnNEsKkMHBu4j1qC08"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              Exclusivité Prime House
            </span>
</div>
<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/22</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Chéraga • Alger Ouest</span>
<span className="text-outline-variant">•</span>
<span>Domaine Sécurisé</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-villa-hydra">Villa contemporaine d'exception avec piscine</Link></h3>
<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">420 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">5 ch / 4 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-secondary truncate px-1">Semi-meublé</span>
</div>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">650 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-villa-hydra" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Modern seaside luxury apartment balcony and living room looking over the Oran Mediterranean Gulf bay, clean white contemporary interior decor, natural bright coastal sunlight" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-1DAkv9Mutn6riNWD-9lJu56t4JsvF0ngSOf6kZfp4hL_HRmEkks53pV5P_Np6w5c3PfXpfdiu8OKmuRqQu3ezr28NugWHa-a-BQjYu-fyw-bLfOK-swrxe965DmKnP3owvVE3Q6C72tDQWL9kewbqBO3W03JP9bcXVPC7XajIWG6zI9y6b8vUT9oFdRFH7XmNrQVtS03vZNNW6CNWzjOq5wchIy1PoLtQD8rXod1oreYcbTV7DM"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Coup de Cœur
            </span>
</div>
<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/10</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Akid Lotfi • Oran</span>
<span className="text-outline-variant">•</span>
<span>Tour Bahia</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-detail?id=ph-ora-205">Appartement F3 moderne avec vue imprenable sur mer</Link></h3>
<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">110 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">2 ch / 1 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-secondary truncate px-1">Meublé Design</span>
</div>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">130 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-detail?id=ph-ora-205" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Luxury boutique studio apartment interior with elegant minimalist kitchenette, custom brass lighting fixtures, plush king bed and marble bathroom in Sidi Yahia Algiers" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmfiyedfifdocmN5SZMwxLI8YnJcVe1FYjVEdwIGLbvMOhupgmlK320Jf7ei1ebIrRcPgfsr_Ml2WD4odZdEzGlWrGLS30wU7uWP1np6q_F8sZMcmrY9T5gC3AHgoTdbs-8cDOoyzoyUhyNFklIkdc6iFVre1FY3J0WjpDRtRU85tOuDZstWAn8xOHrpUCYNeRzk-Adoqk73SBFY6rEynL0j3AYWAPevzAyIeD8UqrdGoROhX1bbQ"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Idéal Expatrié
            </span>
</div>
<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/8</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Sidi Yahia • Alger</span>
<span className="text-outline-variant">•</span>
<span>Rue Principale</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-detail?id=ph-alg-502">Studio exécutif de grand standing &amp; équipé</Link></h3>
<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">55 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">1 ch / 1 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-secondary truncate px-1">Clé en main</span>
</div>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">95 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-detail?id=ph-alg-502" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Spacious modern villa ground floor with landscaped private Mediterranean green garden, orange trees, stone patio and bright sunny atmosphere in coastal Boumerdes Algeria" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_oiWRMNs1glKpkpmGzh5ms1Qx7HG-pXgNyf9e75fbCGPf6V6YiYG5HXuinVJ9Mq4m79T0JpcQpDyFDJOalSlYn_rRfUxaWEW3wrTPBte3BcZT4-hFVZ9IpCTBbxboYAVzk2D3VtDj-IZcGxrTuC0UIe7aXxskAlQpU-Kywv5i3-bkOszFsm5TXvvw_Bz_c5_zo7XLCO9rq5o9ZbAYs2GCvoa47ORvDhlYnKHoQCjIaPDrA27ewTY"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-surface-container-low text-on-surface font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Jardin Privatif
            </span>
</div>
<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/16</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Centre-Ville • Boumerdès</span>
<span className="text-outline-variant">•</span>
<span>Front de Mer</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-detail?id=ph-alg-601">Étage de villa F4 avec jardin et garage</Link></h3>
<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">160 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">3 ch / 2 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-on-surface-variant truncate px-1">Non meublé</span>
</div>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">120 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-detail?id=ph-alg-601" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>

<article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col">

<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" data-alt="Triplex penthouse rooftop solarium with Jacuzzi and glass balustrades overlooking the cliff and sea view of Canastel Oran Algeria during golden sunset light" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDY3tPoeBv2MDUeyhfZQ4a3vEiIJ8oYG4BXKYtdTCn_ZKlGqKIgmz-gPZKpAs00tmkKa2VVVQSZZWv-L9errSmmgLqpvhKr7_I9tPXkaaDXcs860k9wGvm1Awj1j3b9vOaw3W_kgbw_5mNqvqbf6lCUDawkDmBInd_hl3JcufdlaId2vxLKNTID5xARNrhIk5u5b1TrOrlj6EXEKYaS_nKh_Eyp3niBhOnak4hqlixme4EkcoQwjfE"/>
<div className="absolute top-space-md left-space-md flex flex-col gap-space-xs">
<span className="px-space-md py-space-xs rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm uppercase font-bold tracking-wider shadow-sm">
              À Louer
            </span>
<span className="px-space-md py-space-xs rounded bg-primary-container text-secondary-fixed font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Prestige Triplex
            </span>
</div>
<button aria-label="Ajouter aux favoris" className="absolute top-space-md right-space-md w-10 h-10 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:scale-110 transition-all shadow-sm">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-md right-space-md px-space-sm py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface font-label-sm text-label-sm flex items-center gap-1">
<span className="material-symbols-outlined text-label-sm">photo_camera</span>
<span>1/19</span>
</div>
</div>

<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
<span className="font-semibold text-secondary">Canastel • Oran</span>
<span className="text-outline-variant">•</span>
<span>Front de Falaise</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1"><Link href="/bien-detail?id=ph-loc-108">Penthouse de prestige en triplex meublé de designer</Link></h3>
<div className="grid grid-cols-3 gap-space-xs py-space-md my-space-sm bg-surface-container-low/50 rounded-lg text-center">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">280 m²</span>
</div>
<div className="flex flex-col border-x border-outline-variant/30">
<span className="font-label-sm text-label-sm text-on-surface-variant">Chambres</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">4 ch / 3 sdb</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">État</span>
<span className="font-title-md text-title-md text-on-surface font-semibold text-secondary truncate px-1">Meublé Styliste</span>
</div>
</div>
</div>
<div className="pt-space-sm flex items-center justify-between gap-space-sm">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">380 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA <span className="font-normal text-on-surface-variant">/mois</span></span>
</div>
</div>
<Link href="/bien-detail?id=ph-loc-108" className="px-space-md py-space-sm rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-all flex items-center gap-space-xs">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</Link>
</div>
</div>
</article>
</div>

<div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
<span className="font-body-sm text-body-sm text-on-surface-variant">
        Affichage de <strong className="text-on-surface font-semibold">1 - 6</strong> sur 34 propriétés disponibles
      </span>
<nav aria-label="Pagination" className="flex items-center gap-space-xs">
<button className="w-10 h-10 rounded bg-surface-container-low text-outline-variant flex items-center justify-center cursor-not-allowed" disabled="">
<span className="material-symbols-outlined">chevron_left</span>
</button>
<button className="w-10 h-10 rounded bg-primary-container text-surface font-label-md text-label-md font-bold shadow-sm">1</button>
<button className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors shadow-sm">2</button>
<button className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors shadow-sm">3</button>
<span className="px-space-xs text-outline font-semibold">...</span>
<button className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors shadow-sm">6</button>
<button className="w-10 h-10 rounded bg-surface-container-lowest hover:bg-surface-container text-on-surface flex items-center justify-center transition-colors shadow-sm">
<span className="material-symbols-outlined">chevron_right</span>
</button>
</nav>
</div>
</section>

<section className="w-full bg-surface-container-low/60 py-space-xl my-space-md">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Territoire National</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-space-xs">
            Destinations phares pour louer
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Explorez les wilayas les plus recherchées par nos locataires privés et diplomatiques.
          </p>
</div>
<a className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-secondary hover:text-on-surface font-semibold transition-colors" href="#">
<span>Toutes les wilayas</span>
<span className="material-symbols-outlined text-title-md">north_east</span>
</a>
</div>

<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-gutter-sm">

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Algiers Algeria panoramic view of the bay with bright white colonial and modern architecture under blue sky and Mediterranean sea" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA3ne1Spjr_LuxvUqtxume4tAVqD59WizsudD2o7e0CF2Pun53Ryyr8UGdITxm-bCPemMfE_dCA-aDsENPCO7tNzQJZiD2_TNQ71fIrauZ4Im2VEx3D2oZGuRLLsb584WAOpaH1qzxuAwIG-pCaCZWPxM1pyRUQD_C50yUAPQShRAIJrCwfMdqPQVHtiUlRC8R2BM0Sns7xT5hc-O7CBjHgF5jCDcY8Dd6ne7Ovleu3PmRpLpD1lX0')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Capitale</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Alger</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">19 annonces</span>
</div>
</a>

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Oran Algeria city coastal promenade front de mer and Santa Cruz mountain scenery in bright daylight" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBADSaZWW9xeSjlf65280Spk4wV5pI6VwnNOK9hDUewMbn_27TMb8M36CMHHzFCB6BAlqel4_Op_hzzMresh4u4yzHMOwMzGnGzxKO6kX4YENtESIvcPwXC9TRr9aJltT-iFlNKWfOJ25W9nljB3oXyYylZORuWLD3xGX5GgXVwl9w6JTsV_JISV-9Ltg6sMa-U7GkE1_odnMcZkliC3tcojPtCMLpznCNplqwNFHaQ52xDo4QDggY')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Ouest</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Oran</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">7 annonces</span>
</div>
</a>

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Blida city Atlas mountains backdrop with lush green hills and residential luxury houses Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2trqKhkGWkg2Kh5z9U0i0_VQ7ofv6IvxnCuPEbQa43nQdqFmJzoLxRvTPpX927izc0aX2xqr-CDHQvhURPCM2uQIqaRnf0BSaOoTa4y47Fo2liC28uqXn1KPAW6zrfePtTT17XRp2ep4ZmG0tsxrLJ_0K0qzhzx37dHeDwnQlwvaQnqC9VokeOCMJWuzMwKso7WMn4P7yutfM8HVi45TGBV1r3orzqD_8WCEv5EhB9CgczeV8uq8')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Atlas</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Blida</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">3 annonces</span>
</div>
</a>

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Boumerdes Algerian coastal landscape with crystal blue sea water and beachfront residential properties" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC-Q_y3l4usJ2X5vMOVgS5i6WDczgyS3xQWKdO2GuhjdHGXyGoEH4_BD0NVfZz6VuTR1fsKDgh1ci7LxMUCC0QBrr5OaT3fC3RnSWVyt6cYr6pKSIqsaSuLs9wxKh5vSZZy4NIq4sJzJtxixk4CEp3QWphG3MoN5gZnCm3NxPQrr_2-BaPmf_BxEYEHQks4iBk_ArYOMQjvZhz8JQQ3hYK5ZUX2-OiCjcRC3uy7Je1TMHKm65gFl3U')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Littoral</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Boumerdès</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">2 annonces</span>
</div>
</a>

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Bejaia Cap Carbon Algeria high cliffs overlooking Mediterranean ocean with seaside homes" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDj2KlNSjTedVtJwwmln5xD0YDtKI3HBX_PER8qSS8w3L7D8RJEVnOMSC3G_p76EhhGDvJtThM2m2DAGhuXVu8UIIfj55CWj5sVO_Y4pq7WHpuLoJmCG6BmXhr3nshE8EJNuNRGe2CB9U1JEfa4R93cuKg8FQtY18mCJresPOy9Kg4Exe1icLMLc4KsrT_R-TfCjROR_zBpfrwFUlZkLYSaiZWnMnUEMRAi3jmzf6OeO-9EP27o2ng')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Côte Est</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Béjaïa</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">2 annonces</span>
</div>
</a>

<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-end p-space-md" href="#">
<div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" data-alt="Setif Algeria city modern architecture with high plateau skyline and Ain El Fouara heritage background" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCDQtb4pfTTddhLtqOB-ObeWcPEotQ8wCFnObrmF1W7Di3ysAqprh0ahsbfXBVQ45N_DqqzNy8QrCcFYFqqCfRcIeCNGUZUb0zeuiVvAZW-ZOy-nxtJXY6V7sHNEzTBKIlL1eCAN8IWANYwbSF_WThTHosLKh9XBkmrGaftWGvSYJCbTCEW3l2_IMrrFDZNo1ch59l2UbQtw_DaMUCC_HSh--YzCSTWE2kDYhc8iUEi4dtzEQP2uiQ')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">Hauts Plateaux</span>
<h3 className="font-title-lg text-title-lg text-surface font-bold leading-tight">Sétif</h3>
<span className="font-body-sm text-body-sm text-inverse-on-surface/80">1 annonce</span>
</div>
</a>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Engagement &amp; Sérénité</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-space-xs">
        Louez en toute confiance avec Prime House
      </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
        Notre département locatif applique les standards internationaux les plus stricts pour sécuriser le parcours des locataires et bailleurs.
      </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
<div className="w-14 h-14 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-md">description</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-space-xs">Des annonces détaillées</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Inventaire précis des équipements, photographies professionnelles non retouchées, diagnostics d'état des lieux et conditions contractuelles limpides dès le premier contact.
        </p>
<div className="mt-space-md pt-space-md bg-surface-container-low/30 rounded p-space-sm flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-label-md">verified</span>
<span>100% Biens certifiés sur place</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
<div className="w-14 h-14 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-md">manage_search</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-space-xs">Une recherche simple et rapide</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Filtres intelligents, géolocalisation cartographique claire et critères de loyer exprimés sans ambiguïté en Dinars Algériens (DA) avec charges incluses explicitées.
        </p>
<div className="mt-space-md pt-space-md bg-surface-container-low/30 rounded p-space-sm flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-label-md">speed</span>
<span>Visites programmées en 24h</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
<div className="w-14 h-14 rounded-xl bg-secondary-container/20 text-secondary flex items-center justify-center mb-space-md">
<span className="material-symbols-outlined text-headline-md">support_agent</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-bold mb-space-xs">Un contact direct avec les annonceurs</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Mise en relation confidentielle et directe avec les propriétaires vérifiés et nos conseillers privés dédiés aux corps consulaires et délégations multinationales.
        </p>
<div className="mt-space-md pt-space-md bg-surface-container-low/30 rounded p-space-sm flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
<span className="material-symbols-outlined text-label-md">lock</span>
<span>Discrétion et baux bilingues FR/AR</span>
</div>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-md lg:px-margin-lg pb-space-xl">
<div className="relative bg-primary-container rounded-2xl overflow-hidden p-space-lg md:p-space-xl text-surface shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">

<div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-surface-container-high/5 blur-3xl pointer-events-none"></div>

<div className="relative z-10 max-w-2xl text-center lg:text-left">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/10 backdrop-blur-md mb-space-md text-secondary-fixed font-label-sm text-label-sm uppercase tracking-widest font-semibold">
<span className="material-symbols-outlined text-label-md">real_estate_agent</span>
<span>Espace Bailleurs &amp; Investisseurs</span>
</div>
<h2 className="font-headline-xl text-headline-xl md:text-headline-xl text-surface font-semibold tracking-tight leading-tight">
          Vous souhaitez mettre votre bien en location ?
        </h2>
<p className="font-body-lg text-body-lg text-inverse-on-surface/85 mt-space-sm leading-relaxed">
          Confiez la gestion locative ou la recherche de locataires qualifiés (cadres dirigeants, diplomates, entreprises de premier rang) à l'expertise Prime House Algérie.
        </p>
<div className="mt-space-md flex flex-wrap items-center justify-center lg:justify-start gap-space-md text-surface/70 font-body-sm text-body-sm">
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">check_circle</span>
            Sélection rigoureuse des dossiers
          </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">check_circle</span>
            Garantie de loyer ponctuel
          </span>
<span className="flex items-center gap-1">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">check_circle</span>
            Gestion technique intégrale
          </span>
</div>
</div>

<div className="relative z-10 w-full lg:w-auto flex flex-col items-center lg:items-end">
<a className="w-full sm:w-auto px-space-xl py-4 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-space-sm font-bold hover:-translate-y-0.5 whitespace-nowrap" data-path="deposer-une-annonce" href="/deposer-annonce">
<span className="material-symbols-outlined text-title-lg">add_business</span>
<span>Déposer une annonce de location</span>
</a>
<span className="font-body-sm text-body-sm text-surface/60 mt-space-xs text-center lg:text-right">
          * Connexion ou inscription requise pour les bailleurs
        </span>
</div>
</div>
</section>


</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function louerPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
