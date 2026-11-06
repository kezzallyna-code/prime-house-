'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';

function PageContent() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">

<section className="w-full bg-surface-container-lowest shadow-sm">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm">

<nav className="flex items-center flex-wrap gap-space-xs font-label-md text-label-md text-on-surface-variant">
<a className="hover:text-secondary transition-colors" href="/">Accueil</a>
<span className="text-outline">/</span>
<a className="hover:text-secondary transition-colors" href="#">Nos Biens</a>
<span className="text-outline">/</span>
<a className="hover:text-secondary transition-colors" href="#">Alger</a>
<span className="text-outline">/</span>
<a className="hover:text-secondary transition-colors font-medium" href="#">Hydra</a>
<span className="text-outline">/</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-semibold">RÉF: PH-2024-089</span>
</nav>

<div className="flex items-center gap-space-sm relative">
<div className="relative">
<button className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded transition-all" id="shareBtn">
<span className="material-symbols-outlined text-title-md text-secondary">share</span>
<span>Partager</span>
</button>
<div className="hidden absolute right-0 mt-space-xs w-56 bg-surface-container-lowest rounded shadow-xl p-space-xs z-30" id="shareDropdown">
<button className="w-full flex items-center gap-space-sm px-space-sm py-space-xs text-left hover:bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface transition-colors" >
<span className="material-symbols-outlined text-title-md text-secondary">content_copy</span>
<span>Copier le lien</span>
</button>
<a className="w-full flex items-center gap-space-sm px-space-sm py-space-xs text-left hover:bg-surface-container-low rounded font-body-sm text-body-sm text-on-surface transition-colors" href="https://wa.me/?text=Découvrez%20cette%20somptueuse%20villa%20à%20Hydra%20sur%20Prime%20House" target="_blank">
<span className="material-symbols-outlined text-title-md text-secondary">chat</span>
<span>WhatsApp</span>
</a>
</div>
</div>
<button className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded transition-all" id="favoriteBtn">
<span className="material-symbols-outlined text-title-md text-secondary" id="favIcon">favorite_border</span>
<span id="favText">Favori</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm rounded transition-all" >
<span className="material-symbols-outlined text-title-md text-secondary">picture_as_pdf</span>
<span className="hidden md:inline">Fiche PDF</span>
</button>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg w-full">
<div className="relative grid grid-cols-1 lg:grid-cols-4 gap-space-sm h-[420px] sm:h-[520px] lg:h-[580px] rounded-xl overflow-hidden shadow-md">

<div className="lg:col-span-2 relative group overflow-hidden cursor-pointer h-full">
<img alt="Villa d'architecte contemporaine avec piscine Hydra Alger" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Modern luxury architect villa in Hydra Algiers with minimalist white cantilevered concrete slabs, expansive floor-to-ceiling glass Schuco apertures, an illuminated turquoise infinity lap pool reflecting dusk skies, Mediterranean olive trees, manicured lawn, warm architectural LED lighting, ultra-luxury aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr5SHkKqnYvIEXAkSrLqr1XQhOLJHFN2vs8KhwYk8U6pjbP_ydAE8Jo2O4oLN5RuqjU9bVqJQsKkaX0nTMoS1OG12A-ibImDJbpe3Q8dItT-O_eu88kc_S6Uz13GBmPt3-pjyWMblMLZjdklP5QxNdSUhMoHHOZlIXrgceMsZ1M7DIANWNqqo3qgHKri8k9st4XqhXnGEjU6VfJKEjWNaNT-vloT50O-fpNKvEb9y7PnB44jga4hg"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
<div className="absolute bottom-space-lg left-space-lg text-surface">
<span className="px-space-sm py-space-xs bg-primary-container/90 text-secondary-fixed rounded font-label-sm text-label-sm uppercase tracking-wider backdrop-blur-md">Perspective Principale</span>
<h2 className="font-headline-md text-headline-md mt-space-xs drop-shadow-sm font-semibold">Façade Contemporaine &amp; Piscine à Débordement</h2>
</div>
</div>

