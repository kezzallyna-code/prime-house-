'use client';

import { Suspense, useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer, { showToast } from '@/components/Toast';
import { primeStorage } from '@/lib/storage';

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

<div className="relative w-full overflow-hidden bg-surface-container-low/60 pb-space-xl">
<div className="absolute -top-32 right-12 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-16 left-1/4 w-80 h-80 bg-surface-variant/40 rounded-full blur-2xl pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg relative z-10">

<nav aria-label="Fil d'Ariane" className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm mb-space-md">
<a className="hover:text-secondary transition-colors uppercase tracking-widest" href="/">Accueil</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<a className="hover:text-secondary transition-colors uppercase tracking-widest" href="/mon-espace">Mon Espace</a>
<span className="material-symbols-outlined text-xs">chevron_right</span>
<span className="text-on-surface uppercase tracking-widest font-semibold">Mes Biens Favoris</span>
</nav>

<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
<div className="max-w-2xl">
<div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs bg-surface-container-lowest rounded-full shadow-sm mb-space-sm">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-widest">Collection Privée &amp; Sélections</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Mes Biens Favoris</h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
            Retrouvez votre sélection de résidences d'exception, comparez leurs caractéristiques exclusives et organisez vos visites privées avec nos conseillers dédiés.
          </p>
</div>

<div className="flex items-center gap-space-md self-start lg:self-auto bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
<div className="w-12 h-12 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center">
<span className="material-symbols-outlined text-title-lg" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</div>
<div className="flex flex-col">
<div className="flex items-baseline gap-space-xs">
<span className="font-currency-display text-currency-display text-on-surface" id="fav-count-display">3</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">biens</span>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Sélection active</span>
</div>
</div>
</div>
</div>
</div>

<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg w-full -mt-6 z-20 pb-space-xl">

<div className="w-full bg-surface-container-lowest rounded-xl shadow-md p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md">

<div className="flex items-center gap-space-xs w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
<button className="filter-btn px-space-md py-space-xs rounded-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider transition-all" id="filter-all" >
          Tous (3)
        </button>
<button className="filter-btn px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider transition-all" id="filter-vente" >
          À Vendre (2)
        </button>
<button className="filter-btn px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider transition-all" id="filter-location" >
          À Louer (1)
        </button>
</div>

<div className="flex items-center gap-space-xs w-full md:w-auto justify-end">
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" >
<span className="material-symbols-outlined text-base text-secondary">compare_arrows</span>
<span>Comparer</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" >
<span className="material-symbols-outlined text-base text-secondary">share</span>
<span className="hidden sm:inline">Partager</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-low hover:bg-error-container hover:text-on-error-container text-on-surface-variant rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" >
<span className="material-symbols-outlined text-base">delete_sweep</span>
<span className="hidden sm:inline">Vider</span>
</button>
</div>
</div>

<div className="fixed bottom-8 right-8 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none bg-primary-container text-on-primary px-space-lg py-space-md rounded-xl shadow-xl flex items-center gap-space-sm" id="toast-notification">
<span className="material-symbols-outlined text-secondary-fixed">info</span>
<span className="font-body-sm text-body-sm" id="toast-text">Action effectuée</span>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg mt-space-lg" id="favorites-grid">

<article className="property-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative" data-category="vente" id="card-prop-1">

<div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="A grand contemporary luxury villa with pristine Mediterranean architectural lines, private infinity swimming pool, manicured palm tree garden, white limestone facade bathed in golden afternoon sunlight in Hydra, Algiers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrkbKi4lFsjuRweB-GwXWeScpO_Hg3t8JIhMIFq2ZgmolOCIGhZ9jBYZ2HFIw5Gqzw1OflsbMZeUJoq073-OBuNBSnydT4M6X9MjW5MDJArJDmGWr1NS4EJGotyfo2Sn34Vh5MOOMB_8fGzyGfp_BuL5Qn5AUTdctSH8X6HgOegKGZ0457sH2ZiNrYzDV0tzUc067OZIEMNtYHYLd740-F2Lup1V301V8IOkHZf2o1cwPddCGFWtA"/>

<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs bg-surface-container-lowest/95 backdrop-blur-md rounded font-label-sm text-label-sm text-on-surface uppercase font-semibold shadow-sm">
              À Vendre
            </span>
<span className="px-space-sm py-space-xs bg-primary-container text-secondary-fixed rounded font-label-sm text-label-sm uppercase font-semibold tracking-wider shadow-sm">
              Exclusivité
            </span>
</div>

<button className="absolute top-space-sm right-space-sm w-10 h-10 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-error hover:bg-surface-container-lowest transition-all shadow-md flex items-center justify-center group/btn"  title="Retirer des favoris">
<span className="material-symbols-outlined text-title-lg transition-transform group-hover/btn:scale-110" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>

<div className="absolute bottom-space-sm left-space-sm right-space-sm py-space-xs px-space-sm bg-primary-container/85 backdrop-blur-md rounded-lg flex items-center justify-between text-surface">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">square_foot</span>
<span>540 m²</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bed</span>
<span>5 ch</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bathtub</span>
<span>5 sdb</span>
</div>
</div>
</div>

<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
<span className="material-symbols-outlined text-sm">location_on</span>
                Hydra • Alger
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Réf. PH-ALG-104</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
              Villa d'Architecte avec Piscine &amp; Jardin
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-space-xs">
              Propriété de maître ultra-sécurisée au cœur du quartier diplomatique. Double séjour de réception, suite parentale royale et sous-sol aménagé.
            </p>
</div>

<div className="pt-space-md mt-space-md bg-surface-container-low/40 p-space-sm rounded-lg flex flex-col gap-space-sm">
<div className="flex items-baseline justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prix de présentation</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">165 000 000</span>
<span className="font-label-md text-label-md text-secondary font-bold">DA</span>
</div>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">Acte notarié &amp; Livret foncier</span>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 py-space-sm text-center bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-sm" href="/bien-detail">
                Voir le bien
              </a>
<button className="p-space-sm bg-primary-container hover:bg-on-surface text-surface rounded transition-colors"  title="Planifier une visite privée">
<span className="material-symbols-outlined text-title-md">calendar_month</span>
</button>
</div>
</div>
</div>
</article>

<article className="property-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative" data-category="location" id="card-prop-2">
<div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="Interior of a luxury modern duplex penthouse apartment with high double-height ceilings, panoramic floor-to-ceiling windows overlooking leafy residential hills of Hydra in Algiers, curated marble finishes and minimalist warm lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEmKRJX1iUzdHaypzWdbSWsKwF0l9O_Svd7LnR9Ia6FeQqRcmeixjjbkh_Wp70ih02GOwpTUDICSTrfiHK1Tm0cCO5yjS71cch45bUFTa9oKlvveQsCipFI4up7VJehYtQmODxXFS66v4AB4-tIGiHSm98tXsRyb8qG0U6ny8b30TFbixi-TC5W7Yk5scC6ZCvPir_Gpqq6vlqKJe722yv6s9hV55_L-9CrOmKbhqeg0alYjztV4A"/>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs bg-surface-container-lowest/95 backdrop-blur-md rounded font-label-sm text-label-sm text-on-surface uppercase font-semibold shadow-sm">
              À Louer
            </span>
<span className="px-space-sm py-space-xs bg-surface-container-high text-on-surface-variant rounded font-label-sm text-label-sm uppercase font-semibold tracking-wider">
              Meublé de Prestige
            </span>
</div>
<button className="absolute top-space-sm right-space-sm w-10 h-10 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-error hover:bg-surface-container-lowest transition-all shadow-md flex items-center justify-center group/btn"  title="Retirer des favoris">
<span className="material-symbols-outlined text-title-lg transition-transform group-hover/btn:scale-110" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm right-space-sm py-space-xs px-space-sm bg-primary-container/85 backdrop-blur-md rounded-lg flex items-center justify-between text-surface">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">square_foot</span>
<span>280 m²</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bed</span>
<span>4 ch</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bathtub</span>
<span>3 sdb</span>
</div>
</div>
</div>
<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
<span className="material-symbols-outlined text-sm">location_on</span>
                Hydra • Alger
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Réf. PH-LOC-088</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
              Duplex de Maître Belvédère
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-space-xs">
              Résidence sécurisée avec service de conciergerie 24/7. Cuisine haut de gamme Boffi, terrasse panoramique sans vis-à-vis et parking double.
            </p>
</div>
<div className="pt-space-md mt-space-md bg-surface-container-low/40 p-space-sm rounded-lg flex flex-col gap-space-sm">
<div className="flex items-baseline justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Loyer mensuel</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">450 000</span>
<span className="font-label-md text-label-md text-secondary font-bold">DA</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">/mois</span>
</div>
</div>
<span className="font-body-sm text-body-sm text-secondary font-medium">Bail corporate possible</span>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 py-space-sm text-center bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-sm" href="/bien-detail">
                Voir le bien
              </a>
<button className="p-space-sm bg-primary-container hover:bg-on-surface text-surface rounded transition-colors"  title="Planifier une visite privée">
<span className="material-symbols-outlined text-title-md">calendar_month</span>
</button>
</div>
</div>
</div>
</article>

<article className="property-card group bg-surface-container-lowest rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative" data-category="vente" id="card-prop-3">
<div className="relative w-full aspect-[4/3] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="Modern seaside penthouse terrace overlooking the Mediterranean Gulf of Oran and Santa Cruz fort at dusk, luxury outdoor lounge with warm teak wood deck, glass balustrades and evening coastal lights." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9mE8Kg_Oo9__MEL3OdYmuLdvza5NJc_VDEH-V2ON4aCPtX8JDEUB-0nF9HEo3SyuYbkwu53unWN0sQTaf53nAKgl3aIlymjyluLR5N0W-T19XwuCKBOMqXS43cgciNyKnQsBAojm9lIuRQBPXirC7-N3RzCNohu0Ry-tykflftmexM4OWdRrqUexujNbwo3jSwfP7Dyx2C1oUTMUiRs2S_Oj8AEG-bB77ipJzAUtIoYI8QCAkLfQ"/>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs bg-surface-container-lowest/95 backdrop-blur-md rounded font-label-sm text-label-sm text-on-surface uppercase font-semibold shadow-sm">
              À Vendre
            </span>
<span className="px-space-sm py-space-xs bg-secondary-container text-on-secondary-container rounded font-label-sm text-label-sm uppercase font-semibold tracking-wider">
              Vue Mer 360°
            </span>
</div>
<button className="absolute top-space-sm right-space-sm w-10 h-10 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-error hover:bg-surface-container-lowest transition-all shadow-md flex items-center justify-center group/btn"  title="Retirer des favoris">
<span className="material-symbols-outlined text-title-lg transition-transform group-hover/btn:scale-110" style={{ "fontVariationSettings": "'FILL' 1" }}>favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm right-space-sm py-space-xs px-space-sm bg-primary-container/85 backdrop-blur-md rounded-lg flex items-center justify-between text-surface">
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">square_foot</span>
<span>380 m²</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bed</span>
<span>4 ch</span>
</div>
<div className="flex items-center gap-space-xs font-body-sm text-body-sm">
<span className="material-symbols-outlined text-base text-secondary-fixed">bathtub</span>
<span>3 sdb</span>
</div>
</div>
</div>
<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<div className="flex items-center justify-between gap-space-xs mb-space-xs">
<span className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
<span className="material-symbols-outlined text-sm">location_on</span>
                Front de Mer • Oran
              </span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Réf. PH-ORN-042</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
              Penthouse Contemporain Vue Baie d'Oran
            </h2>
<p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-space-xs">
              Écrin d'exception surplombant la Méditerranée. Ascenseur privatif menant directement au séjour, finitions en travertin et domotique complète.
            </p>
</div>
<div className="pt-space-md mt-space-md bg-surface-container-low/40 p-space-sm rounded-lg flex flex-col gap-space-sm">
<div className="flex items-baseline justify-between">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prix de présentation</span>
<div className="flex items-baseline gap-1">
<span className="font-currency-display text-currency-display text-on-surface">92 000 000</span>
<span className="font-label-md text-label-md text-secondary font-bold">DA</span>
</div>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">2 Garages inclus</span>
</div>
<div className="flex items-center gap-space-xs pt-space-xs">
<a className="flex-1 py-space-sm text-center bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-sm" href="/bien-detail">
                Voir le bien
              </a>
<button className="p-space-sm bg-primary-container hover:bg-on-surface text-surface rounded transition-colors"  title="Planifier une visite privée">
<span className="material-symbols-outlined text-title-md">calendar_month</span>
</button>
</div>
</div>
</div>
</article>
</div>

<div className="hidden flex-col items-center justify-center text-center py-space-xl bg-surface-container-lowest rounded-xl shadow-sm mt-space-lg px-margin" id="favorites-empty-state">
<div className="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant mb-space-md">
<span className="material-symbols-outlined text-display-mobile text-outline">favorite_border</span>
</div>
<h3 className="font-headline-md text-headline-md text-on-surface">Aucun favori enregistré pour le moment</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-space-xs mb-space-lg">
        Explorez notre portefeuille exclusif de villas diplomatiques, de penthouses et d'appartements d'exception à Alger, Oran et Constantine.
      </p>
<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg uppercase tracking-wider rounded transition-all shadow-md" href="#">
<span className="material-symbols-outlined text-title-md">search</span>
<span>Explorer notre catalogue de biens</span>
</a>
</div>

<section className="mt-space-xl w-full bg-surface-container-lowest rounded-xl shadow-md overflow-hidden">

<button className="w-full p-space-lg flex items-center justify-between text-left hover:bg-surface-container-low/50 transition-colors" >
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-lg bg-secondary-container/30 text-on-secondary-container flex items-center justify-center">
<span className="material-symbols-outlined text-title-lg">balance</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm text-on-surface">Tableau Comparatif des Biens Sauvegardés</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant">Confrontez la superficie, les prix unitaires et les prestations techniques essentielles</p>
</div>
</div>
<div className="flex items-center gap-space-sm">
<span className="hidden sm:inline font-label-md text-label-md text-secondary uppercase font-semibold" id="compare-toggle-label">Afficher le tableau</span>
<span className="material-symbols-outlined text-on-surface-variant transition-transform duration-300" id="compare-toggle-icon">expand_more</span>
</div>
</button>

<div className="hidden px-space-lg pb-space-lg overflow-x-auto" id="compare-content">
<table className="w-full text-left font-body-sm text-body-sm min-w-[700px]">
<thead>
<tr className="bg-surface-container-low text-on-surface font-title-md text-title-md">
<th className="p-space-md rounded-l">Critères d'Excellence</th>
<th className="p-space-md">Villa d'Architecte (Hydra)</th>
<th className="p-space-md">Duplex Belvédère (Hydra)</th>
<th className="p-space-md rounded-r">Penthouse Mer (Oran)</th>
</tr>
</thead>
<tbody className="text-on-surface-variant">
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Régime / Disponibilité</td>
<td className="p-space-md"><span className="px-space-xs py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface uppercase">Vente</span></td>
<td className="p-space-md"><span className="px-space-xs py-0.5 rounded bg-surface-container-high font-label-sm text-label-sm text-on-surface uppercase">Location</span></td>
<td className="p-space-md"><span className="px-space-xs py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface uppercase">Vente</span></td>
</tr>
<tr className="bg-surface-container-low/20 hover:bg-surface-container-low/40 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Prix / Valeur</td>
<td className="p-space-md font-currency-display text-on-surface font-semibold">165 000 000 DA</td>
<td className="p-space-md font-currency-display text-on-surface font-semibold">450 000 DA/m</td>
<td className="p-space-md font-currency-display text-on-surface font-semibold">92 000 000 DA</td>
</tr>
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Surface Totale</td>
<td className="p-space-md font-medium text-on-surface">540 m²</td>
<td className="p-space-md font-medium text-on-surface">280 m²</td>
<td className="p-space-md font-medium text-on-surface">380 m²</td>
</tr>
<tr className="bg-surface-container-low/20 hover:bg-surface-container-low/40 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Ratio Estimé au m²</td>
<td className="p-space-md text-on-surface">~ 305 500 DA/m²</td>
<td className="p-space-md text-on-surface">~ 1 607 DA/m²</td>
<td className="p-space-md text-on-surface">~ 242 100 DA/m²</td>
</tr>
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Chambres / Sanitaires</td>
<td className="p-space-md">5 Chambres • 5 SDB</td>
<td className="p-space-md">4 Chambres • 3 SDB</td>
<td className="p-space-md">4 Chambres • 3 SDB</td>
</tr>
<tr className="bg-surface-container-low/20 hover:bg-surface-container-low/40 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Groupe Électrogène Auto</td>
<td className="p-space-md text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-base">check_circle</span> Insonorisé 60 kVA</td>
<td className="p-space-md text-secondary"><span className="material-symbols-outlined text-base">check_circle</span> Immeuble entier</td>
<td className="p-space-md text-secondary"><span className="material-symbols-outlined text-base">check_circle</span> Dédié 30 kVA</td>
</tr>
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Bâche à Eau &amp; Surpresseur</td>
<td className="p-space-md text-secondary flex items-center gap-1"><span className="material-symbols-outlined text-base">check_circle</span> 20 000 Litres</td>
<td className="p-space-md text-secondary"><span className="material-symbols-outlined text-base">check_circle</span> Résidence 50 m³</td>
<td className="p-space-md text-secondary"><span className="material-symbols-outlined text-base">check_circle</span> Privative 10 000 L</td>
</tr>
<tr className="bg-surface-container-low/20 hover:bg-surface-container-low/40 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Statut Juridique</td>
<td className="p-space-md font-medium text-on-surface">Acte &amp; Livret Foncier</td>
<td className="p-space-md font-medium text-on-surface">Contrat Notarié Enregistré</td>
<td className="p-space-md font-medium text-on-surface">Acte Individuel &amp; Conformité</td>
</tr>
<tr className="bg-surface-container-lowest hover:bg-surface-container-low/30 transition-colors">
<td className="p-space-md font-semibold text-on-surface">Stationnement</td>
<td className="p-space-md">Garage fermé 4 véhicules</td>
<td className="p-space-md">2 Places sous-sol</td>
<td className="p-space-md">Box fermé 2 véhicules</td>
</tr>
</tbody>
</table>
</div>
</section>

<section className="mt-space-xl w-full bg-primary-container text-surface rounded-xl p-space-lg md:p-space-xl relative overflow-hidden shadow-xl">
<div className="absolute -right-10 -bottom-10 w-72 h-72 bg-secondary/15 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg relative z-10">
<div className="flex items-start gap-space-md max-w-2xl">
<div className="w-12 h-12 rounded-xl bg-secondary-container/20 text-secondary-fixed flex-shrink-0 flex items-center justify-center">
<span className="material-symbols-outlined text-headline-sm">notifications_active</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest font-semibold">Service Vigilance Prime</span>
<h3 className="font-headline-md text-headline-md text-surface mt-1">Alerte Baisse de Prix &amp; Opportunités</h3>
<p className="font-body-sm text-body-sm text-on-primary-container mt-space-xs">
              Recevez instantanément un message privé WhatsApp ou courriel prioritaire dès qu'une variation tarifaire ou une opportunité de négociation survient sur l'un de vos biens sauvegardés.
            </p>
</div>
</div>
<form className="w-full lg:w-auto flex flex-col sm:flex-row gap-space-sm items-center" >
<div className="relative w-full sm:w-72">
<input className="w-full px-space-md py-space-sm rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary-fixed" placeholder="Numéro WhatsApp (ex: 0550...)" required="" type="tel"/>
</div>
<button className="w-full sm:w-auto px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg uppercase tracking-wider rounded transition-all whitespace-nowrap shadow-md" type="submit">
            Activer la veille
          </button>
</form>
</div>
</section>

<section className="mt-space-xl p-space-lg bg-surface-container-low rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
<div className="flex items-center gap-space-md">
<img className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-secondary/40" data-alt="Professional portrait photo of an elite Algerian private estate advisor in elegant navy business suit, smiling warm confidence in front of luxury glass office interior." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFxwtk5RhYxLMjCrCMEytVdTDJe7DYcyS-rEBdILkXvNKAkD7O9U2nmUfEWCJJ0xpwm0OfYSkJWisP7bUufTjyEHvSoaBUn_QgDVOib3OHFo5iyQFFD0vNnuuux7W9r9eDXDXnN_FlQ1SvGgEh-Fy3PFOIYcqr_WFdfsuU8D_KMZaGC2if68fQxMhs-okd_13GvuaSjBgra2q6VcFc5uNNgmab3OpGykoX2-40tuv3TBBWq9bgrZk"/>
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold tracking-wider">Conseiller Privé Dédié</span>
<h4 className="font-title-lg text-title-lg text-on-surface">Besoin d'une visite discrète ou groupée ?</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Nos courtiers agréés organisent vos déplacements sous strict protocole de confidentialité.</p>
</div>
</div>
<div className="flex items-center gap-space-xs w-full md:w-auto">
<a className="flex-1 md:flex-none inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest hover:bg-surface-container text-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" href="https://wa.me/21323456789">
<span className="material-symbols-outlined text-base text-secondary">chat</span>
<span>WhatsApp Dédié</span>
</a>
<a className="flex-1 md:flex-none inline-flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary-container text-surface hover:bg-on-surface rounded font-label-md text-label-md uppercase tracking-wider transition-all shadow-sm" href="#">
<span className="material-symbols-outlined text-base text-secondary-fixed">call</span>
<span>+213 (0) 23 45 67 89</span>
</a>
</div>
</section>
</div>
</div>
</main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function favorisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
