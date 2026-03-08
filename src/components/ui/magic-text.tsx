import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Color token ───────────────────────────────────────────────────────────────
const PAPER = "#F2F0EB";

// ─── Oval pill highlight for "full-stack developer" ───────────────────────────
// BUG 1 FIX: Added `inkColor` prop — previously `INK` was referenced from
// the enclosing EditorialAboutText scope but these are module-level functions,
// so INK was undefined and would cause a runtime crash.
function Pill({ children, inkColor }: { children: React.ReactNode; inkColor: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        border: `1.8px solid ${inkColor}`,
        borderRadius: "999px",
        padding: "2px 14px 4px",
        margin: "0 4px",
        fontStyle: "italic",
        letterSpacing: "-0.01em",
        position: "relative",
        verticalAlign: "middle",
      }}
    >
      <SmallStar />
      {children}
      <SmallStar />
    </span>
  );
}

// ─── Inline small star (inside pill) ─────────────────────────────────────────
function SmallStar() {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: "0.65em",
        lineHeight: 1,
        opacity: 0.75,
        flexShrink: 0,
      }}
    >
      ✦
    </span>
  );
}

// ─── Burst star (8-point compass, like the image) ────────────────────────────
// BUG 1 FIX: Added `inkColor` prop — previously `INK` was referenced but undefined.
function BurstStar({
  size = 20,
  opacity = 0.55,
  inkColor,
}: {
  size?: number;
  opacity?: number;
  inkColor: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: inkColor,
        verticalAlign: "middle",
        margin: "0 2px",
      }}
    >
      ✳
    </span>
  );
}

// ─── Cross / plus shape ───────────────────────────────────────────────────────
// BUG 1 FIX: Added `inkColor` prop — previously `INK` was referenced but undefined.
function CrossShape({
  size = 16,
  opacity = 0.45,
  inkColor,
}: {
  size?: number;
  opacity?: number;
  inkColor: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: inkColor,
        verticalAlign: "middle",
        margin: "0 3px",
      }}
    >
      ✚
    </span>
  );
}

// ─── Diamond dot ──────────────────────────────────────────────────────────────
// BUG 1 FIX: Added `inkColor` prop — previously `INK` was referenced but undefined.
function Diamond({
  size = 12,
  opacity = 0.4,
  inkColor,
}: {
  size?: number;
  opacity?: number;
  inkColor: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: inkColor,
        verticalAlign: "middle",
        margin: "0 3px",
      }}
    >
      ◆
    </span>
  );
}

// ─── Email link ──────────────────────────────────────────────────────────────
// BUG 1 FIX: Added `inkColor` prop — previously `INK` was referenced but undefined.
function EmailLink({
  text,
  email = "sadiaakter78bd@gmail.com",
  inkColor,
}: {
  text: string;
  email?: string;
  inkColor: string;
}) {
  return (
    <motion.a
      href={`mailto:${email}`}
      style={{
        color: inkColor,
        textDecoration: "none",
        borderBottom: `1.5px solid ${inkColor}`,
        paddingBottom: "1px",
        fontStyle: "italic",
      }}
      whileHover={{ opacity: 0.6 }}
      transition={{ duration: 0.2 }}
    >
      {text}
    </motion.a>
  );
}

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.span
      ref={ref}
      style={{ display: "block" }}
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  );
}

// ─── Main editorial text component ───────────────────────────────────────────
export function EditorialAboutText({
  inkColor = "#0A0A0A",
  bodyOpacity = 0.82,
}: {
  inkColor?: string;
  bodyOpacity?: number;
}) {
  const INK = inkColor;

  const serif: React.CSSProperties = {
    color: INK,
    margin: 0,
  };

  // BUG 2 FIX: `bodyOpacity` prop was accepted but then the value was
  // hardcoded as 0.82, silently ignoring the prop. Now correctly uses
  // the prop value so callers can control body text opacity.
  const body: React.CSSProperties = {
    ...serif,
    fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)",
    lineHeight: 1.72,
    fontWeight: 400,
    opacity: bodyOpacity,
    letterSpacing: "0.005em",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.15rem",
        color: INK,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── Headline block ── */}
      <FadeIn delay={0}>
        <p
          style={{
            ...serif,
            fontSize: "clamp(1.4rem, 3.5vw, 1.85rem)",
            fontWeight: 700,
            lineHeight: 1.35,
            letterSpacing: "-0.025em",
          }}
        >
          Hi, I'm Sadia, a{" "}
          <Pill inkColor={INK}>full-stack developer</Pill>
          {" "}based in Bangladesh.
        </p>
      </FadeIn>

      {/* ── Divider ornament ── */}
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: 0.5 }}>
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.25 }} />
          <BurstStar size={14} opacity={0.6} inkColor={INK} />
          <CrossShape size={11} opacity={0.5} inkColor={INK} />
          <Diamond size={10} opacity={0.5} inkColor={INK} />
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.25 }} />
        </div>
      </FadeIn>

      {/* ── Para 1 ── */}
      <FadeIn delay={0.16}>
        <p style={body}>
          I enjoy building clean, performant, and user-focused web applications that turn complex
          ideas into simple, intuitive experiences.
        </p>
      </FadeIn>

      {/* ── Para 2 ── */}
      <FadeIn delay={0.24}>
        <p style={body}>
          My work sits at the intersection of thoughtful UI and solid backend architecture. Lately
          I've been leaning into AI-assisted workflows to close the gap between idea and shipped
          product, faster than ever before.
        </p>
      </FadeIn>

      {/* ── Divider ornament 2 ── */}
      <FadeIn delay={0.38}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.2 }} />
          <Diamond size={10} opacity={0.45} inkColor={INK} />
          <BurstStar size={14} opacity={0.55} inkColor={INK} />
          <Diamond size={10} opacity={0.45} inkColor={INK} />
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.2 }} />
        </div>
      </FadeIn>

      {/* ── CTA para ── */}
      <FadeIn delay={0.44}>
        <p style={body}>
          If you'd like to get in touch, feel free to send me{" "}
          <EmailLink text="an email" inkColor={INK} />
          . I'm always open to collaborations, ideas, and interesting projects.
        </p>
      </FadeIn>

      {/* ── Footer accent row ── */}
      <FadeIn delay={0.5}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
          <BurstStar size={18} opacity={0.35} inkColor={INK} />
          <CrossShape size={13} opacity={0.3} inkColor={INK} />
          <Diamond size={12} opacity={0.3} inkColor={INK} />
          <BurstStar size={13} opacity={0.3} inkColor={INK} />
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Dev preview ─────────────────────────────────────────────────────────────
export default function Preview() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0A0A0A",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: PAPER,
          borderRadius: "16px",
          padding: "clamp(2rem, 5vw, 3rem)",
          maxWidth: "560px",
          width: "100%",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <EditorialAboutText />
      </div>
    </div>
  );
}