<div className="relative group overflow-hidden cursor-pointer hidden sm:block h-full">
<img alt="Salon lumineux marbre de Carrare" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Sunlit expansive luxury living salon featuring Italian Calacatta white marble slab flooring, designer brass accents, architectural oak panelling, bespoke beige leather lounge chairs, view through massive bay windows onto a verdant Mediterranean garden in Algiers." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy853sfY6XbBIoI_q6hhS6HzTu7ocmBZWqFfk5hBL_X2vYZnyoLe_iOmS1_HKFakmzFR57cRcnQv87vUJK_U0cPLPIXBhB7tg6NmovTEdHmXRwOkcyKpc-uYwHt9rAaG4_uXgvxl0oh5n3sDOQN126uYOYz9Q36sJBDOs-fBvmnAgBEg1yvOFTdLnTTkDVtxd4rc0ArovQxXerfMPAUbYS6jSzjTJ55VLiA47Hm-nLpmBG5AAlMIg"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-space-md left-space-md font-label-sm text-label-sm text-surface bg-primary-container/70 px-space-sm py-0.5 rounded backdrop-blur-sm">Grand Salon Marbré</span>
</div>

<div className="relative group overflow-hidden cursor-pointer hidden sm:block h-full">
<img alt="Cuisine italienne équipée sur mesure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Poliform Italian designer kitchen with dark monolithic quartz central island, hidden handleless smoked oak cabinetry, integrated high-end Miele appliances, minimalist brushed bronze pendant lamps, warm ambient backlight." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3__5ngIMddrbYh2a6KzPt7DyDi9qPGV4FUx2IK_CkGSMHtcHhnUMsSbBFsF4OK_W5pF2epupA4Hbv7OPeAkQbbcPRXGfQukgHCb2MHqQscucpGCBMPLKcfNJo5dXznS9qOWvHLK3iphP3CcYDfF4eetCZ3fBlsAsSxi2PCngNswzmDgv9iaQVfShuypMJrTXDX594ZpO28cTw6DVfWo7w-NaoDmkgZP5v6av4EbMLvrtkJRzEWDQ"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-space-md left-space-md font-label-sm text-label-sm text-surface bg-primary-container/70 px-space-sm py-0.5 rounded backdrop-blur-sm">Cuisine Haute Facture</span>
</div>

<div className="relative group overflow-hidden cursor-pointer hidden lg:block h-full">
<img alt="Suite parentale de maître" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Prestigious master suite bedroom featuring panoramic glass opening onto private upper terrace, engineered herringbone parquet floor, upholstered velvet headboard, custom walk-in dressing room visible through fluted glass partitions." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBvvpDUMhNLA9Pze97jd4boqwflL4_9bWcNymc-VVB8oTOn9yAa02opys0BmCm5EkaKO7GVlXAfNAx5WP7Ddc-ZD9zGbZ_u_FKB5TQxlkUmK4LUGjtI4PvMcbhX1_pEoP_BRxzm0fHzDgzdJTYjvFxgUGscAHmotl5rxGXO3egJa0BcumNvy0HUIbL9V6ihOt-TepfS2LnZi1KYYSZ0UJSJsFzOb1kYGYWYVAhZsCLAXOXAbJ8NKI"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-space-md left-space-md font-label-sm text-label-sm text-surface bg-primary-container/70 px-space-sm py-0.5 rounded backdrop-blur-sm">Suite de Maître</span>
</div>

<div className="relative group overflow-hidden cursor-pointer hidden lg:block h-full">
<img alt="Terrasse avec vue panoramique coucher de soleil Alger" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" data-alt="Upper cantilevered terrace with frameless glass balustrade overlooking panoramic sunset view over Hydra hills and the distant turquoise bay of Algiers, sleek outdoor lounge furniture, champagne cooler, golden hour lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsIbqb1u1qPSvXXQeullgi3CqFEA_DKyXFQ3iQAwabEcqw__bcTx2fNELNGrFl5gF6V4xoD4DnLSKjq33JyXbhBLdUtWAz9w8UdVyZ2PTgwgYKWuJqyFni1xNJ-jP_E4ahICtnNGidc8JDHLEcvK2l8QHDBCEreGz8au_vglKQIALVFFEMTUf_OuksHxFLfU9lk3a4ICHCEyERrEM69R9x9NYw2F0Jz-n5U0kB5rJcQ3LHLhygec0"/>
<div className="absolute inset-0 bg-primary-container/30 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-space-md left-space-md font-label-sm text-label-sm text-surface bg-primary-container/70 px-space-sm py-0.5 rounded backdrop-blur-sm">Terrasse Panoramique</span>
</div>

