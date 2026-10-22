/**
 * PRIME HOUSE - CORE ADMINISTRATIVE DASHBOARD CONTROLLER
 * Full management system for all admin pages:
 * 1. Tableau de bord
 * 2. Biens (Tous les biens)
 * 3. Ajouter / Éditer un bien
 * 4. Biens en modération
 * 5. Biens à la Une (Vitrine)
 * 6. Demandes & Visites
 * 7. Catégories & Wilayas
 * 8. Paramètres du site
 * 9. Connexion Privée Administrateur
 */

document.addEventListener('DOMContentLoaded', async () => {
  initAdminAuthCheck();
  highlightActiveAdminSidebar();
  initAdminHeaderUser();
  initGlobalModals();
  routeAdminPage();
});

// ==============================================================================
// 1. GLOBAL AUTH & HEADER SETUP
// ==============================================================================
function highlightActiveAdminSidebar() {
  const path = window.location.pathname.toLowerCase();
  let targetPath = 'dashboard';
  if (path.endsWith('biens.html')) targetPath = 'tous-les-biens';
  else if (path.endsWith('ajouter-bien.html')) targetPath = 'ajouter-un-bien';
  else if (path.endsWith('moderation.html')) targetPath = 'biens-en-moderation';
  else if (path.endsWith('vitrine.html')) targetPath = 'biens-a-la-une';
  else if (path.endsWith('demandes.html')) targetPath = 'demandes-et-visites';
  else if (path.endsWith('categories-wilayas.html')) targetPath = 'categories-et-wilayas';
  else if (path.endsWith('parametres.html')) targetPath = 'parametres-du-site';

  document.querySelectorAll('aside nav a[data-path]').forEach(link => {
    const isCurrent = link.getAttribute('data-path') === targetPath;
    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
      link.className = 'flex items-center justify-between px-3 py-2 rounded transition-all bg-surface-container-lowest/15 text-secondary-fixed font-bold shadow-sm';
      const icon = link.querySelector('.material-symbols-outlined');
      if (icon) icon.className = 'material-symbols-outlined text-[20px] text-secondary-fixed';
    } else {
      link.removeAttribute('aria-current');
      link.className = 'flex items-center justify-between px-3 py-2 rounded text-surface-container-highest hover:bg-surface-container-lowest/10 hover:text-on-surface-variant transition-all font-body-sm text-body-sm';
      const icon = link.querySelector('.material-symbols-outlined');
      if (icon && !icon.textContent.includes('chevron')) icon.className = 'material-symbols-outlined text-[20px] text-secondary';
    }
  });
}

async function initAdminAuthCheck() {
  const path = window.location.pathname.toLowerCase();
  const isLoginPage = path.endsWith('/login.html') || path.endsWith('/login');

  const urlParams = new URLSearchParams(window.location.search);
  const isServerRedirect = urlParams.has('redirect');

  if (isLoginPage) {
    if (isServerRedirect) {
      // Server rejected cookie or session expired, clear stale local storage
      localStorage.removeItem('prime_admin_user');
      localStorage.removeItem('prime_admin_token');
      if (window.primeApi) window.primeApi.currentUser = null;
      return;
    }
    const token = localStorage.getItem('prime_admin_token');
    if (token) {
      try {
        const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated && data.user && ['super_admin', 'admin', 'moderator'].includes(data.user.role)) {
            window.location.href = 'index.html';
            return;
          }
        }
        localStorage.removeItem('prime_admin_user');
        localStorage.removeItem('prime_admin_token');
        if (window.primeApi) window.primeApi.currentUser = null;
      } catch (e) {}
    }
  } else if (path.includes('/admin/')) {
    const user = window.primeApi.getCurrentUser();
    const token = localStorage.getItem('prime_admin_token');
    if (!user || !['super_admin', 'admin', 'moderator'].includes(user.role)) {
      window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
      return;
    }
    // Verify session asynchronously with server if real backend is active
    if (token && !token.startsWith('local_')) {
      try {
        const res = await fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } });
        if (!res.ok && res.status === 401) {
          localStorage.removeItem('prime_admin_user');
          localStorage.removeItem('prime_admin_token');
          if (window.primeApi) window.primeApi.currentUser = null;
          window.location.href = `login.html?redirect=${encodeURIComponent(window.location.pathname)}`;
        }
      } catch (e) {}
    }
  }
}

function initAdminHeaderUser() {
  const user = window.primeApi.getCurrentUser() || {
    full_name: 'Karim Benali',
    title: 'Directeur Exécutif',
    role: 'super_admin',
    matricule: 'ADM-DZ-01'
  };

  // Update header user name & role
  document.querySelectorAll('.admin-user-name, header .font-title-md').forEach(el => {
    if (el.textContent.includes('Karim') || el.classList.contains('admin-user-name')) {
      el.textContent = user.full_name;
    }
  });

  document.querySelectorAll('.admin-user-title, header .text-secondary').forEach(el => {
    if (el.textContent.includes('Directeur') || el.classList.contains('admin-user-title')) {
      el.textContent = user.title || 'Directeur Exécutif';
    }
  });

  // Update sidebar role pill
  document.querySelectorAll('aside .font-label-sm').forEach(el => {
    if (el.textContent.includes('Rôle:')) {
      const roleLabel = user.role === 'super_admin' ? 'Super-Admin' : (user.role === 'moderator' ? 'Modérateur' : 'Administrateur');
      el.textContent = `Rôle: ${roleLabel}`;
    }
  });

  // Hook logout button
  document.querySelectorAll('a[data-path="deconnexion"], a[href="login.html"]').forEach(btn => {
    if (btn.textContent.includes('Déconnexion') || btn.getAttribute('data-path') === 'deconnexion') {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.primeApi.signOut();
      });
    }
  });
}

