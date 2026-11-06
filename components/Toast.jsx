'use client';

import { useState, useEffect } from 'react';

export function showToast(message, type = 'info') {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('prime:toast', { detail: { message, type, id: Date.now() + Math.random() } })
    );
  }
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (e) => {
      const { message, type, id } = e.detail;
      setToasts((prev) => [...prev, { message, type: type || 'info', id }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4000);
    };

    window.addEventListener('prime:toast', handleToast);
    window.showToast = showToast;

    return () => {
      window.removeEventListener('prime:toast', handleToast);
    };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      id="prime-toast-container"
      className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 max-w-sm pointer-events-none"
    >
      {toasts.map((toast) => {
        const bgClasses =
          {
            success: 'bg-primary-container text-surface border border-secondary/40 shadow-xl',
            error: 'bg-error text-on-error shadow-xl',
            info: 'bg-surface-container-lowest text-on-surface border border-surface-container shadow-xl',
          }[toast.type] || 'bg-primary-container text-surface';

        const iconName =
          {
            success: 'check_circle',
            error: 'error',
            info: 'info',
          }[toast.type] || 'info';

        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg pointer-events-auto shadow-2xl transition-all duration-300 ease-out animate-fadeIn ${bgClasses}`}
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                toast.type === 'success' ? 'text-secondary-fixed' : ''
              }`}
            >
              {iconName}
            </span>
            <span className="font-body-sm text-body-sm font-medium flex-1">{toast.message}</span>
            <button
              className="text-xs opacity-70 hover:opacity-100 ml-2"
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              type="button"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
}

