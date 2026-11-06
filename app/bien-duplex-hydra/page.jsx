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

<section className="w-full bg-surface-container-lowest shadow-[0_2px_12px_rgba(17,28,44,0.04)]">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm">
<div className="flex items-center flex-wrap gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
<a className="inline-flex items-center gap-1 hover:text-on-surface transition-colors font-medium text-secondary" href="#">
<span className="material-symbols-outlined text-[18px]">arrow_back</span>
<span>Retour aux résultats</span>
</a>
<span className="text-outline-variant">/</span>
<a className="hover:text-on-surface transition-colors" href="/">Accueil</a>
<span className="text-outline-variant">/</span>
<a className="hover:text-on-surface transition-colors" href="/louer">Louer</a>
<span className="text-outline-variant">/</span>
<a className="hover:text-on-surface transition-colors" href="#">Alger (16)</a>
<span className="text-outline-variant">/</span>
<span className="text-on-surface font-semibold">Hydra</span>
<span className="text-outline-variant">•</span>
<span className="font-label-sm text-label-sm tracking-wider uppercase text-on-surface-variant/80 bg-surface-container-low px-2 py-0.5 rounded">RÉF : PH-DZ-2025-88</span>
</div>
<div className="flex items-center gap-space-xs self-end md:self-auto">
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all" id="btn-share" title="Partager ce bien">
<span className="material-symbols-outlined text-[18px] text-secondary">share</span>
<span className="hidden sm:inline">Partager</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all" id="btn-favorite" title="Sauvegarder">
<span className="material-symbols-outlined text-[18px] text-secondary" id="fav-icon">favorite_border</span>
<span className="hidden sm:inline">Favoris</span>
</button>
<button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all" id="btn-pdf" title="Fiche descriptive PDF">
<span className="material-symbols-outlined text-[18px] text-secondary">picture_as_pdf</span>
<span className="hidden sm:inline">Dossier PDF</span>
</button>
</div>
</div>
</section>

<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none bg-primary-container text-surface px-space-lg py-space-sm rounded-lg shadow-[0_12px_32px_rgba(7,20,38,0.25)] flex items-center gap-space-sm" id="toast-notify">
<span className="material-symbols-outlined text-secondary-container">check_circle</span>
<span className="font-body-sm text-body-sm" id="toast-message">Lien copié dans le presse-papiers avec succès.</span>
</div>

<section className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg pb-space-md w-full">
<div className="relative grid grid-cols-1 lg:grid-cols-12 gap-space-sm overflow-hidden rounded-xl bg-surface-container-lowest p-space-xs shadow-[0_8px_24px_rgba(17,28,44,0.04)]">

<div className="lg:col-span-8 relative group overflow-hidden rounded-lg aspect-[16/10] bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" data-alt="Luxurious architectural duplex in Hydra Algiers with double-height ceiling, large floor-to-ceiling glass windows overlooking Mediterranean pine trees, Italian beige travertine marble floors, bespoke walnut wood paneling, modern minimalist furniture, soft golden afternoon natural light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcqx1sMKmE3nvi6-uQ3J69geaiiSdWGvv_KW04hCQuqxnpTP0lsWFH4ec5z85me77CwKF9VNSO-N9Vg_D8lNqL5lsGsiJagJE9J5uBjE2Pi2ScGRMNXgHb1_grFeqTeqJUq7yAnfnriUbxaR4ZlC0QS8fQfD9xnCRzZu1USAiqh45jL702liIaMY-MuzYd_7086E_JZKND6tAcbUZu9GE-6evxbH5zgiSW-LzmxwN_I6YogV88yl8"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container/60 via-transparent to-black/20 pointer-events-none"></div>

<div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
<span className="bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold uppercase px-3 py-1 rounded shadow-sm">
            Location Résidentielle
          </span>