// ==============================================================================
// 2. GLOBAL TOAST & CONFIRM DIALOGS
// ==============================================================================
function showAdminToast(title, message, type = 'success') {
  let toast = document.getElementById('prime-admin-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'prime-admin-toast';
    toast.className = 'fixed top-24 right-8 z-[9999] transform translate-y-[-120%] opacity-0 transition-all duration-300 ease-out flex items-center gap-3.5 bg-primary text-on-primary px-5 py-3.5 rounded-lg shadow-2xl';
    document.body.appendChild(toast);
  }

  const iconName = type === 'error' ? 'error' : (type === 'warning' ? 'warning' : 'verified');
  const iconBg = type === 'error' ? 'bg-error text-on-error' : 'bg-secondary-container text-on-secondary-container';

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0">
      <span class="material-symbols-outlined text-[20px]">${iconName}</span>
    </div>
    <div class="flex flex-col pr-2">
      <span class="font-title-md text-title-md text-surface-container-lowest leading-tight font-semibold">${title}</span>
      <span class="font-body-sm text-body-sm text-surface-container-highest mt-0.5">${message}</span>
    </div>
    <button class="ml-2 text-surface-variant hover:text-surface-container-lowest transition-colors" onclick="this.parentElement.classList.add('translate-y-[-120%]', 'opacity-0')">
      <span class="material-symbols-outlined text-[18px]">close</span>
    </button>
  `;

  toast.classList.remove('translate-y-[-120%]', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.add('translate-y-[-120%]', 'opacity-0');
  }, 4500);
}

function showConfirmModal({ title, message, confirmText = 'Confirmer', isDanger = false, onConfirm }) {
  let modal = document.getElementById('prime-confirm-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'prime-confirm-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 hidden';
    document.body.appendChild(modal);
  }

  const btnColor = isDanger 
    ? 'bg-error text-on-error hover:bg-error/90' 
    : 'bg-secondary text-on-secondary hover:bg-secondary-fixed-dim';

  modal.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl max-w-md w-full mx-4 p-6 shadow-2xl border border-surface-container-high flex flex-col gap-4 animate-scaleUp">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full ${isDanger ? 'bg-error-container text-on-error-container' : 'bg-secondary-container text-on-secondary-container'} flex items-center justify-center shrink-0">
          <span class="material-symbols-outlined text-[22px]">${isDanger ? 'warning' : 'help'}</span>
        </div>
        <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">${title}</h3>
      </div>
      <p class="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">${message}</p>
      <div class="flex items-center justify-end gap-3 pt-2">
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high font-label-md text-label-md transition-colors" id="prime-confirm-cancel">
          Annuler
        </button>
        <button type="button" class="px-5 py-2 rounded-lg font-label-md text-label-md transition-all shadow-sm ${btnColor}" id="prime-confirm-ok">
          ${confirmText}
        </button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  const close = () => modal.classList.add('hidden');
  modal.querySelector('#prime-confirm-cancel').onclick = close;
  modal.querySelector('#prime-confirm-ok').onclick = () => {
    close();
    if (typeof onConfirm === 'function') onConfirm();
  };
}

function initGlobalModals() {
  window.showAdminToast = showAdminToast;
  window.showConfirmModal = showConfirmModal;
}

// ==============================================================================
// 3. ADMIN PAGE ROUTER
// ==============================================================================
function routeAdminPage() {
  const path = window.location.pathname.toLowerCase();

  if (path.endsWith('login.html')) {
    initLoginPage();
  } else if (path.endsWith('index.html') || path.endsWith('/admin/')) {
    initDashboardPage();
  } else if (path.endsWith('biens.html')) {
    initBiensPage();
  } else if (path.endsWith('ajouter-bien.html')) {
    initAjouterBienPage();
  } else if (path.endsWith('moderation.html')) {
    initModerationPage();
  } else if (path.endsWith('vitrine.html')) {
    initVitrinePage();
  } else if (path.endsWith('demandes.html')) {
    initDemandesPage();
  } else if (path.endsWith('categories-wilayas.html')) {
    initCategoriesWilayasPage();
  } else if (path.endsWith('parametres.html')) {
    initParametresPage();
  }
}

// ==============================================================================
// 4. PAGE: LOGIN (admin/login.html)
// ==============================================================================
function initLoginPage() {
  const form = document.getElementById('loginForm') || document.querySelector('form');
  if (!form) return;

  const emailInput = document.getElementById('email') || form.querySelector('input[type="email"]') || document.getElementById('adminId');
  const passwordInput = document.getElementById('password') || form.querySelector('input[type="password"]') || document.getElementById('adminKey');
  const submitBtn = document.getElementById('submitBtn') || form.querySelector('button[type="submit"]') || form.querySelector('button.bg-secondary');
  const btnIcon = document.getElementById('btnIcon');
  const btnText = document.getElementById('btnText');
  const toggleBtn = document.getElementById('togglePasswordBtn');
  const passIcon = document.getElementById('passIcon');

  // Toggle password visibility
  if (toggleBtn && passwordInput) {
    toggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPass = passwordInput.type === 'password';
      passwordInput.type = isPass ? 'text' : 'password';
      if (passIcon) {
        passIcon.textContent = isPass ? 'visibility_off' : 'visibility';
      }
    });
  }

  // Insert status alert container
  let statusBox = document.getElementById('loginStatusAlert');
  if (!statusBox) {
    statusBox = document.createElement('div');
    statusBox.id = 'loginStatusAlert';
    statusBox.className = 'hidden p-3.5 rounded-lg font-body-sm text-body-sm mb-4';
    form.parentNode.insertBefore(statusBox, form);
  }

  function resetLoadingState() {
    if (submitBtn) {
      submitBtn.disabled = false;
      if (btnIcon) {
        btnIcon.className = 'material-symbols-outlined text-title-md';
        btnIcon.textContent = 'login';
      }
      if (btnText) {
        btnText.textContent = 'Se connecter';
      } else {
        submitBtn.innerHTML = '<span class="material-symbols-outlined text-title-md">login</span><span>Se connecter</span>';
      }
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';

    // Client-side Validation: Empty fields
    if (!email || !password) {
      statusBox.className = 'p-3.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm mb-4 flex items-center gap-2';
      statusBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">error</span><span>Veuillez renseigner votre adresse email et votre mot de passe.</span>';
      statusBox.classList.remove('hidden');
      if (!email && emailInput) emailInput.focus();
      else if (!password && passwordInput) passwordInput.focus();
      return;
    }

    // Client-side Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      statusBox.className = 'p-3.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm mb-4 flex items-center gap-2';
      statusBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">error</span><span>Veuillez saisir une adresse email valide.</span>';
      statusBox.classList.remove('hidden');
      if (emailInput) emailInput.focus();
      return;
    }

    // Loading state: "Connexion en cours..." and spinner
    if (submitBtn) {
      submitBtn.disabled = true;
      if (btnIcon) {
        btnIcon.className = 'material-symbols-outlined text-title-md animate-spin';
        btnIcon.textContent = 'progress_activity';
      }
      if (btnText) {
        btnText.textContent = 'Connexion en cours...';
      } else {
        submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span><span>Connexion en cours...</span>';
      }
    }

    statusBox.classList.add('hidden');

    try {
      const result = await window.primeApi.signIn(email, password);

      if (result.success) {
        statusBox.className = 'p-3.5 rounded-lg bg-secondary-fixed text-on-secondary-fixed font-body-sm text-body-sm mb-4 flex items-center gap-2 font-semibold animate-pulse';
        statusBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">verified</span><span>Authentification validée. Redirection vers la console...</span>';
        statusBox.classList.remove('hidden');

        setTimeout(() => {
          const urlParams = new URLSearchParams(window.location.search);
          const redirect = urlParams.get('redirect') || 'index.html';
          if (redirect.startsWith('/') || redirect.endsWith('.html')) {
            window.location.href = redirect;
          } else {
            window.location.href = 'index.html';
          }
        }, 600);
      } else {
        resetLoadingState();
        statusBox.className = 'p-3.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm mb-4 flex items-center gap-2';
        statusBox.innerHTML = `<span class="material-symbols-outlined text-[18px]">error</span><span>${result.error || 'Adresse email ou mot de passe incorrect.'}</span>`;
        statusBox.classList.remove('hidden');
      }
    } catch (err) {
      resetLoadingState();
      statusBox.className = 'p-3.5 rounded-lg bg-error-container text-on-error-container font-body-sm text-body-sm mb-4 flex items-center gap-2';
      statusBox.innerHTML = '<span class="material-symbols-outlined text-[18px]">error</span><span>Erreur de connexion au serveur d’authentification.</span>';
      statusBox.classList.remove('hidden');
    }
  });
}

// ==============================================================================
// 5. PAGE: TABLEAU DE BORD (admin/index.html)
// ==============================================================================
async function initDashboardPage() {
  const statusRes = await fetch('/api/status').then(r => r.json()).catch(() => ({ counts: {} }));
  const propertiesData = await window.primeApi.getProperties({ limit: 100 });
  const moderationData = await window.primeApi.getPendingModeration();
  const inquiriesData = await window.primeApi.getInquiries();

  const props = propertiesData.properties || [];
  const total = props.length;
  const published = props.filter(p => p.publication_status === 'publie');
  const sales = props.filter(p => p.transaction_type === 'vente');
  const rentals = props.filter(p => p.transaction_type === 'location');
  const pendingMod = moderationData.pending || [];
  const inqs = inquiriesData.inquiries || [];
  const featured = props.filter(p => p.is_featured);

  // Update KPI counters
  const totalEl = document.getElementById('admin-total-properties');
  if (totalEl) totalEl.textContent = total;

  const salesEl = document.getElementById('admin-sales-count');
  if (salesEl) salesEl.textContent = `${sales.length} Ventes`;

  const rentalsEl = document.getElementById('admin-rentals-count');
  if (rentalsEl) rentalsEl.textContent = `${rentals.length} Locations`;

  const activeEl = document.getElementById('admin-active-properties');
  if (activeEl) activeEl.textContent = published.length;

  const pendingEl = document.getElementById('admin-pending-moderation');
  if (pendingEl) pendingEl.textContent = pendingMod.length;

  const inqEl = document.getElementById('admin-total-inquiries');
  if (inqEl) inqEl.textContent = inqs.length;

  // Portfolio Volume in Milliards DA
  const totalVolumeDa = sales.reduce((sum, p) => sum + (Number(p.price) || 0), 0);
  const volumeInMilliards = (totalVolumeDa / 1000000000).toFixed(2);
  const volEl = document.getElementById('admin-portfolio-volume') || document.querySelector('.font-currency-display.text-secondary-fixed');
  if (volEl) volEl.textContent = volumeInMilliards;

  // Populate Recent Properties in Table if present
  renderDashboardRecentProperties(props.slice(0, 5));
  renderDashboardRecentInquiries(inqs.slice(0, 5));

  // Hook export registry button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Exporter le registre')) {
      btn.onclick = () => window.location.href = '/api/export/properties';
    }
  });
}

function renderDashboardRecentProperties(recentProps) {
  const tableBody = document.querySelector('tbody');
  if (!tableBody) return;

  if (recentProps.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="6" class="p-6 text-center text-on-surface-variant font-body-sm">Aucun bien enregistré pour le moment.</td></tr>`;
    return;
  }

  tableBody.innerHTML = recentProps.map(p => `
    <tr class="border-b border-surface-container-high/40 hover:bg-surface-container-low transition-colors">
      <td class="py-3.5 px-4">
        <div class="flex items-center gap-3">
          <img src="${p.main_image || p.image || '../assets/logo-p-transparent.png'}" alt="${p.title}" class="w-12 h-10 object-cover rounded shadow-sm shrink-0" />
          <div class="flex flex-col min-w-0">
            <span class="font-title-md text-sm text-on-surface font-semibold truncate max-w-[240px]">${p.title}</span>
            <span class="font-label-sm text-xs text-secondary font-mono">${p.ref}</span>
          </div>
        </div>
      </td>
      <td class="py-3.5 px-4 font-body-sm text-sm text-on-surface-variant">
        ${p.commune}, ${p.wilaya_name}
      </td>
      <td class="py-3.5 px-4 font-body-sm text-sm font-bold text-on-surface">
        ${(p.price || 0).toLocaleString('fr-FR')} DA
      </td>
      <td class="py-3.5 px-4">
        <span class="px-2.5 py-1 rounded-full text-xs font-semibold ${
          p.publication_status === 'publie' ? 'bg-secondary-container/40 text-on-secondary-container' : 
          (p.publication_status === 'moderation' ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface-variant')
        }">
          ${p.publication_status === 'publie' ? 'Publié' : (p.publication_status === 'moderation' ? 'En modération' : 'Brouillon')}
        </span>
      </td>
      <td class="py-3.5 px-4">
        ${p.is_featured ? '<span class="material-symbols-outlined text-secondary text-[20px]" title="À la Une">star</span>' : '<span class="text-outline text-xs">—</span>'}
      </td>
      <td class="py-3.5 px-4 text-right">
        <a href="ajouter-bien.html?id=${p.id}" class="p-1.5 rounded hover:bg-surface-container text-secondary inline-flex" title="Éditer">
          <span class="material-symbols-outlined text-[18px]">edit</span>
        </a>
      </td>
    </tr>
  `).join('');
}

