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

<div className="w-full bg-surface-container-high text-on-surface py-space-sm px-margin md:px-margin-md">
<div className="max-w-[1440px] mx-auto flex items-center justify-between gap-gutter text-body-sm">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-title-md">sync_saved_locally</span>
<p className="font-body-sm text-body-sm text-on-surface">
<strong className="font-semibold text-secondary">Accès Espace Privé :</strong> Vous souhaitez déposer une annonce ou mémoriser vos favoris ? Connectez-vous ou rejoignez le Cercle en 60 secondes. Redirection automatique vers votre sélection.
        </p>
</div>
<div className="hidden md:flex items-center gap-space-xs font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
<span>Plateforme Certifiée • Notarié DZ</span>
</div>
</div>
</div>

<section className="max-w-[1440px] mx-auto w-full px-margin md:px-margin-md lg:px-margin-lg py-space-xl">
<div className="grid grid-cols-1 lg:grid-cols-12 rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">

<div className="lg:col-span-5 relative flex flex-col justify-between p-space-lg md:p-space-xl text-on-primary min-h-[580px] lg:min-h-[780px] overflow-hidden">

<div className="absolute inset-0 bg-cover bg-center" data-alt="Ultra luxury modern cantilevered villa overlooking the Mediterranean bay in Hydra Algiers, architectural limestone and floor-to-ceiling glass, glowing interior amber light, twilight blue sky with Mediterranean palms, high-end architectural photography, quiet refined luxury." style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFHQHlndN7TSUvyfDZwoLXHp4Yi3Bl1MgYCGASJl8BLnmGe39LlrZSl3WBSJPcxHhhfreL9JtwqOaHBteYm29_OklgW2TKS2IdM9a2gMsSYVeFDNWrJdAep4ZoTdlaCzvVFybDKRMqyb_gjRzHHebdxqBEZdKGB-Vam_rxPWKmFl1ewPF9eipJkUOzkkqLrm5Zb0FvTZtWXElTHU7DO1O3ow2Wfn5LFgGz5nX0t5T2xX8lEcwZodM')" }}></div>
<div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/70 to-primary-container/30 backdrop-blur-[1px]"></div>

<div className="relative z-10 flex items-center justify-between">
<div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
<span className="material-symbols-outlined text-secondary-fixed text-title-md">verified</span>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-surface">Cercle Privilège • 2025</span>
</div>
<span className="font-label-sm text-label-sm tracking-widest text-surface-container-highest uppercase [writing-mode:vertical-rl] hidden sm:inline">ALGER • ORAN • CONSTANTINE</span>
</div>

<div className="relative z-10 my-auto py-space-xl">
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary-fixed font-semibold block mb-space-xs">L'Art de Vivre d'Exception</span>
<h2 className="font-headline-xl text-headline-xl font-display text-surface tracking-tight mb-space-md leading-tight">
            L'Excellence Immobilière en Algérie.
          </h2>
<p className="font-body-md text-body-md text-surface-container-highest max-w-md leading-relaxed">
            Consultez en avant-première nos portefeuilles de résidences diplomatiques, penthouses sur front de mer et domaines confidentiels.
          </p>

<div className="mt-space-lg flex flex-col gap-space-md">
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-title-md">lock_open</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-surface font-semibold">Accès aux Biens Off-Market</h3>
<p className="font-body-sm text-body-sm text-surface-container-highest">Opportunités confidentielles non diffusées sur le marché public.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-title-md">bookmark_heart</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-surface font-semibold">Sauvegarde &amp; Estimation en Direct</h3>
<p className="font-body-sm text-body-sm text-surface-container-highest">Synchronisation temps réel de vos coups de cœur et dossiers financiers.</p>
</div>
</div>
<div className="flex items-start gap-space-sm">
<div className="w-8 h-8 rounded-full bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-secondary-fixed shrink-0">
<span className="material-symbols-outlined text-title-md">gavel</span>
</div>
<div>
<h3 className="font-title-md text-title-md text-surface font-semibold">Mandats Juridiquement Certifiés</h3>
<p className="font-body-sm text-body-sm text-surface-container-highest">Livret foncier et conformité notariée rigoureusement contrôlés.</p>
</div>
</div>
</div>
</div>

<div className="relative z-10 p-space-md rounded-lg bg-surface-container-lowest/10 backdrop-blur-lg flex items-center justify-between">
<div className="flex items-center gap-space-md">
<div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed font-bold font-title-md">
              PH
            </div>
