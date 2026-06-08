'use client';

import { useCallback, useEffect, useState } from 'react';
import { CloudUpload, RotateCcw } from 'lucide-react';
import { discardAdminDraft, getAdminDraftStatus, publishAdminDraft, type AdminDraftStatus } from '@/lib/admin-client';

function getStatusLabel(status: AdminDraftStatus | null) {
  if (!status) return 'Перевіряємо зміни...';
  if (!status.configured) return 'Збереження ще не налаштовано';
  if (!status.hasPendingChanges) return 'Усі зміни вже на сайті';
  if (status.changedFiles.length === 1) return '1 зміна очікує оновлення';
  return `${status.changedFiles.length} змін очікують оновлення`;
}

export function PublishBar() {
  const [status, setStatus] = useState<AdminDraftStatus | null>(null);
  const [isBusy, setIsBusy] = useState(false);
  const [message, setMessage] = useState('');

  const refreshStatus = useCallback(async () => {
    try {
      const nextStatus = await getAdminDraftStatus();
      setStatus(nextStatus);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не вдалося перевірити зміни');
    }
  }, []);

  useEffect(() => {
    void refreshStatus();

    const handleSaveError = (event: Event) => {
      const detail = event instanceof CustomEvent && typeof event.detail === 'string' ? event.detail : 'Не вдалося зберегти зміни';
      setMessage(detail);
    };

    window.addEventListener('sunergy-admin-state-change', refreshStatus);
    window.addEventListener('sunergy-admin-state-error', handleSaveError);

    return () => {
      window.removeEventListener('sunergy-admin-state-change', refreshStatus);
      window.removeEventListener('sunergy-admin-state-error', handleSaveError);
    };
  }, [refreshStatus]);

  const handlePublish = async () => {
    setIsBusy(true);
    setMessage('');
    try {
      const nextStatus = await publishAdminDraft();
      setStatus(nextStatus);
      setMessage('Готово. Сайт оновлюється.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не вдалося оновити сайт');
    } finally {
      setIsBusy(false);
    }
  };

  const handleDiscard = async () => {
    if (!window.confirm('Скасувати зміни, які ще не потрапили на сайт?')) return;

    setIsBusy(true);
    setMessage('');
    try {
      const nextStatus = await discardAdminDraft();
      setStatus(nextStatus);
      setMessage('Зміни скасовано.');
      window.dispatchEvent(new Event('sunergy-admin-state-change'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Не вдалося скасувати зміни');
    } finally {
      setIsBusy(false);
    }
  };

  const canPublish = Boolean(status?.configured && status.hasPendingChanges && !isBusy);

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
      <span className={`text-xs font-semibold ${status?.hasPendingChanges ? 'text-amber-700' : 'text-steel'}`}>{getStatusLabel(status)}</span>
      {message ? <span className="text-xs font-medium text-accent">{message}</span> : null}
      <button type="button" onClick={handlePublish} disabled={!canPublish} className="btn-primary h-9 px-3 text-xs disabled:cursor-not-allowed disabled:opacity-60">
        <CloudUpload className="h-3.5 w-3.5" />
        <span className="ml-1.5">Оновити сайт</span>
      </button>
      <button
        type="button"
        onClick={handleDiscard}
        disabled={!status?.configured || !status.hasPendingChanges || isBusy}
        className="btn-secondary h-9 px-3 text-xs disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span className="ml-1.5">Скасувати</span>
      </button>
    </div>
  );
}