function renderDashboardRecentInquiries(recentInqs) {
  const container = document.getElementById('recent-inquiries-stream');
  if (!container) return;

  if (recentInqs.length === 0) {
    container.innerHTML = '<p class="text-on-surface-variant text-sm p-4">Aucune demande reçue pour l\'instant.</p>';
    return;
  }

  container.innerHTML = recentInqs.map(i => `
    <div class="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3">
      <div class="flex items-center gap-3 min-w-0">
        <div class="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0">
          ${(i.client_name || 'C').charAt(0).toUpperCase()}
        </div>
        <div class="flex flex-col min-w-0">
          <span class="font-title-md text-sm text-on-surface truncate font-semibold">${i.client_name}</span>
          <span class="font-body-sm text-xs text-on-surface-variant truncate">${i.property_title || i.property_ref} • ${i.client_phone}</span>
        </div>
      </div>
      <span class="px-2 py-0.5 rounded text-xs font-semibold shrink-0 ${i.status === 'Nouveau' ? 'bg-error text-on-error' : 'bg-surface-container text-on-surface'}">
        ${i.status}
      </span>
    </div>
  `).join('');
}

// ==============================================================================
// 6. PAGE: BIENS (admin/biens.html)
// ==============================================================================
let currentBiensState = {
  page: 1,
  limit: 10,
  search: '',
  status: 'all',
  type: 'all',
  category: 'all',
  wilaya: 'all',
  sort: 'recent',
  selectedIds: new Set()
};

async function initBiensPage() {
  // Bind search input
  const searchInput = document.querySelector('input[placeholder*="Réf (ex: PH-ALG)"]');
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentBiensState.search = e.target.value.trim();
        currentBiensState.page = 1;
        fetchAndRenderBiens();
      }, 300);
    });
  }

  // Bind status navigation buttons
  const statusNav = document.querySelector('nav button, nav a');
  document.querySelectorAll('div.flex-wrap.items-center.justify-between.gap-4 button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('div.flex-wrap.items-center.justify-between.gap-4 button').forEach(b => {
        b.className = 'px-4 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-label-md text-label-md flex items-center gap-2 transition-all';
      });
      btn.className = 'px-4 py-2 rounded-lg bg-primary-container text-surface-container-lowest font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all';

      const label = btn.textContent.toLowerCase();
      if (label.includes('tous')) currentBiensState.status = 'all';
      else if (label.includes('publiés')) currentBiensState.status = 'publie';
      else if (label.includes('modération')) currentBiensState.status = 'moderation';
      else if (label.includes('brouillons')) currentBiensState.status = 'brouillon';
      else if (label.includes('archivés')) currentBiensState.status = 'archive';

      currentBiensState.page = 1;
      fetchAndRenderBiens();
    });
  });

  // Bind dropdown filters
  const selects = document.querySelectorAll('div.grid.grid-cols-2.sm\\:grid-cols-4 select');
  if (selects.length >= 1) {
    selects[0].addEventListener('change', (e) => {
      const val = e.target.value;
      currentBiensState.type = val.includes('Vendre') ? 'vente' : (val.includes('Louer') ? 'location' : 'all');
      currentBiensState.page = 1;
      fetchAndRenderBiens();
    });
  }

  // Bind Add Property Button in Header
  document.querySelectorAll('a[href="#"]').forEach(a => {
    if (a.textContent.includes('Ajouter un bien')) {
      a.href = 'ajouter-bien.html';
    }
  });

  // Bulk menu actions
  const bulkBtn = document.getElementById('bulk-menu-btn');
  const bulkDropdown = document.getElementById('bulk-dropdown');
  if (bulkBtn && bulkDropdown) {
    bulkBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      bulkDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => bulkDropdown.classList.add('hidden'));

    bulkDropdown.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', async () => {
        const text = btn.textContent.toLowerCase();
        if (currentBiensState.selectedIds.size === 0) {
          showAdminToast('Aucune sélection', 'Veuillez cocher au moins un bien dans le tableau.', 'warning');
          return;
        }

        if (text.includes('publier')) {
          for (let id of currentBiensState.selectedIds) {
            await window.primeApi.updateProperty(id, { publication_status: 'publie' });
          }
          showAdminToast('Sélection publiée', `${currentBiensState.selectedIds.size} bien(s) mis en ligne.`);
        } else if (text.includes('dépublier')) {
          for (let id of currentBiensState.selectedIds) {
            await window.primeApi.updateProperty(id, { publication_status: 'brouillon' });
          }
          showAdminToast('Sélection dépubliée', `${currentBiensState.selectedIds.size} bien(s) passés en brouillon.`);
        } else if (text.includes('exporter')) {
          window.location.href = '/api/export/properties';
        } else if (text.includes('archiver')) {
          showConfirmModal({
            title: 'Archiver la sélection ?',
            message: `Voulez-vous vraiment archiver ${currentBiensState.selectedIds.size} bien(s) ?`,
            isDanger: true,
            onConfirm: async () => {
              for (let id of currentBiensState.selectedIds) {
                await window.primeApi.updateProperty(id, { publication_status: 'archive' });
              }
              showAdminToast('Sélection archivée', 'Les biens sélectionnés sont désormais hors ligne.');
              currentBiensState.selectedIds.clear();
              fetchAndRenderBiens();
            }
          });
        }
        fetchAndRenderBiens();
      });
    });
  }

  fetchAndRenderBiens();
}

