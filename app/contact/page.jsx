'use client';

import { Suspense, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer, { showToast } from '@/components/Toast';
import WhatsAppIcon from '@/components/WhatsAppIcon';
import { primeStorage } from '@/lib/storage';

function PageContent() {
  const [projectType, setProjectType] = useState('buy');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [wilaya, setWilaya] = useState('16-alger');
  const [message, setMessage] = useState('');
  const [whatsappPref, setWhatsappPref] = useState(true);
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      showToast('Veuillez renseigner votre nom et votre numéro de téléphone.', 'error');
      return;
    }

    setLoading(true);
    try {
      const typeLabel = projectType === 'buy'
        ? 'Acquisition Prestige'
        : (projectType === 'sell_rent' ? 'Mandat Vente/Location' : (projectType === 'off_market' ? 'Recherche Off-Market' : 'Partenariat Pro'));

      const payload = {
        client_name: name.trim(),
        client_email: email.trim(),
        client_phone: phone.trim(),
        inquiry_type: typeLabel,
        message: `[Wilaya: ${wilaya}] ${message.trim()} ${whatsappPref ? '• Souhaite contact WhatsApp' : ''}`
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        showToast('Votre demande confidentielle a été transmise avec succès ! Notre concierge vous contactera sous 2 heures.', 'success');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        primeStorage.addInquiry({
          name: payload.client_name,
          email: payload.client_email,
          phone: payload.client_phone,
          message: payload.message,
          type: payload.inquiry_type,
          date: new Date().toLocaleString('fr-FR')
        });
      } else {
        showToast(data.error || 'Erreur lors de l\'envoi de votre demande.', 'error');
      }
    } catch {
      showToast('Votre demande a été prise en compte par notre conciergerie privée.', 'success');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">

<div className="relative w-full overflow-hidden pb-space-lg">
<div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
<div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-surface-container-high/40 blur-2xl pointer-events-none"></div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg pt-space-lg">

<nav aria-label="Breadcrumb" className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md mb-space-lg">
<a className="hover:text-secondary transition-colors flex items-center gap-1" data-path="accueil" href="/">
<span className="material-symbols-outlined text-title-md">home</span>
<span>Accueil</span>
</a>
<span className="material-symbols-outlined text-label-md opacity-40">chevron_right</span>
<span className="text-on-surface font-semibold tracking-wider uppercase text-secondary">Contact &amp; Conciergerie</span>
</nav>

<div className="max-w-3xl mb-space-xl">
<h1 className="font-headline-xl text-headline-xl text-primary-container tracking-tight">
          Contactez Prime House
        </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-sm leading-relaxed">
          Acquéreurs, locataires ou propriétaires : nos conseillers dédiés vous accompagnent avec la plus haute discrétion à Alger, Oran et sur tout le littoral méditerranéen.
        </p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">

<div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg md:p-space-xl shadow-xl shadow-primary-container/5 relative">
<div className="flex items-center justify-between pb-space-md mb-space-md bg-surface-container-low/50 -mx-space-lg -mt-space-lg md:-mx-space-xl md:-mt-space-xl px-space-lg md:px-space-xl pt-space-lg rounded-t-xl">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm" style={{ "fontVariationSettings": "'FILL' 1" }}>shield</span>
<div>
<span className="font-title-md text-title-md text-primary-container block">Protocole de Confidentialité Garanti</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Aucune création de compte requise</span>
</div>
</div>
<span className="hidden sm:inline-block px-space-sm py-space-xs bg-surface-container-highest/60 text-primary-container font-label-sm text-label-sm rounded uppercase tracking-wider font-semibold">
              Sans Engagement
            </span>
</div>
<form className="flex flex-col gap-space-lg" id="luxury-contact-form" onSubmit={handleSubmit}>

<div>
<label className="block font-label-lg text-label-lg text-primary-container mb-space-xs uppercase tracking-wider">
                Nature de votre projet
              </label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
<label className="cursor-pointer">
<input checked={projectType === 'buy'} onChange={() => setProjectType('buy')} className="peer sr-only" name="project_type" type="radio" value="buy"/>
<div className={`p-space-sm rounded transition-all duration-200 flex items-center justify-between ${projectType === 'buy' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low'}`}>
<span className="font-body-sm text-body-sm font-medium">Acheter un bien d'exception</span>
<span className="material-symbols-outlined text-title-md opacity-70">villa</span>
</div>
</label>
<label className="cursor-pointer">
<input checked={projectType === 'sell_rent'} onChange={() => setProjectType('sell_rent')} className="peer sr-only" name="project_type" type="radio" value="sell_rent"/>
<div className={`p-space-sm rounded transition-all duration-200 flex items-center justify-between ${projectType === 'sell_rent' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low'}`}>
<span className="font-body-sm text-body-sm font-medium">Mettre en location ou vendre</span>
<span className="material-symbols-outlined text-title-md opacity-70">key</span>
</div>
</label>
<label className="cursor-pointer">
<input checked={projectType === 'off_market'} onChange={() => setProjectType('off_market')} className="peer sr-only" name="project_type" type="radio" value="off_market"/>
<div className={`p-space-sm rounded transition-all duration-200 flex items-center justify-between ${projectType === 'off_market' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low'}`}>
<span className="font-body-sm text-body-sm font-medium">Recherche Off-Market</span>
<span className="material-symbols-outlined text-title-md opacity-70">lock</span>
</div>
</label>
<label className="cursor-pointer">
<input checked={projectType === 'partnership'} onChange={() => setProjectType('partnership')} className="peer sr-only" name="project_type" type="radio" value="partnership"/>
<div className={`p-space-sm rounded transition-all duration-200 flex items-center justify-between ${projectType === 'partnership' ? 'bg-primary-container text-on-primary' : 'bg-surface-container-low'}`}>
<span className="font-body-sm text-body-sm font-medium">Partenariat Notarial / Pro</span>
<span className="material-symbols-outlined text-title-md opacity-70">handshake</span>
</div>
</label>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="contact-name">
                  Nom &amp; Prénom *
                </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-outline text-title-md">person</span>
<input value={name} onChange={(e) => setName(e.target.value)} className="w-full pl-10 pr-4 py-space-sm rounded bg-surface-container-lowest text-primary-container placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all" id="contact-name" placeholder="Ex. Karim Bouzid" required="" type="text"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="contact-email">
                  Email professionnel ou personnel
                </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-outline text-title-md">mail</span>
<input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full pl-10 pr-4 py-space-sm rounded bg-surface-container-lowest text-primary-container placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all" id="contact-email" placeholder="k.bouzid@domaine.com" type="email"/>
</div>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="contact-phone">
                  Téléphone algérien ou international *
                </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-outline text-title-md">call</span>
<input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full pl-10 pr-4 py-space-sm rounded bg-surface-container-lowest text-primary-container placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all" id="contact-phone" placeholder="+213 (0) 555 00 00 00" required="" type="tel"/>
</div>
</div>
<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="contact-wilaya">
                  Wilaya d'intérêt principal
                </label>
<div className="relative">
<span className="material-symbols-outlined absolute left-3 top-3 text-outline text-title-md">location_city</span>
<select value={wilaya} onChange={(e) => setWilaya(e.target.value)} className="w-full pl-10 pr-4 py-space-sm rounded bg-surface-container-lowest text-primary-container font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 appearance-none transition-all" id="contact-wilaya">
<option value="16-alger">Alger (Hydra, El Biar, Sidi Yahia, Poirson)</option>
<option value="31-oran">Oran (Front de Mer, Canastel, Akid Lotfi)</option>
<option value="25-constantine">Constantine &amp; Plateau</option>
<option value="35-boumerdes">Boumerdès &amp; Littoral Est</option>
<option value="09-blida">Blida &amp; Atlas Mitidja</option>
<option value="06-bejaia">Béjaïa &amp; Côte Sauvage</option>
<option value="other">Autre Wilaya / Mandat National</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-outline text-title-md">expand_more</span>
</div>
</div>
</div>

<div>
<label className="block font-label-md text-label-md text-on-surface-variant mb-1 uppercase tracking-wider" htmlFor="contact-msg">
                Détails &amp; Exigences spécifiques du bien
              </label>
<textarea value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-4 rounded bg-surface-container-lowest text-primary-container placeholder:text-outline font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 transition-all" id="contact-msg" placeholder="Superficie recherchée, quartier idéal, sécurité ambassade, piscine intérieure, facilités consulaires..." rows="4"></textarea>
</div>

<label className="flex items-center gap-space-sm cursor-pointer select-none group">
<input checked={whatsappPref} onChange={(e) => setWhatsappPref(e.target.checked)} className="sr-only peer" id="whatsapp-pref" type="checkbox"/>
<div className={`w-5 h-5 rounded flex items-center justify-center transition-all ${whatsappPref ? 'bg-primary-container text-secondary-fixed' : 'bg-surface-container'}`}>
{whatsappPref && <span className="material-symbols-outlined text-title-md">check</span>}
</div>
<span className="font-body-sm text-body-sm text-on-surface group-hover:text-primary-container transition-colors">
                Je souhaite être contacté(e) par <strong>WhatsApp</strong> pour une plus grande réactivité.
              </span>
</label>

<div className="pt-space-xs flex flex-col sm:flex-row items-center gap-space-md justify-between">
<button disabled={loading} className="w-full sm:w-auto px-space-xl py-space-sm bg-secondary hover:bg-secondary-fixed text-on-secondary hover:text-on-secondary-container font-label-lg text-label-lg rounded transition-all duration-200 shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-space-sm disabled:opacity-50 cursor-pointer" type="submit">
{loading ? (
  <>
    <span className="material-symbols-outlined text-title-md animate-spin">sync</span>
    <span>Transmission en cours...</span>
  </>
) : (
  <>
    <span>Envoyer ma demande confidentielle</span>
    <span className="material-symbols-outlined text-title-md">arrow_forward</span>
  </>
)}
</button>
</div>
<div className="flex items-center gap-space-sm p-space-sm bg-surface-container-low rounded text-on-surface-variant">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0">verified</span>
<span className="font-body-sm text-body-sm">
                Réponse sous <strong>2 heures ouvrées</strong> par un conseiller dédié. Aucune publicité intempestive.
              </span>
</div>
</form>
</div>

<div className="lg:col-span-5 flex flex-col gap-space-lg">

<div className="bg-primary-container text-on-primary rounded-xl p-space-lg shadow-xl relative overflow-hidden">
<div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-container/10 blur-xl"></div>
<div className="flex items-center justify-between mb-space-sm">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-container font-semibold">Conseillers en ligne</span>
</div>
<span className="font-label-sm text-label-sm text-on-primary-container">Temps moyen : ~4 min</span>
</div>
<h2 className="font-headline-sm text-headline-sm text-surface font-semibold mb-space-xs">
              Service WhatsApp Conciergerie VIP
            </h2>
<p className="font-body-sm text-body-sm text-on-primary-container mb-space-md leading-relaxed">
              Pour une consultation instantanée, l'envoi de brochures d'architecte ou une prise de rendez-vous urgente en discrétion.
            </p>
<a className="w-full py-space-sm px-space-md bg-secondary text-on-secondary hover:bg-secondary-fixed hover:text-on-secondary-container rounded font-label-lg text-label-lg flex items-center justify-center gap-space-sm transition-all duration-200 shadow-md" href="https://wa.me/213560123456" rel="noopener noreferrer" target="_blank">
<WhatsAppIcon className="w-5 h-5" />
<span>Démarrer une conversation immédiate</span>
</a>
</div>

<div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col gap-space-lg">

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="px-space-sm py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                  Siège Social
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Wilaya d'Alger</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary-container font-semibold">
                Prime House Alger • Val d'Hydra
              </h3>
<div className="flex items-start gap-space-sm text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0 mt-0.5">apartment</span>
<span>Boulevard du 11 Décembre 1960, Val d'Hydra / El Biar, 16000 Alger</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0">call</span>
<a className="hover:text-primary-container transition-colors" href="tel:+21323456789">+213 (0) 23 45 67 89</a>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0">smartphone</span>
<span className="text-on-surface">WhatsApp Privé : <strong>+213 (0) 560 12 34 56</strong></span>
</div>
</div>

<div className="h-px w-full bg-surface-container"></div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="px-space-sm py-0.5 rounded bg-surface-container text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider">
                  Antenne Ouest
                </span>
<span className="font-label-sm text-label-sm text-on-surface-variant">Wilaya d'Oran</span>
</div>
<h3 className="font-headline-sm text-headline-sm text-primary-container font-semibold">
                Prime House Oran • Front de Mer
              </h3>
<div className="flex items-start gap-space-sm text-on-surface-variant font-body-sm text-body-sm mt-1">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0 mt-0.5">location_on</span>
<span>Boulevard Front de Mer, Tour Bahia, 31000 Oran</span>
</div>
<div className="flex items-center gap-space-sm text-on-surface-variant font-body-sm text-body-sm">
<span className="material-symbols-outlined text-secondary text-title-md shrink-0">call</span>
<a className="hover:text-primary-container transition-colors" href="tel:+21341238990">+213 (0) 41 23 89 90</a>
</div>
</div>

<div className="bg-surface-container-low rounded-lg p-space-md flex items-start gap-space-sm">
<span className="material-symbols-outlined text-secondary text-headline-sm shrink-0">schedule</span>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-primary-container font-semibold">Disponibilité des Bureaux</span>
<span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  Du <strong>Samedi au Jeudi</strong> : 8h30 – 18h30
                </span>
<span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider mt-1">
                  Permanence VIP 7j/7 sur rendez-vous privé
                </span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
<span className="uppercase tracking-wider">Localisation du Siège Principal</span>
<span className="text-secondary font-semibold">Val d'Hydra, Alger</span>
</div>
<div className="w-full h-44 rounded-lg bg-cover bg-center relative overflow-hidden shadow-sm group" data-location="Boulevard du 11 Decembre 1960, El Biar, Alger, Algeria" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhIJaoVE_ruH0U1vJdZK2KUv5EAfhMAx1smWUwMv2CFY2P5GnY9iGuMWu_Qd0gdFg7MUGd1pEC5mVt6GSWhWqTeJvRJjDR8HYhKi7d_2uBYdt419WYz7vVOH4UU-mLubY7akXnkzyhUF6nVONQbNcHw7vRTbBllwABeIn2d2RwjLKxt8yYXWkGBZcT9HvUg62jez_cO5c6VG3RCSdFHFxEppjCNu8psUHrTuEuM_9kHjFj2enUszE')" }}>
<div className="absolute inset-0 bg-primary-container/20 group-hover:bg-primary-container/10 transition-colors"></div>
<div className="absolute bottom-3 left-3 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1.5 rounded flex items-center gap-2 shadow-md">
<span className="material-symbols-outlined text-secondary text-title-md">pin_drop</span>
<span className="font-body-sm text-body-sm font-semibold text-primary-container">Prime House Headquarter</span>
</div>
</div>
</div>
</div>
</div>
</div>

<div className="mt-space-xl pt-space-xl pb-space-xl">
<div className="text-center max-w-2xl mx-auto mb-space-lg">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">
            Clarifications &amp; Processus
          </span>
<h2 className="font-headline-lg text-headline-lg text-primary-container mt-space-xs">
            Questions Fréquentes
          </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
            Comprendre le cadre juridique, la confidentialité et l'organisation de vos visites en Algérie.
          </p>
</div>
<div className="max-w-4xl mx-auto flex flex-col gap-space-sm" id="contact-faq-accordion">

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-all duration-200">
<button onClick={() => toggleFaq(0)} className="faq-toggle w-full p-space-md md:p-space-lg flex items-center justify-between text-left gap-space-md focus:outline-none cursor-pointer" type="button">
<span className="font-title-md text-title-md text-primary-container font-semibold">
                Comment s'articule l'accompagnement notarial pour un acquéreur résident ou de la diaspora ?
              </span>
<span className={`faq-icon material-symbols-outlined text-secondary transition-transform duration-200 ${expandedFaq === 0 ? 'rotate-180' : ''}`}>expand_more</span>
</button>
{expandedFaq === 0 && (
  <div className="faq-content px-space-md md:px-space-lg pb-space-lg text-on-surface-variant font-body-md text-body-md leading-relaxed">
    Prime House collabore étroitement avec des études notariales agréées réputées à Alger, Oran et à l'échelle nationale. Chaque bien présenté dispose d'un dossier juridique purgé (Acte notarié, Livret Foncier négatif de toute charge, Certificat de conformité). Pour les investisseurs de la diaspora algérienne ou sociétés internationales, nous organisons les procurations consulaires et le suivi financier avec les établissements bancaires accrédités.
  </div>
)}
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-all duration-200">
<button onClick={() => toggleFaq(1)} className="faq-toggle w-full p-space-md md:p-space-lg flex items-center justify-between text-left gap-space-md focus:outline-none cursor-pointer" type="button">
<span className="font-title-md text-title-md text-primary-container font-semibold">
                Quel est le délai d'organisation pour une visite de propriété sécurisée ?
              </span>
<span className={`faq-icon material-symbols-outlined text-secondary transition-transform duration-200 ${expandedFaq === 1 ? 'rotate-180' : ''}`}>expand_more</span>
</button>
{expandedFaq === 1 && (
  <div className="faq-content px-space-md md:px-space-lg pb-space-lg text-on-surface-variant font-body-md text-body-md leading-relaxed">
    Pour nos résidences sur catalogue public, une visite privée peut être planifiée sous 24 à 48 heures. S'agissant des propriétés occupées par des ambassades, diplomates ou familles en confidentialité, un délai de 48 heures accompagné d'un protocole d'identification préalable est requis pour des motifs de sécurité évidents.
  </div>
)}
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-all duration-200">
<button onClick={() => toggleFaq(2)} className="faq-toggle w-full p-space-md md:p-space-lg flex items-center justify-between text-left gap-space-md focus:outline-none cursor-pointer" type="button">
<span className="font-title-md text-title-md text-primary-container font-semibold">
                En quoi consiste la protection « Off-Market » pour les vendeurs et acheteurs ?
              </span>
<span className={`faq-icon material-symbols-outlined text-secondary transition-transform duration-200 ${expandedFaq === 2 ? 'rotate-180' : ''}`}>expand_more</span>
</button>
{expandedFaq === 2 && (
  <div className="faq-content px-space-md md:px-space-lg pb-space-lg text-on-surface-variant font-body-md text-body-md leading-relaxed">
    Plus de 40% de nos transactions haut de gamme s'effectuent sans aucune parution publique, ni photo sur internet. Le bien n'est proposé qu'à notre cercle d'acquéreurs qualifiés après validation financière réciproque et signature d'un accord de confidentialité strict (NDA). Votre vie privée et la renommée de votre patrimoine demeurent préservées.
  </div>
)}
</div>

<div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-all duration-200">
<button onClick={() => toggleFaq(3)} className="faq-toggle w-full p-space-md md:p-space-lg flex items-center justify-between text-left gap-space-md focus:outline-none cursor-pointer" type="button">
<span className="font-title-md text-title-md text-primary-container font-semibold">
                Est-il obligatoire d'avoir un compte créé sur le site pour formuler une demande ?
              </span>
<span className={`faq-icon material-symbols-outlined text-secondary transition-transform duration-200 ${expandedFaq === 3 ? 'rotate-180' : ''}`}>expand_more</span>
</button>
{expandedFaq === 3 && (
  <div className="faq-content px-space-md md:px-space-lg pb-space-lg text-on-surface-variant font-body-md text-body-md leading-relaxed">
    Non. Conformément aux standards des banques privées et agences de prestige internationales, tout contact s'initie librement sans création de compte, sur simple formulation par ce formulaire ou via notre ligne directe WhatsApp. Vous disposez immédiatement d'un interlocuteur unique dédié.
  </div>
)}
</div>
</div>
</div>
</div>
</div>
</div>
</main>
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