<span className="bg-primary-container/90 backdrop-blur-md text-secondary-fixed text-label-sm font-label-sm px-3 py-1 rounded flex items-center gap-1 font-semibold">
<span className="material-symbols-outlined text-[16px] text-secondary-container" style={{ "fontVariationSettings": "'FILL' 1" }}>verified</span>
            Exclusivité Prime House
          </span>
<span className="bg-secondary text-on-secondary text-label-sm font-label-sm px-2.5 py-1 rounded font-semibold tracking-wide">
            Bail Diplomatique &amp; Sociétés
          </span>
</div>
<div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
<div className="text-surface">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed/90 font-medium">Vue Panoramique &amp; Espaces Réception</span>
<p className="font-headline-sm text-headline-sm text-surface drop-shadow-md">Le Belvédère d'Hydra — Salons Triples</p>
</div>
<button className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface hover:bg-surface-container-lowest font-label-sm text-label-sm font-semibold transition-all shadow-md">
<span className="material-symbols-outlined text-secondary text-[18px]">360</span>
<span>Visite Virtuelle 3D</span>
</button>
</div>
</div>

<div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-space-sm">
<div className="relative group overflow-hidden rounded-lg aspect-[16/10] lg:aspect-auto lg:h-[188px] bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="High-end Italian custom kitchen Boffi style with Calacatta marble island, Gaggenau integrated appliances, matte brass faucets, understated warm ambient lighting, Algiers luxury apartment." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAozWs1DDsoKx49R07P0Rs5WVFO1WOa-00xVakt5znH_CSv8GWwAokIb9NOmFZ9F5G42PTEtGWi27Gz_5zeFBBJJ4BPoCbnQ-dbVE-GngnWKa9DS37-K9ySZ4mcs0yIvTRgvH2PTAMbkZxFzfNsCkUuEsyItZY4QXIWTWH6d82uGatiUFhXmlygG02bK_TXtbFDJXI0oPyFhgc3Y_bOqpHqw0an2Za4SdwF1SRnEWva3IUdKELKJlw"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-2 left-2 bg-primary-container/80 backdrop-blur text-surface font-label-sm text-label-sm px-2 py-0.5 rounded">Cuisine Boffi en Marbre</span>
</div>
<div className="relative group overflow-hidden rounded-lg aspect-[16/10] lg:aspect-auto lg:h-[188px] bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Master bedroom suite with king size bed, soft velvet upholstery, floor-to-ceiling glass doors opening onto private terrace with green view of Val d'Hydra, walk-in dressing room adjacent." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAgnbMyhEkxOVx-4uWNHhyjoHyk9QFzHXrzGDqbXmKZK7n3FLI-HKbGQLrXs6UPsCs0gk_ocHmuyezCeuJOpUwMi-YhtZ_ivzjf2_5jt4tbrQGeB89rxRWI5ZngYj8oEUmV4sXvGp6N6_McnJuWWdDBIreCb4t4cZHPdRmJUkZ9MZMIWphtY9TgUPG79To3D72HaBei6IHJpz9sL_ZNOouwc1kD9djxVGhkJctHYd4DnmsYCBu_gH0"/>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-transparent transition-colors"></div>
<span className="absolute bottom-2 left-2 bg-primary-container/80 backdrop-blur text-surface font-label-sm text-label-sm px-2 py-0.5 rounded">Master Suite 45 m²</span>
</div>
<div className="relative group overflow-hidden rounded-lg aspect-[16/10] lg:aspect-auto lg:h-[188px] bg-surface-container col-span-2 lg:col-span-1">
<img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-alt="Private rooftop panoramic terrace overlooking the bay of Algiers and embassies district of Hydra, luxury teak outdoor furniture, Mediterranean olive tree in terracotta pot, clear blue sky." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqG2mWmbmp7p4C36PuE2erTWCFtnq4o_TkP-zY4Hyv8GOM4eVIdyHCIUqNSa6urm6CXAbKaFlxGjwdoWiq_QMIvBxDS38HEw3tBiN1_vuu8vahu-NJJ5zqtJimrOQKHRShKZRl9UIXt5b--HwerwYBEydRQbdgeMDb0aWjFCTkmCx0oorCxhVBHSN8w_zvDC8NZV9fUvlj6P-_MiPZ2A1n2x9oDXvEVP844EId2565kRkn6xQpws8"/>
<div className="absolute inset-0 bg-primary-container/40 group-hover:bg-primary-container/10 transition-colors flex items-center justify-center">
<button className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-lowest/95 hover:bg-surface-container-lowest text-on-surface rounded font-label-md text-label-md font-semibold transition-transform transform hover:scale-105 shadow-lg">
<span className="material-symbols-outlined text-secondary">photo_library</span>
<span>Voir les 24 photographies HD</span>
</button>
</div>
<span className="absolute bottom-2 left-2 bg-primary-container/80 backdrop-blur text-surface font-label-sm text-label-sm px-2 py-0.5 rounded">Terrasse &amp; Belvédère</span>
</div>
</div>
</div>
</section>

