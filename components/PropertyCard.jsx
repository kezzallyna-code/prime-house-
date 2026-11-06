'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { primeStorage } from '@/lib/storage';

export default function PropertyCard({ property, isAr = false }) {
  const p = property;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    setIsFav(primeStorage.isFavorite(p.id));

    const handleFavChange = (e) => {
      if (e?.detail?.propertyId === p.id) {
        setIsFav(e.detail.added);
      }
    };
    window.addEventListener('prime:favorites-changed', handleFavChange);
    return () => window.removeEventListener('prime:favorites-changed', handleFavChange);
  }, [p.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const added = primeStorage.toggleFavorite(p.id);
    setIsFav(added);
  };

  const isVente = p.status === 'vente';
  const badgeText = isAr ? (isVente ? 'بيع حصري' : 'للإيجار') : (isVente ? 'VENTE EXCLUSIVE' : 'À LOUER');

  let badgeLegal = p.legalStatus || (isVente ? 'Acte notarié & Livret foncier' : 'Bail notarié');
  if (isAr) {
    if (badgeLegal.includes('Livret foncier individuel')) {
      badgeLegal = 'عقد موثق ودفتر عقاري فردي';
    } else if (badgeLegal.includes('Livret foncier') || badgeLegal.includes('Acte notarié')) {
      badgeLegal = 'عقد موثق ودفتر عقاري';
    } else if (badgeLegal.includes('Bail diplomatique')) {
      badgeLegal = 'عقد إيجار دبلوماسي موثق';
    } else if (badgeLegal.includes('Bail')) {
      badgeLegal = 'عقد إيجار موثق';
    }
  }

  const title = (isAr && p.title_ar) ? p.title_ar : p.title;
  const description = (isAr && p.description_ar) ? p.description_ar : (p.description || p.tagline || '');
  const wilayaDisplay = isAr ? (p.wilaya_ar || p.wilaya) : p.wilaya;
  const communeDisplay = isAr ? (p.commune_ar || p.commune || wilayaDisplay) : (p.commune || p.wilaya);
  const locationText = `${communeDisplay} • ${wilayaDisplay}`;

  const imgUrl = (p.images && p.images[0]) || '/assets/logo-p-transparent.png';

  let detailUrl = `/bien-detail?id=${p.id}`;
  if (p.id === 'ph-alg-401') detailUrl = '/bien-villa-hydra';
  if (p.id === 'ph-alg-308' || p.id === 'ph-alg-310') detailUrl = '/bien-duplex-hydra';

  const priceSuffix = isAr ? (isVente ? 'دج' : 'دج / شهرياً') : (isVente ? 'DA' : 'DA / mois');
  const formattedPrice = Number(p.price).toLocaleString('fr-FR');

  const refLabel = isAr ? 'مرجع' : 'Réf';
  const bedLabel = isAr ? 'غرف' : 'Chambres';
  const bathLabel = isAr ? 'حمامات' : "Salles d'eau";
  const m2Label = isAr ? 'م²' : 'm²';
  const detailsBtnText = isAr ? 'التفاصيل' : 'Détails';

  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col border border-surface-container/60">
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={imgUrl}
          alt={title}
        />
        <div className="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
          <span className="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
            {badgeText}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-[11px]">
            <span className="material-symbols-outlined text-xs text-secondary-fixed">verified</span>
            {badgeLegal}
          </span>
        </div>
        <div className="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
          <button
            data-fav-id={p.id}
            onClick={toggleFavorite}
            className={`w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center hover:bg-surface-container-lowest shadow-sm transition-all ${
              isFav ? 'text-error' : 'text-on-surface hover:text-error'
            }`}
            type="button"
            title={isAr ? (isFav ? 'إزالة من المفضلة' : 'إضافة إلى المفضلة') : (isFav ? 'Retirer des favoris' : 'Ajouter aux favoris')}
          >
            <span className={`material-symbols-outlined text-title-md ${isFav ? 'material-symbols-filled text-red-500' : ''}`}>
              {isFav ? 'favorite' : 'favorite_border'}
            </span>
          </button>
        </div>
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
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
              {locationText}
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              <bdi>{refLabel}: {p.ref}</bdi>
            </span>
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            <Link href={detailUrl}>{title}</Link>
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span className="material-symbols-outlined text-sm text-secondary">king_bed</span>
              <bdi>{p.bedrooms || 0}</bdi>
            </span>
            <span className="font-label-sm text-label-sm text-outline">{bedLabel}</span>
          </div>
          <div className="flex flex-col items-center border-x border-surface-container-low">
            <span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span className="material-symbols-outlined text-sm text-secondary">bathtub</span>
              <bdi>{p.bathrooms || 0}</bdi>
            </span>
            <span className="font-label-sm text-label-sm text-outline">{bathLabel}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span className="material-symbols-outlined text-sm text-secondary">square_foot</span>
              <bdi>{p.surface || 0}</bdi>
            </span>
            <span className="font-label-sm text-label-sm text-outline">{m2Label}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-space-xs">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold bidi-safe">
                <bdi>{formattedPrice}</bdi>
              </span>
              <span className="font-label-sm text-label-sm text-secondary font-bold">{priceSuffix}</span>
            </div>
          </div>
          <Link
            className="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1 shadow-xs"
            href={detailUrl}
          >
            <span>{detailsBtnText}</span>
            <span className={`material-symbols-outlined text-sm ${isAr ? 'rtl-flip' : ''}`}>arrow_forward</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

