"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * The one motion of this site: a block rises 24px and fades in when it comes
 * into view, once, and never again (design-spec 3.22).
 *
 * Three things keep it honest:
 *  - the hidden state (`.reveal { opacity: 0 }`) lives in app/globals.css
 *    inside `@media (prefers-reduced-motion: no-preference) and (scripting:
 *    enabled)`, so a browser without scripting, or without support for that
 *    media feature, never hides a block and shows the whole page;
 *  - the same gate covers reduced motion, so a reader who asked for less
 *    motion never has anything hidden either, and this component then does
 *    nothing at all;
 *  - only opacity and transform move. No layout, no paint of the whole page.
 */
export function Reveal({
  as: Tag = "div",
  children,
  className = "",
  id,
}: {
  /** The element to render. A section, a li, an article: whatever fits. */
  as?: ElementType;
  children: ReactNode;
  /** Passed through, so a Reveal can also be the grid item or the card. */
  className?: string;
  /**
   * So a revealed block can also be the jump target. Without it a page has to
   * put the id on a wrapper, which is one element more for every anchor.
   */
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("on");
          observer.unobserve(entry.target);
        }
      },
      // A block counts as seen when a tenth of it is in view, and the bottom
      // 10% of the window does not count, so the animation starts just before
      // the reader's eye arrives instead of under their nose.
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag className={`reveal ${className}`} id={id} ref={ref}>
      {children}
    </Tag>
  );
}
