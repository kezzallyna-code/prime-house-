'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';
import { ALL_WILAYAS } from '@/lib/data';

export default function HomePage() {
  const router = useRouter();
  const [tab, setTab] = useState('acheter');
  const [propertyType, setPropertyType] = useState('all');
  const [wilaya, setWilaya] = useState('all');
  const [budget, setBudget] = useState('all');
  const [bedrooms, setBedrooms] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (propertyType && propertyType !== 'all') params.set('type', propertyType);
    if (wilaya && wilaya !== 'all') params.set('wilaya', wilaya);
    if (budget && budget !== 'all') params.set('budget', budget);
    if (bedrooms && bedrooms !== 'all') params.set('chambres', bedrooms);

    if (tab === 'louer') {
      params.set('mode', 'location');
      router.push(`/louer?${params.toString()}`);
    } else {
      params.set('mode', 'vente');
      router.push(`/biens?${params.toString()}`);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
{/*  1. HERO SECTION  */}
<section className="relative w-full -mt-20 overflow-hidden bg-primary-container text-surface">
{/*  Ambient Luxury Architectural Background  */}
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105" data-alt="Ultra-luxurious modernist villa overlooking the azure Mediterranean sea at sunset in Algiers, architectural limestone walls, illuminated infinity pool reflecting golden warm light, minimalist landscaping with palm trees, deep maritime navy dusk sky with golden glow" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWYGvo35UzjbfbQ9IU3vAQJV1jcIZ_ylHsuPWJigWu41J_dFzaJl88xUbaFuU9Q--z99h0TOK3Fn4AMemhhcqp6CkipYxwGhoOf79Oq_HA2Cxf01Rsn7yGkXM9NPs4AFH9aIkiLvRszLqzbEh4lUC3ckFwvRF1npGtDgxEyHNWSJFtf-wROAwHgj4UMhMPZcMQH1AQSLRYcoCdSK43uHoP91CyKpvX7Z9_fBtfMy4OVh2C3HXsEpU')" }}>
</div>
{/*  Layered Gradient Scrim for Supreme Contrast  */}
<div className="absolute inset-0 bg-gradient-to-b from-primary-container/85 via-primary-container/60 to-primary-container/95 backdrop-blur-[2px]"></div>
<div className="relative max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-36 pb-24 lg:pt-44 lg:pb-32 flex flex-col items-center">
{/*  Main Headline & Subtitle  */}
<h1 className="font-display text-display-mobile md:text-display text-surface text-center max-w-4xl tracking-tight font-headline-xl">
        Trouvez le bien qui vous ressemble
      </h1>
<p className="font-body-lg text-body-lg text-surface-variant text-center max-w-2xl mt-space-md leading-relaxed">
        Découvrez les meilleures opportunités immobilières en Algérie, pour acheter ou louer en toute confiance auprès de nos experts agréés.
      </p>
{/*  Integrated Luxury Search Box Container  */}
<div className="w-full max-w-5xl mt-space-xl bg-surface-container-lowest rounded-xl shadow-2xl p-space-md md:p-space-lg text-on-surface relative z-10">
{/*  Tab Switcher (Acheter / Louer)  */}
<div className="flex items-center gap-space-xs mb-space-lg pb-space-sm">
<div className="inline-flex p-space-xs rounded-full bg-surface-container-low" id="hero-tabs">
<button
  className={`tab-btn px-space-lg py-space-xs rounded-full font-label-lg text-label-lg font-semibold transition-all cursor-pointer ${
    tab === 'acheter'
      ? 'bg-primary-container text-surface shadow-sm'
      : 'text-on-surface-variant hover:text-on-surface'
  }`}
  data-tab="acheter"
  type="button"
  onClick={() => {
    setTab('acheter');
    setBudget('all');
  }}
>
  Acheter
</button>
<button
  className={`tab-btn px-space-lg py-space-xs rounded-full font-label-lg text-label-lg font-semibold transition-all cursor-pointer ${
    tab === 'louer'
      ? 'bg-primary-container text-surface shadow-sm'
      : 'text-on-surface-variant hover:text-on-surface'
  }`}
  data-tab="louer"
  type="button"
  onClick={() => {
    setTab('louer');
    setBudget('all');
  }}
>
  Louer
</button>
</div>
<span className="ml-auto hidden sm:inline-flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-secondary text-base">lock</span>
            Transactions Notariées &amp; Discrétion
          </span>
