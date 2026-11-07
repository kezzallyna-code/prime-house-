'use client';

import { Suspense, useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';

function ParametresContent() {
  const [activeTab, setActiveTab] = useState('identity');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Form states
  const [siteName, setSiteName] = useState('Prime House — Prestige Immobilier en Algérie');
  const [slogan, setSlogan] = useState("L'Excellence Foncière & Immobilière en Algérie");
  const [descriptionFr, setDescriptionFr] = useState("Première maison de courtage d'actifs d'exception et de résidences privées en Algérie. Mandats exclusifs, parcs diplomatiques et gestion de patrimoine confidentielle.");
  const [descriptionAr, setDescriptionAr] = useState("الوكالة الرائدة في تسويق العقارات الفاخرة، القصور والفيلات الدبلوماسية في الجزائر العاصمة، وهران، وأرقى الوجهات الوطنية. خدمات وساطة راقية واستشارات استثمارية حصرية.");
  
  // Contacts
  const [addressAlgiers, setAddressAlgiers] = useState("Boulevard du 11 Décembre 1960, Résidence Les Pins, Val d'Hydra / El Biar, 16000 Alger");
  const [phoneAlgiers, setPhoneAlgiers] = useState('+213 (0) 23 45 67 89');
  const [emailAlgiers, setEmailAlgiers] = useState('direction@primehouse-dz.com');
  const [addressOran, setAddressOran] = useState('Boulevard Front de Mer, Tour Bahia Center, 14ème Étage, 31000 Oran');
  const [phoneOran, setPhoneOran] = useState('+213 (0) 41 89 12 34');
  const [emailOran, setEmailOran] = useState('oran@primehouse-dz.com');
  const [ministerialLicense, setMinisterialLicense] = useState('N° 16-2025/DG-DGU');

  // WhatsApp & Concierge
  const [whatsappPhone, setWhatsappPhone] = useState('+213 (0) 560 12 34 56');
  const [whatsappMessage, setWhatsappMessage] = useState("Bonjour Prime House, je souhaite obtenir le dossier confidentiel de présentation concernant la propriété réf : {reference_bien}. Merci de m'orienter vers un conseiller privé.");
  const [diasporaConverter, setDiasporaConverter] = useState(true);
  const [pushNotification, setPushNotification] = useState(true);

  // Social Links
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/company/primehouse-prestige-algerie');
  const [instagramUrl, setInstagramUrl] = useState('https://instagram.com/primehouse.algerie');
  const [facebookUrl, setFacebookUrl] = useState('https://facebook.com/primehouse.prestige');
  const [youtubeUrl, setYoutubeUrl] = useState('https://youtube.com/@PrimeHousePrestigeImmoDZ');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings', { headers: { 'Cache-Control': 'no-cache' } });
        if (res.ok) {
          const data = await res.json();
          if (data) {
            if (data.agency) {
              if (data.agency.name) setSiteName(data.agency.name);
              if (data.agency.tagline) setSlogan(data.agency.tagline);
              if (data.agency.description_fr) setDescriptionFr(data.agency.description_fr);
              if (data.agency.description_ar) setDescriptionAr(data.agency.description_ar);
              if (data.agency.address_algiers) setAddressAlgiers(data.agency.address_algiers);
              if (data.agency.phone_algiers) setPhoneAlgiers(data.agency.phone_algiers);
              if (data.agency.email_algiers) setEmailAlgiers(data.agency.email_algiers);
              if (data.agency.address_oran) setAddressOran(data.agency.address_oran);
              if (data.agency.phone_oran) setPhoneOran(data.agency.phone_oran);
              if (data.agency.email_oran) setEmailOran(data.agency.email_oran);
              if (data.agency.license) setMinisterialLicense(data.agency.license);
            }
            if (data.contact) {
              if (data.contact.whatsapp) setWhatsappPhone(data.contact.whatsapp);
              if (data.contact.whatsapp_message) setWhatsappMessage(data.contact.whatsapp_message);
            }
            if (data.social) {
              if (data.social.linkedin) setLinkedinUrl(data.social.linkedin);
              if (data.social.instagram) setInstagramUrl(data.social.instagram);
              if (data.social.facebook) setFacebookUrl(data.social.facebook);
              if (data.social.youtube) setYoutubeUrl(data.social.youtube);
            }
          }
        }
      } catch (err) {
        console.error('Erreur chargement paramètres:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const payload = {
        agency: {
          name: siteName,
          tagline: slogan,
          description_fr: descriptionFr,
          description_ar: descriptionAr,
          address_algiers: addressAlgiers,
          phone_algiers: phoneAlgiers,
          email_algiers: emailAlgiers,
          address_oran: addressOran,
          phone_oran: phoneOran,
          email_oran: emailOran,
          license: ministerialLicense,
        },
        contact: {
          whatsapp: whatsappPhone,
          whatsapp_message: whatsappMessage,
          diaspora_converter: diasporaConverter,
          push_notification: pushNotification,
        },
        social: {
          linkedin: linkedinUrl,
          instagram: instagramUrl,
          facebook: facebookUrl,
          youtube: youtubeUrl,
        }
      };

      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur enregistrement paramètres.');
      }

      showToast('Paramètres mis à jour avec succès dans Supabase.', 'success');
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3500);
    } catch (err) {
      showToast(err.message || 'Erreur lors de la sauvegarde.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

        {/* Dynamic Save Toast */}
        <div className={`fixed top-24 right-8 z-50 transition-all duration-500 ease-out flex items-center gap-3.5 bg-primary text-on-primary px-5 py-3.5 rounded-lg shadow-xl ${showSavedToast ? 'translate-y-0 opacity-100' : 'translate-y-[-120%] opacity-0 pointer-events-none'}`} id="saveToast">
          <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </div>
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-surface-container-lowest leading-tight">Sauvegarde validée</span>
            <span className="font-body-sm text-body-sm text-surface-container-highest">Paramètres enregistrés avec succès. Le portail public est à jour.</span>
          </div>
          <button onClick={() => setShowSavedToast(false)} className="ml-2 text-surface-variant hover:text-surface-container-lowest transition-colors pointer-events-auto cursor-pointer">
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-3 mb-8">
          <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">
            <span>Administration</span>
            <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
            <span>Taxonomie &amp; Config</span>
            <span className="material-symbols-outlined text-[13px] text-outline">chevron_right</span>
            <span className="text-secondary font-semibold">Paramètres du site</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="flex flex-col max-w-3xl">
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Paramètres Généraux &amp; Identité de l'Agence</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1.5">
                Gouvernance de la marque <span className="text-secondary font-semibold">PRIME HOUSE</span>, coordonnées officielles d'Alger et d'Oran, passerelles VIP et intégration cache Supabase.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-surface-container-lowest px-4 py-2.5 rounded-lg shadow-sm self-start lg:self-auto">
              <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">État Synchronisation</span>
                <span className="font-title-md text-title-md text-on-surface">Supabase PostgreSQL • En Direct</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="bg-surface-container-lowest rounded-xl p-1.5 shadow-sm mb-8 flex flex-wrap gap-1.5 items-center">
          <button onClick={() => setActiveTab('identity')} className={`tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${activeTab === 'identity' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} type="button">
            <span className="material-symbols-outlined text-[18px]">storefront</span>
            <span>Identité &amp; Vitrine</span>
          </button>
          <button onClick={() => setActiveTab('contacts')} className={`tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${activeTab === 'contacts' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} type="button">
            <span className="material-symbols-outlined text-[18px]">domain</span>
            <span>Coordonnées &amp; Sièges</span>
          </button>
          <button onClick={() => setActiveTab('vip')} className={`tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${activeTab === 'vip' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} type="button">
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Conciergerie &amp; WhatsApp</span>
          </button>
          <button onClick={() => setActiveTab('social')} className={`tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${activeTab === 'social' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} type="button">
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>Réseaux &amp; Médias</span>
          </button>
          <button onClick={() => setActiveTab('system')} className={`tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all cursor-pointer ${activeTab === 'system' ? 'bg-primary text-on-primary shadow-sm' : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'}`} type="button">
            <span className="material-symbols-outlined text-[18px]">dns</span>
            <span>Intégration &amp; Sécurité API</span>
          </button>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-10 pb-28" id="settingsForm">

          {/* TAB 1: IDENTITÉ & VITRINE */}
          {activeTab === 'identity' && (
            <div className="tab-panel flex flex-col gap-8" id="tab-identity">
              <div className="flex items-center justify-between pb-4">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section I</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Informations de la Marque &amp; Vitrine Publique</h2>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Indexation SEO &amp; En-tête</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between">
                      <span>Nom Officiel du Portail</span>
                      <span className="font-label-sm text-label-sm text-outline normal-case">Titre browser</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline">verified</span>
                      <input value={siteName} onChange={(e) => setSiteName(e.target.value)} className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="text" />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface flex items-center justify-between">
                      <span>Slogan de Prestige (Hero &amp; Metadata)</span>
                      <span className="font-label-sm text-label-sm text-outline normal-case">Sous-titre visible</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline">auto_awesome</span>
                      <input value={slogan} onChange={(e) => setSlogan(e.target.value)} className="w-full bg-surface-container-low text-on-surface pl-12 pr-4 py-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" type="text" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Description Publique (Français)</label>
                        <span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-bold">FR</span>
                      </div>
                      <textarea value={descriptionFr} onChange={(e) => setDescriptionFr(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" rows="4"></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Description Publique (العربية)</label>
                        <span className="px-2 py-0.5 rounded font-label-sm text-label-sm bg-surface-container text-on-surface-variant font-bold">AR</span>
                      </div>
                      <textarea value={descriptionAr} onChange={(e) => setDescriptionAr(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 transition-all" dir="rtl" rows="4"></textarea>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[20px]">payments</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Devise de Référence</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">Affichage standardisé</span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low p-4 rounded-lg flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-currency-display text-currency-display text-on-surface">Dinar Algérien</span>
                        <span className="font-body-sm text-body-sm text-outline">Code ISO : DZD • Symbole : DA</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold">PAR DÉFAUT</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COORDONNÉES & SIÈGES */}
          {activeTab === 'contacts' && (
            <div className="tab-panel flex flex-col gap-8" id="tab-contacts">
              <div className="flex items-center justify-between pb-4">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section II</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Sièges Centraux &amp; Mentions Réglementaires</h2>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Agrément Ministériel Conforme</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary flex items-center justify-center">
                        <span className="material-symbols-outlined text-[22px]">location_city</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Siège Social &amp; Direction Générale</span>
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide">Wilaya d'Alger (16)</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Adresse Postale &amp; Cadastrale</label>
                    <textarea value={addressAlgiers} onChange={(e) => setAddressAlgiers(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-3 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30" rows="2"></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Ligne Fixe Standard</label>
                      <input value={phoneAlgiers} onChange={(e) => setPhoneAlgiers(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="text" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Email de Chancellerie</label>
                      <input value={emailAlgiers} onChange={(e) => setEmailAlgiers(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="email" />
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container text-on-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[22px]">apartment</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-title-md text-title-md text-on-surface">Antenne Ouest &amp; Affaires Maritimes</span>
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wide">Wilaya d'Oran (31)</span>
                      </div>
                    </div>
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Adresse Postale Oran</label>
                    <textarea value={addressOran} onChange={(e) => setAddressOran(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-3 rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary/30" rows="2"></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Ligne Directe Oran</label>
                      <input value={phoneOran} onChange={(e) => setPhoneOran(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="text" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Email Régional</label>
                      <input value={emailOran} onChange={(e) => setEmailOran(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="email" />
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-surface-container flex flex-col gap-2">
                    <span className="font-label-md text-label-md font-bold uppercase tracking-wider text-on-surface">Agrément Ministériel</span>
                    <input value={ministerialLicense} onChange={(e) => setMinisterialLicense(e.target.value)} className="bg-surface-container-lowest font-label-md text-label-md px-3 py-1.5 rounded font-mono text-on-surface w-full" type="text" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CONCIERGERIE & WHATSAPP */}
          {activeTab === 'vip' && (
            <div className="tab-panel flex flex-col gap-8" id="tab-vip">
              <div className="flex items-center justify-between pb-4">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section III</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Passerelles VIP &amp; Conciergerie Immobilière</h2>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Discrétion &amp; Réactivité 24/7</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[22px]">forum</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-title-md text-title-md text-on-surface">Canal WhatsApp Concierge Prioritaire</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Liaison chiffrée dédiée aux acquéreurs VIP</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Numéro Mobile WhatsApp</label>
                    <input value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-3 rounded-lg font-title-md text-title-md focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30 font-mono" type="text" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Message Automatique Pré-rempli</label>
                    <textarea value={whatsappMessage} onChange={(e) => setWhatsappMessage(e.target.value)} className="w-full bg-surface-container-low text-on-surface p-4 rounded-lg font-body-sm text-body-sm leading-relaxed focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-secondary/30" rows="3"></textarea>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col justify-between gap-6">
                  <div className="p-4 rounded-lg bg-surface-container flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-[24px]">shield_person</span>
                    <span className="font-label-sm text-label-sm text-on-surface">Toutes les conversations conciergerie sont protégées par le secret professionnel et le protocole NDA.</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: RÉSEAUX SOCIAUX */}
          {activeTab === 'social' && (
            <div className="tab-panel flex flex-col gap-8" id="tab-social">
              <div className="flex items-center justify-between pb-4">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section IV</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Réseaux Sociaux &amp; Canaux Médias</h2>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Visibilité Internationale</span>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">LinkedIn Entreprise</label>
                    <input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="url" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Instagram Luxury Portfolio</label>
                    <input value={instagramUrl} onChange={(e) => setInstagramUrl(e.target.value)} className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="url" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Facebook Pro</label>
                    <input value={facebookUrl} onChange={(e) => setFacebookUrl(e.target.value)} className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="url" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-label-md text-label-md uppercase tracking-wider text-on-surface">Chaîne YouTube Visites 4K</label>
                    <input value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} className="w-full bg-surface-container-low text-on-surface px-4 py-3 rounded-lg font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary/30" type="url" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTÉGRATION & SÉCURITÉ */}
          {activeTab === 'system' && (
            <div className="tab-panel flex flex-col gap-8" id="tab-system">
              <div className="flex items-center justify-between pb-4">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">Section V</span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Infrastructure Supabase &amp; Sécurité</h2>
                </div>
                <span className="font-label-sm text-label-sm px-3 py-1 rounded bg-secondary-container/30 text-on-secondary-container uppercase">Haute Disponibilité</span>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 shadow-sm flex flex-col gap-4 font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                  <span>Moteur de Données</span>
                  <span className="font-mono text-secondary font-bold">Supabase PostgreSQL 17</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                  <span>Politiques Row Level Security</span>
                  <span className="font-mono text-secondary font-semibold">100% RLS Activé sur les 10 tables</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded bg-surface-container-low">
                  <span>Chiffrement Mots de Passe</span>
                  <span className="font-mono text-on-surface font-semibold">PBKDF2-SHA512 (100 000 itérations)</span>
                </div>
              </div>
            </div>
          )}

          {/* Save Bar */}
          <div className="fixed bottom-0 left-72 right-0 bg-surface-container-lowest/95 backdrop-blur-xl py-4 px-8 shadow-xl z-40 flex items-center justify-between">
            <div className="flex items-center gap-3 text-on-surface-variant">
              <span className="material-symbols-outlined text-secondary text-[20px]">info</span>
              <span className="font-body-sm text-body-sm hidden sm:inline">Toute modification enregistrée est persistée en base PostgreSQL et répercutée en direct.</span>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all duration-200 shadow-md font-label-md text-label-md font-bold cursor-pointer disabled:opacity-50"
                id="saveBtn"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>{saving ? 'Enregistrement en cours...' : 'Enregistrer les paramètres'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </AdminLayout>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-primary-container" />}>
      <ParametresContent />
    </Suspense>
  );
}
