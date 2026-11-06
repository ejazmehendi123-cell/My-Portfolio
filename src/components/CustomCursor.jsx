import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = -100, mouseY = -100;
    let curX = -100, curY = -100;
    let rafId;

    // ── Smooth inertia animation ───────────────────────────────────────
    const animate = () => {
      curX += (mouseX - curX) * 0.12;
      curY += (mouseY - curY) * 0.12;
      cursor.style.left = `${curX}px`;
      cursor.style.top  = `${curY}px`;
      rafId = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    // ── Hover state helpers ────────────────────────────────────────────
    const addHover    = () => cursor.classList.add('hovering');
    const removeHover = () => cursor.classList.remove('hovering');

    const SELECTOR = 'a, button, [role="button"], input, textarea, select, label';

    // Track elements we've already attached listeners to, so we never double-attach
    const attached = new WeakSet();

    const attachToEl = (el) => {
      if (attached.has(el)) return;
      attached.add(el);
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    };

    // Initial attachment
    document.querySelectorAll(SELECTOR).forEach(attachToEl);

    // ── MutationObserver: picks up newly added interactive elements ────
    // (e.g. mobile menu opening, toast notifications appearing)
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== 1) continue; // Element nodes only
          if (node.matches?.(SELECTOR)) attachToEl(node);
          node.querySelectorAll?.(SELECTOR).forEach(attachToEl);
        }
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // ── Hide cursor when mouse leaves viewport ─────────────────────────
    const onLeave = () => { cursor.style.opacity = '0'; };
    const onEnter = () => { cursor.style.opacity = '1'; };
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
    />
  );
}