async function fetchAndRenderBiens() {
  const tableBody = document.querySelector('table tbody');
  if (!tableBody) return;

  tableBody.innerHTML = `<tr><td colspan="9" class="p-12 text-center text-on-surface-variant"><span class="material-symbols-outlined animate-spin text-[32px] text-secondary">sync</span><p class="mt-2 text-sm font-semibold">Chargement du parc immobilier...</p></td></tr>`;

  const data = await window.primeApi.getProperties({
    search: currentBiensState.search,
    status: currentBiensState.status,
    type: currentBiensState.type,
    category: currentBiensState.category,
    wilaya: currentBiensState.wilaya,
    sort: currentBiensState.sort,
    page: currentBiensState.page,
    limit: currentBiensState.limit
  });

  const props = data.properties || [];
  const total = data.total || 0;

  if (props.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="9" class="p-12 text-center">
          <div class="flex flex-col items-center justify-center gap-2">
            <span class="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <span class="font-headline-sm text-headline-sm text-on-surface">Aucun bien ne correspond aux filtres</span>
            <p class="font-body-sm text-body-sm text-on-surface-variant max-w-sm">Ajustez vos critères de recherche ou réinitialisez les filtres.</p>
            <button onclick="currentBiensState.search='';currentBiensState.status='all';fetchAndRenderBiens()" class="mt-2 px-4 py-2 rounded bg-surface-container hover:bg-surface-container-high font-label-md text-label-md">
              Réinitialiser les filtres
            </button>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = props.map(p => {
    const isChecked = currentBiensState.selectedIds.has(p.id);
    const statusBg = p.publication_status === 'publie' ? 'bg-secondary-fixed text-on-secondary-fixed font-bold' :
      (p.publication_status === 'moderation' ? 'bg-secondary-container/40 text-on-secondary-container font-bold' :
      (p.publication_status === 'archive' ? 'bg-error-container text-on-error-container' : 'bg-surface-container text-on-surface-variant'));

    const statusText = p.publication_status === 'publie' ? 'Publié' :
      (p.publication_status === 'moderation' ? 'En modération' :
      (p.publication_status === 'archive' ? 'Archivé' : 'Brouillon'));

    return `
      <tr class="border-b border-surface-container-high/40 hover:bg-surface-container-low transition-colors" data-id="${p.id}">
        <td class="py-4 px-4">
          <input type="checkbox" class="prop-checkbox rounded border-outline cursor-pointer" ${isChecked ? 'checked' : ''} onchange="toggleSelectProperty('${p.id}', this.checked)" />
        </td>
        <td class="py-4 px-4">
          <div class="flex items-center gap-3">
            <img src="${p.main_image || p.image || '../assets/logo-p-transparent.png'}" class="w-14 h-11 object-cover rounded-md shadow-sm shrink-0" alt="${p.title}" />
            <div class="flex flex-col min-w-0">
              <span class="font-title-md text-sm text-on-surface font-semibold truncate max-w-[260px]">${p.title}</span>
              <span class="font-body-sm text-xs text-on-surface-variant">${p.surface_habitable || 0} m² • ${p.bedrooms || 0} Ch.</span>
            </div>
          </div>
        </td>
        <td class="py-4 px-4">
          <span class="font-mono text-xs font-bold text-secondary">${p.ref}</span>
        </td>
        <td class="py-4 px-4 font-body-sm text-sm text-on-surface-variant">
          ${p.commune}, ${p.wilaya_name}
        </td>
        <td class="py-4 px-4">
          <span class="px-2 py-0.5 rounded bg-surface-container text-xs font-medium text-on-surface">${p.category_name}</span>
        </td>
        <td class="py-4 px-4">
          <span class="px-2 py-0.5 rounded text-xs uppercase font-bold ${p.transaction_type === 'vente' ? 'bg-primary-container text-surface-container-lowest' : 'bg-secondary-container text-on-secondary-container'}">
            ${p.transaction_type === 'vente' ? 'Vente' : 'Location'}
          </span>
        </td>
        <td class="py-4 px-4 font-currency-display text-sm font-bold text-on-surface">
          ${(p.price || 0).toLocaleString('fr-FR')} <span class="text-xs text-secondary font-normal font-sans">DA</span>
        </td>
        <td class="py-4 px-4">
          <span class="px-2.5 py-1 rounded-full text-xs ${statusBg}">
            ${statusText}
          </span>
        </td>
        <td class="py-4 px-4">
          <button onclick="togglePropertyFeatured('${p.id}')" class="p-1 rounded hover:bg-surface-container transition-colors" title="${p.is_featured ? 'Retirer de la vitrine' : 'Mettre à la Une'}">
            <span class="material-symbols-outlined text-[20px] ${p.is_featured ? 'text-secondary' : 'text-outline/40'}" style="font-variation-settings: 'FILL' ${p.is_featured ? 1 : 0};">
              star
            </span>
          </button>
        </td>
        <td class="py-4 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="previewPropertyModal('${p.id}')" class="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface transition-colors" title="Aperçu fiche">
              <span class="material-symbols-outlined text-[18px]">visibility</span>
            </button>
            <a href="ajouter-bien.html?id=${p.id}" class="p-1.5 rounded hover:bg-surface-container text-secondary transition-colors" title="Modifier">
              <span class="material-symbols-outlined text-[18px]">edit</span>
            </a>
            <button onclick="togglePublishProperty('${p.id}')" class="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-secondary transition-colors" title="${p.publication_status === 'publie' ? 'Dépublier' : 'Publier'}">
              <span class="material-symbols-outlined text-[18px]">${p.publication_status === 'publie' ? 'unpublished' : 'publish'}</span>
            </button>
            <button onclick="deletePropertyConfirm('${p.id}')" class="p-1.5 rounded hover:bg-error-container text-on-surface-variant hover:text-error transition-colors" title="Supprimer">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');

  // Update pagination UI
  renderPaginationBar(data);
}

function renderPaginationBar(data) {
  let nav = document.querySelector('div.flex.items-center.justify-between.mt-6');
  if (!nav) return;

  const total = data.total || 0;
  const page = data.page || 1;
  const totalPages = data.totalPages || 1;
  const start = ((page - 1) * currentBiensState.limit) + 1;
  const end = Math.min(page * currentBiensState.limit, total);

  nav.innerHTML = `
    <span class="font-body-sm text-sm text-on-surface-variant">
      Affichage de <strong class="text-on-surface">${total > 0 ? start : 0}</strong> à <strong class="text-on-surface">${end}</strong> sur <strong class="text-on-surface">${total}</strong> biens enregistrés
    </span>
    <div class="flex items-center gap-1.5">
      <button class="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-xs font-semibold disabled:opacity-40" ${page <= 1 ? 'disabled' : ''} onclick="currentBiensState.page--;fetchAndRenderBiens()">
        Précédent
      </button>
      <span class="px-3 py-1.5 rounded bg-primary-container text-surface-container-lowest text-xs font-bold font-mono">
        ${page} / ${totalPages}
      </span>
      <button class="px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors text-xs font-semibold disabled:opacity-40" ${page >= totalPages ? 'disabled' : ''} onclick="currentBiensState.page++;fetchAndRenderBiens()">
        Suivant
      </button>
    </div>
  `;
}

window.toggleSelectProperty = function (id, checked) {
  if (checked) currentBiensState.selectedIds.add(id);
  else currentBiensState.selectedIds.delete(id);
};

window.togglePropertyFeatured = async function (id) {
  await window.primeApi.toggleFeatured(id);
  showAdminToast('Vitrine mise à jour', 'Statut de mise en avant actualisé.');
  fetchAndRenderBiens();
};

window.togglePublishProperty = async function (id) {
  const res = await window.primeApi.togglePublish(id);
  showAdminToast('Statut modifié', `Le bien est désormais ${res.publication_status === 'publie' ? 'publié en ligne' : 'en brouillon'}.`);
  fetchAndRenderBiens();
};

window.deletePropertyConfirm = function (id) {
  showConfirmModal({
    title: 'Supprimer ce mandat ?',
    message: 'Cette action retirera définitivement ce bien du catalogue Prime House et de la vitrine publique.',
    confirmText: 'Supprimer définitivement',
    isDanger: true,
    onConfirm: async () => {
      await window.primeApi.deleteProperty(id);
      showAdminToast('Mandat supprimé', 'Le bien a été retiré de la base de données.');
      fetchAndRenderBiens();
    }
  });
};

window.previewPropertyModal = async function (id) {
  const prop = await window.primeApi.getPropertyById(id);
  if (!prop) return;

  let modal = document.getElementById('prop-preview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'prop-preview-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 transition-all';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-surface-container-lowest rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 relative flex flex-col gap-4">
      <button class="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors" onclick="this.closest('#prop-preview-modal').remove()">
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>
      <img src="${prop.main_image || prop.image}" class="w-full h-64 object-cover rounded-xl shadow-md" alt="${prop.title}" />
      <div class="flex items-center justify-between">
        <span class="px-3 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-bold text-xs uppercase">${prop.transaction_type === 'vente' ? 'À Vendre' : 'À Louer'}</span>
        <span class="font-currency-display text-lg font-bold text-secondary">${(prop.price || 0).toLocaleString('fr-FR')} DA</span>
      </div>
      <h2 class="font-headline-sm text-headline-sm text-on-surface font-semibold">${prop.title}</h2>
      <p class="font-label-sm text-xs text-outline uppercase font-mono">${prop.ref} • ${prop.commune}, ${prop.wilaya_name}</p>
      <p class="font-body-sm text-sm text-on-surface-variant leading-relaxed">${prop.description || 'Aucune description rédigée.'}</p>
      <div class="grid grid-cols-3 gap-2 bg-surface-container-low p-3 rounded-lg text-center font-label-sm text-xs">
        <div><strong>${prop.surface_habitable || 0} m²</strong><br><span class="text-outline">Surface</span></div>
        <div><strong>${prop.bedrooms || 0}</strong><br><span class="text-outline">Chambres</span></div>
        <div><strong>${prop.bathrooms || 0}</strong><br><span class="text-outline">Salles de bain</span></div>
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <a href="ajouter-bien.html?id=${prop.id}" class="px-5 py-2 rounded-lg bg-secondary text-on-secondary font-label-md text-sm font-semibold hover:bg-secondary-fixed-dim transition-colors">
          Modifier la fiche complète
        </a>
      </div>
    </div>
  `;
};

// ==============================================================================
// 7. PAGE: AJOUTER / ÉDITER UN BIEN (admin/ajouter-bien.html)
// ==============================================================================
let uploadedImagesList = [];

async function initAjouterBienPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const editId = urlParams.get('id');

  const pageTitle = document.querySelector('h1');
  const refBadge = document.querySelector('span.rounded-full.bg-surface-container-high');

  // Multi-image upload dropzone
  initImageUploadDropzone();

  // Bilingual Arabic/French editorial description tabs
  initBilingualDescriptionTabs();

  if (editId) {
    if (pageTitle) pageTitle.textContent = 'Modification du Mandat Immobilier';
    const prop = await window.primeApi.getPropertyById(editId);
    if (prop) {
      if (refBadge) refBadge.textContent = `Mandat #${prop.ref}`;
      populateFormWithProperty(prop);
    }
  } else {
    // Generate new unique reference
    const autoRef = `PH-16-${Math.floor(100 + Math.random() * 900)}`;
    if (refBadge) refBadge.textContent = `Nouveau Brouillon #${autoRef}`;
    const refInput = document.getElementById('prop-ref') || document.querySelector('input[name="ref"]');
    if (refInput) refInput.value = autoRef;
  }

  // Hook action buttons in sticky top bar
  const draftBtn = document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Enregistrer brouillon')) {
      btn.onclick = () => savePropertyForm(editId, 'brouillon');
    } else if (btn.textContent.includes('Valider & Mettre en ligne')) {
      btn.onclick = () => savePropertyForm(editId, 'publie');
    }
  });
}

function initImageUploadDropzone() {
  const dropArea = document.querySelector('#section-media, div.border-dashed');
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.multiple = true;
  fileInput.accept = 'image/jpeg,image/png,image/webp';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  // Gallery container
  let galleryContainer = document.getElementById('uploaded-gallery-grid');
  if (!galleryContainer) {
    galleryContainer = document.createElement('div');
    galleryContainer.id = 'uploaded-gallery-grid';
    galleryContainer.className = 'grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4';
    const mediaSection = document.querySelector('#section-media') || document.querySelector('div.border-dashed')?.parentElement;
    if (mediaSection) mediaSection.appendChild(galleryContainer);
  }

  // Click on dropzone opens file dialog
  const uploadBtn = document.querySelector('button.flex.items-center.gap-2.px-4.py-2.rounded.bg-secondary, div.border-dashed');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => fileInput.click());
  }

  fileInput.addEventListener('change', async (e) => {
    const files = Array.from(e.target.files);
    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        showAdminToast('Fichier trop lourd', `${file.name} dépasse la limite de 10 Mo.`, 'error');
        continue;
      }
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64 = event.target.result;
        try {
          const res = await window.primeApi.uploadImage(base64);
          uploadedImagesList.push(res.url);
          renderUploadedImages();
          showAdminToast('Photo importée', `${file.name} téléversée avec succès.`);
        } catch (err) {
          uploadedImagesList.push(base64);
          renderUploadedImages();
        }
      };
      reader.readAsDataURL(file);
    }
  });
}

function renderUploadedImages() {
  const container = document.getElementById('uploaded-gallery-grid');
  if (!container) return;

  container.innerHTML = uploadedImagesList.map((img, idx) => `
    <div class="relative group rounded-lg overflow-hidden border border-surface-container shadow-sm aspect-video">
      <img src="${img}" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button type="button" onclick="setMainUploadedImage(${idx})" class="p-1.5 rounded-full bg-secondary text-on-secondary text-xs" title="Définir comme photo principale">
          <span class="material-symbols-outlined text-[16px]">${idx === 0 ? 'star' : 'star_border'}</span>
        </button>
        <button type="button" onclick="removeUploadedImage(${idx})" class="p-1.5 rounded-full bg-error text-on-error text-xs" title="Supprimer">
          <span class="material-symbols-outlined text-[16px]">delete</span>
        </button>
      </div>
      ${idx === 0 ? '<span class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-secondary text-on-secondary text-[10px] font-bold uppercase">Principale</span>' : ''}
    </div>
  `).join('');
}

window.setMainUploadedImage = function (index) {
  const chosen = uploadedImagesList.splice(index, 1)[0];
  uploadedImagesList.unshift(chosen);
  renderUploadedImages();
};

window.removeUploadedImage = function (index) {
  uploadedImagesList.splice(index, 1);
  renderUploadedImages();
};

