"use client";

import { useState, useMemo, createContext, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";


// --- Utilities ---
function splitText(text: string) {
  if (!text?.trim()) return { characters: [], characterCount: 0 };
  const words = text.split(" ").map((w) => w.concat(" "));
  const characters = words.map((w) => w.split("")).flat(1);
  return { characters, characterCount: characters.length };
}

function setStaggerDirection({
  staggerValue = 0.025,
  totalItems,
  index,
}: {
  staggerValue?: number;
  totalItems: number;
  index: number;
}) {
  const middleIndex = Math.floor(totalItems / 2);
  return Math.abs(index - middleIndex) * staggerValue;
}

function useAnimationVariants(animation: string) {
  return useMemo(
    () => ({
      hidden: {
        x: animation === "left" ? "-100%" : animation === "right" ? "100%" : 0,
        y: animation === "top" ? "-120%" : animation === "bottom" ? "120%" : 0,
        scale: animation === "z" ? 0 : 1,
        filter: animation === "blur" ? "blur(8px)" : "blur(0px)",
        opacity: animation === "blur" ? 0 : 1,
      },
      visible: { x: 0, y: 0, scale: 1, filter: "blur(0px)", opacity: 1 },
    }),
    [animation]
  );
}

// --- Context ---
const HoverCtx = createContext<{ isMouseIn: boolean } | undefined>(undefined);
const useHoverCtx = () => useContext(HoverCtx);

// --- Stagger Components ---
function TextStaggerHover({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [isMouseIn, setIsMouseIn] = useState(false);
  return (
    <HoverCtx.Provider value={{ isMouseIn }}>
      <span
        className={cn("relative inline-block overflow-hidden", className)}
        onMouseEnter={() => setIsMouseIn(true)}
        onMouseLeave={() => setIsMouseIn(false)}
      >
        {children}
      </span>
    </HoverCtx.Provider>
  );
}

function TextStaggerHoverActive({
  animation,
  children,
  className = "",
  transition,
}: {
  animation: string;
  children: React.ReactNode;
  className?: string;
  transition?: any;
}) {
  const { characters, characterCount } = splitText(String(children));
  const variants = useAnimationVariants(animation);
  const ctx = useHoverCtx();
  const isMouseIn = ctx?.isMouseIn ?? false;
  return (
    <span className={cn("inline-block text-nowrap", className)}>
      {characters.map((char, i) => (
        <motion.span
          key={`a-${i}`}
          className="inline-block"
          variants={variants}
          animate={isMouseIn ? "hidden" : "visible"}
          transition={{
            delay: setStaggerDirection({ totalItems: characterCount, index: i }),
            ease: [0.22, 1, 0.36, 1],
            duration: 0.35,
            ...transition,
          }}
        >
          {char === " " ? <>&nbsp;</> : char}
        </motion.span>
      ))}
    </span>
  );
}

function TextStaggerHoverHidden({
  animation,
  children,
  className = "",
  transition,
}: {
  animation: string;
  children: React.ReactNode;
  className?: string;
  transition?: any;
}) {
  const { characters, characterCount } = splitText(String(children));
  const variants = useAnimationVariants(animation);
  const ctx = useHoverCtx();
  const isMouseIn = ctx?.isMouseIn ?? false;
  return (
    <span className={cn("inline-block absolute left-0 top-0 text-nowrap", className)}>
      {characters.map((char, i) => (
        <motion.span
          key={`h-${i}`}
          className="inline-block"
          variants={variants}
          animate={isMouseIn ? "visible" : "hidden"}
          transition={{
            delay: setStaggerDirection({ totalItems: characterCount, index: i }),
            ease: [0.22, 1, 0.36, 1],
            duration: 0.35,
            ...transition,
          }}
        >
          {char === " " ? <>&nbsp;</> : char}
        </motion.span>
      ))}
    </span>
  );
}

// --- Nav Data ---
const navLinks = [
  { name: "About",   href: "#about-section",   sectionId: "about-section"   },
  { name: "Skill",   href: "#skills-section",  sectionId: "skills-section"  },
  { name: "Work",    href: "#projects-section", sectionId: "projects-section" },
  { name: "Contact", href: "#contact-section", sectionId: "contact-section" },
];


// --- Main Navigation ---
export function Navigation() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isVisible, setIsVisible]         = useState(true);
  const [isOpen, setIsOpen]               = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);

  // Smart auto-hide: hide on scroll down, reveal on scroll up
  useEffect(() => {
    let prevScrollY = window.scrollY;

    const handleScroll = () => {
      const curr = window.scrollY;
      const diff = curr - prevScrollY;

      // Only react if scroll delta exceeds jitter threshold
      if (Math.abs(diff) > 10) {
        setIsScrolled(curr > 60);
        // Always show when near the top, hide when scrolling down
        setIsVisible(curr < 60 || diff < 0);
        prevScrollY = curr;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Sort by intersectionRatio so the most-visible section always wins
  useEffect(() => {
    const sections = navLinks.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          setActiveSection("#" + visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen((v) => !v);

  return (
    <>
      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[99] md:hidden"
            style={{ background: "rgba(4, 4, 6, 0.97)" }}
          >
            {/* Decorative grid lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />

            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden opacity-20">
              <div
                className="absolute top-0 right-0 w-full h-full"
                style={{
                  background:
                    "radial-gradient(circle at top right, rgba(255,255,255,0.3), transparent 70%)",
                }}
              />
            </div>

            {/* Nav items */}
            <div className="flex flex-col justify-center h-full px-8 pb-16">
              <div className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group"
                  >
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-baseline gap-4 py-3 border-b border-white/[0.06] no-underline"
                    >
                      <span className="text-white/20 font-mono text-xs tracking-wider mt-1">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="text-white font-playfair text-5xl sm:text-6xl tracking-tight leading-none transition-all duration-500 group-hover:tracking-wider group-hover:text-white/60"
                        style={{ fontWeight: 300 }}
                      >
                        {link.name}
                      </span>
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Bottom label */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="absolute bottom-10 left-8 text-white/20 text-[10px] tracking-[0.35em] uppercase font-mono"
              >
                sadia.dev
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Header ── */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          isScrolled ? "py-3 px-4 md:px-8" : "py-0 px-0"
        )}
      >
        {/* Inner pill */}
        <div
          className={cn(
            "mx-auto transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] border",
            isScrolled
              ? "max-w-5xl glass-strong rounded-full px-6 py-1 shadow-lg border-white/20"
              : "max-w-7xl px-6 sm:px-10 md:px-16 lg:px-24 rounded-none border-transparent"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
              isScrolled ? "h-11" : "h-[88px]"
            )}
          >
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="group flex items-center no-underline"
            >
              <span
                className="text-white font-playfair text-xl font-light tracking-[0.4em] transition-all duration-300 group-hover:tracking-[0.5em] group-hover:opacity-70"
                style={{ fontVariant: "small-caps" }}
              >
                sadia
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className="relative text-white font-playfair text-[13px] tracking-[0.18em] uppercase no-underline font-medium"
                  >
                    <TextStaggerHover>
                      <TextStaggerHoverActive
                        animation="top"
                        className={cn(
                          "transition-opacity duration-300",
                          isActive ? "opacity-100" : "opacity-50"
                        )}
                      >
                        {link.name}
                      </TextStaggerHoverActive>
                      <TextStaggerHoverHidden animation="bottom">
                        {link.name}
                      </TextStaggerHoverHidden>
                    </TextStaggerHover>

                    {/* Active dot */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-dot"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[3px] h-[3px] rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className="md:hidden flex items-center justify-center w-9 h-9 relative focus:outline-none z-[101]"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-[1.5px] bg-white rounded-full origin-left"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block h-[1.5px] bg-white rounded-full w-3/4"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="block h-[1.5px] bg-white rounded-full origin-left"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
}