<div>
<p className="font-title-md text-title-md text-surface">Conciergerie Privée Prime House</p>
<p className="font-body-sm text-body-sm text-surface-container-highest">Assistance VIP : +213 (0) 23 45 67 89</p>
</div>
</div>
<span className="material-symbols-outlined text-secondary-fixed text-title-lg">shield</span>
</div>
</div>

<div className="lg:col-span-7 p-space-lg md:p-space-xl lg:p-margin flex flex-col justify-between bg-surface-container-lowest">
<div>

<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md pb-space-lg">
<div>
<span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-semibold">Portail Résidentiel &amp; Investisseurs</span>
<h1 className="font-headline-lg text-headline-lg font-display text-on-surface tracking-tight mt-space-xs" id="auth-main-title">
                Accéder à mon Espace
              </h1>
</div>

<div className="inline-flex p-space-xs rounded-full bg-surface-container-low self-start sm:self-auto shadow-sm">
<button className="px-space-lg py-space-xs rounded-full font-label-lg text-label-lg transition-all duration-200 bg-surface-container-lowest text-on-surface shadow-sm font-semibold" id="tab-login"  type="button">
                Connexion
              </button>
<button className="px-space-lg py-space-xs rounded-full font-label-lg text-label-lg transition-all duration-200 text-on-surface-variant hover:text-on-surface font-medium" id="tab-register"  type="button">
                Créer un compte
              </button>
</div>
</div>

<div className="pt-space-xs pb-space-md">
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<button className="flex items-center justify-center gap-space-sm px-space-md py-space-sm rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors font-body-sm text-body-sm font-medium" type="button">
<svg className="w-4 h-4" viewBox="0 0 24 24">
<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"></path>
<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"></path>
</svg>
<span>Continuer avec Google</span>
</button>
<button className="flex items-center justify-center gap-space-sm px-space-md py-space-sm rounded bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors font-body-sm text-body-sm font-medium" type="button">
<span className="material-symbols-outlined text-title-md text-on-surface-variant">domain</span>
<span>Compte Pro / Promoteur</span>
</button>
</div>

<div className="relative my-space-lg text-center">
<div className="absolute inset-0 flex items-center">
<div className="w-full h-px bg-surface-container-highest"></div>
</div>
<span className="relative px-space-md bg-surface-container-lowest font-label-sm text-label-sm uppercase tracking-widest text-outline">
                Ou avec vos identifiants algériens
              </span>
</div>
</div>

<form className="flex flex-col gap-space-md" id="form-login" >

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
<span>Email ou Numéro de téléphone (+213)</span>
<span className="font-label-sm text-label-sm text-secondary font-normal">Identifiant sécurisé</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">alternate_email</span>
<input className="w-full pl-12 pr-space-md py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" id="login-identifier" placeholder="nom@domaine.dz ou 05 50 12 34 56" required="" type="text" value="karim.benmoussa@alger-invest.dz"/>
<span className="material-symbols-outlined absolute right-space-md text-secondary text-title-md" title="Format valide">check_circle</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<label className="font-label-lg text-label-lg text-on-surface">Mot de passe</label>
<a className="font-label-sm text-label-sm text-secondary hover:text-on-secondary-container transition-colors font-semibold" href="#">Mot de passe oublié ?</a>
</div>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">key</span>
<input className="w-full pl-12 pr-12 py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" id="login-password" placeholder="Votre mot de passe de prestige" required="" type="password" value="••••••••••••"/>
<button aria-label="Afficher ou masquer le mot de passe" className="absolute right-space-md text-outline hover:text-on-surface transition-colors p-1"  type="button">
<span className="material-symbols-outlined text-title-md">visibility</span>
</button>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs">
<label className="flex items-center gap-space-sm cursor-pointer select-none">
<input checked="" className="w-4 h-4 rounded text-primary-container focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface-variant">Mémoriser cet appareil pour 30 jours</span>
</label>
<div className="flex items-center gap-space-xs text-outline font-body-sm text-body-sm">
<span className="material-symbols-outlined text-label-lg">lock</span>
<span className="font-label-sm text-label-sm">Chiffrement SSL 256-bit</span>
</div>
</div>

<div className="pt-space-sm">
<button className="w-full py-space-sm px-space-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-space-sm" id="btn-login-submit" type="submit">
<span>Se connecter à mon espace</span>
<span className="material-symbols-outlined text-title-md">arrow_forward</span>
</button>
</div>
</form>