</div>
{/*  Search Form Grid  */}
<form id="hero-search-form" onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
{/*  Field 1: Type de bien  */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">home_work</span>
              Type de bien
            </label>
<div className="relative">
<select
  value={propertyType}
  onChange={(e) => setPropertyType(e.target.value)}
  className="w-full px-space-md py-space-sm rounded bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none cursor-pointer"
>
<option value="all">Tous types d'actifs</option>
<option value="villa">Villa d'architecte</option>
<option value="penthouse">Penthouse &amp; Duplex</option>
<option value="appartement">Appartement haut standing</option>
<option value="terrain">Terrain constructible</option>
<option value="commercial">Bureaux &amp; Diplomatie</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
{/*  Field 2: Emplacement / Wilaya  */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">location_on</span>
              Wilaya / Quartier
            </label>
<div className="relative">
<select
  value={wilaya}
  onChange={(e) => setWilaya(e.target.value)}
  className="w-full px-space-md py-space-sm rounded bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none cursor-pointer"
>
  <option value="all">Toutes les wilayas (69 wilayas)</option>
  <optgroup label="Pôles Immobiliers Majeurs">
    <option value="alger">16 - Alger (Hydra, El Biar, Sidi Yahia)</option>
    <option value="oran">31 - Oran (Front de Mer, Canastel)</option>
    <option value="constantine">25 - Constantine (Belle Vue, Zouaghi)</option>
    <option value="annaba">23 - Annaba (Séraïdi, Chapuis)</option>
    <option value="blida">09 - Blida (Atlas Résidentiel)</option>
    <option value="boumerdes">35 - Boumerdès &amp; Littoral</option>
    <option value="tipaza">42 - Tipaza &amp; Chenoua</option>
    <option value="bejaia">06 - Béjaïa (Cap Carbon, Tichy)</option>
    <option value="tlemcen">13 - Tlemcen (Mansourah)</option>
    <option value="setif">19 - Sétif (Centre &amp; El Eulma)</option>
  </optgroup>
  <optgroup label="Toutes les 69 Wilayas d'Algérie">
    {ALL_WILAYAS.map((w) => (
      <option key={w.code} value={w.name.toLowerCase()}>
        {w.code} - {w.name}
      </option>
    ))}
  </optgroup>
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
{/*  Field 3: Budget Range  */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">payments</span>
              {tab === 'louer' ? 'Loyer mensuel (DA / mois)' : 'Budget estimé (DA)'}
            </label>
<div className="relative">
<select
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  className="w-full px-space-md py-space-sm rounded bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none cursor-pointer"
>
  {tab === 'louer' ? (
    <>
      <option value="all">Tous loyers</option>
      <option value="100-250">100 000 - 250 000 DA / mois</option>
      <option value="250-500">250 000 - 500 000 DA / mois</option>
      <option value="500-1000">500 000 - 1 000 000 DA / mois</option>
      <option value="1000+">1 000 000 DA+ / mois</option>
    </>
  ) : (
    <>
      <option value="all">Tous budgets</option>
      <option value="15-40">15M - 40M DA</option>
      <option value="40-80">40M - 80M DA</option>
      <option value="80-150">80M - 150M DA</option>
      <option value="150+">150M DA et plus</option>
    </>
  )}
</select>
<span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
</div>
</div>
{/*  Field 4: Pièces + Action Button  */}
<div className="flex flex-col gap-space-xs">
<label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-space-xs">
<span className="material-symbols-outlined text-label-md text-secondary">bed</span>
              Chambres
            </label>
<div className="flex items-center gap-space-xs">
<select
  value={bedrooms}
  onChange={(e) => setBedrooms(e.target.value)}
  className="w-1/2 px-space-sm py-space-sm rounded bg-surface-container-low text-on-surface font-title-md text-title-md appearance-none focus:outline-none cursor-pointer"
>
<option value="all">Toutes</option>
<option value="2">2+</option>
<option value="3">3+</option>
<option value="4">4+</option>
<option value="5">5+</option>
<option value="6">6+</option>
</select>
<button className="w-1/2 h-[46px] rounded bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs shadow-md transition-all hover:scale-[1.02] cursor-pointer" type="submit">
<span className="material-symbols-outlined">search</span>
<span className="hidden sm:inline">Filtrer</span>
</button>
</div>
</div>
</form>
{/*  Quick Tags Ribbon  */}
<div className="flex flex-wrap items-center gap-space-sm mt-space-md pt-space-sm text-on-surface-variant">
<span className="font-label-sm text-label-sm uppercase font-semibold text-secondary">Suggestions rapides :</span>
<button onClick={() => router.push('/biens?type=villa&q=piscine')} className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer" type="button">Villas avec piscine</button>
<button onClick={() => router.push('/biens?wilaya=alger&q=mer')} className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer" type="button">Vue sur mer Alger</button>
<button onClick={() => router.push('/biens?type=appartement&wilaya=alger&chambres=4')} className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer" type="button">Appartements F4 Hydra</button>
<button onClick={() => router.push('/biens?type=terrain')} className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer" type="button">Terrains résidentiels</button>
</div>
</div>
{/*  Trust Metrics Bar  */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mt-space-xl text-center max-w-4xl w-full">
<div className="flex flex-col items-center">
<span className="font-currency-display text-currency-display text-surface font-bold">450+</span>
<span className="font-label-sm text-label-sm text-surface-dim uppercase tracking-wider">Biens Certifiés Notariés</span>
</div>
<div className="flex flex-col items-center">
<span className="font-currency-display text-currency-display text-surface font-bold">18 Mds DA</span>
<span className="font-label-sm text-label-sm text-surface-dim uppercase tracking-wider">Volume de Transactions</span>
</div>
<div className="flex flex-col items-center">
<span className="font-currency-display text-currency-display text-surface font-bold">98.4%</span>
<span className="font-label-sm text-label-sm text-surface-dim uppercase tracking-wider">Satisfaction Mandats VIP</span>
</div>
<div className="flex flex-col items-center">
<span className="font-currency-display text-currency-display text-surface font-bold">14</span>
<span className="font-label-sm text-label-sm text-surface-dim uppercase tracking-wider">Wilayas Couvertes</span>
</div>
</div>
</div>
</section>
{/*  2. FEATURED PROPERTIES ("Nos biens à la une")  */}
<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
{/*  Section Header with Category Chips  */}
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
<div>
<div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm uppercase tracking-widest font-semibold mb-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
          Collection Privée
        </div>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">Nos biens à la une</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
          Sélection exclusive de demeures, penthouses et résidences d'exception sur le territoire algérien.
        </p>
</div>
{/*  Filter Chips  */}
<div className="flex flex-wrap items-center gap-space-xs" id="property-filters">
<button className="filter-chip px-space-md py-space-xs rounded-full bg-primary-container text-surface font-label-md text-label-md font-semibold transition-all shadow-sm"  type="button">Tous (6)</button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container transition-all"  type="button">Alger</button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container transition-all"  type="button">Oran</button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container transition-all"  type="button">Villas</button>
<button className="filter-chip px-space-md py-space-xs rounded-full bg-surface-container-low text-on-surface font-label-md text-label-md font-medium hover:bg-surface-container transition-all"  type="button">Penthouses</button>
</div>
</div>
{/*  6 Property Cards Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg" id="property-grid">
{/*  CARD 1  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="alger" data-type="villa">
{/*  Visual Viewport  */}
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Modern luxury villa in Hydra Algiers with overflowing turquoise swimming pool, manicured private lawn, floor-to-ceiling glass windows and white travertine marble facade during golden hour" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBjrPODfrZ4QVEbC3Ko0as4hsOamloHQIl154NYkQxKDd-7EndiO_5xPei2oJkXDsdQCX9e-INDuXRgqRzdF18qc79L3U0RcCknlnvWVIkxUq6y8Bt9V-ycvYImaaw1KcU554hIGtT7oVcaVd-pQqigYGm9t_SqoYOp_7Z-1dRLGa4oF6N3tLSh-3RVvdhlzyV7GRBSAT47lG7VU9vvkaClUR01KllogAd2p1Mf2qx35ASQbkMvOo"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
{/*  Badges  */}
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-primary-container text-secondary-fixed text-label-sm font-label-sm font-semibold uppercase tracking-wider shadow-sm">Exclusivité</span>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/95 text-on-surface text-label-sm font-label-sm font-bold uppercase shadow-sm">Vente</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">Hydra, Alger</span>
</div>
</div>
{/*  Metadata pad  */}
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Villa Contemporaine &amp; Piscine Débordante
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Havre de paix ultra-sécurisé au cœur du quartier diplomatique d'Hydra. Matériaux nobles et suites parentales avec terrasses.
          </p>
{/*  Specifications Row  */}
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bed</span> 6 ch
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bathtub</span> 5 sdb
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 650 m²
            </span>
</div>
{/*  Price & CTA Footer  */}
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">145 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-villa-hydra">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
{/*  CARD 2  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="alger" data-type="penthouse">
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Ultra-luxurious rooftop penthouse terrace in El Biar overlooking the entire Bay of Algiers, designer lounge furniture, glass railings, sunset sky over the Mediterranean sea" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtzpBiBzH884j6yxjbTG8BGsRe9owcz2dq8ARiCFlZh4z5pP_2wcWVq40AWnjZN8UVWWenzFvsTrGGrn0R47uIIsLGeUilLerFdvixBzmIUcRpj_aQdCZ7cAPLDP0h3JR1Dj_7KPYryxBAdhRuDnJjvrxZDlZ9OQfGmb5n3f-Vyg8OemYC78aWMXT2tl792wmYa3epaN5k8HWRXY0hbw234w1eEV1WkZMft8J5335EUqRxEepxrak"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-secondary-container text-on-secondary-container text-label-sm font-label-sm font-semibold uppercase tracking-wider shadow-sm">Coup de Cœur</span>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/95 text-on-surface text-label-sm font-label-sm font-bold uppercase shadow-sm">Vente</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">El Biar, Alger</span>
</div>
</div>
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Penthouse Vue Baie d'Alger
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Vue plongeante imprenable à 360° sur la baie. Terrasse suspendue de 90 m², ascenseur privatif et finitions italiennes d'exception.
          </p>
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bed</span> 4 ch
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bathtub</span> 3 sdb
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 320 m²
            </span>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">88 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-detail?id=ph-ora-205">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
{/*  CARD 3  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="alger" data-type="penthouse">
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Interior architectural duplex in Sidi Yahia Algiers, double-height ceiling, modern luxury furniture in ivory and gold accents, contemporary chandelier, polished stone flooring" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBH12n4nV3MTkOYvbDZExMAyyGnw9i1j2lx--K2-X5UnBWKRBc3asGpDdaRAsk3A9v1S5v-7sy9uFqHyX3EgApN08xXr_Uup_ZXgzP-_GhKhT8zhsbmTun8i01t10vRUv1dLGTHGXaZ7VbrPVWVG2i-ZOY54bAIMNdPPk3PBxSLq6GBDOe-j7xtzY4uvSZpPRPwgLgiSGzhxrRewiX7RsddjwWLVT1n4oHtl2nfMKzAMowQtRXR7wA"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-primary-container text-surface text-label-sm font-label-sm font-semibold uppercase tracking-wider shadow-sm">Meublé Luxe</span>
<span className="px-space-sm py-space-xs rounded bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-bold uppercase shadow-sm">Location</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">Sidi Yahia, Alger</span>
</div>
</div>
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Duplex Meublé Haut Standing
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Résidence sécurisée avec service conciergerie 24/7. Cuisine équipée Boffi, garage double en sous-sol et suite diplomatique.
          </p>
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bed</span> 3 ch
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bathtub</span> 2 sdb
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 210 m²
            </span>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">380 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA / mois</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-duplex-hydra">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
{/*  CARD 4  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="oran" data-type="villa">
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Spectacular waterfront beachfront modern villa in Ain El Turk Oran with direct beach access, coastal cliffside garden, white pergolas, calm Mediterranean sea under blue sky" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_Yqu_NOdxPg8RxzI4mSlW2ooQvNu6IMGnDVlVuv-ZQA_kX5uTtqclOLGbBt5BU3Uch2ljwW7TcrXlFHcZi3gQ9OMQK2862KvU11MoGb5-rpYa_dryK0xPix1UzWL7OtTt0pi_J7-5kp06NEW_8CoqmcPSBfDaBefs521AdmvjMBgfFBaQo_kJD_-fDT7Mu3KAe3AKdrqbWhutnFylzNITekDUGmA6ivyct5yugq8tT7yciYgboHs"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/95 text-on-surface text-label-sm font-label-sm font-bold uppercase shadow-sm">Vente</span>
<span className="px-space-sm py-space-xs rounded bg-primary-container text-surface-container text-label-sm font-label-sm font-semibold uppercase">Pieds dans l'eau</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">Ain El Turk, Oran</span>
</div>
</div>
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Villa Balnéaire Front de Mer
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Accès direct à une crique privée, solarium panoramique, spa et piscine à débordement suspendue au-dessus des flots.
          </p>
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bed</span> 5 ch
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bathtub</span> 4 sdb
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 500 m²
            </span>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">110 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-detail?id=ph-loc-108">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
{/*  CARD 5  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="boumerdes" data-type="terrain">
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Prime residential coastal building plot in Boumerdes Boudouaou El Bahri with clear boundaries, sea view in background, olive trees and clear architectural building permit landscape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9cHHBrIV_T0yiqKg5ss1d6j8P3mJk0DQ-cJ6h-NZR4KtJNac-O5hfpVaoHU_XBmYAE_EeQlMSAU0uJq4aGHHif3iHyQZmJxHgzc8pVxWEBB-pYBB2D58Ipg-NQkKuKKfqYUn0nqtYXUz0NnrNPz_r57qdStMKKLZqOIQcC1-8tI_-VRm4El4k7VfQZZOQRWySlYWHhIcmlGNKWIGuBCOoXlpMg66BvgstznI5NhSrFehOGyhTHag"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/95 text-on-surface text-label-sm font-label-sm font-bold uppercase shadow-sm">Vente</span>
<span className="px-space-sm py-space-xs rounded bg-secondary-container text-on-secondary-container text-label-sm font-label-sm font-bold uppercase">Acte Notarié + Livret</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">Boudouaou El Bahri, Boumerdès</span>
</div>
</div>
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Terrain Constructible Viabilisé
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Lotissement résidentiel de prestige, vue dégagée sur le golfe. Viabilités complètes (eau, gaz, fibre, électricité). Prêt à bâtir.
          </p>
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">landscape</span> R+2 Autorisée
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">verified_user</span> Certificat conformité
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 850 m²
            </span>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">42 000 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-detail?id=ph-loc-302">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
{/*  CARD 6  */}
<article className="property-card group flex flex-col bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300" data-city="alger" data-type="villa">
<div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Exclusive diplomatic private estate in Club des Pins Algiers with manicured Mediterranean pine garden, modern minimalist architecture, double portico driveway, serene private security gate" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNoxwFPe79m8zMVYQWW7WgqNj-gqJxEMskCsMtjGgqln_MW7E-2q6Cc82vOaETgqh95y2Pap_jDr4Dal9gqtYPxErPS8MyRN5rWZMqlB59_jXKOIbudp5uEQUbsO9UmNf1BW8u6ZprOZrKcANbQc0tSLzfN9IWw3_aVRBF0_GDDkakC0QGUCh9y4ENJsW0xwQlymE8jg6noC5w-ncUD6tU3yZJl6pSwSiVZhmXFubRw27sgySScWM"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-transparent"></div>
<div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
<span className="px-space-sm py-space-xs rounded bg-primary-container text-secondary-fixed text-label-sm font-label-sm font-semibold uppercase tracking-wider shadow-sm">Domaine Privé</span>
<span className="px-space-sm py-space-xs rounded bg-secondary-fixed text-on-secondary-fixed text-label-sm font-label-sm font-bold uppercase shadow-sm">Location</span>
</div>
<button aria-label="Enregistrer dans les favoris" className="absolute top-space-sm right-space-sm w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error transition-colors shadow-sm"  type="button">
<span className="material-symbols-outlined text-title-md">favorite</span>
</button>
<div className="absolute bottom-space-sm left-space-sm text-surface">
<span className="font-label-sm text-label-sm tracking-wider uppercase opacity-90">Club des Pins, Alger</span>
</div>
</div>
<div className="p-space-lg flex flex-col flex-1">
<h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            Résidence Diplomatique &amp; Jardin Privatif
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs line-clamp-2">
            Secteur ultra-exclusif réservé aux personnalités et représentations d'ambassades. Jardin arboré de 800 m², suite de sécurité et dépendance.
          </p>
<div className="flex items-center gap-space-md py-space-md mt-auto text-on-surface-variant font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bed</span> 4 ch
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">bathtub</span> 4 sdb
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-title-md text-secondary">straighten</span> 380 m²
            </span>
</div>
<div className="pt-space-sm flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">650 000</span>
<span className="font-label-sm text-label-sm text-secondary font-bold">DA / mois</span>
</div>
<a className="px-space-md py-space-xs rounded bg-surface-container hover:bg-primary-container hover:text-surface text-on-surface font-label-md text-label-md font-semibold transition-colors flex items-center gap-space-xs" href="/bien-detail?id=ph-alg-502">
<span>Voir le bien</span>
<span className="material-symbols-outlined text-label-md">arrow_forward</span>
</a>
</div>
</div>
</article>
</div>
{/*  View All Catalog Link  */}
<div className="mt-space-xl text-center">
<a className="inline-flex items-center gap-space-sm px-space-xl py-space-md rounded bg-primary-container text-surface hover:bg-on-surface font-label-lg text-label-lg font-semibold transition-all shadow-md hover:-translate-y-0.5" href="#">
<span>Consulter l'ensemble du catalogue</span>
<span className="material-symbols-outlined">east</span>
</a>
</div>
</section>
{/*  3. BROWSE BY PROPERTY TYPE ("Explorer par type de bien")  */}
<section className="w-full bg-surface-container-low py-space-xl my-space-lg">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Typologies &amp; Architectures</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mt-space-xs">
          Explorer par type de bien
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
          Des résidences d'époque aux penthouses ultramodernes, parcourez nos portefeuilles immobiliers spécialisés.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/*  Type 1  */}
<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Interior of modern luxury apartment in Algiers with sleek marble floor, warm recessed cove lighting, designer furniture and view towards Mediterranean city lights" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD6_hxr4oeo4Ef2aeRrI3y6If19vD3d7QFMmIvGJBI0P23z78pZHXa3qIp65-KoyjjgcZAUoaKEGR8tVBG25GQMuE-gTwlg0T_wAu0uyreVeZF1EC1GnU7_RcemejgU929Jh2cMm8BA69T-5dDyw3IopME8ptBd7IjEjEB9zvkxZN9tzUP5fahyQoUK3OSO73ykga3Vf6j6uKnKZ2xn5tV34EzZVZw5otjN0NnoEBMYXKr9pVC3mhA')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">124 Propriétés</span>
<h3 className="font-headline-md text-headline-md font-semibold mt-space-xs">Appartements &amp; Penthouses</h3>
<p className="font-body-sm text-body-sm text-surface-dim mt-space-xs opacity-90">Alger centre, Hydra &amp; grandes métropoles.</p>
<div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary-fixed mt-space-md group-hover:translate-x-1 transition-transform">
<span>Découvrir les biens</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
</a>
{/*  Type 2  */}
<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Stunning architectural villa exterior in Algeria with clean geometric lines, limestone cladding, large private swimming pool and modern landscaped garden" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAkpLyB8p3EKY_5b756wXgqZUKcFh4nWKOTMD5-4lszUO0V4rA-44A-VIl6tSTB5o01ig2zji_2QVXYhTltB0rxDOaOG2l7ZnOj0qh9QDQJNjMkOTQPJLTpMGOMQYGmEMUWAWqXPZymuFakRxQ6FUYdKUqXEyH3G7X0mt_GyvejVljOb_Ax5qs46503Dyzni2ffSicrD2KPXt6WCECYRsqFqVdsewsefjjjHC5-0F8-wLM18PLE6zA')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">86 Demeures</span>
<h3 className="font-headline-md text-headline-md font-semibold mt-space-xs">Villas d'Architecte</h3>
<p className="font-body-sm text-body-sm text-surface-dim mt-space-xs opacity-90">Piscines à débordement, jardins et hauts volumes.</p>
<div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary-fixed mt-space-md group-hover:translate-x-1 transition-transform">
<span>Découvrir les biens</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
</a>
{/*  Type 3  */}
<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Expansive Algerian coastal agricultural and residential domain with panoramic green hills overlooking the Mediterranean Sea in daylight" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD3jWWxrUpUWKrP21LDsOkK04Nax1kRz2xqRM6z3jxM8BqsON7OGWpK4COjiTovRDNsAe61u8mr8A7ZUxWVIvwE3YA-ckRH9fPZhHmQ2G9KZZRCuoHAhfFhBtu2sFVOOU2msqDpiTYnOltEBBN-IX_d4bxCyvH1SP5deVn6g6uFROR0at1WTvRbWDh9umLE2qScVayDCLOUxFxfpiyXD5Boc4KdjwRX47PNB2TygPRxVijMg4S4nFA')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">42 Opportunités</span>
<h3 className="font-headline-md text-headline-md font-semibold mt-space-xs">Terrains &amp; Domaines</h3>
<p className="font-body-sm text-body-sm text-surface-dim mt-space-xs opacity-90">Investissements constructibles et fermes d'exception.</p>
<div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary-fixed mt-space-md group-hover:translate-x-1 transition-transform">
<span>Découvrir les biens</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
</a>
{/*  Type 4  */}
<a className="group relative rounded-xl overflow-hidden aspect-[3/4] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" data-alt="Neo-Moorish luxury traditional mansion patio in Algiers with intricate sculpted plaster arches, zellij ceramic tiles, central marble fountain and ambient lanterns" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBxje6M2fOo8QXM-ZKtjikpoQxczNaEBBbD-AYI2qEtngSuGDKqJhfKAFh7KBVaSF49ywvLa4rY2ad7cZu9ITMZTaZ-ARi2iiH4V3YZe1V1VMzwQMpM_Y6qArWFdBJat1IEDVxxsZkhWBdhix9LkimxQN4o0kVxA653EhidGTkLr5bvda6hMAqHvEYonMqPW2nF41MQ6Z3wj9C92FIp3atSiQRd7O6OgcEZkSCmiwegDnDNWH_B5Bo')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-semibold">18 Joyaux Rares</span>
<h3 className="font-headline-md text-headline-md font-semibold mt-space-xs">Maisons de Maître &amp; Riads</h3>
<p className="font-body-sm text-body-sm text-surface-dim mt-space-xs opacity-90">Charme néo-mauresque authentique et modernité.</p>
<div className="inline-flex items-center gap-space-xs font-label-md text-label-md text-secondary-fixed mt-space-md group-hover:translate-x-1 transition-transform">
<span>Découvrir les biens</span>
<span className="material-symbols-outlined text-base">arrow_forward</span>
</div>
</div>
</a>
</div>
</div>
</section>
{/*  4. DUAL BANNERS (Acheter / Louer)  */}
<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter-lg">
{/*  Banner Acheter  */}
<div className="relative rounded-xl overflow-hidden p-space-xl bg-primary-container text-surface flex flex-col justify-between min-h-[380px] shadow-lg">
<div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" data-alt="Interior luxury architectural living room in Algiers with white marble floors, gold brass accents and sunny bay view window" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCiBlnXDUaHzJbn1l5Xykk3O24geu2KTnmxjRTW_hu61dm3rH6bQTClh8-OpbSnY8ctr7xEwDfIrveW5iMKZfby8X669RKl7S7DcCh_PJJLpOhZ9EtG0fNfzGW0QFI16wKG2rugTjlCLoafc7iGaQDraVVWosbbI22eTZs6XATzEU2SpHmCAq6Gooo5nq-vKY75M9swHK9Bpb20rUn36jSr8QYBtzPo44lYVni7Ah_VIqE72ui-R5w')" }}>
</div>
<div className="relative z-10">
<div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest/15 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-space-md">
            Acquisitions Pérennes
          </div>
<h3 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-surface max-w-md">
            Vous souhaitez acheter ?
          </h3>
<p className="font-body-md text-body-md text-surface-variant mt-space-md max-w-md leading-relaxed">
            Acquérez une propriété d'exception accompagnée en toute sérénité par notre collège de juristes et experts immobiliers agréés. Audit foncier garanti.
          </p>
</div>
<div className="relative z-10 pt-space-lg">
<Link className="inline-flex items-center gap-space-sm px-space-lg py-space-sm bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed rounded font-label-lg text-label-lg font-bold transition-all shadow-md" href="/biens?mode=vente">
<span>Trouver mon bien</span>
<span className="material-symbols-outlined text-title-md">arrow_forward</span>
</Link>
</div>
</div>
{/*  Banner Louer  */}
<div className="relative rounded-xl overflow-hidden p-space-xl bg-surface-container-high text-on-surface flex flex-col justify-between min-h-[380px] shadow-lg">
<div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-luminosity" data-alt="Diplomatic residential residence lounge room with luxury wooden panelling, soft evening lighting and private terrace in Algiers" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCNh-YkEPBtBbCXojrG0_5WAqoG9QZwEGZszVnQGbRodGUhm7xvi1lNM9YBREUlU1ejwsvAbtcdz6VgrsIm9x3UzxFIAkvPa8GrWncVhAxNscbVZQnuAJQRD8h5sJu_JiFj13PJIAECqZ4BRzXCj4nwXEA3Vl0CvFgRlt1MHwKfCX8PrBEDHNKdKeArG5d5vl1HXH3UN3Y1ybiMWzHbKKdsztgQt66WhM0tTsXac8j1PcOgaxD5evA')" }}>
</div>
<div className="relative z-10">
<div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-lowest text-secondary font-label-sm text-label-sm uppercase tracking-wider font-semibold mb-space-md shadow-sm">
            Baux Diplomatiques &amp; Corporate
          </div>