<section className="w-full bg-surface-container-lowest shadow-[0_4px_16px_rgba(17,28,44,0.03)]">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-md">
<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md pb-space-sm">
<div>
<div className="flex items-center gap-2 mb-1">
<span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
<span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Hydra • Zone Diplomatique &amp; Résidentielle Calme • Alger</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface font-serif">
            Duplex de Maître avec Belvédère &amp; Prestations Signées
          </h1>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Immeuble privé de très haut standing • 1 seul appartement par palier • Voisinage institutionnel
          </p>
</div>
<div className="flex flex-col sm:flex-row sm:items-baseline lg:items-end gap-x-space-md gap-y-1 bg-surface-container-low px-space-md py-space-sm rounded-xl">
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Loyer Mensuel Hors Charges</span>
<div className="flex items-baseline gap-1.5">
<span className="font-currency-display text-currency-display text-primary-container font-extrabold tracking-tight">450 000</span>
<span className="font-label-md text-label-md text-secondary font-bold">DA / mois</span>
</div>
</div>
<div className="text-left sm:text-right">
<span className="font-label-sm text-label-sm text-on-surface-variant block">Charges mensuelles : 25 000 DA</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold">Paiement : Semestriel / Annuel</span>
</div>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-space-xs pt-space-sm">
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">square_foot</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Habitable</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">280 m²</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">balcony</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Terrasse</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">65 m²</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">meeting_room</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Pièces</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">5 (3 Suites)</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">bathtub</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Salles d'eau</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">3 SDB + 1 WC</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">stairs</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Étage</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">3ᵉ &amp; 4ᵉ (Dernier)</span>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low/70 rounded-lg">
<div className="w-10 h-10 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-[20px]">garage</span>
</div>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-medium">Stationnement</span>
<span className="font-title-md text-title-md text-on-surface font-semibold">2 Box Fermés</span>
</div>
</div>
</div>
</div>
</section>

<section className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg py-space-xl w-full">
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">

<div className="lg:col-span-8 flex flex-col gap-space-xl">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)]">
<div className="flex items-center gap-space-sm mb-space-md">
<div className="w-8 h-8 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">gavel</span>
</div>
<div>
<h2 className="font-title-lg text-title-lg text-on-surface font-bold">Sécurité Juridique &amp; Statut Foncier Certifié</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Conformité légale rigoureusement auditée par notre service notarial avant mise en relation.</p>
</div>
</div>
<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]" style={{ "fontVariationSettings": "'FILL' 1" }}>verified_user</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Acte Notarié</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Publié au Livre Foncier</span>
</div>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]" style={{ "fontVariationSettings": "'FILL' 1" }}>menu_book</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Livret Foncier</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Individuel vérifié</span>
</div>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]" style={{ "fontVariationSettings": "'FILL' 1" }}>task</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Certif. Conformité</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Délivré par l'APC</span>
</div>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg flex items-center gap-space-xs">
<span className="material-symbols-outlined text-secondary text-[22px]" style={{ "fontVariationSettings": "'FILL' 1" }}>domain_verification</span>
<div className="flex flex-col min-w-0">
<span className="font-label-sm text-label-sm text-on-surface font-semibold truncate">Bail Enregistré</span>
<span className="font-body-sm text-[11px] text-on-surface-variant">Homologation fiscale</span>
</div>
</div>
</div>
</div>

