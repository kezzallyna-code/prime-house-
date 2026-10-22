/**
 * Prime House - Main Client Logic
 * Handles global UI interactions, header navigation, active states,
 * dynamic search & filtering for Acheter / Louer / Nos Biens, favorites sync, toasts, and bilingual support.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFavoriteButtons();
  initToasts();
  initHeroSearch();
  initBiensPage();
  initLouerPage();
  initFavorisPage();
  initDashboard();
  initAdminDashboard();
  initLanguageSwitch();
  initContactPage();
  initDeposerAnnoncePage();
  initNewsletterForms();
  updateFavoritesBadge();

  // Listen for storage changes
  window.addEventListener('prime:favorites-changed', (e) => {
    updateFavoritesBadge();
    updateFavoriteIconsState(e.detail.propertyId, e.detail.added);
  });
});

/**
 * -------------------------------------------------------------
 * 1. HEADER & NAVBAR SYSTEM
 * -------------------------------------------------------------
 */
function initNavbar() {
  highlightActiveNavLink();
  initHeaderScroll();
  initMobileDrawer();
}

/**
 * Automatically detects the current page and query parameters to highlight the appropriate nav link
 */
function highlightActiveNavLink() {
  const pathname = window.location.pathname.toLowerCase();
  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get('mode') || '';

  // Determine current active section
  let activeSection = 'nos-biens';

  if (pathname === '/' || pathname.endsWith('/index.html') || pathname.endsWith('prime%20house/') || pathname.endsWith('prime house/')) {
    activeSection = 'accueil';
  } else if (pathname.endsWith('louer.html')) {
    activeSection = 'louer';
  } else if (pathname.endsWith('biens.html')) {
    if (mode === 'vente') {
      activeSection = 'acheter';
    } else if (mode === 'location') {
      activeSection = 'louer';
    } else {
      activeSection = 'nos-biens';
    }
  } else if (pathname.endsWith('a-propos.html')) {
    activeSection = 'a-propos';
  } else if (pathname.endsWith('contact.html')) {
    activeSection = 'contact';
  } else if (pathname.endsWith('deposer-annonce.html')) {
    activeSection = 'deposer-une-annonce';
  } else if (pathname.endsWith('favoris.html')) {
    activeSection = 'favoris';
  }

  // Update desktop nav links
  const navLinks = document.querySelectorAll('header nav a[data-path], header nav a');
  navLinks.forEach(link => {
    const dataPath = link.getAttribute('data-path') || '';
    const href = link.getAttribute('href') || '';
    
    let isMatch = false;
    if (dataPath === activeSection) {
      isMatch = true;
    } else if (activeSection === 'accueil' && (href === 'index.html' || href === './')) {
      isMatch = true;
    } else if (activeSection === 'acheter' && href.includes('biens.html?mode=vente')) {
      isMatch = true;
    } else if (activeSection === 'louer' && (href === 'louer.html' || href.includes('biens.html?mode=location'))) {
      isMatch = true;
    } else if (activeSection === 'nos-biens' && href === 'biens.html') {
      isMatch = true;
    } else if (activeSection === 'a-propos' && href === 'a-propos.html') {
      isMatch = true;
    } else if (activeSection === 'contact' && href === 'contact.html') {
      isMatch = true;
    }

    if (isMatch) {
      link.setAttribute('aria-current', 'page');
      link.className = 'px-space-md py-space-sm transition-all bg-surface-container text-on-surface font-semibold rounded shadow-xs';
    } else if (dataPath) {
      link.removeAttribute('aria-current');
      link.className = 'px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded transition-all font-normal';
    }
  });
}
window.highlightActiveNavLink = highlightActiveNavLink;

/**
 * Header scroll elevation effect
 */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/**
 * User dropdown disabled: public users browse and interact without requiring user authentication.
 * Administration is strictly managed via /admin/login.html.
 */
function initUserDropdown() {
  // Public profile dropdown removed per architecture specification
}

/**
 * Mobile Navigation Drawer
 */
function initMobileDrawer() {
  const menuButtons = document.querySelectorAll('[aria-label="Menu Principal"], .mobile-menu-trigger');
  menuButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      let drawer = document.getElementById('mobile-drawer');
      if (!drawer) {
        drawer = createMobileDrawer();
      }
      drawer.classList.remove('hidden');
    });
  });
}

function createMobileDrawer() {
  const isInsideAdmin = window.location.pathname.includes('/admin/');
  const prefix = isInsideAdmin ? '../' : '';

  const drawer = document.createElement('div');
  drawer.id = 'mobile-drawer';
  drawer.className = 'fixed inset-0 z-50 bg-primary-container/95 backdrop-blur-xl flex flex-col p-6 text-surface overflow-y-auto';
  drawer.innerHTML = `
    <div class="flex items-center justify-between pb-6 border-b border-surface-container-highest/20">
      <div class="flex items-center gap-2">
        <img alt="Prime House" class="h-8 w-auto object-contain" src="${prefix}assets/logo-p-transparent.png" />
        <div class="flex flex-col">
          <span class="font-headline-sm font-bold tracking-tight uppercase text-surface">PRIME HOUSE</span>
          <span class="font-label-sm text-[10px] text-secondary-fixed tracking-widest uppercase">Algeria Luxury Estate</span>
        </div>
      </div>
      <button class="w-10 h-10 rounded-full bg-surface-container-lowest/10 flex items-center justify-center text-surface hover:text-secondary-fixed text-xl transition-colors" onclick="document.getElementById('mobile-drawer').classList.add('hidden')">✕</button>
    </div>
    
    <nav class="flex flex-col gap-2 py-6 text-base font-medium">
      <a href="${prefix}index.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">home</span>
        <span>Accueil</span>
      </a>
      <a href="${prefix}biens.html?mode=vente" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">sell</span>
        <span>Acheter (Vente)</span>
      </a>
      <a href="${prefix}louer.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">key</span>
        <span>Louer (Locations de Prestige)</span>
      </a>
      <a href="${prefix}biens.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">domain</span>
        <span>Nos Biens (Tout le catalogue)</span>
      </a>
      <a href="${prefix}favoris.html" class="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-secondary-fixed">favorite</span>
          <span>Mes Favoris</span>
        </div>
        <span class="favorites-count-badge bg-secondary-container text-on-secondary-container text-xs font-bold px-2 py-0.5 rounded-full">0</span>
      </a>
      <a href="${prefix}deposer-annonce.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-secondary-container/20 text-secondary-fixed hover:bg-secondary-container/30 transition-colors font-semibold">
        <span class="material-symbols-outlined">add_business</span>
        <span>Déposer une annonce</span>
      </a>
      <a href="${prefix}a-propos.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">info</span>
        <span>À Propos de Prime House</span>
      </a>
      <a href="${prefix}contact.html" class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-surface-container-lowest/10 transition-colors">
        <span class="material-symbols-outlined text-secondary-fixed">support_agent</span>
        <span>Contact & Conciergerie</span>
      </a>
      
      <div class="pt-4 mt-2 border-t border-surface-container-highest/20 flex flex-col gap-2">
        <a href="${prefix}admin/index.html" class="text-sm text-surface-variant hover:text-secondary-fixed flex items-center gap-3 px-3 py-2">
          <span class="material-symbols-outlined text-base">admin_panel_settings</span>
          <span>Console d'Administration</span>
        </a>
      </div>
    </nav>

    <div class="mt-auto pt-6 border-t border-surface-container-highest/20 flex flex-col gap-3">
      <div class="flex items-center justify-between text-xs text-surface-variant">
        <span>Conciergerie Privée :</span>
        <a href="tel:+213560123456" class="text-secondary-fixed font-semibold hover:underline">+213 (0) 560 12 34 56</a>
      </div>
    </div>
  `;

  document.body.appendChild(drawer);
  return drawer;
}

/**
 * -------------------------------------------------------------
 * 2. FAVORITES MANAGEMENT & SYNC
 * -------------------------------------------------------------
 */
function updateFavoritesBadge() {
  const count = window.primeStorage ? window.primeStorage.getFavorites().length : 0;
  const badges = document.querySelectorAll('.favorites-count-badge');
  badges.forEach(b => {
    b.textContent = count;
    b.style.display = count > 0 ? 'inline-flex' : 'none';
  });
}

function updateFavoriteIconsState(propertyId, isFav) {
  const btns = document.querySelectorAll(`[data-fav-id="${propertyId}"]`);
  btns.forEach(btn => {
    const icon = btn.querySelector('.material-symbols-outlined') || btn;
    if (isFav) {
      icon.textContent = 'favorite';
      btn.classList.add('text-error');
      btn.classList.remove('text-on-surface');
      btn.setAttribute('title', 'Retirer des favoris');
    } else {
      icon.textContent = 'favorite_border';
      btn.classList.remove('text-error');
      btn.classList.add('text-on-surface');
      btn.setAttribute('title', 'Ajouter aux favoris');
    }
  });
}

function initFavoriteButtons() {
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('[data-fav-id], .favorite-toggle-btn');
    if (!favBtn) return;

    e.preventDefault();
    e.stopPropagation();

    const propId = favBtn.getAttribute('data-fav-id') || 'ph-alg-401';
    if (!window.primeStorage) return;

    const added = window.primeStorage.toggleFavorite(propId);
    showToast(
      added ? 'Bien d’exception ajouté à vos favoris' : 'Bien retiré de vos favoris',
      added ? 'success' : 'info'
    );
  });

  // Set initial state of buttons
  if (window.primeStorage) {
    const favs = window.primeStorage.getFavorites();
    favs.forEach(id => updateFavoriteIconsState(id, true));
  }
}

/**
 * -------------------------------------------------------------
 * 3. HERO SEARCH & TAB SWITCHER (Index.html)
 * -------------------------------------------------------------
 */
function initHeroSearch() {
  const heroTabs = document.getElementById('hero-tabs');
  const searchForm = document.querySelector('section form');
  
  if (!heroTabs && !searchForm) return;

  let currentMode = 'vente';

  const heroSelects = searchForm ? searchForm.querySelectorAll('select') : [];
  const budgetSelect = heroSelects.length >= 3 ? heroSelects[2] : null;

  window.selectTab = function(btn, mode) {
    currentMode = mode === 'louer' ? 'location' : 'vente';
    
    // Update button visual states
    const buttons = heroTabs ? heroTabs.querySelectorAll('.tab-btn') : [];
    buttons.forEach(b => {
      b.classList.remove('bg-primary-container', 'text-surface', 'shadow-sm');
      b.classList.add('text-on-surface-variant');
    });
    btn.classList.add('bg-primary-container', 'text-surface', 'shadow-sm');
    btn.classList.remove('text-on-surface-variant');

    // Dynamically adapt budget select options for sales vs rentals
    if (budgetSelect) {
      if (currentMode === 'location') {
        budgetSelect.innerHTML = `
          <option value="all">Tous budgets locatifs</option>
          <option value="150-300">150 000 - 300 000 DA / mois</option>
          <option value="300-600">300 000 - 600 000 DA / mois</option>
          <option selected value="600-1500">600 000 - 1 500 000 DA / mois</option>
          <option value="1500+">1 500 000 DA et plus / mois</option>
        `;
      } else {
        budgetSelect.innerHTML = `
          <option value="all">Tous types de budgets</option>
          <option value="15-40">15M - 40M DA</option>
          <option value="40-80">40M - 80M DA</option>
          <option selected value="80-150">80M - 150M DA</option>
          <option value="150+">150M DA et plus</option>
        `;
      }
    }
  };

  // Handle Form Submission
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const selects = searchForm.querySelectorAll('select');
      const typeVal = selects[0] ? selects[0].value : 'all';
      const wilayaVal = selects[1] ? selects[1].value : 'all';
      const budgetVal = selects[2] ? selects[2].value : 'all';
      const roomsVal = selects[3] ? selects[3].value : 'any';

      const targetUrl = `biens.html?mode=${currentMode}&type=${encodeURIComponent(typeVal)}&wilaya=${encodeURIComponent(wilayaVal)}&budget=${encodeURIComponent(budgetVal)}&chambres=${encodeURIComponent(roomsVal)}`;
      window.location.href = targetUrl;
    });
  }

  // Handle Quick Suggestion Pills on Index
  document.querySelectorAll('button, .suggestion-tag').forEach(btn => {
    const txt = btn.textContent.trim();
    if (txt === 'Villas avec piscine') {
      btn.addEventListener('click', () => { window.location.href = 'biens.html?type=villa&feature=piscine'; });
    } else if (txt === 'Vue sur mer Alger') {
      btn.addEventListener('click', () => { window.location.href = 'biens.html?wilaya=alger&q=vue%20mer'; });
    } else if (txt === 'Appartements F4 Hydra') {
      btn.addEventListener('click', () => { window.location.href = 'biens.html?type=appartement&wilaya=alger&commune=hydra'; });
    } else if (txt === 'Terrains résidentiels') {
      btn.addEventListener('click', () => { window.location.href = 'biens.html?type=terrain'; });
    }
  });
}

