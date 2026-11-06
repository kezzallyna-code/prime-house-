'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { primeStorage } from '@/lib/storage';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Check if logged in
    const user = primeStorage.getAdminUser();
    if (!user) {
      // In browser, check if token exists or redirect to login
      const token = localStorage.getItem('prime_admin_token');
      if (!token) {
        router.push('/admin/login');
        return;
      }
    }
    setAuthorized(true);
  }, [router]);

  if (!authorized) {
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