<form className="hidden flex-col gap-space-md" id="form-register" >

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface">Sélectionnez votre profil privilégié</label>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
<button className="p-space-sm rounded bg-surface-container-high text-on-surface text-left transition-all flex items-start gap-space-sm shadow-sm ring-1 ring-secondary" id="role-client"  type="button">
<div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-title-md">person_search</span>
</div>
<div>
<div className="font-title-md text-title-md font-semibold leading-tight">Acquéreur / Locataire</div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Recherche de villas, penthouses et terrains</div>
</div>
</button>
<button className="p-space-sm rounded bg-surface-container-low text-on-surface text-left transition-all flex items-start gap-space-sm shadow-sm hover:bg-surface-container" id="role-owner"  type="button">
<div className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-title-md">real_estate_agent</span>
</div>
<div>
<div className="font-title-md text-title-md font-semibold leading-tight">Propriétaire / Promoteur</div>
<div className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Vente, mandats exclusifs, projets neufs</div>
</div>
</button>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface">Nom complet &amp; Titre</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">badge</span>
<input className="w-full pl-12 pr-space-md py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" placeholder="ex: Dr. Amine Belkacem" required="" type="text"/>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface">Numéro de téléphone</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">call</span>
<input className="w-full pl-12 pr-space-md py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" placeholder="+213 555 12 34 56" required="" type="tel"/>
</div>
</div>
<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface">Email de correspondance</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">mail</span>
<input className="w-full pl-12 pr-space-md py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" placeholder="contact@holding.dz" required="" type="email"/>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface">Mot de passe de protection</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-space-md text-outline text-title-md">lock</span>
<input className="w-full pl-12 pr-12 py-space-sm rounded bg-surface-container-low text-on-surface placeholder:text-outline font-body-md text-body-md shadow-sm transition-all focus:bg-surface-container-lowest focus:shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/20" id="register-password" oninput="updatePasswordGauge(this.value)" placeholder="8 caractères minimum, chiffre et symbole" required="" type="password"/>
<button aria-label="Afficher ou masquer" className="absolute right-space-md text-outline hover:text-on-surface transition-colors p-1"  type="button">
<span className="material-symbols-outlined text-title-md">visibility</span>
</button>
</div>

<div className="mt-space-xs flex flex-col gap-1">
<div className="flex items-center justify-between text-body-sm">
<span className="font-label-sm text-label-sm text-on-surface-variant">Sécurité du mot de passe</span>
<span className="font-label-sm text-label-sm text-secondary font-semibold" id="strength-label">Fort (Optimal)</span>
</div>
<div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex gap-1">
<div className="h-full w-1/3 bg-secondary rounded-full transition-all duration-300" id="bar-1"></div>
<div className="h-full w-1/3 bg-secondary rounded-full transition-all duration-300" id="bar-2"></div>
<div className="h-full w-1/3 bg-secondary rounded-full transition-all duration-300" id="bar-3"></div>
</div>
</div>
</div>

<div className="pt-space-xs flex flex-col gap-space-sm">
<label className="flex items-start gap-space-sm cursor-pointer select-none">
<input checked="" className="w-4 h-4 mt-1 rounded text-primary-container focus:ring-0 accent-secondary cursor-pointer" required="" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  J'accepte les <a className="text-on-surface underline font-medium" href="#">Conditions Générales d'Utilisation</a> de Prime House et reconnais que toutes les transactions sont soumises à la législation et formalités notariales de la République Algérienne.
                </span>
</label>
<label className="flex items-start gap-space-sm cursor-pointer select-none">
<input checked="" className="w-4 h-4 mt-1 rounded text-primary-container focus:ring-0 accent-secondary cursor-pointer" type="checkbox"/>
<span className="font-body-sm text-body-sm text-on-surface-variant">
                  Je souhaite recevoir la newsletter trimestrielle des ventes aux enchères et acquisitions Off-Market.
                </span>
</label>
</div>

<div className="pt-space-sm">
<button className="w-full py-space-sm px-space-lg bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded font-semibold transition-all duration-200 shadow-md hover:-translate-y-0.5 flex items-center justify-center gap-space-sm" id="btn-register-submit" type="submit">
<span>Créer mon compte investisseur</span>
<span className="material-symbols-outlined text-title-md">person_add</span>
</button>
</div>
</form>
</div>

<div className="pt-space-xl text-center flex flex-col items-center gap-space-xs">
<div className="flex items-center gap-space-md text-on-surface-variant font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-title-md text-secondary">encrypted</span> Données confidentielles certifiées</span>
<span>•</span>
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-title-md text-secondary">support_agent</span> Service Clientèle Dédié</span>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">
            Besoin d'un accompagnement personnalisé pour votre mandat ? <a className="text-secondary font-semibold hover:underline" href="#">Consulter nos conseillers privés</a>
</p>
</div>
</div>
</div>
</section>


</div></main>
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