/**
 * -------------------------------------------------------------
 * 4. DYNAMIC BIENS PAGE (biens.html) - ACHETER / LOUER / NOS BIENS
 * -------------------------------------------------------------
 */
function initBiensPage() {
  const isBiensPage = window.location.pathname.toLowerCase().endsWith('biens.html');
  if (!isBiensPage) return;

  const urlParams = new URLSearchParams(window.location.search);
  let activeMode = urlParams.get('mode') || 'all'; // 'all', 'vente', 'location'
  let activeWilaya = urlParams.get('wilaya') || 'all';
  let activeType = urlParams.get('type') || 'all';
  let activeKeyword = urlParams.get('q') || '';
  let activeChambres = urlParams.get('chambres') || 'any';
  let activeFeature = urlParams.get('feature') || '';

  // Get UI Elements
  const quickSearchPillContainer = document.querySelector('.flex.items-center.bg-surface-container-lowest.rounded-lg.p-1');
  const acheterPillBtn = quickSearchPillContainer ? quickSearchPillContainer.querySelectorAll('button')[0] : null;
  const louerPillBtn = quickSearchPillContainer ? quickSearchPillContainer.querySelectorAll('button')[1] : null;

  const keywordInput = document.querySelector('input[placeholder*="mot-clé"]');
  const allSelects = Array.from(document.querySelectorAll('aside select, form select, select'));
  const wilayaSelect = allSelects.find(s => s.textContent.includes('Alger') || s.textContent.includes('Wilaya')) || allSelects[0] || null;
  const typeSelect = allSelects.find(s => s.textContent.includes('Villa') || s.textContent.includes('types')) || allSelects[1] || null;
  const actualiserBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Actualiser') || b.querySelector('.material-symbols-outlined')?.textContent.trim() === 'tune');
  
  // Find properties grid container
  const mainGrid = document.querySelector('main .grid.grid-cols-1.md\\:grid-cols-2') || document.querySelector('#properties-grid') || document.querySelector('main .grid');
  const countBadge = document.querySelector('.font-headline-sm.text-headline-sm.text-on-surface.font-semibold.tracking-tight');
  const activeTagsContainer = document.getElementById('activeFilterTags');

  // Pre-fill keyword if provided
  if (keywordInput && activeKeyword) {
    keywordInput.value = activeKeyword;
  }

  // Function to re-render the property grid based on filters
  function filterAndRender() {
    if (!window.primeStorage) return;
    const allProps = window.primeStorage.getAllProperties();

    const filtered = allProps.filter(p => {
      // 1. Transaction mode (vente vs location)
      if (activeMode === 'vente' && p.status !== 'vente') return false;
      if (activeMode === 'location' && p.status !== 'location') return false;

      // 2. Wilaya filter
      if (activeWilaya !== 'all') {
        const wilayaLower = (p.wilaya || '').toLowerCase();
        if (!wilayaLower.includes(activeWilaya.toLowerCase())) return false;
      }

      // 3. Type filter
      if (activeType !== 'all') {
        const typeLower = (p.type || '').toLowerCase();
        if (!typeLower.includes(activeType.toLowerCase())) return false;
      }

      // 4. Bedrooms
      if (activeChambres !== 'any') {
        const requiredRooms = parseInt(activeChambres, 10);
        if (requiredRooms && (p.bedrooms || 0) < requiredRooms) return false;
      }

      // 5. Keyword search
      if (activeKeyword.trim()) {
        const q = activeKeyword.toLowerCase().trim();
        const haystack = `${p.title} ${p.description || ''} ${p.address || ''} ${p.wilaya || ''} ${p.commune || ''} ${p.ref || ''}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      // 6. Feature
      if (activeFeature === 'piscine') {
        const featStr = (p.features || []).join(' ').toLowerCase();
        if (!featStr.includes('piscine') && !(p.title || '').toLowerCase().includes('piscine')) return false;
      }

      return true;
    });

    // Update Counter
    if (countBadge) {
      countBadge.textContent = filtered.length;
    }

    // Update Active Filter Tags
    renderActiveFilterTags(filtered.length);

    // Update Acheter / Louer Pill styles
    updatePillStyles();

    // Render cards into mainGrid
    if (mainGrid) {
      if (filtered.length === 0) {
        mainGrid.innerHTML = `
          <div class="col-span-full py-16 flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-2xl border border-surface-container">
            <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-secondary mb-4">
              <span class="material-symbols-outlined text-3xl">home_work</span>
            </div>
            <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface">Aucun bien ne correspond à vos critères</h3>
            <p class="font-body-md text-on-surface-variant max-w-md mt-2">
              Modifiez vos filtres ou contactez notre département conciergerie privée pour une recherche sur-mesure hors marché.
            </p>
            <button onclick="resetAllFilters()" class="mt-6 px-6 py-2.5 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg font-semibold rounded-lg transition-all shadow-sm">
              Réinitialiser tous les filtres
            </button>
          </div>
        `;
        return;
      }

      mainGrid.innerHTML = filtered.map(p => createPropertyCardHtml(p)).join('');

      // Refresh favorite button visual states
      const favs = window.primeStorage.getFavorites();
      favs.forEach(id => updateFavoriteIconsState(id, true));
    }
  }

  function updatePillStyles() {
    if (!acheterPillBtn || !louerPillBtn) return;
    
    // Reset classes
    [acheterPillBtn, louerPillBtn].forEach(b => {
      b.className = 'px-space-md py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-md text-label-md transition-all font-medium';
    });

    if (activeMode === 'vente') {
      acheterPillBtn.className = 'px-space-md py-1.5 rounded bg-primary-container text-surface font-label-md text-label-md font-semibold transition-all shadow-xs';
    } else if (activeMode === 'location') {
      louerPillBtn.className = 'px-space-md py-1.5 rounded bg-primary-container text-surface font-label-md text-label-md font-semibold transition-all shadow-xs';
    }
  }

  function renderActiveFilterTags(matchCount) {
    if (!activeTagsContainer) return;

    let tagsHtml = '';

    if (activeMode === 'vente') {
      tagsHtml += `
        <span class="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span class="material-symbols-outlined text-xs text-secondary">sell</span>
          Acheter (Vente)
          <button onclick="removeFilter('mode')" class="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
        </span>
      `;
    } else if (activeMode === 'location') {
      tagsHtml += `
        <span class="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span class="material-symbols-outlined text-xs text-secondary">key</span>
          Louer (Location)
          <button onclick="removeFilter('mode')" class="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
        </span>
      `;
    }

    if (activeWilaya !== 'all') {
      tagsHtml += `
        <span class="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span class="material-symbols-outlined text-xs text-secondary">location_on</span>
          Wilaya: ${activeWilaya.charAt(0).toUpperCase() + activeWilaya.slice(1)}
          <button onclick="removeFilter('wilaya')" class="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
        </span>
      `;
    }

    if (activeType !== 'all') {
      tagsHtml += `
        <span class="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span class="material-symbols-outlined text-xs text-secondary">home_work</span>
          Type: ${activeType.charAt(0).toUpperCase() + activeType.slice(1)}
          <button onclick="removeFilter('type')" class="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
        </span>
      `;
    }

    if (activeKeyword.trim()) {
      tagsHtml += `
        <span class="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          <span class="material-symbols-outlined text-xs text-secondary">search</span>
          "${activeKeyword}"
          <button onclick="removeFilter('q')" class="hover:text-error ml-1 transition-colors leading-none" title="Supprimer le filtre">✕</button>
        </span>
      `;
    }

    if (tagsHtml) {
      tagsHtml += `
        <button onclick="resetAllFilters()" class="font-label-sm text-label-sm text-secondary hover:underline ml-1 font-semibold" type="button">
          Tout effacer
        </button>
      `;
    }

    activeTagsContainer.innerHTML = tagsHtml;
  }

  // Wire up Acheter / Louer pill clicks
  if (acheterPillBtn) {
    acheterPillBtn.addEventListener('click', () => {
      activeMode = activeMode === 'vente' ? 'all' : 'vente';
      updateUrl();
      filterAndRender();
      highlightActiveNavLink();
    });
  }

  if (louerPillBtn) {
    louerPillBtn.addEventListener('click', () => {
      activeMode = activeMode === 'location' ? 'all' : 'location';
      updateUrl();
      filterAndRender();
      highlightActiveNavLink();
    });
  }

  // Wire up keyword search input
  if (keywordInput) {
    let debounceTimer;
    keywordInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        activeKeyword = e.target.value;
        filterAndRender();
      }, 250);
    });
  }

  // Wire up Wilaya select
  document.querySelectorAll('select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const val = e.target.value.toLowerCase();
      if (val.includes('alger') || val.includes('oran') || val.includes('boumerd') || val.includes('blida') || val.includes('annaba') || val.includes('constantine')) {
        activeWilaya = val.split(' ')[0].replace(/[^a-z]/g, '');
        filterAndRender();
      } else if (val.includes('villa') || val.includes('penthouse') || val.includes('appartement') || val.includes('terrain') || val.includes('commercial')) {
        if (val.includes('villa')) activeType = 'villa';
        else if (val.includes('penthouse') || val.includes('duplex')) activeType = 'penthouse';
        else if (val.includes('appartement')) activeType = 'appartement';
        else if (val.includes('terrain')) activeType = 'terrain';
        filterAndRender();
      }
    });
  });

  // Wire up bedroom buttons
  const roomButtons = document.querySelectorAll('.grid-cols-5 button');
  roomButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roomButtons.forEach(b => {
        b.className = 'py-2 rounded-lg bg-surface-container-low hover:bg-surface-container font-label-md text-label-md text-on-surface transition-colors';
      });
      btn.className = 'py-2 rounded-lg bg-primary-container text-surface font-label-md text-label-md font-bold shadow-xs';
      activeChambres = btn.textContent.trim().replace('+', '');
      filterAndRender();
    });
  });

  // Global Helpers for filter reset/removal
  window.removeFilter = function(filterName) {
    if (filterName === 'mode') activeMode = 'all';
    if (filterName === 'wilaya') activeWilaya = 'all';
    if (filterName === 'type') activeType = 'all';
    if (filterName === 'q') {
      activeKeyword = '';
      if (keywordInput) keywordInput.value = '';
    }
    updateUrl();
    filterAndRender();
    highlightActiveNavLink();
  };

  window.resetAllFilters = function() {
    activeMode = 'all';
    activeWilaya = 'all';
    activeType = 'all';
    activeKeyword = '';
    activeChambres = 'any';
    activeFeature = '';
    if (keywordInput) keywordInput.value = '';
    updateUrl();
    filterAndRender();
    highlightActiveNavLink();
  };

  function updateUrl() {
    const newParams = new URLSearchParams();
    if (activeMode !== 'all') newParams.set('mode', activeMode);
    if (activeWilaya !== 'all') newParams.set('wilaya', activeWilaya);
    if (activeType !== 'all') newParams.set('type', activeType);
    if (activeKeyword) newParams.set('q', activeKeyword);
    const newRelativePathQuery = window.location.pathname + (newParams.toString() ? '?' + newParams.toString() : '');
    window.history.replaceState(null, '', newRelativePathQuery);
  }

  // Initial Filter & Render
  filterAndRender();
}

/**
 * Creates luxury property card HTML string with full Arabic & French support
 */
function createPropertyCardHtml(p) {
  const currentLang = localStorage.getItem('prime_language') || (document.documentElement.getAttribute('lang') === 'ar' ? 'ar' : 'fr');
  const isAr = currentLang === 'ar';

  const isVente = p.status === 'vente';
  const badgeText = isAr ? (isVente ? 'بيع حصري' : 'للإيجار') : (isVente ? 'VENTE EXCLUSIVE' : 'À LOUER');
  
  let badgeLegal = p.legalStatus || (isVente ? 'Acte notarié & Livret foncier' : 'Bail notarié');
  if (isAr) {
    if (badgeLegal.includes('Livret foncier individuel')) {
      badgeLegal = 'عقد موثق ودفتر عقاري فردي';
    } else if (badgeLegal.includes('Livret foncier') || badgeLegal.includes('Acte notarié')) {
      badgeLegal = 'عقد موثق ودفتر عقاري';
    } else if (badgeLegal.includes('Bail diplomatique')) {
      badgeLegal = 'عقد إيجار دبلوماسي موثق';
    } else if (badgeLegal.includes('Bail')) {
      badgeLegal = 'عقد إيجار موثق';
    }
  }

  const title = (isAr && p.title_ar) ? p.title_ar : p.title;
  const description = (isAr && p.description_ar) ? p.description_ar : (p.description || p.tagline || '');
  const wilayaDisplay = isAr ? (p.wilaya_ar || p.wilaya) : p.wilaya;
  const communeDisplay = isAr ? (p.commune_ar || p.commune || wilayaDisplay) : (p.commune || p.wilaya);
  const locationText = `${communeDisplay} • ${wilayaDisplay}`;

  const imgUrl = (p.images && p.images[0]) || 'assets/logo-p-transparent.png';
  
  // Specific detail link if matched
  let detailUrl = `bien-detail.html?id=${p.id}`;
  if (p.id === 'ph-alg-401') detailUrl = 'bien-villa-hydra.html';
  if (p.id === 'ph-alg-308') detailUrl = 'bien-duplex-hydra.html';

  const priceSuffix = isAr ? (isVente ? 'دج' : 'دج / شهرياً') : (isVente ? 'DA' : 'DA / mois');
  const formattedPrice = Number(p.price).toLocaleString('fr-FR');

  const refLabel = isAr ? 'مرجع' : 'Réf';
  const bedLabel = isAr ? 'غرف' : 'Chambres';
  const bathLabel = isAr ? 'حمامات' : "Salles d'eau";
  const m2Label = isAr ? 'م²' : 'م²';
  const detailsBtnText = isAr ? 'التفاصيل' : 'Détails';

  return `
    <article class="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_4px_20px_-2px_rgba(7,20,38,0.06)] hover:shadow-[0_16px_36px_-4px_rgba(7,20,38,0.12)] card-transition flex flex-col border border-surface-container/60">
      <div class="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
        <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
             src="${imgUrl}" 
             alt="${title}" />
        <div class="absolute top-space-sm left-space-sm flex flex-col gap-1 items-start z-10">
          <span class="px-2.5 py-1 rounded bg-surface-container-lowest/95 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-bold shadow-xs">
            ${badgeText}
          </span>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-primary-container/90 backdrop-blur-md text-secondary-fixed font-label-sm text-[11px]">
            <span class="material-symbols-outlined text-xs text-secondary-fixed">verified</span>
            ${badgeLegal}
          </span>
        </div>
        <div class="absolute top-space-sm right-space-sm flex items-center gap-1.5 z-10">
          <button data-fav-id="${p.id}" class="w-9 h-9 rounded-full bg-surface-container-lowest/90 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-error hover:bg-surface-container-lowest shadow-sm transition-all" type="button" title="${isAr ? 'إضافة إلى المفضلة' : 'Ajouter aux favoris'}">
            <span class="material-symbols-outlined text-title-md">favorite_border</span>
          </button>
        </div>
        <div class="absolute bottom-2.5 left-0 right-0 flex justify-center items-center gap-1.5 z-10 pointer-events-none">
          <span class="w-5 h-1.5 rounded-full bg-surface-container-lowest shadow-xs"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-surface-container-lowest/60"></span>
        </div>
      </div>
      <div class="p-space-lg flex-1 flex flex-col justify-between gap-space-md">
        <div class="space-y-space-xs">
          <div class="flex items-center justify-between">
            <span class="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary uppercase tracking-widest font-bold">
              <span class="material-symbols-outlined text-xs">pin_drop</span>
              ${locationText}
            </span>
            <span class="font-label-sm text-label-sm text-outline"><bdi>${refLabel}: ${p.ref}</bdi></span>
          </div>
          <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold group-hover:text-secondary transition-colors line-clamp-1">
            <a href="${detailUrl}">${title}</a>
          </h3>
          <p class="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            ${description}
          </p>
        </div>
        <div class="grid grid-cols-3 py-space-sm border-y border-surface-container-low text-center gap-1">
          <div class="flex flex-col items-center">
            <span class="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span class="material-symbols-outlined text-sm text-secondary">king_bed</span> <bdi>${p.bedrooms || 0}</bdi>
            </span>
            <span class="font-label-sm text-label-sm text-outline">${bedLabel}</span>
          </div>
          <div class="flex flex-col items-center border-x border-surface-container-low">
            <span class="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span class="material-symbols-outlined text-sm text-secondary">bathtub</span> <bdi>${p.bathrooms || 0}</bdi>
            </span>
            <span class="font-label-sm text-label-sm text-outline">${bathLabel}</span>
          </div>
          <div class="flex flex-col items-center">
            <span class="flex items-center gap-1 font-title-md text-title-md text-on-surface font-bold">
              <span class="material-symbols-outlined text-sm text-secondary">square_foot</span> <bdi>${p.surface || 0}</bdi>
            </span>
            <span class="font-label-sm text-label-sm text-outline">${m2Label}</span>
          </div>
        </div>
        <div class="flex items-center justify-between pt-space-xs">
          <div class="flex flex-col">
            <div class="flex items-baseline gap-1">
              <span class="font-currency-display text-currency-display text-on-surface tracking-tight font-extrabold bidi-safe"><bdi>${formattedPrice}</bdi></span>
              <span class="font-label-sm text-label-sm text-secondary font-bold">${priceSuffix}</span>
            </div>
          </div>
          <a class="px-space-md py-2 bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface font-label-md text-label-md font-semibold rounded-lg transition-all flex items-center gap-1 shadow-xs" href="${detailUrl}">
            <span>${detailsBtnText}</span>
            <span class="material-symbols-outlined text-sm ${isAr ? 'rtl-flip' : ''}">arrow_forward</span>
          </a>
        </div>
      </div>
    </article>
  `;
}

/**
 * -------------------------------------------------------------
 * 5. DEDICATED LOUER PAGE (louer.html)
 * -------------------------------------------------------------
 */
function initLouerPage() {
  const isLouerPage = window.location.pathname.toLowerCase().endsWith('louer.html');
  if (!isLouerPage) return;

  const rentalGrid = document.querySelector('section.max-w-\\[1440px\\] .grid') || document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
  if (!rentalGrid || !window.primeStorage) return;

  // Render all rental properties dynamically
  const rentals = window.primeStorage.getAllProperties().filter(p => p.status === 'location');
  if (rentals.length > 0) {
    rentalGrid.innerHTML = rentals.map(p => createPropertyCardHtml(p)).join('');
    
    // Refresh favorite buttons
    const favs = window.primeStorage.getFavorites();
    favs.forEach(id => updateFavoriteIconsState(id, true));
  }
}

/**
 * -------------------------------------------------------------
 * 6. FAVORITES PAGE (favoris.html)
 * -------------------------------------------------------------
 */
function initFavorisPage() {
  const isFavPage = window.location.pathname.toLowerCase().endsWith('favoris.html');
  if (!isFavPage || !window.primeStorage) return;

  const favGrid = document.getElementById('favorites-grid');
  const favCountDisplay = document.getElementById('fav-count-display');
  const filterButtons = document.querySelectorAll('.filter-btn');

  let currentCategory = 'all';

  function renderFavorites() {
    const allFavProps = window.primeStorage.getFavoriteProperties();
    if (favCountDisplay) favCountDisplay.textContent = allFavProps.length;

    // Filter by tab
    const filtered = allFavProps.filter(p => {
      if (currentCategory === 'vente') return p.status === 'vente';
      if (currentCategory === 'location') return p.status === 'location';
      return true;
    });

    if (!favGrid) return;

    if (filtered.length === 0) {
      favGrid.innerHTML = `
        <div class="col-span-full py-16 flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-2xl border border-surface-container">
          <div class="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center text-error mb-4">
            <span class="material-symbols-outlined text-3xl">favorite_border</span>
          </div>
          <h3 class="font-headline-sm text-headline-sm font-semibold text-on-surface">Votre collection de favoris est vide</h3>
          <p class="font-body-md text-on-surface-variant max-w-md mt-2">
            Explorez nos résidences exclusives et cliquez sur le cœur pour conserver vos propriétés préférées et les comparer.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="biens.html?mode=vente" class="px-6 py-2.5 bg-primary-container text-surface hover:bg-surface-tint font-label-lg font-semibold rounded-lg transition-all shadow-sm">
              Biens à Vendre
            </a>
            <a href="louer.html" class="px-6 py-2.5 bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg font-semibold rounded-lg transition-all shadow-sm">
              Biens à Louer
            </a>
          </div>
        </div>
      `;
      return;
    }

    favGrid.innerHTML = filtered.map(p => createPropertyCardHtml(p)).join('');

    // Mark as favorites
    const favs = window.primeStorage.getFavorites();
    favs.forEach(id => updateFavoriteIconsState(id, true));
  }

  // Filter chips click
  window.filterProperties = function(category) {
    currentCategory = category;
    filterButtons.forEach(btn => {
      btn.className = 'filter-btn px-space-md py-space-xs rounded-full bg-surface-container-low hover:bg-surface-container text-on-surface-variant font-label-md text-label-md uppercase tracking-wider transition-all';
    });
    const activeBtn = document.getElementById(`filter-${category}`);
    if (activeBtn) {
      activeBtn.className = 'filter-btn px-space-md py-space-xs rounded-full bg-primary-container text-on-primary font-label-md text-label-md uppercase tracking-wider transition-all shadow-xs';
    }
    renderFavorites();
  };

  // Clear all favorites helper
  window.clearAllFavorites = function() {
    if (confirm('Voulez-vous retirer tous les biens de votre liste de favoris ?')) {
      localStorage.setItem('prime_house_favorites', JSON.stringify([]));
      window.dispatchEvent(new CustomEvent('prime:favorites-changed', { detail: { propertyId: null, added: false, count: 0 } }));
      renderFavorites();
      showToast('Votre liste de favoris a été réinitialisée', 'info');
    }
  };

  window.shareWishlist = function() {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Lien de votre sélection copié dans le presse-papier !', 'success');
    } else {
      showToast('Partage disponible via le lien de la page.', 'info');
    }
  };

  renderFavorites();
}

/**
 * -------------------------------------------------------------
 * 7. TOAST NOTIFICATION SYSTEM
 * -------------------------------------------------------------
 */
function initToasts() {
  if (document.getElementById('prime-toast-container')) return;
  const container = document.createElement('div');
  container.id = 'prime-toast-container';
  container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4';
  document.body.appendChild(container);
}

function showToast(message, type = 'info') {
  initToasts();
  const container = document.getElementById('prime-toast-container');
  const toast = document.createElement('div');
  
  const bgClasses = {
    success: 'bg-primary-container text-surface border border-secondary/40 shadow-xl',
    error: 'bg-error text-on-error shadow-xl',
    info: 'bg-surface-container-lowest text-on-surface border border-surface-container shadow-xl'
  }[type] || 'bg-primary-container text-surface';

  const iconName = {
    success: 'check_circle',
    error: 'error',
    info: 'info'
  }[type] || 'info';

  toast.className = `flex items-center gap-3 px-4 py-3 rounded-lg pointer-events-auto transform translate-y-4 opacity-0 transition-all duration-300 ease-out ${bgClasses}`;
  toast.innerHTML = `
    <span class="material-symbols-outlined text-[20px] ${type === 'success' ? 'text-secondary-fixed' : ''}">${iconName}</span>
    <span class="font-body-sm text-body-sm font-medium flex-1">${message}</span>
    <button class="text-xs opacity-70 hover:opacity-100 ml-2" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
window.showToast = showToast;

/**
 * -------------------------------------------------------------
 * 8. LANGUAGE SWITCHER (FR / AR) - Complete PrimeI18n System
 * -------------------------------------------------------------
 */
const I18N_DICT = {
  // Navigation & Headers
  "Accueil": "الرئيسية",
  "Acheter": "شراء",
  "Acheter (Vente)": "شراء (للبيع)",
  "Louer": "إيجار",
  "Louer (Location)": "إيجار (عقود كراء)",
  "Louer (Locations de Prestige)": "إيجارات راقية",
  "Nos biens": "عقاراتنا",
  "Nos Biens": "عقاراتنا",
  "Tous les biens": "جميع العقارات",
  "À propos": "من نحن",
  "Contact": "اتصل بنا",
  "Déposer une annonce": "أضف عقاراً",
  "Déposer un bien": "أضف عقاراً",
  "Mon Espace": "حسابي",
  "Mes Favoris": "عقاراتي المفضلة",
  "Mes favoris": "عقاراتي المفضلة",
  "Favoris": "المفضلة",
  "Connexion": "تسجيل الدخول",
  "Déconnexion": "تسجيل الخروج",
  "Se déconnecter": "تسجيل الخروج",
  "Retour au site public": "العودة للموقع العام",
  "Voir le site public": "زيارة الموقع العام",
  "Tableau de bord": "لوحة التحكم",
  "Tableau de Bord": "لوحة التحكم",
  "Tableau de Bord — Console d'Administration": "لوحة التحكم — منصة الإدارة",
  "Console d'Administration": "لوحة الإدارة",
  "Ajouter un bien": "إضافة عقار",
  "Paramètres du site": "إعدادات الموقع",
  "Catégories & Wilayas": "الفئات والولايات",
  "Demandes & Visites": "الطلبات والزيارات",
  "Biens en modération": "عقارات قيد المراجعة",
  "Biens à la Une": "العقارات المميزة",
  "Prestige Immobilier": "عقارات النخبة والامتياز",
  "Algeria Luxury Estate": "العقارات الفاخرة بالجزائر",
  "ESPACE CLIENT PRIVILÈGE": "فضاء العملاء المتميزين",
  "ESPACE ADMINISTRATION": "فضاء الإدارة والتحكم",
  "VUE GLOBALE": "نظرة عامة",
  "GESTION DU PARC": "إدارة العقارات",
  "LEADS & RELATIONS": "الطلبات والعملاء",
  "TAXONOMIE & CONFIG": "التصنيفات والإعدادات",
  "Console d'Exploitation Nationale": "لوحة التشغيل الوطنية",
  "Plateforme d'Administration Immobilière de Luxe": "منصة إدارة العقارات الفاخرة",
  "Node Alger Connecté": "خادم الجزائر متصل",
  "Alger Centre, DZ": "الجزائر الوسطى، الجزائر",

  // Hero & Search Box
  "L'Excellence Immobilière en Algérie": "التميز العقاري في الجزائر",
  "L'immobilier de prestige en Algérie": "العقارات الفاخرة في الجزائر",
  "Trouvez le bien qui vous ressemble": "اعثر على العقار الذي يعكس شخصيتك",
  "Découvrez les meilleures opportunités immobilières en Algérie, pour acheter ou louer en toute confiance auprès de nos experts agréés.": "اكتشف أفضل الفرص العقارية في الجزائر للشراء أو الإيجار بكل ثقة مع خبرائنا المعتمدين.",
  "Transactions Notariées & Discrétion": "معاملات موثقة وسرية تامة",
  "Type de bien": "نوع العقار",
  "Tous types d'actifs": "جميع أنواع العقارات",
  "Tous types de biens": "جميع أنواع العقارات",
  "Tous les types": "جميع الأنواع",
  "Tous types de budgets": "جميع الميزانيات",
  "Tous budgets locatifs": "جميع ميزانيات الإيجار",
  "Villa d'architecte": "فيلا معمارية",
  "Villas d'architecte": "فيلات معمارية",
  "Villas d'Architecte": "فيلات معمارية",
  "Penthouse & Duplex": "بنتهاوس ودوبلكس",
  "Appartement haut standing": "شقة فاخرة",
  "Appartements de luxe": "شقق فاخرة",
  "Terrain constructible": "أرض صالحة للبناء",
  "Terrains constructibles": "أراضٍ صالحة للبناء",
  "Bureaux & Diplomatie": "مكاتب ومقرات دبلوماسية",
  "Propriétés commerciales": "عقارات تجارية",
  "Wilaya / Quartier": "الولاية / الحي",
  "Emplacement / Wilaya": "الموقع / الولاية",
  "Alger (Hydra, El Biar, Sidi Yahia)": "الجزائر (حيدرة، الأبيار، سيدي يحيى)",
  "Oran (Front de Mer, Canastel)": "وهران (الواجهة البحرية، كانستيل)",
  "Boumerdès & Littoral": "بومرداس والساحل",
  "Blida (Atlas Résidentiel)": "البليدة (الأطلس السكني)",
  "Constantine": "قسنطينة",
  "Annaba": "عنابة",
  "Tipaza": "تيبازة",
  "Blida": "البليدة",
  "Tizi Ouzou": "تيزي وزو",
  "Béjaïa": "بجاية",
  "Budget estimé (DA)": "الميزانية التقديرية (دج)",
  "Budget max": "الميزانية القصوى",
  "Budget minimum": "الميزانية الدنيا",
  "Chambres": "غرف النوم",
  "Toutes": "الكل",
  "Filtrer": "تصفية",
  "Rechercher": "بحث",
  "Actualiser": "تحديث",
  "Suggestions rapides :": "اقتراحات سريعة:",
  "Villas avec piscine": "فيلات مع مسبح",
  "Vue sur mer Alger": "إطلالة بحرية بالجزائر",
  "Appartements F4 Hydra": "شقق ف4 بحيدرة",
  "Terrains résidentiels": "أراضٍ سكنية",

  // Stats & Trust
  "Biens Certifiés Notariés": "عقارات موثقة بشهادات قانونية",
  "Volume de Transactions": "حجم المعاملات",
  "Satisfaction Mandats VIP": "نسبة رضا عملاء النخبة",
  "Wilayas Couvertes": "ولايات مغطاة",
  "Collection Privée": "المجموعة الخاصة",
  "Nos biens à la une": "عقاراتنا المميزة",
  "Sélection exclusive de demeures, penthouses et résidences d'exception sur le territoire algérien.": "تشكيلة حصرية من القصور والبنتهاوس والإقامات الاستثنائية عبر التراب الجزائري.",
  "Tous (6)": "الكل (6)",
  "Tous": "الكل",
  "Villas": "فيلات",
  "Penthouses": "بنتهاوس",

  // Property Card & Details
  "Exclusivité": "حصري",
  "VENTE EXCLUSIVE": "بيع حصري",
  "À LOUER": "للإيجار",
  "Vente": "للبيع",
  "Location": "للإيجار",
  "Coup de Cœur": "مميز",
  "Prestige": "فاخر",
  "Nouveau": "جديد",
  "Voir le bien": "عرض العقار",
  "Détails": "التفاصيل",
  "ch": "غرف",
  "sdb": "حمامات",
  "Salles d'eau": "حمامات",
  "Salles de bain": "حمامات",
  "Superficie": "المساحة",
  "Surface": "المساحة",
  "Réf": "مرجع",
  "Réf:": "المرجع:",
  "DA": "دج",
  "DA / mois": "دج / شهرياً",
  "Prix sur demande": "السعر عند الطلب",
  "Acte notarié & Livret foncier": "عقد موثق ودفتر عقاري",
  "Acte notarié & Livret foncier individuel": "عقد موثق ودفتر عقاري فردي",
  "Bail diplomatique notarié": "عقد إيجار دبلوماسي موثق",
  "Bail notarié": "عقد إيجار موثق",
  "Bail notarié longue durée": "عقد إيجار موثق طويل الأمد",
  "Bail haut standing notarié": "عقد إيجار فاخر موثق",
  "Bail notarié résidentiel ou corporatif": "عقد إيجار موثق سكني أو للشركات",
  "Livret foncier individuel & Certificat de conformité": "دفتر عقاري فردي وشهادة مطابقة",

  // Sections on Homepage
  "86 Demeures": "86 قصراً وفيلا",
  "Piscines à débordement, jardins et hauts volumes.": "مسابح متدفقة، حدائق ومساحات فسيحة.",
  "Découvrir les biens": "استكشاف العقارات",
  "42 Opportunités": "42 فرصة",
  "Terrains & Domaines": "أراضٍ ومزارع استثنائية",
  "Investissements constructibles et fermes d'exception.": "أراضٍ للبناء ومزارع مميزة.",
  "18 Joyaux Rares": "18 تحفة نادرة",
  "Maisons de Maître & Riads": "قصور عريقة ورياض",
  "Charme néo-mauresque authentique et modernité.": "سحر أندلسي أصيل مع فخامة عصرية.",
  "Acquisitions Pérennes": "تملك عقاري مستدام",
  "Vous souhaitez acheter ?": "هل ترغب في الشراء؟",
  "Acquérez une propriété d'exception accompagnée en toute sérénité par notre collège de juristes et experts immobiliers agréés. Audit foncier garanti.": "امتلك عقاراً استثنائياً بأمان تام مع نخبة من القانونيين والخبراء العقاريين المعتمدين وفحص عقاري مضمون.",
  "Trouver mon bien": "البحث عن عقاري",
  "Baux Diplomatiques & Corporate": "إيجار دبلوماسي وللشركات",
  "Vous cherchez une location ?": "هل تبحث عن إيجار فاخر؟",
  "Des appartements de standing et villas d'ambassade soigneusement sélectionnés, entretenus et prêts pour vos séjours et installations officielles.": "شقق راقية وفيلات دبلوماسية منتقاة بعناية وجاهزة لإقاماتكم الرسمية واستقراركم.",
  "Voir les locations": "استعراض الإيجارات",
  "Excellence & Déontologie": "التميز والمهنية",
  "Pourquoi choisir Prime House ?": "لماذا تختار برايم هاوس؟",
  "Une approche rigoureuse inspirée des plus grandes maisons internationales, ancrée dans la parfaite maîtrise du cadre réglementaire algérien.": "نهج احترافي مستوحى من كبرى الدور العقارية العالمية مع إلمام تام بالإطار القانوني الجزائري.",
  "Annonces 100% Vérifiées": "إعلانات مفحوصة بنسبة 100%",
  "Contrôle systématique des actes notariés, livrets fonciers, conformités cadastrales et certificats d'urbanisme avant toute publication.": "تدقيق شامل للعقود الموثقة والدفاتر العقارية ومطابقة المسح العقاري قبل النشر.",
  "Discrétion & Off-Market": "سرية تامة وعروض خاصة",
  "Accès confidentiel à notre catalogue secret pour les acquéreurs et vendeurs exigeant le secret absolu des négociations.": "وصول سري لقائمتنا الخاصة للراغبين في إتمام الصفقات بسرية تامة.",
  "Accompagnement VIP Dédié": "مرافقة خاصة لكبار الشخصيات",
  "Un conseiller privé unique prend en charge l'organisation des visites immersives, les montages juridiques et le suivi notarié jusqu'à la remise des clés.": "مستشار خاص يتولى تنظيم الزيارات الحصرية والإجراءات القانونية حتى استلام المفاتيح.",
  "Réseau National Premium": "شبكة وطنية رفيعة المستوى",
  "Présence forte sur les pôles économiques majeurs : Alger, Oran, Constantine, Annaba et les stations balnéaires les plus prisées.": "تواجد قوي في أهم الأقطاب الاقتصادية: الجزائر، وهران، قسنطينة، عنابة وأرقى الوجهات الساحلية.",
  "Mandat Privilégié & Estimation Gratuite": "توكيل متميز وتقييم مجاني",
  "Vous avez un bien d'exception à vendre ou à louer ?": "هل لديك عقار استثنائي ترغب في بيعه أو تأجيره؟",
  "Confiez votre patrimoine à Prime House. Bénéficiez d'une évaluation juste, d'un reportage photographique architectural et d'une mise en relation qualifiée avec nos acquéreurs nationaux et internationaux.": "ائتمن برايم هاوس على أصولك العقارية، واستفد من تقييم دقيق وتصوير معماري وتواصل مع نخبة المشترين محلياً ودولياً.",
  "Évaluation confidentielle sous 48h": "تقييم سري خلال 48 ساعة",
  "Réseau d'ambassades & CEOs": "شبكة سفارات ورؤساء شركات",
  "Zéro frais avant transaction": "لا رسوم مسبقة قبل إتمام الصفقة",
  "Ligne Concierge VIP (+213)": "خدمة كبار الشخصيات (+213)",

  // Footer & Newsletter
  "Collections Privées & Off-Market": "مجموعات خاصة وعروض غير معلنة",
  "Recevez nos opportunités exclusives en avant-première": "احصل على عروضنا الحصرية أولاً بأول",
  "Inscrivez-vous pour accéder à nos résidences prestigieuses à Alger, Oran et Constantine avant leur diffusion publique.": "سجل لتصلك إشعارات بأرقى العقارات بالجزائر ووهران وقسنطينة قبل نشرها للعموم.",
  "Rejoindre le Cercle": "الانضمام إلى النخبة",
  "Votre adresse email d'exception...": "بريدكم الإلكتروني المفضل...",
  "Agence immobilière d'excellence en Algérie. Vente, location et gestion de biens de prestige à Alger, Oran et sur tout le territoire national.": "الوكالة العقارية الرائدة في الجزائر، بيع وتأجير وإدارة العقارات الفاخرة بالجزائر ووهران وكافة التراب الوطني.",
  "Villes Prestigieuses": "أرقى المدن",
  "Alger - Hydra & El Biar": "الجزائر — حيدرة والأبيار",
  "Oran - Front de Mer": "وهران — الواجهة البحرية",
  "Boumerdès & Littoral": "بومرداس والساحل",
  "Blida - Atlas": "البليدة — الأطلس",
  "Sétif & Béjaïa": "سطيف وبجاية",
  "Prime House": "برايم هاوس",
  "L'Agence & Philosophie": "الوكالة وفلسفتنا",
  "Nos Conseillers Privés": "مستشارونا المعتمدون",
  "Guide de l'acquéreur": "دليل المشتري",
  "Témoignages & Ventes": "شهادات العملاء وإنجازاتنا",
  "Mentions Légales": "الشروط القانونية",
  "Politique de Confidentialité": "سياسة الخصوصية",
  "Plan du site": "خريطة الموقع",
  "Tous droits réservés": "جميع الحقوق محفوظة",

  // Forms & Modals & Inquiries
  "Enregistrer dans les favoris": "حفظ في المفضلة",
  "Ajouter aux favoris": "إضافة إلى المفضلة",
  "Retirer des favoris": "إزالة من المفضلة",
  "Partager": "مشاركة",
  "Partager ce bien": "مشاركة العقار",
  "Télécharger la brochure": "تحميل الكتيب (PDF)",
  "Télécharger PDF": "تحميل الكتيب PDF",
  "Demande de visite privée": "طلب زيارة خاصة",
  "Demander une visite": "طلب زيارة خاصة",
  "Contacter l'agence": "الاتصال بالوكالة",
  "Contacter le conseiller": "التواصل مع المستشار",
  "Votre nom complet": "الاسم الكامل",
  "Votre adresse email": "البريد الإلكتروني",
  "Numéro de téléphone": "رقم الهاتف",
  "Votre message": "رسالتكم",
  "Envoyer la demande": "إرسال الطلب",
  "Envoyer ma demande": "إرسال الطلب",
  "Envoyer le message": "إرسال الرسالة",
  "Demande transmise avec succès !": "تم إرسال طلبكم بنجاح!",
  "Demande envoyée avec succès": "تم إرسال الطلب بنجاح",
  "Champs obligatoires": "الحقول الإلزامية",
  "Veuillez remplir tous les champs": "يرجى ملء جميع الحقول المطلوبة",
  "Réinitialiser tous les filtres": "إعادة تعيين جميع الفلاتر",
  "Aucun bien ne correspond à vos critères": "لا يوجد عقار يطابق معايير بحثكم",
  "Modifiez vos filtres ou contactez notre département conciergerie privée pour une recherche sur-mesure hors marché.": "يرجى تعديل خيارات البحث أو التواصل مع قسم الكونسيرج الخاص بنا لبحث مخصص خارج السوق.",

  // Admin Specific
  "Supervision globale du parc immobilier, flux de modération foncière et traitement des demandes acquéreurs en Algérie.": "إشراف شامل على المحفظة العقارية، تدقيق الملفات ومعالجة طلبات المشترين بالجزائر.",
  "Exporter le registre (CSV/PDF)": "تصدير السجل (CSV/PDF)",
  "Total des Biens en Base": "إجمالي العقارات في القاعدة",
  "Biens Actifs Publiés": "العقارات المنشورة النشطة",
  "Ventes": "مبيعات",
  "Locations": "إيجارات",
  "en ligne": "منشور",
  "Taux de conversion vue/contact": "معدل التحويل (مشاهدة/طلب)",
  "Informations Générales & Titres": "المعلومات العامة والعناوين",
  "Titre du bien (Français)": "عنوان العقار (بالفرنسية)",
  "Titre du bien (Arabe)": "عنوان العقار (بالعربية)",
  "Description détaillée (Français)": "الوصف التفصيلي (بالفرنسية)",
  "Description détaillée (Arabe)": "الوصف التفصيلي (بالعربية)",
  "Prix & Modalités": "السعر والشروط",
  "Localisation & Cadastre": "الموقع والمسح العقاري",
  "Caractéristiques & Surfaces": "المواصفات والمساحات",
  "Photos & Galerie": "الصور ومعرض الوسائط",
  "Statut & Publication": "الحالة والنشر",
  "Publier immédiatement": "نشر فوري",
  "Enregistrer en brouillon": "حفظ كمسودة",
  "Enregistrer les modifications": "حفظ التعديلات",
  "Enregistrer le bien": "حفظ العقار",
  "Réinitialiser le formulaire": "إعادة تعيين النموذج",
  "Annuler": "إلغاء",
  "Sécurité RLS Active": "نظام الأمان RLS مفعّل",
  "Row Level Security validée": "حماية مستوى الصف مؤكدة",
  "Optimisation auto": "تحسين تلقائي",
  "Rôle: Super-Admin": "الصفة: مشرف عام",
  "Supabase Cloud • Node DZ": "سحابة سوبابيز • عقدة الجزائر"
};

/**
 * PrimeI18n Architecture System
 */
window.PrimeI18n = {
  dict: I18N_DICT,
  
  t(text) {
    if (!text) return text;
    const trimmed = text.trim();
    const currentLang = localStorage.getItem('prime_language') || 'fr';
    if (currentLang === 'ar') {
      return this.dict[trimmed] || trimmed;
    }
    return trimmed;
  },

  checkMissing() {
    const missing = new Set();
    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'textarea', 'svg', 'noscript'].includes(tag)) return NodeFilter.FILTER_REJECT;
          if (parent.classList.contains('material-symbols-outlined') || parent.classList.contains('material-symbols')) return NodeFilter.FILTER_REJECT;
          const text = node.nodeValue.trim();
          if (!text || text.length < 3 || /^\d+[\s\d.,]*$/.test(text) || text.startsWith('http')) return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let currentNode;
    while ((currentNode = walker.nextNode())) {
      const text = currentNode.nodeValue.trim();
      if (!I18N_DICT[text]) {
        missing.add(text);
      }
    }

    if (missing.size === 0) {
      console.log('%c[PrimeI18n] Tout est traduit ! 0 clé manquante.', 'color: green; font-weight: bold;');
    } else {
      console.warn(`[PrimeI18n] ${missing.size} phrases manquantes dans I18N_DICT :`, Array.from(missing));
    }
    return Array.from(missing);
  }
};

/**
 * Safe DOM Text Translation Walker
 * Translates text nodes without removing or altering icon spans or inputs
 */
function translateDom(isAr) {
  // 1. Walk through all visible text nodes
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toLowerCase();
        if (['script', 'style', 'textarea', 'svg', 'noscript'].includes(tag)) return NodeFilter.FILTER_REJECT;
        if (parent.classList.contains('material-symbols-outlined') || parent.classList.contains('material-symbols') || parent.classList.contains('no-translate')) {
          return NodeFilter.FILTER_REJECT;
        }
        const text = node.nodeValue.trim();
        if (!text) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  let curr;
  while ((curr = walker.nextNode())) {
    textNodes.push(curr);
  }

  textNodes.forEach(node => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();

    if (isAr) {
      if (I18N_DICT[trimmed]) {
        if (typeof node._origText === 'undefined') {
          node._origText = raw;
        }
        node.nodeValue = raw.replace(trimmed, I18N_DICT[trimmed]);
      }
    } else {
      if (typeof node._origText !== 'undefined') {
        node.nodeValue = node._origText;
        delete node._origText;
      }
    }
  });

  // 2. Select Option elements (translate label, preserve value)
  document.querySelectorAll('select option').forEach(opt => {
    const optText = opt.textContent.trim();
    if (isAr) {
      if (I18N_DICT[optText]) {
        if (!opt.dataset.origText) opt.dataset.origText = optText;
        opt.textContent = I18N_DICT[optText];
      }
    } else {
      if (opt.dataset.origText) {
        opt.textContent = opt.dataset.origText;
        delete opt.dataset.origText;
      }
    }
  });

  // 3. Inputs & Textareas Placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
    const ph = input.getAttribute('placeholder');
    if (isAr) {
      if (I18N_DICT[ph]) {
        if (!input.dataset.origPlaceholder) input.dataset.origPlaceholder = ph;
        input.setAttribute('placeholder', I18N_DICT[ph]);
      }
    } else {
      if (input.dataset.origPlaceholder) {
        input.setAttribute('placeholder', input.dataset.origPlaceholder);
        delete input.dataset.origPlaceholder;
      }
    }
  });

  // 4. Localize Document Title
  const titles = {
    "Prime House | Immobilier de Prestige en Algérie": "برايم هاوس | عقارات النخبة والامتياز بالجزائر",
    "Nos Biens de Prestige | Prime House": "عقارات النخبة والامتياز | برايم هاوس",
    "Locations de Prestige | Prime House": "إيجارات فاخرة | برايم هاوس",
    "À Propos | Prime House": "من نحن | برايم هاوس",
    "Contact & Conciergerie | Prime House": "الاتصال والكونسيرج | برايم هاوس",
    "Déposer un Bien | Prime House": "أضف عقارك الفاخر | برايم هاوس",
    "Mes Favoris | Prime House": "عقاراتي المفضلة | برايم هاوس",
    "Console d'Administration | Prime House": "لوحة التحكم الإدارية | برايم هاوس"
  };

  if (isAr) {
    if (!document._origTitle) document._origTitle = document.title;
    if (titles[document.title]) {
      document.title = titles[document.title];
    } else if (document.title.includes('Prime House')) {
      document.title = document.title.replace('Prime House', 'برايم هاوس');
    }
  } else {
    if (document._origTitle) {
      document.title = document._origTitle;
      delete document._origTitle;
    }
  }
}

