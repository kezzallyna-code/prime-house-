'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer, { showToast } from '@/components/Toast';
import { primeStorage } from '@/lib/storage';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('direction@primehouse-dz.com');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.user) {
        primeStorage.setAdminUser(data.user, data.token);
        showToast('Authentification réussie. Bienvenue ' + data.user.full_name, 'success');
        setTimeout(() => {
          router.push('/admin');
        }, 600);
      } else {
        setErrorMessage(data.error || 'Identifiant ou mot de passe incorrect.');
      }
    } catch {
      setErrorMessage('Erreur réseau. Impossible de contacter le serveur d\'authentification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full relative min-w-0">

<div className="relative w-full overflow-hidden bg-primary-container text-on-primary py-space-xl lg:py-margin-lg">

<div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
<div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary-container/10 blur-3xl pointer-events-none"></div>

<div className="absolute inset-0 opacity-[0.035] pointer-events-none flex items-center justify-center">
<svg className="w-[850px] h-[850px]" fill="none" stroke="currentColor" viewBox="0 0 400 400">
<circle cx="200" cy="200" r="190" strokeWidth="1.5"></circle>
<circle cx="200" cy="200" r="140" stroke-dasharray="4 6" strokeWidth="1"></circle>
<rect height="240" rx="4" strokeWidth="1.5" width="240" x="80" y="80"></rect>
<path d="M200 10 L200 390 M10 200 L390 200" strokeWidth="1"></path>
<path d="M110 200 L200 110 L290 200 L200 290 Z" strokeWidth="1.5"></path>
</svg>
</div>

<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg relative z-10">

<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md mb-space-xl">
<a className="inline-flex items-center gap-space-xs font-label-md text-label-md text-on-primary-container hover:text-secondary-fixed transition-colors" data-path="accueil" href="#">
<span className="material-symbols-outlined text-title-md">arrow_back</span>
<span>Revenir au site vitrine public</span>
</a>
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-surface-container-highest/20 rounded-full backdrop-blur-md">
<span className="w-2 h-2 rounded-full bg-secondary-fixed animate-ping"></span>
<span className="w-2 h-2 -ml-3.5 rounded-full bg-secondary-fixed"></span>
<span className="font-label-sm text-label-sm tracking-widest uppercase text-secondary-fixed-dim">Portail Sécurisé d'Administration</span>
<span className="text-outline-variant font-label-sm text-label-sm">•</span>
<span className="font-label-sm text-label-sm text-on-primary-container">Tunnel TLS 1.3 / EAL6+</span>
</div>
</div>

<div className="max-w-2xl mx-auto">
<div className="bg-surface-container-lowest/95 backdrop-blur-2xl rounded-xl shadow-2xl p-space-lg md:p-space-xl relative overflow-hidden">

<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary-fixed-dim via-secondary to-secondary-container"></div>

<div className="flex flex-col items-center text-center pb-space-lg">

<div className="relative mb-space-md">
<div className="w-16 h-16 rounded-xl bg-primary-container flex items-center justify-center shadow-lg">
<span className="material-symbols-outlined text-secondary-container text-headline-lg" style={{ "fontVariationSettings": "'FILL' 1" }}>admin_panel_settings</span>
</div>
<div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary-container flex items-center justify-center shadow-md">
<span className="material-symbols-outlined text-on-secondary-container text-label-sm font-bold">verified_user</span>
</div>
</div>

<span className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-secondary-fixed-dim font-label-sm text-label-sm uppercase tracking-widest shadow-sm">
<span className="material-symbols-outlined text-label-md text-secondary-fixed-dim">lock</span>
              Accès Restreint • Personnel Autorisé Uniquement
            </span>
<h1 className="font-headline-lg text-headline-lg text-on-surface mt-space-md font-semibold">Console d'Administration</h1>
<p className="font-body-sm text-body-sm text-on-surface-variant max-w-lg mt-space-xs leading-relaxed">
              Authentification cryptographique à double facteur réservée à la direction générale, notaires partenaires et commissaires aux comptes fonciers.
            </p>
</div>


<form onSubmit={handleLogin} className="flex flex-col gap-space-lg">
  {errorMessage && (
    <div className="p-3 rounded bg-error-container text-on-error-container font-body-sm text-body-sm flex items-center gap-2">
      <span className="material-symbols-outlined text-[18px]">error</span>
      <span>{errorMessage}</span>
    </div>
  )}
  {/* Admin Identifier */}
  <div className="flex flex-col gap-space-xs">
    <div className="flex items-center justify-between">
      <label className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider flex items-center gap-space-xs" htmlFor="adminId">
        <span>Identifiant Administrateur</span>
        <span className="text-secondary font-bold">*</span>
      </label>
      <span className="font-label-sm text-label-sm text-on-surface-variant">Matricule ou Courriel Certifié</span>
    </div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-on-surface-variant">
        <span className="material-symbols-outlined text-title-md">badge</span>
      </div>
      <input
        className="w-full pl-12 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 focus:outline-none transition-all shadow-inner"
        id="adminId"
        name="adminId"
        placeholder="direction@primehouse-dz.com"
        required
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  </div>

  {/* Secret Key */}
  <div className="flex flex-col gap-space-xs">
    <div className="flex items-center justify-between">
      <label className="font-label-lg text-label-lg text-on-surface uppercase tracking-wider flex items-center gap-space-xs" htmlFor="adminKey">
        <span>Clé Secrète / Mot de Passe</span>
        <span className="text-secondary font-bold">*</span>
      </label>
      <span className="font-label-sm text-label-sm text-secondary font-semibold">Chiffrement AES-256</span>
    </div>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-space-md flex items-center pointer-events-none text-on-surface-variant">
        <span className="material-symbols-outlined text-title-md">vpn_key</span>
      </div>
      <input
        className="w-full pl-12 pr-space-md py-space-sm rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline font-title-md text-title-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary/40 focus:outline-none transition-all shadow-inner"
        id="adminKey"
        name="adminKey"
        placeholder="••••••••••••"
        required
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  </div>

  {/* Submit button */}
  <button
    className="w-full py-space-md px-space-xl bg-primary-container text-surface hover:bg-secondary hover:text-on-secondary rounded-lg font-label-lg text-label-lg tracking-wider uppercase font-semibold transition-all duration-300 shadow-xl flex items-center justify-center gap-space-sm group cursor-pointer disabled:opacity-50"
    type="submit"
    disabled={loading}
  >
    {loading ? (
      <div className="w-5 h-5 border-2 border-surface border-t-transparent rounded-full animate-spin"></div>
    ) : (
      <>
        <span>Déverrouiller la Console Sécurisée</span>
        <span className="material-symbols-outlined text-title-md group-hover:translate-x-1 transition-transform">lock_open</span>
      </>
    )}
  </button>
</form>


<div className="mt-space-xl pt-space-lg bg-surface-container-low/60 -mx-space-lg md:-mx-space-xl -mb-space-lg md:-mb-space-xl p-space-lg flex flex-col gap-space-md">
<div className="flex items-start gap-space-sm text-on-surface-variant">
<span className="material-symbols-outlined text-title-md text-secondary shrink-0 mt-0.5">policy</span>
<p className="font-body-sm text-body-sm leading-relaxed">
<strong className="text-on-surface font-semibold">Avertissement légal :</strong> Toute tentative d'accès non autorisée fait l'objet d'un traçage judiciaire exhaustif (IP, empreinte matérielle, géolocalisation) et de poursuites conformément aux dispositions légales relatives à la protection des systèmes informatiques et du patrimoine foncier national.
              </p>
</div>
<div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
<div className="flex items-center gap-space-xs">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span>Nœud Alger (Hydra) Connecté</span>
<span>•</span>
<span>PostgreSQL v15.2 (RLS Enforced)</span>
</div>
<a className="text-secondary hover:underline flex items-center gap-1 font-semibold" href="#" >
<span className="material-symbols-outlined text-label-md">encrypted</span>
                Récupération d'accès d'urgence
              </a>
</div>
</div>
</div>

<div className="mt-space-lg text-center font-label-sm text-label-sm text-on-primary-container flex flex-col items-center gap-space-xs">
<span>Plateforme Interne d'Administration Foncière — Accréditation N° 16-2025/DG</span>
<span className="text-outline-variant">Les comptes administrateurs sont strictement provisionnés sur décision collégiale de la direction générale.</span>
</div>
</div>
</div>
</div>
</div></main>
      <Footer />
      <ToastContainer />
    </>
  );
}
