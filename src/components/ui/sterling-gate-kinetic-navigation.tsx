import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-hidden="true" style={{ display: "block", whiteSpace: "nowrap" }}>
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

const socialLinks = [
  { name: "Twitter", href: "#" },
  { name: "Instagram", href: "#" },
  { name: "LinkedIn", href: "#" },
  { name: "GitHub", href: "#" },
];

export function Navigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const didMount = useRef(false);

  const navLinks = [
    { name: "Home",     href: "#",         sectionId: "home"     },
    { name: "About",    href: "#about",    sectionId: "about"    },
    { name: "Skills",   href: "#skills",   sectionId: "skills"   },
    { name: "Projects", href: "#projects", sectionId: "projects" },
    { name: "Contact",  href: "#contact",  sectionId: "contact"  },
  ];

  // ── Track active section via IntersectionObserver ──────────────────────
  useEffect(() => {
    const ratioMap: Record<string, number> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // FIX: use the sectionId key, not entry.target.id, for the "home" fallback
          const key = entry.target.dataset.sectionId ?? entry.target.id;
          ratioMap[key] = entry.intersectionRatio;
        });
        const best = Object.entries(ratioMap).sort((a, b) => b[1] - a[1])[0];
        if (best && best[1] > 0) setActiveSection(best[0]);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      }
    );

    navLinks.forEach(({ sectionId }) => {
      const el =
        sectionId === "home"
          ? (document.getElementById("home") ?? document.body)
          : document.getElementById(sectionId);

      if (el) {
        // FIX: stamp the logical sectionId onto the element so ratioMap key is
        // always the sectionId string (handles body fallback where id="" or "")
        el.dataset.sectionId = sectionId;
        ratioMap[sectionId] = 0;
        observer.observe(el);
      }
    });

    const handleScroll = () => {
      if (window.scrollY < 80) setActiveSection("home");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Stagger text hover ─────────────────────────────────────────────────
  // NOTE: No gsap.context() here — same reason as the menu effect.
  // ctx.revert() would undo the gsap.set() calls inside snapToRest (the
  // initial yPercent:105 / clearProps state), causing hidden chars to snap
  // back to their natural visible CSS state. That ghost state then wins after
  // any hover animation completes, making text appear to vanish.
  // We clean up manually: kill all tweens and remove event listeners.
  useEffect(() => {
    if (!containerRef.current) return;

    try { CustomEase.create("smooth", "0.76, 0, 0.24, 1"); } catch (_) {}

    const navLinkEls = Array.from(
      containerRef.current.querySelectorAll(".nav-link")
    ) as HTMLElement[];

    type LinkData = {
      el: HTMLElement;
      activeChars: HTMLElement[];
      hiddenChars: HTMLElement[];
      order: number[];
      activeTl: gsap.core.Timeline | null;
    };

    const linkDataList: LinkData[] = navLinkEls.map((link) => {
      const activeEl    = link.querySelector(".nav-link-active")!;
      const hiddenEl    = link.querySelector(".nav-link-hidden")!;
      const activeChars = Array.from(activeEl.querySelectorAll(".char")) as HTMLElement[];
      const hiddenChars = Array.from(hiddenEl.querySelectorAll(".char")) as HTMLElement[];
      return { el: link, activeChars, hiddenChars, order: middleOrder(activeChars.length), activeTl: null };
    });

    const DURATION = 0.48;
    const STAGGER  = 0.016;
    const EASE_OUT = "smooth";
    const EASE_IN  = "power2.in";

    // snapToRest: kill tweens and immediately apply resting state.
    // These gsap calls are intentionally outside any context so they are
    // never auto-reverted by a ctx.revert() call.
    const snapToRest = (data: LinkData) => {
      data.activeTl?.kill();
      data.activeTl = null;
      gsap.killTweensOf([...data.activeChars, ...data.hiddenChars]);
      gsap.set(data.activeChars, { clearProps: "all" });
      gsap.set(data.hiddenChars, { yPercent: 105, opacity: 0 });
    };

    const animateIn = (data: LinkData) => {
      data.activeTl?.kill();
      gsap.killTweensOf([...data.activeChars, ...data.hiddenChars]);
      const tl = gsap.timeline({
        onComplete: () => {
          // Lock final state explicitly so nothing can disturb it
          gsap.set(data.activeChars, { yPercent: -105, opacity: 0 });
          gsap.set(data.hiddenChars, { yPercent: 0, opacity: 1 });
        },
      });
      data.activeTl = tl;
      tl.to(
        data.order.map((i) => data.activeChars[i]),
        { yPercent: -105, opacity: 0, duration: DURATION, stagger: STAGGER, ease: EASE_IN },
        0
      );
      tl.fromTo(
        data.order.map((i) => data.hiddenChars[i]),
        { yPercent: 105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: DURATION, stagger: STAGGER, ease: EASE_OUT },
        0.03
      );
    };

    const animateOut = (data: LinkData) => {
      data.activeTl?.kill();
      gsap.killTweensOf([...data.activeChars, ...data.hiddenChars]);
      const tl = gsap.timeline({
        onComplete: () => {
          // Lock final state explicitly
          gsap.set(data.hiddenChars, { yPercent: 105, opacity: 0 });
          gsap.set(data.activeChars, { clearProps: "all" });
        },
      });
      data.activeTl = tl;
      tl.to(
        data.order.map((i) => data.hiddenChars[i]),
        { yPercent: 105, opacity: 0, duration: DURATION, stagger: STAGGER, ease: EASE_IN },
        0
      );
      tl.fromTo(
        data.order.map((i) => data.activeChars[i]),
        { yPercent: -105, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: DURATION, stagger: STAGGER, ease: EASE_OUT },
        0.03
      );
    };

    // Set initial resting state for all links
    linkDataList.forEach(snapToRest);

    // Attach event listeners
    linkDataList.forEach((data) => {
      const onEnter = () => {
        linkDataList.forEach((other) => {
          if (other !== data) snapToRest(other);
        });
        animateIn(data);
      };
      const onLeave = () => animateOut(data);
      const onClick = () => snapToRest(data);

      data.el.addEventListener("mouseenter", onEnter);
      data.el.addEventListener("mouseleave", onLeave);
      data.el.addEventListener("click",      onClick);

      (data.el as any)._hoverCleanup = () => {
        data.activeTl?.kill();
        data.activeTl = null;
        gsap.killTweensOf([...data.activeChars, ...data.hiddenChars]);
        data.el.removeEventListener("mouseenter", onEnter);
        data.el.removeEventListener("mouseleave", onLeave);
        data.el.removeEventListener("click",      onClick);
      };
    });

    return () => {
      containerRef.current
        ?.querySelectorAll(".nav-link")
        .forEach((link: any) => link._hoverCleanup?.());
    };
  }, []);

  // ── Menu open / close ─────────────────────────────────────────────────
  // IMPORTANT: we deliberately avoid gsap.context() + ctx.revert() here.
  // ctx.revert() would undo the char hard-resets (clearProps / yPercent:105)
  // made at open-time, restoring chars to whatever mid-hover state they held
  // (e.g. yPercent:-105, opacity:0) and leaving them stuck invisible behind
  // the overflow:hidden clip. Using tl.kill() instead stops in-flight tweens
  // without touching any already-applied values.
  const menuTlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }
    if (!containerRef.current) return;

    // Kill previous timeline without reverting its applied values
    menuTlRef.current?.kill();

    const navWrap        = containerRef.current.querySelector(".nav-overlay-wrapper");
    const menu           = containerRef.current.querySelector(".menu-content");
    const overlay        = containerRef.current.querySelector(".overlay");
    const bgPanels       = containerRef.current.querySelectorAll(".backdrop-layer");
    const menuLinks      = containerRef.current.querySelectorAll(".nav-link");
    const inMenuCloseBtn = containerRef.current.querySelector(".menu-inner-close");
    const menuFooter     = containerRef.current.querySelector(".menu-footer");

    const tl = gsap.timeline();
    menuTlRef.current = tl;

    if (isMenuOpen) {
      navWrap?.setAttribute("data-nav", "open");

      // Kill any in-flight char tweens from hover animations
      menuLinks.forEach((link) => {
        gsap.killTweensOf(link.querySelectorAll(".char"));
      });

      // Hard-reset char states. These gsap.set() calls are intentionally
      // outside any context so they are never auto-reverted.
      menuLinks.forEach((link) => {
        const activeChars = Array.from(link.querySelectorAll(".nav-link-active .char")) as HTMLElement[];
        const hiddenChars = Array.from(link.querySelectorAll(".nav-link-hidden .char")) as HTMLElement[];
        gsap.set(activeChars, { clearProps: "all" });
        gsap.set(hiddenChars, { yPercent: 105, opacity: 0 });
      });

      tl.set(navWrap, { display: "flex" })
        .set(menu, { xPercent: 0 }, "<")
        .set(inMenuCloseBtn, { autoAlpha: 0, y: -6 }, "<")
        .set(menuFooter, { autoAlpha: 0, y: 10 }, "<")
        .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, "<")
        .fromTo(bgPanels,
          { xPercent: 101 },
          { xPercent: 0, stagger: 0.1, duration: 0.55, ease: "power3.out" },
          "<"
        )
        .fromTo(menuLinks,
          { yPercent: 30, opacity: 0 },
          {
            yPercent: 0, opacity: 1,
            stagger: 0.06, duration: 0.5,
            ease: "power3.out",
            clearProps: "transform,opacity",
          },
          "<+=0.25"
        )
        .to(inMenuCloseBtn,
          { autoAlpha: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "<+=0.1"
        )
        .to(menuFooter,
          { autoAlpha: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "<+=0.05"
        );
    } else {
      navWrap?.setAttribute("data-nav", "closed");
      tl.to([overlay, menuFooter, inMenuCloseBtn], { autoAlpha: 0, duration: 0.2 })
        .to(menu, { xPercent: 120, duration: 0.4, ease: "power3.in" }, "<")
        .set(navWrap, { display: "none" });
    }

    return () => { tl.kill(); };
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
  const closeMenu  = () => setIsMenuOpen(false);

  return (
    <>
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
                  <button
                    className="nav-close-btn"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                  >
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
                      <line x1="3"  y1="6"  x2="21" y2="6"  />
                      <line x1="3"  y1="12" x2="21" y2="12" />
                      <line x1="3"  y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </header>
        </div>

        {/* ── Fullscreen menu ── */}
        {/* FIX: hide overlay wrapper on initial render so it doesn't flash visible */}
        <section className="fullscreen-menu-container">
          <div data-nav="closed" className="nav-overlay-wrapper" style={{ display: "none" }}>
            <div className="overlay" onClick={closeMenu} />

            <nav className="menu-content">
              {/* Backdrop layers */}
              <div className="menu-bg">
                <div className="backdrop-layer first"  />
                <div className="backdrop-layer second" />
                <div className="backdrop-layer"        />
              </div>

              {/* Top-right close X */}
              <div className="menu-header">
                <button
                  className="menu-inner-close"
                  onClick={closeMenu}
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 13 13"
                    fill="none"
                  >
                    <path
                      d="M1.5 1.5L11.5 11.5M11.5 1.5L1.5 11.5"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Nav links — centered */}
              <div className="menu-content-wrapper">
                <ul className="menu-list">
                  {navLinks.map((link, i) => (
                    <li
                      key={i}
                      className={`menu-list-item${activeSection === link.sectionId ? " is-active" : ""}`}
                    >
                      <a
                        href={link.href}
                        className="nav-link"
                        onClick={closeMenu}
                      >
                        <div className="nav-link-text-wrapper">
                          <SplitText
                            text={link.name}
                            className="nav-link-active nav-link-text"
                          />
                          <SplitText
                            text={link.name}
                            className="nav-link-hidden nav-link-text"
                          />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom footer: CTA + socials */}
              <div className="menu-footer">
                <div className="menu-social-links">
                  {socialLinks.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      className="menu-social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {s.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </section>
      </div>
    </>
  );
}