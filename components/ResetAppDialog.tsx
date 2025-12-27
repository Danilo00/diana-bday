/**
 * ResetAppDialog - dialog per resettare lo stato locale dell'app.
 */

'use client';

import { debugLog } from '@/lib/debug';

interface ResetAppDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ResetAppDialog({ open, onClose, onConfirm }: ResetAppDialogProps) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Reset applicazione"
      onMouseDown={(e) => {
        // click fuori chiude
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-panel">
        <h2 className="modal-title">Reset applicazione</h2>
        <p className="modal-text">
          Vuoi svuotare i dati salvati (localStorage) e tornare come alla prima apertura?
        </p>
        <p className="modal-text subtle">
          Questo rimuove progressi, preferenze e lo stato della lettera finale.
        </p>

        <div className="modal-actions">
          <button type="button" className="modal-btn secondary" onClick={onClose}>
            Annulla
          </button>
          <button
            type="button"
            className="modal-btn danger"
            onClick={() => {
              debugLog.info('Reset confirmed from dialog');
              onConfirm();
            }}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}