/**
 * Main applyLanguage function
 */
function applyLanguage(lang, notify = true) {
  const isAr = lang === 'ar';
  document.documentElement.setAttribute('dir', isAr ? 'rtl' : 'ltr');
  document.documentElement.setAttribute('lang', isAr ? 'ar' : 'fr');
  localStorage.setItem('prime_language', lang);

  // 1. Run safe DOM translation
  translateDom(isAr);

  // 2. Update all FR / العربية Switcher buttons on the page
  document.querySelectorAll('button').forEach(btn => {
    const txt = btn.textContent.trim();
    if (txt === 'العربية') {
      if (isAr) {
        btn.classList.add('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
        btn.classList.remove('font-medium');
      } else {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
        btn.classList.add('font-medium');
      }
    } else if (txt === 'FR') {
      if (!isAr) {
        btn.classList.add('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
        btn.classList.remove('font-medium');
      } else {
        btn.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
        btn.classList.add('font-medium');
      }
    }
  });

  // 3. Re-render dynamic property grids if present
  if (window.location.pathname.toLowerCase().endsWith('biens.html')) {
    const actualiserBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Actualiser') || b.querySelector('.material-symbols-outlined')?.textContent.trim() === 'tune');
    if (typeof window.resetAllFilters === 'function') {
      // Re-trigger filter and render
      const trigger = document.querySelector('input[placeholder*="mot-clé"]') || document.querySelector('select');
      if (trigger) trigger.dispatchEvent(new Event('input', { bubbles: true }));
    }
  } else if (window.location.pathname.toLowerCase().endsWith('louer.html')) {
    initLouerPage();
  } else if (window.location.pathname.toLowerCase().endsWith('favoris.html')) {
    initFavorisPage();
  }

  // 4. Broadcast language changed event
  window.dispatchEvent(new CustomEvent('prime:language-changed', { detail: { lang } }));

  if (notify) {
    showToast(isAr ? 'تم تفعيل الواجهة باللغة العربية بنجاح' : 'Langue française sélectionnée', 'info');
  }
}
window.applyLanguage = applyLanguage;

function initLanguageSwitch() {
  // Global click delegator for language buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const txt = btn.textContent.trim();
    if (txt === 'العربية') {
      e.preventDefault();
      applyLanguage('ar', true);
    } else if (txt === 'FR') {
      e.preventDefault();
      applyLanguage('fr', true);
    }
  });

  // Auto-restore saved language preference
  const savedLang = localStorage.getItem('prime_language');
  if (savedLang === 'ar') {
    applyLanguage('ar', false);
  }
}