<h3 className="font-headline-lg text-headline-lg font-semibold tracking-tight text-on-surface max-w-md">
            Vous cherchez une location ?
          </h3>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-md max-w-md leading-relaxed">
            Des appartements de standing et villas d'ambassade soigneusement sélectionnés, entretenus et prêts pour vos séjours et installations officielles.
          </p>
</div>
<div className="relative z-10 pt-space-lg">
<Link className="inline-flex items-center gap-space-sm px-space-lg py-space-sm bg-primary-container text-surface hover:bg-on-surface rounded font-label-lg text-label-lg font-bold transition-all shadow-md" href="/louer">
<span>Voir les locations</span>
<span className="material-symbols-outlined text-title-md">arrow_forward</span>
</Link>
</div>
</div>
</div>
</section>
{/*  5. POURQUOI CHOISIR PRIME HOUSE ? (Trust Pillars)  */}
<section className="w-full bg-surface-container-lowest py-space-xl">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="text-center max-w-2xl mx-auto mb-space-xl">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Excellence &amp; Déontologie</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mt-space-xs">
          Pourquoi choisir Prime House ?
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
          Une approche rigoureuse inspirée des plus grandes maisons internationales, ancrée dans la parfaite maîtrise du cadre réglementaire algérien.
        </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
{/*  Pillar 1  */}
<div className="flex flex-col p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm">
<div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mb-space-md">
<span className="material-symbols-outlined text-display-mobile">verified_user</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs">
            Annonces 100% Vérifiées
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Contrôle systématique des actes notariés, livrets fonciers, conformités cadastrales et certificats d'urbanisme avant toute publication.
          </p>