<article className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)]">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Signature Architecturale</span>
<h2 className="font-headline-md text-headline-md text-on-surface mt-1 mb-space-md font-serif">
            L'Élégance Méditerranéenne au Cœur du Triangle d'Or d'Alger
          </h2>
<div className="space-y-space-md text-on-surface font-body-md text-body-md leading-relaxed">
<p>
              Situé au sein d'une enclave résidentielle ultra-préservée du haut d'Hydra, à l'abri de toute nuisance urbaine et sous surveillance continue, ce duplex de maître développe <strong>280 m² habitables</strong> conçus selon les standards les plus exigeants de l'architecture intérieure contemporaine.
            </p>
<p>
              Le premier niveau s'ouvre sur une galerie d'entrée habillée de boiseries noyer canaletto toute hauteur dissimulant de vastes vestiaires d'invités. Il dessert une triple réception baignée de lumière naturelle grâce à de monumentales baies vitrées coulissantes ouvrant de plain-pied sur une terrasse végétalisée de 65 m² avec vue dégagée sur les crêtes verdoyantes du Val d'Hydra.
            </p>
<p>
              La cuisine indépendante conçue par <em>Boffi</em> intègre un îlot central en marbre monolithique Calacatta, un ensemble complet d'électroménager Gaggenau de dernière génération, ainsi qu'un cellier-buanderie technique indépendant. Un espace dînatoire attenant offre un cadre intimiste pour le quotidien familial.
            </p>
<p>
              À l'étage supérieur, accessible par un escalier sculptural suspendu ou par l'ascenseur privatif intérieur, l'espace nuit se compose de trois suites complètes. La suite parentale de plus de 45 m² comprend un dressing d'architecte sur mesure, une salle de bains en suite avec baignoire îlot et douche italienne en pierre naturelle, ainsi qu'un accès exclusif à un solarium privatif.
            </p>
</div>

<div className="mt-space-lg p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[28px] mt-0.5">format_quote</span>
<p className="font-body-sm text-body-sm text-on-surface italic">
              "Ce bien a été méticuleusement configuré pour accueillir des représentations diplomatiques, des dirigeants de multinationales ou des familles en quête d'une discrétion totale et d'un confort autonome sans compromis en Algérie."
            </p>
</div>
</article>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)]">
<div className="flex items-center justify-between mb-space-md">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Autonomie &amp; Confort Absolu</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-serif">Prestations &amp; Équipements de Pointe</h2>
</div>
<span className="bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm px-3 py-1 rounded font-semibold">
              Infrastructure 100% Autonome
            </span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">water_drop</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Bâche à eau &amp; Surpresseur</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Citerne sous-sol 10 000 Litres avec système de filtration UV et régulation constante de pression.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">power</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Groupe Électrogène 30 kVA</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Inverseur automatique silencieux alimentant l'intégralité du duplex et climatisation sans coupure.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">ac_unit</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Climatisation VRV &amp; Chauffage au Sol</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Thermostat multi-zones Daikin invisible dans chaque suite et pièce de vie principale.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">shield</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Sécurité &amp; Gardiennage 24/7</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Poste de contrôle avec agent d'accueil, caméras infrarouges périmétriques et alarme connectée.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">settings_remote</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Domotique KNX &amp; Fibre Optique</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Pilotage des éclairages d'ambiance, volets roulants automatisés et réseau Wi-Fi 6 maillé.</p>
