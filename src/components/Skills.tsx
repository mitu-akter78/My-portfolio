"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ─────────────────────────────────────────────────────────────────────

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

interface TechLogoProps {
  x: string;
  y: string;
  size?: number;
  peakOpacity?: number;   // max opacity at peak of pulse
  delay?: number;          // stagger delay so logos pop at different times
  cycleDuration?: number;  // full loop length in seconds
  logo: LogoKey;
}

type LogoKey =
  | "react" | "typescript" | "nodejs" | "docker" | "figma"
  | "git" | "nextjs" | "tailwind" | "postgresql" | "threejs"
  | "rust" | "vercel";

// ─── Logo SVGs ─────────────────────────────────────────────────────────────────

const logoSVGs: Record<LogoKey, (size: number) => React.ReactElement> = {
  react: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="50" rx="46" ry="18" stroke="currentColor" strokeWidth="4" />
      <ellipse cx="50" cy="50" rx="46" ry="18" stroke="currentColor" strokeWidth="4" transform="rotate(60 50 50)" />
      <ellipse cx="50" cy="50" rx="46" ry="18" stroke="currentColor" strokeWidth="4" transform="rotate(120 50 50)" />
      <circle cx="50" cy="50" r="6" fill="currentColor" />
    </svg>
  ),
  typescript: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <rect x="8" y="8" width="84" height="84" rx="10" stroke="currentColor" strokeWidth="4" />
      <path d="M22 40 H78 M50 40 V80" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <path d="M60 58 C60 52 68 52 68 58 C68 66 58 66 58 74 H70" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  nodejs: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M50 10 L88 32 L88 68 L50 90 L12 68 L12 32 Z" stroke="currentColor" strokeWidth="4" />
      <path d="M35 37 C35 28 65 28 65 37 C65 47 50 47 50 47 C50 47 65 47 65 57 C65 67 35 67 35 63" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  docker: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <rect x="14" y="35" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <rect x="30" y="35" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <rect x="46" y="35" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <rect x="30" y="21" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <rect x="46" y="21" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="3.5" />
      <path d="M8 53 C8 53 12 42 30 45 C32 36 40 35 52 38 C60 28 75 32 78 40 C88 40 94 48 90 56 C88 62 80 64 66 64 L20 64 C12 64 6 60 8 53Z" stroke="currentColor" strokeWidth="3.5" />
    </svg>
  ),
  figma: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <rect x="26" y="10" width="24" height="24" rx="12" stroke="currentColor" strokeWidth="4" />
      <rect x="50" y="10" width="24" height="24" rx="12" stroke="currentColor" strokeWidth="4" />
      <rect x="26" y="34" width="24" height="24" stroke="currentColor" strokeWidth="4" />
      <rect x="26" y="58" width="24" height="24" stroke="currentColor" strokeWidth="4" />
      <circle cx="62" cy="46" r="12" stroke="currentColor" strokeWidth="4" />
    </svg>
  ),
  git: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <rect x="10" y="10" width="80" height="80" rx="16" stroke="currentColor" strokeWidth="4" />
      <circle cx="33" cy="38" r="7" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="33" cy="62" r="7" stroke="currentColor" strokeWidth="3.5" />
      <circle cx="67" cy="38" r="7" stroke="currentColor" strokeWidth="3.5" />
      <path d="M33 45 L33 55" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M33 45 C33 54 40 57 60 45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  ),
  nextjs: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="4" />
      <path d="M32 68 L32 32 L72 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M55 52 L72 32" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  tailwind: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M20 50 C20 35 28 28 42 31 C46 20 54 14 68 17 C62 31 58 38 44 37 C40 48 36 54 20 50Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <path d="M44 68 C44 53 52 46 66 49 C70 38 78 32 92 35 C86 49 82 56 68 55 C64 66 60 72 44 68Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  ),
  postgresql: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <ellipse cx="50" cy="28" rx="32" ry="14" stroke="currentColor" strokeWidth="4" />
      <path d="M18 28 L18 58 M82 28 L82 58" stroke="currentColor" strokeWidth="4" />
      <ellipse cx="50" cy="58" rx="32" ry="14" stroke="currentColor" strokeWidth="4" />
      <ellipse cx="50" cy="43" rx="32" ry="14" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" />
      <path d="M65 58 L65 80 C65 86 56 88 50 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  ),
  threejs: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <polygon points="50,10 92,80 8,80" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      <polygon points="50,32 74,74 26,74" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <line x1="50" y1="10" x2="50" y2="32" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="80" x2="26" y2="74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <line x1="92" y1="80" x2="74" y2="74" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  ),
  rust: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <circle cx="50" cy="50" r="38" stroke="currentColor" strokeWidth="4" />
      <circle cx="50" cy="50" r="10" stroke="currentColor" strokeWidth="3.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={i}
          x1={50 + 10 * Math.cos((angle * Math.PI) / 180)}
          y1={50 + 10 * Math.sin((angle * Math.PI) / 180)}
          x2={50 + 28 * Math.cos((angle * Math.PI) / 180)}
          y2={50 + 28 * Math.sin((angle * Math.PI) / 180)}
          stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"
        />
      ))}
      <polygon points="18,38 24,44 18,50" fill="currentColor" />
      <polygon points="82,50 76,44 82,38" fill="currentColor" />
    </svg>
  ),
  vercel: (s) => (
    <svg width={s} height={s} viewBox="0 0 100 100" fill="none">
      <path d="M50 15 L88 80 L12 80 Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  ),
};