function initBilingualDescriptionTabs() {
  const tabFr = document.getElementById('descTabFr');
  const tabAr = document.getElementById('descTabAr');
  const descFr = document.getElementById('prop-description-fr');
  const descAr = document.getElementById('prop-description-ar');
  const indicator = document.getElementById('descLangIndicator');

  if (!tabFr || !tabAr) return;

  tabFr.addEventListener('click', (e) => {
    e.preventDefault();
    tabFr.classList.add('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
    tabFr.classList.remove('text-on-surface-variant');
    tabAr.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
    tabAr.classList.add('text-on-surface-variant');

    if (descFr) descFr.classList.remove('hidden');
    if (descAr) descAr.classList.add('hidden');
    if (indicator) indicator.textContent = 'Français (LTR) • Optimisé SEO';
  });

  tabAr.addEventListener('click', (e) => {
    e.preventDefault();
    tabAr.classList.add('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
    tabAr.classList.remove('text-on-surface-variant');
    tabFr.classList.remove('bg-surface-container-lowest', 'text-on-surface', 'font-semibold', 'shadow-xs');
    tabFr.classList.add('text-on-surface-variant');

    if (descAr) {
      descAr.classList.remove('hidden');
      descAr.focus();
    }
    if (descFr) descFr.classList.add('hidden');
    if (indicator) indicator.textContent = 'العربية (RTL) • محتوى عربي مخصص ومحسن لمحركات البحث';
  });
}

function populateFormWithProperty(p) {
  // Radio transaction
  const radio = document.querySelector(`input[name="transaction_type"][value="${p.transaction_type}"]`);
  if (radio) radio.checked = true;

  // Title French & Arabic
  const titleInput = document.getElementById('prop-title-fr') || document.querySelector('input[placeholder*="Villa"], input[placeholder*="Titre"], #section-general input[type="text"]');
  if (titleInput) titleInput.value = p.title || '';

  const titleArInput = document.getElementById('prop-title-ar');
  if (titleArInput && p.title_ar) titleArInput.value = p.title_ar;

  // Description French & Arabic
  const descFr = document.getElementById('prop-description-fr');
  if (descFr && p.description) descFr.value = p.description;

  const descAr = document.getElementById('prop-description-ar');
  if (descAr && p.description_ar) descAr.value = p.description_ar;

  // Price
  const priceInput = document.querySelector('input[placeholder*="165 000 000"], #section-financial input[type="number"], #section-financial input[type="text"]');
  if (priceInput) priceInput.value = p.price || '';

  // Surface
  const surfaceInputs = document.querySelectorAll('#section-physical input');
  if (surfaceInputs.length >= 1) surfaceInputs[0].value = p.surface_habitable || '';
  if (surfaceInputs.length >= 2) surfaceInputs[1].value = p.surface_terrain || '';

  // Existing images
  if (p.images && p.images.length > 0) {
    uploadedImagesList = [...p.images];
  } else if (p.main_image) {
    uploadedImagesList = [p.main_image];
  }
  renderUploadedImages();
}

async function savePropertyForm(editId, publicationStatus = 'publie') {
  const titleInput = document.getElementById('prop-title-fr') || document.querySelector('input[placeholder*="Villa"], #section-general input[type="text"]');
  const titleArInput = document.getElementById('prop-title-ar');
  const descFrInput = document.getElementById('prop-description-fr');
  const descArInput = document.getElementById('prop-description-ar');
  const priceInput = document.querySelector('input[placeholder*="165 000 000"], #section-financial input[type="number"], #section-financial input[type="text"]');
  const transactionRadio = document.querySelector('input[name="transaction_type"]:checked');

  const title = titleInput ? titleInput.value.trim() : '';
  const title_ar = titleArInput ? titleArInput.value.trim() : '';
  const description = descFrInput ? descFrInput.value.trim() : '';
  const description_ar = descArInput ? descArInput.value.trim() : '';
  const priceStr = priceInput ? priceInput.value.replace(/\s+/g, '') : '';
  const price = parseFloat(priceStr) || 0;
  const transaction_type = transactionRadio ? transactionRadio.value : 'vente';

  if (!title) {
    showAdminToast('Titre requis', 'Veuillez renseigner le titre du bien dans la section 1.', 'error');
    window.location.hash = '#section-general';
    return;
  }

  if (price <= 0) {
    showAdminToast('Prix requis', 'Veuillez renseigner un prix valide dans la section 2.', 'error');
    window.location.hash = '#section-financial';
    return;
  }

  const payload = {
    title,
    title_ar: title_ar || undefined,
    description: description || undefined,
    description_ar: description_ar || undefined,
    price,
    transaction_type,
    category_name: 'Villa Contemporaine',
    wilaya_name: 'Alger',
    commune: 'Hydra',
    publication_status: publicationStatus,
    main_image: uploadedImagesList[0] || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB4bKsGPaeW8-X3XC8DoI9DT6EKwaAzgKLHCx422LwMp6VqohaRxtThvKprkfDbFmMTOsN41xJiEh69fs9dLQA-J-GFxBfJ_R7NSL6D6LCS4xeA7EIwDsCsmCbbHLENq1i4n2P6WaZ9C88UlEDrfxoNJflVVYTDZsay6cxmG3UuAggEvlO2eV2UkYwQKlGwvuyCFiLPJ0SD4n7iYI8u3f02gEdyjiM9vxBCPxUCSAWPIb3i1Au-Hs',
    images: uploadedImagesList.length > 0 ? uploadedImagesList : undefined
  };

  try {
    if (editId) {
      await window.primeApi.updateProperty(editId, payload);
      showAdminToast('Mandat mis à jour', 'Les modifications ont été sauvegardées.');
    } else {
      await window.primeApi.createProperty(payload);
      showAdminToast('Bien créé', 'Le mandat a été enregistré avec succès.');
    }

    setTimeout(() => {
      window.location.href = 'biens.html';
    }, 1000);
  } catch (err) {
    showAdminToast('Erreur d\'enregistrement', err.message, 'error');
  }
}

// ==============================================================================
// 8. PAGE: MODÉRATION (admin/moderation.html)
// ==============================================================================
async function initModerationPage() {
  const data = await window.primeApi.getPendingModeration();
  const list = data.pending || [];

  const container = document.querySelector('div.grid.grid-cols-1.gap-6') || document.querySelector('main .flex.flex-col.gap-4');
  if (!container) return;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="p-12 text-center rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-3">
        <span class="material-symbols-outlined text-[52px] text-secondary">task_alt</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Tous les dossiers fonciers sont à jour</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md">Aucun bien en attente de validation cadastrale dans le flux de modération.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(item => `
    <div class="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-l-4 border-secondary transition-all hover:shadow-md" data-mod-id="${item.id}">
      <div class="flex items-start gap-4">
        <img src="${item.main_image || item.image || '../assets/logo-p-transparent.png'}" class="w-28 h-20 object-cover rounded-lg shadow-sm shrink-0" alt="${item.title}" />
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 rounded bg-secondary-container/40 text-on-secondary-container font-label-sm text-xs font-bold uppercase">${item.transaction_type === 'vente' ? 'Vente' : 'Location'}</span>
            <span class="font-mono text-xs font-semibold text-secondary">${item.ref || 'MOD-' + item.id}</span>
            <span class="text-outline text-xs">•</span>
            <span class="font-body-sm text-xs text-on-surface-variant">${item.commune}, ${item.wilaya_name}</span>
          </div>
          <h3 class="font-headline-sm text-base text-on-surface font-semibold truncate max-w-lg">${item.title}</h3>
          <p class="font-body-sm text-xs text-on-surface-variant">
            Déposé par : <strong class="text-on-surface">${item.owner_name || 'Particulier'}</strong> (${item.owner_phone || 'Non renseigné'})
          </p>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row items-end sm:items-center gap-4 self-end lg:self-center shrink-0">
        <div class="flex flex-col text-right">
          <span class="font-currency-display text-lg font-bold text-on-surface">${(item.price || 0).toLocaleString('fr-FR')} DA</span>
          <span class="font-label-sm text-[11px] text-outline font-mono">Dossier du ${new Date(item.created_at || Date.now()).toLocaleDateString('fr-FR')}</span>
        </div>
        <div class="flex items-center gap-2">
          <button onclick="previewPropertyModal('${item.id}')" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold transition-colors">
            Consulter dossier
          </button>
          <button onclick="approveModerationAction('${item.id}')" class="px-4 py-2 rounded-lg bg-secondary text-on-secondary hover:bg-secondary-fixed-dim font-label-md text-xs font-bold transition-all shadow-sm">
            Approuver & Publier
          </button>
          <button onclick="rejectModerationPrompt('${item.id}')" class="px-3 py-2 rounded-lg bg-error-container text-on-error-container hover:bg-error hover:text-on-error font-label-md text-xs font-semibold transition-colors">
            Rejeter
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.approveModerationAction = async function (id) {
  showConfirmModal({
    title: 'Approuver et mettre en ligne ?',
    message: 'Ce bien sera instantanément visible sur le portail public Prime House avec le statut vérifié.',
    confirmText: 'Certifier & Publier',
    onConfirm: async () => {
      await window.primeApi.approveModeration(id);
      showAdminToast('Mandat approuvé', 'Le bien est désormais public et certifié.');
      initModerationPage();
    }
  });
};

window.rejectModerationPrompt = function (id) {
  let modal = document.getElementById('reject-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'reject-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
      <h3 class="font-headline-sm text-lg text-on-surface font-semibold">Motif de non-conformité</h3>
      <p class="font-body-sm text-xs text-on-surface-variant">Précisez la raison pour laquelle ce dossier est rejeté ou nécessite une régularisation.</p>
      <select id="reject-reason-select" class="w-full p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm">
        <option>Défaut d'acte notarié ou livret foncier individuel</option>
        <option>Prix manifestement disproportionné</option>
        <option>Photographies non conformes au standing Prime House</option>
        <option>Litige cadastral ou d'indivision en cours</option>
        <option>Autre motif administratif</option>
      </select>
      <textarea id="reject-notes-input" placeholder="Notes complémentaires pour le mandant..." class="w-full p-3 rounded-lg bg-surface-container-low text-on-surface text-sm" rows="3"></textarea>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs" onclick="this.closest('#reject-modal').remove()">Annuler</button>
        <button type="button" id="confirm-reject-btn" class="px-4 py-2 rounded-lg bg-error text-on-error font-label-md text-xs font-semibold">Confirmer le rejet</button>
      </div>
    </div>
  `;

  document.getElementById('confirm-reject-btn').onclick = async () => {
    const reason = document.getElementById('reject-reason-select').value;
    const notes = document.getElementById('reject-notes-input').value;
    await window.primeApi.rejectModeration(id, reason, notes);
    modal.remove();
    showAdminToast('Dossier rejeté', 'Le dossier a été archivé avec notification du motif.');
    initModerationPage();
  };
};

// ==============================================================================
// 9. PAGE: BIENS À LA UNE (admin/vitrine.html)
// ==============================================================================
async function initVitrinePage() {
  const data = await window.primeApi.getFeaturedProperties();
  const featured = data.featured || [];

  const listContainer = document.getElementById('featured-list');
  if (!listContainer) return;

  if (featured.length === 0) {
    listContainer.innerHTML = `
      <div class="p-12 text-center rounded-xl bg-surface-container-lowest shadow-sm flex flex-col items-center justify-center gap-3">
        <span class="material-symbols-outlined text-[48px] text-outline">grade</span>
        <h3 class="font-headline-sm text-headline-sm text-on-surface">Aucun bien à la Une</h3>
        <p class="font-body-sm text-body-sm text-on-surface-variant max-w-md">Sélectionnez les biens de prestige que vous souhaitez mettre en avant sur la page d'accueil.</p>
        <button onclick="openAddFeaturedModal()" class="mt-2 px-5 py-2.5 rounded-lg bg-secondary text-on-secondary font-label-md text-sm font-semibold">
          + Ajouter un bien à la vitrine
        </button>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = featured.map((p, idx) => `
    <div class="draggable-item group relative bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col xl:flex-row xl:items-center justify-between gap-6" data-id="${p.id}">
      <div class="flex items-start md:items-center gap-5">
        <div class="flex flex-col md:flex-row items-center gap-2">
          <div class="flex flex-col items-center">
            <span class="w-9 h-9 rounded-full ${idx === 0 ? 'bg-secondary text-on-secondary font-bold' : 'bg-surface-container text-on-surface font-semibold'} flex items-center justify-center shadow-sm">
              ${idx + 1}
            </span>
            <div class="flex gap-1 mt-1.5">
              <button class="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors disabled:opacity-30" ${idx === 0 ? 'disabled' : ''} onclick="moveFeaturedUp('${p.id}')">
                <span class="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
              <button class="w-6 h-6 rounded bg-surface-container text-on-surface-variant hover:bg-secondary hover:text-on-secondary flex items-center justify-center transition-colors disabled:opacity-30" ${idx === featured.length - 1 ? 'disabled' : ''} onclick="moveFeaturedDown('${p.id}')">
                <span class="material-symbols-outlined text-[16px]">arrow_downward</span>
              </button>
            </div>
          </div>
        </div>
        <div class="relative w-40 md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 shadow-inner">
          <img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="${p.main_image || p.image || '../assets/logo-p-transparent.png'}" alt="${p.title}" />
          <div class="absolute top-1.5 left-1.5 px-2 py-0.5 rounded bg-surface-container-lowest text-on-surface font-label-sm text-[10px] uppercase font-bold shadow-sm">
            ${p.transaction_type === 'vente' ? 'À Vendre' : 'À Louer'}
          </div>
        </div>
        <div class="flex flex-col gap-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            ${idx === 0 ? '<span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[11px] font-bold uppercase flex items-center gap-1"><span class="material-symbols-outlined text-[13px]">star</span> En Couverture Hero</span>' : ''}
            <span class="font-mono text-xs text-secondary font-bold">${p.ref}</span>
            <span class="text-outline text-xs">•</span>
            <span class="font-body-sm text-xs text-on-surface-variant">${p.commune}, ${p.wilaya_name}</span>
          </div>
          <h3 class="font-headline-sm text-base text-on-surface font-semibold truncate max-w-md">${p.title}</h3>
          <span class="font-currency-display text-sm font-bold text-on-surface">${(p.price || 0).toLocaleString('fr-FR')} DA</span>
        </div>
      </div>
      <div class="flex items-center gap-3 self-end xl:self-center shrink-0">
        <a href="ajouter-bien.html?id=${p.id}" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <span class="material-symbols-outlined text-[16px]">edit</span>
          <span>Modifier</span>
        </a>
        <button onclick="removeFeaturedProperty('${p.id}')" class="px-3.5 py-2 rounded-lg bg-surface-container hover:bg-error-container text-on-surface hover:text-error text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <span class="material-symbols-outlined text-[16px]">remove_circle_outline</span>
          <span>Retirer de la vitrine</span>
        </button>
      </div>
    </div>
  `).join('');

  // Update dynamic count elements
  const countBadge = document.getElementById('featured-count-badge');
  if (countBadge) countBadge.textContent = `${featured.length} Emplacements Définis`;
  const countBanner = document.getElementById('featured-count-banner');
  if (countBanner) countBanner.innerHTML = `<strong>${featured.length} biens</strong> sont actuellement affichés en page d'accueil publique. Toute modification de position ou de statut se répercute instantanément sur le site public via le cache Edge Supabase.`;
  const lastUpdated = document.getElementById('featured-last-updated');
  if (lastUpdated) lastUpdated.textContent = 'Aujourd\'hui, ' + new Date().toLocaleTimeString('fr-FR');

  // Hook Add to Featured CTA
  window.openAddModal = openAddFeaturedModal;

  window.refreshStatus = async function () {
    const icon = document.getElementById('refresh-icon');
    if (icon) icon.classList.add('animate-spin');
    await initVitrinePage();
    setTimeout(() => {
      if (icon) icon.classList.remove('animate-spin');
      showAdminToast('Cache actualisé', 'La vitrine et l\'Edge Cache sont synchronisés.');
    }, 600);
  };

  window.resetDefaultPositions = async function () {
    const data = await window.primeApi.getProperties({ limit: 100 });
    const pubs = (data.properties || []).filter(p => p.publication_status === 'publie').slice(0, 6);
    await window.primeApi.reorderFeatured(pubs.map(p => p.id));
    showAdminToast('Ordre réinitialisé', 'Positions par défaut restaurées.');
    initVitrinePage();
  };
}

window.moveFeaturedUp = async function (id) {
  const data = await window.primeApi.getFeaturedProperties();
  const list = data.featured || [];
  const idx = list.findIndex(p => p.id === id);
  if (idx <= 0) return;

  const temp = list[idx];
  list[idx] = list[idx - 1];
  list[idx - 1] = temp;

  await window.primeApi.reorderFeatured(list.map(p => p.id));
  initVitrinePage();
};

window.moveFeaturedDown = async function (id) {
  const data = await window.primeApi.getFeaturedProperties();
  const list = data.featured || [];
  const idx = list.findIndex(p => p.id === id);
  if (idx === -1 || idx >= list.length - 1) return;

  const temp = list[idx];
  list[idx] = list[idx + 1];
  list[idx + 1] = temp;

  await window.primeApi.reorderFeatured(list.map(p => p.id));
  initVitrinePage();
};

window.removeFeaturedProperty = async function (id) {
  showConfirmModal({
    title: 'Retirer de la vitrine ?',
    message: 'Le bien restera dans le catalogue mais ne sera plus affiché en vedette sur la page d\'accueil.',
    confirmText: 'Retirer',
    onConfirm: async () => {
      await window.primeApi.removeFeatured(id);
      showAdminToast('Vitrine mise à jour', 'Le bien a été retiré de la vitrine.');
      initVitrinePage();
    }
  });
};

window.openAddFeaturedModal = async function () {
  const allData = await window.primeApi.getProperties({ limit: 100 });
  const allProps = (allData.properties || []).filter(p => !p.is_featured && p.publication_status === 'publie');

  let modal = document.getElementById('add-featured-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'add-featured-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-surface-container-lowest rounded-2xl max-w-xl w-full p-6 shadow-2xl flex flex-col gap-4 max-h-[85vh]">
      <div class="flex items-center justify-between pb-2 border-b border-surface-container-high/60">
        <h3 class="font-headline-sm text-headline-sm text-on-surface font-semibold">Ajouter un bien à la vitrine</h3>
        <button class="text-on-surface-variant hover:text-on-surface" onclick="this.closest('#add-featured-modal').remove()">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>
      <p class="font-body-sm text-xs text-on-surface-variant">Sélectionnez un bien publié pour l'ajouter aux emplacements vedettes de la page d'accueil.</p>
      <div class="overflow-y-auto flex flex-col gap-2.5 max-h-[50vh] pr-1">
        ${allProps.length === 0 ? '<p class="p-6 text-center text-sm text-on-surface-variant">Tous les biens publiés sont déjà en vitrine.</p>' : 
          allProps.map(p => `
            <div class="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container flex items-center justify-between gap-3 transition-colors">
              <div class="flex items-center gap-3 min-w-0">
                <img src="${p.main_image || p.image}" class="w-12 h-9 object-cover rounded shadow-sm shrink-0" />
                <div class="flex flex-col min-w-0">
                  <span class="font-title-md text-xs font-semibold text-on-surface truncate">${p.title}</span>
                  <span class="font-mono text-[11px] text-secondary">${p.ref} • ${(p.price || 0).toLocaleString('fr-FR')} DA</span>
                </div>
              </div>
              <button onclick="confirmAddToFeatured('${p.id}')" class="px-3 py-1.5 rounded bg-secondary text-on-secondary font-label-sm text-xs font-bold shrink-0 hover:bg-secondary-fixed-dim transition-colors">
                Sélectionner
              </button>
            </div>
          `).join('')
        }
      </div>
    </div>
  `;
};

window.confirmAddToFeatured = async function (id) {
  await window.primeApi.addFeatured(id);
  document.getElementById('add-featured-modal')?.remove();
  showAdminToast('Bien ajouté', 'Le bien est désormais mis en vedette en vitrine.');
  initVitrinePage();
};

// ==============================================================================
// 10. PAGE: DEMANDES & VISITES (admin/demandes.html)
// ==============================================================================
async function initDemandesPage() {
  const data = await window.primeApi.getInquiries();
  const allInquiries = data.inquiries || [];
  let currentFilter = 'all';
  let searchQuery = '';

  const tableBody = document.querySelector('tbody') || document.getElementById('inquiries-tbody');
  if (!tableBody) return;

  // Update KPI counters
  const totalCount = allInquiries.length;
  const newCount = allInquiries.filter(i => i.status === 'Nouveau').length;
  const visitCount = allInquiries.filter(i => i.status === 'Visite programmée').length;
  const contactCount = allInquiries.filter(i => i.status === 'Contacté' || i.status === 'En cours').length;
  const closedCount = allInquiries.filter(i => i.status === 'Terminé' || i.status === 'Annulé').length;

  const totalEl = document.getElementById('kpi-total-inquiries');
  if (totalEl) totalEl.textContent = totalCount;
  const newEl = document.getElementById('kpi-new-inquiries');
  if (newEl) newEl.textContent = newCount;
  const visitEl = document.getElementById('kpi-scheduled-visits');
  if (visitEl) visitEl.textContent = visitCount;
  const countLabel = document.getElementById('activeCountLabel');
  if (countLabel) countLabel.textContent = `${totalCount} pistes identifiées`;

  // Update Tab Badges
  const tabAll = document.getElementById('tab-count-all');
  if (tabAll) tabAll.textContent = totalCount;
  const tabNew = document.getElementById('tab-count-nouveau');
  if (tabNew) tabNew.textContent = newCount;
  const tabContact = document.getElementById('tab-count-contacte');
  if (tabContact) tabContact.textContent = contactCount;
  const tabVisit = document.getElementById('tab-count-visite');
  if (tabVisit) tabVisit.textContent = visitCount;
  const tabClose = document.getElementById('tab-count-cloture');
  if (tabClose) tabClose.textContent = closedCount;

  function renderTable() {
    let filtered = [...allInquiries];

    if (currentFilter !== 'all') {
      if (currentFilter === 'Contacté') {
        filtered = filtered.filter(i => i.status === 'Contacté' || i.status === 'En cours');
      } else if (currentFilter === 'Terminé') {
        filtered = filtered.filter(i => i.status === 'Terminé' || i.status === 'Annulé');
      } else {
        filtered = filtered.filter(i => i.status === currentFilter);
      }
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(i =>
        (i.client_name || '').toLowerCase().includes(q) ||
        (i.client_phone || '').toLowerCase().includes(q) ||
        (i.client_email || '').toLowerCase().includes(q) ||
        (i.property_ref || '').toLowerCase().includes(q) ||
        (i.property_title || '').toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="p-12 text-center text-on-surface-variant font-body-sm">Aucun dossier correspondant au filtre actif.</td></tr>`;
      return;
    }

    tableBody.innerHTML = filtered.map(i => `
      <tr class="border-b border-surface-container-high/40 hover:bg-surface-container-low transition-colors" data-inq-id="${i.id}">
        <td class="py-4 px-4 font-body-sm text-xs text-on-surface-variant font-mono">
          ${new Date(i.created_at || Date.now()).toLocaleDateString('fr-FR')}
        </td>
        <td class="py-4 px-4">
          <div class="flex flex-col">
            <span class="font-title-md text-sm text-on-surface font-semibold">${i.client_name}</span>
            <span class="font-body-sm text-xs text-secondary font-mono">${i.client_phone}</span>
            ${i.client_email ? `<span class="font-body-sm text-xs text-outline">${i.client_email}</span>` : ''}
          </div>
        </td>
        <td class="py-4 px-4">
          <div class="flex flex-col min-w-0">
            <span class="font-title-md text-xs text-on-surface font-semibold truncate max-w-[200px]">${i.property_title || 'Demande générale'}</span>
            <span class="font-mono text-[11px] text-secondary font-bold">${i.property_ref || 'GÉNÉRAL'}</span>
          </div>
        </td>
        <td class="py-4 px-4 font-body-sm text-xs text-on-surface-variant max-w-xs truncate" title="${i.message || ''}">
          ${i.message || '<em class="text-outline">Sans message</em>'}
        </td>
        <td class="py-4 px-4">
          <select onchange="updateInquiryStatusAction('${i.id}', this.value)" class="p-1.5 rounded text-xs font-semibold cursor-pointer ${
            i.status === 'Nouveau' ? 'bg-error text-on-error' : (i.status === 'Visite programmée' ? 'bg-secondary text-on-secondary font-bold' : 'bg-surface-container text-on-surface')
          }">
            <option ${i.status === 'Nouveau' ? 'selected' : ''}>Nouveau</option>
            <option ${i.status === 'En cours' ? 'selected' : ''}>En cours</option>
            <option ${i.status === 'Contacté' ? 'selected' : ''}>Contacté</option>
            <option ${i.status === 'Visite programmée' ? 'selected' : ''}>Visite programmée</option>
            <option ${i.status === 'Terminé' ? 'selected' : ''}>Terminé</option>
            <option ${i.status === 'Annulé' ? 'selected' : ''}>Annulé</option>
          </select>
        </td>
        <td class="py-4 px-4 font-body-sm text-xs font-mono text-on-surface">
          ${i.visit_date ? new Date(i.visit_date).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' }) : '<span class="text-outline">—</span>'}
        </td>
        <td class="py-4 px-4 text-right">
          <div class="flex items-center justify-end gap-1">
            <button onclick="scheduleVisitModal('${i.id}')" class="p-1.5 rounded hover:bg-surface-container text-secondary" title="Planifier / Modifier la visite">
              <span class="material-symbols-outlined text-[18px]">calendar_month</span>
            </button>
            <button onclick="viewInquiryNotes('${i.id}')" class="p-1.5 rounded hover:bg-surface-container text-on-surface-variant hover:text-on-surface" title="Notes internes">
              <span class="material-symbols-outlined text-[18px]">notes</span>
            </button>
            <button onclick="deleteInquiryAction('${i.id}')" class="p-1.5 rounded hover:bg-error-container text-on-surface-variant hover:text-error" title="Supprimer">
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `).join('');
  }

  // Hook live search
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.oninput = (e) => {
      searchQuery = e.target.value.trim();
      renderTable();
    };
  }

  // Hook status tabs
  window.filterInquiriesStatus = function (status, btn) {
    currentFilter = status;
    document.querySelectorAll('.status-tab').forEach(b => {
      b.className = 'status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-surface text-on-surface hover:bg-surface-container transition-all whitespace-nowrap';
    });
    if (btn) {
      btn.className = 'status-tab flex items-center gap-2 px-4 py-2 rounded font-label-md text-label-md bg-primary text-on-primary font-bold shadow-sm transition-all whitespace-nowrap';
    }
    renderTable();
  };

  // Render initial
  renderTable();

  // Hook CSV export button
  const exportBtn = document.getElementById('exportLeadsBtn');
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Exporter Leads')) {
      btn.onclick = () => window.location.href = '/api/export/inquiries';
    }
  });
}