</div>
</div>
<div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-[24px]">elevator</span>
<div>
<h4 className="font-title-md text-title-md text-on-surface font-semibold">Ascenseur Privatif à Clé</h4>
<p className="font-body-sm text-body-sm text-on-surface-variant">Accès direct du garage sous-sol aux deux niveaux du duplex avec badge codé réservé.</p>
</div>
</div>
</div>

<div className="mt-space-md pt-space-md flex flex-wrap gap-2">
<span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Double vitrage Reynaers phonique</span>
<span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Marbre Botticino &amp; Parquet massif</span>
<span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Robinetterie Vola &amp; Axor</span>
<span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Porte d'entrée blindée Fichet 5 points</span>
<span className="px-2.5 py-1 rounded bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm">Logement de service / Chauffeur inclus</span>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)]">
<div className="flex items-center justify-between mb-space-sm">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Situation Privilégiée</span>
<h2 className="font-headline-md text-headline-md text-on-surface font-serif">Hydra &amp; Connexions Stratégiques</h2>
</div>
<span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-3 py-1 rounded font-medium">Wilaya d'Alger</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            À proximité immédiate du rond-point des Nations Unies, des ambassades occidentales et des meilleures écoles internationales d'Alger.
          </p>

<div className="relative w-full h-80 rounded-xl overflow-hidden mb-space-md bg-surface-container">
<div className="w-full h-full bg-cover bg-center" data-location="Hydra, Algiers, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBZ1oEThtxG4iO12GgFdbGprnOWGThqeE7_jOWw2S7K6E5jO1PR-uV2iF1qKGsH-GN4-nuTNYR2BZB2TQGilqTJLmwybJtlk8WOit9fzkf1C_VFhWGPAdP7pZt82grd0nV-ZBu4agwEQqHr1qtkZAmd4f0aJBO10ok16x06Zyc5tUM6-5kAgnNqxMimXZDItdnDeDZJ3_RyjC8bNp4IaF7W4osysxtreqbVEVsKqwxwLwiuavIV8fY')" }}></div>
<div className="absolute bottom-4 left-4 bg-primary-container/90 backdrop-blur-md text-surface px-space-md py-space-sm rounded-lg shadow-lg max-w-xs">
<span className="font-label-sm text-label-sm text-secondary-fixed block font-bold">Localisation Précise</span>
<span className="font-body-sm text-body-sm">Hydra Supérieur • Quartier des Ambassades, Alger</span>
</div>
</div>

<div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="material-symbols-outlined text-secondary text-[24px]">account_balance</span>
<span className="font-title-md text-title-md text-on-surface block font-bold mt-1">3 min</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Ambassades &amp; Consulats</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="material-symbols-outlined text-secondary text-[24px]">school</span>
<span className="font-title-md text-title-md text-on-surface block font-bold mt-1">5 min</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">École Française &amp; Internationale</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="material-symbols-outlined text-secondary text-[24px]">storefront</span>
<span className="font-title-md text-title-md text-on-surface block font-bold mt-1">3 min</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Sidi Yahia &amp; Boutiques</span>
</div>
<div className="p-space-sm bg-surface-container-low rounded-lg text-center">
<span className="material-symbols-outlined text-secondary text-[24px]">flight_takeoff</span>
<span className="font-title-md text-title-md text-on-surface block font-bold mt-1">20 min</span>
<span className="font-body-sm text-[12px] text-on-surface-variant">Aéroport Houari Boumediene</span>
</div>
</div>

<div className="mt-space-lg pt-space-sm flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
<span>Dernière mise à jour de l'annonce : Février 2025</span>
<button className="inline-flex items-center gap-1 text-on-surface-variant hover:text-error transition-colors">
<span className="material-symbols-outlined text-[16px]">flag</span>
<span>Signaler une anomalie</span>
</button>
</div>
</div>
</div>