// ─── TechLogo ──────────────────────────────────────────────────────────────────
// Pulse / pop animation: each logo blooms in from blur+scale, holds, dissolves.
// cycleDuration = total loop length. The visible window is ~30% of that,
// so at any moment only a handful of logos are lit — feels like constellations
// flickering on and off.

const TechLogo: React.FC<TechLogoProps> = ({
  x, y, size = 48, peakOpacity = 0.055, delay = 0,
  cycleDuration = 12, logo,
}) => {
  // keyframe proportions: 0 → in at 12% → peak at 18% → hold to 40% → out at 55% → dark rest
  const times = [0, 0.12, 0.18, 0.40, 0.55, 1];

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        left: x,
        top: y,
        pointerEvents: "none",
        userSelect: "none",
        color: "#F2F0EB",
        originX: "50%",
        originY: "50%",
      }}
      animate={{
        opacity: [0,              peakOpacity * 0.4, peakOpacity,   peakOpacity,   0,             0            ],
        scale:   [0.65,           1.08,              1.0,           0.96,          0.7,            0.65         ],
        filter:  ["blur(4px)",    "blur(1px)",       "blur(0px)",   "blur(0.5px)", "blur(3.5px)",  "blur(4px)"  ],
      }}
      transition={{
        duration: cycleDuration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
        times,
      }}
    >
      {logoSVGs[logo](size)}
    </motion.div>
  );
};

// ─── Data ──────────────────────────────────────────────────────────────────────

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

// ─── Mobile Card ───────────────────────────────────────────────────────────────