<div className="absolute bottom-space-md right-space-md flex flex-wrap gap-space-xs z-20">
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-surface-container-lowest/90 hover:bg-surface-container-lowest text-on-surface backdrop-blur-md rounded font-label-lg text-label-lg shadow-lg transition-transform hover:-translate-y-0.5">
<span className="material-symbols-outlined text-secondary">photo_library</span>
<span>Voir les 24 photos (HD)</span>
</button>
<button className="inline-flex items-center gap-space-xs px-space-md py-space-sm bg-primary-container text-surface hover:bg-on-surface rounded font-label-lg text-label-lg shadow-lg transition-transform hover:-translate-y-0.5">
<span className="material-symbols-outlined text-secondary-fixed">view_in_ar</span>
<span>Visite 3D &amp; Visio</span>
</button>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-xl w-full">
<div className="bg-surface-container-lowest rounded-xl shadow-md p-space-lg md:p-space-xl">
<div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
<div className="flex-1">

<div className="flex flex-wrap items-center gap-space-xs mb-space-sm">
<span className="px-space-md py-space-xs rounded bg-primary-container text-surface font-label-sm text-label-sm uppercase font-semibold">À Vendre</span>
<span className="px-space-md py-space-xs rounded bg-surface-container text-secondary font-label-sm text-label-sm uppercase font-semibold">Exclusivité Prime House</span>
<span className="inline-flex items-center gap-1 px-space-md py-space-xs rounded bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
<span className="material-symbols-outlined text-sm">verified</span>
              Acte Notarié &amp; Livret Foncier
            </span>
</div>

<h1 className="font-headline-xl text-headline-xl text-on-surface font-bold tracking-tight">
            Villa d'Architecte 8 Pièces avec Piscine &amp; Jardin Paysager
          </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-title-lg">location_on</span>
            Val d'Hydra, Alger — Secteur Résidentiel et Diplomatique Hautement Sécurisé
          </p>
</div>

<div className="flex flex-col items-start lg:items-end bg-surface-container-low lg:bg-transparent p-space-md lg:p-0 rounded-lg">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Prix de Présentation</span>
<div className="flex items-baseline gap-space-xs">
<span className="font-currency-display text-4xl lg:text-5xl text-on-surface font-extrabold tracking-tight">165 000 000</span>
<span className="font-currency-display text-secondary text-2xl font-bold">DA</span>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
            Négociable selon modalités de règlement • Frais d'agence inclus
          </span>
</div>
</div>

<div className="mt-space-xl pt-space-lg bg-surface-container-low rounded-lg p-space-lg grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-md text-center">
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">crop_free</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">720 m²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Terrain Total</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">home</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">540 m²</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Superficie Habitable</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">bed</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">5</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Chambres (3 Suites)</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">bathtub</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">5</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Salles d'Eau</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">stairs</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">R+2</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">3 Niveaux</span>
</div>
<div className="flex flex-col items-center">
<span className="material-symbols-outlined text-secondary text-headline-sm mb-1">directions_car</span>
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">4 Places</span>
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase mt-1">Garage Sécurisé</span>
</div>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl w-full">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">

<div className="lg:col-span-8 flex flex-col gap-space-xl">

<article className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">
<div className="flex items-center gap-space-sm mb-space-md">
<span className="w-1.5 h-6 bg-secondary rounded-full"></span>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Une Signature Architecturale Singulière</h3>
</div>
<div className="font-body-md text-body-md text-on-surface space-y-space-md leading-relaxed">
<p>
              Implantée au cœur du prestigieux quartier du Val d’Hydra, cette résidence contemporaine livrée fin 2023 incarne le summum du raffinement architectural méditerranéen. Conçue par un cabinet d'architecture international de renom, la propriété déploie des volumes monumentaux baignés de lumière grâce à une exposition plein Sud sans vis-à-vis et une conception transversale optimisant les flux d’air naturels.
            </p>
<p>
              Le rez-de-chaussée s’ouvre sur une réception magistrale de 140 m² habillée de dalles en marbre de Carrare grand format, ponctuée de boiseries murales sur-mesure en chêne teinté. Les baies vitrées coulissantes motorisées à rupture thermique Schüco s’effacent entièrement pour fusionner harmonieusement l'espace de vie avec la terrasse en teck et la piscine à débordement de 11x4 mètres.
            </p>
