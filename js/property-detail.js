/**
 * Prime House - Property Detail Dynamic Loader
 * Reads ?id=... from the URL and dynamically populates the page
 */

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const propId = urlParams.get('id') || 'ph-alg-401';

  if (!window.primeStorage) return;
  const prop = window.primeStorage.getPropertyById(propId);
  if (!prop) return;

  // Update Page Title
  function renderDetails(lang) {
    const isAr = lang === 'ar';
    document.title = `${isAr && prop.title_ar ? prop.title_ar : prop.title} | Prime House Immobilier`;

    const titleEl = document.getElementById('prop-title');
    if (titleEl) titleEl.textContent = (isAr && prop.title_ar) ? prop.title_ar : prop.title;

    const priceEl = document.getElementById('prop-price');
    if (priceEl) priceEl.textContent = Number(prop.price).toLocaleString('fr-FR');

    const refEl = document.getElementById('prop-ref');
    if (refEl) refEl.textContent = isAr ? `المرجع: ${prop.ref}` : `Réf: ${prop.ref}`;

    const districtEl = document.getElementById('prop-district-city');
    if (districtEl) {
      districtEl.innerHTML = `<span class="material-symbols-outlined text-base">location_on</span> ${prop.commune} • ${prop.wilaya}`;
    }

    const surfaceEl = document.getElementById('spec-area');
    if (surfaceEl) surfaceEl.textContent = isAr ? `${prop.surface} م²` : `${prop.surface} m²`;

    const bedEl = document.getElementById('spec-bedrooms');
    if (bedEl) bedEl.textContent = isAr ? `${prop.bedrooms} غرف نوم` : `${prop.bedrooms} Chambres`;

    const bathEl = document.getElementById('spec-bathrooms');
    if (bathEl) bathEl.textContent = isAr ? `${prop.bathrooms} حمامات` : `${prop.bathrooms} Salles d'eau`;

    const descEl = document.getElementById('prop-long-description');
    if (descEl) {
      const descContent = (isAr && prop.description_ar) ? prop.description_ar : prop.description;
      if (descContent) descEl.innerHTML = `<p>${descContent}</p>`;
    }
  }

  const initialLang = localStorage.getItem('prime_language') || 'fr';
  renderDetails(initialLang);

  window.addEventListener('prime:language-changed', (e) => {
    renderDetails(e.detail?.lang || 'fr');
  });

  // Update Hero Gallery Main Image if available
  const heroImg = document.querySelector('.hero-gallery-main img');
  if (heroImg && prop.images && prop.images.length > 0) {
    heroImg.src = prop.images[0];
  }

  // Bind inquiry form to submit to primeStorage
  const contactForm = document.getElementById('contact-booking-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('lead-fullname')?.value || '';
      const phone = document.getElementById('lead-phone')?.value || '';
      const email = document.getElementById('lead-email')?.value || '';
      const message = document.getElementById('lead-message')?.value || '';
      const date = document.getElementById('lead-date')?.value || '';

      window.primeStorage.addInquiry({
        name,
        phone,
        email,
        message,
        date: date || new Date().toLocaleString('fr-FR'),
        propertyId: prop.id,
        propertyTitle: prop.title,
        type: 'Demande de visite privée'
      });

      const btn = document.getElementById('btn-submit-lead');
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = `<span class="material-symbols-outlined text-secondary-fixed text-title-md">check_circle</span> <span>Demande confirmée</span>`;
      }

      if (window.showToast) {
        window.showToast(`Demande de visite transmise pour ${prop.title} ! Notre conseiller vous contactera au ${phone}.`, 'success');
      }

      setTimeout(() => {
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = `<span class="material-symbols-outlined text-secondary-fixed text-title-md">send</span> <span>Demander une visite privée</span>`;
        }
      }, 4000);
    });
  }

  // Bind favorite button in detail page
  const favBtn = document.getElementById('btn-favorite-detail');
  if (favBtn) {
    favBtn.setAttribute('data-fav-id', prop.id);
    const isFav = window.primeStorage.isFavorite(prop.id);
    const favIcon = favBtn.querySelector('.material-symbols-outlined');
    const favText = favBtn.querySelector('span:last-child');
    if (isFav && favIcon) {
      favIcon.textContent = 'favorite';
      favIcon.classList.add('text-error');
      if (favText) favText.textContent = 'Enregistré';
    }
  }
});
