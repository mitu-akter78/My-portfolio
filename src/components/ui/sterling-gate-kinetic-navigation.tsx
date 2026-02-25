import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true" style={{ display: "block" }}>
      {text.split("").map((char, i) => (
        <span key={i} className="char" style={{ display: "inline-block" }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

function middleOrder(length: number): number[] {
  const center = (length - 1) / 2;
  return Array.from({ length }, (_, i) => i).sort(
    (a, b) => Math.abs(a - center) - Math.abs(b - center)
  );
}

export function Navigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const didMount = useRef(false);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // ── Stagger text hover ─────────────────────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    try { CustomEase.create("smooth", "0.76, 0, 0.24, 1"); } catch (_) { }

    const ctx = gsap.context(() => {
      const navLinkEls = containerRef.current!.querySelectorAll(".nav-link");

      navLinkEls.forEach((link) => {
        const activeEl = link.querySelector(".nav-link-active");
        const hiddenEl = link.querySelector(".nav-link-hidden");
        if (!activeEl || !hiddenEl) return;

        const activeChars = Array.from(activeEl.querySelectorAll(".char")) as HTMLElement[];
        const hiddenChars = Array.from(hiddenEl.querySelectorAll(".char")) as HTMLElement[];
        const order = middleOrder(activeChars.length);
        const hoverBg = link.querySelector(".nav-link-hover-bg") as HTMLElement | null;

        const resetState = () => {
          gsap.killTweensOf([...activeChars, ...hiddenChars, hoverBg].filter(Boolean));
          gsap.set(activeChars, { clearProps: "all" });
          gsap.set(hiddenChars, { yPercent: 100, opacity: 0 });
          if (hoverBg) gsap.set(hoverBg, { xPercent: -101 });
        };

        resetState();

        const DURATION = 0.55;
        const STAGGER = 0.022;
        const EASE_OUT = "smooth";
        const EASE_IN = "power3.in";

        const onEnter = () => {
          gsap.killTweensOf([...activeChars, ...hiddenChars, hoverBg].filter(Boolean));
          const tl = gsap.timeline();
          if (hoverBg) tl.to(hoverBg, { xPercent: 0, duration: 0.45, ease: EASE_OUT }, 0);
          tl.to(order.map((i) => activeChars[i]),
            { yPercent: -100, opacity: 0, duration: DURATION, stagger: STAGGER, ease: EASE_IN }, 0);
          tl.fromTo(order.map((i) => hiddenChars[i]),
            { yPercent: 100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: DURATION, stagger: STAGGER, ease: EASE_OUT }, 0.04);
        };

        const onLeave = () => {
          gsap.killTweensOf([...activeChars, ...hiddenChars, hoverBg].filter(Boolean));
          const tl = gsap.timeline();
          if (hoverBg) tl.to(hoverBg, { xPercent: -101, duration: 0.4, ease: EASE_IN }, 0);
          tl.to(order.map((i) => hiddenChars[i]),
            { yPercent: 100, opacity: 0, duration: DURATION, stagger: STAGGER, ease: EASE_IN }, 0);
          tl.fromTo(order.map((i) => activeChars[i]),
            { yPercent: -100, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: DURATION, stagger: STAGGER, ease: EASE_OUT }, 0.04);
        };

        const onClick = () => resetState();

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);
        link.addEventListener("click", onClick);

        (link as any)._cleanup = () => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
          link.removeEventListener("click", onClick);
        };
      });
    }, containerRef);

    return () => {
      ctx.revert();
      containerRef.current
        ?.querySelectorAll(".nav-link")
        .forEach((link: any) => link._cleanup?.());
    };
  }, []);

  // ── Menu open/close ────────────────────────────────────────────────────
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const navWrap = containerRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = containerRef.current!.querySelector(".menu-content");
      const overlay = containerRef.current!.querySelector(".overlay");
      const bgPanels = containerRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinks = containerRef.current!.querySelectorAll(".nav-link");
      const fadeTargets = containerRef.current!.querySelectorAll("[data-menu-fade]");
      const inMenuCloseBtn = containerRef.current!.querySelector(".menu-inner-close");

      const tl = gsap.timeline();

      if (isMenuOpen) {
        navWrap?.setAttribute("data-nav", "open");

        // Hard-reset all char states before opening so nothing is invisible
        menuLinks.forEach((link) => {
          const activeChars = Array.from(link.querySelectorAll(".nav-link-active .char")) as HTMLElement[];
          const hiddenChars = Array.from(link.querySelectorAll(".nav-link-hidden .char")) as HTMLElement[];
          const hoverBg = link.querySelector(".nav-link-hover-bg") as HTMLElement | null;
          gsap.set(activeChars, { clearProps: "all" });
          gsap.set(hiddenChars, { yPercent: 100, opacity: 0 });
          if (hoverBg) gsap.set(hoverBg, { xPercent: -101 });
        });

        tl.set(navWrap, { display: "flex" })
          .set(menu, { xPercent: 0 }, "<")
          .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
          .fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, "<")
          .fromTo(menuLinks,
            { yPercent: 50, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.55, ease: "power3.out", clearProps: "transform,opacity" },
            "<+=0.3"
          )
          .fromTo(inMenuCloseBtn,
            { autoAlpha: 0, y: -8 },
            { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
            "<+=0.3"
          );

        if (fadeTargets.length) {
          tl.fromTo(fadeTargets,
            { autoAlpha: 0, yPercent: 50 },
            { autoAlpha: 1, yPercent: 0, stagger: 0.04, clearProps: "all" },
            "<+=0.2"
          );
        }
      } else {
        navWrap?.setAttribute("data-nav", "closed");
        tl.to(overlay, { autoAlpha: 0 })
          .to(menu, { xPercent: 120 }, "<")
          .set(navWrap, { display: "none" });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isMenuOpen]);

  // ── Escape key ────────────────────────────────────────────────────────
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) setIsMenuOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((p) => !p);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <style>{`
        .nav-link-text-wrapper {
          position: relative;
          overflow: hidden;
          display: block;
          z-index: 1;
        }

        .nav-link-active {
          display: block;
          pointer-events: none;
          color: #ffffff;
          font-weight: 800;
          text-transform: uppercase;
          font-style: italic;
        }

        .nav-link-hidden {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          pointer-events: none;
          color: #131313;
          font-weight: 800;
          text-transform: uppercase;
          font-style: italic;
        }

        .nav-link-text-wrapper .char {
          display: inline-block;
          will-change: transform, opacity;
        }

        /* ─────────────────────────────────────────
           Close button — bottom-center of the panel
           ───────────────────────────────────────── */
        .menu-inner-close {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: rgba(255, 255, 255, 0.8);
          cursor: pointer;
          padding: 0.65rem 1.6rem;
          border-radius: 9999px;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          white-space: nowrap;
          transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
          z-index: 10;
          opacity: 0; /* GSAP animates this in */
        }

        .menu-inner-close:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.45);
          color: #fff;
        }

        .menu-inner-close svg {
          width: 11px;
          height: 11px;
          flex-shrink: 0;
        }

        /* ─────────────────────────────
           Mobile: center the nav items
           ───────────────────────────── */
        @media (max-width: 639px) {
          .menu-content-wrapper {
            align-items: center;
          }
          .menu-list {
            align-items: center;
            width: 100%;
          }
          .menu-list-item {
            width: 100%;
            text-align: center;
          }
          .nav-link {
            text-align: center;
            display: flex;
            justify-content: center;
          }
          .nav-link-text-wrapper {
            display: inline-block;
          }
          .nav-link-hover-bg {
            left: -1.5rem !important;
            right: -1.5rem !important;
          }
          .menu-inner-close {
            bottom: 2rem;
          }
        }
      `}</style>

      <div ref={containerRef}>
        {/* ── Header ── */}
        <div className="site-header-wrapper">
          <header className="header">
            <div className="nav-container">
              <nav className="nav-row">
                <a href="#" aria-label="home" className="nav-logo">
                  <span className="nav-logo-text">Sadia.</span>
                </a>
                <div className="nav-row__right">
                  <button className="nav-close-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="menu-button-icon"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </div>

        {/* ── Fullscreen menu ── */}
        <section className="fullscreen-menu-container">
          <div data-nav="closed" className="nav-overlay-wrapper">
            <div className="overlay" onClick={closeMenu} />
            <nav className="menu-content">
              <div className="menu-bg">
                <div className="backdrop-layer first" />
                <div className="backdrop-layer second" />
                <div className="backdrop-layer" />
              </div>

              <div className="menu-content-wrapper">
                <ul className="menu-list">
                  {navLinks.map((link, i) => (
                    <li key={i} className="menu-list-item">
                      <a href={link.href} className="nav-link" onClick={closeMenu}>
                        <div className="nav-link-hover-bg" />
                        <div className="nav-link-text-wrapper">
                          <SplitText text={link.name} className="nav-link-active nav-link-text" />
                          <SplitText text={link.name} className="nav-link-hidden nav-link-text" />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Close button — bottom-center, visible on all screen sizes */}
              <button className="menu-inner-close" onClick={closeMenu} aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Close
              </button>
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}