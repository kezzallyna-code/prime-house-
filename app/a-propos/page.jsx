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

<section className="relative w-full overflow-hidden bg-primary-container text-on-primary">

<div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity scale-105 transition-transform duration-1000 ease-out" data-alt="Modern Algerian luxury villa overlooking the bay of Algiers, clean modernist white concrete cantilevered architecture, floor-to-ceiling glass, serene Mediterranean palm trees and subtle golden sunlight, muted navy and warm limestone hues, refined architectural photography shot on medium format." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCK-rCvGv_6OWDtWhos5lY2da5VyNWGmyYJU8HVZp9FOfZaASSfDn0uP66cfpzNsl-v0noB_1XjReurb2za_NlohvwQvwMV5DVq11lXksE9QrFi20GCY56mPEI9XeBUtcglH8dgrUiSGloSe3OOQ1vilc0SzQ6TFDrZfG2yQhN-cBu9u5-bmsyQCkKGUOZU3o-y-6hmlMWW4MpkdNNURcGrxDWSBPXVGpcfpbsPA1BkxQJ8gGAG_pQ')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-r from-primary-container via-primary-container/95 to-primary-container/70"></div>

<div className="relative max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-20 md:py-28 lg:py-36">
<div className="max-w-3xl flex flex-col gap-space-lg">
<div className="space-y-space-sm">
<h1 className="font-headline-xl text-headline-xl md:text-display font-semibold tracking-tight leading-tight text-on-primary">
            Prime House, votre partenaire immobilier en Algérie
          </h1>
<p className="font-headline-sm text-headline-sm text-secondary-fixed italic font-normal">
            Votre bien, notre priorité.
          </p>
</div>
<p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl leading-relaxed">
          Prime House est la plateforme de référence dédiée à l'accompagnement des acquéreurs, locataires et propriétaires à travers l'Algérie. Nous simplifions la découverte de biens immobiliers d'exception et facilitons une mise en relation transparente et directe.
        </p>
<div className="flex flex-wrap items-center gap-space-md pt-space-sm">
<a className="inline-flex items-center justify-center gap-space-sm px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded transition-all shadow-md hover:-translate-y-0.5" href="#services">
<span>Explorer nos services</span>
<span className="material-symbols-outlined text-title-md">arrow_forward</span>
</a>
<a className="inline-flex items-center justify-center gap-space-sm px-space-lg py-space-sm bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-on-primary font-label-lg text-label-lg rounded backdrop-blur-sm transition-all" href="#couverture">
<span className="material-symbols-outlined text-title-md text-secondary-fixed">place</span>
<span>Nos wilayas actives</span>
</a>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 lg:py-28">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-5 relative">
<div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/5] bg-surface-container">
<div className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105" data-alt="Interior of a luminous contemporary Algerian penthouse in Hydra Algiers with minimalist high-end furnishings, warm travertine marble floors, soft beige drapery, sunlit balcony showing Algiers cityscape, subtle brass architectural details." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlRkDPyBgjC90rtjd9JPoOaJOihhFVp_3WBMxq5UcH_u7UU1QLsrT79tdSyfMCqIctVCxru975bpYea5IzpWwwkjVqCKXZnADHHdKAkQZa6W2CcO6brVYiz0Qvxmz4QlsW0qAy0d-RQZJx4kCGIRto_IPbj6th6cuVdSLZc3h9y_zp5kouQz9kDDO0rW9p-GvBdflTSjAElgaEJNsfjKEW_AoX_03W_Cxlt21Ne0HVL80F0Osyc7E')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent"></div>
<div className="absolute bottom-0 left-0 right-0 p-space-lg text-on-primary">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed">Clarté &amp; Exigence</span>
<p className="font-headline-sm text-headline-sm mt-space-xs font-semibold">Une vision saine de l'immobilier algérien</p>
</div>
</div>

<div className="absolute -bottom-6 -right-4 sm:-right-8 bg-surface-container-lowest p-space-lg rounded-lg shadow-xl max-w-xs hidden sm:block">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-headline-sm">verified_user</span>
</div>
<div>
<p className="font-title-md text-title-md font-semibold text-on-surface">Zéro artifice</p>
<p className="font-body-sm text-body-sm text-on-surface-variant">Annonces contrôlées et prix justes en Dinars</p>
</div>
</div>
</div>
</div>

<div className="lg:col-span-7 flex flex-col gap-space-md lg:pl-gutter">
<div className="inline-flex items-center gap-space-xs">
<span className="h-px w-8 bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Notre raison d'être</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            Notre mission
          </h2>
