'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { primeStorage } from '@/lib/storage';

export default function AdminSidebar() {
  const pathname = usePathname() || '/admin';
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const u = primeStorage.getAdminUser();
    if (u) {
      setCurrentUser(u);
    } else {
      fetch('/api/auth/me')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.authenticated && data.user) {
            setCurrentUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Ignore network errors on logout
    }
    primeStorage.clearAdminUser();
    router.push('/admin/login');
  };

  const navItems = [
    {
      group: 'VUE GLOBALE',
      links: [
        {
          href: '/admin',
          label: 'Tableau de bord',
          icon: 'dashboard',
          exact: true,
        },
      ],
    },
    {
      group: 'GESTION DU PARC',
      links: [
        {
          href: '/admin/biens',
          label: 'Tous les biens',
          icon: 'apartment',
        },
        {
          href: '/admin/ajouter-bien',
          label: 'Ajouter un bien',
          icon: 'add_circle',
          badge: '+',
          badgeClass: 'px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-label-sm text-label-sm',
        },
        {
          href: '/admin/moderation',
          label: 'Biens en modération',
          icon: 'pending_actions',
          badge: '5',
          badgeClass: 'px-2 py-0.5 rounded-full bg-error text-on-error font-label-sm text-label-sm',
        },
        {
          href: '/admin/vitrine',
          label: 'Biens à la Une',
          icon: 'grade',
          rightIcon: 'tune',
        },
      ],
    },
    {
      group: 'LEADS & RELATIONS',
      links: [
        {
          href: '/admin/demandes',
          label: 'Demandes & Visites',
          icon: 'mark_email_unread',
          badge: '8',
          badgeClass: 'px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm',
        },
      ],
    },
    {
      group: 'TAXONOMIE & CONFIG',
      links: [
        {
          href: '/admin/categories-wilayas',
          label: 'Catégories & Wilayas',
          icon: 'map',
        },
        {
          href: '/admin/parametres',
          label: 'Paramètres du site',
          icon: 'settings',
        },
      ],
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-primary-container z-50 flex flex-col justify-between shadow-[0_4px_24px_rgba(7,20,38,0.25)]">
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand */}
        <div className="h-20 px-6 flex items-center justify-between bg-primary-container">
          <Link href="/" className="flex items-center gap-space-sm">
            <img
              alt="Prime House Logo"
              className="w-10 h-10 object-contain p-0.5 rounded bg-surface-container-lowest/10"
              style={{ width: '40px', height: '40px' }}
              src="/assets/logo-p-transparent.png"
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-surface-container-lowest tracking-tight">
                PRIME HOUSE
              </span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed tracking-widest uppercase">
                Prestige Immobilier
              </span>
            </div>
          </Link>
        </div>

        {/* Administration pill */}
        <div className="px-6 py-space-sm">
          <div className="bg-surface-container-lowest/5 rounded px-3 py-2 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-surface-container-highest tracking-wider uppercase">
              ESPACE ADMINISTRATION
            </span>
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-4 py-space-md flex flex-col gap-6">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="flex flex-col gap-1">
              <div className="px-3 pb-1">
                <span className="font-label-sm text-label-sm text-outline tracking-widest uppercase">
                  {group.group}
                </span>
              </div>
              <nav className="flex flex-col gap-1">
                {group.links.map((link, lIdx) => {
                  const isActive = link.exact
                    ? pathname === link.href || pathname === `${link.href}/index.html`
                    : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={lIdx}
                      href={link.href}
                      className={`flex items-center justify-between px-3 py-2 rounded transition-all ${
                        isActive
                          ? 'bg-surface-container-lowest/10 text-secondary-fixed font-bold'
                          : 'text-surface-container-highest hover:bg-surface-container-lowest/10 hover:text-on-surface-variant font-body-sm text-body-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`material-symbols-outlined text-[20px] ${
                            isActive ? 'text-secondary-fixed' : 'text-secondary'
                          }`}
                        >
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                      </div>
                      {link.badge ? (
                        <span className={link.badgeClass}>{link.badge}</span>
                      ) : (
                        <span className="material-symbols-outlined text-[16px] text-outline">
                          {link.rightIcon || 'chevron_right'}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Role & Logout */}
      <div className="p-4 bg-primary-container">
        <div className="bg-surface-container-lowest/5 rounded p-3 flex flex-col gap-2 mb-3">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-tertiary-fixed">
              {currentUser?.role === 'super_admin'
                ? 'Rôle: Super-Admin'
                : currentUser?.role === 'moderator'
                ? 'Rôle: Modérateur'
                : currentUser?.role === 'agent'
                ? 'Rôle: Agent'
                : 'Rôle: Administrateur'}
            </span>
            <span className="material-symbols-outlined text-secondary text-[16px]">verified_user</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-surface-variant opacity-80">
            <span className="truncate max-w-[140px]">{currentUser?.email || 'direction@primehouse-dz.com'}</span>
            <span className="flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed"></span>
              <span>Supabase</span>
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-surface-container-lowest/10 text-surface-container-highest hover:bg-error hover:text-on-error transition-all font-label-md text-label-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}

