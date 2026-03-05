"use client";

import { useState, useRef, useEffect } from "react";

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

interface CardItemProps {
  stack: TechStack;
  isExpanded: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
  width: string;
  isMobile: boolean;
}

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

/* ─── Card ─────────────────────────────────────────────────────────────────── */

const CardItem = ({ stack, isExpanded, onMouseEnter, onClick, width, isMobile }: CardItemProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState<SpotlightState>({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setSpotlight((s) => ({ ...s, opacity: 1 }));
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setSpotlight((s) => ({ ...s, opacity: 0 }));
  };

  /* ── Mobile accordion card ── */
  if (isMobile) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className="relative cursor-pointer overflow-hidden rounded-2xl"
        style={{ width: "100%", background: "#080808", border: "none" }}
      >
        {/* Static gradients — animation removed */}
        <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.9, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.7, pointerEvents: "none" }} />
        {/* Grain */}
        <div style={{ position: "absolute", inset: "-50%", width: "200%", height: "200%", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "150px 150px", opacity: 0.4, pointerEvents: "none", mixBlendMode: "screen" }} />

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
          <div style={{
            width: 22, height: 22,
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
            transition: "transform 0.35s ease, border-color 0.35s ease",
            transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
            ...(isExpanded && { borderColor: "rgba(255,255,255,0.35)" }),
          }}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
              <line x1="4.5" y1="0.5" x2="4.5" y2="8.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
              <line x1="0.5" y1="4.5" x2="8.5" y2="4.5" stroke="rgba(255,255,255,0.55)" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* Expandable skills */}
        <div style={{ overflow: "hidden", maxHeight: isExpanded ? "220px" : "0", transition: "max-height 0.45s cubic-bezier(0.4,0,0.2,1)", position: "relative", zIndex: 1 }}>
          <div style={{ padding: "1rem 1.4rem 1.3rem 1.4rem", display: "flex", flexWrap: "wrap" as const, gap: "0.45rem" }}>
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
                  transition: `opacity 0.3s ease ${0.1 + i * 0.06}s`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Desktop card ── */
  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer overflow-hidden rounded-3xl"
      style={{
        width,
        height: "24rem",
        background: "#080808",
        border: "none",
        flexShrink: 0,
        transition: "width 0.5s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Static gradients — animation removed */}
      <div style={{ position: "absolute", inset: 0, background: stack.gradient, opacity: 0.8, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, background: stack.accentGradient, opacity: 0.6, pointerEvents: "none" }} />
      {/* Grain texture */}
      <div style={{ position: "absolute", inset: "-50%", width: "200%", height: "200%", backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`, backgroundRepeat: "repeat", backgroundSize: "150px 150px", opacity: 0.4, pointerEvents: "none", mixBlendMode: "screen" }} />
      {/* Mouse spotlight */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle 160px at ${spotlight.x}% ${spotlight.y}%, rgba(255,255,255,0.06) 0%, transparent 80%)`, opacity: spotlight.opacity, transition: "opacity 0.3s ease", pointerEvents: "none" }} />
      {/* Shimmer sweep */}
      <div style={{
        position: "absolute", top: 0, left: "-10%",
        width: "60%", height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)",
        transform: isHovered ? "translateX(300%) skewX(-15deg)" : "translateX(-200%) skewX(-15deg)",
        transition: isHovered ? "transform 2s ease" : "none",
        pointerEvents: "none",
      }} />

      {/* Card content */}
      <div className="relative z-10 h-full flex flex-col justify-between" style={{ padding: "2rem 1.5rem", color: "white" }}>
        <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.3)" }}>
          {stack.number}
        </span>

        {/* Collapsed label — vertical */}
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-90deg)", whiteSpace: "nowrap", opacity: isExpanded ? 0 : 1, transition: "opacity 0.2s ease", pointerEvents: "none" }}>
          <span style={{ fontFamily: "'Georgia', serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.55)" }}>
            {stack.category}
          </span>
        </div>

        {/* Expanded content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" as const, justifyContent: "center", gap: "1.5rem", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateX(0)" : "translateX(-10px)", transition: "opacity 0.35s ease 0.15s, transform 0.35s ease 0.15s" }}>
          <div>
            <p style={{ fontFamily: "'Courier New', monospace", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", marginBottom: "0.4rem" }}>
              {stack.subtitle}
            </p>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.1, color: "rgba(255,255,255,0.93)", letterSpacing: "-0.02em" }}>
              {stack.category}
            </h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.45rem" }}>
            {stack.skills.map((skill: string, i: number) => (
              <div key={skill} style={{ display: "flex", alignItems: "center", gap: "0.6rem", opacity: isExpanded ? 1 : 0, transform: isExpanded ? "translateX(0)" : "translateX(-8px)", transition: `opacity 0.3s ease ${0.2 + i * 0.07}s, transform 0.3s ease ${0.2 + i * 0.07}s` }}>
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
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: "0.52rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase" as const }}>
            Stack {stack.number}
          </span>
        </div>
      </div>
    </div>
  );
};

/* ─── Root ─────────────────────────────────────────────────────────────────── */

const ExpandOnHover = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [expandedIndex, setExpandedIndex] = useState<number>(() =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : -1
  );

  useEffect(() => {
    const check = () => {
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

  const handleMobileClick = (idx: number) => {
    setExpandedIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <div className="w-full min-h-screen">
      {/* <style> block with drift keyframes removed entirely */}

      {isMobile ? (
        <div style={{ padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {techStacks.map((stack, idx) => (
            <CardItem
              key={stack.id}
              stack={stack}
              isExpanded={expandedIndex === idx + 1}
              onMouseEnter={() => {}}
              onClick={() => handleMobileClick(idx + 1)}
              width="100%"
              isMobile={true}
            />
          ))}
        </div>
      ) : (
        <div className="relative grid min-h-screen grid-cols-1 items-center justify-center p-2 transition-all duration-300 ease-in-out lg:flex w-full">
          <div className="w-full h-full overflow-hidden rounded-3xl">
            <div className="flex h-full w-full items-center justify-center overflow-hidden">
              <div className="relative w-full max-w-6xl px-5">
                <div className="flex w-full items-center justify-center gap-1">
                  {techStacks.map((stack, idx) => (
                    <CardItem
                      key={stack.id}
                      stack={stack}
                      isExpanded={expandedIndex === idx + 1}
                      onMouseEnter={() => setExpandedIndex(idx + 1)}
                      onClick={() => {}}
                      width={getCardWidth(idx + 1)}
                      isMobile={false}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandOnHover;