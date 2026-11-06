'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer, { showToast } from '@/components/Toast';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { primeStorage } from '@/lib/storage';

function PageContent() {
  const searchParams = useSearchParams();
  const propId = searchParams ? searchParams.get('id') || 'ph-alg-401' : 'ph-alg-401';

  useEffect(() => {
    // 1. Dynamic property details population
    const prop = primeStorage.getPropertyById(propId);
    if (prop) {
      const isAr = primeStorage.getLanguage() === 'ar';
      document.title = `${isAr && prop.title_ar ? prop.title_ar : prop.title} | Prime House Immobilier`;

      const titleEl = document.getElementById('prop-title');
      if (titleEl) titleEl.textContent = (isAr && prop.title_ar) ? prop.title_ar : prop.title;

      const priceEl = document.getElementById('prop-price');
      if (priceEl) priceEl.textContent = Number(prop.price).toLocaleString('fr-FR');

      const refEl = document.getElementById('prop-ref');
      if (refEl) refEl.textContent = isAr ? `المرجع: ${prop.ref}` : `Réf: ${prop.ref}`;

      const districtEl = document.getElementById('prop-district-city');
      if (districtEl) {
        districtEl.innerHTML = `<span class="material-symbols-outlined text-base">location_on</span> ${prop.commune} • ${prop.wilaya}`;
      }

      const surfaceEl = document.getElementById('spec-area');
      if (surfaceEl) surfaceEl.textContent = isAr ? `${prop.surface} م²` : `${prop.surface} m²`;

      const bedEl = document.getElementById('spec-bedrooms');
      if (bedEl) bedEl.textContent = isAr ? `${prop.bedrooms} غرف نوم` : `${prop.bedrooms} Chambres`;

      const bathEl = document.getElementById('spec-bathrooms');
      if (bathEl) bathEl.textContent = isAr ? `${prop.bathrooms} حمامات` : `${prop.bathrooms} Salles d'eau`;

      const descEl = document.getElementById('prop-long-description');
      if (descEl) {
        const descContent = (isAr && prop.description_ar) ? prop.description_ar : prop.description;
        if (descContent) descEl.innerHTML = `<p>${descContent}</p>`;
      }

      const heroImg = document.getElementById('main-hero-img') || document.querySelector('.hero-gallery-main img');
      if (heroImg && prop.images && prop.images.length > 0) {
        heroImg.src = prop.images[0];
      }
    }

    // 2. Synchronize favorite icons on mount
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

    // 3. Booking inquiry form
    const contactForm = document.getElementById('contact-booking-form');
    const handleBooking = (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-fullname')?.value || '';
      const phone = document.getElementById('lead-phone')?.value || '';
      const email = document.getElementById('lead-email')?.value || '';
      const message = document.getElementById('lead-message')?.value || '';

      const currentProp = primeStorage.getPropertyById(propId) || {};
      primeStorage.addInquiry({
        name,
        phone,
        email,
        message,
        date: new Date().toLocaleString('fr-FR'),
        propertyId: currentProp.id || propId,
        propertyTitle: currentProp.title || 'Demande de visite',
        type: 'Demande de visite privée'
      });

      showToast(`Demande transmise avec succès pour ${currentProp.title || 'cette propriété'} !`, 'success');
      contactForm.reset();
    };

    if (contactForm) {
      contactForm.addEventListener('submit', handleBooking);
    }

    return () => {
      document.removeEventListener('click', handleFavClick);
      if (contactForm) {
        contactForm.removeEventListener('submit', handleBooking);
      }
    };
  }, [propId]);

  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">

<aside aria-label="Sélecteur de simulation" className="w-full bg-primary-container text-surface py-space-xs px-margin md:px-margin-md lg:px-margin-lg shadow-sm">
<div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-space-sm text-body-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary-fixed">auto_awesome</span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest">Aperçu Prototype Dynamique :</span>
<span className="text-on-primary-container hidden sm:inline">Basculer le mandat affiché en temps réel :</span>
</div>
<div className="flex items-center gap-space-xs flex-wrap" id="property-switcher-pills">
<button className="prop-switch-btn active-switcher px-space-sm py-1 rounded font-label-sm text-label-sm bg-secondary-container text-on-secondary-container transition-all font-semibold flex items-center gap-1 shadow-sm" data-prop="villa-hydra"  type="button">
<span>Villa Hydra</span>
<span className="text-[10px] opacity-80">(165M DA)</span>
</button>
<button className="prop-switch-btn px-space-sm py-1 rounded font-label-sm text-label-sm bg-surface-container-high/20 text-surface hover:bg-surface-container-high/30 transition-all font-medium flex items-center gap-1" data-prop="duplex-alger"  type="button">
<span>Duplex Alger</span>
<span className="text-[10px] opacity-80">(Location 450k/m)</span>
</button>
<button className="prop-switch-btn px-space-sm py-1 rounded font-label-sm text-label-sm bg-surface-container-high/20 text-surface hover:bg-surface-container-high/30 transition-all font-medium flex items-center gap-1" data-prop="penthouse-oran"  type="button">
<span>Penthouse Oran</span>
<span className="text-[10px] opacity-80">(92M DA)</span>
</button>
</div>
</div>
</aside>

<section className="w-full bg-surface-container-lowest/80 backdrop-blur-md sticky top-20 z-30 shadow-sm">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-sm flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
<div className="flex items-center gap-space-md flex-wrap">
<a className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-colors group" href="#">
<span className="material-symbols-outlined text-title-md transition-transform group-hover:-translate-x-1">arrow_back</span>
<span>Retour aux résultats</span>
</a>
<span className="text-outline-variant hidden sm:inline">|</span>
<nav aria-label="Fil d'Ariane" className="hidden sm:flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<a className="hover:text-on-surface transition-colors" href="/">Accueil</a>
<span>/</span>
<a className="hover:text-on-surface transition-colors" href="/biens?mode=vente" id="bc-category">Acheter</a>
<span>/</span>
<a className="hover:text-on-surface transition-colors" href="#" id="bc-city">Alger</a>
<span>/</span>
<a className="hover:text-on-surface transition-colors" href="#" id="bc-district">Hydra</a>
<span>/</span>
<span className="text-on-surface font-medium truncate max-w-xs" id="bc-title">Villa Contemporaine avec Piscine</span>
</nav>
</div>
<div className="flex items-center gap-space-xs self-end md:self-auto">
<button className="inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm" id="btn-favorite"  type="button">
<span className="material-symbols-outlined text-title-md text-secondary" id="fav-icon">favorite_border</span>
<span className="hidden lg:inline" id="fav-text">Sauvegarder</span>
</button>
<button className="inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md text-on-surface-variant">share</span>
<span className="hidden lg:inline">Partager</span>
</button>
<button className="inline-flex items-center gap-1.5 px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md text-on-surface-variant">download_for_offline</span>
<span className="hidden sm:inline">Dossier PDF</span>
</button>
<button className="p-1.5 rounded text-outline hover:text-error hover:bg-surface-container-low transition-colors"  title="Signaler une inexactitude" type="button">
<span className="material-symbols-outlined text-title-md">flag</span>
</button>
</div>
</div>
</section>

<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg pb-space-xl w-full">

<section aria-label="Galerie photographique" className="mb-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-space-sm h-auto lg:h-[560px]">

<div className="lg:col-span-8 relative rounded-xl overflow-hidden group cursor-pointer shadow-md bg-surface-container" >
<img className="w-full h-[360px] sm:h-[460px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Photographie architecturale de luxe d'une villa contemporaine à Hydra Alger, grand salon ouvert baigné de lumière naturelle, sol en marbre clair d'Italie, terrasse avec piscine à débordement turquoise et palmiers sous un ciel d'été azur, style éditorial haut de gamme." id="main-hero-img" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8mC_7TL_QfopEgQVVm2jErj1UUMwi8ta9-cs4Av8X1QftlPYFeeKhssNSVowb3Oi4zOsukOBX0iyfZ-uzIHSkExHbcGJ8-XaRSry6d1YwolYWyBHVhoa_y1681VfXLiSCbIh7v_Ksi8QeHK8WTAuo3RyB2BbAE-sDxHXmq6sTxSDTt0_Xxfv0o4iOWyxftcBJvTb-acqewZyzZY2hhbMzj-846IikXN5RrEi8FTzPqwjPqV-_tUo"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/70 via-transparent to-primary-container/20 pointer-events-none"></div>

<div className="absolute top-space-md left-space-md flex flex-wrap items-center gap-space-xs z-10">
<span className="bg-primary-container text-secondary-fixed font-label-sm text-label-sm px-space-sm py-1 rounded uppercase tracking-widest shadow-md flex items-center gap-1 font-semibold" id="badge-exclusive">
<span className="material-symbols-outlined text-label-md text-secondary-fixed">verified</span>
              Exclusivité Prime House
            </span>
<span className="bg-surface-container-lowest text-on-surface font-label-sm text-label-sm px-space-sm py-1 rounded uppercase tracking-wider font-semibold shadow-sm" id="badge-type">
              À Vendre
            </span>
<span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-label-sm text-label-sm px-space-sm py-1 rounded tracking-wide shadow-sm font-medium" id="badge-ref">
              Réf : PH-ALG-104
            </span>
</div>

<div className="absolute bottom-space-md left-space-md right-space-md flex items-center justify-between pointer-events-auto">
<button className="px-space-md py-space-xs rounded bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-md text-label-md hover:bg-surface-container-lowest transition-all shadow-md flex items-center gap-space-xs"  type="button">
<span className="material-symbols-outlined text-secondary text-title-md">view_in_ar</span>
<span>Visite Virtuelle 3D</span>
</button>
<button className="px-space-md py-space-xs rounded bg-primary-container text-surface font-label-md text-label-md hover:bg-on-surface transition-all shadow-md flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">photo_library</span>
<span id="gallery-count-pill">Voir les 24 photos</span>
</button>
</div>
</div>

<div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-space-sm h-full">
<div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-sm bg-surface-container h-[140px] sm:h-[180px] lg:h-[132px]" >
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Intérieur raffiné d'une suite parentale de luxe avec lit king-size design, parquet en chêne massif, dressing sur mesure éclairé par LED et baie vitrée donnant sur jardin privé à Alger." id="thumb-1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBViM4Ngnu_ujwQt-DY0NVCTX_ZVCeUbhtBHYv64FoL11bIUeFCzYzATvmwiJOxMGB-HGTZA3vkJZs3-cDe0kef5ORA3gemAPEXJ1sUFPTST32HWalE-txMQinZEl4DNjWq5ybWfrCjy3M54_lcVtTT_cLvc_96TxdLl_C2gAU9de5uwxYsp95I4Q4UU6DZpuA3bPFZ8C_qpnm5qR3nCZTjkE531k38DTZoAGsscUKlmSlUejvYMPc"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-primary-container/0 transition-colors"></div>
<span className="absolute bottom-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface shadow-sm">Master Suite 45m²</span>
</div>
<div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-sm bg-surface-container h-[140px] sm:h-[180px] lg:h-[132px]" >
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Cuisine italienne moderne de prestige avec îlot central en marbre blanc Calacatta, électroménager encastré haut de gamme et verrière contemporaine design." id="thumb-2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ-EzURtB811DK3uHG-HmpPhzLwGJQDfGeYqxwnVGRcHXlXerfhb0gOKdTLCCSGxG08jMV9iJYOA7zvN6afdwa79614zH6V7mZxGu1q1Qzbj5Seqw0cdUYFA8Vt_M-k2cBS92UrY-1lNKIoZpKnf5Fht3FRk0gCTcLeqoczcztQKW2wYNCr2iwKYHsV9YEVp3fR4pq0Tb8aBcXGkc5N5MQtUzo5QLkQ-DKONCYaIMqI0BylUoaapM"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-primary-container/0 transition-colors"></div>
<span className="absolute bottom-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface shadow-sm">Cuisine Marbre Calacatta</span>
</div>
<div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-sm bg-surface-container h-[140px] sm:h-[180px] lg:h-[132px]" >
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Salon principal de réception de style épuré avec cheminée suspendue, mobilier contemporain beige, hauts plafonds et œuvres d'art modernes." id="thumb-3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlfWNPzRWsKjN54H9kF9uwOEpNf75RKXa4bU2_sfnew2SVyVp1cEbtJLeOKEeI8bIAv8ZpQ1VKPHN4wKK2qTpiu4poW7w3s1wZQ9qquFzYWs-OhUP4xE0odMePJ94yfXok8EoFEpntokYiCuyfqQ42C2YRWtRWrxu9SuP9gEoHiZj_bii5PL-_NGadrva682BWwdREYXgfvUGL4Lsv5mASjGHFbxu4yfZzQW__FkOY29jT-WRS_CE"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-primary-container/0 transition-colors"></div>
<span className="absolute bottom-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface shadow-sm">Salon de Réception</span>
</div>
<div className="relative rounded-lg overflow-hidden group cursor-pointer shadow-sm bg-surface-container h-[140px] sm:h-[180px] lg:h-[132px]" >
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Jardin méditerranéen paysager de nuit avec piscine éclairée aux teintes émeraude, salon extérieur d'été lounge et palmiers Washingtonia sous éclairage architectural discret." id="thumb-4" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1s74onYuz7hUvXfnyaHCloauSqqDef4mGpM21HcGrLaWQZpu596MBFttJc_xZE7YVIWPr2Z9bF-W7zL1Be3U7lEsJyhF1-IJljlgJGQbnDMMPsKG-yCSjlzJTbMoYV8rwpSCPlFfaZxm-d7zDwjq1cApl_7yxjA-6VoIo9u6nIaFWYTjeSO0nq4dsSkkizAjQvTp2tcrgXFwBZ9PPU0tH5eZwKJlIwHOzU9gcXzTPiVddm3m3Rvg"/>
<div className="absolute inset-0 bg-primary-container/40 group-hover:bg-primary-container/20 transition-colors flex items-center justify-center">
<div className="text-surface flex items-center gap-1 font-label-md text-label-md bg-primary-container/80 px-space-sm py-1 rounded backdrop-blur-sm">
<span className="material-symbols-outlined text-title-md text-secondary-fixed">add_photo_alternate</span>
<span>+20 photos</span>
</div>
</div>
<span className="absolute bottom-space-xs left-space-xs bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded font-label-sm text-label-sm text-on-surface shadow-sm">Jardin &amp; Extérieurs</span>
</div>
</div>
</div>
</section>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">

<main className="lg:col-span-8 flex flex-col gap-space-xl">

<section className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm">
<span className="font-label-md text-label-md tracking-widest uppercase text-secondary font-semibold flex items-center gap-1" id="prop-district-city">
<span className="material-symbols-outlined text-base">location_on</span>
              Hydra • Alger (16)
            </span>
<span className="font-body-sm text-body-sm text-outline">Mis à jour il y a 2 jours</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-semibold leading-tight" id="prop-title">
            Villa Contemporaine d'Exception avec Piscine à Débordement
          </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs flex items-center gap-1.5" id="prop-address-sub">
<span className="material-symbols-outlined text-base text-outline">map</span>
            Quartier Résidentiel &amp; Diplomatique, Hydra, Alger
          </p>

<div className="mt-space-lg pt-space-lg flex flex-col sm:flex-row sm:items-end justify-between gap-space-md bg-surface-container-low/60 p-space-md rounded-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Prix de présentation</span>
<div className="flex items-baseline gap-2 mt-1">
<span className="font-currency-display text-display font-bold text-primary tracking-tight" id="prop-price">165 000 000</span>
<span className="font-label-lg text-label-lg font-bold text-secondary uppercase" id="prop-currency-unit">DA</span>
<span className="font-body-md text-body-md text-on-surface-variant" id="prop-price-suffix">net vendeur</span>
</div>
<div className="flex items-center gap-space-sm mt-1">
<span className="font-label-md text-label-md text-on-surface-variant font-medium" id="prop-sqm-price">266 129 DA / m²</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Honoraires acquéreur inclus</span>
</div>
</div>
<div className="bg-surface-container-lowest px-space-md py-space-sm rounded shadow-sm flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">verified_user</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm font-bold text-on-surface">Actes Vérifiés DZ</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Livret foncier individuel prêt</span>
</div>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm mt-space-lg pt-space-md">
<div className="bg-surface-container-low p-space-md rounded flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm">square_foot</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block">Superficie</span>
<span className="font-title-md text-title-md text-on-surface font-semibold" id="spec-area">620 m²</span>
<span className="font-body-sm text-[11px] text-outline block" id="spec-land">(Terrain 780 m²)</span>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm">meeting_room</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block">Configuration</span>
<span className="font-title-md text-title-md text-on-surface font-semibold" id="spec-rooms">8 Pièces</span>
<span className="font-body-sm text-[11px] text-outline block" id="spec-bedrooms">6 Suites d'invités</span>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm">bathtub</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block">Bains &amp; Eaux</span>
<span className="font-title-md text-title-md text-on-surface font-semibold" id="spec-bathrooms">7 Salles de bain</span>
<span className="font-body-sm text-[11px] text-outline block">Marbre &amp; Jacuzzi</span>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm">garage</span>
<div>
<span className="font-label-sm text-label-sm text-on-surface-variant block">Stationnement</span>
<span className="font-title-md text-title-md text-on-surface font-semibold" id="spec-parking">4 Véhicules</span>
<span className="font-body-sm text-[11px] text-outline block">Garage sous-sol</span>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
<div className="flex items-center justify-between pb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-headline-md">gavel</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Conformité Juridique &amp; Statut Foncier</h2>
</div>
<span className="bg-secondary-container/30 text-on-secondary-container px-space-sm py-1 rounded font-label-sm text-label-sm font-bold flex items-center gap-1">
<span className="material-symbols-outlined text-sm">lock</span>
              Audité par Prime House
            </span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Chaque bien présenté par notre département prestige fait l'objet d'un audit cadastral rigoureux et de vérifications notariales complètes avant commercialisation.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-md">
<div className="flex items-start gap-space-sm p-space-md bg-surface-container-low rounded-lg">
<span className="material-symbols-outlined text-secondary text-title-lg mt-0.5">verified</span>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Acte Notarié dans l'Indivision Purifiée</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Propriété en pleine propriété exclusive, exempte de tout litige successoral ou hypothèque enregistrée.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-md bg-surface-container-low rounded-lg">
<span className="material-symbols-outlined text-secondary text-title-lg mt-0.5">menu_book</span>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Livret Foncier Individuel Émis</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Conservation Foncière de Bir Mourad Raïs (Alger). Numéro de volume et folio contrôlés.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-md bg-surface-container-low rounded-lg">
<span className="material-symbols-outlined text-secondary text-title-lg mt-0.5">domain_verification</span>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Certificat de Conformité Urbanisme</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Permis d'habiter délivré par l'APC d'Hydra. Alignements réglementaires et gabarits validés.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-md bg-surface-container-low rounded-lg">
<span className="material-symbols-outlined text-secondary text-title-lg mt-0.5">workspace_premium</span>
<div>
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Mandat Exclusif Notifié</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Commercialisation encadrée sous protocole de discrétion totale pour acquéreurs qualifiés.</p>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold flex items-center gap-space-xs pb-space-sm">
<span className="material-symbols-outlined text-secondary">architecture</span>
            Description Architecturale &amp; Art de Vivre
          </h2>
<div className="font-body-md text-body-md text-on-surface-variant space-y-space-md leading-relaxed mt-space-sm" id="prop-long-description">
<p>
              Située au cœur du secteur le plus discret et sécurisé d'Hydra, à proximité immédiate des représentations diplomatiques, cette résidence contemporaine d'exception représente le summum du raffinement architectural méditerranéen contemporain.
            </p>
<p>
              Dès le hall monumental habillé de marbre Calacatta d'Italie et offrant une spectaculaire hauteur sous plafond de 3,40 mètres, la demeure captive par la pureté de ses lignes et sa luminosité zénithale. Le vaste espace de réception traversant de 140 m² s'efface devant des baies vitrées coulissantes motorisées à rupture de pont thermique, ouvrant de plain-pied sur une terrasse ombragée et un miroir d'eau turquoise.
            </p>
<p>
              Le premier étage distribue 4 suites spacieuses, dont une somptueuse master suite de 45 m² dotée d'une double terrasse privative, d'un dressing sur mesure en noyer d'Amérique et d'une salle de bain entièrement revêtue de pierre naturelle avec baignoire balnéo îlot. Le dernier niveau abrite un espace de détente exclusif, salon cigare et bureau panoramique ouvrant sur le golfe d'Alger.
            </p>
</div>
<div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md mt-space-lg pt-space-lg bg-surface-container-low/50 p-space-md rounded-lg text-body-sm">
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Hauteur sous plafond</span>
<span className="font-semibold text-on-surface">3,40 mètres</span>
</div>
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Orientation</span>
<span className="font-semibold text-on-surface">Plein Sud • Traversant</span>
</div>
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Année de livraison</span>
<span className="font-semibold text-on-surface">2023 (Neuf / Jamais habité)</span>
</div>
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Niveaux bâtis</span>
<span className="font-semibold text-on-surface">R+2 + Sous-sol aménagé</span>
</div>
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Diagnostic éco-énergétique</span>
<span className="font-semibold text-on-surface">Classe A+ (Double isolation)</span>
</div>
<div>
<span className="text-outline block font-label-sm text-label-sm uppercase">Disponibilité</span>
<span className="font-semibold text-secondary">Immédiate sur acte</span>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
<div className="flex items-center gap-space-xs pb-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-md">tune</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Équipements de Pointe &amp; Autonomie Complète</h2>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Conception premium pensée pour un confort absolu et une sérénité permanente en toutes circonstances.</p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-lg">
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">water_drop</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Bâche à Eau 20 000 Litres</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Réserve enterrée avec filtration UV 3 étages et double groupe de surpression redondant.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">bolt</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Groupe Électrogène 45 kVA</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Triphasé insonorisé avec commutateur de transfert automatique en cas de coupure réseau.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">pool</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Piscine à Débordement Chauffée</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Bassin 12x5m traitement au sel, pompe à chaleur inverter et volet immergé sécurisé.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">nest_thermostat</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">VRV Gainable &amp; Chauffage au Sol</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Thermostats indépendants par zone, climatisation invisible intégrée aux faux-plafonds.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">shield</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Sécurité Diplomatique &amp; Guérite</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Poste de garde extérieur vitré blindé, caméras 4K vision nocturne et clôture périmétrique laser.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">elevator</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Ascenseur Otis 6 Personnes</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Cabine panoramique verre et laiton brossé desservant du sous-sol au toit terrasse.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">hot_tub</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Espace Spa &amp; Hammam Traditionnel</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Hammam en marbre de Tlemcen, ciel étoilé fibre optique et sauna finlandais en cèdre.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm bg-surface-container-low rounded-lg">
<div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0 text-secondary">
<span className="material-symbols-outlined">smart_toy</span>
</div>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Domotique Intégrale KNX</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Pilotage smartphone des scénarios d'éclairage, occultants, sono Bose intégrée et arrosage.</p>
</div>
</div>
</div>
</section>

<section className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm">
<div className="flex flex-wrap items-center justify-between gap-space-xs pb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-headline-md">explore</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-semibold">Emplacement &amp; Proximités</h2>
</div>
<span className="font-label-sm text-label-sm text-outline-variant uppercase">Périmètre confidentiel préservé</span>
</div>
<div className="relative w-full h-80 rounded-xl overflow-hidden mt-space-md shadow-sm">
<div className="w-full h-full bg-cover bg-center" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDejiPmuLJ0tBTK7P6rpoQqjmHP4racwGoU2_i44Mt0pSzpKWO7pWWZxvgCi6iOn4JdIu-QGv8RK38TFRe87dW_xy7kmAelx0tdWqhSErYm8-VZpJ-1efANVyCHOVGv4UxE4oWQsTi02i9KD76tSqVlg34UCNvh_6JEHFv3ptzxlLy2Rwiye4eyIy6Sr7_pgtXhPDMNnX1RHqeCeFqmc45XNvyKCKosr2P9D5URXbWv6KyQtO9i3Ak')" }}>
<div className="w-full h-full bg-primary-container/20 flex flex-col items-center justify-center text-center p-space-md">
<div className="w-16 h-16 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xl animate-pulse">
<span className="material-symbols-outlined text-headline-md">villa</span>
</div>
<div className="mt-space-sm bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-space-xs rounded-full shadow-md">
<span className="font-label-md text-label-md font-bold text-on-surface" id="map-label">Hydra Quartier Résidentiel • Alger</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm mt-space-md pt-space-xs">
<div className="p-space-sm bg-surface-container-low rounded text-center">
<span className="material-symbols-outlined text-secondary text-title-lg">account_balance</span>
<span className="font-title-md text-title-md font-bold text-on-surface block mt-1">3 min</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Ambassades &amp; Consulats</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded text-center">
<span className="material-symbols-outlined text-secondary text-title-lg">school</span>
<span className="font-title-md text-title-md font-bold text-on-surface block mt-1">5 min</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Lycée International</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded text-center">
<span className="material-symbols-outlined text-secondary text-title-lg">apartment</span>
<span className="font-title-md text-title-md font-bold text-on-surface block mt-1">20 min</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Bab Ezzouar Business</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded text-center">
<span className="material-symbols-outlined text-secondary text-title-lg">flight_takeoff</span>
<span className="font-title-md text-title-md font-bold text-on-surface block mt-1">25 min</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Aéroport Houari Boumediene</span>
</div>
</div>
</section>
</main>

<aside aria-label="Contact et prise de rendez-vous" className="lg:col-span-4 sticky top-36 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md">

<div className="flex items-center gap-space-md pb-space-md">
<div className="relative shrink-0">
<img className="w-16 h-16 rounded-full object-cover shadow-sm ring-2 ring-secondary-container" data-alt="Portrait professionnel de luxe d'un conseiller immobilier de prestige Prime House en Algérie, costume sur mesure italien, élégant, souriant avec assurance." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWJ4UNZURZOjk-yrz9iNN0mvaEuGPe9-C1ro7Q7TSwYJ0RWtqEoJuTmKH5gEdMPyr9IJQOP53lqh6x3KN9BRqtppULGyi-MXdAnjO9uNkb-_qMMSzbQvo6dGedHjakmbsR3jgfxnuQz-5uMyP8KUmRYQXP7tiR3D40xHiqC14ylHdIBv88GncJN_sB258GbmEuuyDCCnMaVTo45MEGpi_JHhU8avqTCwdOIBJRgtL7kV19274Wrd8"/>
<div className="absolute -bottom-1 -right-1 bg-secondary text-surface rounded-full p-0.5 shadow-sm">
<span className="material-symbols-outlined text-xs">verified</span>
</div>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Conseiller Mandaté</span>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold leading-snug">Karim Benali</h3>
<span className="font-body-sm text-body-sm text-on-surface-variant">Directeur Associé — Pôle Prestige</span>
</div>
</div>

<div className="flex flex-col gap-space-xs mt-space-sm">
<a className="w-full py-space-sm px-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded font-semibold text-center transition-all duration-200 flex items-center justify-center gap-space-xs shadow-sm" href="tel:+21323456789">
<span className="material-symbols-outlined text-title-md">call</span>
<span>Appeler (+213 23 45 67 89)</span>
</a>
<a className="w-full py-space-sm px-space-md bg-[#25D366] hover:bg-[#20ba59] text-surface font-label-lg text-label-lg rounded font-semibold text-center transition-all duration-200 flex items-center justify-center gap-space-xs shadow-sm" href="https://wa.me/213560123456?text=Bonjour,%20je%20souhaite%20des%20renseignements%20pour%20le%20bien%20PH-ALG-104" target="_blank">
<WhatsAppIcon className="w-5 h-5" colored={false} fill="white" />
<span>Échanger sur WhatsApp</span>
</a>
</div>
<div className="relative my-space-md flex items-center justify-center">
<div className="w-full bg-surface-container-high h-px"></div>
<span className="absolute bg-surface-container-lowest px-space-sm font-label-sm text-label-sm text-outline uppercase tracking-wider">ou formulaire confidentiel</span>
</div>

<form className="flex flex-col gap-space-sm" id="contact-booking-form" >
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="lead-fullname">Nom et Prénom *</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="lead-fullname" placeholder="Ex : M. Amin Mansouri" required="" type="text"/>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-space-sm">
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="lead-phone">Téléphone mobile (+213) *</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="lead-phone" placeholder="05 / 06 / 07 XX XX XX" required="" type="tel"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="lead-email">Adresse email privée *</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="lead-email" placeholder="contact@domaine.com" required="" type="email"/>
</div>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="lead-date">Date souhaitée pour visite privée</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="lead-date" type="date"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1" htmlFor="lead-message">Demande personnalisée</label>
<textarea className="w-full px-space-sm py-2 rounded bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:bg-surface-container-lowest shadow-sm" id="lead-message" rows="3">Bonjour M. Benali, je souhaite organiser une visite privée pour cette propriété réf. PH-ALG-104 et recevoir le dossier cadastral complet.</textarea>
</div>
<div className="flex items-center gap-space-xs pt-1">
<input checked="" className="w-4 h-4 rounded text-secondary focus:ring-0" id="check-whatsapp" type="checkbox"/>
<label className="font-body-sm text-body-sm text-on-surface-variant cursor-pointer" htmlFor="check-whatsapp">Recevoir également la documentation par WhatsApp</label>
</div>
<button className="w-full mt-space-xs py-space-sm px-space-md bg-primary-container text-surface hover:bg-on-surface font-label-lg text-label-lg rounded font-semibold transition-all shadow-md flex items-center justify-center gap-space-xs" id="btn-submit-lead" type="submit">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">send</span>
<span>Demander une visite privée</span>
</button>
</form>
<div className="mt-space-md pt-space-sm flex items-center gap-space-xs text-outline text-[12px]">
<span className="material-symbols-outlined text-sm">lock_person</span>
<span>Confidentialité absolue. Vos données ne sont jamais partagées. Aucun compte nécessaire.</span>
</div>
</div>

<div className="bg-surface-container p-space-md rounded-xl text-on-surface shadow-sm">
<div className="flex items-center gap-space-xs mb-1">
<span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
<span className="font-title-md text-title-md font-semibold">Financement &amp; Notariat</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">Accompagnement bancaire en Algérie, transferts de devises diaspora, et prise en charge des formalités d'enregistrement notarié.</p>
<a className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-bold mt-space-xs hover:underline" href="#">
<span>Consulter notre guide de l'investisseur</span>
<span className="material-symbols-outlined text-sm">arrow_forward</span>
</a>
</div>
</aside>
</div>

<section aria-label="Biens similaires recommandés" className="mt-space-xl pt-space-xl">
<div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm mb-space-lg">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Collections Voisines</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">Propriétés Similaires Recommandées</h2>
</div>
<a className="inline-flex items-center gap-1 font-label-lg text-label-lg text-on-surface hover:text-secondary transition-colors font-semibold group" href="#">
<span>Explorer tout le secteur</span>
<span className="material-symbols-outlined text-title-md transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
<div>
<div className="relative h-56 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Duplex haut standing moderne à Hydra avec large balcon et vue panoramique dégagée sur les collines d'Alger, finitions marbre et grandes ouvertures vitrées." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-OLvQYa7NLeYb0pE0tAguJ0CoJyPoXR-gKeBgD0lsGF6NThJeOLhRZk39HTrM9kuFqeOEpCoFHKMOVkX_P3LUxH3yd5Nz9NuHDmRdBAg_GsFpIfedB1G2S7SfS0aYGUbvWeTk4FSVbaXx5raxBFmb1yQ5bcvsCrXZ9hNs86NsTl-r2RQjUvfpUywJRq8YTfrjJxtL_UI1xXZ54dDoYtR1k5ZkrUAOLdcmykUs7Y0djkCFTJltj68"/>
<div className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-on-surface font-label-sm text-label-sm font-semibold">À Vendre</div>
<button aria-label="Favori" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="p-space-md">
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Hydra • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 truncate">Duplex Panoramique Plein Ciel</h3>
<div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant mt-space-xs">
<span>280 m²</span>
<span>•</span>
<span>5 Pièces</span>
<span>•</span>
<span>3 SDB</span>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between mt-space-xs">
<div>
<span className="font-currency-display text-title-lg font-bold text-on-surface">88 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-1">DA</span>
</div>
<button className="px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"  type="button">
              Voir la fiche
            </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
<div>
<div className="relative h-56 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Magnifique villa de maître néo-mauresque rénovée avec grand belvédère sur la baie d'Alger à El Biar, jardin luxuriant avec orangers et fontaine en faïence traditionnelle." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVHxNc5bzsNlYhBOisj1C8JirxMVDudGVMKZGb6m3yfLY6v0p-8wGdylNlXpJ_v8Njf95onxjvZVEF24LWmSXqgC1tUCUEYPWES7wliRTJWsbOEwlkArgGM_ET2LxoJ4aw2IC_IXhf6Rb5Q58Xk8X83OndNqP3SkG3Z8dUxbbSf0aLIwWksyTfWFFQyV5DnrjMmCM20iIhfOJIGsfy5DOTzHNuwpwiD1uPaOVQ7H6XL6keCG2FQH0"/>
<div className="absolute top-2 left-2 bg-primary-container text-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold uppercase">Exclusif</div>
<button aria-label="Favori" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="p-space-md">
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">El Biar • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 truncate">Villa de Maître avec Belvédère</h3>
<div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant mt-space-xs">
<span>540 m²</span>
<span>•</span>
<span>7 Pièces</span>
<span>•</span>
<span>5 SDB</span>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between mt-space-xs">
<div>
<span className="font-currency-display text-title-lg font-bold text-on-surface">130 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-1">DA</span>
</div>
<button className="px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"  type="button">
              Voir la fiche
            </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
<div>
<div className="relative h-56 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Penthouse moderne et raffiné avec immense terrasse en teck suspendue au-dessus de la ville, pergolas bioclimatique et spa jacuzzi à Poirson Alger." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwZWEEZUE54JjGe2JT83LSvWXi22O371U-fHjlC1no_upJsHMJxli3h0WmleeBdOwzijnMb50Xe0FMX_A61DBbMkaj1N0nDAPxC-rTHfxaY8yEJ76WVlAlAbjb0g4xLqWVXTnXvt19Gne02yggSMz2yHmmuY_CjlpGoletyiZNKjwhxnuB8QQnjanAAY4yffBuXBBcMOv0NnEvd9aXjXZZspzT-NQebk4rLaufAmYC34Vc9zVWTLI"/>
<div className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-on-surface font-label-sm text-label-sm font-semibold">À Vendre</div>
<button aria-label="Favori" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="p-space-md">
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Poirson • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 truncate">Penthouse Terrasse Plein Ciel</h3>
<div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant mt-space-xs">
<span>320 m²</span>
<span>•</span>
<span>4 Pièces</span>
<span>•</span>
<span>3 SDB</span>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between mt-space-xs">
<div>
<span className="font-currency-display text-title-lg font-bold text-on-surface">95 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-1">DA</span>
</div>
<button className="px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"  type="button">
              Voir la fiche
            </button>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col justify-between">
<div>
<div className="relative h-56 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Villa contemporaine d'ambassadeur de très haute sécurité à Chéraga, architecture cubique moderne en verre et béton blanc, grand parc arboré et piscine olympique." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqpRMhDuQVuZG7IBIwYT-YEdNdDVvIllX1Ga2Ddkik0XXV-23zT2ZPLCmYWjkSZs6qqGV408YkPr-7Vrl7SGHlxm6GctQsZ6218Uykh2rxUfdhZ8DIRyoX8jb3TX2wCi48dZ9GBOHt0OZsKuvxwf44Eb9BUiYhZeeKkx_txihQzSmtuqA42Y2zvjGxY_ujsic7B-yT9AlQsBfClG7_skbL0XUc3LDr2Ouezj-7gZCKCew2kxZKm8g"/>
<div className="absolute top-2 left-2 bg-surface-container-lowest/90 backdrop-blur-sm px-2 py-0.5 rounded text-on-surface font-label-sm text-label-sm font-semibold">À Vendre</div>
<button aria-label="Favori" className="absolute top-2 right-2 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm" type="button">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<div className="p-space-md">
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Chéraga • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1 truncate">Villa Ambassadeur &amp; Parc</h3>
<div className="flex items-center gap-space-sm text-body-sm text-on-surface-variant mt-space-xs">
<span>710 m²</span>
<span>•</span>
<span>9 Pièces</span>
<span>•</span>
<span>6 SDB</span>
</div>
</div>
</div>
<div className="p-space-md pt-0 flex items-center justify-between mt-space-xs">
<div>
<span className="font-currency-display text-title-lg font-bold text-on-surface">145 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold ml-1">DA</span>
</div>
<button className="px-space-sm py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-colors"  type="button">
              Voir la fiche
            </button>
</div>
</div>
</div>
</section>
</div>

<div className="fixed inset-0 z-50 bg-primary-container/95 backdrop-blur-xl hidden flex-col justify-between p-space-md md:p-space-xl" id="photo-lightbox">

<div className="flex items-center justify-between text-surface max-w-7xl mx-auto w-full">
<div className="flex items-center gap-space-md">
<span className="font-headline-sm text-headline-sm font-semibold tracking-wide" id="lb-title">Villa Contemporaine — Hydra</span>
<span className="bg-surface/20 text-surface font-label-sm text-label-sm px-space-sm py-1 rounded" id="lb-counter">1 / 5</span>
</div>
<button aria-label="Fermer la galerie" className="w-10 h-10 rounded-full bg-surface/10 hover:bg-surface/20 flex items-center justify-center text-surface transition-colors"  type="button">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
</div>

<div className="relative flex-1 flex items-center justify-center max-w-6xl mx-auto w-full my-space-md">
<button aria-label="Image précédente" className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-lowest flex items-center justify-center shadow-xl transition-all"  type="button">
<span className="material-symbols-outlined text-headline-md">arrow_back_ios_new</span>
</button>
<div className="max-h-[768px] w-full flex items-center justify-center overflow-hidden rounded-xl">
<img className="max-h-[737px] max-w-full object-contain rounded shadow-2xl transition-all duration-300" data-alt="Photographie de prestige haute définition en plein écran d'une résidence de luxe à Alger." id="lb-active-image" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxGEUQZP2ltcslUtZVaR0VBANe2Dog61-HBwAPNdI1b1J_VQ7MAVUTfO6Ac7sV-dVIxc2M9hdTTduhkulMWzjeLKJs5gd47U3hY5UIYp_PEIfMi6-SbBTXlIk5yoE2vBn1iNsTZLjrK94iOdQ0739oCaxQ-cpCuWh4OzwhJQBbWth9EP-vK_hd9MFXr8ledfr93cTdY29tCnL-JhqeQS66S23vsyScBqmLeZ1USiVpF607UpgTMH4"/>
</div>
<button aria-label="Image suivante" className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-lowest flex items-center justify-center shadow-xl transition-all"  type="button">
<span className="material-symbols-outlined text-headline-md">arrow_forward_ios</span>
</button>
</div>

<div className="max-w-4xl mx-auto w-full text-center text-surface">
<p className="font-body-md text-body-md text-surface-container-highest mb-space-sm" id="lb-caption">Façade principale &amp; Piscine à débordement plein sud</p>
<div className="flex items-center justify-center gap-space-xs overflow-x-auto pb-1" id="lb-thumbs-container">

</div>
</div>
</div>

<div className="fixed inset-0 z-50 bg-primary-container/80 backdrop-blur-sm hidden items-center justify-center p-space-md" id="share-modal">
<div className="bg-surface-container-lowest rounded-xl max-w-md w-full p-space-lg shadow-2xl relative">
<button className="absolute top-space-md right-space-md text-on-surface-variant hover:text-on-surface"  type="button">
<span className="material-symbols-outlined text-headline-sm">close</span>
</button>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Partage Confidentiel</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">Partager ce mandat d'exception</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Transmettez la documentation détaillée de cette propriété en un clic.</p>
<div className="mt-space-md flex items-center gap-space-xs bg-surface-container-low p-2 rounded">
<input className="bg-transparent font-body-sm text-body-sm text-on-surface w-full focus:outline-none" id="share-link-input" readOnly="" type="text" value="https://primehouse-dz.com/nos-biens/PH-ALG-104"/>
<button className="px-space-md py-1.5 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-sm text-label-sm rounded font-bold transition-colors shrink-0"  type="button">
          Copier
        </button>
</div>
<div className="flex items-center justify-center gap-space-md mt-space-lg pt-space-sm">
<button className="flex flex-col items-center gap-1 text-on-surface hover:text-[#25D366] transition-colors"  type="button">
<div className="w-11 h-11 rounded-full bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
<span className="material-symbols-outlined">chat</span>
</div>
<span className="font-label-sm text-label-sm">WhatsApp</span>
</button>
<button className="flex flex-col items-center gap-1 text-on-surface hover:text-secondary transition-colors"  type="button">
<div className="w-11 h-11 rounded-full bg-secondary-container/30 text-secondary flex items-center justify-center">
<span className="material-symbols-outlined">mail</span>
</div>
<span className="font-label-sm text-label-sm">Email</span>
</button>
</div>
</div>
</div>

<div className="fixed bottom-6 right-6 z-50 bg-primary-container text-surface px-space-lg py-space-sm rounded-lg shadow-2xl transform translate-y-24 opacity-0 transition-all duration-300 flex items-center gap-space-sm max-w-md pointer-events-none" id="toast-notify">
<span className="material-symbols-outlined text-secondary-fixed text-headline-sm" id="toast-icon">check_circle</span>
<div>
<h4 className="font-title-md text-title-md font-semibold leading-tight text-surface" id="toast-title">Demande transmise avec succès</h4>
<p className="font-body-sm text-body-sm text-on-primary-container leading-snug mt-0.5" id="toast-msg">Notre concierge vous contactera sous 2 heures ouvrées.</p>
</div>
</div>
</div>

</main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function bien_detailPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
