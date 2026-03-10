"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface TechStack {
  id: number;
  category: string;
  subtitle: string;
  number: string;
  skills: string[];
  gradient: string;
  accentGradient: string;
}

interface SpotlightState {
  x: number;
  y: number;
  opacity: number;
}

interface MobileCardProps {
  stack: TechStack;
  isExpanded: boolean;
  onClick: () => void;
}

interface DesktopCardProps {
  stack: TechStack;
  isExpanded: boolean;
  onMouseEnter: () => void;
  width: string;
}

interface FloatShapeProps {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  rotate?: number;
  opacity?: number;
}

interface BgStarProps {
  x: string;
  y: string;
  size?: number;
  opacity?: number;
  delay?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const techStacks: TechStack[] = [
  {
    id: 1,
    category: "Frontend",
    subtitle: "Development",
    number: "01",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    gradient: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.07) 0%, transparent 55%)",
    accentGradient: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.05) 0%, transparent 45%)",
  },
  {
    id: 2,
    category: "Backend",
    subtitle: "Development",
    number: "02",
    skills: ["Node.js", "Express", "PostgreSQL", "Prisma", "REST & GraphQL"],
    gradient: "radial-gradient(ellipse at 60% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)",
    accentGradient: "radial-gradient(ellipse at 20% 80%, rgba(255,255,255,0.04) 0%, transparent 40%)",
  },
  {
    id: 3,
    category: "UI/UX",
    subtitle: "Design",
    number: "03",
    skills: ["Figma", "Wireframing", "Design Systems", "Accessibility", "WCAG"],
    gradient: "radial-gradient(ellipse at 50% 70%, rgba(255,255,255,0.08) 0%, transparent 45%)",
    accentGradient: "radial-gradient(ellipse at 80% 10%, rgba(255,255,255,0.04) 0%, transparent 35%)",
  },
  {
    id: 4,
    category: "DevOps",
    subtitle: "& Tools",
    number: "04",
    skills: ["Git", "Docker", "Vercel", "CI/CD", "Linux"],
    gradient: "radial-gradient(ellipse at 20% 40%, rgba(255,255,255,0.06) 0%, transparent 50%)",
    accentGradient: "radial-gradient(ellipse at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 40%)",
  },
  {
    id: 5,
    category: "Currently",
    subtitle: "Learning",
    number: "05",
    skills: ["Three.js", "WebGL", "Rust", "AI/ML Integration"],
    gradient: "radial-gradient(ellipse at 40% 60%, rgba(255,255,255,0.09) 0%, transparent 45%)",
    accentGradient: "radial-gradient(ellipse at 60% 20%, rgba(255,255,255,0.04) 0%, transparent 35%)",
  },
];

/* ─── Mobile Card ──────────────────────────────────────────────────────────── */