</div>
{/*  Pillar 2  */}
<div className="flex flex-col p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm">
<div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mb-space-md">
<span className="material-symbols-outlined text-display-mobile">lock</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs">
            Discrétion &amp; Off-Market
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Accès confidentiel à notre catalogue secret pour les acquéreurs et vendeurs exigeant le secret absolu des négociations.
          </p>
</div>
{/*  Pillar 3  */}
<div className="flex flex-col p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm">
<div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mb-space-md">
<span className="material-symbols-outlined text-display-mobile">person_pin</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs">
            Accompagnement VIP Dédié
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Un conseiller privé unique prend en charge l'organisation des visites immersives, les montages juridiques et le suivi notarié jusqu'à la remise des clés.
          </p>
</div>
{/*  Pillar 4  */}
<div className="flex flex-col p-space-lg rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors shadow-sm">
<div className="w-14 h-14 rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary mb-space-md">
<span className="material-symbols-outlined text-display-mobile">travel_explore</span>
</div>
<h3 className="font-title-lg text-title-lg text-on-surface font-semibold mb-space-xs">
            Réseau National Premium
          </h3>
<p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Implantation stratégique à Alger, Oran, Constantine, Annaba et sur le littoral pour une réactivité immédiate partout en Algérie.
          </p>
