'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';

function AdminContent() {
  const [properties, setProperties] = useState([]);
  const [counts, setCounts] = useState({
    all: 0,
    published: 0,
    moderation: 0,
    drafts: 0,
    archived: 0,
    featured: 0
  });
  const [inquiriesCount, setInquiriesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState('all');

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [propsRes, inqRes] = await Promise.all([
          fetch('/api/properties?limit=50', { headers: { 'Cache-Control': 'no-cache' } }),
          fetch('/api/inquiries?status=all', { headers: { 'Cache-Control': 'no-cache' } })
        ]);

        if (propsRes.ok) {
          const propsData = await propsRes.json();
          if (propsData.success && Array.isArray(propsData.properties)) {
            setProperties(propsData.properties);
            if (propsData.counts) setCounts(propsData.counts);
          }
        }

        if (inqRes.ok) {
          const inqData = await inqRes.json();
          if (inqData.success && typeof inqData.total === 'number') {
            setInquiriesCount(inqData.total);
          }
        }
      } catch (err) {
        console.error('Erreur chargement dashboard:', err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const handleExport = () => {
    window.location.href = '/api/properties/export?format=csv';
    showToast('Export du registre foncier initié.', 'info');
  };

  const ventesCount = properties.filter(p => p.transaction_type === 'vente').length;
  const locationsCount = properties.filter(p => p.transaction_type === 'location').length;
  const totalProps = counts.all || properties.length;
  const ventesPct = totalProps > 0 ? Math.round((ventesCount / totalProps) * 100) : 60;
  const locationsPct = 100 - ventesPct;

  const filteredProperties = properties.filter(p => {
    if (filterTab === 'moderation') return p.publication_status === 'moderation';
    if (filterTab === 'publie') return p.publication_status === 'publie';
    return true;
  });

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

<div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-8">
<div className="flex flex-col max-w-2xl">
<div className="flex items-center gap-2 mb-2">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">Console d'Exploitation Nationale</span>
<span className="text-surface-variant font-label-sm">•</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Alger Centre, DZ</span>
</div>
<h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        Tableau de Bord — Console d'Administration
      </h1>
<p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
        Supervision globale du parc immobilier, flux de modération foncière et traitement des demandes acquéreurs en Algérie.
      </p>
</div>
<div className="flex flex-wrap items-center gap-3">

<div className="flex items-center gap-2 px-3 py-2 rounded bg-surface-container-low shadow-sm">
<span className="relative flex h-2 w-2">
<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-fixed-dim opacity-75"></span>
<span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
</span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Supabase PostgreSQL connectée <strong className="text-on-surface font-semibold">(Live)</strong></span>
</div>

<button onClick={handleExport} className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface transition-all duration-200 font-label-md text-label-md shadow-sm cursor-pointer" type="button">
<span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
<span>Exporter le registre (CSV)</span>
</button>

<Link className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary hover:bg-secondary-fixed-dim text-on-secondary hover:text-on-secondary-fixed transition-all duration-200 font-label-lg text-label-lg shadow-md shadow-secondary/20 transform hover:-translate-y-0.5" data-path="ajouter-un-bien" href="/admin/ajouter-bien">
<span className="material-symbols-outlined text-[20px]">add_circle</span>
<span>Ajouter un bien</span>
</Link>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 pb-8">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Total des Biens en Base</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">apartment</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">{totalProps}</span>
<span className="font-label-sm text-label-sm text-secondary bg-surface-container px-2 py-0.5 rounded-full font-bold">Actifs</span>
</div>
<div className="mt-4 pt-3 bg-surface-container-low rounded p-2.5 flex items-center justify-between font-label-sm text-label-sm">
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="text-on-surface font-semibold">{ventesCount} Ventes</span>
<span className="text-on-surface-variant">({ventesPct}%)</span>
</div>
<div className="flex items-center gap-1.5">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span className="text-on-surface font-semibold">{locationsCount} Locations</span>
<span className="text-on-surface-variant">({locationsPct}%)</span>
</div>
</div>
</div>
<div className="w-full bg-surface-container h-1.5 rounded-full mt-3 overflow-hidden flex">
<div className="bg-primary-container h-full" style={{ "width": `${ventesPct}%` }}></div>
<div className="bg-secondary h-full" style={{ "width": `${locationsPct}%` }}></div>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Biens Actifs Publiés</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">public</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">{counts.published || properties.filter(p => p.publication_status === 'publie').length}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">en ligne</span>
</div>
<div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded bg-surface-container-high text-on-surface">
<span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
<span className="font-label-sm text-label-sm truncate font-semibold">Visibilité 100% sur le site public</span>
</div>
</div>
<div className="flex items-center justify-between pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span>Taux de disponibilité</span>
<span className="font-bold text-on-surface">100%</span>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">En Attente d'Approbation</span>
<div className="w-9 h-9 rounded bg-error-container text-on-error-container flex items-center justify-center">
<span className="material-symbols-outlined text-[20px]">gavel</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-error">{counts.moderation || properties.filter(p => p.publication_status === 'moderation').length}</span>
<span className="font-body-sm text-body-sm text-error font-medium">dossiers</span>
</div>
<div className="mt-4 flex items-center gap-2 px-2.5 py-1.5 rounded bg-error-container text-on-error-container">
<span className="material-symbols-outlined text-[16px]">priority_high</span>
<span className="font-label-sm text-label-sm font-semibold truncate">Vérification foncière</span>
</div>
</div>
<div className="flex items-center gap-2 pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span className="material-symbols-outlined text-[16px] text-secondary">description</span>
<span className="truncate">Actes notariés &amp; livrets</span>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
<div className="flex items-center justify-between pb-3">
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Demandes &amp; Visites</span>
<div className="w-9 h-9 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[20px]">mark_chat_unread</span>
</div>
</div>
<div>
<div className="flex items-baseline gap-2">
<span className="font-currency-display text-currency-display text-on-surface">{inquiriesCount}</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">requêtes</span>
</div>
<div className="mt-4 flex items-center justify-between px-2.5 py-1.5 rounded bg-surface-container-low">
<span className="font-label-sm text-label-sm text-on-surface font-semibold">Conciergerie VIP Active</span>
<span className="w-2 h-2 rounded-full bg-secondary"></span>
</div>
</div>
<div className="flex items-center justify-between pt-3 font-body-sm text-body-sm text-on-surface-variant">
<span>Canal dominant : WhatsApp &amp; Web</span>
<span className="font-bold text-secondary">Direct</span>
</div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-8">
<div className="p-4 rounded bg-primary-container text-surface-container-lowest flex items-center justify-between shadow-sm">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container-lowest/10 flex items-center justify-center text-secondary-fixed">
<span className="material-symbols-outlined text-[26px]">account_balance</span>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-surface-container-highest">Volume Portefeuille Géré</span>
<div className="flex items-baseline gap-1.5 mt-0.5">
<span className="font-currency-display text-currency-display text-secondary-fixed">{(properties.reduce((acc, p) => acc + (Number(p.price) || 0), 0) / 1000000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })}</span>
<span className="font-title-md text-title-md text-surface-container-lowest">Millions DA</span>
</div>
</div>
</div>
<div className="hidden sm:flex flex-col text-right">
<span className="font-label-sm text-label-sm text-surface-container-highest">Évaluation Algérie 2026</span>
<span className="font-body-sm text-body-sm text-secondary-fixed">Supabase PostgreSQL</span>
</div>
</div>
<div className="p-4 rounded bg-surface-container-lowest shadow-sm flex items-center justify-between">
<div className="flex items-center gap-4">
<div className="w-12 h-12 rounded bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-[26px]">map</span>
</div>
<div>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Wilayas Couvertes</span>
<div className="flex items-baseline gap-2 mt-0.5">
<span className="font-headline-sm text-headline-sm font-bold text-on-surface">69 Wilayas</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">(Alger, Oran, Constantine, Annaba...)</span>
</div>
</div>
</div>
<Link className="hidden sm:flex items-center gap-1 font-label-md text-label-md text-secondary hover:underline" href="/admin/categories-wilayas">
<span>Taxonomie</span>
<span className="material-symbols-outlined text-[16px]">north_east</span>
</Link>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

<div className="lg:col-span-8 flex flex-col gap-5">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-6">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
<div>
<h2 className="font-headline-sm text-headline-sm text-on-surface">Biens Récemment Ajoutés &amp; Soumis</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Suivi en temps réel des transactions, dossiers d'annonces et statuts d'approbation</p>
</div>

<div className="inline-flex rounded bg-surface-container p-1 gap-1">
<button onClick={() => setFilterTab('all')} className={`px-3 py-1.5 rounded font-label-md text-label-md transition-all ${filterTab === 'all' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">Tous ({totalProps})</button>
<button onClick={() => setFilterTab('moderation')} className={`px-3 py-1.5 rounded font-label-md text-label-md transition-all ${filterTab === 'moderation' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">En attente ({counts.moderation || properties.filter(p => p.publication_status === 'moderation').length})</button>
<button onClick={() => setFilterTab('publie')} className={`px-3 py-1.5 rounded font-label-md text-label-md transition-all ${filterTab === 'publie' ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface'}`} type="button">Publiés ({counts.published || properties.filter(p => p.publication_status === 'publie').length})</button>
</div>
</div>

<div className="overflow-x-auto">
<table className="w-full text-left border-collapse">
<thead>
<tr className="bg-surface-container-low font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
<th className="py-3 px-4 rounded-l">Bien &amp; Référence</th>
<th className="py-3 px-3">Type / Mandat</th>
<th className="py-3 px-3">Prix Actuel</th>
<th className="py-3 px-3">Localisation</th>
<th className="py-3 px-3">Statut</th>
<th className="py-3 px-4 text-right rounded-r">Actions</th>
</tr>
</thead>
<tbody className="font-body-sm text-body-sm divide-y divide-surface-container-high/40">

{loading ? (
  <tr>
    <td colSpan={6} className="py-8 text-center text-on-surface-variant">
      <span className="material-symbols-outlined animate-spin text-2xl text-secondary">sync</span>
      <span className="block mt-2 font-label-sm">Chargement du parc immobilier...</span>
    </td>
  </tr>
) : filteredProperties.length === 0 ? (
  <tr>
    <td colSpan={6} className="py-8 text-center text-on-surface-variant">
      Aucun bien trouvé pour cette sélection.
    </td>
  </tr>
) : (
  filteredProperties.slice(0, 6).map((item) => (
    <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors group">
      <td className="py-3.5 px-4 flex items-center gap-3">
        <div className="w-14 h-12 rounded bg-surface-container overflow-hidden flex-shrink-0 shadow-sm">
          <img
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            alt={item.title}
            src={(item.images && item.images[0]) || item.cover_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJdUJNFHFdrmdMGZr5rRpYjpaUgWlsoh1TcbcCrnhjAAso39bdhR_HGRPJyRhGFWezJXFq27mfsK7VHxyAxLDT6Jg-DxJLero2fXkvSvQFFi-d-Moiemwcx3lbda7pB43X8Pkji0bYxLPrSq5BeaMj74xVdVus83U85eDdmw2F65bpTdE-mcdZmFr8L34CPfXqQ8x_VptTn7T8SprQxIMlkdDMCWgTqIEtpcznvVQOe34vBnRANNI'}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span className="font-title-md text-title-md text-on-surface font-semibold truncate max-w-xs">{item.title}</span>
          <span className="font-label-sm text-label-sm text-on-surface-variant">REF: {item.ref} • {item.surface} m²</span>
        </div>
      </td>
      <td className="py-3.5 px-3">
        <div className="flex flex-col">
          <span className="font-label-md text-label-md font-semibold text-on-surface capitalize">{item.property_type}</span>
          <span className="font-label-sm text-label-sm text-secondary font-bold capitalize">{item.transaction_type === 'vente' ? 'Vente Exclusive' : 'Location Prestige'}</span>
        </div>
      </td>
      <td className="py-3.5 px-3 whitespace-nowrap">
        <span className="font-label-lg text-label-lg font-bold text-on-surface">{Number(item.price).toLocaleString('fr-FR')}</span>
        <span className="font-label-sm text-label-sm text-secondary font-bold ml-0.5">DA</span>
      </td>
      <td className="py-3.5 px-3">
        <div className="flex items-center gap-1 text-on-surface">
          <span className="material-symbols-outlined text-[15px] text-secondary">location_on</span>
          <span className="font-medium truncate max-w-[120px]">{item.commune}, {item.wilaya}</span>
        </div>
      </td>
      <td className="py-3.5 px-3">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-semibold ${
          item.publication_status === 'publie' ? 'bg-secondary-container/40 text-on-secondary-container' :
          item.publication_status === 'moderation' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high text-on-surface'
        }`}>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
          <span className="capitalize">{item.publication_status}</span>
        </span>
      </td>
      <td className="py-3.5 px-4 text-right">
        <div className="flex items-center justify-end gap-1">
          <Link href={`/bien-detail?id=${encodeURIComponent(item.id)}`} target="_blank" className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Voir sur le site public">
            <span className="material-symbols-outlined text-[18px]">visibility</span>
          </Link>
          <Link href={`/admin/biens`} className="w-8 h-8 rounded hover:bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors" title="Gérer dans les biens">
            <span className="material-symbols-outlined text-[18px]">edit</span>
          </Link>
        </div>
      </td>
    </tr>
  ))
)}

</tbody>
</table>
</div>
</div>
</div>

<div className="lg:col-span-4 flex flex-col gap-6">

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-2 border-b border-surface-container">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Actions Rapides</h3>
<span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
</div>
<div className="flex flex-col gap-2">
<Link href="/admin/ajouter-bien" className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-secondary">add_circle</span>
    <span className="font-label-md text-label-md text-on-surface font-semibold">Publier un mandat</span>
  </div>
  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</Link>
<Link href="/admin/moderation" className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-error">gavel</span>
    <span className="font-label-md text-label-md text-on-surface font-semibold">Examiner la modération</span>
  </div>
  <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-xs font-bold">{counts.moderation || 0}</span>
</Link>
<Link href="/admin/demandes" className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-secondary">mail</span>
    <span className="font-label-md text-label-md text-on-surface font-semibold">Demandes d'acquéreurs</span>
  </div>
  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">{inquiriesCount}</span>
</Link>
<Link href="/admin/parametres" className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all flex items-center justify-between">
  <div className="flex items-center gap-3">
    <span className="material-symbols-outlined text-secondary">settings</span>
    <span className="font-label-md text-label-md text-on-surface font-semibold">Paramètres &amp; WhatsApp</span>
  </div>
  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
</Link>
</div>
</div>

<div className="p-6 rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-4">
<div className="flex items-center justify-between pb-2 border-b border-surface-container">
<h3 className="font-title-md text-title-md text-on-surface font-semibold">Sécurité &amp; Infrastructure</h3>
<span className="material-symbols-outlined text-secondary text-[20px]">shield</span>
</div>
<div className="flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
<div className="flex items-center justify-between">
  <span>Moteur Base de Données</span>
  <span className="font-mono text-secondary font-bold">PostgreSQL 17 (Supabase)</span>
</div>
<div className="flex items-center justify-between">
  <span>Authentification Admin</span>
  <span className="font-mono text-on-surface font-semibold">PBKDF2-SHA512 + HMAC</span>
</div>
<div className="flex items-center justify-between">
  <span>Stockage Médias</span>
  <span className="font-mono text-on-surface font-semibold">Supabase Storage CDN</span>
</div>
<div className="flex items-center justify-between">
  <span>Contrôle d'Accès</span>
  <span className="font-mono text-secondary font-bold">RLS 100% Imposé</span>
</div>
</div>
</div>

</div>
</div>

</div>
      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-container" />}>
      <AdminContent />
    </Suspense>
  );
}