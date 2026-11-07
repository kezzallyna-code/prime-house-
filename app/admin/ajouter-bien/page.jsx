'use client';

import { Suspense, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import ToastContainer, { showToast } from '@/components/Toast';
import { ALL_WILAYAS } from '@/lib/data';

function AjouterBienContent() {
  const router = useRouter();
  const fileInputRef = useRef(null);

  // Form states
  const [transactionType, setTransactionType] = useState('vente');
  const [title, setTitle] = useState("Villa d'Architecte Contemporaine avec Piscine à Débordement — Hydra");
  const [titleAr, setTitleAr] = useState("فيلا عصرية فاخرة مع مسبح بانورامي — حيدرة، الجزائر العاصمة");
  const [propertyType, setPropertyType] = useState('villa');
  const [ref, setRef] = useState(`PH-ALG-${Math.floor(100 + Math.random() * 900)}`);
  const [price, setPrice] = useState('165000000');
  const [charges, setCharges] = useState('45000');
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isIslamicFinance, setIsIslamicFinance] = useState(true);

  // Location
  const [wilayaCode, setWilayaCode] = useState('16');
  const [commune, setCommune] = useState('Hydra');
  const [address, setAddress] = useState("Val d'Hydra, proximité secteur diplomatique");

  // Surfaces & spaces
  const [surfaceArea, setSurfaceArea] = useState('720');
  const [livingArea, setLivingArea] = useState('540');
  const [rooms, setRooms] = useState('8');
  const [bedrooms, setBedrooms] = useState('5');
  const [bathrooms, setBathrooms] = useState('5');
  const [floors, setFloors] = useState('R+2 avec Sous-Sol');
  const [parking, setParking] = useState('4 Véhicules');
  const [furnished, setFurnished] = useState('furnished');

  // Amenities
  const [amenities, setAmenities] = useState([
    'Piscine à débordement',
    'Jardin paysager',
    'Sécurité 24/7 & Vidéosurveillance',
    'Groupe électrogène automatique',
    'Citerne & Bâche à eau 15 000 L',
    'Climatisation centrale VRV',
    'Chauffage au sol',
    'Hammam traditionnel privé',
    'Ascenseur intérieur vitré'
  ]);

  // Description
  const [description, setDescription] = useState(
    "Située au sein du quadrant le plus sécurisé et prisé de Hydra, cette propriété d'exception déploie une architecture contemporaine épurée, mariant baies vitrées toute hauteur et lignes méditerranéennes intemporelles. Elle dispose d'une suite parentale panoramique, d'un espace spa complet, et de finitions en marbre Thassos."
  );
  const [descriptionAr, setDescriptionAr] = useState(
    "تقع هذه الملكية الاستثنائية في أكثر مناطق حيدرة أماناً وفخامة، وتتميز بهندسة معمارية عصرية راقية مع واجهات زجاجية واسعة تطل على مسبح خاص وحديقة مميزة. تشمل جناحاً رئيسياً فخماً، ونظام تدفئة أرضية وتكييف مركزي متكامل."
  );

  // Media
  const [images, setImages] = useState([
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD0A3qdv-y71DEnbItD59Kg_QXkZKCBNvtVGP_GfPvWp2ZL6tNnq2u6zEbAM4qV4LhgYTLgQ5bUKBuC-Dyrm0TKqL5P6YHaAJZ7heSGzzoVyGoMN9eAJAwdJIdt883nGDx8lEHiTTSY_V1WF-opMOkqpW6olPQEU9eDygatmk96OnYY4_TuKIae6e4JveVNcI-VGOBff-fAxD73LER50A6fvkeuoYUcJfCFEOuPRBQ6r_D9QVir6lU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHJ0qQ7H4-IRhSSOM5qVfuM6f8TLS2O6LvHs3Nacrr0w5zzAJzweScMtv4sDrICY-R9Cs4hfr8DKztYrH2dxymVcwez7piosb4OGKgIXJH9L9UERiENasc47YflbB84HAfBkq9KbOgzq4VI_YJ4K8_FcQm5_qYaCVQ-ydFQkXpnkd0N1zepinV04IB0p2kYiIp1w03D0QkNjKTwB_wpFy5YOggenunNt5emH8GFXUeAnA7kiLiH00',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA63x3h8llpqfliRkC8NQJw2zrIY_Dy8mwApLTtP8yh9yaQ8iZuf0xSETnj_qYzDvRbKusSX0ZvWUhx_h8B5eVXAd3usBcOgePhSX_89fgUtDHS6ClE8LrocncIK5UPcvUj297VtBSJy_aDdBAXvfhErL0SKfP5VGoNdXRvzTw0OwENQzhctW28nL6Kdii6r0C0yzIqV6ESCYvQi7oRktAscHkhqQhUfWJrCOwaVt_WmMG6SR_ZA_0'
  ]);
  const [coverImage, setCoverImage] = useState(images[0] || '');
  const [virtualTour, setVirtualTour] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  // Legal docs
  const [legalDocs, setLegalDocs] = useState([
    'Acte notarié individuel',
    'Livret foncier conforme',
    'Certificat de conformité',
    'Permis de construire purgé'
  ]);

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Toggle helpers
  const toggleAmenity = (name) => {
    setAmenities(prev => prev.includes(name) ? prev.filter(a => a !== name) : [...prev, name]);
  };

  const toggleDoc = (name) => {
    setLegalDocs(prev => prev.includes(name) ? prev.filter(d => d !== name) : [...prev, name]);
  };

  // Image Upload via /api/upload
  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    showToast(`Téléversement de ${files.length} fichier(s)...`, 'info');

    try {
      const uploadedUrls = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('bucket', 'properties');
        formData.append('folder', 'listings');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        const data = await res.json();
        if (res.ok && data.success && data.publicUrl) {
          uploadedUrls.push(data.publicUrl);
        } else {
          throw new Error(data.error || 'Erreur téléversement image.');
        }
      }

      setImages(prev => [...uploadedUrls, ...prev]);
      if (!coverImage && uploadedUrls.length > 0) {
        setCoverImage(uploadedUrls[0]);
      }
      showToast(`${uploadedUrls.length} image(s) téléversée(s) avec succès.`, 'success');
    } catch (err) {
      showToast(err.message || 'Erreur lors du téléversement.', 'error');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeImage = (imgUrl) => {
    setImages(prev => prev.filter(url => url !== imgUrl));
    if (coverImage === imgUrl) {
      const remaining = images.filter(url => url !== imgUrl);
      setCoverImage(remaining[0] || '');
    }
  };

  // Save / Publish
  const handleSubmit = async (pubStatus) => {
    if (!title.trim()) {
      showToast('Veuillez renseigner le titre du bien.', 'error');
      return;
    }
    const cleanPrice = Number(String(price).replace(/[^0-9]/g, ''));
    if (!cleanPrice || cleanPrice <= 0) {
      showToast('Veuillez indiquer un prix valide.', 'error');
      return;
    }

    setSaving(true);
    const selectedWilaya = ALL_WILAYAS.find(w => w.code === wilayaCode);
    const wilayaName = selectedWilaya ? selectedWilaya.name : 'Alger';

    const payload = {
      title: title.trim(),
      title_ar: titleAr.trim(),
      property_type: propertyType,
      transaction_type: transactionType,
      ref: ref.trim(),
      price: cleanPrice,
      charges: Number(charges) || 0,
      currency: 'DA',
      wilaya: wilayaName,
      commune: commune.trim(),
      address: address.trim(),
      surface: Number(surfaceArea) || 0,
      living_surface: Number(livingArea) || 0,
      rooms: Number(rooms) || 0,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      floors,
      parking,
      furnished,
      amenities,
      description: description.trim(),
      description_ar: descriptionAr.trim(),
      legal_documents: legalDocs,
      images,
      cover_image: coverImage || (images.length > 0 ? images[0] : ''),
      virtual_tour_url: virtualTour,
      video_url: videoUrl,
      publication_status: pubStatus,
      is_negotiable: isNegotiable,
      is_featured: false,
      is_demo: false
    };

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Erreur lors de la création du mandat.');
      }

      showToast(`Mandat ${data.property?.ref || ref} enregistré avec succès (${pubStatus}).`, 'success');
      setTimeout(() => {
        router.push('/admin/biens');
      }, 700);
    } catch (err) {
      showToast(err.message || 'Impossible d’enregistrer le bien.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex flex-col w-full">

        {/* Top Sticky Bar */}
        <div className="sticky top-20 z-30 bg-surface-container-lowest/90 backdrop-blur-md shadow-sm -mx-8 px-8 py-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                <span>Administration</span>
                <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                <span>Parc Immobilier</span>
                <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
                <span className="text-secondary font-bold">Nouveau Mandat d'Édition</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Fiche d'Édition &amp; Publication</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                  {ref}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <Link
                href="/biens"
                target="_blank"
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md"
              >
                <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
                <span>Aperçu public</span>
              </Link>
              <button
                type="button"
                onClick={() => handleSubmit('brouillon')}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2.5 rounded bg-surface-container-low text-on-surface-variant hover:bg-surface-container-highest transition-colors font-label-md text-label-md cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-[18px]">save</span>
                <span>Enregistrer brouillon</span>
              </button>
              <button
                type="button"
                onClick={() => handleSubmit('publie')}
                disabled={saving}
                className="flex items-center gap-2 px-5 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container transition-all shadow-sm font-label-md text-label-md cursor-pointer disabled:opacity-50 font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{saving ? 'Publication...' : 'Valider & Mettre en ligne'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 items-start">
          {/* Main Form Body */}
          <div className="col-span-12 lg:col-span-9 flex flex-col gap-8 pb-16">

            {/* SECTION 1: INFORMATIONS GÉNÉRALES */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-general">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">domain</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">1. Informations Générales &amp; Typologie</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Identification principale de l'actif immobilier pour le catalogue.</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded bg-surface-container text-on-surface font-label-sm text-label-sm tracking-widest uppercase font-bold">Obligatoire</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Type de Transaction</label>
                  <div className="grid grid-cols-2 gap-3 max-w-md">
                    <button
                      type="button"
                      onClick={() => setTransactionType('vente')}
                      className={`flex items-center justify-center p-3.5 rounded-lg cursor-pointer transition-all ${transactionType === 'vente' ? 'bg-primary-container text-on-primary font-bold shadow-sm' : 'bg-surface-container-low text-on-surface'}`}
                    >
                      <span className="flex items-center gap-2 font-title-md text-title-md">
                        <span className="material-symbols-outlined text-[20px]">sell</span>
                        <span>À Vendre</span>
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTransactionType('location')}
                      className={`flex items-center justify-center p-3.5 rounded-lg cursor-pointer transition-all ${transactionType === 'location' ? 'bg-primary-container text-on-primary font-bold shadow-sm' : 'bg-surface-container-low text-on-surface'}`}
                    >
                      <span className="flex items-center gap-2 font-title-md text-title-md">
                        <span className="material-symbols-outlined text-[20px]">key</span>
                        <span>À Louer</span>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Titre de l'Annonce (Français) *</label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all"
                    type="text"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2 col-span-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center justify-between">
                    <span>Titre de l'Annonce (Arabe optionnel)</span>
                    <span className="text-secondary font-label-sm text-label-sm">عنوان الإعلان</span>
                  </label>
                  <input
                    value={titleAr}
                    onChange={(e) => setTitleAr(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all text-right"
                    dir="rtl"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Catégorie du Bien</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all cursor-pointer"
                  >
                    <option value="villa">Villa Prestige &amp; Domaine</option>
                    <option value="appartement">Appartement Grand Standing</option>
                    <option value="duplex">Duplex &amp; Penthouse Panoramique</option>
                    <option value="riad">Maison de Maître &amp; Riad</option>
                    <option value="terrain">Terrain constructible résidentiel</option>
                    <option value="commercial">Propriété Commerciale &amp; Siège</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Référence Mandat</label>
                  <input
                    value={ref}
                    onChange={(e) => setRef(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container text-on-surface font-label-lg text-label-lg tracking-wider font-mono"
                    type="text"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 2: CONDITIONS FINANCIÈRES */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-financial">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">payments</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">2. Conditions Financières</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Tarification en Dinars Algériens (DZD).</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">DZD Monnaie</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Prix de Présentation (DA) *</label>
                  <div className="relative flex items-center">
                    <input
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full pl-4 pr-16 py-3 rounded bg-surface-container-low text-on-surface font-currency-display text-currency-display focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none transition-all font-bold"
                      type="text"
                      required
                    />
                    <span className="absolute right-4 font-currency-display text-secondary font-bold">DA</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Charges Mensuelles Estimées (DA)</label>
                  <input
                    value={charges}
                    onChange={(e) => setCharges(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:outline-none focus:ring-2 focus:ring-secondary/40"
                    type="text"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 3: LOCALISATION */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-location">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">location_on</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">3. Localisation &amp; Secteur</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Positionnement dans l'une des 69 Wilayas algériennes.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Wilaya</label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none cursor-pointer"
                  >
                    {ALL_WILAYAS.map((w) => (
                      <option key={`opt-w-${w.code}`} value={w.code}>
                        {w.code} — {w.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Commune / Daira</label>
                  <input
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="text"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Quartier &amp; Adresse</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="text"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 4: SURFACES & ESPACES */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-physical">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">square_foot</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">4. Surfaces &amp; Espaces</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Métriques d'ingénierie et agencement des pièces.</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Surface Terrain (m²)</label>
                  <input
                    value={surfaceArea}
                    onChange={(e) => setSurfaceArea(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Surface Habitable (m²)</label>
                  <input
                    value={livingArea}
                    onChange={(e) => setLivingArea(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Pièces Principales</label>
                  <input
                    value={rooms}
                    onChange={(e) => setRooms(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Chambres / Suites</label>
                  <input
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full px-4 py-3 rounded bg-surface-container-low text-on-surface font-title-lg text-title-lg focus:ring-2 focus:ring-secondary/40 outline-none"
                    type="number"
                  />
                </div>
              </div>
            </section>

            {/* SECTION 5: GALERIE & MÉDIAS */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-media">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">photo_library</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">5. Galerie &amp; Médias Haute Définition</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Téléversement direct dans Supabase Storage (Bucket properties).</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-2 px-4 py-2 rounded bg-secondary text-on-secondary hover:bg-secondary-fixed transition-all font-label-md text-label-md font-bold cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
                  <span>{uploading ? 'Téléversement...' : 'Ajouter des photos'}</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {images.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-surface-container rounded-xl">
                  <span className="material-symbols-outlined text-4xl text-outline mb-2">cloud_upload</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Aucune photo téléversée pour l'instant.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((imgUrl, idx) => (
                    <div key={`img-${idx}`} className="group relative rounded-lg overflow-hidden bg-surface-container-low shadow-sm">
                      <img className="w-full h-48 object-cover" src={imgUrl} alt={`Photo ${idx + 1}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex flex-col justify-between p-3">
                        <div className="flex items-center justify-between">
                          {coverImage === imgUrl ? (
                            <span className="px-2 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
                              <span className="material-symbols-outlined text-[14px]">star</span> Couverture
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setCoverImage(imgUrl)}
                              className="px-2 py-0.5 rounded bg-surface-container-lowest/80 hover:bg-secondary hover:text-on-secondary text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer"
                            >
                              Définir en couverture
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removeImage(imgUrl)}
                            className="w-7 h-7 rounded-full bg-surface-container-lowest/80 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                        <span className="font-label-sm text-label-sm text-surface-container-lowest">Photo #{idx + 1}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* SECTION 6: DESCRIPTIF */}
            <section className="p-6 md:p-8 rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-6" id="section-description">
              <div className="flex items-center justify-between pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-secondary/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-secondary text-[22px]">description</span>
                  </div>
                  <div>
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">6. Descriptif &amp; Atouts</h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Présentation littéraire pour acquéreurs qualifiés.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider">Descriptif Détaillé (Français)</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={6}
                    className="w-full p-4 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none leading-relaxed transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface uppercase tracking-wider flex items-center justify-between">
                    <span>Descriptif Détaillé (العربية)</span>
                    <span className="text-secondary font-label-sm text-label-sm">الوصف التفصيلي</span>
                  </label>
                  <textarea
                    value={descriptionAr}
                    onChange={(e) => setDescriptionAr(e.target.value)}
                    rows={6}
                    dir="rtl"
                    className="w-full p-4 rounded bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 outline-none leading-relaxed transition-all text-right"
                  />
                </div>
              </div>
            </section>

            {/* Bottom Actions Bar */}
            <div className="p-6 rounded-xl bg-primary-container text-on-primary shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-secondary animate-pulse"></span>
                <div className="flex flex-col">
                  <span className="font-title-md text-title-md text-surface-container-lowest">Prêt pour enregistrement</span>
                  <span className="font-body-sm text-body-sm text-surface-variant">Écriture persistante dans PostgreSQL</span>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => handleSubmit('brouillon')}
                  disabled={saving}
                  className="px-5 py-2.5 rounded bg-surface-container-lowest/15 hover:bg-surface-container-lowest/25 text-surface-container-lowest font-label-md text-label-md transition-colors cursor-pointer disabled:opacity-50"
                >
                  Enregistrer en brouillon
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('moderation')}
                  disabled={saving}
                  className="px-5 py-2.5 rounded bg-surface-container-lowest/25 hover:bg-surface-container-lowest/35 text-surface-container-lowest font-label-md text-label-md transition-colors cursor-pointer disabled:opacity-50"
                >
                  Soumettre en modération
                </button>
                <button
                  type="button"
                  onClick={() => handleSubmit('publie')}
                  disabled={saving}
                  className="px-6 py-2.5 rounded bg-secondary text-on-secondary hover:bg-secondary-container hover:text-on-secondary-container font-label-md text-label-md font-semibold transition-all shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-[18px]">publish</span>
                  <span>{saving ? 'Publication...' : 'Publier sur Prime House'}</span>
                </button>
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
      <AjouterBienContent />
    </Suspense>
  );
}
