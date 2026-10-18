const fs = require('fs');
const path = require('path');

const ROOT_DIR = 'c:/Users/Power-info/Desktop/prime house';
const STITCH_DIR = path.join(ROOT_DIR, '.stitch_designs');

// Screen mapping definitions
const PUBLIC_PAGES = [
  {
    target: 'index.html',
    sourceMatch: 'Accueil___Prime_House_Immobilier.html',
    title: 'Prime House | Immobilier de Prestige en Algérie'
  },
  {
    target: 'biens.html',
    sourceMatch: 'Nos_Biens___Recherche___Filtres.html',
    title: 'Nos Biens — Recherche & Filtres | Prime House'
  },
  {
    target: 'louer.html',
    sourceMatch: 'Louer___Recherche_de_Locations',
    title: 'Locations Immobilières de Prestige en Algérie | Prime House'
  },
  {
    target: 'bien-detail.html',
    sourceMatch: 'D_tail_du_Bien___Fiche_Exclusive',
    title: 'Détail du Bien — Fiche Exclusive | Prime House'
  },
  {
    target: 'bien-villa-hydra.html',
    sourceMatch: 'D_tail_du_Bien___Villa_Contemporaine_Hydra.html',
    title: 'Villa Contemporaine Hydra | Prime House'
  },
  {
    target: 'bien-duplex-hydra.html',
    sourceMatch: 'D_tail_du_Bien___Duplex_de_Prestige_Hydra.html',
    title: 'Duplex de Prestige Hydra | Prime House'
  },
  {
    target: 'deposer-annonce.html',
    sourceMatch: 'D_poser_une_Annonce___Prime_House_Immobilier.html',
    title: 'Déposer une Annonce Foncière de Prestige | Prime House'
  },
  {
    target: 'favoris.html',
    sourceMatch: 'Mes_Favoris___Prime_House_Immobilier.html',
    title: 'Mes Favoris | Prime House'
  },
  {
    target: 'mon-espace.html',
    sourceMatch: 'Mon_Espace___Tableau_de_Bord_Utilisateur.html',
    title: 'Mon Espace — Tableau de Bord | Prime House'
  },
  {
    target: 'a-propos.html',
    sourceMatch: '___Propos___Prime_House',
    title: 'À Propos — Partenaire Immobilier de Référence en Algérie | Prime House'
  },
  {
    target: 'contact.html',
    sourceMatch: 'Contact___Conciergerie___Prime_House',
    title: 'Contact & Conciergerie Privée | Prime House'
  },
  {
    target: 'connexion.html',
    sourceMatch: 'Connexion___Inscription___Prime_House.html',
    title: 'Connexion & Inscription | Prime House'
  },
  {
    target: 'mot-de-passe-oublie.html',
    sourceMatch: 'Mot_de_passe_oubli____Prime_House',
    title: 'Mot de passe oublié | Prime House'
  }
];

const ADMIN_PAGES = [
  {
    target: 'admin/index.html',
    sourceMatch: 'Tableau_de_bord___Console_d_Administration',
    title: "Tableau de Bord — Console d'Administration | Prime House"
  },
  {
    target: 'admin/biens.html',
    sourceMatch: 'Tous_les_Biens___Gestion_du_Parc',
    title: 'Tous les Biens — Gestion du Parc Immobilier | Prime House'
  },
  {
    target: 'admin/ajouter-bien.html',
    sourceMatch: 'Ajouter____diter_un_Bien',
    title: 'Ajouter & Éditer un Bien — Console Administration | Prime House'
  },
  {
    target: 'admin/moderation.html',
    sourceMatch: 'Biens_en_Mod_ration___Console_Administration',
    title: 'Biens en Modération — Console Administration | Prime House'
  },
  {
    target: 'admin/vitrine.html',
    sourceMatch: 'Biens___la_Une___Vitrine',
    title: 'Biens à la Une & Vitrine — Console Administration | Prime House'
  },
  {
    target: 'admin/demandes.html',
    sourceMatch: 'Demandes___Visites___Console_Administration',
    title: 'Demandes & Visites — Console Administration | Prime House'
  },
  {
    target: 'admin/categories-wilayas.html',
    sourceMatch: 'Cat_gories___Wilayas___Console_Administration',
    title: 'Catégories & Wilayas — Console Administration | Prime House'
  },
  {
    target: 'admin/parametres.html',
    sourceMatch: 'Param_tres_du_site___Console_Administration',
    title: 'Paramètres du site — Console Administration | Prime House'
  },
  {
    target: 'admin/login.html',
    sourceMatch: 'Connexion_Priv_e_Administrateur',
    title: 'Connexion Privée Administrateur | Prime House Console'
  },
  {
    target: 'admin/console.html',
    sourceMatch: 'Administration___Console_de_Gestion___Mod_ration',
    title: 'Console de Gestion & Modération | Prime House'
  }
];

// Helper to find source file
function findSourceFile(pattern) {
  const files = fs.readdirSync(STITCH_DIR);
  const found = files.find(f => f.includes(pattern));
  if (!found) throw new Error(`Source file matching "${pattern}" not found in ${STITCH_DIR}`);
  return path.join(STITCH_DIR, found);
}