window.updateInquiryStatusAction = async function (id, status) {
  await window.primeApi.updateInquiry(id, { status });
  showAdminToast('Statut mis à jour', `La demande est passée en "${status}".`);
};

window.scheduleVisitModal = function (id) {
  let modal = document.getElementById('visit-schedule-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'visit-schedule-modal';
    modal.className = 'fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="bg-surface-container-lowest rounded-xl max-w-md w-full p-6 shadow-2xl flex flex-col gap-4">
      <h3 class="font-headline-sm text-lg text-on-surface font-semibold">Planifier une Visite Privée</h3>
      <p class="font-body-sm text-xs text-on-surface-variant">Définissez la date et l'heure du rendez-vous d'escorte VIP.</p>
      <div class="flex flex-col gap-1.5">
        <label class="font-label-sm text-xs font-semibold text-on-surface">Date & Heure :</label>
        <input type="datetime-local" id="visit-datetime-input" class="p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm font-sans" />
      </div>
      <div class="flex flex-col gap-1.5">
        <label class="font-label-sm text-xs font-semibold text-on-surface">Agent d'escorte assigné :</label>
        <input type="text" id="visit-agent-input" value="Karim Benali" class="p-2.5 rounded-lg bg-surface-container-low text-on-surface text-sm" />
      </div>
      <div class="flex justify-end gap-3 pt-2">
        <button type="button" class="px-4 py-2 rounded-lg bg-surface-container text-on-surface text-xs font-semibold" onclick="this.closest('#visit-schedule-modal').remove()">Annuler</button>
        <button type="button" id="save-visit-btn" class="px-4 py-2 rounded-lg bg-secondary text-on-secondary text-xs font-bold">Confirmer le rendez-vous</button>
      </div>
    </div>
  `;

  document.getElementById('save-visit-btn').onclick = async () => {
    const val = document.getElementById('visit-datetime-input').value;
    const agent = document.getElementById('visit-agent-input').value;
    if (!val) {
      showAdminToast('Date requise', 'Veuillez sélectionner une date.', 'error');
      return;
    }
    await window.primeApi.updateInquiry(id, {
      status: 'Visite programmée',
      visit_date: new Date(val).toISOString(),
      escort_agent: agent
    });
    modal.remove();
    showAdminToast('Visite confirmée', 'Le rendez-vous a été enregistré dans le registre.');
    initDemandesPage();
  };
};

window.viewInquiryNotes = async function (id) {
  const inqs = (await window.primeApi.getInquiries()).inquiries || [];
  const item = inqs.find(i => i.id === id);
  if (!item) return;

  const notes = prompt('Notes internes confidentielles (direction & agents) :', item.internal_notes || '');
  if (notes !== null) {
    await window.primeApi.updateInquiry(id, { internal_notes: notes });
    showAdminToast('Notes sauvegardées', 'Les notes internes ont été enregistrées.');
  }
};

window.deleteInquiryAction = function (id) {
  showConfirmModal({
    title: 'Supprimer cette demande ?',
    message: 'Cette action effacera définitivement cette demande du registre.',
    confirmText: 'Supprimer',
    isDanger: true,
    onConfirm: async () => {
      await window.primeApi.deleteInquiry(id);
      showAdminToast('Demande supprimée', 'L\'élément a été retiré.');
      initDemandesPage();
    }
  });
};

// ==============================================================================
// 11. PAGE: CATÉGORIES & WILAYAS (admin/categories-wilayas.html)
// ==============================================================================
async function initCategoriesWilayasPage() {
  const categories = await window.primeApi.getCategories();
  const wilayas = await window.primeApi.getWilayas();

  // Update Top Metric Counters
  const wilayaCountEl = document.getElementById('active-wilayas-count');
  if (wilayaCountEl) wilayaCountEl.textContent = wilayas.filter(w => w.is_active).length;
  const catCountEl = document.getElementById('active-categories-count');
  if (catCountEl) catCountEl.textContent = categories.filter(c => c.is_active).length;

  // Populate Wilayas List
  const wilayasContainer = document.getElementById('wilayas-list') || document.querySelector('div.lg\\:col-span-7 div.flex.flex-col.gap-4');
  if (wilayasContainer) {
    wilayasContainer.innerHTML = wilayas.map(w => `
      <div class="rounded-lg bg-surface-container-low p-4 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded bg-primary-container text-surface-container-lowest font-mono font-bold text-xs flex items-center justify-center shrink-0">
            ${String(w.code).padStart(2, '0')}
          </span>
          <div class="flex flex-col">
            <span class="font-title-md text-sm text-on-surface font-semibold">${w.name} (${w.arabic_name || ''})</span>
            <span class="font-body-sm text-xs text-on-surface-variant truncate max-w-md">${(w.communes || []).join(', ')}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded text-xs font-semibold ${w.is_active ? 'bg-secondary-container/40 text-on-secondary-container' : 'bg-surface-container text-outline'}">
            ${w.is_active ? 'Actif' : 'Inactif'}
          </span>
        </div>
      </div>
    `).join('');
  }

  // Populate Categories List
  const catContainer = document.getElementById('categories-list') || document.querySelector('div.lg\\:col-span-5 div.flex.flex-col.gap-3');
  if (catContainer) {
    catContainer.innerHTML = categories.map(c => `
      <div class="p-3.5 rounded-lg bg-surface-container-low flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <span class="material-symbols-outlined text-secondary text-[22px] shrink-0">${c.icon || 'apartment'}</span>
          <div class="flex flex-col min-w-0">
            <span class="font-title-md text-sm text-on-surface font-semibold truncate">${c.name}</span>
            <span class="font-body-sm text-xs text-on-surface-variant truncate">${c.description || ''}</span>
          </div>
        </div>
        <div class="flex items-center gap-1.5 shrink-0">
          <button onclick="deleteCategoryAction('${c.id}')" class="p-1 rounded text-outline hover:text-error transition-colors" title="Supprimer">
            <span class="material-symbols-outlined text-[18px]">delete</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  // Hook "+ Nouvelle Catégorie" button
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Nouvelle Catégorie')) {
      btn.onclick = () => {
        const name = prompt('Nom de la nouvelle catégorie (ex: Loft Industriel) :');
        if (name) {
          window.primeApi.saveCategory({ name, icon: 'apartment' }).then(() => {
            showAdminToast('Catégorie ajoutée', `Catégorie "${name}" créée.`);
            initCategoriesWilayasPage();
          });
        }
      };
    } else if (btn.textContent.includes('Ajouter un Secteur')) {
      btn.onclick = () => {
        const code = prompt('Code Wilaya (1-58) :');
        const name = prompt('Nom de la Wilaya :');
        if (code && name) {
          window.primeApi.saveWilaya({ code, name }).then(() => {
            showAdminToast('Wilaya ajoutée', `Wilaya ${code} - ${name} ajoutée.`);
            initCategoriesWilayasPage();
          });
        }
      };
    }
  });
}