<p>
              Au premier niveau, l’espace nuit propose trois suites d'exception, chacune dotée de dressings privatifs en noyer et de salles d’eau parées de robinetteries encastrées Dornbracht. Le dernier étage abrite la suite de maître traversante s'ouvrant sur un solarium végétalisé offrant un panorama dégagé sur les collines d’Hydra et les scintillements de la baie d’Alger.
            </p>
<p>
              Le niveau inférieur a été pensé pour le bien-être absolu : véritable hammam traditionnel algérien en tadelakt et mosaïque, salle de sport climatisée, cave à dégustation climatisée, ainsi qu'un appartement indépendant réservé au personnel de maison avec accès privatif.
            </p>
</div>

<div className="mt-space-lg p-space-lg bg-surface-container-low rounded-lg flex items-start gap-space-md">
<span className="material-symbols-outlined text-secondary text-headline-lg flex-shrink-0">format_quote</span>
<div>
<h4 className="font-title-md text-title-md font-semibold text-on-surface">L'Avis du Conseiller Prestige Prime House</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant italic mt-1">
                « Un bien d’une rareté absolue sur Hydra. La perfection de la construction antisismique aux normes Eurocode, le choix des finitions d’importation et son emplacement discret à proximité immédiate des missions consulaires en font une adresse convoitée par le corps diplomatique et les capitaines d’industrie. »
              </p>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">
<div className="flex items-center justify-between mb-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-1.5 h-6 bg-secondary rounded-full"></span>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Prestations &amp; Équipements de Pointe</h3>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Haute Performance</span>
</div>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-space-md">

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">ac_unit</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Climatisation Gainable</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Système VRV Daikin zoné par pièce indépendant.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">waves</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Chauffage au Sol</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Plancher chauffant basse consommation hydraulique.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">bolt</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Groupe 40 kVA</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Générateur insonorisé avec inverseur automatique.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">water_drop</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Citerne 15 000 Litres</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Double bâche, surpresseur Grundfos &amp; filtration UV.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">security</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Sécurité &amp; CCTV</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">12 caméras 4K périmétriques &amp; capteurs volumétriques.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">smart_toy</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Domotique KNX</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Pilotage à distance éclairages, stores &amp; sonorisation.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">pool</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Piscine Chauffée</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Débordement miroir, traitement au sel automatisé.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">hot_tub</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Hammam Traditionnel</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Tadelakt artisanal, générateur de vapeur Harvia.</p>
</div>
</div>

<div className="p-space-md bg-surface-container-low rounded-lg flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm flex-shrink-0">badge</span>
<div>
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Logement Gardien</h5>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Studio complet indépendant avec kitchenette &amp; sanitaires.</p>
</div>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">
<div className="flex items-center gap-space-sm mb-space-md">
<span className="w-1.5 h-6 bg-secondary rounded-full"></span>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Dossier Juridique &amp; Foncier Conforme</h3>
</div>
<p className="font-body-md text-body-md text-on-surface-variant mb-space-lg">
            Tous les documents légaux ont fait l’objet d’un audit approfondi par notre cellule notariale partenaire. Le bien est libre de toute hypothèque ou servitude restrictive.
          </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex items-center justify-between p-space-md bg-surface-container rounded-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">assignment_turned_in</span>
