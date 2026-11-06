'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { applyLanguage, getCurrentLanguage, translateDom } from '@/lib/i18n';
import { showToast } from '@/components/Toast';

export default function I18nProvider({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.showToast = showToast;
      const savedLang = getCurrentLanguage();
      if (savedLang === 'ar') {
        applyLanguage('ar', false);
      }
    }
  }, []);

  useEffect(() => {
    // When route changes, if language is Arabic, translate the new page DOM
    const savedLang = getCurrentLanguage();
    if (savedLang === 'ar') {
      const timer = setTimeout(() => {
        translateDom(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return <>{children}</>;
}