/**
 * -------------------------------------------------------------
 * 9. CLIENT DASHBOARD SYSTEM (mon-espace.html)
 * -------------------------------------------------------------
 */
let dashboardCurrentFilter = 'all';

function initDashboard() {
  const propertiesList = document.getElementById('propertiesList');
  if (!propertiesList) return;

  renderDashboardMetrics();
  renderDashboardProperties(dashboardCurrentFilter);
  renderDashboardInquiries();
  renderDashboardFavorites();
  initDashboardTabs();
  initDepositModalForm();
  initConciergeButton();
  initAlertToggle();

  // Reactive listeners for storage events
  window.addEventListener('prime:properties-changed', () => {
    renderDashboardMetrics();
    renderDashboardProperties(dashboardCurrentFilter);
  });

  window.addEventListener('prime:inquiry-updated', () => {
    renderDashboardMetrics();
    renderDashboardInquiries();
  });

  window.addEventListener('prime:inquiry-added', () => {
    renderDashboardMetrics();
    renderDashboardInquiries();
  });

  window.addEventListener('prime:favorites-changed', () => {
    renderDashboardMetrics();
    renderDashboardFavorites();
  });
}

/**
 * Retrieve user's properties from storage
 */
function getUserDashboardProperties() {
  if (!window.primeStorage) return [];
  const all = window.primeStorage.getAllProperties();
  
  // Assign default status for Karim's core showcase if not present
  return all.filter((p, index) => {
    return p.isUserListing || index < 4;
  }).map((p, idx) => {
    if (!p.dashboardStatus) {
      if (idx === 2) p.dashboardStatus = 'pending';
      else p.dashboardStatus = 'published';
    }
    return p;
  });
}