</div>
</div>
</div>
</section>
{/*  6. LOCATIONS POPULAIRES (Destinations Gallery)  */}
<section className="w-full max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">Territoires d'Exception</span>
<h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight mt-space-xs">
          Destinations Populaires
        </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs max-w-xl">
          Découvrez les quartiers les plus prisés pour vivre, investir ou implanter votre résidence en Algérie.
        </p>
</div>
<a className="inline-flex items-center gap-space-xs text-secondary font-label-lg text-label-lg font-bold hover:underline" href="#">
<span>Toutes les wilayas</span>
<span className="material-symbols-outlined text-base">east</span>
</a>
</div>
{/*  Mosaic Grid 6 Destinations  */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
{/*  Dest 1: Alger  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Iconic view of Algiers Algeria overlooking the Mediterranean bay, white historic buildings and hills of Hydra and El Biar with blue sky" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCdkj21JPwgVHla2cvQ9nwTDdHxvtPfiZNjr6bxa_d3znfCozyCKDqcb8IcmTgrK9lGXtGWbSP84tu3p9kTi56rtXb-bRjaobqdpUaHiQ9bXBxDMSP8JuYxPfcYPqa4kE73xVz4AFL5iHZ_kC1TCtxYrJ2DrgiD6ZaRfhnglsjQn7Cm-ZQNGaplRqfPWORXLTnrI2afvhLhU9VKaMeIHmKF5RFQLzHJrJhuTUCx9ayUFfxJIyNOWNA')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Alger</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Hydra • El Biar • Poirson • Club des Pins</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">218 Biens</span>
</div>
</div>
</a>
{/*  Dest 2: Oran  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Oran Algeria Mediterranean waterfront boulevard, modern buildings along the sea cliff overlooking the port and warm evening light" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBbjUZ15_PwrlBjvLCoXzhh11xWKmlGSj1vV4oJwMcfMkUCRmpd4DLYVdYwzi2gJkiZidDgrdoEcUijAlyf4ze-5vYXLBSEluA45t8Qmajl_YJVXFMCY5YdS82fwByyiMnN5tds9bk1INbsv6uaO_MIebIvgRbplnHfDjlQy9oMcBA8Dn7iVMwGaKEFalSiG3NzAGbbvg-ORq7TrkZ7wIZuH3B1Rje8T5BRLzyZf8n-sWZescMum4g')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Oran</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Front de Mer • Canastel • Akid Lotfi</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">104 Biens</span>
</div>
</div>
</a>
{/*  Dest 3: Boumerdès  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Scenic Boumerdes seaside coast with golden sand beach, clear azure sea and luxury beachfront residential properties nestled in pine trees" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_Ntz5p8BA-FoLy_jeBIEoxUsEF7LX6hV8gjnm6CUuzsmZCZkLqt1jpIndasliuzoKxm86-tQ0lU8nolsqyHqHrv5kOGxfPWBzWYxJQiBMZjCz6EEDCO8UCPQxelXrQRpBx4X9qcOKfwGp1jVLGL1Bu3dF4nHsg8w0L35Q-29jacACVZnzmvh-MEckBqt2846_PtRhcfZzRnT3ytb-jCpRqc0zZEkhNVmh6ors9uMuUX3EzSgtYX8')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Boumerdès</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Littoral • Corso • Zemmouri El Bahri</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">48 Biens</span>
</div>
</div>
</a>
{/*  Dest 4: Blida  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Blida Algeria foothill landscape of the Atlas mountains, verdant orange groves and elegant private gated estates with cedar trees" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBUIyhZADa5xlwz6y5aS-2XQ6p6xDzskHeyE-3ad2t_Fh2b3Vtpvgp6nzPERrcWFRofaXzV885I7ls5YsPkLsRK7lcP3z6FLskmfwJmBQMUmuz_kRIKHsAq_MfwuU0wE-eO_9XbNqshTjBaJkZtZyXw_CT5z3tJPkoKthhJGYbaZ-_WkEyqmHZKd1ObDTlSze6TVBQWBY3uBUuLGXxGxSvwghjwMc0-qa_W7FAk2sK-NI2lCzgfTWs')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Blida</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Atlas Résidentiel • Chiffa • Chréa pied</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">32 Biens</span>
</div>
</div>
</a>
{/*  Dest 5: Béjaïa  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Béjaïa Cap Carbon rocky cliffs and deep blue Mediterranean coastline with elegant coastal cliffside villas overlooking emerald waters" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBO4ez__KAmASrluGobIHxzqyRsPF7JFhmHlFy8Hwta7XeRlQYBnn2r7WUR_a6ZG881biOQ3R1zQ9iW8yo2RbPbnQUchOn_Gmaaj9vnUFcL3pUUmZKAjpLwRw2uE60tCyJwRjyg9IF-HdWq8qeOEVe9-zgPxz3jlwg-dydEpGCYRlx4n6QE_BT-IKZA-CtOne5MxNt9fK4Lm8IuhGu0sQxWPhLwZ4JUgCa0JG_QV5o-Tqm8l3zXtTs')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Béjaïa</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Cap Carbon • Tichy • Baie des Aiguades</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">27 Biens</span>
</div>
</div>
</a>
{/*  Dest 6: Sétif  */}
<a className="group relative rounded-xl overflow-hidden aspect-[16/10] shadow-md flex flex-col justify-end p-space-lg" href="#">
<div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" data-alt="Modern metropolitan cityscape of Setif Algeria with modern luxury residential towers, green boulevard and scenic high plateaus" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpsIGgiM_iPwtjx7LvXK8M-Dc9KMfFvatcaU1vMcQ_XtlGJGC8wjI8CFqoBOXlLebNa6kOdYnIfgyJjO29iHhAaldNd7fMRPTfCA8qkJrhpIOkxPI_Va77SuTHYoAoiVDo7uXWNxdFYgFhX3QdOXZRC2_vfAF6bupgK5UcDDgpuP8X_NQ16STD38gwArsK59eX_uCMgWhBEHf7dejD5_B0J_y2y8G7UGM-5iaWDr8_uFjBPaowhVo')" }}>
</div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/40 to-transparent"></div>
<div className="relative z-10 text-surface">
<div className="flex items-center justify-between">
<div>
<h3 className="font-headline-md text-headline-md font-semibold">Sétif</h3>
<p className="font-body-sm text-body-sm text-surface-dim opacity-90">Bel-Air • Résidences des Hauts Plateaux</p>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container-lowest/20 backdrop-blur-md text-surface font-label-sm text-label-sm font-semibold">19 Biens</span>
</div>
</div>
</a>
</div>
</section>
{/*  7. MASTER CTA CONCIERGE SECTION  */}
<section className="w-full bg-primary-container text-surface py-space-xl relative overflow-hidden">
{/*  Subtle Golden Light Blob  */}
<div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg relative z-10">
<div className="bg-surface-container-lowest/5 backdrop-blur-xl rounded-xl p-space-xl lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-space-xl shadow-2xl">
<div className="max-w-2xl text-center lg:text-left">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary-container/20 text-secondary-fixed text-label-sm font-label-sm uppercase tracking-widest font-semibold mb-space-md">
            Mandat Privilégié &amp; Estimation Gratuite
          </div>
