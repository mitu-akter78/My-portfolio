import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// ─── Color token ───────────────────────────────────────────────────────────────
const INK = "#0A0A0A";
const PAPER = "#F2F0EB";

// ─── Oval pill highlight for "full-stack developer" ───────────────────────────
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        border: `1.8px solid ${INK}`,
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
function BurstStar({ size = 20, opacity = 0.55 }: { size?: number; opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: INK,
        verticalAlign: "middle",
        margin: "0 2px",
      }}
    >
      ✳
    </span>
  );
}

// ─── Cross / plus shape ───────────────────────────────────────────────────────
function CrossShape({ size = 16, opacity = 0.45 }: { size?: number; opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: INK,
        verticalAlign: "middle",
        margin: "0 3px",
      }}
    >
      ✚
    </span>
  );
}

// ─── Diamond dot ──────────────────────────────────────────────────────────────
function Diamond({ size = 12, opacity = 0.4 }: { size?: number; opacity?: number }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        lineHeight: 1,
        opacity,
        color: INK,
        verticalAlign: "middle",
        margin: "0 3px",
      }}
    >
      ◆
    </span>
  );
}

// ─── Email link ──────────────────────────────────────────────────────────────
function EmailLink({ text, email = "sadiaakter78bd@gmail.com" }: { text: string; email?: string }) {
  return (
    <motion.a
      href={`mailto:${email}`}
      style={{
        color: INK,
        textDecoration: "none",
        borderBottom: `1.5px solid ${INK}`,
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
export function EditorialAboutText() {
  const serif: React.CSSProperties = {
    fontFamily: "'Georgia', 'Times New Roman', serif",
    color: INK,
    margin: 0,
  };

  const body: React.CSSProperties = {
    ...serif,
    fontSize: "clamp(0.88rem, 1.6vw, 0.98rem)",
    lineHeight: 1.72,
    fontWeight: 400,
    opacity: 0.82,
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
          Hi I'm, Sadia, a{" "}
          <Pill>full-stack developer</Pill>
          {" "}based in Bangladesh.
        </p>
      </FadeIn>

      {/* ── Divider ornament ── */}
      <FadeIn delay={0.1}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px", opacity: 0.5 }}>
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.25 }} />
          <BurstStar size={14} opacity={0.6} />
          <CrossShape size={11} opacity={0.5} />
          <Diamond size={10} opacity={0.5} />
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
          I focus on bringing clarity and structure to complex systems — making them reliable,
          intuitive, and easy to evolve over time. I work fluently across modern web technologies
          and AI-assisted workflows, allowing me to prototype, refine, and ship quickly without
          sacrificing quality.
        </p>
      </FadeIn>

      {/* ── Divider ornament 2 ── */}
      <FadeIn delay={0.38}>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.2 }} />
          <Diamond size={10} opacity={0.45} />
          <BurstStar size={14} opacity={0.55} />
          <Diamond size={10} opacity={0.45} />
          <span style={{ flex: 1, height: "1px", background: INK, opacity: 0.2 }} />
        </div>
      </FadeIn>

      {/* ── CTA para ── */}
      <FadeIn delay={0.44}>
        <p style={body}>
          If you'd like to get in touch, feel free to send me{" "}
          <EmailLink text="an email" />
          . I'm always open to collaborations, ideas, and interesting projects.
        </p>
      </FadeIn>

      {/* ── Footer accent row ── */}
      <FadeIn delay={0.5}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", paddingTop: "4px" }}>
          <BurstStar size={18} opacity={0.35} />
          <CrossShape size={13} opacity={0.3} />
          <Diamond size={12} opacity={0.3} />
          <BurstStar size={13} opacity={0.3} />
        </div>
      </FadeIn>
    </div>
  );
}

// ─── Dev preview ─────────────────────────────────────────────────────────────
export default function Preview() {
  return (
    <div style={{ minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ background: PAPER, borderRadius: "16px", padding: "clamp(2rem, 5vw, 3rem)", maxWidth: "560px", width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.4)" }}>
        <EditorialAboutText />
      </div>
    </div>
  );
}