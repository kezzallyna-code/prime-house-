'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { primeStorage } from '@/lib/storage';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuth() {
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Cache-Control': 'no-cache' }
        });

        if (!res.ok) {
          primeStorage.clearAdminUser();
          if (isMounted) {
            setAuthorized(false);
            setChecking(false);
            router.replace('/admin/login');
          }
          return;
        }

        const data = await res.json();
        if (data.authenticated && data.user) {
          primeStorage.setAdminUser(data.user);
          if (isMounted) {
            setAuthorized(true);
            setChecking(false);
          }
        } else {
          primeStorage.clearAdminUser();
          if (isMounted) {
            setAuthorized(false);
            setChecking(false);
            router.replace('/admin/login');
          }
        }
      } catch (err) {
        console.error('Session verification failed:', err);
        primeStorage.clearAdminUser();
        if (isMounted) {
          setAuthorized(false);
          setChecking(false);
          router.replace('/admin/login');
        }
      }
    }

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (checking || !authorized) {
    return (
      <div className="min-h-screen bg-primary-container flex items-center justify-center text-surface">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-secondary-fixed border-t-transparent rounded-full animate-spin"></div>
          <span className="font-label-sm uppercase tracking-widest text-secondary-fixed">
            Vérification de l'accès sécurisé...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      <AdminSidebar />
      <div className="pl-72 flex flex-col min-h-screen">
        <AdminHeader />
        <main className="relative pt-20 bg-surface flex-1 w-full px-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}