<aside className="lg:col-span-4 sticky top-24 flex flex-col gap-space-lg">

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-[0_12px_32px_-4px_rgba(7,20,38,0.08)]">
<div className="flex items-center gap-space-md pb-space-md">
<div className="relative">
<img className="w-16 h-16 rounded-full object-cover shadow-md" data-alt="Portrait of an experienced Algerian luxury real estate agent wearing a sharp navy blue tailored suit, confident and warm expression, neutral office background with Mediterranean architectural sketches." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGYhyj_m60mrHJoonPPtzHQ2uICYjfXLk7qkAuK3ylZnzp8Vwsfg-RyBVmwyw28hI0rhKmgxKUINNsSUBG4y3d5AXR_az9C-qbWWlFDWzIMBN9_Hv60LEKhHiwQ8Dj3peqWsxOVEFqKUogSZ64j_ACV0gEn-vb9bHaezZOG0rHbVJ2ryP7HjfdXs22llDiAjzIdUguhpCKmxee7cOoDG6GLkjvNJ2e02ulaOkmvqShXmlcaHoxtqk"/>
<div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center" title="Conseiller Certifié">
<span className="material-symbols-outlined text-[13px] font-bold">check</span>
</div>
</div>
<div className="flex flex-col min-w-0">
<span className="font-title-lg text-title-lg text-on-surface font-bold truncate">Karim Benmansour</span>
<span className="font-body-sm text-body-sm text-secondary font-medium">Pôle Diplomatique &amp; Baux Corporate</span>
<span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Prime House Alger Centre</span>
</div>
</div>

<div className="grid grid-cols-1 gap-space-xs mt-space-sm mb-space-md">
<a className="w-full inline-flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded bg-primary-container text-surface hover:bg-on-surface font-label-lg text-label-lg font-semibold transition-all shadow-sm" href="tel:+213560123456">
<span className="material-symbols-outlined text-[20px] text-secondary-container">call</span>
<span>+213 (0) 560 12 34 56</span>
</a>
<a className="w-full inline-flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded bg-secondary hover:bg-on-tertiary-container text-on-secondary font-label-lg text-label-lg font-semibold transition-all shadow-sm" href="https://wa.me/213560123456?text=Bonjour,%20je%20souhaite%20des%20renseignements%20confidentiels%20sur%20le%20Duplex%20Hydra%20Ref:%20PH-DZ-2025-88" rel="noopener" target="_blank">
<span className="material-symbols-outlined text-[20px]">chat</span>
<span>Échanger sur WhatsApp</span>
</a>
</div>

<div className="bg-surface-container-low rounded-lg p-space-md">
<div className="flex items-center justify-between mb-space-sm">
<h3 className="font-title-md text-title-md text-on-surface font-bold">Demander une Visite Privée</h3>
<span className="material-symbols-outlined text-secondary text-[20px]">lock</span>
</div>
<form className="space-y-space-sm" id="contact-form">
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Nom et Prénom / Société</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none" placeholder="Ex: S.E. Ambassade / M. Belkacem" required="" type="text"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Téléphone (Algérien ou Int.)</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none" placeholder="+213 6XX XX XX XX" required="" type="tel"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Date souhaitée</label>
<input className="w-full px-space-sm py-2 rounded bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm focus:outline-none" type="date"/>
</div>
<div>
<label className="block font-label-sm text-label-sm text-on-surface font-semibold mb-1">Message ou exigences particulières</label>
<textarea className="w-full px-space-sm py-2 rounded bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none resize-none" placeholder="Précisez votre statut (expatriation, organisme, date d'emménagement souhaitée)..." rows="3"></textarea>
</div>
<button className="w-full py-2.5 px-space-md bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg font-bold rounded transition-all shadow-[0_2px_12px_rgba(121,89,0,0.18)] hover:-translate-y-0.5" type="submit">
                Envoyer la Demande Confidentielle
              </button>
