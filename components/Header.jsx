'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { primeStorage } from '@/lib/storage';
import { applyLanguage, getCurrentLanguage } from '@/lib/i18n';
import MobileDrawer from './MobileDrawer';

function HeaderContent() {
  const pathname = usePathname() || '/';
  const searchParams = useSearchParams();
  const mode = searchParams ? searchParams.get('mode') : null;

  const [scrolled, setScrolled] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [currentLang, setCurrentLang] = useState('fr');
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    setFavCount(primeStorage.getFavorites().length);
    const initialLang = getCurrentLanguage();
    setCurrentLang(initialLang);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const handleFavChange = (e) => {
      if (e?.detail?.count !== undefined) {
        setFavCount(e.detail.count);
      } else {
        setFavCount(primeStorage.getFavorites().length);
      }
    };
    window.addEventListener('prime:favorites-changed', handleFavChange);

    const handleLangChange = (e) => {
      if (e?.detail?.lang) {
        setCurrentLang(e.detail.lang);
      }
    };
    window.addEventListener('prime:language-changed', handleLangChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('prime:favorites-changed', handleFavChange);
      window.removeEventListener('prime:language-changed', handleLangChange);
    };
  }, []);

  const switchLanguage = (lang) => {
    setCurrentLang(lang);
    applyLanguage(lang, true);
  };

  // Determine active section
  let activeSection = 'nos-biens';
  if (pathname === '/' || pathname === '/index.html') {
    activeSection = 'accueil';
  } else if (pathname === '/louer' || pathname === '/louer.html') {
    activeSection = 'louer';
  } else if (pathname === '/biens' || pathname === '/biens.html') {
    if (mode === 'vente') {
      activeSection = 'acheter';
    } else if (mode === 'location') {
      activeSection = 'louer';
    } else {
      activeSection = 'nos-biens';
    }
  } else if (pathname.includes('/a-propos')) {
    activeSection = 'a-propos';
  } else if (pathname.includes('/contact')) {
    activeSection = 'contact';
  } else if (pathname.includes('/deposer-annonce')) {
    activeSection = 'deposer-une-annonce';
  } else if (pathname.includes('/favoris')) {
    activeSection = 'favoris';
  }

  const getLinkClasses = (section) => {
    const isActive = activeSection === section;
    if (isActive) {
      return 'px-space-md py-space-sm transition-all bg-surface-container text-on-surface font-semibold rounded';
    }
    return 'px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low rounded transition-all';
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl transition-shadow duration-200 ${
          scrolled
            ? 'header-scrolled shadow-[0_10px_30px_-5px_rgba(7,20,38,0.08)]'
            : 'shadow-[0_4px_24px_rgba(17,28,44,0.06)]'
        }`}
      >
        <div className="h-20 max-w-[1440px] mx-auto px-margin md:px-margin-md lg:px-margin-lg flex items-center justify-between gap-gutter">
          <div className="flex items-center gap-space-lg">
            <Link className="flex items-center gap-space-sm group" data-path="accueil" href="/">
              <img
                alt="Prime House Logo"
                className="h-9 w-auto object-contain"
                style={{ height: '36px', width: 'auto' }}
                src="/assets/logo-p-transparent.png"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface uppercase font-bold leading-none">
                  PRIME HOUSE
                </span>
                <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mt-space-xs font-semibold">
                  Algeria Luxury Estate
                </span>
              </div>
            </Link>
          </div>

          <nav
            className="hidden xl:flex items-center gap-space-xs"
            data-active-classes="bg-surface-container text-on-surface font-semibold rounded"
          >
            <Link
              aria-current={activeSection === 'accueil' ? 'page' : undefined}
              className={getLinkClasses('accueil')}
              data-path="accueil"
              href="/"
            >
              Accueil
            </Link>
            <Link
              aria-current={activeSection === 'acheter' ? 'page' : undefined}
              className={getLinkClasses('acheter')}
              data-path="acheter"
              href="/biens?mode=vente"
            >
              Acheter
            </Link>
            <Link
              aria-current={activeSection === 'louer' ? 'page' : undefined}
              className={getLinkClasses('louer')}
              data-path="louer"
              href="/louer"
            >
              Louer
            </Link>
            <Link
              aria-current={activeSection === 'nos-biens' ? 'page' : undefined}
              className={getLinkClasses('nos-biens')}
              data-path="nos-biens"
              href="/biens"
            >
              Nos biens
            </Link>
            <Link
              aria-current={activeSection === 'a-propos' ? 'page' : undefined}
              className={getLinkClasses('a-propos')}
              data-path="a-propos"
              href="/a-propos"
            >
              À propos
            </Link>
            <Link
              aria-current={activeSection === 'contact' ? 'page' : undefined}
              className={getLinkClasses('contact')}
              data-path="contact"
              href="/contact"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-space-md">
            <div className="flex items-center bg-surface-container-low p-space-xs rounded text-on-surface-variant font-label-sm text-label-sm">
              <button
                className={`px-space-sm py-space-xs rounded transition-all ${
                  currentLang === 'fr'
                    ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.06)] font-semibold'
                    : 'hover:text-on-surface font-medium'
                }`}
                onClick={() => switchLanguage('fr')}
                type="button"
              >
                FR
              </button>
              <button
                className={`px-space-sm py-space-xs rounded transition-all ${
                  currentLang === 'ar'
                    ? 'bg-surface-container-lowest text-on-surface shadow-[0_1px_4px_rgba(0,0,0,0.06)] font-semibold'
                    : 'hover:text-on-surface font-medium'
                }`}
                onClick={() => switchLanguage('ar')}
                type="button"
              >
                العربية
              </button>
            </div>

            <Link
              className="hidden sm:inline-flex items-center gap-space-sm px-space-lg py-space-sm bg-secondary-container hover:bg-secondary-fixed text-on-secondary-container font-label-lg text-label-lg rounded transition-all duration-200 shadow-[0_2px_12px_rgba(121,89,0,0.18)] hover:-translate-y-0.5"
              data-path="deposer-une-annonce"
              href="/deposer-annonce"
            >
              <span className="material-symbols-outlined text-title-md">add_business</span>
              <span>Déposer une annonce</span>
            </Link>

            <Link
              className="relative flex items-center justify-center p-2 rounded-full hover:bg-surface-container-low transition-colors text-on-surface"
              href="/favoris"
              title="Mes Favoris"
            >
              <span className="material-symbols-outlined text-[22px]">favorite_border</span>
              {favCount > 0 && (
                <span className="favorites-count-badge absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-secondary text-primary-container font-label-sm text-[10px] font-bold inline-flex items-center justify-center">
                  {favCount}
                </span>
              )}
            </Link>

            <button
              aria-label="Menu Principal"
              className="xl:hidden p-space-sm text-on-surface hover:bg-surface-container-low rounded transition-colors"
              onClick={() => setDrawerOpen(true)}
              type="button"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        favCount={favCount}
      />
    </>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl h-20 shadow-[0_4px_24px_rgba(17,28,44,0.06)]" />
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
