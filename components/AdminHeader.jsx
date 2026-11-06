'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { primeStorage } from '@/lib/storage';

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = (e) => {
    e.preventDefault();
    primeStorage.clearAdminUser();
    router.push('/admin/login');
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-20 bg-surface-container-lowest/95 backdrop-blur-xl z-40 shadow-[0_1px_8px_rgba(7,20,38,0.04)] px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-on-surface">
          <span className="w-2 h-2 rounded-full bg-secondary"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider">Node Alger Connecté</span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant">
          Plateforme d'Administration Immobilière de Luxe
        </span>
      </div>

      <div className="flex items-center gap-5">
        <Link
          className="flex items-center gap-2 px-3.5 py-1.5 rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-sm text-label-sm uppercase tracking-wide"
          href="/"
          target="_blank"
        >
          <span className="material-symbols-outlined text-[16px] text-secondary">open_in_new</span>
          <span>Voir le site public</span>
        </Link>

        <div className="relative flex items-center justify-center">
          <button
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
            type="button"
            aria-label="Notifications"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold">
            12
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-container text-on-surface hover:bg-error hover:text-on-error transition-colors font-label-sm text-label-sm uppercase tracking-wide cursor-pointer"
          type="button"
          title="Déconnexion"
        >
          <span className="material-symbols-outlined text-[16px]">logout</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </header>
  );
}

