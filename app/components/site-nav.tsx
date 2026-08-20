"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type NavItem = { href: string; label: string };

/**
 * The links and the menu of the sticky nav. The only client JavaScript in the
 * header, and it exists for two reasons: a link has to know whether it is the
 * page you are on (that is the pathname), and below 1024px the seven links do
 * not fit on a line and become a menu.
 *
 * The client's own 390px rendering keeps all seven on one line with
 * `white-space: nowrap`, which pushes the page to 920px and makes every page
 * scroll sideways. That is the one thing this component may never do.
 */
export function SiteNav({ cta, items }: { cta: NavItem; items: NavItem[] }) {
  const pathname = usePathname();

  // The state is the page the menu was opened on, not a boolean. A menu that
  // survives the click that navigates is a menu covering the page you just
  // asked for, and this closes it on arrival without an effect that has to
  // watch the route.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const open = openedOn === pathname;
  const setOpen = (next: boolean) => setOpenedOn(next ? pathname : null);

  // Escape has to hand the focus back. A reader who pressed it while standing
  // on a link inside the panel was left on an element that is now hidden, and
  // the next Tab started from an unpredictable place. A pointer outside the
  // bar and the panel closes the menu too, which is what every menu does.
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpenedOn(null);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest('#site-menu, [aria-controls="site-menu"]')) return;
      setOpenedOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Desktop: the seven links, in the client's order. */}
      <nav aria-label="Hoofdmenu" className="hidden lg:block">
        <ul className="flex items-center gap-4 text-small">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`rounded-full py-2 transition-colors duration-150 ease-out-quart hover:text-violet ${
                  isActive(item.href) ? "font-bold text-violet" : "font-medium"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="ml-auto flex items-center gap-2">
        {/* The CTA stays beside the menu button from 400px up. Below that the
            panel carries it, because two pills on a 320px line is one too
            many. */}
        <Link
          className="hidden min-h-11 items-center rounded-full bg-ink px-4.5 text-small font-semibold text-paper transition-colors duration-150 ease-out-quart hover:bg-violet min-[400px]:inline-flex"
          href={cta.href}
        >
          {cta.label}
        </Link>

        <button
          aria-controls="site-menu"
          aria-expanded={open}
          className="-mr-1 inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-small font-semibold lg:hidden"
          onClick={() => setOpen(!open)}
          ref={buttonRef}
          type="button"
        >
          <span
            aria-hidden="true"
            className="flex w-4.5 flex-col gap-[3px] [&>span]:h-[2px] [&>span]:w-full [&>span]:rounded-full [&>span]:bg-ink"
          >
            <span />
            <span />
            <span />
          </span>
          Menu
        </button>
      </div>

      {/* The panel. It is inside the sticky header, full width, and it pushes
          nothing: it lies over the page under the bar. */}
      <div
        className={`absolute top-full right-0 left-0 border-b border-hairline bg-paper lg:hidden ${
          open ? "block" : "hidden"
        }`}
        id="site-menu"
      >
        <nav aria-label="Menu">
          <ul className="mx-auto flex w-full max-w-shell flex-col px-5 py-2 sm:px-7">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center border-b border-hairline text-body ${
                    isActive(item.href) ? "font-bold text-violet" : "font-medium"
                  }`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link
                className="flex min-h-12 items-center justify-center rounded-full bg-violet px-6 font-bold text-white shadow-violet"
                href={cta.href}
              >
                {cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
