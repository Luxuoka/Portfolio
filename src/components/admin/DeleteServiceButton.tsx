'use client';

import React, { useTransition } from 'react';
import { deleteServiceAction } from '@/actions/services';
import { Loader2 } from 'lucide-react';

interface DeleteServiceButtonProps {
  id: string;
  name: string;
}

export default function DeleteServiceButton({ id, name }: DeleteServiceButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus layanan "${name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      startTransition(async () => {
        const res = await deleteServiceAction(id);
        if (res?.error) {
          alert(`Gagal menghapus: ${res.error}`);
        }
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isPending}
      className="font-mono text-xs text-ink-muted hover:text-accent disabled:opacity-50 transition-colors"
      title="Hapus Layanan"
    >
      {isPending ? <Loader2 className="w-3 h-3 animate-spin inline" /> : '[Hapus]'}
    </button>
  );
}
