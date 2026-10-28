'use client';

import React, { useTransition } from 'react';
import { toggleServicePublishAction } from '@/actions/services';
import { Loader2 } from 'lucide-react';

interface ToggleServiceButtonProps {
  id: string;
  isPublished: boolean;
}

export default function ToggleServiceButton({ id, isPublished }: ToggleServiceButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const res = await toggleServicePublishAction(id, isPublished);
      if (res?.error) {
        alert(res.error);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      className={`font-mono text-xs uppercase tracking-wider px-2 py-0.5 border transition-colors ${
        isPublished
          ? 'border-accent text-accent hover:bg-accent hover:text-bg'
          : 'border-line text-ink-muted hover:border-ink hover:text-ink'
      }`}
      title={isPublished ? 'Ubah status ke Draft' : 'Publikasikan ke Website'}
    >
      {isPending ? (
        <Loader2 className="w-3 h-3 animate-spin inline" />
      ) : isPublished ? (
        'Publik'
      ) : (
        'Draft'
      )}
    </button>
  );
}