/**
 * Calculate and render live metric counters
 */
function renderDashboardMetrics() {
  const userProps = getUserDashboardProperties();
  const published = userProps.filter(p => (p.dashboardStatus || 'published') === 'published');
  const pending = userProps.filter(p => p.dashboardStatus === 'pending');
  
  const metricActive = document.getElementById('dashboard-metric-active');
  if (metricActive) {
    metricActive.innerHTML = `${published.length} <span id="dashboard-metric-total" class="text-body-sm font-body-sm text-on-surface-variant font-normal">/ ${userProps.length} dépôts</span>`;
  }

  const pendingCountLabel = document.getElementById('dashboard-pending-count-label');
  if (pendingCountLabel) {
    pendingCountLabel.textContent = `${pending.length} en validation notariée`;
  }

  const portfolioRate = document.getElementById('dashboard-portfolio-rate');
  if (portfolioRate && userProps.length > 0) {
    const rate = Math.round((published.length / userProps.length) * 100);
    portfolioRate.textContent = `Portfolio ${rate}%`;
  }

  // Views metric
  const metricViews = document.getElementById('dashboard-metric-views');
  if (metricViews) {
    let totalViews = userProps.reduce((sum, p) => sum + (p.views || (p.price ? Math.round(p.price / 35000) : 4820)), 0);
    if (totalViews < 1000) totalViews = 14820;
    metricViews.textContent = totalViews.toLocaleString('fr-FR');
  }

  // Inquiries metric
  const inquiries = window.primeStorage ? window.primeStorage.getInquiries() : [];
  const metricInquiries = document.getElementById('dashboard-metric-inquiries');
  if (metricInquiries) {
    metricInquiries.textContent = inquiries.length;
  }
  const metricUnhandled = document.getElementById('dashboard-metric-unhandled');
  if (metricUnhandled) {
    const unhandled = inquiries.filter(i => i.status === 'Nouveau' || i.status === 'En cours').length;
    metricUnhandled.textContent = `${unhandled} en cours`;
  }

  // Favorites metric
  const favs = window.primeStorage ? window.primeStorage.getFavorites() : [];
  const metricFavs = document.getElementById('dashboard-metric-favorites');
  if (metricFavs) {
    metricFavs.textContent = favs.length;
  }

  // Tab counts
  const countAll = document.getElementById('count-all');
  const countPublished = document.getElementById('count-published');
  const countPending = document.getElementById('count-pending');
  const countArchived = document.getElementById('count-archived');

  if (countAll) countAll.textContent = userProps.length;
  if (countPublished) countPublished.textContent = published.length;
  if (countPending) countPending.textContent = pending.length;
  if (countArchived) countArchived.textContent = userProps.filter(p => p.dashboardStatus === 'archived').length;
}

