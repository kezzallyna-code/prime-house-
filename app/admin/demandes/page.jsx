'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';

function DemandesContent() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  // Drawer form states
  const [newNote, setNewNote] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('10:30');
  const [visitAgent, setVisitAgent] = useState('Karim Benali (Directeur Exécutif)');

  const abortControllerRef = useRef(null);

  const fetchInquiries = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();
    abortControllerRef.current = new AbortController();

    setLoading(true);
    try {
      const res = await fetch('/api/inquiries?status=all', {
        signal: abortControllerRef.current.signal,
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (!res.ok) throw new Error(`Erreur serveur (${res.status})`);
      const data = await res.json();
      if (data.success && Array.isArray(data.inquiries)) {
        setInquiries(data.inquiries);
      }
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Erreur chargement demandes:', err);
      showToast('Impossible de charger les demandes.', 'error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [fetchInquiries]);

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    setActionLoading(id);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Erreur statut.');

      setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(prev => ({ ...prev, status: newStatus }));
      }
      showToast(`Statut mis à jour : ${newStatus}`, 'success');
    } catch (err) {
      showToast(err.message || 'Erreur mise à jour statut.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Add Note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!selectedInquiry || !newNote.trim()) return;

    const currentNotes = selectedInquiry.internal_notes || '';
    const updatedNotes = currentNotes
      ? `${currentNotes}\n[${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}] ${newNote.trim()}`
      : `[${new Date().toLocaleDateString('fr-FR')} ${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}] ${newNote.trim()}`;

    setActionLoading('note');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedInquiry.id, internal_notes: updatedNotes })
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Erreur enregistrement note.');

      setSelectedInquiry(prev => ({ ...prev, internal_notes: updatedNotes }));
      setInquiries(prev => prev.map(inq => inq.id === selectedInquiry.id ? { ...inq, internal_notes: updatedNotes } : inq));
      setNewNote('');
      showToast('Note interne enregistrée dans le dossier client.', 'success');
    } catch (err) {
      showToast(err.message || 'Erreur note.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Schedule Visit
  const handleScheduleVisit = async (e) => {
    e.preventDefault();
    if (!selectedInquiry || !visitDate) {
      showToast('Veuillez sélectionner une date de visite.', 'error');
      return;
    }

    const scheduledDateTime = `${visitDate}T${visitTime || '10:00'}:00`;
    setActionLoading('visit');

    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiry_id: selectedInquiry.id,
          property_id: selectedInquiry.property_id || null,
          scheduled_at: scheduledDateTime,
          status: 'Programmee',
          escort_agent: visitAgent,
          client_name: selectedInquiry.client_name,
          client_phone: selectedInquiry.client_phone,
          notes: `Visite programmée via le portail admin pour ${selectedInquiry.property_title || 'propriété'}`
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Erreur planification.');

      // Also update inquiry status to 'Visite Programmée'
      await handleUpdateStatus(selectedInquiry.id, 'Visite Programmée');
      showToast(`Visite confirmée le ${new Date(scheduledDateTime).toLocaleDateString('fr-FR')} à ${visitTime}. Propriétaire notifié.`, 'success');
    } catch (err) {
      showToast(err.message || 'Erreur planification visite.', 'error');
    } finally {
      setActionLoading(null);
    }
  };

  // Open Drawer
  const openDrawer = (inq) => {
    setSelectedInquiry(inq);
    setIsDrawerOpen(true);
  };

  // Export CSV
  const handleExportCSV = () => {
    if (inquiries.length === 0) {
      showToast('Aucune demande à exporter.', 'info');
      return;
    }
    const headers = ['ID', 'Date', 'Nom Client', 'Téléphone', 'Email', 'Bien', 'Type', 'Statut', 'Message'];
    const rows = inquiries.map(i => [
      i.id,
      i.created_at || i.date,
      `"${(i.client_name || '').replace(/"/g, '""')}"`,
      `"${i.client_phone || ''}"`,
      `"${i.client_email || ''}"`,
      `"${(i.property_title || '').replace(/"/g, '""')}"`,
      `"${i.inquiry_type || ''}"`,
      `"${i.status || ''}"`,
      `"${(i.message || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `prime-house-leads-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export CSV des demandes téléchargé.', 'success');
  };

  // Filtered
  const filtered = inquiries.filter(item => {
    if (statusFilter !== 'all') {
      const st = (item.status || '').toLowerCase();
      if (statusFilter === 'nouveau' && !st.includes('nouveau') && !st.includes('new')) return false;
      if (statusFilter === 'contacte' && !st.includes('contact') && !st.includes('en_cours')) return false;
      if (statusFilter === 'visite' && !st.includes('visit') && !st.includes('programm')) return false;
      if (statusFilter === 'traite' && !st.includes('trait') && !st.includes('clos') && !st.includes('archiv')) return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.client_name || '').toLowerCase().includes(q);
      const matchPhone = (item.client_phone || '').toLowerCase().includes(q);
      const matchEmail = (item.client_email || '').toLowerCase().includes(q);
      const matchProp = (item.property_title || '').toLowerCase().includes(q) || (item.property_ref || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchEmail && !matchProp) return false;
    }
    return true;
  });

  const countNew = inquiries.filter(i => (i.status || '').toLowerCase().includes('nouveau') || (i.status || '').toLowerCase().includes('new')).length;
  const countContacted = inquiries.filter(i => (i.status || '').toLowerCase().includes('contact') || (i.status || '').toLowerCase().includes('en_cours')).length;
  const countScheduled = inquiries.filter(i => (i.status || '').toLowerCase().includes('visit') || (i.status || '').toLowerCase().includes('programm')).length;
  const countClosed = inquiries.filter(i => (i.status || '').toLowerCase().includes('trait') || (i.status || '').toLowerCase().includes('clos')).length;

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">
        <div className="relative w-full">
          <div className="absolute -top-10 right-24 w-96 h-96 bg-secondary-fixed/15 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-48 left-12 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <section className="flex flex-col gap-6 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant">
                <span className="hover:text-primary transition-colors">Administration</span>
                <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                <span className="hover:text-primary transition-colors">Leads &amp; Relations</span>
                <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                <span className="text-secondary font-semibold">Demandes &amp; Visites</span>
              </nav>
              <div className="flex items-center gap-3">
                <button onClick={fetchInquiries} className="flex items-center gap-2 bg-surface-container-lowest text-on-surface px-4 py-2 rounded shadow-sm hover:bg-surface-container transition-all group font-label-md text-label-md cursor-pointer" id="refreshBtn">
                  <span className="material-symbols-outlined text-[18px] text-secondary group-hover:rotate-180 transition-transform duration-500" id="refreshIcon">sync</span>
                  <span>Actualiser</span>
                </button>

                <button onClick={handleExportCSV} className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2 rounded shadow-md hover:bg-surface-container-highest hover:text-on-surface transition-all font-label-md text-label-md cursor-pointer">
                  <span className="material-symbols-outlined text-[18px] text-secondary-fixed">file_download</span>
                  <span>Exporter Leads (CSV)</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim ring-4 ring-secondary-fixed/20 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Flux Direct • Conciergerie Privée</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Gestion des Demandes &amp; Visites</h1>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl mt-1">
                  Suivi centralisé des prises de contact, demandes de visites privées sécurisées et requêtes conciergerie issues du portail public et des canaux directs.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-surface-container px-3.5 py-2 rounded-full self-start md:self-auto">
                <span className="material-symbols-outlined text-[16px] text-secondary">database</span>
                <span className="font-label-sm text-label-sm text-on-surface uppercase tracking-wide">Sync Supabase : <strong className="text-on-surface font-bold">inquiries (Live)</strong></span>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Total Enregistré</span>
                  <span className="font-currency-display text-currency-display text-on-surface mt-2 font-bold tracking-tight">{inquiries.length}</span>
                </div>
                <div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">inbox</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 bg-surface-container-low px-3 py-1.5 rounded">
                <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Données vérifiées en base PostgreSQL</span>
              </div>
            </div>

            <div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary"></div>
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Nouvelles Requêtes</span>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-currency-display text-currency-display text-on-surface font-bold">{countNew}</span>
                    {countNew > 0 && <span className="px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm font-semibold animate-pulse">Action requise</span>}
                  </div>
                </div>
                <div className="w-11 h-11 rounded bg-secondary-fixed/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[22px]">notifications_active</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 bg-secondary-fixed/10 px-3 py-1.5 rounded">
                <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">Réponse VIP sous 2h ouvrées</span>
              </div>
            </div>

            <div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Visites Programmées</span>
                  <span className="font-currency-display text-currency-display text-on-surface mt-2 font-bold tracking-tight">{countScheduled}</span>
                </div>
                <div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">event_available</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 pt-3 bg-surface-container-low px-3 py-1.5 rounded">
                <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Protocole d'escorte &amp; identités validés</span>
              </div>
            </div>

            <div className="relative overflow-hidden bg-surface-container-lowest p-6 rounded shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline">Dossiers Clôturés</span>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="font-currency-display text-currency-display text-on-surface font-bold">{countClosed}</span>
                  </div>
                </div>
                <div className="w-11 h-11 rounded bg-surface-container flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[22px]">auto_graph</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-3 mt-4 pt-2">
                <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: `${inquiries.length > 0 ? Math.round((countClosed / inquiries.length) * 100) : 0}%` }}></div>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold whitespace-nowrap">Traités</span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-5 rounded shadow-sm mb-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-6 relative flex items-center">
                <span className="material-symbols-outlined text-[20px] text-outline absolute left-3.5 pointer-events-none">search</span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface pl-10 pr-4 py-2.5 rounded font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest transition-colors"
                  placeholder="Rechercher par nom, tél (+213), email, réf bien (PH-ALG)..."
                  type="text"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-surface-container pt-3">
              <button onClick={() => setStatusFilter('all')} className={`status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${statusFilter === 'all' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface text-on-surface hover:bg-surface-container'}`}>
                <span>Tous</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest/20 text-[11px]">{inquiries.length}</span>
              </button>
              <button onClick={() => setStatusFilter('nouveau')} className={`status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${statusFilter === 'nouveau' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface text-on-surface hover:bg-surface-container'}`}>
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Nouveau</span>
                <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">{countNew}</span>
              </button>
              <button onClick={() => setStatusFilter('contacte')} className={`status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${statusFilter === 'contacte' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface text-on-surface hover:bg-surface-container'}`}>
                <span className="w-2 h-2 rounded-full bg-outline"></span>
                <span>Contacté</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">{countContacted}</span>
              </button>
              <button onClick={() => setStatusFilter('visite')} className={`status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${statusFilter === 'visite' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface text-on-surface hover:bg-surface-container'}`}>
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                <span>Visite Programmée</span>
                <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[11px]">{countScheduled}</span>
              </button>
              <button onClick={() => setStatusFilter('traite')} className={`status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${statusFilter === 'traite' ? 'bg-primary text-on-primary font-bold shadow-sm' : 'bg-surface text-on-surface hover:bg-surface-container'}`}>
                <span className="w-2 h-2 rounded-full bg-outline-variant"></span>
                <span>Clôturé / Traité</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px]">{countClosed}</span>
              </button>
            </div>
          </section>

          <div className="relative bg-surface-container-lowest rounded shadow-sm overflow-hidden mb-12">
            <div className="px-6 py-4 bg-surface-container-low flex items-center justify-between text-on-surface">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant">Dossiers actifs :</span>
                <span className="font-label-md text-label-md text-secondary font-bold" id="activeCountLabel">{filtered.length} pistes identifiées</span>
              </div>
              <div className="flex items-center gap-4 text-outline font-label-sm text-label-sm">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-secondary"></span> Ordre chronologique descendant</span>
                <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px]">lock</span> Chiffrement PostgreSQL sécurisé</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left" id="leadsTable">
                <thead>
                  <tr className="bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider">
                    <th className="py-3.5 px-6 font-semibold" scope="col">Demandeur &amp; Profil</th>
                    <th className="py-3.5 px-6 font-semibold" scope="col">Bien Rattaché</th>
                    <th className="py-3.5 px-6 font-semibold" scope="col">Message &amp; Attentes</th>
                    <th className="py-3.5 px-6 font-semibold" scope="col">Statut Dossier</th>
                    <th className="py-3.5 px-6 text-right font-semibold" scope="col">Actions Immédiates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container font-body-sm text-body-sm text-on-surface">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                        <span className="material-symbols-outlined animate-spin text-3xl text-secondary">sync</span>
                        <span className="block mt-2 font-label-sm">Chargement des demandes client...</span>
                      </td>
                    </tr>
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-on-surface-variant">
                        Aucune demande trouvée avec les filtres sélectionnés.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer" onClick={() => openDrawer(item)}>
                        <td className="py-5 px-6 align-top">
                          <div className="flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                              <span className="font-title-md text-title-md text-on-surface font-bold">{item.client_name}</span>
                              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold tracking-wide">
                                {item.inquiry_type || 'Visite Privée'}
                              </span>
                            </div>
                            <div className="flex flex-col text-on-surface-variant gap-0.5">
                              <div className="flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
                                <span className="material-symbols-outlined text-[14px] text-secondary">phone</span>
                                <span>{item.client_phone}</span>
                              </div>
                              {item.client_email && (
                                <span className="text-on-surface-variant text-[12px]">{item.client_email}</span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top max-w-[260px]">
                          <div className="flex flex-col">
                            {item.property_ref && (
                              <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{item.property_ref}</span>
                            )}
                            <span className="font-title-md text-title-md text-on-surface leading-tight line-clamp-1">{item.property_title || 'Demande Générale Conciergerie'}</span>
                            <span className="font-currency-display text-[14px] text-on-surface-variant mt-1">Prime House Portefeuille</span>
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top max-w-xs">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-secondary font-label-sm text-label-sm font-semibold">
                              <span className="material-symbols-outlined text-[14px]">schedule</span>
                              <span>{item.created_at ? new Date(item.created_at).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : (item.date || 'Récemment')}</span>
                            </div>
                            <p className="text-on-surface-variant line-clamp-2 italic">
                              « {item.message || 'Aucun message spécifique.'} »
                            </p>
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top" onClick={(e) => e.stopPropagation()}>
                          <div className="relative inline-block w-44">
                            <select
                              value={item.status || 'Nouveau'}
                              onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                              disabled={actionLoading === item.id}
                              className="w-full bg-secondary-fixed/40 text-on-secondary-fixed font-label-md text-label-md px-3 py-2 rounded appearance-none font-bold cursor-pointer focus:outline-none"
                            >
                              <option value="Nouveau">★ Nouveau [Action]</option>
                              <option value="Contacté">Contacté</option>
                              <option value="Visite Programmée">Visite Programmée</option>
                              <option value="Traité">Clôturé / Traité</option>
                              <option value="Spam">Classé Spam</option>
                            </select>
                            <span className="material-symbols-outlined text-[16px] text-on-secondary-fixed absolute right-2.5 top-2.5 pointer-events-none">arrow_drop_down</span>
                          </div>
                          <div className="font-label-sm text-label-sm text-outline mt-1.5">
                            Assigné : {item.assigned_agent || 'Karim Benali'}
                          </div>
                        </td>

                        <td className="py-5 px-6 align-top text-right" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1.5">
                            {item.client_phone && (
                              <>
                                <a
                                  className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary hover:text-on-secondary transition-colors"
                                  href={`https://wa.me/${item.client_phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Contacter par WhatsApp"
                                >
                                  <span className="material-symbols-outlined text-[18px]">chat</span>
                                </a>
                                <a
                                  className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
                                  href={`tel:${item.client_phone}`}
                                  title="Appeler le client"
                                >
                                  <span className="material-symbols-outlined text-[18px]">call</span>
                                </a>
                              </>
                            )}
                            <button
                              onClick={() => openDrawer(item)}
                              className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-primary hover:bg-surface-container-highest transition-colors cursor-pointer"
                              title="Ouvrir dossier complet"
                            >
                              <span className="material-symbols-outlined text-[18px]">visibility</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-surface flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Affichage de <strong className="text-on-surface">{filtered.length}</strong> demandes sur <strong className="text-on-surface">{inquiries.length}</strong> en base Supabase
              </span>
            </div>
          </div>
        </div>

        {/* INSPECTION DRAWER */}
        {selectedInquiry && (
          <aside className={`fixed inset-y-0 right-0 w-full max-w-2xl bg-surface-container-lowest shadow-2xl z-50 transition-transform duration-300 ease-in-out flex flex-col justify-between ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="p-6 bg-surface-container-low flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-secondary flex items-center justify-center text-on-secondary">
                  <span className="material-symbols-outlined text-[20px]">person_pin</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                      {selectedInquiry.id}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] font-bold">
                      {selectedInquiry.status || 'Nouveau'}
                    </span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    {selectedInquiry.client_name}
                  </h2>
                </div>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-highest transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              <div className="bg-surface p-4 rounded flex gap-4 items-center">
                <div className="flex flex-col flex-1">
                  <span className="font-label-sm text-label-sm text-secondary font-bold">
                    {selectedInquiry.property_ref || 'MANDAT EXCLUSIF'} • {selectedInquiry.inquiry_type || 'Demande de visite'}
                  </span>
                  <span className="font-title-md text-title-md text-on-surface">
                    {selectedInquiry.property_title || 'Demande générale conciergerie'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed-dim transition-all font-label-md text-label-md font-bold"
                  href={`https://wa.me/${(selectedInquiry.client_phone || '').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>WhatsApp Client</span>
                </a>
                <a
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded bg-primary text-on-primary hover:bg-primary-container transition-all font-label-md text-label-md font-bold"
                  href={`tel:${selectedInquiry.client_phone}`}
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Appeler (+213)</span>
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Message &amp; Requête Initiale</span>
                <div className="bg-surface p-4 rounded text-on-surface italic font-body-md text-body-md">
                  « {selectedInquiry.message || 'Aucun message particulier fourni.'} »
                </div>
                <div className="flex items-center justify-between text-outline font-label-sm text-label-sm px-1">
                  <span>Reçu le {selectedInquiry.created_at ? new Date(selectedInquiry.created_at).toLocaleString('fr-FR') : selectedInquiry.date}</span>
                  <span>Email : {selectedInquiry.client_email || 'Non renseigné'}</span>
                </div>
              </div>

              {/* Planifier la Visite */}
              <form onSubmit={handleScheduleVisit} className="bg-surface-container-low p-5 rounded flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
                    <span className="font-title-md text-title-md text-on-surface">Planifier la Visite Propriété</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">Accord Propriétaire Requis</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Date</label>
                    <input
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      className="w-full bg-surface-container-lowest p-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none"
                      type="date"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Heure</label>
                    <input
                      value={visitTime}
                      onChange={(e) => setVisitTime(e.target.value)}
                      className="w-full bg-surface-container-lowest p-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none"
                      type="time"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-1">Agent accompagnateur mandaté</label>
                  <select
                    value={visitAgent}
                    onChange={(e) => setVisitAgent(e.target.value)}
                    className="w-full bg-surface-container-lowest p-2 rounded font-label-md text-label-md text-on-surface focus:outline-none"
                  >
                    <option value="Karim Benali (Directeur Exécutif)">Karim Benali (Directeur Exécutif)</option>
                    <option value="Sarah Haddad (Spécialiste Ambassades)">Sarah Haddad (Spécialiste Ambassades)</option>
                    <option value="Lyes Mansouri (Expert Villas Poirson / Hydra)">Lyes Mansouri (Expert Villas Poirson / Hydra)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={actionLoading === 'visit'}
                  className="w-full py-2.5 rounded bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-all font-label-md text-label-md font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                  <span>{actionLoading === 'visit' ? 'Planification en cours...' : 'Confirmer le créneau & Enregistrer la visite'}</span>
                </button>
              </form>

              {/* Notes Internes */}
              <div className="flex flex-col gap-3">
                <span className="font-label-md text-label-md uppercase tracking-wider text-on-surface-variant font-semibold">Notes Internes d'Administration</span>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-surface px-3 py-2 rounded font-body-sm text-body-sm text-on-surface focus:outline-none"
                    id="newNoteInput"
                    placeholder="Ajouter une note confidentielle..."
                    type="text"
                  />
                  <button
                    type="submit"
                    disabled={actionLoading === 'note' || !newNote.trim()}
                    className="px-4 py-2 rounded bg-surface-container text-on-surface hover:bg-primary hover:text-on-primary transition-all font-label-md text-label-md font-bold cursor-pointer disabled:opacity-50"
                  >
                    Ajouter
                  </button>
                </form>

                <div className="flex flex-col gap-2" id="notesContainer">
                  {selectedInquiry.internal_notes ? (
                    <div className="p-3 bg-surface rounded flex flex-col gap-1">
                      <p className="font-body-sm text-body-sm text-on-surface whitespace-pre-wrap">
                        {selectedInquiry.internal_notes}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-surface rounded text-outline text-xs italic">
                      Aucune note interne enregistrée sur ce dossier.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low flex items-center justify-between gap-3">
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="px-4 py-2 rounded bg-surface text-on-surface hover:bg-surface-container transition-colors font-label-md text-label-md font-semibold cursor-pointer"
              >
                Fermer
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'Spam')}
                  className="px-4 py-2 rounded bg-surface-container text-error hover:bg-error-container hover:text-on-error-container transition-colors font-label-md text-label-md font-semibold cursor-pointer"
                >
                  Classer Spam
                </button>
                <button
                  onClick={() => handleUpdateStatus(selectedInquiry.id, 'Traité')}
                  className="px-5 py-2 rounded bg-primary text-on-primary hover:bg-secondary hover:text-on-secondary transition-colors font-label-md text-label-md font-bold cursor-pointer"
                >
                  Marquer comme Traité
                </button>
              </div>
            </div>
          </aside>
        )}

        {isDrawerOpen && (
          <div onClick={() => setIsDrawerOpen(false)} className="fixed inset-0 bg-primary/40 backdrop-blur-sm z-40 transition-opacity" id="drawerOverlay"></div>
        )}
      </div>

      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-container" />}>
      <DemandesContent />
    </Suspense>
  );
}