<p className="font-body-lg text-body-lg text-on-surface leading-relaxed mt-space-xs">
            Rendre la recherche immobilière plus simple, plus transparente et accessible à travers toutes les wilayas d’Algérie, en proposant des annonces claires et vérifiables sans promesses exagérées.
          </p>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Face à un marché fragmenté et souvent opaque, Prime House rétablit un cadre de sérénité. Nous ne nous limitons pas à répertorier des mètres carrés : nous vérifions les coordonnées, présentons des visuels fidèles à la réalité et fournissons les critères indispensables à vos prises de décision patrimoniales et familiales.
          </p>

<div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md pt-space-lg">
<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
<div className="text-secondary mb-space-xs">
<span className="material-symbols-outlined text-headline-md">map</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg font-semibold text-on-surface">Couverture</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Multi-wilayas ciblées : Alger, Oran, Mitidja et Est.</p>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
<div className="text-secondary mb-space-xs">
<span className="material-symbols-outlined text-headline-md">handshake</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg font-semibold text-on-surface">Direct</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Mise en relation directe avec propriétaires et conseillers certifiés.</p>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-lg flex flex-col justify-between">
<div className="text-secondary mb-space-xs">
<span className="material-symbols-outlined text-headline-md">fact_check</span>
</div>
<div>
<h3 className="font-title-lg text-title-lg font-semibold text-on-surface">Catalogue</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Fiches d'annonces exhaustives, photographies réelles et prix explicites.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-low py-20 lg:py-28" id="services">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Expertise &amp; Solutions</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mt-space-xs">
          Nos domaines d'accompagnement
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
          Un soutien sur-mesure répondant à chaque typologie de projet résidentiel ou professionnel sur le territoire national.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">

<div className="group bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
<div className="space-y-space-md">
<div className="w-14 h-14 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center group-hover:bg-primary-container group-hover:text-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-headline-md">real_estate_agent</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Achat immobilier</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Accompagnement dans l’acquisition de résidences principales, secondaires ou investissements locatifs avec analyse des quartiers et de la valorisation future.
              </p>
</div>
</div>
<div className="pt-space-lg mt-space-md">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface font-semibold transition-colors" data-path="acheter" href="/biens?mode=vente">
<span>Explorer les biens à vendre</span>
<span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>

<div className="group bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
<div className="space-y-space-md">
<div className="w-14 h-14 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center group-hover:bg-primary-container group-hover:text-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-headline-md">key</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Location immobilière</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Large sélection de locations meublées et non meublées, baux résidentiels et corporatifs haut standing conçus pour expatriés et professionnels exigeants.
              </p>
</div>
</div>
<div className="pt-space-lg mt-space-md">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface font-semibold transition-colors" data-path="louer" href="/louer">
<span>Trouver une location</span>
<span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>

<div className="group bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
<div className="space-y-space-md">
<div className="w-14 h-14 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center group-hover:bg-primary-container group-hover:text-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-headline-md">storefront</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Vente de biens</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Diffusion ciblée et valorisation de votre patrimoine auprès d’acheteurs qualifiés. Mise en scène visuelle et accompagnement jusqu'à l'acte authentique.
              </p>
</div>
</div>
<div className="pt-space-lg mt-space-md">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface font-semibold transition-colors" data-path="deposer-une-annonce" href="/deposer-annonce">
<span>Estimer et vendre</span>
<span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>

<div className="group bg-surface-container-lowest rounded-xl p-space-xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
<div className="space-y-space-md">
<div className="w-14 h-14 rounded-lg bg-surface-container-low text-on-surface flex items-center justify-center group-hover:bg-primary-container group-hover:text-secondary-fixed transition-colors">
<span className="material-symbols-outlined text-headline-md">apartment</span>
</div>
<div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Mise en location</h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-sm leading-relaxed">
                Sélection rigoureuse de candidats locataires, constitution du dossier juridique et mise en valeur soignée pour maximiser votre rendement sereinement.
              </p>
</div>
</div>
<div className="pt-space-lg mt-space-md">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary hover:text-on-surface font-semibold transition-colors" data-path="deposer-une-annonce" href="/deposer-annonce">
<span>Confier un bien en location</span>
<span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
</a>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 lg:py-28">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="max-w-2xl mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Nos Engagements</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mt-space-xs">
          Pourquoi choisir Prime House ?
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
          Une démarche reposant sur la clarté technique, l'intégrité et une écoute adaptée à chaque réalité locale.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-lg">

<div className="flex items-start gap-space-lg p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span className="font-headline-sm text-headline-sm font-bold text-secondary">01</span>
</div>
<div className="space-y-space-xs">
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Une expérience de recherche simple</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Outils de filtrage rapides et intuitifs spécialement calibrés pour le marché algérien : sélection par wilaya, quartier précis, typologie (villa, duplex, plateau de bureaux) et standing.
            </p>