</form>
<p className="font-body-sm text-[11px] text-on-surface-variant text-center mt-3 leading-tight">
              Discrétion absolue assurée. Vos coordonnées ne font l'objet d'aucun démarchage commercial externe.
            </p>
</div>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-md shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)]">
<div className="flex items-center gap-space-xs mb-space-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">calculate</span>
<h4 className="font-title-md text-title-md text-on-surface font-bold">Modalités Financières &amp; Bail</h4>
</div>
<div className="space-y-space-xs font-body-sm text-body-sm">
<div className="flex items-center justify-between py-1 text-on-surface-variant">
<span>Loyer annuel équivalent :</span>
<span className="text-on-surface font-semibold">5 400 000 DA</span>
</div>
<div className="flex items-center justify-between py-1 text-on-surface-variant">
<span>Dépôt de garantie :</span>
<span className="text-on-surface font-semibold">2 mois de loyer</span>
</div>
<div className="flex items-center justify-between py-1 text-on-surface-variant">
<span>Honoraires d'agence :</span>
<span className="text-on-surface font-semibold">1 mois de loyer H.T.</span>
</div>
<div className="flex items-center justify-between py-1 text-on-surface-variant">
<span>Régime fiscal :</span>
<span className="text-on-surface font-semibold">Bail Notarié Professionnel</span>
</div>
</div>
</div>
</aside>
</div>
</section>

<section className="w-full bg-surface-container-low/60 py-space-xl shadow-inner">
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg">
<div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
<div>
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Sélection Comparable</span>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-serif mt-1">Propriétés Similaires à Découvrir</h2>
<p className="font-body-md text-body-md text-on-surface-variant">Autres résidences de très haut standing dans les quartiers diplomatiques d'Alger.</p>
</div>
<a className="inline-flex items-center gap-1 font-label-lg text-label-lg text-on-surface hover:text-secondary font-semibold transition-colors" href="#">
<span>Explorer toutes les locations à Hydra</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</a>
</div>

<div id="rental-properties-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(7,20,38,0.08)] transition-all duration-300 group flex flex-col">
<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="Penthouse terrace overlooking Algiers bay with outdoor jacuzzi, wooden deck, contemporary design, sunset lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdoHz3w9Jmdm8068sCq0S7lyuOSCIX9HIDBaBNPMyoBZRZtPahrKcAkvqMWQh7avkIuKWqLp7eJ8a9Ef1U4LCCnE0IWuJc-kxLN_M75RQy3hu3q4UwvkJYV4kD1Z4roArpvFYAIVw7XCNanrQOEwMdtY-8hNu9pWM_0BSzK1__zUp-wpgjO9Re64zGMzEQIWG_5dz1vDJ3-UIGJflXkNpB0J8Xmkzs-rNpVwBAxyGqKEunqkouu8Y"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="bg-surface-container-lowest/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-2.5 py-0.5 rounded font-bold uppercase">Location</span>
<span className="bg-primary-container text-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">Exclusivité</span>
</div>
<button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Ajouter aux favoris">
<span className="material-symbols-outlined text-[18px]">favorite_border</span>
</button>
</div>
<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">El Biar • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-serif mt-1 group-hover:text-secondary transition-colors">
                Penthouse avec Piscine Suspendue &amp; Vue Mer
              </h3>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm my-space-sm">
<span>310 m²</span>
<span>•</span>
<span>4 Suites</span>
<span>•</span>
<span>3 Garages</span>
</div>
</div>
<div className="pt-space-md flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">520 000</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold"> DA/mois</span>
</div>
<a className="px-space-md py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors" href="#">
                Consulter
              </a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(7,20,38,0.08)] transition-all duration-300 group flex flex-col">
