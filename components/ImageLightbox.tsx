/**
 * ImageLightbox - modal fullscreen per aprire un'immagine e zoommare.
 * - Mobile friendly (scroll/pan via overflow)
 * - Zoom con +/-, slider e rotellina mouse
 */
 
'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { debugLog } from '@/lib/debug';

export interface ImageLightboxProps {
  src: string;
  alt: string;
  title?: string;
  triggerLabel?: string;
  className?: string;
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ImageLightbox({
  src,
  alt,
  title = 'Anteprima',
  triggerLabel = 'Apri',
  className,
  initialZoom = 1,
  minZoom = 1,
  maxZoom = 4,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(() => clamp(initialZoom, minZoom, maxZoom));
  const viewportRef = useRef<HTMLDivElement>(null);

  const zoomPct = useMemo(() => Math.round(zoom * 100), [zoom]);

  const close = () => {
    debugLog.debug('ImageLightbox close', { src });
    setOpen(false);
  };

  const openNow = () => {
    debugLog.debug('ImageLightbox open', { src });
    setZoom(clamp(initialZoom, minZoom, maxZoom));
    setOpen(true);
  };

  const step = 0.25;

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom(z => clamp(z + step, minZoom, maxZoom));
      }
      if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom(z => clamp(z - step, minZoom, maxZoom));
      }
      if (e.key === '0') {
        e.preventDefault();
        setZoom(clamp(1, minZoom, maxZoom));
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [maxZoom, minZoom, open]);

  useEffect(() => {
    if (!open) return;

    const viewport = viewportRef.current;
    if (!viewport) return;

    const onWheel = (e: WheelEvent) => {
      // ctrl+wheel spesso è browser zoom: non interferiamo
      if (e.ctrlKey) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -step : step;
      setZoom(z => clamp(z + delta, minZoom, maxZoom));
    };

    viewport.addEventListener('wheel', onWheel, { passive: false });
    return () => viewport.removeEventListener('wheel', onWheel as any);
  }, [maxZoom, minZoom, open]);

  // blocca lo scroll sotto al modal
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className={className}>
      <button type="button" className="lightbox-trigger" onClick={openNow}>
        {triggerLabel}
      </button>

      {open && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onMouseDown={(e) => {
            // click fuori chiude
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="lightbox-panel">
            <div className="lightbox-toolbar">
              <div className="lightbox-title">{title}</div>
              <div className="lightbox-controls">
                <a className="lightbox-download" href={src} download>
                  Scarica
                </a>
                <button
                  type="button"
                  className="lightbox-btn"
                  onClick={() => setZoom(z => clamp(z - step, minZoom, maxZoom))}
                  aria-label="Zoom out"
                >
                  −
                </button>
                <input
                  className="lightbox-zoom"
                  type="range"
                  min={minZoom}
                  max={maxZoom}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(clamp(Number(e.target.value), minZoom, maxZoom))}
                  aria-label="Zoom"
                />
                <div className="lightbox-zoom-label">{zoomPct}%</div>
                <button
                  type="button"
                  className="lightbox-btn"
                  onClick={() => setZoom(z => clamp(z + step, minZoom, maxZoom))}
                  aria-label="Zoom in"
                >
                  +
                </button>
                <button
                  type="button"
                  className="lightbox-btn"
                  onClick={() => setZoom(clamp(1, minZoom, maxZoom))}
                  aria-label="Reset zoom"
                >
                  Reset
                </button>
                <button type="button" className="lightbox-close" onClick={close} aria-label="Chiudi">
                  ✕
                </button>
              </div>
            </div>

            <div className="lightbox-viewport" ref={viewportRef}>
              <img
                className="lightbox-image"
                src={src}
                alt={alt}
                draggable={false}
                style={{
                  transform: `scale(${zoom})`,
                }}
              />
              <div className="lightbox-hint">Suggerimento: usa la rotellina o i pulsanti per zoomare</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


