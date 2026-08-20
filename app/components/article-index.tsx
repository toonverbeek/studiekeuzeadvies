"use client";

import { useEffect, useState } from "react";
import type { Section } from "@/app/articles";

/**
 * The index in the margin. It marks the section you are reading.
 *
 * PRODUCT.md names choosers with ADD, ADHD, or autism as a user group, and says
 * overview is a requirement for them, not a style. This is that overview: where
 * am I, how much is left, and can I jump.
 *
 * It marks, it does not move. No progress bar, no counter, no animation. The
 * page must stay calm.
 */
export function ArticleIndex({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  useEffect(() => {
    if (sections.length === 0) return;

    // The heading that last passed the top of the screen is the one you read.
    // Measuring beats an IntersectionObserver here: it also gives the right
    // answer when a fast scroll jumps over a short section completely.
    const measure = () => {
      const threshold = window.innerHeight * 0.25;
      let current = sections[0].id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= threshold) {
          current = section.id;
        }
      }
      setActiveId(current);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [sections]);

  return (
    <nav
      aria-label="In dit artikel"
      className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <p className="eyebrow text-muted">In dit artikel</p>

      <ul className="mt-4 border-b border-hairline">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <li className="border-t border-hairline" key={section.id}>
              <a
                aria-current={active ? "true" : undefined}
                className={`text-card relative block py-3.5 pl-6 transition-colors duration-150 ease-out-quart ${
                  active
                    ? "font-bold text-violet"
                    : "text-muted hover:text-violet"
                }`}
                href={`#${section.id}`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-[1.35rem] left-0 h-[3px] w-4 bg-violet"
                  />
                )}
                {section.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