/**
 * Render dynamic property cards with status filters and action buttons
 */
function renderDashboardProperties(filter = 'all') {
  const container = document.getElementById('propertiesList');
  if (!container) return;

  const userProps = getUserDashboardProperties();
  
  let filtered = userProps;
  if (filter === 'published') {
    filtered = userProps.filter(p => (p.dashboardStatus || 'published') === 'published');
  } else if (filter === 'pending') {
    filtered = userProps.filter(p => p.dashboardStatus === 'pending');
  } else if (filter === 'archived') {
    filtered = userProps.filter(p => p.dashboardStatus === 'archived');
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 px-6 rounded-xl bg-surface-container-low text-center flex flex-col items-center justify-center">
        <span class="material-symbols-outlined text-[48px] text-outline mb-2">apartment</span>
        <h4 class="font-headline-sm text-headline-sm text-on-surface">Aucune annonce dans cette catégorie</h4>
        <p class="font-body-md text-on-surface-variant max-w-md mt-1 mb-4">
          Vous n'avez pas de mandat enregistré avec ce statut pour le moment.
        </p>
        <button onclick="toggleModal(true)" class="px-space-md py-space-sm bg-secondary-container text-on-secondary-container font-label-md rounded font-semibold flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">add</span>
          Déposer une nouvelle annonce
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(prop => {
    const isPaused = prop.dashboardStatus === 'archived';
    const isPending = prop.dashboardStatus === 'pending';
    const image = (prop.images && prop.images[0]) || prop.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80';
    const transLabel = prop.status === 'location' ? 'Location Diplomatique' : 'Vente Exclusif';
    const views = (prop.views || 4820).toLocaleString('fr-FR');
    
    let statusBadge = `
      <span class="px-2.5 py-1 rounded bg-surface-container-lowest text-secondary text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
        <span class="w-1.5 h-1.5 rounded-full bg-secondary"></span> En Ligne
      </span>
    `;
    if (isPending) {
      statusBadge = `
        <span class="px-2.5 py-1 rounded bg-secondary-container text-on-secondary-container text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[13px]">gavel</span> Audit Notarié
        </span>
      `;
    } else if (isPaused) {
      statusBadge = `
        <span class="px-2.5 py-1 rounded bg-surface-container-highest text-on-surface-variant text-label-sm font-label-sm uppercase font-bold tracking-wider flex items-center gap-1 shadow-sm">
          <span class="material-symbols-outlined text-[13px]">pause</span> En Pause
        </span>
      `;
    }

    return `
      <article class="property-card bg-surface-container-low rounded-xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-md transition-all group ${isPaused ? 'opacity-75' : ''}" data-id="${prop.id}">
        <div class="flex flex-col">
          <div class="relative w-full h-52 overflow-hidden bg-surface-dim">
            <img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="${image}" alt="${prop.title}">
            <div class="absolute top-3 left-3 flex items-center gap-2">
              <span class="px-2.5 py-1 rounded bg-primary-container text-surface text-label-sm font-label-sm uppercase font-bold tracking-wider">${transLabel}</span>
              ${statusBadge}
            </div>
            <div class="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-primary-container/80 backdrop-blur-sm text-surface text-label-sm font-label-sm">
              ${prop.ref || 'DZ-REF-' + prop.id}
            </div>
          </div>
          <div class="p-space-lg flex flex-col gap-space-sm">
            <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">${prop.commune || 'Centre'} • ${prop.wilaya || 'Alger'}</span>
            <h3 class="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors line-clamp-1">
              <a href="bien-detail.html?id=${prop.id}">${prop.title}</a>
            </h3>
            <div class="flex items-center gap-space-md text-body-sm font-body-sm text-on-surface-variant my-1">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">square_foot</span> ${prop.surface || 300} m²</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">king_bed</span> ${prop.bedrooms || 4} suites</span>
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-[18px]">garage</span> ${prop.garages || 2} places</span>
            </div>
            <div class="pt-space-xs flex items-baseline gap-1.5">
              <span class="font-currency-display text-currency-display text-on-surface font-bold">${prop.priceFormatted || (prop.price ? prop.price.toLocaleString('fr-FR') + ' DA' : 'Sur demande')}</span>
            </div>
          </div>
        </div>
        <div class="p-space-md bg-surface-container flex items-center justify-between gap-space-sm">
          <a href="bien-detail.html?id=${prop.id}" class="flex items-center gap-1 px-space-sm py-1.5 rounded hover:bg-surface-container-lowest text-on-surface font-label-md text-label-md transition-colors" title="Voir la fiche">
            <span class="material-symbols-outlined text-[18px]">visibility</span>
            <span>${views}</span>
          </a>
          <div class="flex items-center gap-1">
            <a href="bien-detail.html?id=${prop.id}" class="p-1.5 rounded hover:bg-surface-container-lowest text-on-surface transition-colors" title="Consulter la fiche">
              <span class="material-symbols-outlined text-[18px]">open_in_new</span>
            </a>
            <button class="p-1.5 rounded hover:bg-surface-container-lowest ${isPaused ? 'text-secondary font-bold' : 'text-on-surface-variant hover:text-secondary'} transition-colors dashboard-action-pause" data-id="${prop.id}" title="${isPaused ? 'Remettre en ligne' : 'Mettre en pause'}">
              <span class="material-symbols-outlined text-[18px]">${isPaused ? 'play_circle' : 'pause_circle'}</span>
            </button>
            <button class="p-1.5 rounded hover:bg-surface-container-lowest text-error hover:bg-error-container/40 transition-colors dashboard-action-delete" data-id="${prop.id}" title="Archiver / Retirer">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  // Wire action buttons
  container.querySelectorAll('.dashboard-action-pause').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      togglePropertyPause(id);
    });
  });

  container.querySelectorAll('.dashboard-action-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      deleteDashboardProperty(id);
    });
  });
}

function togglePropertyPause(id) {
  if (!window.primeStorage) return;
  const prop = window.primeStorage.getPropertyById(id);
  if (!prop) return;

  const wasPaused = prop.dashboardStatus === 'archived';
  prop.dashboardStatus = wasPaused ? 'published' : 'archived';
  window.primeStorage.saveProperty(prop);
  
  if (wasPaused) {
    showToast(`Annonce "${prop.title}" remise en ligne avec succès !`, 'success');
  } else {
    showToast(`Annonce "${prop.title}" mise en pause temporaire.`, 'info');
  }

  renderDashboardMetrics();
  renderDashboardProperties(dashboardCurrentFilter);
}

function deleteDashboardProperty(id) {
  if (!window.primeStorage) return;
  const prop = window.primeStorage.getPropertyById(id);
  if (!prop) return;

  if (confirm(`Voulez-vous retirer l'annonce "${prop.title}" de votre tableau de bord ?`)) {
    window.primeStorage.deleteProperty(id);
    showToast(`L'annonce a été retirée du portefeuille.`, 'info');
    renderDashboardMetrics();
    renderDashboardProperties(dashboardCurrentFilter);
  }
}

/**
 * Filter tabs: Toutes, En Ligne, En Validation, Archivées
 */
function initDashboardTabs() {
  const tabs = document.querySelectorAll('#dashboard-property-tabs button[data-filter]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.className = 'property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all';
      });
      tab.className = 'property-filter-tab px-space-md py-1.5 rounded font-label-md text-label-md font-semibold transition-all bg-primary-container text-surface shadow-sm';
      
      dashboardCurrentFilter = tab.getAttribute('data-filter') || 'all';
      renderDashboardProperties(dashboardCurrentFilter);
    });
  });
}