<div>
<h6 className="font-title-md text-title-md font-semibold text-on-surface">Acte Notarié Individuel</h6>
<span className="font-label-sm text-label-sm text-on-surface-variant">Enregistré à la conservation foncière</span>
</div>
</div>
<span className="px-space-xs py-0.5 bg-surface-container-lowest text-secondary font-label-sm text-label-sm rounded font-bold">Vérifié</span>
</div>
<div className="flex items-center justify-between p-space-md bg-surface-container rounded-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">menu_book</span>
<div>
<h6 className="font-title-md text-title-md font-semibold text-on-surface">Livret Foncier</h6>
<span className="font-label-sm text-label-sm text-on-surface-variant">Délivré et purgé de recours</span>
</div>
</div>
<span className="px-space-xs py-0.5 bg-surface-container-lowest text-secondary font-label-sm text-label-sm rounded font-bold">Conforme</span>
</div>
<div className="flex items-center justify-between p-space-md bg-surface-container rounded-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">fact_check</span>
<div>
<h6 className="font-title-md text-title-md font-semibold text-on-surface">Certificat de Conformité</h6>
<span className="font-label-sm text-label-sm text-on-surface-variant">APC de Hydra — Décembre 2023</span>
</div>
</div>
<span className="px-space-xs py-0.5 bg-surface-container-lowest text-secondary font-label-sm text-label-sm rounded font-bold">Validé</span>
</div>
<div className="flex items-center justify-between p-space-md bg-surface-container rounded-lg">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-lg">architecture</span>
<div>
<h6 className="font-title-md text-title-md font-semibold text-on-surface">Permis de Construire</h6>
<span className="font-label-sm text-label-sm text-on-surface-variant">Plans architecte &amp; génie civil disponibles</span>
</div>
</div>
<span className="px-space-xs py-0.5 bg-surface-container-lowest text-secondary font-label-sm text-label-sm rounded font-bold">Complet</span>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-sm">
<div className="flex items-center justify-between mb-space-md">
<div className="flex items-center gap-space-sm">
<span className="w-1.5 h-6 bg-secondary rounded-full"></span>
<h3 className="font-headline-md text-headline-md font-bold text-on-surface">Emplacement &amp; Commodités Voisines</h3>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant">Hydra, Wilaya d'Alger</span>
</div>

<div className="w-full h-80 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex flex-col justify-end p-space-md" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC9ZgXSsoPgvNOIrNuyehSPL5fZLl_6F8mFTZMssEDTSL8vOZFKuwZC3l-QslDLg4qBCGrkJexj2C--ufS4dCK2ayNP9KxYnyA0gVAJarHZzR7bjn9ReML5UCqKG_OLAWNzhL2T5j_gtrVuVDJRSz_2HqNm5H_L8Lc4RttfVPtRY0ghAuOKiDwO9k2o5gkGLn9TIl4q6_58DF6S6IBy2RoT8uuzgE4tTb2gfJz66vuDq1EllZ1lmKQ')" }}>

<div className="bg-surface-container-lowest/95 backdrop-blur-md p-space-md rounded-lg shadow-xl max-w-sm">
<div className="flex items-center gap-space-xs">
<span className="w-3 h-3 rounded-full bg-secondary animate-ping"></span>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold">Positionnement Privé</span>
</div>
<p className="font-title-md text-title-md font-semibold text-on-surface mt-1">Val d'Hydra Supérieur</p>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Adresse exacte communiquée après confirmation de rendez-vous confidentiel.</p>
</div>
</div>

<div className="mt-space-lg grid grid-cols-2 md:grid-cols-4 gap-space-sm">
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="font-currency-display text-xl text-secondary font-bold">3 min</span>
<p className="font-body-sm text-body-sm text-on-surface font-semibold mt-1">Quartier Sidi Yahia</p>
<span className="font-label-sm text-label-sm text-on-surface-variant">Boutiques &amp; Gastronomie</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="font-currency-display text-xl text-secondary font-bold">5 min</span>
<p className="font-body-sm text-body-sm text-on-surface font-semibold mt-1">Ambassades &amp; Consulat</p>
<span className="font-label-sm text-label-sm text-on-surface-variant">Périmètre sécurisé</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="font-currency-display text-xl text-secondary font-bold">7 min</span>
<p className="font-body-sm text-body-sm text-on-surface font-semibold mt-1">Écoles Internationales</p>
<span className="font-label-sm text-label-sm text-on-surface-variant">Campus d'excellence</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="font-currency-display text-xl text-secondary font-bold">20 min</span>
<p className="font-body-sm text-body-sm text-on-surface font-semibold mt-1">Aéroport Houari Boumediene</p>
<span className="font-label-sm text-label-sm text-on-surface-variant">Accès direct rocade Sud</span>
</div>
</div>
</article>
</div>

<aside className="lg:col-span-4 flex flex-col gap-space-lg lg:sticky lg:top-24">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xl relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-secondary via-secondary-container to-secondary"></div>