window.deleteCategoryAction = async function (id) {
  showConfirmModal({
    title: 'Supprimer cette catégorie ?',
    message: 'Le système vérifiera qu\'aucun bien actif n\'est lié à cette typologie avant validation.',
    confirmText: 'Supprimer',
    isDanger: true,
    onConfirm: async () => {
      try {
        await window.primeApi.deleteCategory(id);
        showAdminToast('Catégorie supprimée', 'L\'élément a été retiré.');
        initCategoriesWilayasPage();
      } catch (err) {
        showAdminToast('Suppression bloquée', err.message, 'error');
      }
    }
  });
};

// ==============================================================================
// 12. PAGE: PARAMÈTRES (admin/parametres.html)
// ==============================================================================
async function initParametresPage() {
  const settings = await window.primeApi.getSettings();

  // Populate Tab 1: Identité
  const nameInput = document.querySelector('input[value*="Prime House"]');
  if (nameInput && settings.general?.agency_name) nameInput.value = settings.general.agency_name;

  const sloganInput = document.querySelector('input[value*="L\'Excellence"]');
  if (sloganInput && settings.general?.official_slogan) sloganInput.value = settings.general.official_slogan;

  const textareas = document.querySelectorAll('#tab-identity textarea');
  if (textareas[0] && settings.general?.description_fr) textareas[0].value = settings.general.description_fr;
  if (textareas[1] && settings.general?.description_ar) textareas[1].value = settings.general.description_ar;

  // Populate Tab 2: Coordonnées
  const contactTextareas = document.querySelectorAll('#tab-contacts textarea');
  if (contactTextareas[0] && settings.contacts?.headquarters_address) contactTextareas[0].value = settings.contacts.headquarters_address;
  if (contactTextareas[1] && settings.contacts?.secondary_address) contactTextareas[1].value = settings.contacts.secondary_address;

  const contactInputs = document.querySelectorAll('#tab-contacts input');
  if (contactInputs[0] && settings.contacts?.primary_phone) contactInputs[0].value = settings.contacts.primary_phone;
  if (contactInputs[1] && settings.contacts?.primary_email) contactInputs[1].value = settings.contacts.primary_email;
  if (contactInputs[2] && settings.contacts?.mobile_phone) contactInputs[2].value = settings.contacts.mobile_phone;
  if (contactInputs[3] && settings.contacts?.concierge_email) contactInputs[3].value = settings.contacts.concierge_email;

  // Populate Tab 3: Conciergerie & WhatsApp
  const whatsappInput = document.querySelector('#tab-vip input[type="tel"]') || document.querySelector('#tab-vip input');
  if (whatsappInput && settings.contacts?.whatsapp_number) whatsappInput.value = settings.contacts.whatsapp_number;

  // Handle Tab Switching
  window.switchTab = function (tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.className = 'tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all text-on-surface-variant hover:bg-surface-container hover:text-on-surface';
    });
    const activeBtn = document.getElementById(`btn-${tabId}`);
    if (activeBtn) {
      activeBtn.className = 'tab-btn flex items-center gap-2.5 px-5 py-2.5 rounded-lg font-label-md text-label-md transition-all bg-primary text-on-primary shadow-sm';
    }
    document.querySelectorAll('.tab-panel').forEach(panel => {
      panel.classList.toggle('hidden', panel.id !== tabId);
    });
  };

  // Form submit handler
  window.handleFormSave = async function () {
    const updated = {
      general: {
        agency_name: nameInput ? nameInput.value : 'Prime House Immobilier de Prestige',
        official_slogan: sloganInput ? sloganInput.value : 'L\'Excellence Foncière & Immobilière en Algérie',
        description_fr: textareas[0] ? textareas[0].value : settings.general?.description_fr,
        description_ar: textareas[1] ? textareas[1].value : settings.general?.description_ar,
        reference_currency: 'DZD (DA)'
      },
      contacts: {
        ...settings.contacts,
        headquarters_address: contactTextareas[0] ? contactTextareas[0].value : settings.contacts?.headquarters_address,
        secondary_address: contactTextareas[1] ? contactTextareas[1].value : settings.contacts?.secondary_address,
        primary_phone: contactInputs[0] ? contactInputs[0].value : settings.contacts?.primary_phone,
        primary_email: contactInputs[1] ? contactInputs[1].value : settings.contacts?.primary_email,
        mobile_phone: contactInputs[2] ? contactInputs[2].value : settings.contacts?.mobile_phone,
        whatsapp_number: whatsappInput ? whatsappInput.value : settings.contacts?.whatsapp_number
      }
    };
    await window.primeApi.saveSettings(updated);
    showAdminToast('Sauvegarde validée', 'Paramètres enregistrés avec succès. Le portail public est à jour.');
  };

  // Activate initial tab to hide other panels
  window.switchTab('tab-identity');
}