</div>
</div>

<div className="flex items-start gap-space-lg p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span className="font-headline-sm text-headline-sm font-bold text-secondary">02</span>
</div>
<div className="space-y-space-xs">
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Des annonces avec des informations détaillées</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Fiches complètes comprenant caractéristiques précises, surfaces réelles habitables et utiles, statut juridique clair, photographies fidèles et prix sans équivoque libellés en Dinars Algériens (DA).
            </p>
</div>
</div>

<div className="flex items-start gap-space-lg p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span className="font-headline-sm text-headline-sm font-bold text-secondary">03</span>
</div>
<div className="space-y-space-xs">
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Des biens dans différentes wilayas</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Une présence équilibrée dans les grands centres économiques et diplomatiques, sur la côte méditerranéenne ainsi que dans les wilayas clés de l'intérieur du pays en plein essor.
            </p>
</div>
</div>

<div className="flex items-start gap-space-lg p-space-lg rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-shadow">
<div className="w-12 h-12 rounded bg-surface-container-high text-on-surface flex items-center justify-center shrink-0">
<span className="font-headline-sm text-headline-sm font-bold text-secondary">04</span>
</div>
<div className="space-y-space-xs">
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-surface">Un accompagnement orienté vers les besoins du client</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Une écoute attentive pour orienter chaque projet vers la solution la plus adaptée, qu'il s'agisse d'un foyer cherchant sa résidence familiale ou d'un investisseur de la diaspora préparant un retour au pays.
            </p>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-primary-container text-on-primary py-20 lg:py-28 relative overflow-hidden">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg relative z-10">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold">Simplicité d'Usage</span>
<h2 className="font-headline-xl text-headline-xl text-on-primary font-semibold tracking-tight mt-space-xs">
          Comment fonctionne la plateforme ?
        </h2>
<p className="font-body-md text-body-md text-on-primary-container mt-space-xs">
          Trois phases transparentes pour concrétiser votre démarche en toute fluidité.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-gutter relative">

<div className="bg-surface-container-lowest/5 rounded-xl p-space-xl backdrop-blur-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-lg">
<span className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-bold flex items-center justify-center">1</span>
<span className="material-symbols-outlined text-secondary-fixed text-headline-md">search</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-primary mb-space-sm">
              Recherchez votre bien
            </h3>
<p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
              Parcourez notre catalogue selon vos critères spécifiques : localisation par wilaya, budget en dinars algériens, typologie, jardin, vue mer ou équipements de confort.
            </p>
</div>
<div className="mt-space-lg pt-space-sm">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">Étape 01 • Filtrage rapide</span>
</div>
</div>

<div className="bg-surface-container-lowest/5 rounded-xl p-space-xl backdrop-blur-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-lg">
<span className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-bold flex items-center justify-center">2</span>
<span className="material-symbols-outlined text-secondary-fixed text-headline-md">tune</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-primary mb-space-sm">
              Découvrez et comparez
            </h3>
<p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
              Consultez les caractéristiques techniques complètes, les galeries photos haute résolution, la localisation approximative et comparez les prestations offertes en toute quiétude.
            </p>
</div>
<div className="mt-space-lg pt-space-sm">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">Étape 02 • Analyse transparente</span>
</div>
</div>

<div className="bg-surface-container-lowest/5 rounded-xl p-space-xl backdrop-blur-sm flex flex-col justify-between">
<div>
<div className="flex items-center justify-between mb-space-lg">
<span className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm font-bold flex items-center justify-center">3</span>
<span className="material-symbols-outlined text-secondary-fixed text-headline-md">contact_phone</span>
</div>
<h3 className="font-headline-sm text-headline-sm font-semibold text-on-primary mb-space-sm">
              Contactez directement
            </h3>
<p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
              Échangez sans intermédiaire opaque avec les propriétaires ou conseillers attitrés via appel téléphonique direct ou messagerie instantanée pour planifier votre visite sur site.
            </p>
</div>
<div className="mt-space-lg pt-space-sm">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">Étape 03 • Contact sans détour</span>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface py-20 lg:py-28" id="couverture">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">

<div className="lg:col-span-6 flex flex-col gap-space-md">
<div className="inline-flex items-center gap-space-xs">
<span className="h-px w-8 bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Ancrage Territorial</span>
</div>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            Présence à travers les wilayas d'Algérie
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Notre réseau couvre les grands pôles métropolitains, les quartiers les plus recherchés pour leur qualité de vie ainsi que les zones économiques stratégiques.
          </p>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">