const MobileCard: React.FC<MobileCardProps> = ({ stack, isExpanded, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width: "100%",
        background: "#080808",
        borderRadius: "1rem",
        overflow: "hidden",
        cursor: "pointer",
        position: "relative",
      }}
    >
      {/* Bg gradients */}
      <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.9, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.7, pointerEvents: "none" }} />
      {/* Grain */}
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "150px 150px",
        opacity: 0.4, pointerEvents: "none", mixBlendMode: "screen",
      }} />

      {/* Header row */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.4rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>
            {stack.number}
          </span>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>
            {stack.category}{" "}
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>{stack.subtitle}</span>
          </span>
        </div>

        {/* +/× icon */}
        <div style={{
          width: 22, height: 22,
          border: `1px solid ${isExpanded ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)"}`,
          borderRadius: "50%",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          transition: "transform 0.35s ease, border-color 0.35s ease",
          transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
        }}>
          <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
            <line x1="4.5" y1="0.5" x2="4.5" y2="8.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
            <line x1="0.5" y1="4.5" x2="8.5" y2="4.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>

      {/*
        ── Smooth accordion via CSS grid rows trick ──────────────────────────
        grid-template-rows: 0fr → 1fr  animates the actual track size,
        giving a physically correct squish with no max-height clamping.
        The inner div needs overflow:hidden + min-height:0 to participate.
      */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: isExpanded ? "1fr" : "0fr",
          transition: "grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ overflow: "hidden", minHeight: 0 }}>
          <div style={{ padding: "0.75rem 1.4rem 1.3rem 1.4rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
            {stack.skills.map((skill: string, i: number) => (
              <span
                key={skill}
                style={{
                  fontFamily: "'Courier New', monospace",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.6)",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  borderRadius: "5px",
                  padding: "0.3rem 0.65rem",
                  letterSpacing: "0.04em",
                  opacity: isExpanded ? 1 : 0,
                  transition: `opacity 0.25s ease ${0.12 + i * 0.05}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Desktop Card ─────────────────────────────────────────────────────────── */

const DesktopCard: React.FC<DesktopCardProps> = ({ stack, isExpanded, onMouseEnter, width }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  return (
    <div
      ref={cardRef}
      style={{
        width,
        height: "29rem",
        background: "#080808",
        borderRadius: "1.5rem",
        flexShrink: 0,
        transition: "width 0.5s ease",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovered(true);
        setSpotlight((s) => ({ ...s, opacity: 1 }));
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setSpotlight((s) => ({ ...s, opacity: 0 }));
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.8, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.6, pointerEvents: "none" }} />
      <div style={{
        position: "absolute", inset: "-50%", width: "200%", height: "200%",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat", backgroundSize: "150px 150px",
        opacity: 0.4, pointerEvents: "none", mixBlendMode: "screen",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle 160px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.06) 0%, transparent 80%)`,
        opacity: spotlight.opacity, transition: "opacity 0.3s ease", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, left: "-10%", width: "60%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        transform: isHovered ? "translateX(300%) skewX(-15deg)" : "translateX(-200%) skewX(-15deg)",
        transition: isHovered ? "transform 3s ease" : "none",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2rem 1.5rem", color: "white" }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>
          {stack.number}
        </span>

        {/* Collapsed vertical label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          whiteSpace: "nowrap",
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)" }}>
            {stack.category}
          </span>
        </div>

        {/* Expanded content */}
        <div style={{
          flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "1.5rem",
          opacity: isExpanded ? 1 : 0,
          transform: isExpanded ? "translateX(0)" : "translateX(-10px)",
          transition: "opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s",
        }}>
          <div>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>
              {stack.subtitle}
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.1, color: "rgba(255,255,255,0.93)", letterSpacing: "-0.02em" }}>
              {stack.category}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            {stack.skills.map((skill: string, i: number) => (
              <div
                key={skill}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 0.3s ease ${0.2 + i * 0.07}s, transform 0.3s ease ${0.2 + i * 0.07}s`,
                }}
              >
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.45)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s ease 0.4s" }}>
          <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.2)" }} />
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            Stack {stack.number}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── ExpandOnHover ──────────────────────────────────────────────────────────── */

const ExpandOnHover: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [expandedIndex, setExpandedIndex] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : -1
  );

  useEffect(() => {
    const check = (): void => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setExpandedIndex((prev) => (prev === -1 ? 3 : prev));
      if (mobile) setExpandedIndex(-1);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getCardWidth = (index: number): string =>
    index === expandedIndex ? "24rem" : "5rem";

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
        {techStacks.map((stack, idx) => (
          <MobileCard
            key={stack.id}
            stack={stack}
            isExpanded={expandedIndex === idx + 1}
            onClick={() => setExpandedIndex((prev) => (prev === idx + 1 ? -1 : idx + 1))}
          />
        ))}
      </div>
    );
  }

  // ── Desktop: flat flex row, no min-h-screen, no nested h-full chains ──────
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center", paddingTop: "1rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
        {techStacks.map((stack, idx) => (
          <DesktopCard
            key={stack.id}
            stack={stack}
            isExpanded={expandedIndex === idx + 1}
            onMouseEnter={() => setExpandedIndex(idx + 1)}
            width={getCardWidth(idx + 1)}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Decorative helpers ───────────────────────────────────────────────────────

function FloatShape({
  children,
  x,
  y,
  delay = 0,
  duration = 5,
  amplitude = 10,
  rotate = 0,
  opacity = 0.18,
}: FloatShapeProps): React.ReactElement {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute", left: x, top: y,
        color: "#F2F0EB", opacity,
        userSelect: "none", pointerEvents: "none",
        fontSize: "clamp(20px, 3vw, 36px)",
        rotate,
      }}
      animate={{ y: [0, -amplitude, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function BgStar({ x, y, size = 40, opacity = 0.08, delay = 0 }: BgStarProps): React.ReactElement {
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: "absolute", left: x, top: y, pointerEvents: "none", userSelect: "none", opacity }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 18 + delay * 4, delay, repeat: Infinity, ease: "linear" }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2 L21.5 18 L36 20 L21.5 22 L20 38 L18.5 22 L4 20 L18.5 18 Z" fill="#F2F0EB" />
        <path d="M20 8 L21 18.5 L30 20 L21 21.5 L20 32 L19 21.5 L10 20 L19 18.5 Z" fill="#F2F0EB" opacity="0.5" transform="rotate(45 20 20)" />
      </svg>
    </motion.div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────────── */

export default function SkillsSection(): React.ReactElement {
  const sectionRef = useRef<HTMLElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".headline-line", { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: "power4.inOut",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" },
      });
      gsap.fromTo(".left-content", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" },
      });
      gsap.set(".skill-card", { willChange: "transform, opacity" });
      gsap.fromTo(".skill-card", { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, ease: "expo.out", force3D: true,
        scrollTrigger: { trigger: rightRef.current, start: "top 95%", toggleActions: "play none none reverse" },
        onComplete: () => gsap.set(".skill-card", { willChange: "auto" }),
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills-section"
      ref={sectionRef}
      className="w-full bg-[#0A0A0A] px-6 sm:px-10 md:px-16 lg:px-24 py-20 sm:py-28 lg:py-36 relative overflow-x-clip"
    >
      {/* Dot grid */}
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.025, backgroundImage: "radial-gradient(circle at 1px 1px, #F2F0EB 1px, transparent 0)", backgroundSize: "28px 28px" }} />

      <BgStar x="6%" y="16%" size={52} opacity={0.1} delay={0} />
      <BgStar x="88%" y="8%" size={38} opacity={0.08} delay={1.5} />
      <BgStar x="78%" y="78%" size={46} opacity={0.07} delay={0.8} />
      <BgStar x="3%" y="68%" size={30} opacity={0.07} delay={2} />

      <FloatShape x="32%" y="20%" delay={0} duration={5.5} amplitude={12} opacity={0.22} rotate={0}>✳</FloatShape>
      <FloatShape x="15%" y="82%" delay={0.6} duration={5} amplitude={10} opacity={0.16} rotate={-10}>◆</FloatShape>
      <FloatShape x="90%" y="20%" delay={1.8} duration={7} amplitude={14} opacity={0.15} rotate={30}>✦</FloatShape>
      <FloatShape x="70%" y="88%" delay={0.3} duration={5.8} amplitude={9} opacity={0.2} rotate={-5}>✳</FloatShape>
      <FloatShape x="2%" y="45%" delay={0.9} duration={5.2} amplitude={8} opacity={0.18} rotate={-20}>◆</FloatShape>
      <FloatShape x="60%" y="6%" delay={2.1} duration={7.5} amplitude={7} opacity={0.13} rotate={10}>✦</FloatShape>

      {/* Top label row */}
      <div className="mb-14 sm:mb-20 relative">
        <div className="flex items-center gap-5">
          <span
            className="text-[10px] sm:text-xs tracking-[0.3em] text-white/30 uppercase font-medium"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            SKILLS — THAT MATTERS
          </span>
          <div className="headline-line flex-1 h-px bg-white/10 origin-left" />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-16 lg:gap-24 items-start relative">
        {/* LEFT */}
        <div className="left-content lg:sticky lg:top-24">
          <h2
            className="text-[#F2F0EB] text-5xl sm:text-5xl lg:text-6xl xl:text-6xl font-black tracking-tighter leading-[0.88] mb-8 sm:mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            SKILLS
          </h2>
        </div>
      </div>

      {/* ── Cards row — centred across full section width ── */}
      <div className="mt-10 flex justify-center" ref={rightRef}>
        <ExpandOnHover />
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');`}</style>
    </section>
  );
}