<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="Modern luxury white villa in Cheraga Algiers with private swimming pool, lush green palm trees, large outdoor lounge, bright sunny day." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAf_Ot8HEYN3cW0f_Uqqs8XWRuvHN85XY-n4gkEYQXY5i7QdUXjii6kIT2Bnr3nYsVbqn6qzwWNX0EH5Z63btkhiNNt60I9eOhwp7RcHUPo5IcApB5g4uMvTNgDTkkZSoXZ7Q6JogBQWK_6hL55ZHRU9jZz-arhVIPKHzkgeRxo51UBRBO7e9KGPwWbvJ5pOEE6OUNiIYhJ6HdwR0f1CX02Y7_l2HnQm_5eN6C6SsZHjqLbrw5CvTU"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="bg-surface-container-lowest/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-2.5 py-0.5 rounded font-bold uppercase">Location</span>
</div>
<button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Ajouter aux favoris">
<span className="material-symbols-outlined text-[18px]">favorite_border</span>
</button>
</div>
<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">Chéraga • Alger</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-serif mt-1 group-hover:text-secondary transition-colors">
                Villa Contemporaine d'Exception &amp; Jardin Paysager
              </h3>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm my-space-sm">
<span>450 m²</span>
<span>•</span>
<span>6 Pièces</span>
<span>•</span>
<span>Piscine</span>
</div>
</div>
<div className="pt-space-md flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">600 000</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold"> DA/mois</span>
</div>
<a className="px-space-md py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors" href="#">
                Consulter
              </a>
</div>
</div>
</article>

<article className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.04)] hover:shadow-[0_12px_32px_-4px_rgba(7,20,38,0.08)] transition-all duration-300 group flex flex-col">
<div className="relative aspect-[16/10] overflow-hidden bg-surface-container">
<img className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" data-alt="Elegant luxury apartment interior with herringbone oak wooden floors, fireplace, high ceilings, large windows in Hydra Algiers diplomat quarter." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy9TGecNCzRR8eHiENlo4I9Izwxx9WDrZLYvpp1Z2bkVmGf5LhCYxFmPvn_gmiTiJJrxiv06JMdO0tj16p5RZHgmUgVNv5Hb6h0R7hyBsIiuFxZW4bnEan2SpjRpl8y_ItUwm2XBG6mDDyXyFLWOMMWt9ZPeJsqPCSwnx8pD3_l4jhqMV4KIuQZTjuWRtE2OnHMjGe23nQWF5p8jCmIGKow5gSkNvD6IDh3DUQKJds3cZbu96oz90"/>
<div className="absolute top-3 left-3 flex gap-1.5">
<span className="bg-surface-container-lowest/90 backdrop-blur text-on-surface font-label-sm text-label-sm px-2.5 py-0.5 rounded font-bold uppercase">Location</span>
<span className="bg-primary-container text-secondary-fixed font-label-sm text-label-sm px-2 py-0.5 rounded font-semibold">Exclusivité</span>
</div>
<button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur flex items-center justify-center text-on-surface-variant hover:text-secondary transition-colors" title="Ajouter aux favoris">
<span className="material-symbols-outlined text-[18px]">favorite_border</span>
</button>
</div>
<div className="p-space-lg flex flex-col flex-grow justify-between">
<div>
<span className="font-label-md text-label-md text-secondary uppercase font-semibold">Hydra • Val d'Hydra</span>
<h3 className="font-headline-sm text-headline-sm text-on-surface font-serif mt-1 group-hover:text-secondary transition-colors">
                Appartement F4 Meublé de Styliste &amp; Jardin Privatif
              </h3>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm my-space-sm">
<span>195 m²</span>
<span>•</span>
<span>3 Suites</span>
<span>•</span>
<span>Rez-de-Jardin</span>
</div>
</div>
<div className="pt-space-md flex items-center justify-between">
<div>
<span className="font-currency-display text-currency-display text-on-surface font-bold">380 000</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold"> DA/mois</span>
</div>
<a className="px-space-md py-1.5 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md font-semibold transition-colors" href="#">
                Consulter
              </a>
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
