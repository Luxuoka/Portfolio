'use client';

import React, { useTransition } from 'react';
import { deleteProjectAction } from '@/actions/projects';
import { Loader2 } from 'lucide-react';

interface DeleteProjectButtonProps {
  id: string;
  imageUrl?: string;
  title: string;
}

export default function DeleteProjectButton({ id, imageUrl, title }: DeleteProjectButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus proyek "${title}"? Tindakan ini tidak dapat dibatalkan.`)) {
      startTransition(async () => {
        const res = await deleteProjectAction(id, imageUrl);
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
      title="Hapus Proyek"
    >
      {isPending ? <Loader2 className="w-3 h-3 animate-spin inline" /> : '[Hapus]'}
    </button>
  );
}