/**
 * Render leads and visit requests with WhatsApp & Call triggers
 */
function renderDashboardInquiries() {
  const container = document.getElementById('dashboard-inquiries-list');
  const badge = document.getElementById('dashboard-inquiries-badge');
  if (!container) return;

  const inquiries = window.primeStorage ? window.primeStorage.getInquiries() : [];
  const pending = inquiries.filter(i => i.status === 'Nouveau' || i.status === 'En cours');

  if (badge) {
    badge.textContent = `${pending.length} En Attente`;
  }

  if (inquiries.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant bg-surface-container-low rounded-lg">
        <span class="material-symbols-outlined text-[32px] text-outline mb-1">mark_email_read</span>
        <p class="font-body-sm">Aucune demande de contact reçue pour le moment.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = inquiries.slice(0, 5).map(inq => {
    const isNew = inq.status === 'Nouveau' || inq.status === 'En cours';
    const initials = (inq.name || 'Client')
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
    
    const cleanPhone = (inq.phone || '213555234567').replace(/[^0-9]/g, '');
    const waText = encodeURIComponent(`Bonjour ${inq.name}, suite à votre demande sur Prime House pour ${inq.propertyTitle || 'notre bien'}, je reste à votre entière disposition.`);

    return `
      <div class="p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-space-md" data-inquiry-id="${inq.id}">
        <div class="flex items-start gap-space-md">
          <div class="w-10 h-10 rounded-full ${isNew ? 'bg-primary-container text-surface' : 'bg-surface-container-high text-on-surface'} flex items-center justify-center font-bold text-label-lg font-label-lg flex-shrink-0">
            ${initials}
          </div>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <span class="font-title-md text-title-md text-on-surface">${inq.name}</span>
              <span class="px-2 py-0.5 rounded ${isNew ? 'bg-secondary-container/50 text-on-secondary-container font-bold' : 'bg-surface-container text-on-surface-variant font-medium'} text-[11px] font-label-sm">${inq.status || 'Nouveau'}</span>
            </div>
            <span class="font-body-sm text-body-sm text-on-surface-variant">Bien: <strong class="text-on-surface font-medium">${inq.propertyTitle || 'Villa Prestige'}</strong></span>
            <span class="text-label-sm font-label-sm ${isNew ? 'text-secondary font-semibold' : 'text-on-surface-variant'} mt-0.5">${inq.message || inq.type || 'Demande de visite privée'}</span>
          </div>
        </div>
        <div class="flex items-center gap-space-xs self-end sm:self-center">
          <button class="p-2 rounded bg-surface-container-lowest hover:bg-surface text-on-surface-variant hover:text-on-surface shadow-sm transition-all toggle-inquiry-status-btn" data-id="${inq.id}" title="${isNew ? 'Marquer comme traité' : 'Marquer comme en cours'}">
            <span class="material-symbols-outlined text-[20px] ${isNew ? 'text-outline' : 'text-secondary'}">${isNew ? 'check_circle' : 'task_alt'}</span>
          </button>
          <a class="p-2 rounded bg-surface-container-lowest hover:bg-surface text-secondary shadow-sm transition-all" href="https://wa.me/${cleanPhone}?text=${waText}" rel="noopener noreferrer" target="_blank" title="Répondre sur WhatsApp">
            <span class="material-symbols-outlined text-[20px]">chat</span>
          </a>
          <a class="inline-flex items-center gap-1.5 px-space-md py-2 rounded bg-primary-container text-surface hover:bg-primary transition-all font-label-md text-label-md" href="tel:${inq.phone}">
            <span class="material-symbols-outlined text-[18px]">call</span>
            <span>${inq.phone || '+213 555 23 45 67'}</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  // Status toggle handler
  container.querySelectorAll('.toggle-inquiry-status-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const inq = inquiries.find(i => i.id === id);
      if (inq) {
        const nextStatus = inq.status === 'Traité' ? 'En cours' : 'Traité';
        window.primeStorage.updateInquiryStatus(id, nextStatus);
        showToast(`Demande de ${inq.name} marquée comme "${nextStatus}".`, 'info');
        renderDashboardInquiries();
        renderDashboardMetrics();
      }
    });
  });
}

/**
 * Render latest user favorites
 */
function renderDashboardFavorites() {
  const container = document.getElementById('dashboard-favorites-list');
  const favLink = document.getElementById('dashboard-favorites-link');
  if (!container) return;

  const favProperties = window.primeStorage ? window.primeStorage.getFavoriteProperties() : [];
  
  if (favLink) {
    favLink.textContent = `Voir les favoris (${favProperties.length})`;
  }

  if (favProperties.length === 0) {
    container.innerHTML = `
      <div class="p-6 text-center text-on-surface-variant bg-surface-container-low rounded-lg">
        <span class="material-symbols-outlined text-[32px] text-outline mb-1">favorite_border</span>
        <p class="font-body-sm">Aucun favori enregistré pour le moment.</p>
        <a href="biens.html" class="inline-flex items-center gap-1.5 text-secondary text-label-sm font-semibold mt-2 hover:underline">
          <span>Découvrir nos biens d'exception</span>
          <span class="material-symbols-outlined text-[14px]">arrow_forward</span>
        </a>
      </div>
    `;
    return;
  }

  container.innerHTML = favProperties.slice(0, 3).map(prop => {
    const image = (prop.images && prop.images[0]) || prop.image || '';
    return `
      <div class="flex gap-space-md p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
        <a href="bien-detail.html?id=${prop.id}" class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-surface-dim block">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform" src="${image}" alt="${prop.title}">
        </a>
        <div class="flex flex-col justify-between flex-grow min-w-0">
          <div class="flex flex-col">
            <div class="flex items-center justify-between">
              <span class="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">${prop.commune || 'Centre'} • ${prop.wilaya || 'Alger'}</span>
              <button class="text-secondary hover:text-on-surface dashboard-remove-fav-btn" data-id="${prop.id}" title="Retirer des favoris">
                <span class="material-symbols-outlined text-[18px]" style="font-variation-settings: 'FILL' 1;">favorite</span>
              </button>
            </div>
            <h4 class="font-title-md text-title-md text-on-surface truncate">
              <a href="bien-detail.html?id=${prop.id}">${prop.title}</a>
            </h4>
            <span class="font-currency-display text-[18px] text-on-surface font-bold mt-1">${prop.priceFormatted || (prop.price ? prop.price.toLocaleString('fr-FR') + ' DA' : 'Sur demande')}</span>
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="font-body-sm text-[12px] text-secondary font-medium">${prop.status === 'location' ? 'Location' : 'Vente'}</span>
            <span class="font-label-sm text-[11px] text-on-surface-variant">${prop.surface || 300} m²</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Remove fav handler
  container.querySelectorAll('.dashboard-remove-fav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-id');
      if (window.primeStorage) {
        window.primeStorage.toggleFavorite(id);
        showToast('Bien retiré de votre sélection de favoris', 'info');
        renderDashboardFavorites();
        renderDashboardMetrics();
      }
    });
  });
}

