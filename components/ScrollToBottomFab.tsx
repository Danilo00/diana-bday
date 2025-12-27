/**
 * ScrollToBottomFab - bottone flottante per andare sempre in fondo pagina.
 */

'use client';

import { useEffect, useState } from 'react';
import { debugLog } from '@/lib/debug';

interface ScrollToBottomFabProps {
  bottomOffsetPx?: number;
}

export default function ScrollToBottomFab({ bottomOffsetPx = 16 }: ScrollToBottomFabProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      const docH = document.documentElement.scrollHeight;

      const distanceFromBottom = docH - (scrollTop + viewportH);
      // Mostralo quando non sei già praticamente in fondo
      setShow(distanceFromBottom > 200);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    debugLog.debug('ScrollToBottomFab click');
    const docH = document.documentElement.scrollHeight;
    window.scrollTo({ top: docH, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-bottom-fab ${show ? 'visible' : 'hidden'}`}
      onClick={handleClick}
      aria-label="Vai in fondo alla pagina"
      style={{ bottom: bottomOffsetPx }}
    >
      ↓
    </button>
  );
}


