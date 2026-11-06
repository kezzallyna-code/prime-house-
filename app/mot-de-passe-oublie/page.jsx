'use client';

import { Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToastContainer from '@/components/Toast';

function PageContent() {
  return (
    <>
      <Header />
      <main className="w-full pt-20 bg-surface"><div className="flex flex-col w-full">
<div className="relative w-full overflow-hidden py-space-xl lg:py-margin-lg">
<div className="pointer-events-none absolute -top-40 -left-40 w-96 h-96 rounded-full bg-secondary-fixed/30 blur-3xl"></div>
<div className="pointer-events-none absolute top-1/2 -right-40 w-[30rem] h-[30rem] rounded-full bg-surface-container-high/60 blur-3xl"></div>
<div className="max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg w-full">
<nav aria-label="Fil d'Ariane" className="mb-space-lg">
<ol className="flex items-center gap-space-xs font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase">
<li>
<a className="hover:text-secondary transition-colors" href="/">Accueil</a>
</li>
<li className="flex items-center text-outline-variant">
<span className="material-symbols-outlined text-label-md">chevron_right</span>
</li>
<li>
<a className="hover:text-secondary transition-colors" href="/connexion">Connexion</a>
</li>
<li className="flex items-center text-outline-variant">
<span className="material-symbols-outlined text-label-md">chevron_right</span>
</li>
<li aria-current="page" className="text-secondary font-semibold">Récupération d'accès</li>
</ol>
</nav>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
<div className="lg:col-span-5 flex flex-col gap-space-lg order-2 lg:order-1">
<div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container text-on-surface-variant w-fit shadow-sm">
<span className="material-symbols-outlined text-secondary text-title-md" style={{ "fontVariationSettings": "'FILL' 1" }}>verified_user</span>
<span className="font-label-sm text-label-sm tracking-widest uppercase font-semibold">Portail Investisseurs &amp; Propriétaires</span>
</div>
<div className="flex flex-col gap-space-sm">
<h1 className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
              Espace confidentiel préservé.
            </h1>
<p className="font-body-lg text-body-lg text-on-surface-variant">
              Nos protocoles de sécurité certifiés garantissent la confidentialité absolue de vos mandats off-market, acquisitions en cours et résidences d'exception.
            </p>
</div>
<div className="relative rounded-xl overflow-hidden shadow-xl aspect-[16/10] bg-primary-container text-on-primary">
<img className="w-full h-full object-cover mix-blend-overlay opacity-50" data-alt="Luxurious architectural modern villa in Hydra Algiers at dusk, illuminated pool, warm Mediterranean ambient lighting, sleek marble finishes and deep blue evening sky, captured with editorial architectural photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBANnALxzl4sJTFpf4M5_lIT7EjlwmalrICidrd-cKkBeG4QJwJr67D1ortttvHh5sYnmmKw0CfYONhTshmhCDDWhNaqUST8H3j2LPg0pfjNhyvC5gp2vAsG2yKW2Oq7m_1Yj-dDk-YLG28Awy0VUo1dFMt7GROtWrm_hZckFp2RYwKp4nhS_sE1p0bIHiFC9Sb6tzvioXeiNyFlRFg4rZ-lMiM44oriV_OHRzyH3_Hq0VnFSHnevc"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/40 to-transparent p-space-lg flex flex-col justify-end">
<span className="font-label-sm text-label-sm text-secondary-fixed tracking-widest uppercase font-semibold">Assistance Privée 24/7</span>
<p className="font-headline-sm text-headline-sm font-medium mt-space-xs">Une équipe dédiée aux résidences de prestige à Alger, Oran et Constantine.</p>
</div>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex items-start gap-space-md">
<div className="p-space-xs rounded-full bg-secondary-container/40 text-secondary">
<span className="material-symbols-outlined text-headline-sm">lock</span>
</div>
<div className="flex flex-col gap-space-xs">
<span className="font-title-md text-title-md text-on-surface font-semibold">Chiffrement Bancaire 256-bit</span>
<p className="font-body-sm text-body-sm text-on-surface-variant">
                Chaque réinitialisation génère un jeton temporaire chiffré à usage unique, expirable automatiquement après 15 minutes d'inactivité.
              </p>
</div>
</div>
</div>
<div className="lg:col-span-7 order-1 lg:order-2">
<div className="bg-surface-container-lowest rounded-xl shadow-xl p-space-lg md:p-space-xl relative overflow-hidden">
<div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-secondary via-secondary-container to-secondary"></div>
<div className="flex items-center justify-between pb-space-md mb-space-lg">
<div className="flex items-center gap-space-sm">
<span className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined text-headline-sm">key</span>
</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-semibold">Portail Sécurisé</span>
</div>
<span className="px-space-sm py-space-xs rounded bg-surface-container font-label-sm text-label-sm text-secondary font-bold tracking-widest uppercase">
                Algeria Luxury Estate
              </span>
</div>
<div className="flex flex-col gap-space-lg" id="reset-form-container">
<div>
<h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold tracking-tight">
                  Récupération de compte
                </h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Indiquez l'adresse email ou le numéro de téléphone associé à votre espace privé Prime House pour réinitialiser vos identifiants.
                </p>
</div>
<div className="p-space-xs bg-surface-container-low rounded-lg flex items-center gap-space-xs">
<button className="flex-1 py-space-sm px-space-md rounded font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs bg-surface-container-lowest text-on-surface shadow-sm font-semibold" id="tab-email"  type="button">
<span className="material-symbols-outlined text-title-md">alternate_email</span>
<span>Par Adresse Email</span>
</button>
<button className="flex-1 py-space-sm px-space-md rounded font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-on-surface font-medium" id="tab-phone"  type="button">
<span className="material-symbols-outlined text-title-md">smartphone</span>
<span>Par SMS / Téléphone (+213)</span>
</button>
</div>
<form className="flex flex-col gap-space-lg" id="recovery-form" >
<div className="flex flex-col gap-space-xs" id="email-group">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="recovery-email">
<span>Adresse Email Enregistrée</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Obligatoire</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md pointer-events-none">mail</span>
<input className="w-full pl-12 pr-space-md py-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all" id="recovery-email" name="email" placeholder="nom.prenom@prestige-invest.dz" required="" type="email"/>
</div>
</div>
<div className="hidden flex-col gap-space-xs" id="phone-group">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="recovery-phone">
<span>Numéro de Téléphone Mobile (Algérie)</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Format +213</span>
</label>
<div className="relative flex items-center">
<span className="absolute left-space-md font-label-lg text-label-lg font-bold text-on-surface-variant pointer-events-none">+213</span>
<input className="w-full pl-16 pr-space-md py-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-all" id="recovery-phone" name="phone" placeholder="05 50 12 34 56" type="tel"/>
</div>
</div>
<div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
<span className="material-symbols-outlined text-secondary text-title-md">encrypted</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                    Liaison directe authentifiée avec les serveurs sécurisés d'Alger.
                  </span>
</div>
<button className="w-full py-space-md px-space-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded-lg transition-all duration-200 shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-space-sm font-semibold cursor-pointer" id="submit-btn" type="submit">
<span className="material-symbols-outlined text-title-md">send</span>
<span id="submit-text">Recevoir le lien de réinitialisation</span>
</button>
</form>
</div>
<div className="hidden flex-col gap-space-lg py-space-md" id="success-confirmation">
<div className="w-16 h-16 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mx-auto shadow-md">
<span className="material-symbols-outlined text-display-mobile">mark_email_read</span>
</div>
<div className="text-center flex flex-col gap-space-xs">
<span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">Transmission Sécurisée Effectuée</span>
<h3 className="font-headline-md text-headline-md text-on-surface font-semibold">Consultez vos messages</h3>
<p className="font-body-md text-body-md text-on-surface-variant max-w-lg mx-auto">
                  Un lien sécurisé valide pendant <strong className="text-on-surface font-semibold">15 minutes</strong> vous a été transmis avec les instructions de chiffrement.
                </p>
</div>
<div className="p-space-lg rounded-xl bg-surface-container-low shadow-sm flex flex-col gap-space-sm">
<div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
<span className="uppercase tracking-wider text-on-surface-variant">Destinataire vérifié</span>
<span className="font-semibold text-secondary" id="confirmed-target">contact@client.dz</span>
</div>
<div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
<div className="bg-secondary h-1.5 rounded-full w-full transition-all duration-1000"></div>
</div>
<div className="flex items-center justify-between font-body-sm text-body-sm text-on-surface-variant">
<span>Expiration du jeton d'accès</span>
<span className="font-semibold text-error">14:59</span>
</div>
</div>
<div className="flex flex-col sm:flex-row gap-space-sm">
<button className="flex-1 py-space-sm px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-space-xs font-semibold"  type="button">
<span className="material-symbols-outlined text-title-md">replay</span>
<span>Renvoyer le code</span>
</button>
<a className="flex-1 py-space-sm px-space-md rounded-lg bg-primary-container text-surface hover:bg-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-space-xs font-semibold" href="#">
<span className="material-symbols-outlined text-title-md">login</span>
<span>Retour à la connexion</span>
</a>
</div>
</div>
<div className="mt-space-xl pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md font-body-sm text-body-sm">
<a className="flex items-center gap-space-xs text-on-surface-variant hover:text-secondary font-medium transition-colors" href="#">
<span className="material-symbols-outlined text-title-md">arrow_back</span>
<span>Retour à la page de connexion</span>
</a>
<a className="flex items-center gap-space-xs text-secondary hover:text-on-secondary-container font-semibold transition-colors" href="#">
<span className="material-symbols-outlined text-title-md">support_agent</span>
<span>Besoin d'aide ? Contacter la conciergerie</span>
</a>
</div>
</div>
</div>
</div>
<div className="mt-space-xl p-space-lg rounded-xl bg-surface-container-low shadow-sm grid grid-cols-1 md:grid-cols-3 gap-space-lg">
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-headline-sm">gavel</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Agrément Ministériel</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Conformité légale &amp; actes notariés en Algérie</span>
</div>
</div>
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-headline-sm">vpn_key</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Double Facteur Privé</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Authentification renforcée pour les transactions</span>
</div>
</div>
<div className="flex items-center gap-space-md">
<div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary shadow-sm">
<span className="material-symbols-outlined text-headline-sm">location_city</span>
</div>
<div className="flex flex-col">
<span className="font-title-md text-title-md text-on-surface font-semibold">Bureaux Privés El Biar</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">Accueil sur rendez-vous pour les mandataires</span>
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