// Rewiring public page links
function rewirePublicLinks(html) {
  let res = html;

  // Replace data-path references
  res = res.replace(/data-path="accueil"[^>]*href="#"/g, 'data-path="accueil" href="index.html"');
  res = res.replace(/data-path="acheter"[^>]*href="#"/g, 'data-path="acheter" href="biens.html?mode=vente"');
  res = res.replace(/data-path="louer"[^>]*href="#"/g, 'data-path="louer" href="louer.html"');
  res = res.replace(/data-path="nos-biens"[^>]*href="#"/g, 'data-path="nos-biens" href="biens.html"');
  res = res.replace(/data-path="a-propos"[^>]*href="#"/g, 'data-path="a-propos" href="a-propos.html"');
  res = res.replace(/data-path="contact"[^>]*href="#"/g, 'data-path="contact" href="contact.html"');
  res = res.replace(/data-path="deposer-une-annonce"[^>]*href="#"/g, 'data-path="deposer-une-annonce" href="deposer-annonce.html"');
  res = res.replace(/data-path="mon-compte"[^>]*href="#"/g, 'data-path="mon-compte" href="mon-espace.html"');
  res = res.replace(/data-path="favoris"[^>]*href="#"/g, 'data-path="favoris" href="favoris.html"');

  // Generic menu text replacements if href is still #
  res = res.replace(/href="#"([^>]*)>Accueil<\/a>/g, 'href="index.html"$1>Accueil</a>');
  res = res.replace(/href="#"([^>]*)>Acheter<\/a>/g, 'href="biens.html?mode=vente"$1>Acheter</a>');
  res = res.replace(/href="#"([^>]*)>Louer<\/a>/g, 'href="louer.html"$1>Louer</a>');
  res = res.replace(/href="#"([^>]*)>Nos biens<\/a>/g, 'href="biens.html"$1>Nos biens</a>');
  res = res.replace(/href="#"([^>]*)>À propos<\/a>/g, 'href="a-propos.html"$1>À propos</a>');
  res = res.replace(/href="#"([^>]*)>Contact<\/a>/g, 'href="contact.html"$1>Contact</a>');
  res = res.replace(/href="#"([^>]*)>Déposer une annonce<\/a>/g, 'href="deposer-annonce.html"$1>Déposer une annonce</a>');
  res = res.replace(/href="#"([^>]*)>Mon Espace<\/a>/g, 'href="mon-espace.html"$1>Mon Espace</a>');
  res = res.replace(/href="#"([^>]*)>Connexion<\/a>/g, 'href="connexion.html"$1>Connexion</a>');
  res = res.replace(/href="#"([^>]*)>Créer un compte<\/a>/g, 'href="connexion.html"$1>Créer un compte</a>');

  // Link property details
  res = res.replace(/href="#"([^>]*)>(\s*<span[^>]*>)?(\s*Détails|\s*Consulter la fiche|\s*Voir le bien)/g, 'href="bien-detail.html"$1>$2$3');

  // Add favorites badge in header right after profile / deposer
  if (!res.includes('favorites-count-badge')) {
    const favLink = `
      <a class="relative flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface" href="favoris.html" title="Mes Favoris">
        <span class="material-symbols-outlined text-[22px]">favorite_border</span>
        <span class="favorites-count-badge absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-primary-container font-label-sm text-[10px] font-bold inline-flex items-center justify-center">0</span>
      </a>
    `;
    res = res.replace(/(<a[^>]*data-path="mon-compte"[^>]*>)/, favLink + '$1');
  }

  // Replace logo with local P logo
  res = res.replace(/https:\/\/lh3\.googleusercontent\.com\/aida\/AEtjO1Ufhv0LQAlxHB[^\"]+/g, 'assets/logo-p-transparent.png');
  res = res.replace(/class="h-8 w-auto object-contain"/g, 'class="h-9 w-auto object-contain"');

  // Dynamic grid targets
  res = res.replace(/<!-- Grid of 6 Properties -->\s*<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-gutter">/g, '<!-- Grid of Properties (Dynamically Populated) -->\n<div id="properties-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-gutter">');
  res = res.replace(/<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">/g, '<div id="rental-properties-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">');
  res = res.replace(/<form class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">/g, '<form id="hero-search-form" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">');

  // Remove old conflicting inline favorite scripts if present
  res = res.replace(/<!-- Interactive JavaScript for micro-interactions -->\s*<script>[\s\S]*?<\/script>/g, '');

  // Inject CSS, Favicon & JS before </head> and </body>
  const headInject = `
    <link rel="icon" type="image/png" href="assets/favicon.png" />
    <link rel="stylesheet" href="css/style.css" />
  `;
  const jsInject = `
    <script src="js/data.js"></script>
    <script src="js/storage.js"></script>
    <script src="js/main.js"></script>
  `;

  if (!res.includes('css/style.css')) {
    res = res.replace('</head>', `${headInject}\n</head>`);
  }
  if (!res.includes('js/main.js')) {
    res = res.replace('</body>', `${jsInject}\n</body>`);
  }

  return res;
}

// Rewiring admin page links
function rewireAdminLinks(html) {
  let res = html;

  // Replace data-path in admin
  res = res.replace(/data-path="dashboard"[^>]*href="#"/g, 'data-path="dashboard" href="index.html"');
  res = res.replace(/data-path="tous-les-biens"[^>]*href="#"/g, 'data-path="tous-les-biens" href="biens.html"');
  res = res.replace(/data-path="ajouter-un-bien"[^>]*href="#"/g, 'data-path="ajouter-un-bien" href="ajouter-bien.html"');
  res = res.replace(/data-path="biens-en-moderation"[^>]*href="#"/g, 'data-path="biens-en-moderation" href="moderation.html"');
  res = res.replace(/data-path="biens-a-la-une"[^>]*href="#"/g, 'data-path="biens-a-la-une" href="vitrine.html"');
  res = res.replace(/data-path="demandes-et-visites"[^>]*href="#"/g, 'data-path="demandes-et-visites" href="demandes.html"');
  res = res.replace(/data-path="categories-et-wilayas"[^>]*href="#"/g, 'data-path="categories-et-wilayas" href="categories-wilayas.html"');
  res = res.replace(/data-path="parametres-du-site"[^>]*href="#"/g, 'data-path="parametres-du-site" href="parametres.html"');
  res = res.replace(/data-path="deconnexion"[^>]*href="#"/g, 'data-path="deconnexion" href="login.html"');

  // Public site return link
  res = res.replace(/<span>Voir le site public<\/span><\/a>/g, '<span>Voir le site public</span></a>');
  res = res.replace(/href="#"([^>]*)target="_blank"/g, 'href="../index.html"$1target="_blank"');

  // Generic text matching
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Tableau de bord<\/span>)/gs, 'href="index.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Tous les biens<\/span>)/gs, 'href="biens.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Ajouter un bien<\/span>)/gs, 'href="ajouter-bien.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Biens en modération<\/span>)/gs, 'href="moderation.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Biens à la Une<\/span>)/gs, 'href="vitrine.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Demandes &amp; Visites<\/span>)/gs, 'href="demandes.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Catégories &amp; Wilayas<\/span>)/gs, 'href="categories-wilayas.html"$1>$2');
  res = res.replace(/href="#"([^>]*)>(\s*<div[^>]*>.*?<span>Paramètres du site<\/span>)/gs, 'href="parametres.html"$1>$2');

  // Replace logo with local P logo
  res = res.replace(/https:\/\/lh3\.googleusercontent\.com\/aida\/AEtjO1Ufhv0LQAlxHB[^\"]+/g, '../assets/logo-p-transparent.png');
  const oldDomainIcon = '<div class="w-10 h-10 rounded bg-secondary flex items-center justify-center"><span class="material-symbols-outlined text-on-secondary text-[22px]">domain</span></div>';
  const newAdminLogo = '<img alt="Prime House Logo" class="w-10 h-10 object-contain p-0.5 rounded bg-surface-container-lowest/10" src="../assets/logo-p-transparent.png" />';
  res = res.replace(oldDomainIcon, newAdminLogo);

  const headInject = `
    <link rel="icon" type="image/png" href="../assets/favicon.png" />
    <link rel="stylesheet" href="../css/style.css" />
  `;
  const jsInject = `
    <script src="../js/data.js"></script>
    <script src="../js/storage.js"></script>
    <script src="../js/main.js"></script>
    <script src="../js/supabase-client.js"></script>
    <script src="../js/admin.js"></script>
  `;

  if (!res.includes('css/style.css')) {
    res = res.replace('</head>', `${headInject}\n</head>`);
  }
  if (!res.includes('js/admin.js')) {
    res = res.replace('</body>', `${jsInject}\n</body>`);
  }

  return res;
}


// Process Public Pages
for (const p of PUBLIC_PAGES) {
  try {
    const srcPath = findSourceFile(p.sourceMatch);
    let content = fs.readFileSync(srcPath, 'utf8');
    content = rewirePublicLinks(content);
    const dest = path.join(ROOT_DIR, p.target);
    fs.writeFileSync(dest, content, 'utf8');
    console.log(`✓ Processed public page: ${p.target}`);
  } catch (err) {
    console.error(`✗ Error processing ${p.target}:`, err.message);
  }
}

// Process Admin Pages
for (const p of ADMIN_PAGES) {
  try {
    const srcPath = findSourceFile(p.sourceMatch);
    let content = fs.readFileSync(srcPath, 'utf8');
    content = rewireAdminLinks(content);
    const dest = path.join(ROOT_DIR, p.target);
    fs.writeFileSync(dest, content, 'utf8');
    console.log(`✓ Processed admin page: ${p.target}`);
  } catch (err) {
    console.error(`✗ Error processing ${p.target}:`, err.message);
  }
}

console.log('All pages built successfully!');