<div className="flex items-center gap-space-md pt-space-xs">
<div className="relative">
<img alt="Sofiane Benali - Directeur Pôle Prestige" className="w-16 h-16 rounded-full object-cover shadow-md" data-alt="Distinguished handsome Algerian luxury real estate advisor in tailored navy blazer, crisp white shirt, warm confident smile, studio executive lighting against architectural warm stone backdrop." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYp6T6bUCgL6-4H3pU1rBpNJD1cDyT_NkEPCvY51u7enipvy-d2ZkoSCX0cOR0l-ASMkWA2D4nOK1lxl-D2b_6W59iUfDo7_Ima5aW6y_1BYjHadMbbqOnjGmmPrByulgewamfoMJrBlb0gaeS3YBvALx8bgD0blBBPKLOBReIl4lyooH6YaVFH2qPduOjv2iZDNr0KWGnR51O80ZwoU6sSwmscWzwBzH9Zj_3VfJ_MrxkrtS3dqg"/>
<span className="absolute bottom-0 right-0 w-5 h-5 bg-secondary text-surface rounded-full flex items-center justify-center text-[10px]" title="Conseiller Agréé">
<span className="material-symbols-outlined text-xs">verified</span>
</span>
</div>
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Votre Conseiller Dédié</span>
<h4 className="font-title-lg text-title-lg font-bold text-on-surface">Sofiane Benali</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Directeur Pôle Prestige Alger</p>
</div>
</div>

<div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg flex items-center justify-between">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">phone_in_talk</span>
<span className="font-title-md text-title-md font-bold text-on-surface">+213 (0) 560 12 34 56</span>
</div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">Direct</span>
</div>

<a className="mt-space-md w-full inline-flex items-center justify-center gap-space-sm px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container rounded font-label-lg text-label-lg font-bold transition-all shadow-md hover:-translate-y-0.5" href="https://wa.me/213560123456?text=Bonjour%20Sofiane,%20je%20souhaite%20obtenir%20des%20informations%20concernant%20la%20villa%20Réf%20PH-2024-089%20à%20Hydra." target="_blank">
<span className="material-symbols-outlined text-title-lg">chat</span>
<span>Contacter sur WhatsApp</span>
</a>

<form className="mt-space-lg flex flex-col gap-space-sm" id="visiteForm" >
<h5 className="font-title-md text-title-md font-semibold text-on-surface">Planifier une Visite Privée</h5>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Nom &amp; Prénom</label>
<input className="w-full px-space-md py-space-xs rounded bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="M. ou Mme Nom..." required="" type="text"/>
</div>
<div className="grid grid-cols-2 gap-space-xs">
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Téléphone</label>
<input className="w-full px-space-md py-space-xs rounded bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="05 / 06 / 07..." required="" type="tel"/>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Date souhaitée</label>
<input className="w-full px-space-md py-space-xs rounded bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" type="date"/>
</div>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Email personnel</label>
<input className="w-full px-space-md py-space-xs rounded bg-surface-container-low text-on-surface text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all" placeholder="contact@domaine.com" required="" type="email"/>
</div>
<div>
<label className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Message d'accompagnement</label>
<textarea className="w-full px-space-md py-space-xs rounded bg-surface-container-low text-on-surface text-body-sm focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all resize-none" rows="3">Bonjour, je souhaite convenir d'une visite discrète pour la Villa Val d'Hydra (Réf: PH-2024-089).</textarea>
</div>
<button className="mt-space-xs w-full py-space-sm bg-primary-container text-surface hover:bg-on-surface rounded font-label-lg text-label-lg font-semibold transition-colors shadow-sm" type="submit">
              Envoyer la Demande Confidentielle
            </button>
<p className="font-label-sm text-label-sm text-center text-on-surface-variant">
              🔒 Discrétion assurée. Vos coordonnées restent strictement confidentielles.
            </p>
</form>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md">
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary">calculate</span>
<h4 className="font-title-md text-title-md font-bold text-on-surface">Simulateur de Financement</h4>
</div>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Banques Algériennes</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            Estimation indicative à titre informatif (durée 20 ans, taux indicatif 5.75%).
          </p>