<h2 className="font-headline-xl text-headline-xl text-surface font-semibold tracking-tight">
            Vous avez un bien d'exception à vendre ou à louer ?
          </h2>
<p className="font-body-lg text-body-lg text-surface-variant mt-space-md leading-relaxed">
            Confiez votre patrimoine à Prime House. Bénéficiez d'une évaluation juste, d'un reportage photographique architectural et d'une mise en relation qualifiée avec nos acquéreurs nationaux et internationaux.
          </p>
<div className="flex flex-wrap items-center justify-center lg:justify-start gap-space-lg mt-space-lg text-surface-dim font-body-sm text-body-sm">
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-base">check_circle</span> Évaluation confidentielle sous 48h
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-base">check_circle</span> Réseau d'ambassades &amp; CEOs
            </span>
<span className="flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-base">check_circle</span> Zéro frais avant transaction
            </span>
</div>
</div>
{/*  Action Box  */}
<div className="flex flex-col sm:flex-row lg:flex-col gap-space-md w-full lg:w-auto shrink-0">
<a className="px-space-xl py-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container rounded font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-sm shadow-xl transition-all hover:scale-[1.02] text-center" href="#">
<span className="material-symbols-outlined text-title-md">add_business</span>
<span>Déposer une annonce</span>
</a>
<a className="px-space-xl py-space-md bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface rounded font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-sm transition-colors text-center" href="tel:+21323456789">
<span className="material-symbols-outlined text-title-md text-secondary">support_agent</span>
<span>Ligne Concierge VIP (+213)</span>
</a>
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