<div className="p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-xs text-on-surface mb-space-xs">
<span className="material-symbols-outlined text-secondary text-title-md">location_city</span>
<h4 className="font-title-md text-title-md font-semibold">Alger &amp; Métropole</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Hydra, El Biar, Chéraga, Sidi Yahia, Poirson, Ben Aknoun, Zéralda...
              </p>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-xs text-on-surface mb-space-xs">
<span className="material-symbols-outlined text-secondary text-title-md">sailing</span>
<h4 className="font-title-md text-title-md font-semibold">Oran &amp; Littoral Ouest</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Canastel, Akid Lotfi, Front de Mer, Millénium, Aïn El Turk...
              </p>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-xs text-on-surface mb-space-xs">
<span className="material-symbols-outlined text-secondary text-title-md">landscape</span>
<h4 className="font-title-md text-title-md font-semibold">Région Centre &amp; Mitidja</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Blida, Boumerdès et sa bande littorale, Tipaza, Koléa...
              </p>
</div>

<div className="p-space-md rounded-lg bg-surface-container-low">
<div className="flex items-center gap-space-xs text-on-surface mb-space-xs">
<span className="material-symbols-outlined text-secondary text-title-md">domain</span>
<h4 className="font-title-md text-title-md font-semibold">Est Algérien</h4>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Constantine, Béjaïa, Sétif, Annaba et zones en expansion...
              </p>
</div>
</div>

<div className="flex items-center gap-space-sm p-space-sm rounded bg-surface-container-high/60 mt-space-sm">
<span className="material-symbols-outlined text-title-md text-secondary">info</span>
<p className="font-label-sm text-label-sm text-on-surface-variant italic">
              Présentation de nos secteurs d'activité prioritaires et zones en cours d'expansion.
            </p>
</div>
</div>

<div className="lg:col-span-6 relative">
<div className="relative rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">

<div className="w-full h-96 lg:h-[480px] bg-cover bg-center rounded-xl" data-location="Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6uVvh2Zgm2__g0uJawXwE4ZRd-81R4b4xxkvvQE6rnBrFz3YYmu4R2uz2ipTYm_VxVIzTB5ecIqvxDSBa4lk9jX3_Cl7Y2_oDkdXeMxqC7wGgjYv7SRzzsCg1bvJ0SPg_CCswxT4gh-qQERo_vURL9WZtrRUGxOkivvglp0Ftviw4bSpc4j2N9xt4FNXqbs_J0e9lkjFJ6Akl2JnycWvtHh5ZxcBf9zudA1NzFuHfQNseVAUXwF4')" }}>
</div>

<div className="absolute top-4 left-4 bg-surface-container-lowest/95 backdrop-blur-md px-space-md py-space-sm rounded-lg shadow-md flex items-center gap-space-sm">
<span className="w-3 h-3 rounded-full bg-secondary"></span>
<span className="font-label-md text-label-md font-semibold text-on-surface">Pôle National d'Orientation</span>
</div>
<div className="absolute bottom-4 right-4 bg-primary-container text-on-primary px-space-md py-space-xs rounded font-label-sm text-label-sm shadow-md">
              Wilayas 16 • 31 • 09 • 35 • 25
            </div>
</div>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface pb-20 lg:pb-28">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="relative rounded-2xl overflow-hidden bg-primary-container text-on-primary p-space-xl md:p-20 shadow-2xl">

<div className="absolute -right-20 -bottom-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-secondary/10 to-transparent pointer-events-none"></div>
<div className="relative max-w-2xl flex flex-col gap-space-md z-10">
<div className="inline-flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary-container"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold">Commencer dès aujourd'hui</span>
</div>
<h2 className="font-headline-xl text-headline-xl md:text-display font-semibold tracking-tight text-on-primary leading-tight">
            Votre prochain projet immobilier commence ici.
          </h2>
<p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
            Que vous souhaitiez louer, acheter ou faire estimer votre bien, notre équipe et notre catalogue sont à votre entière disposition.
          </p>
<div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-md">

<a className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded transition-all duration-200 shadow-md hover:-translate-y-0.5" data-path="nos-biens" href="/biens">
<span className="material-symbols-outlined text-title-md">search</span>
<span>Découvrir nos biens</span>
</a>

<a className="inline-flex items-center justify-center gap-space-sm px-space-xl py-space-md bg-transparent hover:bg-surface-container-lowest/10 text-on-primary font-label-lg text-label-lg rounded transition-all duration-200" data-path="contact" href="/contact">
<span className="material-symbols-outlined text-title-md text-secondary-fixed">mail</span>
<span>Nous contacter</span>
</a>
</div>
</div>
</div>
</div>
</section>
</div>
</main>
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