<div className="space-y-space-sm">
<div>
<div className="flex justify-between font-label-sm text-label-sm text-on-surface mb-1">
<span>Apport Personnel</span>
<span className="font-bold text-secondary" id="downPaymentValue">30% (49 500 000 DA)</span>
</div>
<input className="w-full accent-secondary bg-surface-container rounded-lg cursor-pointer h-2" id="downPaymentRange" max="60" min="20" type="range" value="30"/>
</div>
<div className="p-space-md bg-surface-container rounded-lg flex flex-col items-center text-center">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase">Mensualité Estimée</span>
<div className="flex items-baseline gap-space-xs mt-1">
<span className="font-currency-display text-3xl font-extrabold text-on-surface" id="monthlyPayment">815 000</span>
<span className="font-currency-display text-secondary text-lg font-bold">DA / mois</span>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Montant emprunté : ~115 500 000 DA</span>
</div>
<button className="w-full py-space-xs bg-surface-container-low hover:bg-surface-container text-on-surface rounded font-label-sm text-label-sm font-semibold transition-colors">
              Être mis en relation avec notre pôle bancaire
            </button>
</div>
</div>
</aside>
</div>
</section>

<section className="w-full bg-surface-container-low py-space-xl">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-space-sm mb-space-xl">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">Sélection Privée</span>
<h3 className="font-headline-lg text-headline-lg font-bold text-on-surface mt-space-xs">
            Propriétés Comparables à Découvrir
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant">Demeures et penthouses d'exception situés à Hydra et El Biar.</p>
</div>
<a className="inline-flex items-center gap-space-xs font-label-lg text-label-lg text-secondary hover:text-on-secondary-container font-semibold transition-colors" href="#">
<span>Explorer le catalogue Alger</span>
<span className="material-symbols-outlined text-title-md">arrow_forward</span>
</a>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
<div className="relative h-64 overflow-hidden">
<img alt="Hôtel Particulier avec Piscine El Biar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Stately modern neo-classical villa facade in El Biar Algiers, wrought iron automated gate, lush palm trees, outdoor jacuzzi, illuminated limestone entrance steps, twilight atmosphere." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNSUgnRaZSSp5jjwhR6afLsPUYfeZebTkW0bEU5HYTpj8MFylI4Mgfu3cRXZErnB_9z2HnwaiN3_Y4ogtXGVoeZpKrEb0s03Kmd3BE6qIRgtIBqWp1GJwWfMol3Zg7JyMblqD01oFdNIr4WXzxcCLZtFOV7yMCmK_wJS9SGesNCKlExr5_v1zRPjR12-kJqJBGAubIhDaZfPipIawAo72zWL2RQDMw3nWmXQNKjf0FRkNlmsL-WVw"/>
<div className="absolute top-space-sm left-space-sm">
<span className="px-space-sm py-space-xs bg-surface-container-lowest/90 backdrop-blur-md rounded text-on-surface font-label-sm text-label-sm font-semibold">À Vendre</span>
</div>
<div className="absolute top-space-sm right-space-sm">
<button aria-label="Favori" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary shadow-md transition-colors">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<span className="absolute bottom-space-sm left-space-sm bg-primary-container/80 text-surface text-label-sm px-space-sm py-0.5 rounded backdrop-blur-sm">Réf: PH-2024-041</span>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">EL BIAR • ALGER</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 group-hover:text-secondary transition-colors line-clamp-1">
                Hôtel Particulier avec Vue Baie &amp; Jardin
              </h4>
<div className="mt-space-md pt-space-sm border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bed</span> 6 Ch.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bathtub</span> 6 Sdb.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">square_foot</span> 620 m²</span>
</div>
</div>
<div className="mt-space-lg pt-space-sm border-t border-surface-container flex items-baseline justify-between">
<div>
<span className="font-currency-display text-2xl text-on-surface font-extrabold">185 000 000</span>
<span className="font-currency-display text-secondary text-base font-bold">DA</span>
</div>
<a className="font-label-sm text-label-sm text-secondary uppercase font-bold hover:underline" href="#">Consulter</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
<div className="relative h-64 overflow-hidden">
<img alt="Penthouse Duplex Rooftop Hydra" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Ultra-luxury duplex penthouse in Hydra Algiers with private rooftop infinity plunge pool, glass balustrade overlooking city lights, teak decking, outdoor fireplace and designer bar." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDoBHUtuNcat1-zZihXo_7PaEevJGeh-EemNXgzgp4Xz-hn6VBAeTxoNB-aTz10aensEGKtJEoP6zeASeG5qSqTUo_CIL7TH5Lpqb_xKoA_3O4AODbmLWBVffqd63nun6J-B-n2X-7tg-p2GQw9h1v9lO2QMPkXy8D_vR7VDkD5Zef4_nYAl8Z-4D-xLO_7nbpbgLq5d-UuyzNEL02eWsX5n_8yVWP9mkWZ5nGQ4NKG-Q3x8HwI5Bw"/>
<div className="absolute top-space-sm left-space-sm">
<span className="px-space-sm py-space-xs bg-primary-container text-surface rounded font-label-sm text-label-sm font-semibold">Exclusivité</span>
</div>
<div className="absolute top-space-sm right-space-sm">
<button aria-label="Favori" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary shadow-md transition-colors">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<span className="absolute bottom-space-sm left-space-sm bg-primary-container/80 text-surface text-label-sm px-space-sm py-0.5 rounded backdrop-blur-sm">Réf: PH-2024-077</span>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">HYDRA • SIDI YAHIA</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 group-hover:text-secondary transition-colors line-clamp-1">
                Duplex Penthouse Sommet &amp; Plunge Pool
              </h4>
