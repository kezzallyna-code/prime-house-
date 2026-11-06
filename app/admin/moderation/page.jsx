'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';

function ModerationContent() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterTab, setFilterTab] = useState('all'); // 'all' | 'particulier' | 'agence'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date' | 'price' | 'score' | 'urgency'

  // Drawer inspection state
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerNotes, setDrawerNotes] = useState('Dossier rigoureusement ordonné. Indivision familiale résolue par acte de partage authentique du 12 Janvier 2023. Prêt pour publication de prestige.');
  const [certifiedChecked, setCertifiedChecked] = useState(true);

  // Rejection modal state
  const [rejectingItem, setRejectingItem] = useState(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('livret_manquant');
  const [rejectionCustomText, setRejectionCustomText] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  // Stats
  const [stats, setStats] = useState({
    pendingCount: 0,
    approvedLast7Days: 14,
    rejectedCount: 1,
    avgReviewTimeHours: 14,
  });

  const abortControllerRef = useRef(null);

  const fetchModerationData = useCallback(async (isRefresh = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (!isRefresh) setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/moderation', {
        signal: abortControllerRef.current.signal,
        headers: { 'Cache-Control': 'no-cache' },
      });

      if (!res.ok) {
        throw new Error(`Erreur serveur (${res.status})`);
      }

      const data = await res.json();
      if (data.success && Array.isArray(data.pending)) {
        setProperties(data.pending);
        if (data.stats) {
          setStats(data.stats);
        } else {
          setStats((prev) => ({ ...prev, pendingCount: data.pending.length }));
        }
      } else {
        throw new Error(data.error || 'Réponse invalide du serveur.');
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Erreur chargement modération:', err);
      setError(err.message || 'Impossible de joindre le service de modération.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchModerationData();
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchModerationData]);

  // Actions
  const handleApprove = async (item) => {
    if (!item) return;
    setActionLoading(item.id);
    try {
      const res = await fetch(`/api/moderation/${encodeURIComponent(item.id)}/approve`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== item.id));
        setStats((prev) => ({
          ...prev,
          pendingCount: Math.max(0, prev.pendingCount - 1),
          approvedLast7Days: prev.approvedLast7Days + 1,
        }));
        showToast(
          `Dossier ${item.ref || item.id} certifié et publié sur le portail public.`,
          'success'
        );
        if (selectedItem?.id === item.id) {
          setIsDrawerOpen(false);
          setSelectedItem(null);
        }
      } else {
        throw new Error(data.error || "Échec de l'approbation");
      }
    } catch (err) {
      showToast(err.message || "Erreur lors de l'approbation.", 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleOpenRejectModal = (item) => {
    setRejectingItem(item);
    setRejectionReason('livret_manquant');
    setRejectionCustomText('');
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    if (!rejectingItem) return;
    setActionLoading(rejectingItem.id);
    try {
      const res = await fetch(`/api/moderation/${encodeURIComponent(rejectingItem.id)}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reason: rejectionReason,
          notes: rejectionCustomText,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setProperties((prev) => prev.filter((p) => p.id !== rejectingItem.id));
        setStats((prev) => ({
          ...prev,
          pendingCount: Math.max(0, prev.pendingCount - 1),
          rejectedCount: prev.rejectedCount + 1,
        }));
        showToast(
          `Dossier ${rejectingItem.ref || rejectingItem.id} rejeté. Notification transmise au déposant.`,
          'info'
        );
        setIsRejectModalOpen(false);
        if (selectedItem?.id === rejectingItem.id) {
          setIsDrawerOpen(false);
          setSelectedItem(null);
        }
        setRejectingItem(null);
      } else {
        throw new Error(data.error || 'Échec du rejet');
      }
    } catch (err) {
      showToast(err.message || 'Erreur lors du rejet.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  const handleInspect = (item) => {
    setSelectedItem(item);
    setIsDrawerOpen(true);
  };

  const handleRequestMoreDocs = (item) => {
    showToast(
      `Demande formelle de compléments envoyée à ${item.owner_name || 'Mandant'} (${item.ref}).`,
      'info'
    );
  };

  const handleShowAuditProtocol = () => {
    showToast(
      "Protocole d'Audit DZ actif : Contrôle automatisé du Livre Foncier, vérification cadastrale et hypothèque vierge.",
      'info'
    );
  };

  // Filter and Sort
  const filteredProperties = properties
    .filter((item) => {
      if (filterTab !== 'all') {
        const itemType = item.owner_type || (item.owner_name?.toLowerCase().includes('agence') ? 'agence' : 'particulier');
        if (itemType !== filterTab) return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const haystack = `${item.title || ''} ${item.ref || ''} ${item.wilaya_name || ''} ${item.commune || ''} ${item.owner_name || ''} ${item.legal_status || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'date') return new Date(b.created_at || 0) - new Date(a.created_at || 0);
      return 0;
    });

  const particuliersCount = properties.filter((p) => (p.owner_type || 'particulier') === 'particulier').length;
  const agencesCount = properties.filter((p) => p.owner_type === 'agence').length;

  return (
    <AdminLayout>
      <div className="flex flex-col w-full relative">
        {/* Breadcrumb & Header */}
        <div className="flex flex-col gap-2 mb-8">
          <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span>Administration</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Gestion du Parc</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-secondary font-bold">Biens en modération</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                Biens en Modération &amp; Audit Foncier
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
                Contrôle de conformité notariale, authenticité des livrets fonciers, négativité hypothécaire et vérification cadastrale avant certification et diffusion sur l’écrin public Prime House.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleShowAuditProtocol}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                <span>Protocole d'audit DZ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  fetchModerationData(true);
                  showToast('Flux de modération actualisé avec succès', 'success');
                }}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-primary text-on-primary hover:bg-inverse-surface font-label-md text-label-md uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[18px] ${loading ? 'animate-spin' : ''}`}>
                  sync
                </span>
                <span>{loading ? 'Actualisation...' : 'Actualiser le flux'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                En attente d'arbitrage
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-currency-display text-currency-display text-on-surface">
                  {properties.length < 10 ? `0${properties.length}` : properties.length}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Dossiers prioritaires
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                {particuliersCount} particuliers • {agencesCount} agences agréées
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[26px]">hourglass_top</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Approuvés (7 derniers jours)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-currency-display text-currency-display text-on-surface">
                  {stats.approvedLast7Days}
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">+18% vs S-1</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Valeur foncière : 1,42 Mrd DA
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-on-surface group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[26px]">task_alt</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Rejets pour non-conformité
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-currency-display text-currency-display text-error">
                  {stats.rejectedCount < 10 ? `0${stats.rejectedCount}` : stats.rejectedCount}
                </span>
                <span className="font-label-sm text-label-sm text-error font-medium">Litige foncier avéré</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Motif : Défaut de certificat d'urbanisme
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-error-container/60 flex items-center justify-center text-error group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[26px]">gavel</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm flex items-center justify-between relative overflow-hidden group">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest">
                Délai moyen d'instruction
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-currency-display text-currency-display text-on-surface">
                  {stats.avgReviewTimeHours}h
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Cible : &lt; 24h</span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Algorithme d'OCR Cadastral activé
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[26px]">speed</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg self-start">
            <button
              type="button"
              onClick={() => setFilterTab('all')}
              className={`px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer ${
                filterTab === 'all'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Tous en attente ({properties.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('particulier')}
              className={`px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer ${
                filterTab === 'particulier'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Particuliers ({particuliersCount})
            </button>
            <button
              type="button"
              onClick={() => setFilterTab('agence')}
              className={`px-4 py-2 rounded font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer ${
                filterTab === 'agence'
                  ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Agences Partenaires ({agencesCount})
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Référence, Wilaya, Mandant, Propriétaire..."
                className="w-full bg-surface-container-low rounded-lg pl-10 pr-4 py-2.5 font-body-sm text-body-sm text-on-surface placeholder-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/20 transition-all"
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
            <div className="flex items-center gap-2">
              <div className="relative inline-block text-left">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-surface-container-low text-on-surface font-label-md text-label-md py-2.5 pl-3.5 pr-8 rounded-lg focus:outline-none focus:bg-surface-container-lowest cursor-pointer"
                >
                  <option value="date">Tri : Date de soumission (Plus récent)</option>
                  <option value="price">Tri : Prix décroissant (DA)</option>
                  <option value="score">Tri : Score de complétude juridique</option>
                  <option value="urgency">Tri : Urgence de publication</option>
                </select>
                <span className="material-symbols-outlined pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                  arrow_drop_down
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col gap-5">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col xl:flex-row gap-6 animate-pulse"
              >
                <div className="w-full xl:w-80 h-56 rounded-lg bg-surface-container shrink-0" />
                <div className="flex-1 flex flex-col justify-between gap-4">
                  <div className="flex flex-col gap-3">
                    <div className="h-4 w-48 bg-surface-container rounded" />
                    <div className="h-6 w-3/4 bg-surface-container rounded" />
                    <div className="h-4 w-1/2 bg-surface-container rounded" />
                  </div>
                  <div className="h-12 w-full bg-surface-container-low rounded-lg" />
                  <div className="h-10 w-64 bg-surface-container rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-xl bg-error-container/20 border border-error/30 text-center flex flex-col items-center justify-center gap-3">
            <span className="material-symbols-outlined text-[48px] text-error">cloud_off</span>
            <h3 className="font-headline-sm text-lg text-on-surface font-semibold">
              Impossible de charger le sas de modération
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchModerationData()}
              className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-on-primary hover:bg-inverse-surface font-label-md text-label-md uppercase tracking-wider transition-all"
            >
              Réessayer la connexion
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProperties.length === 0 && (
          <div className="p-12 text-center rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-secondary/15 flex items-center justify-center text-secondary mb-1">
              <span className="material-symbols-outlined text-[36px]">task_alt</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              Tous les dossiers fonciers sont à jour
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
              {searchQuery
                ? `Aucun bien en attente ne correspond à la recherche "${searchQuery}".`
                : 'Aucun bien en attente de validation cadastrale dans le flux de modération.'}
            </p>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="mt-2 px-4 py-2 rounded bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs uppercase"
              >
                Effacer les filtres
              </button>
            )}
          </div>
        )}

        {/* Property Cards List */}
        {!loading && !error && filteredProperties.length > 0 && (
          <div className="flex flex-col gap-5">
            {filteredProperties.map((item) => {
              const isActionLoading = actionLoading === item.id;
              const formattedPrice = item.price ? Number(item.price).toLocaleString('fr-FR') : 'Sur demande';
              const ownerType = item.owner_type || 'particulier';
              const isParticulier = ownerType === 'particulier';

              return (
                <div
                  key={item.id}
                  className="property-item bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row gap-6 relative"
                >
                  {/* Photo Column */}
                  <div className="w-full xl:w-80 h-56 xl:h-auto rounded-lg overflow-hidden relative shrink-0">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 hover:scale-105"
                      style={{
                        backgroundImage: `url('${item.main_image || (item.images && item.images[0]) || '/assets/logo-p-transparent.png'}')`,
                      }}
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="px-2.5 py-1 rounded bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface uppercase tracking-wider shadow-xs">
                        {item.transaction_type === 'vente' ? 'Vente Exclusive' : 'Location de Prestige'}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-primary text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                        Réf: {item.ref || 'MOD-' + item.id}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 px-2 py-1 rounded bg-primary/80 backdrop-blur-sm text-on-primary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[15px] text-secondary-container">
                        photo_library
                      </span>
                      <span>{(item.images && item.images.length) || 12} clichés HD</span>
                    </div>
                  </div>

                  {/* Details Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase font-bold">
                              {item.commune || 'Secteur'} • {item.wilaya_name || 'Algérie'} ({item.wilaya_code || '16'})
                            </span>
                            <span className="w-1.5 h-1.5 rounded-full bg-outline-variant" />
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              Soumis récemment
                            </span>
                          </div>
                          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                            {item.title}
                          </h2>
                        </div>
                        <div className="text-left lg:text-right">
                          <span className="font-currency-display text-currency-display text-on-surface">
                            {formattedPrice}
                          </span>
                          <span className="font-label-sm text-label-sm text-secondary font-bold align-top ml-0.5">
                            DA
                          </span>
                          <span className="block font-body-sm text-body-sm text-on-surface-variant">
                            {isParticulier ? 'Honoraires agence inclus (1%)' : 'Mandat exclusif Agence Partenaire'}
                          </span>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {item.surface_habitable && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px] text-secondary">crop_free</span>
                            <span>{item.surface_habitable} m² bâtis</span>
                          </span>
                        )}
                        {item.bedrooms && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px] text-secondary">king_bed</span>
                            <span>{item.bedrooms} Suites</span>
                          </span>
                        )}
                        {item.garage_spaces && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-body-sm text-body-sm">
                            <span className="material-symbols-outlined text-[16px] text-secondary">garage</span>
                            <span>Garage {item.garage_spaces} V.</span>
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-on-secondary-container font-label-sm text-label-sm uppercase font-semibold">
                          <span className="material-symbols-outlined text-[16px]">verified</span>
                          <span>Score dossier : 95%</span>
                        </span>
                      </div>

                      {/* Submitter & Legal row */}
                      <div className="mt-4 p-3.5 rounded-lg bg-surface-container-low flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-bold text-sm">
                            {(item.owner_name || 'PH').substring(0, 2).toUpperCase()}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-title-md text-title-md text-on-surface">
                              {item.owner_name || 'Déposant Privé'}
                            </span>
                            <span className="font-body-sm text-body-sm text-on-surface-variant">
                              {isParticulier ? 'Particulier propriétaire direct' : 'Agence Immobilière Agréée'} • {item.owner_phone || '+213 (0) 550 ** ** **'}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary">description</span>
                            <span>Acte notarié apuré</span>
                            <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-surface-container-lowest font-label-sm text-label-sm text-on-surface shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary">menu_book</span>
                            <span>Livret Foncier</span>
                            <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
                          </div>
                          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-secondary-fixed/20 text-on-secondary-fixed-variant font-label-sm text-label-sm uppercase font-bold">
                            <span className="material-symbols-outlined text-[16px]">assignment_turned_in</span>
                            <span>Examen : En cours</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-3 bg-surface-container-lowest border-t border-outline-variant/30">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleInspect(item)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
                          <span>Inspecter le dossier</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRequestMoreDocs(item)}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit_note</span>
                          <span>Demander compléments</span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          disabled={isActionLoading}
                          onClick={() => handleOpenRejectModal(item)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined text-[18px]">close</span>
                          <span>Refuser</span>
                        </button>
                        <button
                          type="button"
                          disabled={isActionLoading}
                          onClick={() => handleApprove(item)}
                          className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md uppercase tracking-wider shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          {isActionLoading ? (
                            <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                          ) : (
                            <span className="material-symbols-outlined text-[18px]">gavel</span>
                          )}
                          <span>{isActionLoading ? 'Certification...' : 'Approuver & Publier'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Side Drawer: Inspecter le dossier */}
        {isDrawerOpen && selectedItem && (
          <div className="fixed inset-0 z-50 flex">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity"
              onClick={() => setIsDrawerOpen(false)}
            />
            {/* Drawer Body */}
            <div className="relative ml-auto w-full max-w-2xl bg-surface-container-lowest shadow-2xl p-8 flex flex-col justify-between overflow-y-auto z-10">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-outline-variant/40">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
                      Audit Cadastral &amp; Foncier Approfondi
                    </span>
                    <h3 className="font-headline-md text-xl text-on-surface font-semibold mt-1">
                      {selectedItem.title}
                    </h3>
                    <span className="font-mono text-xs text-outline mt-0.5">
                      Réf: {selectedItem.ref || selectedItem.id} • Section {selectedItem.cadastral_section || 'SEC-01'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">close</span>
                  </button>
                </div>

                <div className="mt-6 flex flex-col gap-4">
                  {/* Item 1 */}
                  <div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[22px]">description</span>
                        <div>
                          <span className="font-title-md text-title-md text-on-surface block">
                            Acte Notarié Authentifié (Publication Conservation)
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Enregistré sous n° 2023/1842 • Étude Me. Belkacem (Alger)
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                        CONFORME
                      </span>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[22px]">menu_book</span>
                        <div>
                          <span className="font-title-md text-title-md text-on-surface block">
                            Livret Foncier Individuel (Daftar Aqqari)
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Volume 142, Folio 88 • Parcelle {selectedItem.cadastral_number || 'PARC-019'}
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                        VÉRIFIÉ
                      </span>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[22px]">verified_user</span>
                        <div>
                          <span className="font-title-md text-title-md text-on-surface block">
                            Certificat Négatif d'Hypothèque (Chahada Salbiya)
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Vierge de toute charge, hypothèque ou saisie conservatoire
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                        APURÉ
                      </span>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 rounded-xl bg-surface flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-secondary text-[22px]">photo_camera</span>
                        <div>
                          <span className="font-title-md text-title-md text-on-surface block">
                            Audit Visuel &amp; Standards Photographiques
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Résolution minimum 4K • Pas de filigrane tiers
                          </span>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-bold">
                        VALIDÉ (14/14)
                      </span>
                    </div>
                  </div>

                  {/* Notes Input */}
                  <div className="mt-4 flex flex-col gap-1.5">
                    <label className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface font-semibold">
                      Note interne d'audit notarial :
                    </label>
                    <textarea
                      value={drawerNotes}
                      onChange={(e) => setDrawerNotes(e.target.value)}
                      rows={3}
                      className="w-full bg-surface-container-low rounded-lg p-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                      placeholder="Ajouter une observation pour le collège d'arbitrage..."
                    />
                  </div>

                  {/* Certification Checkbox */}
                  <div className="mt-2 p-4 rounded-xl bg-secondary-container/20 flex items-start gap-3">
                    <input
                      id="drawerCertCheck"
                      type="checkbox"
                      checked={certifiedChecked}
                      onChange={(e) => setCertifiedChecked(e.target.checked)}
                      className="mt-1 w-5 h-5 accent-secondary rounded cursor-pointer"
                    />
                    <label htmlFor="drawerCertCheck" className="font-body-sm text-body-sm text-on-surface cursor-pointer">
                      <strong className="font-title-md text-title-md block text-secondary">
                        Certification de pleine conformité juridique
                      </strong>
                      J'atteste avoir procédé à la vérification dématérialisée des pièces d'identité, du titre foncier algérien et ordonne la publication immédiate avec badge "Mandat Audité".
                    </label>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom Actions */}
              <div className="pt-6 mt-6 border-t border-outline-variant/40 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2.5 rounded bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Fermer l'examen
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenRejectModal(selectedItem)}
                    className="px-4 py-2.5 rounded hover:bg-error-container text-error font-label-md text-label-md uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Rejeter le titre
                  </button>
                  <button
                    type="button"
                    disabled={!certifiedChecked || actionLoading === selectedItem.id}
                    onClick={() => handleApprove(selectedItem)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim font-label-md text-label-md uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
                  >
                    {actionLoading === selectedItem.id ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">sync</span>
                    ) : (
                      <span className="material-symbols-outlined text-[18px]">verified</span>
                    )}
                    <span>Valider &amp; Publier</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rejection Modal */}
        {isRejectModalOpen && rejectingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
              onClick={() => setIsRejectModalOpen(false)}
            />
            <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-xl shadow-2xl p-6 z-10 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-error">
                  <span className="material-symbols-outlined text-[24px]">gavel</span>
                  <span className="font-title-lg text-title-lg text-on-surface font-bold">
                    Motif de Rejet &amp; Refus Foncier
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sélectionnez le fondement légal du refus pour le bien <strong>{rejectingItem.ref || rejectingItem.title}</strong>. Cette notification formelle sera notifiée avec cachet numérique au déposant.
              </p>

              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
                  <input
                    type="radio"
                    name="refusal_reason"
                    value="livret_manquant"
                    checked={rejectionReason === 'livret_manquant'}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="accent-secondary"
                  />
                  <span>Absence du Livret Foncier apuré ou document périmé</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
                  <input
                    type="radio"
                    name="refusal_reason"
                    value="indivision"
                    checked={rejectionReason === 'indivision'}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="accent-secondary"
                  />
                  <span>Bien en indivision sans procuration notariée globale</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
                  <input
                    type="radio"
                    name="refusal_reason"
                    value="urbanisme"
                    checked={rejectionReason === 'urbanisme'}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="accent-secondary"
                  />
                  <span>Non-conformité de construction / Dépassement permis</span>
                </label>
                <label className="flex items-center gap-2.5 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer font-body-sm text-body-sm text-on-surface">
                  <input
                    type="radio"
                    name="refusal_reason"
                    value="photos"
                    checked={rejectionReason === 'photos'}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="accent-secondary"
                  />
                  <span>Visuels de qualité insuffisante ou non conformes au standard de luxe</span>
                </label>
              </div>

              <textarea
                value={rejectionCustomText}
                onChange={(e) => setRejectionCustomText(e.target.value)}
                placeholder="Observations juridiques complémentaires obligatoires..."
                rows={3}
                className="w-full bg-surface-container-low rounded-lg p-3 font-body-sm text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-error"
              />

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRejectModalOpen(false)}
                  className="px-4 py-2 rounded bg-surface-container text-on-surface font-label-md text-label-md uppercase tracking-wider hover:bg-surface-container-high transition-colors cursor-pointer"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  disabled={actionLoading === rejectingItem.id}
                  onClick={handleConfirmReject}
                  className="flex items-center gap-2 px-5 py-2.5 rounded bg-error text-on-error hover:bg-on-error-container font-label-md text-label-md uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">report</span>
                  <span>
                    {actionLoading === rejectingItem.id ? 'Rejet en cours...' : 'Confirmer le Rejet Définitif'}
                  </span>
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
    <Suspense
      fallback={
        <div className="min-h-screen bg-primary-container flex items-center justify-center text-surface">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-secondary-fixed border-t-transparent rounded-full animate-spin" />
            <span className="font-label-sm uppercase tracking-widest text-secondary-fixed">
              Chargement du sas de modération...
            </span>
          </div>
        </div>
      }
    >
      <ModerationContent />
    </Suspense>
  );
}
