'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';
import { ALL_WILAYAS } from '@/lib/data';

function BiensContent() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [statusTab, setStatusTab] = useState('all'); // 'all' | 'publie' | 'moderation' | 'brouillon' | 'archive'
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionFilter, setTransactionFilter] = useState('all'); // 'all' | 'vente' | 'location'
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [wilayaFilter, setWilayaFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Selection
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [bulkMenuOpen, setBulkMenuOpen] = useState(false);
  const [activeRowMenu, setActiveRowMenu] = useState(null);

  // Modals
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [previewModalItem, setPreviewModalItem] = useState(null);
  const [editModalItem, setEditModalItem] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  // Stats
  const [counts, setCounts] = useState({
    all: 0,
    published: 0,
    moderation: 0,
    drafts: 0,
    archived: 0,
    featured: 0,
  });

  const abortControllerRef = useRef(null);

  const fetchProperties = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/properties', {
        signal: abortControllerRef.current.signal,
        headers: { 'Cache-Control': 'no-cache' },
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.properties)) {
        setProperties(data.properties);
        if (data.counts) {
          setCounts(data.counts);
        }
      } else {
        throw new Error(data.error || 'Réponse invalide.');
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Erreur chargement propriétés:', err);
      setError(err.message || 'Impossible de charger la liste des biens.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProperties();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchProperties]);

  // Close menus on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('#bulk-menu-container')) {
        setBulkMenuOpen(false);
      }
      if (!e.target.closest('.row-menu-container')) {
        setActiveRowMenu(null);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  // Filter & Search
  const filteredProperties = properties
    .filter((item) => {
      // Status tab
      if (statusTab !== 'all' && item.publication_status !== statusTab) {
        return false;
      }
      // Transaction
      if (transactionFilter !== 'all' && item.transaction_type !== transactionFilter) {
        return false;
      }
      // Category
      if (categoryFilter !== 'all') {
        const cat = (item.category_name || '').toLowerCase();
        if (!cat.includes(categoryFilter.toLowerCase())) return false;
      }
      // Wilaya
      if (wilayaFilter !== 'all') {
        if (Number(item.wilaya_code) !== Number(wilayaFilter)) return false;
      }
      // Price
      if (priceFilter !== 'all') {
        const p = Number(item.price) || 0;
        if (priceFilter === '<50m' && p >= 50000000) return false;
        if (priceFilter === '50-120m' && (p < 50000000 || p > 120000000)) return false;
        if (priceFilter === '120-250m' && (p < 120000000 || p > 250000000)) return false;
        if (priceFilter === '>250m' && p <= 250000000) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = `${item.ref || ''} ${item.title || ''} ${item.wilaya_name || ''} ${item.commune || ''} ${item.owner_name || ''} ${item.category_name || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price_desc') return (Number(b.price) || 0) - (Number(a.price) || 0);
      if (sortBy === 'price_asc') return (Number(a.price) || 0) - (Number(b.price) || 0);
      if (sortBy === 'views') return (Number(b.views_count) || 0) - (Number(a.views_count) || 0);
      return new Date(b.created_at || 0) - new Date(a.created_at || 0);
    });

  // Reset Filters
  const handleResetFilters = () => {
    setStatusTab('all');
    setSearchQuery('');
    setTransactionFilter('all');
    setCategoryFilter('all');
    setWilayaFilter('all');
    setPriceFilter('all');
    setSortBy('recent');
  };

  // Toggle Featured (Star)
  const handleToggleFeatured = async (item) => {
    setActionLoading(item.id);
    const newFeatured = !item.is_featured;

    // Optimistic update
    setProperties((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, is_featured: newFeatured } : p))
    );
    setCounts((prev) => ({
      ...prev,
      featured: newFeatured ? prev.featured + 1 : Math.max(0, prev.featured - 1),
    }));

    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(item.id)}/toggle-featured`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur');
      }
      showToast(data.message, 'success');
    } catch (err) {
      // Revert on error
      setProperties((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, is_featured: !newFeatured } : p))
      );
      showToast(err.message || 'Erreur lors de la mise en vitrine.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Delete Property
  const handleConfirmDelete = async () => {
    if (!deleteModalItem) return;
    const targetId = deleteModalItem.id;
    setActionLoading(targetId);

    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(targetId)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la suppression.');
      }

      setProperties((prev) => prev.filter((p) => p.id !== targetId));
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(targetId);
        return next;
      });
      setCounts((prev) => ({
        ...prev,
        all: Math.max(0, prev.all - 1),
        published: deleteModalItem.publication_status === 'publie' ? Math.max(0, prev.published - 1) : prev.published,
      }));

      showToast(data.message || 'Bien supprimé avec succès.', 'success');
      setDeleteModalItem(null);
    } catch (err) {
      showToast(err.message || 'Erreur lors de la suppression.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Duplicate Property
  const handleDuplicate = async (item) => {
    setActionLoading(item.id);
    setActiveRowMenu(null);
    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(item.id)}/duplicate`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la duplication.');
      }
      setProperties((prev) => [data.property, ...prev]);
      setCounts((prev) => ({ ...prev, all: prev.all + 1, drafts: prev.drafts + 1 }));
      showToast(data.message || 'Mandat dupliqué en brouillon.', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors de la duplication.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Toggle Publication
  const handleTogglePublish = async (item) => {
    setActionLoading(item.id);
    setActiveRowMenu(null);
    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(item.id)}/toggle-publish`, {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur');
      }
      setProperties((prev) =>
        prev.map((p) =>
          p.id === item.id ? { ...p, publication_status: data.publication_status } : p
        )
      );
      showToast(data.message, 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors du changement de statut.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (item) => {
    setEditModalItem(item);
    setEditForm({
      title: item.title || '',
      price: item.price || '',
      transaction_type: item.transaction_type || 'vente',
      category_name: item.category_name || 'Villa Contemporaine',
      publication_status: item.publication_status || 'publie',
      wilaya_name: item.wilaya_name || 'Alger',
      commune: item.commune || 'Hydra',
      surface_habitable: item.surface_habitable || '',
      bedrooms: item.bedrooms || '',
      bathrooms: item.bathrooms || '',
      is_featured: Boolean(item.is_featured),
    });
  };

  // Save Edit Modal
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editModalItem) return;
    setActionLoading(editModalItem.id);

    try {
      const res = await fetch(`/api/properties/${encodeURIComponent(editModalItem.id)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la mise à jour.');
      }

      setProperties((prev) =>
        prev.map((p) => (p.id === editModalItem.id ? data.property : p))
      );
      showToast(`Mandat ${editModalItem.ref} mis à jour avec succès.`, 'success');
      setEditModalItem(null);
    } catch (err) {
      showToast(err.message || 'Erreur lors de la mise à jour.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Selection handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(new Set(filteredProperties.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Total sales value calculation
  const totalSalesValue = properties
    .filter((p) => p.transaction_type === 'vente')
    .reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  const totalViews = properties.reduce((sum, p) => sum + (Number(p.views_count) || 0), 0);

  return (
    <AdminLayout>
      <div className="flex flex-col w-full relative">
        {/* Header Section */}
        <div className="relative w-full mb-8">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-surface-variant/40">
            <div className="flex flex-col gap-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                  Parc Prestige Algérie
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  69 Wilayas Couvertes
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                Gestion du Parc Immobilier
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Contrôlez, filtrez et administrez l'ensemble des mandats exclusifs de vente et de location sur le territoire national avec validation cadastrale et suivi notarié.
              </p>
            </div>

            {/* Actions groupées & Ajouter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative" id="bulk-menu-container">
                <button
                  type="button"
                  onClick={() => setBulkMenuOpen(!bulkMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-all shadow-sm font-label-md text-label-md cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
                  <span>Actions groupées</span>
                  {selectedIds.size > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-secondary text-surface text-xs font-bold">
                      {selectedIds.size}
                    </span>
                  )}
                  <span className="material-symbols-outlined text-[16px] text-outline">arrow_drop_down</span>
                </button>

                {bulkMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl bg-surface-container-lowest shadow-2xl p-2 z-30 ring-1 ring-black/5 flex flex-col gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        window.open('/api/properties/export', '_blank');
                        setBulkMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-body-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">file_download</span>
                      <span>Exporter registre (CSV)</span>
                    </button>
                    <div className="h-px bg-surface-variant/40 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        if (selectedIds.size === 0) {
                          showToast('Veuillez sélectionner au moins un bien.', 'info');
                          return;
                        }
                        showToast(`${selectedIds.size} mandats sélectionnés pour action groupée.`, 'info');
                        setBulkMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-body-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px] text-secondary">select_all</span>
                      <span>Sélection : {selectedIds.size} bien(s)</span>
                    </button>
                  </div>
                )}
              </div>

              <Link
                href="/admin/ajouter-bien"
                className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-lg bg-secondary text-surface-container-lowest font-label-md text-label-md uppercase tracking-wide hover:brightness-105 active:scale-[0.99] transition-all shadow-md font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Ajouter un bien</span>
              </Link>
            </div>
          </div>

          {/* 4 Top KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Actifs en vitrine
                </span>
                <span className="font-currency-display text-currency-display text-on-surface mt-1">
                  {counts.featured}
                </span>
                <span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">star</span> Biens à la Une
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  En Vérification
                </span>
                <span className="font-currency-display text-currency-display text-secondary mt-1">
                  {counts.moderation}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Dossiers fonciers DZ
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">hourglass_top</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Valeur Mandats Vente
                </span>
                <span className="font-currency-display text-currency-display text-on-surface mt-1">
                  {(totalSalesValue / 1000000000).toFixed(2)}{' '}
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Mrd DA</span>
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Alger, Oran, Blida...
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">account_balance</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container-lowest shadow-sm flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  Consultations
                </span>
                <span className="font-currency-display text-currency-display text-on-surface mt-1">
                  {(totalViews / 1000).toFixed(1)}k
                </span>
                <span className="font-body-sm text-body-sm text-secondary flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-[14px]">visibility</span> Vues certifiées
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">visibility</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Navigation & Search */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 bg-surface-container-lowest p-2 rounded-xl shadow-sm">
            <nav className="flex flex-wrap items-center gap-1">
              <button
                type="button"
                onClick={() => setStatusTab('all')}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer ${
                  statusTab === 'all'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>Tous</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-surface-container-lowest font-label-sm text-label-sm">
                  {counts.all}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusTab('publie')}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer ${
                  statusTab === 'publie'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>Publiés en ligne</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  {counts.published}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusTab('moderation')}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer ${
                  statusTab === 'moderation'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>En modération</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
                  {counts.moderation}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusTab('brouillon')}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer ${
                  statusTab === 'brouillon'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>Brouillons</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  {counts.drafts}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setStatusTab('archive')}
                className={`px-4 py-2 rounded-lg font-label-md text-label-md flex items-center gap-2 transition-all cursor-pointer ${
                  statusTab === 'archive'
                    ? 'bg-primary-container text-surface-container-lowest shadow-sm font-bold'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span>Dépubliés / Archivés</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                  {counts.archived}
                </span>
              </button>
            </nav>

            <div className="relative w-full md:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Réf (ex: PH-ALG), titre, wilaya, propriétaire..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-body-sm text-body-sm outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface text-sm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Secondary Dropdown Filters */}
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full xl:w-auto">
              <div className="relative">
                <select
                  value={transactionFilter}
                  onChange={(e) => setTransactionFilter(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
                >
                  <option value="all">Toutes transactions</option>
                  <option value="vente">À Vendre (Cession définitive)</option>
                  <option value="location">À Louer (Bail prestige)</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                  unfold_more
                </span>
              </div>

              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
                >
                  <option value="all">Toutes catégories</option>
                  <option value="villa">Villa &amp; Propriété</option>
                  <option value="duplex">Duplex &amp; Penthouse</option>
                  <option value="appartement">Appartement Haut Standing</option>
                  <option value="terrain">Terrain Viabilisé</option>
                  <option value="demeure">Demeure Historique</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                  unfold_more
                </span>
              </div>

              <div className="relative">
                <select
                  value={wilayaFilter}
                  onChange={(e) => setWilayaFilter(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
                >
                  <option value="all">Toutes les wilayas (69 wilayas)</option>
                  {ALL_WILAYAS.map((w) => (
                    <option key={`admin-biens-wilaya-${w.code}`} value={w.code}>
                      {w.code} — {w.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                  unfold_more
                </span>
              </div>

              <div className="relative">
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full appearance-none px-3.5 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-body-sm pr-9 outline-none focus:ring-2 focus:ring-secondary/40 cursor-pointer"
                >
                  <option value="all">Tous les prix (DA)</option>
                  <option value="<50m">&lt; 50 000 000 DA</option>
                  <option value="50-120m">50M - 120 000 000 DA</option>
                  <option value="120-250m">120M - 250 000 000 DA</option>
                  <option value=">250m">&gt; 250 000 000 DA</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-outline text-[18px] pointer-events-none">
                  unfold_more
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-3 w-full xl:w-auto">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider hidden sm:inline">
                  Tri:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md outline-none cursor-pointer"
                  >
                    <option value="recent">Plus récents d'abord</option>
                    <option value="price_desc">Prix : Décroissant</option>
                    <option value="price_asc">Prix : Croissant</option>
                    <option value="views">Plus consultés (Vues)</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-outline text-[16px] pointer-events-none">
                    swap_vert
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="px-3 py-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors font-label-sm text-label-sm flex items-center gap-1.5 uppercase cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-12 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-secondary border-t-transparent rounded-full animate-spin" />
            <span className="font-label-md uppercase tracking-wider text-secondary font-bold">
              Chargement de l'inventaire immobilier...
            </span>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="w-full bg-error-container/20 border border-error/30 rounded-xl p-8 text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-error">error</span>
            <h3 className="font-headline-sm text-lg text-on-surface font-semibold">
              Erreur lors du chargement des biens
            </h3>
            <p className="font-body-sm text-on-surface-variant max-w-md">{error}</p>
            <button
              type="button"
              onClick={fetchProperties}
              className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-label-md uppercase cursor-pointer"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm p-12 text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[52px] text-outline">apartment</span>
            <h3 className="font-headline-sm text-lg text-on-surface font-semibold">
              Aucun bien immobilier trouvé
            </h3>
            <p className="font-body-sm text-on-surface-variant max-w-md">
              Aucun mandat ne correspond aux critères de recherche et filtres sélectionnés.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-2 px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs uppercase cursor-pointer"
            >
              Effacer tous les filtres
            </button>
          </div>
        )}

        {/* Properties Table */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div className="w-full bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
                    <th className="py-4 px-4 w-12 text-center">
                      <input
                        type="checkbox"
                        checked={selectedIds.size > 0 && selectedIds.size === filteredProperties.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container"
                      />
                    </th>
                    <th className="py-4 px-4 min-w-[200px]">Visuel &amp; Référence</th>
                    <th className="py-4 px-4 min-w-[280px]">Titre &amp; Caractéristiques</th>
                    <th className="py-4 px-4 min-w-[160px]">Transaction / Type</th>
                    <th className="py-4 px-4 min-w-[170px]">Prix Présentation (DA)</th>
                    <th className="py-4 px-4 min-w-[180px]">Localisation</th>
                    <th className="py-4 px-4 min-w-[140px]">Statut</th>
                    <th className="py-4 px-4 min-w-[120px]">Dépôt / Maj</th>
                    <th className="py-4 px-4 min-w-[120px]">Performance</th>
                    <th className="py-4 px-4 min-w-[180px] text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-variant/30 text-body-sm text-on-surface">
                  {filteredProperties.map((item) => {
                    const isSelected = selectedIds.has(item.id);
                    const isVente = item.transaction_type === 'vente';
                    const isPublished = item.publication_status === 'publie';
                    const isModeration = item.publication_status === 'moderation';
                    const isFeatured = Boolean(item.is_featured);

                    return (
                      <tr
                        key={item.id}
                        className={`hover:bg-surface-container-low/40 transition-colors ${
                          isSelected ? 'bg-secondary/5' : ''
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-4 px-4 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(item.id)}
                            className="w-4 h-4 rounded text-secondary focus:ring-0 cursor-pointer accent-primary-container"
                          />
                        </td>

                        {/* Visuel & Réf */}
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-16 h-12 rounded-lg bg-surface-container overflow-hidden shrink-0 relative">
                              <img
                                alt={item.title}
                                className="w-full h-full object-cover"
                                src={item.main_image || (item.images && item.images[0]) || '/assets/logo-p-transparent.png'}
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="font-mono text-xs font-bold text-on-surface">
                                {item.ref || item.id}
                              </span>
                              <span className="font-label-sm text-[11px] text-outline">
                                {(item.images && item.images.length) || 1} photo(s)
                              </span>
                              {item.is_demo && (
                                <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant text-[10px] font-bold uppercase">
                                  Démo
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Titre & Caractéristiques */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col max-w-xs">
                            <span className="font-title-md text-sm font-semibold text-on-surface line-clamp-1">
                              {item.title}
                            </span>
                            <div className="flex items-center gap-2 mt-1 text-on-surface-variant text-xs">
                              {item.surface_habitable && <span>{item.surface_habitable} m²</span>}
                              {item.bedrooms && <span>• {item.bedrooms} ch.</span>}
                              {item.bathrooms && <span>• {item.bathrooms} sdb</span>}
                            </div>
                          </div>
                        </td>

                        {/* Transaction / Type */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1 items-start">
                            <span
                              className={`px-2 py-0.5 rounded font-label-sm text-xs font-bold uppercase tracking-wider ${
                                isVente
                                  ? 'bg-primary-container text-surface'
                                  : 'bg-secondary-fixed text-on-secondary-fixed-variant'
                              }`}
                            >
                              {isVente ? 'À VENDRE' : 'À LOUER'}
                            </span>
                            <span className="font-body-sm text-xs text-on-surface-variant">
                              {item.category_name || 'Prestige'}
                            </span>
                          </div>
                        </td>

                        {/* Prix */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <span className="font-currency-display text-sm font-bold text-on-surface">
                              {item.price ? Number(item.price).toLocaleString('fr-FR') : 'Sur demande'}{' '}
                              <span className="font-label-sm text-xs text-secondary">DA</span>
                            </span>
                            {item.transaction_type === 'location' && (
                              <span className="font-label-sm text-[11px] text-outline">/ mois</span>
                            )}
                          </div>
                        </td>

                        {/* Localisation */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col">
                            <span className="font-title-md text-xs font-semibold text-on-surface">
                              {item.commune || 'Centre'}
                            </span>
                            <span className="font-body-sm text-[11px] text-on-surface-variant">
                              {item.wilaya_name || 'Algérie'} ({item.wilaya_code || '16'})
                            </span>
                          </div>
                        </td>

                        {/* Statut */}
                        <td className="py-4 px-4">
                          {isPublished && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-label-sm text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Publié
                            </span>
                          )}
                          {isModeration && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-700 font-label-sm text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                              En modération
                            </span>
                          )}
                          {item.publication_status === 'brouillon' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-500/15 text-slate-700 font-label-sm text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                              Brouillon
                            </span>
                          )}
                          {item.publication_status === 'archive' && (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-500/10 text-gray-500 font-label-sm text-xs font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                              Archivé
                            </span>
                          )}
                        </td>

                        {/* Dépôt / Maj */}
                        <td className="py-4 px-4 text-xs text-on-surface-variant">
                          <span>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString('fr-FR')
                              : 'Récemment'}
                          </span>
                        </td>

                        {/* Performance */}
                        <td className="py-4 px-4">
                          <div className="flex flex-col text-xs text-on-surface">
                            <span className="font-semibold">{item.views_count || 140} vues</span>
                            <span className="text-secondary text-[11px]">Direct prestige</span>
                          </div>
                        </td>

                        {/* ACTIONS COLUMN - FULLY FUNCTIONAL WITH VISIBLE DELETE ICON */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {/* 1. VIEW / PREVIEW BUTTON (Eye) */}
                            <button
                              type="button"
                              onClick={() => setPreviewModalItem(item)}
                              className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                              title="Inspecter / Prévisualiser"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>

                            {/* 2. EDIT BUTTON (Pencil) */}
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(item)}
                              className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-secondary flex items-center justify-center transition-colors cursor-pointer"
                              title="Modifier la fiche"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>

                            {/* 3. FEATURED TOGGLE (Star) */}
                            <button
                              type="button"
                              disabled={actionLoading === item.id}
                              onClick={() => handleToggleFeatured(item)}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                                isFeatured
                                  ? 'bg-secondary/15 text-secondary hover:bg-secondary/25'
                                  : 'hover:bg-surface-container text-outline hover:text-secondary'
                              }`}
                              title={isFeatured ? 'Retirer de la vitrine' : 'Mettre à la Une (Vitrine)'}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                {isFeatured ? 'star' : 'star_border'}
                              </span>
                            </button>

                            {/* 4. EXPLICIT DELETE BUTTON (Trash Can - Red) */}
                            <button
                              type="button"
                              disabled={actionLoading === item.id}
                              onClick={() => setDeleteModalItem(item)}
                              className="w-8 h-8 rounded-lg hover:bg-error-container/40 text-error flex items-center justify-center transition-colors cursor-pointer"
                              title="Supprimer définitivement"
                            >
                              <span className="material-symbols-outlined text-[18px]">delete</span>
                            </button>

                            {/* 5. MORE OPTIONS DROPDOWN (Three Dots) */}
                            <div className="relative row-menu-container">
                              <button
                                type="button"
                                onClick={() =>
                                  setActiveRowMenu(activeRowMenu === item.id ? null : item.id)
                                }
                                className="w-8 h-8 rounded-lg hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
                                title="Plus d'actions"
                              >
                                <span className="material-symbols-outlined text-[18px]">more_vert</span>
                              </button>

                              {activeRowMenu === item.id && (
                                <div className="absolute right-0 mt-1 w-52 rounded-xl bg-surface-container-lowest shadow-2xl p-2 z-40 ring-1 ring-black/5 flex flex-col gap-1 text-left">
                                  <button
                                    type="button"
                                    onClick={() => handleDuplicate(item)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-xs flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[16px] text-secondary">
                                      content_copy
                                    </span>
                                    <span>Dupliquer le mandat</span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => handleTogglePublish(item)}
                                    className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-xs flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[16px] text-outline">
                                      {isPublished ? 'unpublished' : 'publish'}
                                    </span>
                                    <span>{isPublished ? 'Dépublier / Archiver' : 'Publier en ligne'}</span>
                                  </button>

                                  <Link
                                    href={`/bien-detail?id=${item.id}`}
                                    target="_blank"
                                    className="w-full text-left px-3 py-2 rounded-lg text-on-surface hover:bg-surface-container-low transition-colors font-body-sm text-xs flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[16px] text-secondary">
                                      open_in_new
                                    </span>
                                    <span>Voir sur site public</span>
                                  </Link>

                                  <div className="h-px bg-surface-variant/40 my-1" />

                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveRowMenu(null);
                                      setDeleteModalItem(item);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-lg text-error hover:bg-error-container/30 transition-colors font-body-sm text-xs flex items-center gap-2 cursor-pointer"
                                  >
                                    <span className="material-symbols-outlined text-[16px] text-error">
                                      delete_forever
                                    </span>
                                    <span>Supprimer le bien</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Footer */}
            <div className="px-6 py-4 bg-surface-container-low/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
              <span>
                Affichage de <strong>{filteredProperties.length}</strong> bien(s) sur un total de <strong>{properties.length}</strong>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.open('/api/properties/export', '_blank')}
                  className="px-3 py-1.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs flex items-center gap-1.5 cursor-pointer uppercase"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">download</span>
                  <span>Export Registre CSV</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DELETE CONFIRMATION MODAL */}
        {deleteModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setDeleteModalItem(null)}
            />
            <div className="relative w-full max-w-md bg-surface-container-lowest rounded-xl shadow-2xl p-6 z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3 text-error">
                <div className="w-10 h-10 rounded-full bg-error-container/40 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[24px]">delete_forever</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface font-semibold">
                    Supprimer définitivement ?
                  </h3>
                  <span className="font-mono text-xs text-outline font-bold">
                    Réf: {deleteModalItem.ref}
                  </span>
                </div>
              </div>

              <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                Êtes-vous certain de vouloir supprimer le bien <strong>{deleteModalItem.title}</strong> ?
                Cette action est irréversible et supprimera le mandat du catalogue et de la base de données.
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setDeleteModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs uppercase cursor-pointer hover:bg-surface-container-high"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={actionLoading === deleteModalItem.id}
                  onClick={handleConfirmDelete}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-error text-on-error font-label-md text-xs uppercase font-bold hover:bg-on-error-container transition-all cursor-pointer disabled:opacity-50"
                >
                  {actionLoading === deleteModalItem.id ? (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  )}
                  <span>Confirmer la suppression</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUICK PREVIEW MODAL */}
        {previewModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setPreviewModalItem(null)}
            />
            <div className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl p-6 z-10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-secondary font-bold">
                    {previewModalItem.ref} • {previewModalItem.transaction_type === 'vente' ? 'Vente' : 'Location'}
                  </span>
                  <h3 className="font-headline-sm text-xl text-on-surface font-bold mt-1">
                    {previewModalItem.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewModalItem(null)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="w-full h-64 rounded-xl overflow-hidden bg-surface-container relative">
                <img
                  alt={previewModalItem.title}
                  className="w-full h-full object-cover"
                  src={previewModalItem.main_image || (previewModalItem.images && previewModalItem.images[0]) || '/assets/logo-p-transparent.png'}
                />
              </div>

              <div className="flex items-center justify-between bg-surface-container-low p-4 rounded-xl">
                <div>
                  <span className="font-label-sm text-xs text-outline uppercase">Prix affiché</span>
                  <div className="font-currency-display text-2xl font-bold text-on-surface">
                    {previewModalItem.price ? Number(previewModalItem.price).toLocaleString('fr-FR') : 'Sur demande'}{' '}
                    <span className="text-secondary text-sm">DA</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-xs text-outline uppercase">Localisation</span>
                  <div className="font-title-md text-sm font-semibold text-on-surface">
                    {previewModalItem.commune}, {previewModalItem.wilaya_name} ({previewModalItem.wilaya_code})
                  </div>
                </div>
              </div>

              <p className="font-body-sm text-sm text-on-surface-variant leading-relaxed">
                {previewModalItem.description || 'Aucune description renseignée pour ce bien.'}
              </p>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <Link
                  href={`/bien-detail?id=${previewModalItem.id}`}
                  target="_blank"
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs uppercase flex items-center gap-1.5 hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[16px] text-secondary">open_in_new</span>
                  <span>Voir la page publique</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setPreviewModalItem(null)}
                  className="px-5 py-2 rounded-lg bg-primary text-on-primary font-label-md text-xs uppercase"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* QUICK EDIT MODAL */}
        {editModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setEditModalItem(null)}
            />
            <form
              onSubmit={handleSaveEdit}
              className="relative w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl p-6 z-10 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
                <div>
                  <h3 className="font-headline-sm text-lg text-on-surface font-bold">
                    Édition Rapide du Mandat
                  </h3>
                  <span className="font-mono text-xs text-secondary font-bold">
                    Réf: {editModalItem.ref}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface cursor-pointer hover:bg-surface-container-high"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                    Titre du bien *
                  </label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none focus:ring-1 focus:ring-secondary"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Prix (DA) *
                    </label>
                    <input
                      type="number"
                      required
                      value={editForm.price}
                      onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none focus:ring-1 focus:ring-secondary"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Transaction
                    </label>
                    <select
                      value={editForm.transaction_type}
                      onChange={(e) => setEditForm({ ...editForm, transaction_type: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none cursor-pointer"
                    >
                      <option value="vente">À Vendre</option>
                      <option value="location">À Louer</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Statut de publication
                    </label>
                    <select
                      value={editForm.publication_status}
                      onChange={(e) => setEditForm({ ...editForm, publication_status: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none cursor-pointer"
                    >
                      <option value="publie">Publié en ligne</option>
                      <option value="moderation">En modération</option>
                      <option value="brouillon">Brouillon</option>
                      <option value="archive">Archivé / Dépublié</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Commune
                    </label>
                    <input
                      type="text"
                      value={editForm.commune}
                      onChange={(e) => setEditForm({ ...editForm, commune: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Surface (m²)
                    </label>
                    <input
                      type="number"
                      value={editForm.surface_habitable}
                      onChange={(e) => setEditForm({ ...editForm, surface_habitable: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Chambres
                    </label>
                    <input
                      type="number"
                      value={editForm.bedrooms}
                      onChange={(e) => setEditForm({ ...editForm, bedrooms: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="font-label-sm text-xs uppercase text-on-surface font-bold block mb-1">
                      Salles de bain
                    </label>
                    <input
                      type="number"
                      value={editForm.bathrooms}
                      onChange={(e) => setEditForm({ ...editForm, bathrooms: e.target.value })}
                      className="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm outline-none"
                    />
                  </div>
                </div>

                <div className="p-3 bg-secondary/10 rounded-lg flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="editFeaturedCheck"
                    checked={editForm.is_featured}
                    onChange={(e) => setEditForm({ ...editForm, is_featured: e.target.checked })}
                    className="w-4 h-4 accent-secondary rounded cursor-pointer"
                  />
                  <label htmlFor="editFeaturedCheck" className="font-body-sm text-xs text-on-surface cursor-pointer font-semibold">
                    Mettre ce bien en vitrine sur la page d'accueil (À la Une)
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-outline-variant/30">
                <button
                  type="button"
                  onClick={() => setEditModalItem(null)}
                  className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs uppercase cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={actionLoading === editModalItem.id}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-xs uppercase font-bold hover:brightness-105 transition-all cursor-pointer disabled:opacity-50"
                >
                  {actionLoading === editModalItem.id ? (
                    <span className="material-symbols-outlined text-[16px] animate-spin">sync</span>
                  ) : (
                    <span className="material-symbols-outlined text-[16px]">save</span>
                  )}
                  <span>Enregistrer les modifications</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminBiensPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary-container flex items-center justify-center text-surface">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-secondary-fixed border-t-transparent rounded-full animate-spin" />
            <span className="font-label-sm uppercase tracking-widest text-secondary-fixed">
              Chargement du parc immobilier...
            </span>
          </div>
        </div>
      }
    >
      <BiensContent />
    </Suspense>
  );
}