<div className="mt-space-md pt-space-sm border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bed</span> 4 Suites</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bathtub</span> 4 Sdb.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">square_foot</span> 410 m²</span>
</div>
</div>
<div className="mt-space-lg pt-space-sm border-t border-surface-container flex items-baseline justify-between">
<div>
<span className="font-currency-display text-2xl text-on-surface font-extrabold">138 000 000</span>
<span className="font-currency-display text-secondary text-base font-bold">DA</span>
</div>
<a className="font-label-sm text-label-sm text-secondary uppercase font-bold hover:underline" href="#">Consulter</a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
<div className="relative h-64 overflow-hidden">
<img alt="Demeure de Maître Quartier Poirson El Biar" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" data-alt="Prestigious secluded villa in Poirson El Biar, lush enclosed mature botanical garden with fountains, stone terraces, heated swimming pool, modern glass extension, high security stone wall." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGejRurwehMC3GVJJ0bfC-kZ20ovDpQifxjDKpUccN-q03os8hJop_4WI9l-zdatFSac8r1rkvKzUyWxLl7f0kTuohZMx0YfkvvO8DmgPaPKAtPuGEaBTW0VEn7jg6bgumfqjZp1CUvnQlhZ7oxoyq1sFC1CXZG6rsw8mcW3u2_tGU_jBb1BnkxrkJJCdRcCW4evonLfWqrHY91h0e0gyjDKUDVeGlwxqzIyOLd2BS2l45YkQxJe0"/>
<div className="absolute top-space-sm left-space-sm">
<span className="px-space-sm py-space-xs bg-surface-container-lowest/90 backdrop-blur-md rounded text-on-surface font-label-sm text-label-sm font-semibold">À Vendre</span>
</div>
<div className="absolute top-space-sm right-space-sm">
<button aria-label="Favori" className="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-secondary shadow-md transition-colors">
<span className="material-symbols-outlined text-title-md">favorite_border</span>
</button>
</div>
<span className="absolute bottom-space-sm left-space-sm bg-primary-container/80 text-surface text-label-sm px-space-sm py-0.5 rounded backdrop-blur-sm">Réf: PH-2024-094</span>
</div>
<div className="p-space-lg flex-1 flex flex-col justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">EL BIAR • POIRSON</span>
<h4 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 group-hover:text-secondary transition-colors line-clamp-1">
                Propriété Secrète au Cœur d'un Parc Clos
              </h4>
<div className="mt-space-md pt-space-sm border-t border-surface-container flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bed</span> 5 Ch.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">bathtub</span> 4 Sdb.</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-secondary text-sm">square_foot</span> 850 m²</span>
</div>
</div>
<div className="mt-space-lg pt-space-sm border-t border-surface-container flex items-baseline justify-between">
<div>
<span className="font-currency-display text-2xl text-on-surface font-extrabold">210 000 000</span>
<span className="font-currency-display text-secondary text-base font-bold">DA</span>
</div>
<a className="font-label-sm text-label-sm text-secondary uppercase font-bold hover:underline" href="#">Consulter</a>
</div>
</div>
</article>
</div>
</div>
</section>


</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface" />}>
      <PageContent />
    </Suspense>
  );
}
