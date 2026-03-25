'use client';

import { ReactNode } from 'react';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';

type ModalShellProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  panelClassName?: string;
  showBackdropDismiss?: boolean;
};

export default function ModalShell({
  open,
  onClose,
  children,
  className,
  panelClassName,
  showBackdropDismiss = true,
}: ModalShellProps) {
  useBodyScrollLock(open);

  if (!open) {
    return null;
  }

  return (
    <div className={`app-overlay ${className ?? ''}`.trim()}>
      {showBackdropDismiss ? (
        <button
          type="button"
          className="app-overlay-backdrop"
          onClick={onClose}
          aria-label="Close overlay"
        />
      ) : null}
      <div className={`app-dialog ${panelClassName ?? ''}`.trim()}>{children}</div>
    </div>
  );
}