const MobileCard: React.FC<MobileCardProps> = ({ stack, isExpanded, onClick }) => (
  <div
    onClick={onClick}
    style={{
      width: "100%",
      background: "#080808",
      borderRadius: "1rem",
      overflow: "hidden",
      cursor: "pointer",
      position: "relative",
      border: "1px solid rgba(255,255,255,0.06)",
    }}
  >
    <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.9, pointerEvents: "none" }} />
    <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.7, pointerEvents: "none" }} />
    {/* Noise */}
    <div style={{
      position: "absolute", inset: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
      backgroundSize: "180px 180px",
      opacity: 0.35,
      mixBlendMode: "screen",
      pointerEvents: "none",
    }} />

    <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1.1rem 1.4rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.6rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.22)" }}>
          {stack.number}
        </span>
        <span style={{ fontFamily: "'Georgia', serif", fontSize: "1rem", fontWeight: 400, color: "rgba(255,255,255,0.85)", letterSpacing: "-0.01em" }}>
          {stack.category}{" "}
          <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.88rem" }}>{stack.subtitle}</span>
        </span>
      </div>
      <div style={{
        width: 22, height: 22,
        border: `1px solid ${isExpanded ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.14)"}`,
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

    <div style={{
      display: "grid",
      gridTemplateRows: isExpanded ? "1fr" : "0fr",
      transition: "grid-template-rows 0.42s cubic-bezier(0.4,0,0.2,1)",
      position: "relative", zIndex: 1,
    }}>
      <div style={{ overflow: "hidden", minHeight: 0 }}>
        <div style={{ padding: "0.75rem 1.4rem 1.3rem", display: "flex", flexWrap: "wrap", gap: "0.45rem" }}>
          {stack.skills.map((skill, i) => (
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

// ─── Desktop Card ──────────────────────────────────────────────────────────────

const DesktopCard: React.FC<DesktopCardProps> = ({ stack, isExpanded, onMouseEnter, width }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
        background: "#040404",
        borderRadius: "1.5rem",
        flexShrink: 0,
        transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => { setIsHovered(true); setSpotlight(s => ({ ...s, opacity: 1 })); onMouseEnter(); }}
      onMouseLeave={() => { setIsHovered(false); setSpotlight(s => ({ ...s, opacity: 0 })); }}
    >
      <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.6, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.6, pointerEvents: "none" }} />
      {/* Noise layer */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 180px",
        opacity: 0.35,
        mixBlendMode: "screen",
        pointerEvents: "none",
      }} />
      {/* Spotlight */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle 160px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.05) 0%, transparent 80%)`,
        opacity: spotlight.opacity, transition: "opacity 0.3s ease", pointerEvents: "none",
      }} />
      {/* Sheen */}
      <div style={{
        position: "absolute", top: 0, left: "-10%", width: "55%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.035), transparent)",
        transform: isHovered ? "translateX(360%) skewX(-15deg)" : "translateX(-250%) skewX(-15deg)",
        transition: isHovered ? "transform 3.2s ease" : "none",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "2rem 1.5rem", color: "white" }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.62rem", letterSpacing: "0.18em", color: "rgba(255,255,255,0.25)" }}>
          {stack.number}
        </span>

        {/* Collapsed label */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%) rotate(-90deg)",
          whiteSpace: "nowrap",
          opacity: isExpanded ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "0.72rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
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
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.55rem", letterSpacing: "0.32em", textTransform: "uppercase", color: "rgba(255,255,255,0.28)", marginBottom: "0.4rem" }}>
              {stack.subtitle}
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.1, color: "rgba(255,255,255,0.93)", letterSpacing: "-0.02em" }}>
              {stack.category}
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.48rem" }}>
            {stack.skills.map((skill, i) => (
              <div
                key={skill}
                style={{
                  display: "flex", alignItems: "center", gap: "0.6rem",
                  opacity: isExpanded ? 1 : 0,
                  transform: isExpanded ? "translateX(0)" : "translateX(-8px)",
                  transition: `opacity 0.3s ease ${0.2 + i * 0.07}s, transform 0.3s ease ${0.2 + i * 0.07}s`,
                }}
              >
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.4)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.78rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em" }}>
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", opacity: isExpanded ? 1 : 0, transition: "opacity 0.3s ease 0.42s" }}>
          <div style={{ width: 18, height: 1, background: "rgba(255,255,255,0.18)" }} />
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.5rem", letterSpacing: "0.28em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" }}>
            Stack {stack.number}
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── ExpandOnHover ─────────────────────────────────────────────────────────────

const ExpandOnHover: React.FC = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [expandedIndex, setExpandedIndex] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : -1
  );

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setExpandedIndex(p => p === -1 ? 3 : p);
      if (mobile) setExpandedIndex(-1);
    };
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const getCardWidth = (index: number) => index === expandedIndex ? "24rem" : "5rem";

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "100%" }}>
        {techStacks.map((stack, idx) => (
          <MobileCard
            key={stack.id}
            stack={stack}
            isExpanded={expandedIndex === idx + 1}
            onClick={() => setExpandedIndex(p => p === idx + 1 ? -1 : idx + 1)}
          />
        ))}
      </div>
    );
  }

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

// ─── Section ───────────────────────────────────────────────────────────────────

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
      {/* ── Global noise overlay ──────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          opacity: 0.45,
          mixBlendMode: "screen",
          zIndex: 0,
        }}
      />

      {/* ── Dot grid ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          opacity: 0.022,
          backgroundImage: "radial-gradient(circle at 1px 1px, #F2F0EB 1px, transparent 0)",
          backgroundSize: "28px 28px",
          zIndex: 0,
        }}
      />

      {/* ── Radial vignette gradient ──────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Tech logo background — pulse / pop constellation ──────────────── */}
      {/* Each logo has its own cycle length + delay so they feel truly random. */}
      {/* Far layer — large, very faint ghost logos for depth */}
      <TechLogo logo="react"      x="42%"  y="10%"  size={76}  peakOpacity={0.030} delay={0}    cycleDuration={18} />
      <TechLogo logo="docker"     x="62%"  y="55%"  size={88}  peakOpacity={0.028} delay={5.3}  cycleDuration={22} />
      <TechLogo logo="typescript" x="24%"  y="20%"  size={60}  peakOpacity={0.032} delay={3}  cycleDuration={16} />
      <TechLogo logo="nextjs"     x="72%"  y="18%"  size={92}  peakOpacity={0.026} delay={4.0} cycleDuration={20} />
      <TechLogo logo="rust"       x="28%"  y="68%"  size={84}  peakOpacity={0.030} delay={5.8}  cycleDuration={19} />

      {/* Mid layer — primary visible logos */}
      <TechLogo logo="react"      x="80%"   y="36%"   size={62}  peakOpacity={0.10}  delay={0}    cycleDuration={11} />
      <TechLogo logo="typescript" x="4%"   y="50%"  size={46}  peakOpacity={0.085} delay={4.2}  cycleDuration={14} />
      <TechLogo logo="nodejs"     x="10%"   y="74%"  size={84}  peakOpacity={0.09}  delay={1}  cycleDuration={12} />
      <TechLogo logo="tailwind"   x="7%"   y="30%"  size={50}  peakOpacity={0.08}  delay={1.7}  cycleDuration={15} />

      <TechLogo logo="docker"     x="88%"  y="10%"  size={58}  peakOpacity={0.10}  delay={2.6}  cycleDuration={10} />
      <TechLogo logo="git"        x="91%"  y="46%"  size={48}  peakOpacity={0.085} delay={6.0}  cycleDuration={13} />
      <TechLogo logo="vercel"     x="85%"  y="69%"  size={44}  peakOpacity={0.09}  delay={5.4}  cycleDuration={11} />
      <TechLogo logo="postgresql" x="90%"  y="82%"  size={56}  peakOpacity={0.08}  delay={0.9}  cycleDuration={16} />

      {/* Top centre scatter */}
      <TechLogo logo="figma"      x="37%"  y="30%"   size={52}  peakOpacity={0.088} delay={0} cycleDuration={12} />
      <TechLogo logo="nextjs"     x="54%"  y="5%"   size={52}  peakOpacity={0.095} delay={3.0}  cycleDuration={10} />

      {/* Bottom scatter */}
      <TechLogo logo="threejs"    x="22%"  y="87%"  size={50}  peakOpacity={0.088} delay={5.1}  cycleDuration={13} />
      <TechLogo logo="rust"       x="63%"  y="90%"  size={46}  peakOpacity={0.08}  delay={6.2} cycleDuration={11} />
      <TechLogo logo="tailwind"   x="48%"  y="85%"  size={40}  peakOpacity={0.075} delay={7.8}  cycleDuration={14} />

      {/* Mid-edge fillers */}
      <TechLogo logo="git"        x="17%"  y="52%"  size={38}  peakOpacity={0.075} delay={6.3} cycleDuration={15} />
      <TechLogo logo="figma"      x="77%"  y="56%"  size={40}  peakOpacity={0.08}  delay={2.1}  cycleDuration={12} />
      <TechLogo logo="vercel"     x="32%"  y="4%"   size={36}  peakOpacity={0.07}  delay={7.0} cycleDuration={16} />
      <TechLogo logo="postgresql" x="55%"  y="78%"  size={44}  peakOpacity={0.082} delay={6.6}  cycleDuration={11} />

      {/* ── Top label row ──────────────────────────────────────────────────── */}
      <div className="mb-14 sm:mb-20 relative" style={{ zIndex: 2 }}>
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

      {/* ── Main grid ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-16 lg:gap-24 items-start relative" style={{ zIndex: 2 }}>
        <div className="left-content lg:sticky lg:top-24">
          <h2
            className="text-[#F2F0EB] text-5xl sm:text-5xl lg:text-6xl xl:text-6xl font-black tracking-tighter leading-[0.88] mb-8 sm:mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            SKILLS
          </h2>
        </div>
      </div>

      {/* ── Cards row ─────────────────────────────────────────────────────── */}
      <div className="mt-10 flex justify-center relative" ref={rightRef} style={{ zIndex: 2 }}>
        <ExpandOnHover />
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}