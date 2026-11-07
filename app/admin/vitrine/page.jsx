'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';

function VitrineContent() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/properties?limit=50', {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`Erreur serveur (${res.status})`);
      const data = await res.json();
      if (data.success && Array.isArray(data.properties)) {
        setProperties(data.properties);
      }
    } catch (err) {
      console.error('Erreur vitrine:', err);
      showToast('Impossible de charger les biens vitrine.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleToggleFeatured = async (id, currentStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(id)}/toggle-featured`, {
        method: 'POST'
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur mise à la une.');
      }

      setProperties(prev => prev.map(p => p.id === id ? { ...p, is_featured: !currentStatus } : p));
      showToast(data.message || 'Statut vitrine mis à jour.', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur mise à jour.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const featured = properties.filter(p => Boolean(p.is_featured));
  const nonFeatured = properties.filter(p => !p.is_featured);

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
              <span className="hover:text-primary transition-colors cursor-pointer">Administration</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="hover:text-primary transition-colors cursor-pointer">Gestion du Parc</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-secondary font-bold">Biens à la Une &amp; Vitrine</span>
            </nav>
            <div className="flex items-center gap-3 mt-1">
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Biens à la Une &amp; Sélection Vitrine</h1>
              <span className="px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-bold">
                {featured.length} En Vedette
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Contrôlez l'ordonnancement et la mise en vedette sur la page d'accueil publique de Prime House.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-5 py-2.5 rounded bg-secondary text-on-secondary font-label-md text-label-md flex items-center gap-2.5 hover:bg-secondary-fixed-dim hover:text-on-secondary-fixed transition-all shadow-md transform hover:-translate-y-0.5 font-bold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Ajouter un bien à la sélection vitrine</span>
            </button>
          </div>
        </div>

        {/* Live sync banner */}
        <div className="relative overflow-hidden rounded-xl bg-primary-container text-surface-container-lowest p-6 mb-10 shadow-lg">
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded bg-secondary/20 flex items-center justify-center shrink-0 text-secondary-fixed">
                <span className="material-symbols-outlined text-[28px]">published_with_changes</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2.5">
                  <span className="font-title-lg text-title-lg text-surface-container-lowest">Synchronisation en Direct Active</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-lowest/15 font-label-sm text-label-sm text-secondary-fixed uppercase font-mono">
                    `is_featured = true`
                  </span>
                </div>
                <p className="font-body-md text-body-md text-surface-container-highest max-w-4xl">
                  <strong>{featured.length} bien(s)</strong> sont actuellement affichés en page d'accueil publique. Toute modification se répercute instantanément sur le site public via Supabase.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-l-0 md:border-l border-surface-container-lowest/10 pl-0 md:pl-6">
              <button onClick={fetchProperties} className="w-10 h-10 rounded bg-surface-container-lowest/10 flex items-center justify-center text-surface-container-lowest hover:bg-secondary hover:text-on-secondary transition-colors cursor-pointer" title="Actualiser la liste" type="button">
                <span className="material-symbols-outlined text-[20px]">autorenew</span>
              </button>
            </div>
          </div>
        </div>

        {/* Current featured list */}
        <div className="flex flex-col gap-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-secondary"></span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Sélection Actuelle en Page d'Accueil</h2>
              <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-bold">
                {featured.length} Emplacements Actifs
              </span>
            </div>
          </div>

          {loading ? (
            <div className="p-12 bg-surface-container-lowest rounded-xl text-center text-on-surface-variant shadow-sm">
              <span className="material-symbols-outlined animate-spin text-3xl text-secondary">sync</span>
              <span className="block mt-2 font-label-sm">Chargement des biens à la une...</span>
            </div>
          ) : featured.length === 0 ? (
            <div className="p-12 bg-surface-container-lowest rounded-xl text-center text-on-surface-variant shadow-sm flex flex-col items-center gap-3">
              <span className="material-symbols-outlined text-4xl text-outline">grade</span>
              <p className="font-body-md">Aucun bien n'est actuellement mis en vedette dans la vitrine.</p>
              <button
                type="button"
                onClick={() => setAddModalOpen(true)}
                className="px-4 py-2 rounded bg-secondary text-on-secondary font-label-md text-label-md cursor-pointer font-bold"
              >
                Ajouter un premier mandat
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4" id="featured-list">
              {featured.map((item, index) => (
                <div key={item.id} className="group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                  <div className="flex items-start md:items-center gap-5">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-headline-sm text-headline-sm flex items-center justify-center shadow-sm font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <div className="relative w-44 md:w-56 aspect-[16/9] rounded-lg overflow-hidden shrink-0 shadow-inner bg-surface-container">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={(item.images && item.images[0]) || item.cover_image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bKsGPaeW8-X3XC8DoI9DT6EKwaAzgKLHCx422LwMp6VqohaRxtThvKprkfDbFmMTOsN41xJiEh69fs9dLQA-J-GFxBfJ_R7NSL6D6LCS4xeA7EIwDsCsmCbbHLENq1i4n2P6WaZ9C88UlEDrfxoNJflVVYTDZsay6cxmG3UuAggEvlO2eV2UkYwQKlGwvuyCFiLPJ0SD4n7iYI8u3f02gEdyjiM9vxBCPxUCSAWPIb3i1Au-Hs'}
                        alt={item.title}
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-label-sm uppercase shadow-sm">
                        {item.transaction_type === 'vente' ? 'À Vendre' : 'À Louer'}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase font-bold flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">star</span>
                          En Couverture Hero
                        </span>
                        <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase">RÉF: {item.ref}</span>
                        <span className="text-outline-variant">•</span>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          {item.commune}, {item.wilaya}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface truncate">{item.title}</h3>
                      <div className="flex items-center gap-4 text-on-surface-variant font-body-sm text-body-sm flex-wrap">
                        {item.bedrooms && <span>{item.bedrooms} Suites</span>}
                        {item.surface && <span>• {item.surface} m²</span>}
                        <span>•</span>
                        <span className="font-currency-display text-currency-display text-on-surface font-bold">
                          {Number(item.price).toLocaleString('fr-FR')} <span className="text-secondary text-sm font-label-md">DA</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between xl:justify-end gap-6 pt-4 xl:pt-0 border-t xl:border-t-0 border-surface-container">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/bien-detail?id=${encodeURIComponent(item.id)}`}
                        target="_blank"
                        className="w-9 h-9 rounded bg-surface-container text-on-surface hover:bg-secondary hover:text-on-secondary transition-colors flex items-center justify-center"
                        title="Voir fiche publique"
                      >
                        <span className="material-symbols-outlined text-[18px]">visibility</span>
                      </Link>
                      <button
                        onClick={() => handleToggleFeatured(item.id, true)}
                        disabled={actionLoading === item.id}
                        className="flex items-center gap-1 px-3 py-1.5 rounded bg-surface-container text-error hover:bg-error hover:text-on-error transition-colors font-label-sm text-label-sm cursor-pointer disabled:opacity-50"
                        title="Retirer de la vitrine"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove_circle_outline</span>
                        <span>Retirer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* MODAL: AJOUTER UN BIEN EN VITRINE */}
        {addModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-sm" onClick={() => setAddModalOpen(false)}></div>
            <div className="relative bg-surface-container-lowest rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
              <div className="p-6 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">grade</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Sélectionner un Bien pour la Vitrine</h3>
                </div>
                <button onClick={() => setAddModalOpen(false)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest cursor-pointer">
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex flex-col gap-3">
                {nonFeatured.length === 0 ? (
                  <p className="text-on-surface-variant text-center py-8">Tous les mandats sont déjà en vitrine !</p>
                ) : (
                  nonFeatured.map(item => (
                    <div key={item.id} className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between gap-4 hover:bg-surface-container transition-all">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded overflow-hidden shrink-0 bg-surface-container">
                          <img
                            src={(item.images && item.images[0]) || item.cover_image || ''}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-title-md text-title-md text-on-surface truncate font-semibold">{item.title}</span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">{item.ref} • {item.commune}, {item.wilaya} • {Number(item.price).toLocaleString('fr-FR')} DA</span>
                        </div>
                      </div>
                      <button
                        onClick={async () => {
                          await handleToggleFeatured(item.id, false);
                          setAddModalOpen(false);
                        }}
                        disabled={actionLoading === item.id}
                        className="px-4 py-2 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all font-label-sm text-label-sm font-bold whitespace-nowrap cursor-pointer disabled:opacity-50"
                      >
                        + Mettre en vedette
                      </button>
                    </div>
                  ))
                )}
              </div>

              <div className="p-4 bg-surface-container-low flex justify-end border-t border-surface-container">
                <button
                  onClick={() => setAddModalOpen(false)}
                  className="px-4 py-2 rounded bg-surface text-on-surface font-label-md text-label-md cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-container" />}>
      <VitrineContent />
    </Suspense>
  );
}