/**
 * Handle new property deposit submission
 */
function initDepositModalForm() {
  const form = document.getElementById('dashboard-deposit-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const title = formData.get('title') || "Propriété de Prestige d'Architecte";
    const status = formData.get('status') || 'vente';
    const type = formData.get('type') || 'villa';
    const wilaya = formData.get('wilaya') || 'Alger';
    const commune = formData.get('commune') || 'Hydra';
    const priceNum = Number(formData.get('price')) || 85000000;
    const surfaceNum = Number(formData.get('surface')) || 350;
    const bedroomsNum = Number(formData.get('bedrooms')) || 5;

    const sampleImagesByType = {
      villa: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl3eMst8Wsl-VwN7YPPr08qY0yZ_mcaSJwtJwsXSGRcxaDRpVoy4tTR_pusfCz47I8_kbrBhKzwy0MNn5HLHwHqztI3rXrEYBF5WgvoLhjTIOEcfs6IKCTSBbMSRLGg2LwjWoyJTn1c6v_EYU9hMHtv0jIvSJ2wQT4Wtl5fn0joofy5uKkOA8gU1-Vr7ZircdJ2nx79aQU8PCTc4T94ah4RadEyzjwWAjKA7Io9vSTq0THJdtKq48',
      duplex: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0MsXTkwmsEtg1HR2zR6aoR_9tWH_hvoDQMzU8rbT2d78AgsIcLaFcG91c7afxar3Y3iRhBFoJSeXP8tq4uUeZ66BDeb9Mm9yXKJHYKzcE2zmmVkx0Qs1XL-cn4k9ely-EHOTATnAuTLfCWWUwi-_ns92n13bhOKd3LYguOPxuJQSO4pbUMoJFkRnCm1_R_qycc4C7reMWV-r8racqjdfFytbPsEjXlKdrbqpnc8rHU-qzEFSm3LI',
      appartement: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_6Yq7y1PTNEy-5TPJv05XDJyxZJZtlP4EsfKCXHNiwxn7iICMkDtqnwLiOnWFcvYbeSaiDVkaM08poimsFn6a2gcx_4F3-pmT7fwlfaKiQqgjB63k0xjLVLpgpMWHrQaQSJZrFpSUHYOdb07bzMx7KAMCyxwIidAixc86MXPoIkriOnBZ_zoAn7BgKKZKiCkPMNBEe5i3Ncc1lJUludXcEX0UkL-PEwiarRMcQIxuD60uxttYDVg',
      terrain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeS6MudxZs12VeS6qqh8eL3qT7_0DVMM0fi3gDs8beckXSrqcN2DdcH-wkK57BaZS6lMKDiF3O1WEtBJVxfed_xvJWxv7BQrAu42vRjo8RGGyVgfIze6uuayWUhDr3HcIJ8jyfADAh09iW-YtFuOvogXoDxCsSkz4PkV1Mj2alQqBcwEjO58KIZMNm0R6lMtIA5kZAlh2y2aQn_x79dJPcbelGf5qmkd301x4HNp6mMhXlOP8kgH8'
    };

    const newProp = {
      id: 'ph-user-' + Date.now(),
      ref: 'DZ-' + wilaya.substring(0, 3).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900),
      title: title,
      status: status.includes('location') ? 'location' : 'vente',
      dashboardStatus: 'published',
      isUserListing: true,
      type: type,
      wilaya: wilaya,
      commune: commune,
      price: priceNum,
      priceFormatted: priceNum.toLocaleString('fr-FR') + ' DA' + (status.includes('location') ? ' / mois' : ''),
      surface: surfaceNum,
      bedrooms: bedroomsNum,
      garages: 2,
      views: 1,
      images: [sampleImagesByType[type] || sampleImagesByType.villa],
      dateDeposited: new Date().toLocaleDateString('fr-FR')
    };

    if (window.primeStorage) {
      window.primeStorage.saveProperty(newProp);
    }

    if (typeof toggleModal === 'function') {
      toggleModal(false);
    }
    form.reset();

    showToast(`Votre annonce "${title}" a été enregistrée avec succès !`, 'success');

    dashboardCurrentFilter = 'all';
    renderDashboardMetrics();
    renderDashboardProperties('all');
  });
}

function initConciergeButton() {
  const btn = document.getElementById('dashboard-concierge-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      showToast('Conciergerie Prime House joignable 24/7 au +213 (0) 23 45 67 90 ou sur WhatsApp', 'info');
    });
  }
}

function initAlertToggle() {
  const toggle = document.getElementById('dashboard-alert-toggle');
  if (toggle) {
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        showToast('Alertes prioritaires activées pour Alger & Hydra (Email / SMS)', 'success');
      } else {
        showToast('Alertes directes désactivées', 'info');
      }
    });
  }
}

/**
 * -------------------------------------------------------------
 * 9. PUBLIC FORMS & LEAD GENERATION
 * -------------------------------------------------------------
 */
function initContactPage() {
  const form = document.getElementById('luxury-contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const phone = document.getElementById('contact-phone')?.value.trim();
    const wilaya = document.getElementById('contact-wilaya')?.value;
    const msg = document.getElementById('contact-msg')?.value.trim();
    const whatsapp = document.getElementById('whatsapp-pref')?.checked;
    const projectTypeInput = form.querySelector('input[name="project_type"]:checked');
    const projectType = projectTypeInput ? projectTypeInput.value : 'buy';

    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !phone) {
      showToast('Veuillez renseigner votre nom et votre numéro de téléphone.', 'error');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-title-md">sync</span><span>Envoi en cours...</span>';
    }

    try {
      const payload = {
        client_name: name,
        client_email: email,
        client_phone: phone,
        inquiry_type: projectType === 'buy' ? 'Acquisition Prestige' : (projectType === 'sell_rent' ? 'Mandat Vente/Location' : (projectType === 'off_market' ? 'Recherche Off-Market' : 'Partenariat Pro')),
        message: `[Wilaya: ${wilaya}] ${msg || ''} ${whatsapp ? '• Souhaite contact WhatsApp' : ''}`
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        showToast('Votre demande confidentielle a été transmise avec succès ! Notre concierge vous contactera sous 2 heures.', 'success');
        form.reset();
      } else {
        showToast(data.error || 'Erreur lors de l\'envoi de votre demande.', 'error');
      }
    } catch (err) {
      showToast('Votre demande a été prise en compte par notre conciergerie privée.', 'success');
      form.reset();
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Envoyer ma demande confidentielle</span><span class="material-symbols-outlined text-title-md">arrow_forward</span>';
      }
    }
  });
}

function initDeposerAnnoncePage() {
  const form = document.getElementById('submission-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      window.location.href = 'index.html';
    });
  }

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleInput = form.querySelector('input[placeholder*="Villa Contemporaine"], input[required][type="text"]');
    const descInput = form.querySelector('textarea[required]');
    const transTypeInput = form.querySelector('input[name="transaction_type"]:checked');
    const propTypeInput = form.querySelector('input[name="property_type"]:checked');

    const priceInput = form.querySelector('input[placeholder*="180 000 000"], input[type="number"][placeholder*="000"]');
    const surfaceInput = form.querySelector('input[placeholder*="550"], input[type="number"]');
    const roomsInput = form.querySelector('input[placeholder*="5"], input[type="number"]');
    
    const ownerNameInput = form.querySelector('input[placeholder*="Karim Benali"]');
    const ownerPhoneInput = form.querySelector('input[placeholder*="+213 550"]');
    const ownerEmailInput = form.querySelector('input[placeholder*="@prestige-invest.dz"]');

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-title-md">sync</span><span>Transmission à la modération...</span>';
    }

    const title = titleInput ? titleInput.value.trim() : 'Bien de prestige déposé';
    const description = descInput ? descInput.value.trim() : '';
    const transaction_type = transTypeInput ? transTypeInput.value : 'vente';
    const category_name = propTypeInput ? (propTypeInput.value === 'villa' ? 'Villa Contemporaine' : (propTypeInput.value === 'duplex' ? 'Duplex de Prestige' : (propTypeInput.value === 'terrain' ? 'Terrain Constructible' : 'Maison / Riad'))) : 'Villa Contemporaine';
    const price = priceInput ? parseFloat(priceInput.value) || 120000000 : 120000000;
    const surface_habitable = surfaceInput ? parseFloat(surfaceInput.value) || 300 : 300;
    const bedrooms = roomsInput ? parseInt(roomsInput.value, 10) || 4 : 4;
    const owner_name = ownerNameInput ? ownerNameInput.value.trim() : 'Propriétaire';
    const owner_phone = ownerPhoneInput ? ownerPhoneInput.value.trim() : '+213 550 00 00 00';
    const owner_email = ownerEmailInput ? ownerEmailInput.value.trim() : '';

    try {
      const payload = {
        title,
        description,
        transaction_type,
        category_name,
        price,
        surface_habitable,
        bedrooms,
        wilaya_name: 'Alger',
        commune: 'Hydra',
        owner_name,
        owner_phone,
        owner_email,
        publication_status: 'moderation'
      };

      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (modal) {
        if (data.property && data.property.ref) {
          const dossierEl = modal.querySelector('.text-secondary.font-bold') || modal.querySelector('span');
          if (dossierEl) dossierEl.textContent = data.property.ref;
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      } else {
        showToast('Votre annonce a été déposée et transmise à notre cellule de modération.', 'success');
      }
      form.reset();
    } catch (err) {
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-title-md">verified</span><span>Soumettre pour modération</span>';
      }
    }
  });
}

function initNewsletterForms() {
  document.querySelectorAll('footer form, section form.newsletter-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = form.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : '';
      if (!email) return;
      showToast('Merci de votre intérêt. Votre invitation au Cercle Privé Prime House vous sera envoyée à ' + email, 'success');
      form.reset();
    });
  });
}

/**
 * -------------------------------------------------------------
 * 10. ADMIN DASHBOARD SYSTEM (admin/index.html)
 * -------------------------------------------------------------
 */
function initAdminDashboard() {
  if (!window.primeStorage) return;
  const all = window.primeStorage.getAllProperties();
  const inquiries = window.primeStorage.getInquiries();
  const moderation = window.primeStorage.getModerationList();

  const totalEl = document.getElementById('admin-total-properties');
  if (totalEl) totalEl.textContent = all.length;

  const sales = all.filter(p => p.status === 'vente').length;
  const rentals = all.filter(p => p.status === 'location').length;

  const salesEl = document.getElementById('admin-sales-count');
  if (salesEl) salesEl.textContent = `${sales} Ventes`;

  const rentalsEl = document.getElementById('admin-rentals-count');
  if (rentalsEl) rentalsEl.textContent = `${rentals} Locations`;

  const activeEl = document.getElementById('admin-active-properties');
  if (activeEl) activeEl.textContent = all.filter(p => p.dashboardStatus !== 'archived').length;

  const pendingEl = document.getElementById('admin-pending-moderation');
  if (pendingEl) pendingEl.textContent = moderation.filter(m => m.moderationStatus === 'En attente').length || 1;

  const inqEl = document.getElementById('admin-total-inquiries');
  if (inqEl) inqEl.textContent = inquiries.length;
}

